import { writeFile, mkdir } from "fs/promises";
import path from "path";
import ServiceModel from "@/models/ServiceModel";
import { db } from "@/lib/db";
import { getSafeOriginalFilename } from "@/lib/uploadHelper";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "services");

function slugify(name) {
    if (!name) return "";
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

async function saveUploadedImage(imageFile, prefix = "service") {
    if (!imageFile || typeof imageFile === "string") return null;

    if (!IMAGE_TYPES.includes(imageFile.type)) {
        throw new Error("Only JPG, PNG or WEBP images are allowed.");
    }

    if (imageFile.size > MAX_IMAGE_SIZE_BYTES) {
        throw new Error(`Image file exceeds 2MB limit (${(imageFile.size / (1024 * 1024)).toFixed(2)}MB).`);
    }

    const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, imageFile.name, ".webp");

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await writeFile(filePath, buffer);

    return `/admin-assets/services/${fileName}`;
}

// =============================================================================
// SERVICES CONTROLLERS (Individual treatments)
// =============================================================================

export async function createService(request) {
    try {
        const formData = await request.formData();

        const name = (formData.get("name") || "").toString().trim();
        const customSlug = (formData.get("slug") || "").toString().trim();
        const categoryName = (formData.get("categoryName") || formData.get("category") || "Nails").toString().trim();
        const title = (formData.get("title") || name).toString().trim();
        const shortDesc = (formData.get("shortDesc") || formData.get("short_desc") || "").toString().trim();
        const description = (formData.get("description") || formData.get("moreDesc") || formData.get("content") || "").toString().trim();
        const displayOrder = parseInt(formData.get("displayOrder") || formData.get("order") || "1", 10) || 1;
        const filterCategory = (formData.get("filterCategory") || "").toString().trim() || null;
        const price = (formData.get("price") || "On request").toString().trim();
        const isActive = formData.get("isActive") !== "false" && formData.get("isActive") !== "0";

        // Parse tags
        let tags = [];
        const rawTags = formData.get("tags");
        if (rawTags) {
            try {
                tags = JSON.parse(rawTags);
            } catch {
                tags = rawTags.toString().split(",").map((t) => t.trim()).filter(Boolean);
            }
        }

        if (!name) {
            return { status: 400, body: { error: "Service name is required." } };
        }
        if (!categoryName) {
            return { status: 400, body: { error: "Service category is required." } };
        }

        // Resolve Category
        const categoryIdInput = formData.get("categoryId") || formData.get("category_id");
        let categoryId = categoryIdInput ? parseInt(categoryIdInput, 10) : null;
        let categoryObj = categoryId && !isNaN(categoryId) ? await ServiceModel.getCategoryById(categoryId) : null;

        if (!categoryObj && categoryName) {
            categoryObj = await ServiceModel.getCategoryBySlug(slugify(categoryName));
        }

        let resolvedCategoryName = categoryName;
        let resolvedCategorySlug = slugify(categoryName);
        if (categoryObj) {
            categoryId = categoryObj.id;
            resolvedCategoryName = categoryObj.name;
            resolvedCategorySlug = categoryObj.slug;
        }

        const categorySlug = resolvedCategorySlug;
        const finalCategoryName = resolvedCategoryName;
        const slug = customSlug ? slugify(customSlug) : slugify(name);

        const existing = await ServiceModel.getServiceBySlug(slug);
        if (existing) {
            return { status: 400, body: { error: "A service with this slug already exists. Please choose a unique slug or name." } };
        }

        const imageFile = formData.get("image");
        let imageUrl = formData.get("existingImage") || null;

        if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
            imageUrl = await saveUploadedImage(imageFile, slug);
        }

        if (!imageUrl) {
            return { status: 400, body: { error: "Service image is required. Please upload a 4:5 image (max 2MB, JPG/PNG/WEBP)." } };
        }

        const service = await ServiceModel.createService({
            categoryId,
            categoryName: finalCategoryName,
            categorySlug,
            name,
            title,
            slug,
            shortDesc,
            description,
            image: imageUrl,
            displayOrder,
            tags,
            filterCategory,
            price,
            isActive,
        });

        return { status: 201, body: { success: true, message: "Service created successfully.", service } };
    } catch (err) {
        console.error("Create service error:", err);
        return { status: 500, body: { error: err.message || "Failed to create service." } };
    }
}

export async function listServices(request) {
    try {
        const url = request ? new URL(request.url) : null;
        const category = url?.searchParams?.get("category") || null;
        const status = url?.searchParams?.get("status") || null;
        const search = url?.searchParams?.get("search") || null;

        const services = await ServiceModel.getAllServices({
            category,
            isActive: status === "active" ? true : (status === "inactive" ? false : null),
            search,
        });

        // Also fetch active categories for frontend filters & dropdowns
        const categories = await ServiceModel.getActiveCategories();

        return { status: 200, body: { services, categories } };
    } catch (err) {
        console.error("List services error:", err);
        return { status: 500, body: { error: "Failed to fetch services." } };
    }
}

