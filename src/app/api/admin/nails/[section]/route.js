import { NextResponse } from "next/server";
import { getNailsSection, updateNailsSection } from "@/controllers/NailsController";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
    const { section } = await params;
    const { status, body } = await getNailsSection(section);
    return NextResponse.json(body, { status });
}

export async function PATCH(req, { params }) {
    const { section } = await params;
    const { status, body } = await updateNailsSection(section, req);
    return NextResponse.json(body, { status });
}

export async function PUT(req, { params }) {
    const { section } = await params;
    const { status, body } = await updateNailsSection(section, req);
    return NextResponse.json(body, { status });
}

export async function POST(req, { params }) {
    const { section } = await params;
    const { status, body } = await updateNailsSection(section, req);
    return NextResponse.json(body, { status });
}
