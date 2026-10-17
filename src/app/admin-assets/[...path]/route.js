import { stat } from "fs/promises";
import { createReadStream } from "fs";
import { Readable } from "stream";
import path from "path";

export const dynamic = "force-dynamic";

const MIME_TYPES = {
    ".webp": "image/webp",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".gif": "image/gif",
    ".avif": "image/avif",
    ".ico": "image/x-icon",
    ".bmp": "image/bmp",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".ogv": "video/ogg",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".pdf": "application/pdf",
};

/**
 * Searches for the asset across possible public directory locations:
 * - standard project root (process.cwd()/public/admin-assets)
 * - standalone output (.next/standalone/public/admin-assets)
 * - relative public directory
 */
async function findAssetFile(pathSegments) {
    if (!pathSegments || pathSegments.length === 0) return null;

    const rawPath = Array.isArray(pathSegments) ? pathSegments.join("/") : String(pathSegments);
    let decodedPath = rawPath;
    try {
        decodedPath = decodeURIComponent(rawPath);
    } catch {
        decodedPath = rawPath;
    }

    // Guard against path traversal attacks
    if (decodedPath.includes("..") || decodedPath.includes("\0")) {
        return null;
    }

    const candidateBases = [
        path.join(process.cwd(), "public", "admin-assets"),
        path.resolve("public", "admin-assets"),
        path.join(process.cwd(), ".next", "standalone", "public", "admin-assets"),
        path.join(process.cwd(), "..", "public", "admin-assets"),
    ];

    const pathsToTry = [decodedPath];
    if (decodedPath !== rawPath) {
        pathsToTry.push(rawPath);
    }

    for (const base of candidateBases) {
        for (const p of pathsToTry) {
            const fullPath = path.join(/*turbopackIgnore: true*/ base, p);
            try {
                const s = await stat(/*turbopackIgnore: true*/ fullPath);
                if (s.isFile()) {
                    return { filePath: fullPath, stat: s };
                }
            } catch {
                // Continue to next candidate
            }
        }
    }

    return null;
}

export async function GET(request, { params }) {
    try {
        const resolvedParams = await params;
        const pathSegments = resolvedParams?.path || [];

        const asset = await findAssetFile(pathSegments);
        if (!asset) {
            return new Response("Asset not found", { status: 404 });
        }

        const { filePath, stat: fileStat } = asset;
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        const etag = `W/"${fileStat.size}-${fileStat.mtime.getTime()}"`;

        // 304 Not Modified validation for browser and CDN caching
        const ifNoneMatch = request.headers.get("if-none-match");
        if (ifNoneMatch && ifNoneMatch === etag) {
            return new Response(null, { status: 304 });
        }

        // Support HTTP Range requests for video/audio streaming (e.g. Hero reels on iOS/Safari)
        const range = request.headers.get("range");
        if (range && (contentType.startsWith("video/") || contentType.startsWith("audio/"))) {
            const match = range.match(/bytes=(\d+)-(\d*)/);
            if (match) {
                const start = parseInt(match[1], 10);
                const end = match[2] ? parseInt(match[2], 10) : fileStat.size - 1;

                if (start >= fileStat.size || end >= fileStat.size || start > end) {
                    return new Response("Requested range not satisfiable", {
                        status: 416,
                        headers: { "Content-Range": `bytes */${fileStat.size}` },
                    });
                }

                const chunksize = end - start + 1;
                const nodeStream = createReadStream(/*turbopackIgnore: true*/ filePath, { start, end });
                const webStream = Readable.toWeb(nodeStream);

                return new Response(webStream, {
                    status: 206,
                    headers: {
                        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
                        "Accept-Ranges": "bytes",
                        "Content-Length": String(chunksize),
                        "Content-Type": contentType,
                        "Cache-Control": "public, max-age=31536000, immutable",
                        ETag: etag,
                    },
                });
            }
        }

        // Standard 200 Streaming Response
        const nodeStream = createReadStream(/*turbopackIgnore: true*/ filePath);
        const webStream = Readable.toWeb(nodeStream);

        return new Response(webStream, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Content-Length": String(fileStat.size),
                "Cache-Control": "public, max-age=31536000, immutable",
                "Accept-Ranges": "bytes",
                ETag: etag,
                "Last-Modified": fileStat.mtime.toUTCString(),
            },
        });
    } catch (error) {
        console.error("[admin-assets route error]:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function HEAD(request, { params }) {
    try {
        const resolvedParams = await params;
        const pathSegments = resolvedParams?.path || [];

        const asset = await findAssetFile(pathSegments);
        if (!asset) {
            return new Response(null, { status: 404 });
        }

        const { filePath, stat: fileStat } = asset;
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        const etag = `W/"${fileStat.size}-${fileStat.mtime.getTime()}"`;

        return new Response(null, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Content-Length": String(fileStat.size),
                "Cache-Control": "public, max-age=31536000, immutable",
                "Accept-Ranges": "bytes",
                ETag: etag,
                "Last-Modified": fileStat.mtime.toUTCString(),
            },
        });
    } catch {
        return new Response(null, { status: 500 });
    }
}
