import { NextResponse } from "next/server";
import { uploadNailsAsset } from "@/controllers/NailsController";

export const dynamic = "force-dynamic";

export async function POST(req) {
    const { status, body } = await uploadNailsAsset(req);
    return NextResponse.json(body, { status });
}
