import { writeFile, mkdir } from "fs/promises";
import path from "path";
import AboutModel from "@/models/AboutModel";
import { getSafeOriginalFilename } from "@/lib/uploadHelper";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "about");

export async function getAboutContent() {
    try {
        const sections = await AboutModel.getAllSections();
        return { status: 200, body: { success: true, sections } };
    } catch (error) {
        console.error("AboutController.getAboutContent error:", error);
        return { status: 500, body: { success: false, error: error.message || "Failed to load About page content." } };
    }
}

export async function getAboutSection(sectionKey) {
    try {
        const section = await AboutModel.getSection(sectionKey);
        return { status: 200, body: { success: true, section } };
    } catch (error) {
        return { status: 500, body: { success: false, error: error.message || "Failed to load section." } };
    }
}

export async function updateAboutSection(sectionKey, request) {
    try {
        await mkdir(UPLOAD_DIR, { recursive: true });

        const contentType = request.headers.get("content-type") || "";
        let content = {};
        let sectionName = null;

        if (contentType.includes("multipart/form-data") || contentType.includes("form-data")) {
            const formData = await request.formData();

            // Extract text fields or JSON payload
            const rawContent = formData.get("content");
            if (rawContent && typeof rawContent === "string") {
                try {
                    content = JSON.parse(rawContent);
                } catch {
                    content = {};
                }
            } else {
                for (const [key, value] of formData.entries()) {
                    if (key !== "file" && key !== "image" && key !== "media") {
                        try {
                            content[key] = JSON.parse(value);
                        } catch {
                            content[key] = value;
                        }
                    }
                }
            }

            sectionName = formData.get("sectionName") || null;

            // Handle file upload if present
            const file = formData.get("file") || formData.get("image") || formData.get("media");
            if (file && typeof file !== "string" && file.size > 0) {
                const isImage = IMAGE_TYPES.includes(file.type);
                const isVideo = VIDEO_TYPES.includes(file.type);

                if (!isImage && !isVideo) {
                    return {
                        status: 400,
                        body: { error: "Unsupported file format. Please upload JPG, PNG, WEBP, AVIF or MP4." },
                    };
                }

                const fallbackExt = isVideo ? ".webm" : ".webp";
                const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, file.name, fallbackExt);
                const buffer = Buffer.from(await file.arrayBuffer());
                await writeFile(filePath, buffer);

                const fileUrl = `/admin-assets/about/${fileName}`;
                const fileTargetField = formData.get("fileTargetField") || (sectionKey === "hero" ? "mediaUrl" : "image");
                content[fileTargetField] = fileUrl;
            }
        } else {
            const json = await request.json();
            content = json.content !== undefined ? json.content : json;
            sectionName = json.sectionName || null;
        }

        const updated = await AboutModel.updateSection(sectionKey, content, sectionName);
        return {
            status: 200,
            body: {
                success: true,
                message: "About section updated successfully.",
                section: updated,
            },
        };
    } catch (error) {
        console.error("AboutController.updateAboutSection error:", error);
        return { status: 500, body: { success: false, error: error.message || "Failed to update section." } };
    }
}

export async function uploadAboutAsset(request) {
    try {
        await mkdir(UPLOAD_DIR, { recursive: true });

        const formData = await request.formData();
        const file = formData.get("file") || formData.get("image") || formData.get("media");

        if (!file || typeof file === "string" || file.size === 0) {
            return { status: 400, body: { success: false, error: "Please select a file to upload." } };
        }

        const isImage = IMAGE_TYPES.includes(file.type);
        const isVideo = VIDEO_TYPES.includes(file.type);

        if (!isImage && !isVideo) {
            return {
                status: 400,
                body: { success: false, error: "Invalid file type. Allowed: JPG, PNG, WEBP, AVIF, MP4, WEBM." },
            };
        }

        const fallbackExt = isVideo ? ".webm" : ".webp";
        const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, file.name, fallbackExt);

        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);

        const url = `/admin-assets/about/${fileName}`;

        return {
            status: 201,
            body: {
                success: true,
                message: "Asset uploaded successfully with original filename.",
                url,
                fileName,
            },
        };
    } catch (error) {
        console.error("AboutController.uploadAboutAsset error:", error);
        return { status: 500, body: { success: false, error: error.message || "Upload failed." } };
    }
}

export async function updateAllAboutContent(request) {
    try {
        const json = await request.json();
        const sectionsData = json.sections || json;

        if (!sectionsData || typeof sectionsData !== "object") {
            return { status: 400, body: { success: false, error: "Invalid sections payload." } };
        }

        const updated = await AboutModel.updateAllSections(sectionsData);
        return {
            status: 200,
            body: {
                success: true,
                message: "All About page sections updated successfully.",
                sections: updated,
            },
        };
    } catch (error) {
        console.error("AboutController.updateAllAboutContent error:", error);
        return { status: 500, body: { success: false, error: error.message || "Failed to update About content." } };
    }
}
