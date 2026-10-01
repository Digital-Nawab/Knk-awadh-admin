import { NextResponse } from "next/server";
import { createGallery, listGallery } from "@/controllers/GalleryController";

export async function GET(request) {
    const { status, body } = await listGallery(request);
    return NextResponse.json(body, { status });
}

export async function POST(request) {
    const { status, body } = await createGallery(request);
    return NextResponse.json(body, { status });
}
