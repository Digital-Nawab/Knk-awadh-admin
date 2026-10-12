import { NextResponse } from "next/server";
import { submitBooking, listBookings } from "@/controllers/BookingController";
// Recompiled at 18:40:00

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
