import { NextResponse } from "next/server";
import { getServiceById, updateService, deleteService } from "@/controllers/ServiceController";

export async function GET(request, { params }) {
    const { id } = await params;
    const { status, body } = await getServiceById(id);
    return NextResponse.json(body, { status });
}

export async function PATCH(request, { params }) {
    const { id } = await params;
    const { status, body } = await updateService(id, request);
    return NextResponse.json(body, { status });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const { status, body } = await deleteService(id);
    return NextResponse.json(body, { status });
}