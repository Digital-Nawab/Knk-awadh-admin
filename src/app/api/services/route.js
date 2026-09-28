import { NextResponse } from "next/server";
import { createService, listServices } from "@/controllers/ServiceController";

export async function POST(request) {
    const { status, body } = await createService(request);
    return NextResponse.json(body, { status });
}

export async function GET(request) {
    const { status, body } = await listServices(request);
    return NextResponse.json(body, { status });
}