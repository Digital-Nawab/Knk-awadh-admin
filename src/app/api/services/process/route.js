import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const defaultSteps = {
    eyebrow: "How It Works",
    title: "Simple, from",
    titleHighlight: "start to finish.",
    steps: [
        { n: "01", title: "Choose Your Service", text: "Browse the list below or tell us the occasion — we'll suggest what fits." },
        { n: "02", title: "Book a Slot", text: "Call, WhatsApp, or fill the form and pick a time that works for you." },
        { n: "03", title: "Meet Your Artist", text: "You're matched with the specialist best suited to what you need." },
        { n: "04", title: "Leave Glowing", text: "Walk out looking — and feeling — exactly the way you wanted to." },
    ],
};

function normalizeSlug(raw = "") {
    const s = String(raw).toLowerCase().trim();
    if (s === "nail-art" || s === "nails") return "nails";
    if (s === "hair") return "hair";
    if (s === "beauty") return "beauty";
    if (s === "facial") return "facial";
    if (s === "body") return "body";
    return s || "nails";
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryParam = searchParams.get("category") || searchParams.get("slug");

        if (searchParams.get("all") === "true" || !categoryParam) {
            const [rows] = await db.query("SELECT category_slug, category_name, content FROM service_process_steps");
            const map = {};
            for (const r of rows) {
                map[r.category_slug] = typeof r.content === "string" ? JSON.parse(r.content) : r.content;
            }
            return NextResponse.json({ success: true, data: map });
        }

        const slug = normalizeSlug(categoryParam);
        const [rows] = await db.query(
            "SELECT category_slug, category_name, content FROM service_process_steps WHERE category_slug = ? LIMIT 1",
            [slug]
        );

        if (rows.length === 0) {
            return NextResponse.json({
                success: true,
                categorySlug: slug,
                process: defaultSteps,
            });
        }

        const content = typeof rows[0].content === "string" ? JSON.parse(rows[0].content) : rows[0].content;
        return NextResponse.json({
            success: true,
            categorySlug: slug,
            categoryName: rows[0].category_name,
            process: content,
        });
    } catch (err) {
        console.error("GET /api/services/process error:", err);
        return NextResponse.json(
            { success: false, error: err.message || "Failed to fetch process steps", process: defaultSteps },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const body = await request.json().catch(() => ({}));
        const rawSlug = body.categorySlug || body.category || body.slug || "nails";
        const slug = normalizeSlug(rawSlug);
        const categoryName = body.categoryName || (slug.charAt(0).toUpperCase() + slug.slice(1));
        const content = body.content || body.process || body;

        const contentToSave = {
            eyebrow: content.eyebrow || "How It Works",
            title: content.title || "Simple, from",
            titleHighlight: content.titleHighlight || "start to finish.",
            steps: Array.isArray(content.steps) && content.steps.length > 0 ? content.steps : defaultSteps.steps,
        };

        await db.query(
            `INSERT INTO service_process_steps (category_slug, category_name, content)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE category_name = VALUES(category_name), content = VALUES(content)`,
            [slug, categoryName, JSON.stringify(contentToSave)]
        );

        // Also synchronize nails_sections if the updated category is nails
        if (slug === "nails") {
            try {
                await db.query(
                    `UPDATE nails_sections SET content = ? WHERE section_key = 'process'`,
                    [JSON.stringify(contentToSave)]
                );
            } catch {}
        }

        return NextResponse.json({
            success: true,
            message: `Process steps for ${categoryName} saved successfully!`,
            categorySlug: slug,
            process: contentToSave,
        });
    } catch (err) {
        console.error("PUT /api/services/process error:", err);
        return NextResponse.json(
            { success: false, error: err.message || "Failed to save process steps" },
            { status: 500 }
        );
    }
}
