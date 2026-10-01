import { NextResponse } from "next/server";
import { getInterior, updateInterior, deleteInterior } from "@/controllers/InteriorController";

export async function GET(request, { params }) {
    const { id } = await params;
    const { status, body } = await getInterior(id);
    return NextResponse.json(body, { status });
}

export async function PATCH(request, { params }) {
    const { id } = await params;
    const { status, body } = await updateInterior(id, request);
    return NextResponse.json(body, { status });
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const { status, body } = await updateInterior(id, request);
    return NextResponse.json(body, { status });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const { status, body } = await deleteInterior(id);
    return NextResponse.json(body, { status });
}
