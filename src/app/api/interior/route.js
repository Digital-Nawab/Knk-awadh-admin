import { NextResponse } from "next/server";
import { createInterior, listInterior } from "@/controllers/InteriorController";

export async function GET(request) {
    const { status, body } = await listInterior(request);
    return NextResponse.json(body, { status });
}

export async function POST(request) {
    const { status, body } = await createInterior(request);
    return NextResponse.json(body, { status });
}
