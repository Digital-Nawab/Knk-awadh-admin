"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Layout from "@/layout/Layout";

function ThankYouContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const name = searchParams.get("name") || "Valued Guest";
    const service = searchParams.get("service") || "Signature Ritual";
    const date = searchParams.get("date");
    const location = searchParams.get("location") || "KNK Salon Awadh";

    return (
        <section className="relative overflow-hidden px-5 pt-32 pb-24 md:pt-40 md:pb-32 bg-[#1a0f08] text-[#fbf7f0] min-h-[85vh] flex items-center justify-center">
            {/* Ambient luxury light halos */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-28 top-1/4 h-[450px] w-[450px] rounded-full bg-[#c49a4d]/15 blur-[130px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 bottom-1/4 h-[450px] w-[450px] rounded-full bg-[#c49a4d]/15 blur-[130px]"
            />

            {/* Awadhi Jaali watermark */}
            <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full text-[#caa882] opacity-[0.035] pointer-events-none"
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

            {/* Top gold line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#cda882]/40 to-transparent" />

            <div className="relative max-w-2xl w-full mx-auto text-center z-10">
                {/* Royal Success Badge */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-[#2e190e] to-[#170e08] border border-[#cda882]/60 shadow-[0_0_35px_rgba(201,162,74,0.35)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-[#e5c697]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                {/* Eyebrow */}
                <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#cda882]" />
                    <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.38em] text-[#caa882]">
                        KNK Salon Awadh Concierge
                    </p>
                    <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#cda882]" />
                </div>

                {/* Heading */}
                <h1 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#faf7f2] leading-tight">
                    Your Luxury Session <br />
                    <span className="italic text-[#e5c697]">Is Reserved.</span>
                </h1>

                {/* Awadh royal diamond divider */}
                <div className="my-5 flex items-center justify-center gap-3">
                    <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent to-[#cda882]" />
                    <span className="h-1.5 w-1.5 rotate-45 bg-[#cda882]" />
                    <span className="h-[1.5px] w-14 bg-gradient-to-l from-transparent to-[#cda882]" />
                </div>

                {/* Confirmation message */}
                <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[#dcd1c4] max-w-lg mx-auto">
                    Thank you, <strong className="text-white">{name}</strong>! Your appointment request has been successfully received
                    {bookingId ? ` (Reservation #${bookingId})` : ""}. Our concierge will contact you shortly to confirm your booking.
                </p>

                {/* Reservation Summary Card */}
                <div className="mt-8 mx-auto max-w-md bg-[#25150d]/80 rounded-2xl border border-[#cda882]/30 p-5 sm:p-6 backdrop-blur-md text-left font-sans text-xs space-y-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between border-b border-[#cda882]/20 pb-2.5">
                        <span className="text-[#a89685] uppercase tracking-wider text-[10px]">Selected Service</span>
                        <span className="font-semibold text-[#faf7f2] text-sm font-['Cormorant_Garamond',serif] tracking-wide">{service}</span>
                    </div>
                    {date && (
                        <div className="flex items-center justify-between border-b border-[#cda882]/20 pb-2.5">
                            <span className="text-[#a89685] uppercase tracking-wider text-[10px]">Preferred Date</span>
                            <span className="font-semibold text-[#faf7f2]">{date}</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between border-b border-[#cda882]/20 pb-2.5">
                        <span className="text-[#a89685] uppercase tracking-wider text-[10px]">Studio Location</span>
                        <span className="font-semibold text-[#faf7f2]">{location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                        <span className="text-[#a89685] uppercase tracking-wider text-[10px]">Status</span>
                        <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            Request Pending Confirmation
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-gradient-to-r from-[#c49a4d] via-[#e5c697] to-[#b88c3a] text-[#140a05] font-sans text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase py-3.5 px-8 rounded-full shadow-[0_4px_22px_rgba(196,154,77,0.3)] hover:shadow-[0_6px_30px_rgba(229,198,151,0.55)] hover:scale-105 active:scale-[0.98] transition-all duration-300"
                    >
                        Return to Home
                    </Link>

                    <Link
                        href="/services/hair"
                        className="inline-flex items-center justify-center border border-[#cda882]/50 bg-[#25150d]/80 text-[#faf7f2] font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase py-3.5 px-8 rounded-full hover:border-[#cda882] hover:bg-[#cda882]/10 transition-colors"
                    >
                        Explore Other Services
                    </Link>

                    <a
                        href={`https://wa.me/918881000552?text=${encodeURIComponent(
                            `Hello KNK Salon Awadh, I just submitted an appointment request for ${service} on ${date || "upcoming date"}. Name: ${name}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-sans text-[11px] sm:text-xs font-bold tracking-wider uppercase text-white shadow-md hover:opacity-95 transition-opacity"
                    >
                        <span>WhatsApp Concierge ↗</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default function ThankYouPage() {
    return (
        <Layout>
            <Suspense fallback={
                <div className="min-h-screen bg-[#1a0f08] flex items-center justify-center text-[#e5c697]">
                    Loading reservation confirmation...
                </div>
            }>
                <ThankYouContent />
            </Suspense>
        </Layout>
    );
}
