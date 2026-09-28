"use client";

import React from "react";
import { INK, GOLD, LINE, whyAcademyImage } from "../shared/constants";
import { Eyebrow, GoldDivider } from "../shared/SharedUI";

export default function Hero() {
    return (
        <section className="relative overflow-hidden px-6 pt-24 pb-20 md:pt-32 md:pb-24">
            <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.05]" style={{ color: INK }} preserveAspectRatio="xMidYMid slice">
                <defs>
                    <pattern id="academyJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                        <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#academyJaali)" />
            </svg>

            <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                <div className="relative z-10 max-w-[600px]">
                    <Eyebrow>Academy</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        Your passion.
                        <br />
                        <span className="italic text-[#b58a52]">Your career.</span>
                    </h2>
                    <GoldDivider />
                    <p className="mt-7 max-w-[500px] font-['Inter'] text-[13px] leading-[1.9] text-[#71665c] sm:text-[14px]">
                        Start a career as a makeup artist at the best makeup academy in
                        Lucknow. Learn from a globally trained team, build a portfolio
                        with real shoots, and walk away with an IAF-certified
                        qualification recognised across the beauty industry.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="#book"
                            data-booking-trigger="true"
                            data-service="Academy Admission Consultation"
                            className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#fbf7f0] transition-transform duration-300 hover:scale-105 cursor-pointer"
                            style={{ backgroundColor: GOLD }}
                        >
                            Enroll Now
                        </a>
                        <a
                            href="#courses"
                            className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full border transition-colors"
                            style={{ borderColor: GOLD, color: "#a17b5a" }}
                        >
                            View Courses
                        </a>
                    </div>
                </div>

                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_24px_60px_-24px_rgba(181,138,82,0.35)] border" style={{ borderColor: LINE }}>
                    <img src={whyAcademyImage} alt="KNK Makeup Academy students at work" className="w-full h-full object-cover" />
                </div>
            </div>
        </section>
    );
}