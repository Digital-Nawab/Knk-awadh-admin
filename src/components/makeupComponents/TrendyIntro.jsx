"use client";

import React from "react";
import Link from "next/link";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, GOLD, LINE } from "./Makeupdata";
import { DEFAULT_MAKEUP_SECTIONS } from "@/data/makeupDefaults";

const defaultTrends = DEFAULT_MAKEUP_SECTIONS.trends.items;

export default function TrendyIntro({ data }) {
    const content = { ...DEFAULT_MAKEUP_SECTIONS.trends, ...(data || {}) };
    const rawItems = (Array.isArray(content.items) && content.items.length > 0) ? content.items : defaultTrends;
    const items = Array.isArray(rawItems) ? rawItems : [];

    return (
        <section className="relative px-5 py-20 sm:px-6 md:py-28 bg-[#fbf7f0] overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Intro Header */}
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow>{content.eyebrow || content.badge || "BRIDAL MAKEUP TRENDS"}</Eyebrow>
                    <h2
                        className="mt-4 font-['Cormorant_Garamond',serif] text-[34px] sm:text-[46px] md:text-[54px] font-medium leading-[1.08] tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        {content.heading || content.heading_line1 || "Trendy Bridal"}{" "}
                        <span className="italic" style={{ color: GOLD }}>
                            {content.headingHighlight || content.heading_highlight || "Makeup Looks in Lucknow"}
                        </span>
                    </h2>
                    <GoldDivider center />
                    <p className="mt-6 font-['Inter',sans-serif] text-[13.5px] sm:text-[15px] leading-[1.9] text-[#63574c]">
                        {content.description}
                    </p>
                </div>

                {/* Trends Subhead */}
                <div className="mt-16 sm:mt-20 text-center">
                    <span className="inline-block text-[11px] font-['Inter',sans-serif] font-semibold tracking-[0.28em] uppercase text-[#a17b5a] mb-2">
                        {content.subhead_badge || "Look Aesthetics"}
                    </span>
                    <h3
                        className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight"
                        style={{ color: INK }}
                    >
                        {content.subhead_title || "Current Bridal Makeup Trends"}
                    </h3>
                    <div className="mt-3 mx-auto w-12 h-px bg-[#c49a4d]" />
                </div>

                {/* 6 Trends Grid */}
                <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {items.map((item, idx) => (
                        <div
                            key={item.number || idx}
                            className="group relative bg-[#fffdf9] border rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                            style={{ borderColor: LINE }}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-semibold italic"
                                        style={{ color: GOLD }}
                                    >
                                        {item.number}
                                    </span>
                                    <span className="w-2 h-2 rounded-full bg-[#d0bda4] group-hover:bg-[#b58a52] transition-colors" />
                                </div>
                                <h4
                                    className="font-['Cormorant_Garamond',serif] text-[22px] sm:text-[24px] font-medium leading-snug group-hover:text-[#b58a52] transition-colors"
                                    style={{ color: INK }}
                                >
                                    {item.title}
                                </h4>
                                <p className="mt-3 font-['Inter',sans-serif] text-[13px] sm:text-[13.5px] leading-[1.75] text-[#6b6055]">
                                    {item.description}
                                </p>
                            </div>
                            <div className="mt-5 pt-3 border-t border-[#f0e6d8] flex items-center text-[10px] font-['Inter',sans-serif] font-semibold tracking-[0.2em] uppercase text-[#a17b5a]">
                                <span>Customized Lucknow Artistry</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href={content.cta_link || "/makeup-services/bridal-makeup"}
                        className="inline-flex items-center justify-center gap-2 font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#fbf7f0] shadow-md transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: GOLD }}
                    >
                        <span>{content.cta_text || "Explore Bridal Makeup"}</span>
                        <span className="text-sm font-bold">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}