import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import InteriorModel from "@/models/InteriorModel";
import { getSafeOriginalFilename } from "@/lib/uploadHelper";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
const MAX_FILE_SIZE_BYTES = 500 * 1024; // 500 KB max limit
const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "interior");

export async function createInterior(request) {
    try {
        await mkdir(UPLOAD_DIR, { recursive: true });

        const formData = await request.formData();

        // Branch selection: 'gomtinagar' or 'hazratganj'
        let branch = formData.get("branch") || "gomtinagar";
        branch = branch.toString().toLowerCase().trim();
        if (branch !== "gomtinagar" && branch !== "hazratganj") {
            branch = "gomtinagar";
        }

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

        const altInput = formData.get("altText") || formData.get("alt") || formData.get("title") || "";
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

            if (file.size > MAX_FILE_SIZE_BYTES) {
                const kb = Math.round(file.size / 1024);
                return {
                    status: 400,
                    body: { error: `"${file.name}" exceeds the 500KB limit (${kb}KB). Please compress or upload an image under 500KB.` },
                };
            }

            // Preserve original filename safely
            const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, file.name, ".webp");

            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(filePath, buffer);

            const imageUrl = `/admin-assets/interior/${fileName}`;

            let itemAlt = altInput.toString().trim();
            if (!itemAlt) {
                const rawName = path.basename(file.name, path.extname(file.name));
                itemAlt = rawName.replace(/[-_]+/g, " ").trim();
            } else if (files.length > 1) {
                itemAlt = `${altInput.toString().trim()} (${i + 1})`;
            }

            const item = await InteriorModel.create({
                branch,
                imageUrl,
                title: itemAlt,
                altText: itemAlt,
                isActive,
            });

            createdItems.push(item);
        }

        return {
            status: 201,
            body: {
                message: `${createdItems.length} interior photo${createdItems.length > 1 ? "s" : ""} uploaded successfully to ${branch === "gomtinagar" ? "Gomti Nagar" : "Hazratganj"}.`,
                items: createdItems,
            },
        };
    } catch (error) {
        console.error("Interior create error:", error);
        return { status: 500, body: { error: error.message || "Failed to upload interior photos." } };
    }
}

export async function listInterior(request) {
    try {
        let activeOnly = false;
        let branch = null;
        let search = null;

        if (request && request.url) {
            try {
                const { searchParams } = new URL(request.url);
                activeOnly = searchParams.get("active") === "true";
                branch = searchParams.get("branch") || null;
                search = searchParams.get("search") || null;
            } catch {
                // ignore
            }
        }

        const interior = await InteriorModel.getAll({ branch, activeOnly, search });
        return { status: 200, body: { interior } };
    } catch (error) {
        console.error("Interior list error:", error);
        return { status: 500, body: { error: error.message || "Failed to load interior photos." } };
    }
}

export async function getInterior(id) {
    try {
        const item = await InteriorModel.getById(id);
        if (!item) {
            return { status: 404, body: { error: "Interior photo not found." } };
        }
        return { status: 200, body: { item } };
    } catch (error) {
        return { status: 500, body: { error: error.message || "Failed to load interior photo." } };
    }
}

export async function updateInterior(id, request) {
    try {
        const item = await InteriorModel.getById(id);
        if (!item) {
            return { status: 404, body: { error: "Interior photo not found." } };
        }

        let branch = item.branch;
        let altText = item.alt_text || item.title;
        let isActive = item.is_active;
        let displayOrder = item.display_order;

        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data") || contentType.includes("form-data")) {
            const formData = await request.formData();
            if (formData.has("branch")) branch = formData.get("branch");
            if (formData.has("altText")) altText = formData.get("altText");
            else if (formData.has("alt")) altText = formData.get("alt");
            else if (formData.has("title")) altText = formData.get("title");
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
                if (json.branch !== undefined) branch = json.branch;
                if (json.altText !== undefined) altText = json.altText;
                else if (json.alt !== undefined) altText = json.alt;
                else if (json.title !== undefined) altText = json.title;
                if (json.isActive !== undefined) {
                    const val = json.isActive;
                    isActive = val === "true" || val === true || val === "1" || val === 1;
                }
                if (json.displayOrder !== undefined) displayOrder = Number(json.displayOrder);
            } catch {
                // ignore parse error
            }
        }

        await InteriorModel.update(id, {
            branch,
            title: altText ? String(altText).trim() : "",
            altText: altText ? String(altText).trim() : "",
            isActive,
            displayOrder,
        });

        const updated = await InteriorModel.getById(id);
        return { status: 200, body: { message: "Interior photo updated successfully.", item: updated } };
    } catch (error) {
        return { status: 500, body: { error: error.message || "Failed to update interior photo." } };
    }
}

export async function deleteInterior(id) {
    try {
        const item = await InteriorModel.getById(id);
        if (!item) {
            return { status: 404, body: { error: "Interior photo not found." } };
        }

        // If file was uploaded into /admin-assets/interior/, unlink it
        if (item.image_url && item.image_url.startsWith("/admin-assets/interior/")) {
            const filePath = path.join(process.cwd(), "public", item.image_url);
            try {
                await unlink(filePath);
            } catch (err) {
                if (err.code !== "ENOENT") {
                    console.error("Failed to delete interior file from disk:", err);
                }
            }
        }

        await InteriorModel.delete(id);
        return { status: 200, body: { message: "Interior photo deleted successfully." } };
    } catch (error) {
        console.error("Interior delete error:", error);
        return { status: 500, body: { error: error.message || "Failed to delete interior photo." } };
    }
}
