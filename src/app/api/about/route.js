import { NextResponse } from "next/server";
import { getAboutContent, updateAllAboutContent } from "@/controllers/AboutController";

export async function GET() {
    const { status, body } = await getAboutContent();
    return NextResponse.json(body, { status });
}

export async function PUT(request) {
    const { status, body } = await updateAllAboutContent(request);
    return NextResponse.json(body, { status });
}

export async function POST(request) {
    const { status, body } = await updateAllAboutContent(request);
    return NextResponse.json(body, { status });
}
