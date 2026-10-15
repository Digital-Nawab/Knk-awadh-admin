import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * On-Demand Cache Clearing Route Handler
 * Usage in Browser or Postman:
 * 1. Entire website:
 *    GET /api/clear-cache?key=knk2026
 *
 * 2. Specific page:
 *    GET /api/clear-cache?key=knk2026&path=/services
 *
 * 3. Specific tag:
 *    GET /api/clear-cache?key=knk2026&tag=blogs
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Security key check (default to knk2026 or from .env)
        const secretKey = process.env.REVALIDATE_SECRET || "knk2026";
        const providedKey = searchParams.get("key") || searchParams.get("secret");

        if (providedKey !== secretKey) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized: Invalid or missing security key. Please pass '?key=knk2026'.",
                },
                { status: 401 }
            );
        }

        const path = searchParams.get("path");
        const tag = searchParams.get("tag");

        // 1. If tag is provided, revalidate that specific tag
        if (tag) {
            revalidateTag(tag);
            return NextResponse.json({
                success: true,
                type: "tag",
                tag,
                message: `Cache successfully cleared for tag: "${tag}"`,
                timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            });
        }

        // 2. If specific path is provided, revalidate that path
        if (path) {
            revalidatePath(path, "page");
            revalidatePath(path, "layout");
            return NextResponse.json({
                success: true,
                type: "path",
                path,
                message: `Cache successfully cleared for path: "${path}"`,
                timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            });
        }

        // 3. By default, revalidate the entire website (root layout invalidates all children)
        revalidatePath("/", "layout");
        revalidatePath("/");

        return NextResponse.json({
            success: true,
            type: "entire_site",
            message: "All page caches cleared successfully across the entire website!",
            timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });
    } catch (error) {
        console.error("Cache clear error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to clear cache",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    return GET(request);
}
