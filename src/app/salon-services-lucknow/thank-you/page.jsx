"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Calendar, MapPin, Phone, ArrowLeft } from "lucide-react";
import BridalNavbar from "@/components/salonLandingPage/BridalNavbar";
import BridalFooter from "@/components/salonLandingPage/BridalFooter";
import { BookingProvider } from "@/components/salonLandingPage/BookingContext";

function SalonThankYouContent() {
    const searchParams = useSearchParams();
    const [booking, setBooking] = useState({
        bookingId: searchParams.get("bookingId") || "",
        name: searchParams.get("name") || "Valued Guest",
        service: searchParams.get("service") || "Salon Signature Ritual",
        date: searchParams.get("date") || "",
        location: searchParams.get("location") || "KNK Salon Awadh",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = sessionStorage.getItem("knk_salon_thankyou");
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setBooking((prev) => ({
                        bookingId: parsed.bookingId || prev.bookingId,
                        name: parsed.name || prev.name,
                        service: parsed.service || prev.service,
                        date: parsed.date || prev.date,
                        location: parsed.location || prev.location,
                    }));
                }
            } catch (e) {
                console.error("Error reading stored salon booking", e);
            }
        }
    }, []);

    return (
        <section className="relative overflow-hidden px-4 py-8 sm:py-10 md:py-12 bg-[#FAF8F5] text-[#191715] flex-1 flex items-center justify-center">
            {/* Ambient luxury glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 top-1/4 h-[320px] w-[320px] rounded-full bg-[#C5A265]/12 blur-[100px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 bottom-1/4 h-[320px] w-[320px] rounded-full bg-[#B3203F]/6 blur-[100px]"
            />

            <div className="relative max-w-2xl w-full mx-auto text-center z-10">
                {/* Gold Success Badge */}
                <div className="mx-auto mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FDF5E6] via-[#F6EADB] to-[#EBD9BF] border border-[#C5A265]/60 shadow-[0_8px_24px_rgba(197,162,101,0.2)]">
                    <Check className="h-8 w-8 text-[#9C7A2E]" strokeWidth={2.5} />
                </div>

                {/* Eyebrow */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="h-px w-8 bg-[#C5A265]/50" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9C7A2E] font-sans">
                        KNK Salon Awadh
                    </span>
                    <span className="h-px w-8 bg-[#C5A265]/50" />
                </div>

                {/* Heading */}
                <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#191715] leading-tight">
                    Your Salon Experience <br />
                    <span className="italic text-[#9C7A2E] font-normal">Is Booked.</span>
                </h1>

                {/* Confirmation message */}
                <p className="mt-2.5 font-sans text-xs sm:text-sm leading-relaxed text-[#6E6359] max-w-lg mx-auto">
                    Thank you, <strong className="text-[#191715] font-semibold">{booking.name}</strong>! We have received your salon appointment request
                    {booking.bookingId ? ` (Booking #${booking.bookingId})` : ""}. Our concierge will contact you shortly to confirm your stylist and chair availability.
                </p>

                {/* Reservation Summary Card */}
                <div className="mt-5 mx-auto max-w-md bg-white rounded-2xl border border-[#EAE2D5] p-4 sm:p-5 text-left font-sans text-xs space-y-3 shadow-[0_12px_32px_rgba(197,162,101,0.08)]">
                    <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-2.5">
                        <span className="text-[#847568] uppercase tracking-wider text-[10px] font-semibold">
                            Selected Service
                        </span>
                        <span className="font-bold text-[#191715] text-sm font-playfair">
                            {booking.service}
                        </span>
                    </div>

                    {booking.date && (
                        <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-2.5">
                            <span className="text-[#847568] uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-[#9C7A2E]" /> Preferred Date
                            </span>
                            <span className="font-semibold text-[#191715]">{booking.date}</span>
                        </div>
                    )}

                    <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-2.5">
                        <span className="text-[#847568] uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#9C7A2E]" /> Salon Branch
                        </span>
                        <span className="font-semibold text-[#191715]">{booking.location}</span>
                    </div>

                    <div className="pt-0.5 text-[11px] text-[#847568] leading-relaxed">
                        A dedicated stylist is reviewing your slot. We ensure personalized consultation, premium international products, and an indulgent salon experience.
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 font-sans">
                    <Link
                        href="/salon-services-lucknow"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#191715] hover:bg-black text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Return to Salon Page</span>
                    </Link>

                    <a
                        href="tel:+918881000552"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#191715] border border-[#EAE2D5] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                    >
                        <Phone className="w-3.5 h-3.5 text-[#9C7A2E]" />
                        <span>Call Salon Concierge</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default function SalonThankYouPage() {
    return (
        <BookingProvider>
            <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#191715] font-sans antialiased overflow-x-hidden selection:bg-[#C5A265] selection:text-white">
                {/* Salon Landing Page Navbar */}
                <BridalNavbar />

                {/* Main Content Area */}
                <main className="flex-1 w-full pt-20 flex flex-col">
                    <Suspense
                        fallback={
                            <div className="min-h-[60vh] flex items-center justify-center text-xs text-muted font-sans">
                                Loading confirmation...
                            </div>
                        }
                    >
                        <SalonThankYouContent />
                    </Suspense>
                </main>

                {/* Salon Landing Page Footer */}
                <BridalFooter />
            </div>
        </BookingProvider>
    );
}
