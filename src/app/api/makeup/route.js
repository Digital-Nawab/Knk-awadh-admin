import { NextResponse } from "next/server";
import { getMakeupContent, updateAllMakeupContent } from "@/controllers/MakeupController";

export async function GET() {
    const { status, body } = await getMakeupContent();
    return NextResponse.json(body, { status });
}

export async function PUT(request) {
    const { status, body } = await updateAllMakeupContent(request);
    return NextResponse.json(body, { status });
}

export async function POST(request) {
    const { status, body } = await updateAllMakeupContent(request);
    return NextResponse.json(body, { status });
}
