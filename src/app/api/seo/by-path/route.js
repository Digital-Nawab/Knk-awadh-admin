import { NextResponse } from "next/server";
import { getSeoByPath } from "@/controllers/SeoController";

export async function GET(req) {
    const result = await getSeoByPath(req);
    return NextResponse.json(result.body, { status: result.status });
}
