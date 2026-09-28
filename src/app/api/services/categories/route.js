import { NextResponse } from "next/server";
import { listCategories, createCategory } from "@/controllers/ServiceController";

export async function GET(request) {
    const { status, body } = await listCategories(request);
    return NextResponse.json(body, { status });
}

export async function POST(request) {
    const { status, body } = await createCategory(request);
    return NextResponse.json(body, { status });
}