export async function getServiceById(id) {
    try {
        const service = await ServiceModel.getServiceById(id);
        if (!service) {
            return { status: 404, body: { error: "Service not found." } };
        }
        return { status: 200, body: { service } };
    } catch (err) {
        console.error("Get service by ID error:", err);
        return { status: 500, body: { error: "Failed to fetch service." } };
    }
}

export async function getServiceBySlug(slug, categorySlug = null) {
    try {
        const service = await ServiceModel.getServiceBySlug(slug, categorySlug);
        if (!service) {
            return { status: 404, body: { error: "Service not found." } };
        }

        // Get related services in same category
        const related = await ServiceModel.getAllServices({
            category: service.category_slug,
            isActive: true,
        });
        const relatedServices = related.filter((s) => s.id !== service.id).slice(0, 3);

        return { status: 200, body: { service, relatedServices } };
    } catch (err) {
        console.error("Get service by slug error:", err);
        return { status: 500, body: { error: "Failed to fetch service." } };
    }
}

export async function updateService(id, request) {
    try {
        const formData = await request.formData();

        const name = (formData.get("name") || "").toString().trim();
        const customSlug = (formData.get("slug") || "").toString().trim();
        const categoryName = (formData.get("categoryName") || formData.get("category") || "Nails").toString().trim();
        const title = (formData.get("title") || name).toString().trim();
        const shortDesc = (formData.get("shortDesc") || formData.get("short_desc") || "").toString().trim();
        const description = (formData.get("description") || formData.get("moreDesc") || formData.get("content") || "").toString().trim();
        const displayOrder = parseInt(formData.get("displayOrder") || formData.get("order") || "1", 10) || 1;
        const filterCategory = (formData.get("filterCategory") || "").toString().trim() || null;
        const price = (formData.get("price") || "On request").toString().trim();
        const isActive = formData.get("isActive") !== "false" && formData.get("isActive") !== "0";

        if (!name) {
            return { status: 400, body: { error: "Service name is required." } };
        }

        // Resolve Category
        const categoryIdInput = formData.get("categoryId") || formData.get("category_id");
        let categoryId = categoryIdInput ? parseInt(categoryIdInput, 10) : null;
        let categoryObj = categoryId && !isNaN(categoryId) ? await ServiceModel.getCategoryById(categoryId) : null;

        if (!categoryObj && categoryName) {
            categoryObj = await ServiceModel.getCategoryBySlug(slugify(categoryName));
        }

        let resolvedCategoryName = categoryName;
        let resolvedCategorySlug = slugify(categoryName);
        if (categoryObj) {
            categoryId = categoryObj.id;
            resolvedCategoryName = categoryObj.name;
            resolvedCategorySlug = categoryObj.slug;
        }

        const categorySlug = resolvedCategorySlug;
        const finalCategoryName = resolvedCategoryName;
        const slug = customSlug ? slugify(customSlug) : slugify(name);

        // Check if slug taken by another service
        const [existingRows] = await db.query(
            "SELECT id FROM services WHERE slug = ? AND id != ? AND deleted_at IS NULL LIMIT 1",
            [slug, id]
        );
        if (existingRows && existingRows.length > 0) {
            return { status: 400, body: { error: "Another service with this slug already exists." } };
        }

        let imageUrl = null;
        const imageFile = formData.get("image");
        if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
            imageUrl = await saveUploadedImage(imageFile, slug);
        }

        // Tags
        let tags = [];
        const rawTags = formData.get("tags");
        if (rawTags) {
            try {
                tags = JSON.parse(rawTags);
            } catch {
                tags = rawTags.toString().split(",").map((t) => t.trim()).filter(Boolean);
            }
        }

        const updated = await ServiceModel.updateService(id, {
            categoryId,
            categoryName: finalCategoryName,
            categorySlug,
            name,
            title,
            slug,
            shortDesc,
            description,
            image: imageUrl,
            displayOrder,
            tags,
            filterCategory,
            price,
            isActive,
        });

        return { status: 200, body: { success: true, message: "Service updated successfully.", service: updated } };
    } catch (err) {
        console.error("Update service error:", err);
        return { status: 500, body: { error: err.message || "Failed to update service." } };
    }
}

