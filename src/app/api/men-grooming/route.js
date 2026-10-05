import { NextResponse } from "next/server";
import {
    getMenGroomingContent,
    updateAllMenGroomingContent,
} from "@/controllers/MenGroomingController";

export async function GET() {
    const { status, body } = await getMenGroomingContent();
    return NextResponse.json(body, { status });
}

export async function PUT(request) {
    const { status, body } = await updateAllMenGroomingContent(request);
    return NextResponse.json(body, { status });
}

export async function POST(request) {
    const { status, body } = await updateAllMenGroomingContent(request);
    return NextResponse.json(body, { status });
}
