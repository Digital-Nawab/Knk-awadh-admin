"use client";

import React from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, MUTED, GOLD, GOLD_DEEP, heroImage, heroImagePosition } from "./Makeupdata";

export default function Hero() {
    return (
        <section className="relative overflow-hidden px-6 pt-20 pb-20 md:pt-28 md:pb-24">
            {/* Dark strip behind the fixed header so its light nav text stays
                readable on this page's cream hero */}
            <div
                aria-hidden="true"
                className="fixed inset-x-0 top-0 h-24 z-40 pointer-events-none"
                style={{ backgroundColor: "#241d18" }}
            />

            <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.05]" style={{ color: INK }} preserveAspectRatio="xMidYMid slice">
                <defs>
                    <pattern id="makeupJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                        <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#makeupJaali)" />
            </svg>

            <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                <div className="relative z-10 max-w-[560px]">
                    <Eyebrow>Makeup / Artistry</Eyebrow>
                    <h1 className="mt-6 font-['Cormorant_Garamond'] text-[52px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[64px] md:text-[76px] lg:text-[70px] xl:text-[82px]" style={{ color: INK }}>
                        Best bridal makeup
                        <br />
                        <span className="italic" style={{ color: GOLD }}>artist in Lucknow.</span>
                    </h1>
                    <GoldDivider />
                    <p className="mt-7 font-['Inter'] text-[13px] leading-[1.9] sm:text-[14px]" style={{ color: MUTED }}>
                        Your engagement, wedding and reception deserve makeup that holds
                        up under every camera and every eye in the room. Our artists work
                        with your features, not against them, so the finished look feels
                        entirely yours — from bridal hairstyling and mehendi to radiant
                        bridal eye makeup.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="tel:+919559321711"
                            className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#fbf7f0] transition-transform duration-300 hover:scale-105"
                            style={{ backgroundColor: GOLD }}
                        >
                            Book Now
                        </a>
                        <a
                            href="#looks"
                            className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full border transition-colors"
                            style={{ borderColor: GOLD, color: GOLD_DEEP }}
                        >
                            View All Looks
                        </a>
                    </div>
                    <div className="mt-10 flex flex-wrap items-center gap-5">
                        {["Bridal Makeup", "Engagement Makeup", "Party Makeup"].map((cat) => (
                            <a
                                key={cat}
                                href="#services"
                                className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase transition-colors"
                                style={{ color: MUTED }}
                            >
                                {cat}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_24px_60px_-24px_rgba(181,138,82,0.35)] border" style={{ borderColor: "#d0bda4" }}>
                    <img
                        src={heroImage}
                        alt="KNK Makeup Studio artist at work"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: heroImagePosition }}
                    />
                </div>
            </div>
        </section>
    );
}