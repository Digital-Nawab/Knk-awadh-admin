import { stat, mkdir, writeFile, unlink } from "fs/promises";
import path from "path";

/**
 * Returns a safe, URL-friendly, Linux-safe filename that preserves uniqueness.
 * Replaces whitespace, accents, and special characters with clean dashes/underscores,
 * ensuring Linux live servers and browsers won't 404 due to space/case mismatches.
 */
export async function getSafeOriginalFilename(targetDir, originalName, fallbackExt = ".webp") {
    await mkdir(targetDir, { recursive: true });

    const rawExt = path.extname(originalName || "") || fallbackExt;
    const ext = rawExt.toLowerCase();

    // Sanitize the base name:
    // 1. Remove accents/diacritics
    // 2. Replace non-alphanumeric characters (except dots and dashes) with hyphen
    // 3. Collapse multiple hyphens/dots
    // 4. Trim leading/trailing hyphens/dots
    let base = path.basename(originalName || "upload", rawExt)
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9.-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/\.+/g, ".")
        .replace(/^[-.]+|[-.]+$/g, "")
        .trim();

    if (!base) {
        base = "upload";
    }

    let fileName = `${base}${ext}`;
    let filePath = path.join(targetDir, fileName);

    let counter = 1;
    while (true) {
        try {
            await stat(filePath);
            // File already exists; try base-1.ext, base-2.ext, etc.
            fileName = `${base}-${counter}${ext}`;
            filePath = path.join(targetDir, fileName);
            counter++;
        } catch (err) {
            if (err.code === "ENOENT") {
                // Name is free to use
                break;
            }
            throw err;
        }
    }

    return { fileName, filePath };
}

/**
 * Writes the upload buffer to the target file path.
 * In production/standalone environments, automatically mirrors to .next/standalone/public
 * if that directory exists, ensuring zero 404s across all Next.js deployment architectures.
 */
export async function writeUploadBuffer(primaryFilePath, buffer) {
    await mkdir(path.dirname(primaryFilePath), { recursive: true });
    await writeFile(primaryFilePath, buffer);

    // If standalone deployment directory exists on live server, mirror there
    try {
        const publicDir = path.join(process.cwd(), "public");
        const relativeToPublic = path.relative(publicDir, primaryFilePath);
        if (!relativeToPublic.startsWith("..") && !path.isAbsolute(relativeToPublic)) {
            const standalonePath = path.join(process.cwd(), ".next", "standalone", "public", relativeToPublic);
            await mkdir(path.dirname(standalonePath), { recursive: true });
            await writeFile(standalonePath, buffer);
        }
    } catch {
        // Standalone not present, safe to ignore
    }
}

/**
 * Safely unlinks a file from primary and standalone directories if it exists.
 */
export async function deleteUploadFile(publicRelativeOrFullPath) {
    if (!publicRelativeOrFullPath) return;

    let relativePath = publicRelativeOrFullPath;
    if (path.isAbsolute(relativePath)) {
        relativePath = path.relative(path.join(process.cwd(), "public"), relativePath);
    }
    if (relativePath.startsWith("/")) {
        relativePath = relativePath.slice(1);
    }

    const candidatePaths = [
        path.join(process.cwd(), "public", relativePath),
        path.join(process.cwd(), ".next", "standalone", "public", relativePath),
    ];

    for (const p of candidatePaths) {
        try {
            await unlink(p);
        } catch (err) {
            if (err.code !== "ENOENT") {
                console.warn("[deleteUploadFile] Unlink error:", err);
            }
        }
    }
}

