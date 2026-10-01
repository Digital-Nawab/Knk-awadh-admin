import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import GalleryModel from "@/models/GalleryModel";
import { getSafeOriginalFilename } from "@/lib/uploadHelper";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "gallery");

export async function createGallery(request) {
    try {
        await mkdir(UPLOAD_DIR, { recursive: true });

        const formData = await request.formData();

        // Collect all files from possible form field names
        let files = [];
        const multiKeys = ["images", "files", "media"];
        for (const key of multiKeys) {
            const list = formData.getAll(key);
            if (list && list.length > 0) {
                files.push(...list.filter((f) => f && typeof f !== "string" && f.size > 0));
            }
        }

        if (files.length === 0) {
            const singleKeys = ["image", "file", "media"];
            for (const key of singleKeys) {
                const single = formData.get(key);
                if (single && typeof single !== "string" && single.size > 0) {
                    files.push(single);
                    break;
                }
            }
        }

        if (files.length === 0) {
            return { status: 400, body: { error: "Please select at least one image file to upload." } };
        }

        const titleInput = formData.get("title") || "";
        const isActiveRaw = formData.get("isActive");
        const isActive = isActiveRaw === null || isActiveRaw === undefined
            ? true
            : (isActiveRaw === "true" || isActiveRaw === true || isActiveRaw === "1" || isActiveRaw === 1);

        const createdItems = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (!IMAGE_TYPES.includes(file.type)) {
                return {
                    status: 400,
                    body: { error: `Invalid file type for "${file.name}". Only JPG, PNG, WEBP, and AVIF images are allowed.` },
                };
            }

            // Preserve original filename using safe helper
            const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, file.name, ".webp");

            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(filePath, buffer);

            const imageUrl = `/admin-assets/gallery/${fileName}`;

            // If user supplied a title and there's only 1 file, use it; otherwise use file name (without ext) or title + index
            let itemTitle = titleInput.trim();
            if (!itemTitle) {
                const rawName = path.basename(file.name, path.extname(file.name));
                itemTitle = rawName.replace(/[-_]+/g, " ").trim();
            } else if (files.length > 1) {
                itemTitle = `${titleInput.trim()} (${i + 1})`;
            }

            const item = await GalleryModel.create({
                imageUrl,
                title: itemTitle,
                isActive,
            });

            createdItems.push(item);
        }

        return {
            status: 201,
            body: {
                message: `${createdItems.length} image${createdItems.length > 1 ? "s" : ""} uploaded successfully.`,
                items: createdItems,
            },
        };
    } catch (error) {
        console.error("Gallery create error:", error);
        return { status: 500, body: { error: error.message || "Failed to upload gallery images." } };
    }
}

export async function listGallery(request) {
    try {
        let activeOnly = false;
        let search = null;

        if (request && request.url) {
            try {
                const { searchParams } = new URL(request.url);
                activeOnly = searchParams.get("active") === "true";
                search = searchParams.get("search") || null;
            } catch {
                // ignore
            }
        }

        const gallery = await GalleryModel.getAll({ activeOnly, search });
        return { status: 200, body: { gallery } };
    } catch (error) {
        console.error("Gallery list error:", error);
        return { status: 500, body: { error: error.message || "Failed to load gallery items." } };
    }
}

export async function getGallery(id) {
    try {
        const item = await GalleryModel.getById(id);
        if (!item) {
            return { status: 404, body: { error: "Gallery item not found." } };
        }
        return { status: 200, body: { item } };
    } catch (error) {
        return { status: 500, body: { error: error.message || "Failed to load gallery item." } };
    }
}

export async function updateGallery(id, request) {
    try {
        const item = await GalleryModel.getById(id);
        if (!item) {
            return { status: 404, body: { error: "Gallery item not found." } };
        }

        let title = item.title;
        let isActive = item.is_active;
        let displayOrder = item.display_order;

        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data") || contentType.includes("form-data")) {
            const formData = await request.formData();
            if (formData.has("title")) title = formData.get("title");
            if (formData.has("isActive")) {
                const val = formData.get("isActive");
                isActive = val === "true" || val === true || val === "1" || val === 1;
            }
            if (formData.has("displayOrder")) {
                displayOrder = Number(formData.get("displayOrder"));
            }
        } else {
            try {
                const json = await request.json();
                if (json.title !== undefined) title = json.title;
                if (json.isActive !== undefined) {
                    const val = json.isActive;
                    isActive = val === "true" || val === true || val === "1" || val === 1;
                }
                if (json.displayOrder !== undefined) displayOrder = Number(json.displayOrder);
            } catch {
                // ignore parse error
            }
        }

        await GalleryModel.update(id, {
            title: title ? title.trim() : item.title,
            isActive,
            displayOrder,
        });

        const updated = await GalleryModel.getById(id);
        return { status: 200, body: { message: "Gallery item updated successfully.", item: updated } };
    } catch (error) {
        return { status: 500, body: { error: error.message || "Failed to update gallery item." } };
    }
}

export async function deleteGallery(id) {
    try {
        const item = await GalleryModel.getById(id);
        if (!item) {
            return { status: 404, body: { error: "Gallery item not found." } };
        }

        // If file was uploaded into /admin-assets/gallery/, safely unlink it
        if (item.image_url && item.image_url.startsWith("/admin-assets/gallery/")) {
            const filePath = path.join(process.cwd(), "public", item.image_url);
            try {
                await unlink(filePath);
            } catch (err) {
                if (err.code !== "ENOENT") {
                    console.error("Failed to delete gallery file from disk:", err);
                }
            }
        }

        await GalleryModel.delete(id);
        return { status: 200, body: { message: "Gallery item deleted successfully." } };
    } catch (error) {
        console.error("Gallery delete error:", error);
        return { status: 500, body: { error: error.message || "Failed to delete gallery item." } };
    }
}
