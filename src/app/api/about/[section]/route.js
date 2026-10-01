import { NextResponse } from "next/server";
import { getAboutSection, updateAboutSection } from "@/controllers/AboutController";

export async function GET(request, { params }) {
    const { section } = await params;
    const { status, body } = await getAboutSection(section);
    return NextResponse.json(body, { status });
}

export async function PUT(request, { params }) {
    const { section } = await params;
    const { status, body } = await updateAboutSection(section, request);
    return NextResponse.json(body, { status });
}

export async function PATCH(request, { params }) {
    const { section } = await params;
    const { status, body } = await updateAboutSection(section, request);
    return NextResponse.json(body, { status });
}
