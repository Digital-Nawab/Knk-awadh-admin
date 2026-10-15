import { NextResponse } from "next/server";
import { listOffers, createOffer } from "@/controllers/OfferController";

export async function GET(request) {
    const { status, body } = await listOffers(request);
    return NextResponse.json(body, { status });
}

export async function POST(request) {
    const { status, body } = await createOffer(request);
    return NextResponse.json(body, { status });
}
