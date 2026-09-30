import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import HeroModel from "@/models/HeroModel";
import { getSafeOriginalFilename } from "@/lib/uploadHelper";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "hero");

export async function createHero(request) {
    const formData = await request.formData();

    const media = formData.get("media");
    const altText = formData.get("altText");
    const isActiveRaw = formData.get("isActive");
    const isActive = isActiveRaw === "true" || isActiveRaw === true || isActiveRaw === "1" || isActiveRaw === 1;

    if (!media || typeof media === "string") {
        return { status: 400, body: { error: "Media file is required." } };
    }
    if (!altText || !altText.trim()) {
        return { status: 400, body: { error: "Alt text is required." } };
    }

    const isImage = IMAGE_TYPES.includes(media.type);
    const isVideo = VIDEO_TYPES.includes(media.type);

    if (!isImage && !isVideo) {
        return { status: 400, body: { error: "Unsupported file type. Allowed: JPG, PNG, WEBP, MP4, WEBM." } };
    }

    const fallbackExt = isVideo ? ".mp4" : ".webp";
    const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, media.name, fallbackExt);

    const buffer = Buffer.from(await media.arrayBuffer());
    await writeFile(filePath, buffer);

    const mediaUrl = `/admin-assets/hero/${fileName}`;
    const mediaType = isVideo ? "video" : "image";

    const hero = await HeroModel.create({ mediaUrl, mediaType, altText: altText.trim(), isActive });

    return { status: 201, body: { message: "Hero created successfully.", hero } };
}

export async function listHeroes(request) {
    let activeOnly = false;
    if (request && request.url) {
        try {
            const { searchParams } = new URL(request.url);
            activeOnly = searchParams.get("active") === "true";
        } catch {
            // ignore url parse error
        }
    }
    const heroes = activeOnly ? await HeroModel.getActive() : await HeroModel.getAll();
    return { status: 200, body: { heroes } };
}

export async function getHero(id) {
    const hero = await HeroModel.getById(id);
    if (!hero) {
        return { status: 404, body: { error: "Hero not found." } };
    }
    return { status: 200, body: { hero } };
}

export async function updateHero(id, request) {
    const hero = await HeroModel.getById(id);
    if (!hero) {
        return { status: 404, body: { error: "Hero not found." } };
    }

    const contentType = request.headers.get("content-type") || "";
    let altText = hero.alt_text;
    let isActive = hero.is_active;
    let media = null;

    if (contentType.includes("multipart/form-data") || contentType.includes("form-data")) {
        const formData = await request.formData();
        if (formData.has("altText")) altText = formData.get("altText");
        if (formData.has("isActive")) {
            const val = formData.get("isActive");
            isActive = val === "true" || val === true || val === "1" || val === 1;
        }
        media = formData.get("media");
    } else {
        try {
            const json = await request.json();
            if (json.altText !== undefined) altText = json.altText;
            if (json.isActive !== undefined) {
                const val = json.isActive;
                isActive = val === "true" || val === true || val === "1" || val === 1;
            }
        } catch {
            // body parse fallback
        }
    }

    if (altText !== undefined && altText !== null && typeof altText === "string" && !altText.trim()) {
        return { status: 400, body: { error: "Alt text is required." } };
    }

    let mediaUrl = null;
    let mediaType = null;

    if (media && typeof media !== "string" && media.size > 0) {
        const isImage = IMAGE_TYPES.includes(media.type);
        const isVideo = VIDEO_TYPES.includes(media.type);

        if (!isImage && !isVideo) {
            return { status: 400, body: { error: "Unsupported file type. Allowed: JPG, PNG, WEBP, MP4, WEBM." } };
        }

        const fallbackExt = isVideo ? ".mp4" : ".webp";
        const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, media.name, fallbackExt);

        const buffer = Buffer.from(await media.arrayBuffer());
        await writeFile(filePath, buffer);

        mediaUrl = `/admin-assets/hero/${fileName}`;
        mediaType = isVideo ? "video" : "image";

        // Clean up previous uploaded media if applicable
        if (hero.media_url && hero.media_url.startsWith("/admin-assets/hero/")) {
            const oldFilePath = path.join(process.cwd(), "public", hero.media_url);
            try {
                await unlink(oldFilePath);
            } catch (err) {
                if (err.code !== "ENOENT") {
                    console.error("Failed to delete previous hero media file:", err);
                }
            }
        }
    }

    await HeroModel.update(id, {
        altText: altText ? altText.trim() : hero.alt_text,
        isActive,
        mediaUrl,
        mediaType,
    });

    const updatedHero = await HeroModel.getById(id);
    return { status: 200, body: { message: "Hero updated successfully.", hero: updatedHero } };
}

export async function updateHeroStatus(id, request) {
    return updateHero(id, request);
}

export async function deleteHero(id) {
    const hero = await HeroModel.getById(id);
    if (!hero) {
        return { status: 404, body: { error: "Hero not found." } };
    }

    if (hero.media_url && hero.media_url.startsWith("/admin-assets/hero/")) {
        const filePath = path.join(process.cwd(), "public", hero.media_url);
        try {
            await unlink(filePath);
        } catch (err) {
            if (err.code !== "ENOENT") {
                console.error("Failed to delete hero media file:", err);
            }
        }
    }

    await HeroModel.hardDelete(id);
    return { status: 200, body: { message: "Hero deleted." } };
}