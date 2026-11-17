import { NextResponse } from "next/server";
import { getNailsContent } from "@/controllers/NailsController";

export const dynamic = "force-dynamic";

export async function GET() {
    const { status, body } = await getNailsContent();
    return NextResponse.json(body, { status });
}
