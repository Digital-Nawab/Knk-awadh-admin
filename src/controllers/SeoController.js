import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import SeoModel from "@/models/SeoModel";
import { getSafeOriginalFilename } from "@/lib/uploadHelper";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "seo");

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
}

export async function createSeo(request) {
    try {
        const formData = await request.formData();

        const pagePath = formData.get("pagePath");
        const pageName = formData.get("pageName");
        const metaTitle = formData.get("metaTitle");
        const metaDescription = formData.get("metaDescription");
        const metaKeywords = formData.get("metaKeywords") || "";
        const canonicalUrl = formData.get("canonicalUrl") || null;
        const robots = formData.get("robots") || "index, follow";
        const ogImageFile = formData.get("ogImage");

        if (!pagePath || !pagePath.trim()) {
            return { status: 400, body: { error: "Page URL path is required (e.g. /about)." } };
        }
        if (!metaTitle || !metaTitle.trim()) {
            return { status: 400, body: { error: "Meta Title is required." } };
        }
        if (!metaDescription || !metaDescription.trim()) {
            return { status: 400, body: { error: "Meta Description is required." } };
        }

        // Check path collision
        const existing = await SeoModel.getByPath(pagePath);
        if (existing) {
            return { status: 400, body: { error: `SEO configuration already exists for "${pagePath}". Please edit it instead.` } };
        }

        let ogImageUrl = "/assets/images/new/logo.png";

        if (ogImageFile && typeof ogImageFile !== "string" && ogImageFile.size > 0) {
            if (!IMAGE_TYPES.includes(ogImageFile.type)) {
                return { status: 400, body: { error: "OG Image must be JPG, PNG, or WEBP." } };
            }

            const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, ogImageFile.name, ".webp");
            const buffer = Buffer.from(await ogImageFile.arrayBuffer());
            await writeFile(filePath, buffer);
            ogImageUrl = `/admin-assets/seo/${fileName}`;
        }

        const seo = await SeoModel.create({
            pagePath: pagePath.trim(),
            pageName: pageName ? pageName.trim() : pagePath.trim(),
            metaTitle: metaTitle.trim(),
            metaDescription: metaDescription.trim(),
            metaKeywords: metaKeywords.trim(),
            ogImage: ogImageUrl,
            canonicalUrl: canonicalUrl ? canonicalUrl.trim() : null,
            robots: robots.trim(),
        });

        try {
            const revalPath = pagePath.trim().startsWith("/") ? pagePath.trim() : `/${pagePath.trim()}`;
            revalidatePath(revalPath);
            revalidatePath("/", "layout");
            revalidatePath("/admin/seo");
        } catch (revalErr) {
            console.warn("Revalidation warning in createSeo:", revalErr);
        }

        return { status: 201, body: { success: true, message: "SEO metadata saved successfully.", seo } };
    } catch (error) {
        console.error("Create SEO error:", error);
        return { status: 500, body: { error: "Failed to create SEO configuration." } };
    }
}

export async function listSeo(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const seoList = await SeoModel.getAll({ search });
        return { status: 200, body: { seoList } };
    } catch (error) {
        console.error("List SEO error:", error);
        return { status: 500, body: { error: "Failed to fetch SEO list." } };
    }
}

export async function getSeoById(id) {
    try {
        const seo = await SeoModel.getById(id);
        if (!seo) return { status: 404, body: { error: "SEO record not found." } };
        return { status: 200, body: { seo } };
    } catch (error) {
        console.error("Get SEO by id error:", error);
        return { status: 500, body: { error: "Failed to fetch SEO record." } };
    }
}

export async function getSeoByPath(request) {
    try {
        const { searchParams } = new URL(request.url);
        const p = searchParams.get("path") || "/";
        const seo = await SeoModel.getByPath(p);
        return { status: 200, body: { seo } };
    } catch (error) {
        console.error("Get SEO by path error:", error);
        return { status: 500, body: { error: "Failed to fetch SEO for path." } };
    }
}

export async function updateSeo(id, request) {
    try {
        const formData = await request.formData();

        const pagePath = formData.get("pagePath");
        const pageName = formData.get("pageName");
        const metaTitle = formData.get("metaTitle");
        const metaDescription = formData.get("metaDescription");
        const metaKeywords = formData.get("metaKeywords") || "";
        const canonicalUrl = formData.get("canonicalUrl") || null;
        const robots = formData.get("robots") || "index, follow";
        const ogImageFile = formData.get("ogImage");

        if (!pagePath || !pagePath.trim()) {
            return { status: 400, body: { error: "Page URL path is required." } };
        }
        if (!metaTitle || !metaTitle.trim()) {
            return { status: 400, body: { error: "Meta Title is required." } };
        }
        if (!metaDescription || !metaDescription.trim()) {
            return { status: 400, body: { error: "Meta Description is required." } };
        }

        let ogImageUrl = null;
        if (ogImageFile && typeof ogImageFile !== "string" && ogImageFile.size > 0) {
            if (!IMAGE_TYPES.includes(ogImageFile.type)) {
                return { status: 400, body: { error: "OG Image must be JPG, PNG, or WEBP." } };
            }
            const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, ogImageFile.name, ".webp");
            const buffer = Buffer.from(await ogImageFile.arrayBuffer());
            await writeFile(filePath, buffer);
            ogImageUrl = `/admin-assets/seo/${fileName}`;
        }

        await SeoModel.update(id, {
            pagePath: pagePath.trim(),
            pageName: pageName ? pageName.trim() : pagePath.trim(),
            metaTitle: metaTitle.trim(),
            metaDescription: metaDescription.trim(),
            metaKeywords: metaKeywords.trim(),
            ogImage: ogImageUrl,
            canonicalUrl: canonicalUrl ? canonicalUrl.trim() : null,
            robots: robots.trim(),
        });

        try {
            const revalPath = pagePath.trim().startsWith("/") ? pagePath.trim() : `/${pagePath.trim()}`;
            revalidatePath(revalPath);
            revalidatePath("/", "layout");
            revalidatePath("/admin/seo");
        } catch (revalErr) {
            console.warn("Revalidation warning in updateSeo:", revalErr);
        }

        return { status: 200, body: { success: true, message: "SEO updated successfully." } };
    } catch (error) {
        console.error("Update SEO error:", error);
        return { status: 500, body: { error: "Failed to update SEO record." } };
    }
}

export async function deleteSeo(id) {
    try {
        const seo = await SeoModel.getById(id);
        if (!seo) return { status: 404, body: { error: "SEO record not found." } };

        if (seo.og_image && seo.og_image.startsWith("/admin-assets/seo/")) {
            const filePath = path.join(process.cwd(), "public", seo.og_image);
            try {
                await unlink(filePath);
            } catch (err) {
                if (err.code !== "ENOENT") console.error("Error deleting OG image:", err);
            }
        }

        await SeoModel.delete(id);

        try {
            if (seo.page_path) {
                const revalPath = seo.page_path.trim().startsWith("/") ? seo.page_path.trim() : `/${seo.page_path.trim()}`;
                revalidatePath(revalPath);
            }
            revalidatePath("/", "layout");
            revalidatePath("/admin/seo");
        } catch (revalErr) {
            console.warn("Revalidation warning in deleteSeo:", revalErr);
        }

        return { status: 200, body: { success: true, message: "SEO record deleted." } };
    } catch (error) {
        console.error("Delete SEO error:", error);
        return { status: 500, body: { error: "Failed to delete SEO record." } };
    }
}
