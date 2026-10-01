import { NextResponse } from "next/server";
import { uploadAboutAsset } from "@/controllers/AboutController";

export async function POST(request) {
    const { status, body } = await uploadAboutAsset(request);
    return NextResponse.json(body, { status });
}
