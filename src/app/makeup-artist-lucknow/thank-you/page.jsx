"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Calendar, MapPin, Phone, ArrowLeft } from "lucide-react";
import BridalNavbar from "@/components/landingPage/BridalNavbar";
import BridalFooter from "@/components/landingPage/BridalFooter";
import { BookingProvider } from "@/components/landingPage/BookingContext";

function BridalThankYouContent() {
    const searchParams = useSearchParams();
    const [booking, setBooking] = useState({
        bookingId: searchParams.get("bookingId") || "",
        name: searchParams.get("name") || "Valued Bride",
        service: searchParams.get("service") || "HD Bridal Makeup",
        date: searchParams.get("date") || "",
        location: searchParams.get("location") || "KNK Salon Awadh",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = sessionStorage.getItem("knk_bridal_thankyou");
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
                console.error("Error reading stored booking", e);
            }
        }
    }, []);

    return (
        <section className="relative overflow-hidden px-4 py-6 sm:py-8 md:py-10 bg-[#FFFDF9] text-[#161413] flex-1 flex items-center justify-center">
            {/* Ambient luxury glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 top-1/4 h-[420px] w-[420px] rounded-full bg-[#B3203F]/8 blur-[120px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 bottom-1/4 h-[420px] w-[420px] rounded-full bg-[#C5A265]/12 blur-[120px]"
            />

            {/* Jaali background pattern */}
            <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full text-[#B3203F] opacity-[0.03] pointer-events-none"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <pattern id="bridalJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                        <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="30" cy="26" r="3" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bridalJaali)" />
            </svg>

            <div className="relative max-w-2xl w-full mx-auto text-center z-10">
                {/* Crown Success Badge */}
                <div className="mx-auto mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 via-rose-50 to-[#FDF5E6] border border-rose-300 shadow-[0_12px_36px_rgba(179,32,63,0.18)]">
                    <Check className="h-8 w-8 sm:h-10 sm:w-10 text-[#B3203F]" strokeWidth={2.5} />
                </div>

                {/* Eyebrow */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="h-px w-8 bg-[#B3203F]/40" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#B3203F] font-sans">
                        KNK Awadh Bridal Studio
                    </span>
                    <span className="h-px w-8 bg-[#B3203F]/40" />
                </div>

                {/* Heading */}
                <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#161413] leading-tight">
                    Your Bridal Consultation <br />
                    <span className="italic text-[#B3203F] font-normal">Is Confirmed.</span>
                </h1>

                {/* Confirmation message */}
                <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-[#5E5247] max-w-lg mx-auto">
                    Thank you, <strong className="text-[#161413] font-semibold">{booking.name}</strong>! We have received your reservation request
                    {booking.bookingId ? ` (Booking #${booking.bookingId})` : ""}. Our senior bridal concierge will contact you shortly to finalize your consultation.
                </p>

                {/* Reservation Summary Card */}
                <div className="mt-6 mx-auto max-w-md bg-white rounded-2xl border border-[#EAE2D5] p-5 sm:p-6 text-left font-sans text-xs space-y-3.5 shadow-[0_15px_40px_rgba(179,32,63,0.06)]">
                    <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-3">
                        <span className="text-[#7A726B] uppercase tracking-wider text-[10px] font-semibold">
                            Bridal Package
                        </span>
                        <span className="font-bold text-[#161413] text-sm font-playfair">
                            {booking.service}
                        </span>
                    </div>

                    {booking.date && (
                        <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-3">
                            <span className="text-[#7A726B] uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-[#B3203F]" /> Event Date
                            </span>
                            <span className="font-semibold text-[#161413]">{booking.date}</span>
                        </div>
                    )}

                    <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-3">
                        <span className="text-[#7A726B] uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#B3203F]" /> Studio Branch
                        </span>
                        <span className="font-semibold text-[#161413]">{booking.location}</span>
                    </div>

                    <div className="pt-1 text-[11px] text-[#7A726B] leading-relaxed">
                        A dedicated bridal artist will coordinate with you regarding trial sessions, trousseau consultation, and schedule availability.
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 font-sans">
                    <Link
                        href="/makeup-artist-lucknow"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#B3203F] hover:bg-[#8f152f] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Return to Bridal Studio</span>
                    </Link>

                    <a
                        href="tel:+918881000552"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#161413] border border-[#EAE2D5] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                    >
                        <Phone className="w-3.5 h-3.5 text-[#B3203F]" />
                        <span>Call Bridal Concierge</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default function MakeupThankYouPage() {
    return (
        <BookingProvider>
            <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#161413] font-sans antialiased overflow-x-hidden selection:bg-[#B3203F] selection:text-white">
                {/* Landing Page Navbar */}
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
                        <BridalThankYouContent />
                    </Suspense>
                </main>

                {/* Landing Page Footer */}
                <BridalFooter />
            </div>
        </BookingProvider>
    );
}