export async function updateServiceStatus(id, request) {
    try {
        const { isActive } = await request.json();
        await ServiceModel.updateServiceStatus(id, isActive);
        return { status: 200, body: { success: true, message: "Status updated successfully." } };
    } catch (err) {
        console.error("Update service status error:", err);
        return { status: 500, body: { error: "Failed to update service status." } };
    }
}

export async function deleteService(id) {
    try {
        const service = await ServiceModel.getServiceById(id);
        if (!service) {
            return { status: 404, body: { error: "Service not found." } };
        }
        await ServiceModel.softDeleteService(id);
        return { status: 200, body: { success: true, message: "Service deleted successfully." } };
    } catch (err) {
        console.error("Delete service error:", err);
        return { status: 500, body: { error: "Failed to delete service." } };
    }
}

// =============================================================================
// CATEGORIES CONTROLLERS (For managing high-level categories)
// =============================================================================

export async function listCategories(request) {
    try {
        const url = request ? new URL(request.url) : null;
        const status = url?.searchParams?.get("status");
        const all = url?.searchParams?.get("all") === "true";

        let categories = [];
        if (status === "all" || all) {
            categories = await ServiceModel.getAllCategories();
        } else if (status === "inactive") {
            categories = await ServiceModel.getAllCategories({ isActive: false });
        } else {
            categories = await ServiceModel.getActiveCategories();
        }

        return { status: 200, body: { categories } };
    } catch (err) {
        console.error("List categories error:", err);
        return { status: 500, body: { error: "Failed to fetch categories." } };
    }
}

export async function getCategoryById(id) {
    try {
        const category = await ServiceModel.getCategoryById(id);
        if (!category) {
            return { status: 404, body: { error: "Category not found." } };
        }
        return { status: 200, body: { category } };
    } catch (err) {
        console.error("Get category by ID error:", err);
        return { status: 500, body: { error: "Failed to fetch category." } };
    }
}

export async function getCategoryBySlug(slug) {
    try {
        const category = await ServiceModel.getCategoryBySlug(slug);
        if (!category) {
            return { status: 404, body: { error: "Category not found." } };
        }
        // Also fetch active services under this category
        const services = await ServiceModel.getActiveServices(category.slug);
        return { status: 200, body: { category, services } };
    } catch (err) {
        console.error("Get category by slug error:", err);
        return { status: 500, body: { error: "Failed to fetch category." } };
    }
}

export async function createCategory(request) {
    try {
        let name = "";
        let customSlug = "";
        let title = "";
        let shortDesc = "";
        let displayOrder = 1;
        let isActive = true;
        let imageUrl = null;
        let items = null;

        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            name = (formData.get("name") || "").toString().trim();
            customSlug = (formData.get("slug") || "").toString().trim();
            title = (formData.get("title") || name).toString().trim();
            shortDesc = (formData.get("shortDesc") || formData.get("short_desc") || "").toString().trim();
            displayOrder = parseInt(formData.get("displayOrder") || formData.get("order") || "1", 10) || 1;
            isActive = formData.get("isActive") !== "false" && formData.get("isActive") !== "0";

            if (formData.has("items")) {
                try {
                    const parsed = JSON.parse(formData.get("items"));
                    items = Array.isArray(parsed) ? JSON.stringify(parsed) : null;
                } catch { items = null; }
            }

            const imageFile = formData.get("image");
            imageUrl = (formData.get("existingImage") || "").toString().trim() || null;
            if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
                imageUrl = await saveUploadedImage(imageFile, customSlug || slugify(name));
            }
        } else {
            const json = await request.json();
            name = (json.name || "").toString().trim();
            customSlug = (json.slug || "").toString().trim();
            title = (json.title || name).toString().trim();
            shortDesc = (json.shortDesc || json.short_desc || "").toString().trim();
            displayOrder = parseInt(json.displayOrder || json.order || "1", 10) || 1;
            isActive = json.isActive !== false && json.isActive !== "0";
            imageUrl = json.image || null;
            if (json.items !== undefined) {
                items = Array.isArray(json.items) ? JSON.stringify(json.items) : (typeof json.items === "string" ? json.items : null);
            }
        }

        if (!name) {
            return { status: 400, body: { error: "Category name is required." } };
        }

        const slug = customSlug ? slugify(customSlug) : slugify(name);

        const existing = await ServiceModel.getCategoryBySlug(slug);
        if (existing) {
            return { status: 400, body: { error: "A category with this slug already exists. Please choose a unique name or slug." } };
        }

        const category = await ServiceModel.createCategory({
            name,
            slug,
            title: title || `${name}, done right.`,
            shortDesc: shortDesc || `Luxury ${name.toLowerCase()} treatments handcrafted by certified artists at KNK Salon Awadh.`,
            image: imageUrl || "/assets/images/new/service/NAILS.webp",
            displayOrder,
            isActive,
            items,
        });

        return { status: 201, body: { success: true, message: "Category created successfully.", category } };
    } catch (err) {
        console.error("Create category error:", err);
        return { status: 500, body: { error: err.message || "Failed to create category." } };
    }
}

