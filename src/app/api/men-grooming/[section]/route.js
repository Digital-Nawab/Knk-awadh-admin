import { NextResponse } from "next/server";
import {
    getMenGroomingSection,
    updateMenGroomingSection,
} from "@/controllers/MenGroomingController";

export async function GET(request, { params }) {
    const { section } = await params;
    const { status, body } = await getMenGroomingSection(section);
    return NextResponse.json(body, { status });
}

export async function PUT(request, { params }) {
    const { section } = await params;
    const { status, body } = await updateMenGroomingSection(section, request);
    return NextResponse.json(body, { status });
}

export async function PATCH(request, { params }) {
    const { section } = await params;
    const { status, body } = await updateMenGroomingSection(section, request);
    return NextResponse.json(body, { status });
}
