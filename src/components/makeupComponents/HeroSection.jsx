"use client";

import React from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, GOLD, GOLD_DEEP, heroImage, heroImagePosition } from "./Makeupdata";
import { DEFAULT_MAKEUP_SECTIONS } from "@/data/makeupDefaults";

export default function HeroSection({ data }) {
    const content = { ...DEFAULT_MAKEUP_SECTIONS.hero, ...(data || {}) };

    const tags = Array.isArray(content.tags) && content.tags.length > 0
        ? content.tags
        : [
            content.tag1 || "Bridal Makeup",
            content.tag2 || "Engagement Makeup",
            content.tag3 || "Party Makeup",
        ];

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
                    <Eyebrow>{content.eyebrow || "MAKEUP STUDIO · LUCKNOW"}</Eyebrow>

                    <h1
                        className="mt-5 font-['Cormorant_Garamond',serif] text-[36px] sm:text-[46px] md:text-[54px] lg:text-[60px] font-medium leading-[1.08] tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        {content.heading || content.heading_line1 || "Professional Makeup Artist &"}{" "}
                        <span className="italic" style={{ color: GOLD }}>
                            {content.headingHighlight || content.heading_highlight || "Makeup Studio in Lucknow"}
                        </span>
                    </h1>

                    <GoldDivider />

                    <p
                        className="mt-6 font-['Inter',sans-serif] text-[13.5px] sm:text-[14.5px] leading-[1.85] text-[#5c5248]"
                    >
                        {content.description}
                    </p>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                        <a
                            href={content.btn1Link || content.cta_primary_link || "#book"}
                            className="inline-flex items-center justify-center font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.2em] uppercase px-7 py-4 rounded-full text-[#fbf7f0] shadow-md transition-all duration-300 hover:scale-105 text-center"
                            style={{ backgroundColor: GOLD }}
                        >
                            {content.btn1Text || content.cta_primary_text || "Book Makeup Appointment"}
                        </a>
                        <a
                            href={content.btn2Link || content.cta_secondary_link || "#portfolio"}
                            className="inline-flex items-center justify-center font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.2em] uppercase px-7 py-4 rounded-full border transition-all duration-300 hover:bg-[#b58a52]/10 text-center"
                            style={{ borderColor: GOLD, color: GOLD_DEEP }}
                        >
                            {content.btn2Text || content.cta_secondary_text || "View Makeup Looks"}
                        </a>
                    </div>

                    {/* Small trust line */}
                    <div className="mt-9 pt-6 border-t border-[#dfd2c4]/70">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-['Inter',sans-serif] font-medium text-[#71665c]">
                            {tags.map((tag, idx) => (
                                <React.Fragment key={idx}>
                                    {idx > 0 && <span className="text-[#b58a52] font-semibold">|</span>}
                                    <span className="hover:text-[#b58a52] transition-colors">{tag}</span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative aspect-[4/5] max-w-[460px] mx-auto w-full rounded-2xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(181,138,82,0.35)] border border-[#d0bda4]">
                    <img
                        src={content.image || heroImage}
                        alt={content.heading || content.heading_line1 || "Professional Makeup Artist & Makeup Studio in Lucknow - KNK Awadh"}
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: content.imagePosition || content.image_position || heroImagePosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>
        </section>
    );
}