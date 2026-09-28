import { NextResponse } from "next/server";
import { getCategoryBySlug } from "@/controllers/ServiceController";

export async function GET(request, { params }) {
    const { slug } = await params;
    const { status, body } = await getCategoryBySlug(slug);
    return NextResponse.json(body, { status });
}
