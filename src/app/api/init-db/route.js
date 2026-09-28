import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/initDb";

export async function GET() {
    const result = await initDatabase();
    if (!result.success) {
        return NextResponse.json(result, { status: 500 });
    }
    return NextResponse.json(result, { status: 200 });
}

export async function POST() {
    const result = await initDatabase();
    if (!result.success) {
        return NextResponse.json(result, { status: 500 });
    }
    return NextResponse.json(result, { status: 200 });
}
