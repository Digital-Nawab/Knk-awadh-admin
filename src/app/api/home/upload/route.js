import { NextResponse } from "next/server";
import { uploadHomeAsset } from "@/controllers/HomeController";

export async function POST(request) {
    const { status, body } = await uploadHomeAsset(request);
    return NextResponse.json(body, { status });
}
