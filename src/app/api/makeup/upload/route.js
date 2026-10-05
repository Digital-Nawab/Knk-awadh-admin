import { NextResponse } from "next/server";
import { uploadMakeupAsset } from "@/controllers/MakeupController";

export async function POST(request) {
    const { status, body } = await uploadMakeupAsset(request);
    return NextResponse.json(body, { status });
}
