"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, GOLD, GOLD_DEEP, LINE, looksGallery } from "./Makeupdata";

const categories = ["Bridal", "Engagement", "Reception", "Party", "Natural", "Soft Glam"];

export default function LooksGallery() {
    const [activeFilter, setActiveFilter] = useState("All");

    return (
        <section id="portfolio" className="relative px-5 py-16 sm:px-6 md:py-24 scroll-mt-20" style={{ backgroundColor: "#f4eee1" }}>
            <span id="looks" className="absolute -top-24 opacity-0 pointer-events-none" />
            <div className="max-w-6xl mx-auto">
                <div className="max-w-3xl mb-10">
                    <Eyebrow>PORTFOLIO</Eyebrow>
                    <h2
                        className="mt-4 font-['Cormorant_Garamond',serif] text-[34px] sm:text-[44px] md:text-[52px] font-medium leading-[1.08] tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        Makeup Looks &amp;{" "}
                        <span className="italic" style={{ color: GOLD }}>
                            Portfolio in Lucknow
                        </span>
                    </h2>
                    <GoldDivider />
                    <p className="mt-5 font-['Inter',sans-serif] text-[13.5px] sm:text-[14.5px] leading-[1.8] text-[#63574c] max-w-2xl">
                        Explore real makeup looks created by KNK Awadh Salon &amp; Academy for bridal, engagement, reception, party, and special occasions.
                    </p>
                </div>

                {/* Categories / Tags Strip */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 pb-2 border-b border-[#dfd2c4]/80">
                    <span className="text-[10px] sm:text-[11px] font-['Inter',sans-serif] font-semibold uppercase tracking-[0.2em] text-[#a17b5a] mr-2">
                        Occasions:
                    </span>
                    {categories.map((cat, idx) => (
                        <span
                            key={cat}
                            className="inline-flex items-center font-['Inter',sans-serif] text-xs sm:text-[13px] px-3.5 py-1 rounded-full border border-[#d0bda4] bg-[#fffdf9]/70 text-[#4c4239] transition-all duration-300 hover:border-[#b58a52] hover:text-[#b58a52]"
                        >
                            {cat}
                            {idx < categories.length - 1 && (
                                <span className="ml-2.5 text-[#b58a52] opacity-60 hidden sm:inline">·</span>
                            )}
                        </span>
                    ))}
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
                    {looksGallery.map((item, i) => (
                        <div
                            key={i}
                            className="group relative aspect-[4/5] rounded-2xl overflow-hidden border bg-[#e8ded0] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                            style={{ borderColor: LINE }}
                        >
                            <img
                                src={item.src}
                                alt={`KNK Awadh Lucknow makeup look ${i + 1}`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                                style={{ objectPosition: item.position }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1712]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-[11px] font-['Inter',sans-serif] tracking-[0.18em] uppercase text-[#f5db99] font-medium">
                                    ✦ KNK Signature Artistry
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action CTAs */}
                <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center justify-center gap-2 font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#241d18] bg-[#fbf7f0] border border-[#d0bda4] hover:border-[#b58a52] hover:bg-[#fffdf9] transition-all duration-300 text-center shadow-sm"
                    >
                        <span>View Full Makeup Gallery</span>
                        <span className="text-sm font-bold text-[#b58a52]">→</span>
                    </Link>

                    <a
                        href="#book"
                        className="inline-flex items-center justify-center gap-2 font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#fbf7f0] shadow-md transition-all duration-300 hover:scale-105 text-center"
                        style={{ backgroundColor: GOLD }}
                    >
                        <span>Book Your Makeup Appointment</span>
                        <span className="text-sm font-bold">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}