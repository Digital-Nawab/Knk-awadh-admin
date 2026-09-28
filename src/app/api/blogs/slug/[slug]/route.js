import { NextResponse } from "next/server";
import { getBlogBySlug } from "@/controllers/BlogController";

export async function GET(req, { params }) {
    const { slug } = await params;
    const result = await getBlogBySlug(slug);
    return NextResponse.json(result.body, { status: result.status });
}
