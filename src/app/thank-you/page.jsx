"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Layout from "@/layout/Layout";

function ThankYouContent() {
    const searchParams = useSearchParams();
    const [bookingDetails, setBookingDetails] = useState({
        bookingId: searchParams.get("bookingId") || null,
        requestNumber: searchParams.get("requestNumber") || null,
        name: searchParams.get("name") || "",
        service: searchParams.get("service") || "",
        date: searchParams.get("date") || null,
        location: searchParams.get("location") || "",
    });

    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("last_booking");
            if (saved) {
                const parsed = JSON.parse(saved);
                setBookingDetails((prev) => ({
                    bookingId: prev.bookingId || parsed.bookingId || null,
                    requestNumber: prev.requestNumber || parsed.requestNumber || null,
                    name: prev.name || parsed.name || "",
                    service: prev.service || parsed.service || "",
                    date: prev.date || parsed.date || null,
                    location: prev.location || parsed.location || "",
                }));
            } else if (bookingDetails.name || bookingDetails.service) {
                sessionStorage.setItem("last_booking", JSON.stringify(bookingDetails));
            }
        } catch {
            // ignore
        }

        if (typeof window !== "undefined" && window.location.search) {
            window.history.replaceState({}, "", "/thank-you");
        }
    }, []);

    const bookingId = bookingDetails.bookingId;
    const requestNum = bookingDetails.requestNumber || bookingId || "49";
    const name = bookingDetails.name || "Valued Guest";
    const service = bookingDetails.service || "Signature Ritual";
    const date = bookingDetails.date;
    const location = bookingDetails.location || "KNK Salon Awadh";

    return (
        <section className="relative overflow-hidden px-5 pt-32 pb-24 md:pt-40 md:pb-32 bg-[#faf7f2] text-[#241d18] min-h-[85vh] flex items-center justify-center">
            {/* Ambient luxury light halos */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-28 top-1/4 h-[450px] w-[450px] rounded-full bg-[#c49a4d]/10 blur-[120px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 bottom-1/4 h-[450px] w-[450px] rounded-full bg-[#c49a4d]/10 blur-[120px]"
            />

            {/* Awadhi Jaali watermark in subtle warm gold */}
            <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full text-[#b88c3a] opacity-[0.05] pointer-events-none"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <pattern id="thankYouJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                        <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="30" cy="26" r="3" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#thankYouJaali)" />
            </svg>

            {/* Top & bottom subtle gold hairline borders */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#cda882]/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#cda882]/50 to-transparent" />

            <div className="relative max-w-2xl w-full mx-auto text-center z-10">
                {/* Royal Success Badge */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-[#fbf4e8] to-[#edd9ba] border border-[#c49a4d]/70 shadow-[0_8px_30px_rgba(196,154,77,0.25)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-[#966d2a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.4"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                {/* Eyebrow */}
                <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#b88c3a]" />
                    <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.38em] text-[#966d2a]">
                        KNK Salon Awadh Concierge
                    </p>
                    <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#b88c3a]" />
                </div>

                {/* Heading */}
                <h1 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#241d18] leading-tight">
                    Your Luxury Session <br />
                    <span className="italic text-[#966d2a]">Is Reserved.</span>
                </h1>

                {/* Awadh royal diamond divider */}
                <div className="my-5 flex items-center justify-center gap-3">
                    <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent to-[#b88c3a]" />
                    <span className="h-1.5 w-1.5 rotate-45 bg-[#966d2a]" />
                    <span className="h-[1.5px] w-14 bg-gradient-to-l from-transparent to-[#b88c3a]" />
                </div>

                {/* Confirmation message */}
                <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[#5e5247] max-w-lg mx-auto">
                    Thanks, <strong className="text-[#241d18] font-semibold">{name}</strong> ! We&apos;ve received your booking request (#{requestNum}). We&apos;ll call you shortly to confirm.
                </p>

                {/* Reservation Summary Card */}
                <div className="mt-8 mx-auto max-w-md bg-white rounded-2xl border border-[#ded2c1] p-5 sm:p-6 text-left font-sans text-xs space-y-3 shadow-[0_15px_45px_rgba(40,25,12,0.07)]">
                    <div className="flex items-center justify-between border-b border-[#eee4d6] pb-3">
                        <span className="text-[#847568] uppercase tracking-wider text-[10px] font-medium">Selected Service</span>
                        <span className="font-semibold text-[#241d18] text-base font-['Cormorant_Garamond',serif] tracking-wide">{service}</span>
                    </div>
                    {date && (
                        <div className="flex items-center justify-between border-b border-[#eee4d6] pb-3">
                            <span className="text-[#847568] uppercase tracking-wider text-[10px] font-medium">Preferred Date</span>
                            <span className="font-semibold text-[#241d18]">{date}</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between border-b border-[#eee4d6] pb-3">
                        <span className="text-[#847568] uppercase tracking-wider text-[10px] font-medium">Studio Location</span>
                        <span className="font-semibold text-[#241d18]">{location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-0.5">
                        <span className="text-[#847568] uppercase tracking-wider text-[10px] font-medium">Status</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Request Pending Confirmation
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex items-center justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-gradient-to-r from-[#b88c3a] via-[#cfa856] to-[#b88c3a] text-white font-sans text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase py-3.5 px-8 rounded-full shadow-[0_6px_25px_rgba(184,140,58,0.32)] hover:shadow-[0_8px_30px_rgba(184,140,58,0.5)] hover:scale-105 active:scale-[0.98] transition-all duration-300"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function ThankYouPage() {
    return (
        <Layout>
            <Suspense fallback={
                <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center text-[#966d2a]">
                    Loading reservation confirmation...
                </div>
            }>
                <ThankYouContent />
            </Suspense>
        </Layout>
    );
}
