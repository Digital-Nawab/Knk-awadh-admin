import { writeFile, mkdir } from "fs/promises";
import path from "path";
import NailsModel from "@/models/NailsModel";
import { getSafeOriginalFilename, writeUploadBuffer } from "@/lib/uploadHelper";

const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "nails");
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml", "image/jpg"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];

export async function getNailsContent() {
    try {
        const sections = await NailsModel.getAllSections();
        return { status: 200, body: { success: true, sections } };
    } catch (error) {
        console.error("NailsController.getNailsContent error:", error);
        return {
            status: 500,
            body: { success: false, error: error.message || "Failed to load Nails Services page content." },
        };
    }
}

export async function getNailsSection(sectionKey) {
    try {
        const section = await NailsModel.getSection(sectionKey);
        return { status: 200, body: { success: true, section } };
    } catch (error) {
        console.error("NailsController.getNailsSection error:", error);
        return { status: 500, body: { success: false, error: error.message || "Failed to load section." } };
    }
}

export async function updateNailsSection(param1, param2) {
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
                    if (key !== "file" && key !== "image" && key !== "video" && key !== "poster" && key !== "media") {
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

            // Handle main file upload (file/image/video/media)
            const file = formData.get("file") || formData.get("image") || formData.get("media");
            if (file && typeof file !== "string" && file.size > 0) {
                const isImage = IMAGE_TYPES.includes(file.type);
                const isVideo = VIDEO_TYPES.includes(file.type);

                if (isImage || isVideo) {
                    const fallbackExt = isVideo ? ".mp4" : ".webp";
                    const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, file.name, fallbackExt);
                    const buffer = Buffer.from(await file.arrayBuffer());
                    await writeUploadBuffer(filePath, buffer);
                    const fileUrl = `/admin-assets/nails/${fileName}`;

                    if (isVideo) {
                        content.videoUrl = fileUrl;
                        content.mediaUrl = fileUrl;
                        content.mediaType = "video";
                    } else {
                        content.image = fileUrl;
                        if (!content.mediaType || content.mediaType === "image") {
                            content.mediaUrl = fileUrl;
                            content.mediaType = "image";
                        }
                    }
                }
            }

            // Handle video specifically if named "video"
            const videoFile = formData.get("video");
            if (videoFile && typeof videoFile !== "string" && videoFile.size > 0) {
                const isVideo = VIDEO_TYPES.includes(videoFile.type) || videoFile.name.endsWith(".mp4") || videoFile.name.endsWith(".webm");
                if (isVideo) {
                    const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, videoFile.name, ".mp4");
                    const buffer = Buffer.from(await videoFile.arrayBuffer());
                    await writeUploadBuffer(filePath, buffer);
                    const fileUrl = `/admin-assets/nails/${fileName}`;
                    content.videoUrl = fileUrl;
                    content.mediaUrl = fileUrl;
                    content.mediaType = "video";
                }
            }

            // Handle poster/thumbnail specifically if provided
            const posterFile = formData.get("poster") || formData.get("thumbnail");
            if (posterFile && typeof posterFile !== "string" && posterFile.size > 0) {
                const isImage = IMAGE_TYPES.includes(posterFile.type);
                if (isImage) {
                    const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, posterFile.name, ".webp");
                    const buffer = Buffer.from(await posterFile.arrayBuffer());
                    await writeUploadBuffer(filePath, buffer);
                    const posterUrl = `/admin-assets/nails/${fileName}`;
                    content.posterUrl = posterUrl;
                    content.thumbnailUrl = posterUrl;
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
            try {
                const url = new URL(request.url);
                const parts = url.pathname.split("/").filter(Boolean);
                const last = parts[parts.length - 1];
                if (last && last !== "nails") {
                    sectionKey = last;
                }
            } catch {
                // ignore
            }
        }

        if (!sectionKey) {
            return {
                status: 400,
                body: { success: false, error: "Section key is required to update section." },
            };
        }

        const updated = await NailsModel.updateSection(sectionKey, content, sectionName);
        return {
            status: 200,
            body: { success: true, message: `Section '${sectionKey}' updated successfully.`, section: updated },
        };
    } catch (error) {
        console.error("NailsController.updateNailsSection error:", error);
        return {
            status: 500,
            body: { success: false, error: error.message || "Failed to update Nails Services section." },
        };
    }
}

export async function uploadNailsAsset(request) {
    try {
        await mkdir(UPLOAD_DIR, { recursive: true });

        const formData = await request.formData();
        const file = formData.get("file") || formData.get("image") || formData.get("video") || formData.get("media");

        if (!file || typeof file === "string" || file.size === 0) {
            return { status: 400, body: { success: false, error: "Valid file is required for upload." } };
        }

        const isImage = IMAGE_TYPES.includes(file.type);
        const isVideo = VIDEO_TYPES.includes(file.type);

        if (!isImage && !isVideo) {
            return {
                status: 400,
                body: { success: false, error: "Unsupported file format. Allowed: JPG, PNG, WEBP, AVIF, MP4, WEBM." },
            };
        }

        const fallbackExt = isVideo ? ".mp4" : ".webp";
        const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, file.name, fallbackExt);
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeUploadBuffer(filePath, buffer);

        const url = `/admin-assets/nails/${fileName}`;

        return {
            status: 200,
            body: {
                success: true,
                url,
                fileName,
                type: isVideo ? "video" : "image",
                message: "Asset uploaded successfully.",
            },
        };
    } catch (error) {
        console.error("NailsController.uploadNailsAsset error:", error);
        return { status: 500, body: { success: false, error: error.message || "Upload failed." } };
    }
}