export async function updateCategory(id, request) {
    try {
        const existingCategory = await ServiceModel.getCategoryById(id);
        if (!existingCategory) {
            return { status: 404, body: { error: "Category not found." } };
        }

        let name = existingCategory.name;
        let customSlug = existingCategory.slug;
        let title = existingCategory.title;
        let shortDesc = existingCategory.short_desc;
        let displayOrder = existingCategory.display_order || 1;
        let isActive = Boolean(existingCategory.is_active);
        let imageUrl = existingCategory.image;
        let items = existingCategory.items;

        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            if (formData.has("name")) name = formData.get("name").toString().trim();
            if (formData.has("slug")) customSlug = formData.get("slug").toString().trim();
            if (formData.has("title")) title = formData.get("title").toString().trim();
            if (formData.has("shortDesc")) shortDesc = formData.get("shortDesc").toString().trim();
            if (formData.has("displayOrder")) displayOrder = parseInt(formData.get("displayOrder"), 10) || 1;
            if (formData.has("isActive")) isActive = formData.get("isActive") !== "false" && formData.get("isActive") !== "0";

            if (formData.has("items")) {
                try {
                    const parsed = JSON.parse(formData.get("items"));
                    items = Array.isArray(parsed) ? JSON.stringify(parsed) : null;
                } catch { items = null; }
            }

            const imageFile = formData.get("image");
            if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
                imageUrl = await saveUploadedImage(imageFile, customSlug || slugify(name));
            } else if (formData.has("existingImage")) {
                imageUrl = formData.get("existingImage").toString().trim() || imageUrl;
            }
        } else {
            const json = await request.json();
            if (json.name !== undefined) name = json.name.toString().trim();
            if (json.slug !== undefined) customSlug = json.slug.toString().trim();
            if (json.title !== undefined) title = json.title.toString().trim();
            if (json.shortDesc !== undefined) shortDesc = json.shortDesc.toString().trim();
            if (json.displayOrder !== undefined) displayOrder = parseInt(json.displayOrder, 10) || 1;
            if (json.isActive !== undefined) isActive = Boolean(json.isActive);
            if (json.image !== undefined) imageUrl = json.image;
            if (json.items !== undefined) {
                items = Array.isArray(json.items) ? JSON.stringify(json.items) : (typeof json.items === "string" ? json.items : null);
            }
        }

        if (!name) {
            return { status: 400, body: { error: "Category name is required." } };
        }

        const slug = customSlug ? slugify(customSlug) : slugify(name);

        // Check if slug taken by another category
        const [existingSlugRows] = await db.query(
            "SELECT id FROM service_categories WHERE slug = ? AND id != ? AND deleted_at IS NULL LIMIT 1",
            [slug, id]
        );
        if (existingSlugRows && existingSlugRows.length > 0) {
            return { status: 400, body: { error: "Another category with this slug already exists." } };
        }

        const updated = await ServiceModel.updateCategory(id, {
            name,
            slug,
            title: title || name,
            shortDesc,
            image: imageUrl,
            displayOrder,
            isActive,
            items,
        });

        // Also update category_name and category_slug in services table if name/slug changed
        if (existingCategory.slug !== slug || existingCategory.name !== name) {
            await db.query(
                "UPDATE services SET category_name = ?, category_slug = ? WHERE category_id = ?",
                [name, slug, id]
            );
        }

        return { status: 200, body: { success: true, message: "Category updated successfully.", category: updated } };
    } catch (err) {
        console.error("Update category error:", err);
        return { status: 500, body: { error: err.message || "Failed to update category." } };
    }
}

export async function updateCategoryStatus(id, request) {
    try {
        const body = await request.json();
        const isActive = body.isActive !== false && body.isActive !== 0 && body.isActive !== "0";
        const updated = await ServiceModel.updateCategoryStatus(id, isActive);
        return { status: 200, body: { success: true, message: "Category status updated.", category: updated } };
    } catch (err) {
        console.error("Update category status error:", err);
        return { status: 500, body: { error: "Failed to update category status." } };
    }
}

export async function deleteCategory(id) {
    try {
        const category = await ServiceModel.getCategoryById(id);
        if (!category) {
            return { status: 404, body: { error: "Category not found." } };
        }
        await ServiceModel.softDeleteCategory(id);
        return { status: 200, body: { success: true, message: "Category deleted successfully." } };
    } catch (err) {
        console.error("Delete category error:", err);
        return { status: 500, body: { error: "Failed to delete category." } };
    }
}