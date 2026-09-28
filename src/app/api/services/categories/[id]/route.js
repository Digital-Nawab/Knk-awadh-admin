import { NextResponse } from "next/server";
import {
    getCategoryById,
    updateCategory,
    deleteCategory,
    updateCategoryStatus,
} from "@/controllers/ServiceController";

export async function GET(request, { params }) {
    const { id } = await params;
    const { status, body } = await getCategoryById(id);
    return NextResponse.json(body, { status });
}

export async function PATCH(request, { params }) {
    const { id } = await params;
    // Check if toggling status only or full update
    const url = new URL(request.url);
    if (url.searchParams.get("action") === "status") {
        const { status, body } = await updateCategoryStatus(id, request);
        return NextResponse.json(body, { status });
    }
    const { status, body } = await updateCategory(id, request);
    return NextResponse.json(body, { status });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const { status, body } = await deleteCategory(id);
    return NextResponse.json(body, { status });
}
