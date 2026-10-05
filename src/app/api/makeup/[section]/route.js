import { NextResponse } from "next/server";
import { getMakeupSection, updateMakeupSection } from "@/controllers/MakeupController";

export async function GET(request, { params }) {
    const { section } = await params;
    const { status, body } = await getMakeupSection(section);
    return NextResponse.json(body, { status });
}

export async function PUT(request, { params }) {
    const { section } = await params;
    const { status, body } = await updateMakeupSection(section, request);
    return NextResponse.json(body, { status });
}

export async function PATCH(request, { params }) {
    const { section } = await params;
    const { status, body } = await updateMakeupSection(section, request);
    return NextResponse.json(body, { status });
}
