import { NextResponse } from "next/server";
import { getHomeContent, updateAllHomeContent } from "@/controllers/HomeController";

export async function GET() {
    const { status, body } = await getHomeContent();
    return NextResponse.json(body, { status });
}

export async function PUT(request) {
    const { status, body } = await updateAllHomeContent(request);
    return NextResponse.json(body, { status });
}

export async function POST(request) {
    const { status, body } = await updateAllHomeContent(request);
    return NextResponse.json(body, { status });
}
