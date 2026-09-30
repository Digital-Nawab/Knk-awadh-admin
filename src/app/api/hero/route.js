import { NextResponse } from "next/server";
import { createHero, listHeroes } from "@/controllers/HeroController";

export async function POST(request) {
    const { status, body } = await createHero(request);
    return NextResponse.json(body, { status });
}

export async function GET(request) {
    const { status, body } = await listHeroes(request);
    return NextResponse.json(body, { status });
}