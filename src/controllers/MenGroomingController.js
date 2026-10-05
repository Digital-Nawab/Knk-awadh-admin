import { writeFile, mkdir } from "fs/promises";
import path from "path";
import MenGroomingModel from "@/models/MenGroomingModel";
import { getSafeOriginalFilename } from "@/lib/uploadHelper";

const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "men-grooming");
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml", "image/jpg"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];

export async function getMenGroomingContent() {
    try {
        const sections = await MenGroomingModel.getAllSections();
        return { status: 200, body: { success: true, sections } };
    } catch (error) {
        console.error("MenGroomingController.getMenGroomingContent error:", error);
        return {
            status: 500,
            body: { success: false, error: error.message || "Failed to load Men Grooming page content." },
        };
    }
}

export async function getMenGroomingSection(sectionKey) {
    try {
        const section = await MenGroomingModel.getSection(sectionKey);
        return { status: 200, body: { success: true, section } };
    } catch (error) {
        console.error("MenGroomingController.getMenGroomingSection error:", error);
        return { status: 500, body: { success: false, error: error.message || "Failed to load section." } };
    }
}

export async function updateMenGroomingSection(param1, param2) {
    try {
        await mkdir(UPLOAD_DIR, { recursive: true });

        let sectionKey = typeof param1 === "string" ? param1 : null;
        const request = typeof param1 === "string" ? param2 : param1;

        const contentType = request.headers.get("content-type") || "";
        let content = {};
        let sectionName = null;

        if (contentType.includes("multipart/form-data") || contentType.includes("form-data")) {
            const formData = await request.formData();

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
            if (!sectionKey) {
                sectionKey = formData.get("sectionKey") || null;
            }

            const file = formData.get("file") || formData.get("image") || formData.get("media");
            if (file && typeof file !== "string" && file.size > 0) {
                const isImage = IMAGE_TYPES.includes(file.type);
                const isVideo = VIDEO_TYPES.includes(file.type);

                if (isImage || isVideo) {
                    const fallbackExt = isVideo ? ".webm" : ".webp";
                    const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, file.name, fallbackExt);
                    const buffer = Buffer.from(await file.arrayBuffer());
                    await writeFile(filePath, buffer);
                    const fileUrl = `/admin-assets/men-grooming/${fileName}`;

                    if (isVideo) {
                        content.mediaUrl = fileUrl;
                        content.mediaType = "video";
                    } else {
                        content.image = fileUrl;
                    }
                }
            }
        } else {
            const body = await request.json();
            content = body.content || body;
            sectionName = body.sectionName || null;
            if (!sectionKey) {
                sectionKey = body.sectionKey || null;
            }
        }

        if (!sectionKey && request.url) {
            const { searchParams } = new URL(request.url);
            sectionKey = searchParams.get("section");
        }

        if (!sectionKey) {
            return { status: 400, body: { success: false, error: "Section key is required." } };
        }

        const updated = await MenGroomingModel.updateSection(sectionKey, content, sectionName);

        return {
            status: 200,
            body: {
                success: true,
                message: `Section '${sectionKey}' updated successfully.`,
                section: updated,
            },
        };
    } catch (error) {
        console.error("MenGroomingController.updateMenGroomingSection error:", error);
        return { status: 500, body: { success: false, error: error.message || "Failed to update section." } };
    }
}

export async function uploadMenGroomingAsset(request) {
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
                body: { success: false, error: "Invalid file type. Allowed: JPG, PNG, WEBP, AVIF, SVG, MP4, WEBM." },
            };
        }

        const fallbackExt = isVideo ? ".webm" : ".webp";
        const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, file.name, fallbackExt);

        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);

        const url = `/admin-assets/men-grooming/${fileName}`;

        return {
            status: 201,
            body: {
                success: true,
                message: "Asset uploaded successfully.",
                url,
                fileName,
            },
        };
    } catch (error) {
        console.error("MenGroomingController.uploadMenGroomingAsset error:", error);
        return { status: 500, body: { success: false, error: error.message || "Upload failed." } };
    }
}

export async function updateAllMenGroomingContent(request) {
    try {
        const body = await request.json();
        const sectionsData = body.sections || body;

        if (!sectionsData || typeof sectionsData !== "object") {
            return { status: 400, body: { success: false, error: "Invalid sections payload." } };
        }

        const updated = await MenGroomingModel.updateAllSections(sectionsData);

        return {
            status: 200,
            body: {
                success: true,
                message: "All Men Grooming page sections updated successfully.",
                sections: updated,
            },
        };
    } catch (error) {
        console.error("MenGroomingController.updateAllMenGroomingContent error:", error);
        return { status: 500, body: { success: false, error: error.message || "Failed to update all sections." } };
    }
}
