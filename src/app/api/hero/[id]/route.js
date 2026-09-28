import { NextResponse } from "next/server";
import { updateHeroStatus, deleteHero } from "@/controllers/HeroController";

export async function PATCH(request, { params }) {
    const { id } = await params;
    const { status, body } = await updateHeroStatus(id, request);
    return NextResponse.json(body, { status });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const { status, body } = await deleteHero(id);
    return NextResponse.json(body, { status });
}