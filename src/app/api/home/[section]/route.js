import { NextResponse } from "next/server";
import { getHomeSection, updateHomeSection } from "@/controllers/HomeController";

export async function GET(request, { params }) {
    const { section } = await params;
    const { status, body } = await getHomeSection(section);
    return NextResponse.json(body, { status });
}

export async function PUT(request, { params }) {
    const { section } = await params;
    const { status, body } = await updateHomeSection(section, request);
    return NextResponse.json(body, { status });
}

export async function PATCH(request, { params }) {
    const { section } = await params;
    const { status, body } = await updateHomeSection(section, request);
    return NextResponse.json(body, { status });
}
