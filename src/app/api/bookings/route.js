import { NextResponse } from "next/server";
import { submitBooking, listBookings } from "@/controllers/BookingController";

// Public POST endpoint with spam protection
export async function POST(req) {
    const result = await submitBooking(req);
    return NextResponse.json(result.body, { status: result.status });
}

// Admin GET endpoint to list bookings
export async function GET(req) {
    const result = await listBookings(req);
    return NextResponse.json(result.body, { status: result.status });
}
