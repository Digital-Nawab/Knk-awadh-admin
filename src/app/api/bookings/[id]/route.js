import { NextResponse } from "next/server";
import { updateBookingStatus, deleteBooking } from "@/controllers/BookingController";
import BookingModel from "@/models/BookingModel";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const booking = await BookingModel.getById(id);
        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }
        const requestNumber = booking.booking_number || booking.id;
        return NextResponse.json({
            success: true,
            booking,
            bookingNumber: booking.booking_number,
            requestNumber,
        });
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
    }
}

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

