import BookingModel from "@/models/BookingModel";

// In-memory IP submission rate limiter (resets every 15 mins)
const submissionTracker = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_IP = 6;

function cleanString(str) {
    if (!str || typeof str !== "string") return "";
    return str.replace(/<[^>]*>?/gm, "").trim();
}

function checkRateLimit(ip) {
    if (!ip || ip === "127.0.0.1" || ip === "::1" || ip === "localhost") return true;
    const now = Date.now();
    const records = submissionTracker.get(ip) || [];
    const validRecords = records.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

    if (validRecords.length >= MAX_SUBMISSIONS_PER_IP) {
        return false;
    }

    validRecords.push(now);
    submissionTracker.set(ip, validRecords);
    return true;
}

export async function submitBooking(request) {
    try {
        const body = await request.json();
        const clientIp =
            request.headers.get("x-forwarded-for")?.split(",")[0] ||
            request.headers.get("x-real-ip") ||
            "127.0.0.1";

        // ================= SPAM PROTECTION LAYER =================
        // 1. Honeypot check (bots fill hidden inputs)
        if (body.hp_company_url && body.hp_company_url.trim() !== "") {
            console.warn("Spam detected: Honeypot field filled by IP:", clientIp);
            // Return fake 200 so bots think they succeeded and don't retry with different techniques
            return {
                status: 200,
                body: { success: true, message: "Appointment request received successfully." },
            };
        }

        // 2. Form submission time check (sub-100ms indicates automated script bot)
        if (body.form_started_at) {
            const elapsed = Date.now() - Number(body.form_started_at);
            if (elapsed > 0 && elapsed < 100) {
                console.warn("Spam detected: Form submitted in under 100ms by IP:", clientIp);
                return {
                    status: 200,
                    body: { success: true, message: "Appointment request received successfully." },
                };
            }
        }

        // 3. Rate limiting check
        if (!checkRateLimit(clientIp)) {
            return {
                status: 429,
                body: { error: "Too many booking requests from this network. Please wait a few minutes or call us directly." },
            };
        }

        // ================= INPUT VALIDATION & SANITIZATION =================
        const name = cleanString(body.name);
        const rawPhone = cleanString(body.phone || body.mobile);
        const cleanPhone = rawPhone.replace(/[^\d+]/g, "");
        const email = cleanString(body.email);
        const formType = cleanString(body.form_type || "luxury_booking");
        const isContactForm = formType === "contact_us" || formType === "contact";
        const serviceOrCourse = cleanString(body.service || body.course || body.service_or_course) || (isContactForm ? "General Salon Inquiry" : "");
        const branchLocation = cleanString(body.location || body.branch || body.branch_location) || "KNK Salon Mahanagar";
        const bookingDate = cleanString(body.date || body.booking_date) || new Date().toISOString().split("T")[0];
        const bookingTime = cleanString(body.time || body.booking_time) || null;
        const guests = Number(body.guests) || 1;
        const city = cleanString(body.city) || null;
        const message = cleanString(body.message || body.notes) || null;

        if (!name || name.length < 2) {
            return { status: 400, body: { error: "Please provide your full name." } };
        }

        if (!cleanPhone || cleanPhone.length < 10) {
            return { status: 400, body: { error: "Please enter a valid 10-digit phone number." } };
        }

        if (!serviceOrCourse) {
            return { status: 400, body: { error: "Please select a service or inquiry type." } };
        }

        if (!bookingDate) {
            return { status: 400, body: { error: "Please choose your preferred appointment date." } };
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { status: 400, body: { error: "Please enter a valid email address." } };
        }

        // Save booking in database
        const booking = await BookingModel.create({
            formType,
            name,
            phone: cleanPhone,
            email: email || null,
            serviceOrCourse: serviceOrCourse || null,
            branchLocation: branchLocation || null,
            bookingDate: bookingDate || null,
            bookingTime: bookingTime || null,
            guests,
            city: city || null,
            message: message || null,
            ipAddress: clientIp,
        });

        return {
            status: 201,
            body: {
                success: true,
                message: isContactForm
                    ? "Thank you! Your message has been received. Our concierge team will reach out to you shortly."
                    : "Thank you! Your appointment request has been reserved. Our concierge will contact you shortly.",
                bookingId: booking.id,
            },
        };
    } catch (error) {
        console.error("Booking submission error:", error);
        return { status: 500, body: { error: "Failed to process booking. Please try again or call us." } };
    }
}

export async function listBookings(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status") || "all";
        const formType = searchParams.get("formType") || "all";
        const search = searchParams.get("search") || "";

        const bookings = await BookingModel.getAll({ status, formType, search });
        const stats = await BookingModel.getStats();

        return { status: 200, body: { bookings, stats } };
    } catch (error) {
        console.error("List bookings error:", error);
        return { status: 500, body: { error: "Failed to fetch bookings." } };
    }
}

export async function updateBookingStatus(id, request) {
    try {
        const { status } = await request.json();
        const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
        if (!validStatuses.includes(status)) {
            return { status: 400, body: { error: "Invalid booking status." } };
        }

        await BookingModel.updateStatus(id, status);
        return { status: 200, body: { success: true, message: `Booking status changed to ${status}.` } };
    } catch (error) {
        console.error("Update booking status error:", error);
        return { status: 500, body: { error: "Failed to update booking status." } };
    }
}

export async function deleteBooking(id) {
    try {
        await BookingModel.delete(id);
        return { status: 200, body: { success: true, message: "Booking removed." } };
    } catch (error) {
        console.error("Delete booking error:", error);
        return { status: 500, body: { error: "Failed to delete booking." } };
    }
}
