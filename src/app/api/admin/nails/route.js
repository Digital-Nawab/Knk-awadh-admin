import { NextResponse } from "next/server";
import { getNailsContent, updateNailsSection } from "@/controllers/NailsController";

export const dynamic = "force-dynamic";

export async function GET() {
    const { status, body } = await getNailsContent();
    return NextResponse.json(body, { status });
}

export async function POST(req) {
    const { status, body } = await updateNailsSection(null, req);
    return NextResponse.json(body, { status });
}

export async function PATCH(req) {
    const { status, body } = await updateNailsSection(null, req);
    return NextResponse.json(body, { status });
}
