import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/controllers/ServiceController";

export async function GET(request, { params }) {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const { status, body } = await getServiceBySlug(slug, category);
    return NextResponse.json(body, { status });
}
