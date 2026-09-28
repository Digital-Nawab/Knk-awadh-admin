import { NextResponse } from "next/server";
import { createSeo, listSeo } from "@/controllers/SeoController";

export async function GET(req) {
    const result = await listSeo(req);
    return NextResponse.json(result.body, { status: result.status });
}

export async function POST(req) {
    const result = await createSeo(req);
    return NextResponse.json(result.body, { status: result.status });
}
