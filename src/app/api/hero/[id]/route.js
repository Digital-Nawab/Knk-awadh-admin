import { NextResponse } from "next/server";
import { getHero, updateHero, deleteHero } from "@/controllers/HeroController";

export async function GET(request, { params }) {
    const { id } = await params;
    const { status, body } = await getHero(id);
    return NextResponse.json(body, { status });
}

export async function PATCH(request, { params }) {
    const { id } = await params;
    const { status, body } = await updateHero(id, request);
    return NextResponse.json(body, { status });
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const { status, body } = await updateHero(id, request);
    return NextResponse.json(body, { status });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const { status, body } = await deleteHero(id);
    return NextResponse.json(body, { status });
}