import { NextResponse } from "next/server";
import { uploadMenGroomingAsset } from "@/controllers/MenGroomingController";

export async function POST(request) {
    const { status, body } = await uploadMenGroomingAsset(request);
    return NextResponse.json(body, { status });
}
