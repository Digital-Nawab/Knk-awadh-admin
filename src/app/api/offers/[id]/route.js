import { NextResponse } from "next/server";
import { getOffer, updateOffer, deleteOffer, toggleOfferStatus } from "@/controllers/OfferController";

export async function GET(request, { params }) {
    const { id } = await params;
    const { status, body } = await getOffer(id);
    return NextResponse.json(body, { status });
}

export async function PATCH(request, { params }) {
    const { id } = await params;
    // Check if it's a quick status toggle or full update
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        try {
            const clone = request.clone();
            const bodyData = await clone.json();
            if (Object.keys(bodyData).length === 1 && ("isActive" in bodyData || "is_active" in bodyData)) {
                const { status, body } = await toggleOfferStatus(id, request);
                return NextResponse.json(body, { status });
            }
        } catch {
            // fallback to updateOffer
        }
    }
    const { status, body } = await updateOffer(id, request);
    return NextResponse.json(body, { status });
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const { status, body } = await updateOffer(id, request);
    return NextResponse.json(body, { status });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const { status, body } = await deleteOffer(id);
    return NextResponse.json(body, { status });
}
