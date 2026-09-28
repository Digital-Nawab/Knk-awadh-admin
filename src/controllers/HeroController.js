import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import HeroModel from "@/models/HeroModel";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "hero");

export async function createHero(request) {
    const formData = await request.formData();

    const media = formData.get("media");
    const altText = formData.get("altText");
    const isActive = formData.get("isActive") === "true";

    if (!media || typeof media === "string") {
        return { status: 400, body: { error: "Media file is required." } };
    }
    if (!altText || !altText.trim()) {
        return { status: 400, body: { error: "Alt text is required." } };
    }

    const isImage = IMAGE_TYPES.includes(media.type);
    const isVideo = VIDEO_TYPES.includes(media.type);

    if (!isImage && !isVideo) {
        return { status: 400, body: { error: "Unsupported file type." } };
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const fileName = media.name;
    const filePath = path.join(UPLOAD_DIR, fileName);

    const buffer = Buffer.from(await media.arrayBuffer());
    await writeFile(filePath, buffer);

    const mediaUrl = `/admin-assets/hero/${fileName}`;
    const mediaType = isVideo ? "video" : "image";

    const hero = await HeroModel.create({ mediaUrl, mediaType, altText, isActive });

    return { status: 201, body: { message: "Hero created successfully.", hero } };
}

export async function listHeroes() {
    const heroes = await HeroModel.getAll();
    return { status: 200, body: { heroes } };
}
export async function updateHeroStatus(id, request) {
    const { isActive } = await request.json();
    await HeroModel.updateStatus(id, isActive);
    return { status: 200, body: { message: "Status updated." } };
}

export async function deleteHero(id) {
    const hero = await HeroModel.getById(id);
    if (!hero) {
        return { status: 404, body: { error: "Hero not found." } };
    }

    if (hero.media_url) {
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