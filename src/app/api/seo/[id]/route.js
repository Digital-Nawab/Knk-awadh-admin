import { NextResponse } from "next/server";
import { getSeoById, updateSeo, deleteSeo } from "@/controllers/SeoController";

export async function GET(req, { params }) {
    const { id } = await params;
    const result = await getSeoById(id);
    return NextResponse.json(result.body, { status: result.status });
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const result = await updateSeo(id, req);
    return NextResponse.json(result.body, { status: result.status });
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    const result = await deleteSeo(id);
    return NextResponse.json(result.body, { status: result.status });
}
