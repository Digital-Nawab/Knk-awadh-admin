import { NextResponse } from "next/server";
import { submitBooking, listBookings, deleteMultipleBookings } from "@/controllers/BookingController";

// Public POST endpoint with spam protection
export async function POST(req) {
    try {
        const result = await submitBooking(req);
        return NextResponse.json(result.body, { status: result.status });
    } catch (err) {
        console.error("FATAL POST /api/bookings error:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}

// Admin GET endpoint to list bookings
export async function GET(req) {
    try {
        const result = await listBookings(req);
        return NextResponse.json(result.body, { status: result.status });
    } catch (err) {
        console.error("FATAL GET /api/bookings error:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}

// Admin DELETE endpoint for multiple bookings
export async function DELETE(req) {
    try {
        const body = await req.json().catch(() => ({}));
        const ids = body?.ids || (body?.id ? [body.id] : []);
        const result = await deleteMultipleBookings(ids);
        return NextResponse.json(result.body, { status: result.status });
    } catch (err) {
        console.error("FATAL DELETE /api/bookings error:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}
