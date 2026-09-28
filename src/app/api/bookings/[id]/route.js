import { NextResponse } from "next/server";
import { updateBookingStatus, deleteBooking } from "@/controllers/BookingController";

export async function PATCH(req, { params }) {
    const { id } = await params;
    const result = await updateBookingStatus(id, req);
    return NextResponse.json(result.body, { status: result.status });
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    const result = await deleteBooking(id);
    return NextResponse.json(result.body, { status: result.status });
}
