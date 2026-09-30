import { stat, mkdir } from "fs/promises";
import path from "path";

/**
 * Returns a safe filename that preserves the uploaded file's original name and extension.
 * If a file with that name already exists in targetDir, appends -1, -2, etc.
 * to safely avoid accidentally overwriting existing files without generating random hashes/UUIDs.
 */
export async function getSafeOriginalFilename(targetDir, originalName, fallbackExt = ".webp") {
    await mkdir(targetDir, { recursive: true });

    const rawExt = path.extname(originalName || "") || fallbackExt;
    const ext = rawExt.toLowerCase();

    // Sanitize the base name (remove path traversal & invalid filesystem characters)
    let base = path.basename(originalName || "upload", rawExt)
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
        .replace(/\.+/g, ".")
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
