import { NextResponse } from "next/server";
import { getGallery, updateGallery, deleteGallery } from "@/controllers/GalleryController";

export async function GET(request, { params }) {
    const { id } = await params;
    const { status, body } = await getGallery(id);
    return NextResponse.json(body, { status });
}

export async function PATCH(request, { params }) {
    const { id } = await params;
    const { status, body } = await updateGallery(id, request);
    return NextResponse.json(body, { status });
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const { status, body } = await updateGallery(id, request);
    return NextResponse.json(body, { status });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const { status, body } = await deleteGallery(id);
    return NextResponse.json(body, { status });
}
