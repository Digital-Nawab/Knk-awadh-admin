"use client";

import React from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, GOLD, GOLD_DEEP, heroImage, heroImagePosition } from "./Makeupdata";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden px-5 pt-20 pb-16 sm:px-6 md:pt-28 md:pb-24">
            {/* Dark strip behind the fixed header so its light nav text stays readable on this page's cream hero */}
            <div
                aria-hidden="true"
                className="fixed inset-x-0 top-0 h-24 z-40 pointer-events-none"
                style={{ backgroundColor: "#241d18" }}
            />

            <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
                style={{ color: INK }}
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <pattern id="makeupJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                        <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#makeupJaali)" />
            </svg>

            <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <div className="relative z-10 max-w-[580px]">
                    <Eyebrow>MAKEUP STUDIO · LUCKNOW</Eyebrow>

                    <h1
                        className="mt-5 font-['Cormorant_Garamond',serif] text-[36px] sm:text-[46px] md:text-[54px] lg:text-[60px] font-medium leading-[1.08] tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        Professional Makeup Artist &{" "}
                        <span className="italic" style={{ color: GOLD }}>
                            Makeup Studio in Lucknow
                        </span>
                    </h1>

                    <GoldDivider />

                    <p
                        className="mt-6 font-['Inter',sans-serif] text-[13.5px] sm:text-[14.5px] leading-[1.85] text-[#5c5248]"
                    >
                        KNK Awadh Salon &amp; Academy offers professional makeup services in Lucknow for bridal,
                        engagement, reception, party, and special occasions. Choose from customized bridal, HD,
                        airbrush, and occasion makeup looks, with services available across Mahanagar, Gomti Nagar,
                        and Hazratganj.
                    </p>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                        <a
                            href="#book"
                            className="inline-flex items-center justify-center font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.2em] uppercase px-7 py-4 rounded-full text-[#fbf7f0] shadow-md transition-all duration-300 hover:scale-105 text-center"
                            style={{ backgroundColor: GOLD }}
                        >
                            Book Makeup Appointment
                        </a>
                        <a
                            href="#portfolio"
                            className="inline-flex items-center justify-center font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.2em] uppercase px-7 py-4 rounded-full border transition-all duration-300 hover:bg-[#b58a52]/10 text-center"
                            style={{ borderColor: GOLD, color: GOLD_DEEP }}
                        >
                            View Makeup Looks
                        </a>
                    </div>

                    {/* Small trust line */}
                    <div className="mt-9 pt-6 border-t border-[#dfd2c4]/70">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-['Inter',sans-serif] font-medium text-[#71665c]">
                            <span className="hover:text-[#b58a52] transition-colors">Bridal Makeup</span>
                            <span className="text-[#b58a52] font-semibold">|</span>
                            <span className="hover:text-[#b58a52] transition-colors">Engagement Makeup</span>
                            <span className="text-[#b58a52] font-semibold">|</span>
                            <span className="hover:text-[#b58a52] transition-colors">Party Makeup</span>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-[4/5] max-w-[460px] mx-auto w-full rounded-2xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(181,138,82,0.35)] border border-[#d0bda4]">
                    <img
                        src={heroImage}
                        alt="Professional Makeup Artist & Makeup Studio in Lucknow - KNK Awadh"
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: heroImagePosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>
        </section>
    );
}