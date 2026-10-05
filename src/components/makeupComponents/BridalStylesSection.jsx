"use client";

import React, { useState } from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, GOLD, GOLD_DEEP, LINE } from "./Makeupdata";
import { DEFAULT_MAKEUP_SECTIONS } from "@/data/makeupDefaults";

const defaultStyles = DEFAULT_MAKEUP_SECTIONS.styles.items;

export default function BridalStylesSection({ data }) {
    const content = { ...DEFAULT_MAKEUP_SECTIONS.styles, ...(data || {}) };
    const rawStyles = (Array.isArray(content.items) && content.items.length > 0) ? content.items : defaultStyles;
    const styles = Array.isArray(rawStyles) ? rawStyles : [];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="styles" className="relative px-5 py-20 sm:px-6 md:py-28 bg-[#fbf7f0] overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <Eyebrow>{content.eyebrow || content.badge || "BRIDAL MAKEUP STYLES"}</Eyebrow>
                    <h2
                        className="mt-4 font-['Cormorant_Garamond',serif] text-[34px] sm:text-[46px] md:text-[54px] font-medium leading-[1.08] tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        {content.heading || content.heading_line1 || "Bridal Makeup Styles &"}{" "}
                        <span className="italic" style={{ color: GOLD }}>
                            {content.headingHighlight || content.heading_highlight || "Looks for Weddings in Lucknow"}
                        </span>
                    </h2>
                    <GoldDivider center />
                    <p className="mt-6 font-['Inter',sans-serif] text-[13.5px] sm:text-[15px] leading-[1.9] text-[#63574c]">
                        {content.description}
                    </p>
                </div>

                {/* Editorial Stacked Style Cards */}
                <div className="space-y-8 sm:space-y-10">
                    {styles.map((style, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div
                                key={style.number || idx}
                                className={`rounded-3xl border border-[#dcd0c0] bg-[#fffdfa] shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 md:p-10 grid md:grid-cols-12 gap-8 items-center ${
                                    isEven ? "md:bg-[#fffdfa]" : "md:bg-[#f6efe4]"
                                }`}
                            >
                                {/* Text Content */}
                                <div
                                    className={`md:col-span-7 flex flex-col justify-center ${
                                        isEven ? "order-1" : "order-1 md:order-2"
                                    }`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span
                                            className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-semibold italic text-[#b58a52]"
                                        >
                                            {style.number}
                                        </span>
                                        <span className="h-px w-10 bg-[#c49a4d]" />
                                        <span className="font-['Inter',sans-serif] text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-[#a17b5a]">
                                            Curated Aesthetic
                                        </span>
                                    </div>

                                    <h3
                                        className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-[34px] font-medium leading-tight mb-4"
                                        style={{ color: INK }}
                                    >
                                        {style.title}
                                    </h3>

                                    <p className="font-['Inter',sans-serif] text-[13.5px] sm:text-[14.5px] leading-[1.85] text-[#5e5349] mb-6">
                                        {style.text}
                                    </p>

                                    {/* Best suited for badge pill box */}
                                    <div className="p-4 sm:p-5 rounded-2xl bg-[#f5ede1] border border-[#e2d5c5]">
                                        <p className="font-['Inter',sans-serif] text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#8c6b3e] mb-2.5">
                                            Best suited for:
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2">
                                            {style.bestSuited.map((item, bIdx) => (
                                                <span
                                                    key={bIdx}
                                                    className="font-['Inter',sans-serif] text-xs sm:text-[12.5px] text-[#423830] px-3 py-1 rounded-full bg-white/80 border border-[#dfd3c3] shadow-xs"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-4">
                                        <a
                                            href="#book"
                                            className="inline-flex items-center gap-2 text-xs font-['Inter',sans-serif] font-bold tracking-[0.18em] uppercase text-[#a17b5a] hover:text-[#241d18] transition-colors"
                                        >
                                            <span>Customize This Look</span>
                                            <span>→</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Portrait Image */}
                                <div
                                    className={`md:col-span-5 ${
                                        isEven ? "order-2" : "order-2 md:order-1"
                                    }`}
                                >
                                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-[#d6c7b3] max-w-[380px] mx-auto md:max-w-none">
                                        <img
                                            src={style.image}
                                            alt={`${style.title} - KNK Awadh Lucknow Bridal Makeup`}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                            style={{ objectPosition: style.imagePosition }}
                                        />
                                        <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2.5 text-center border border-white/20">
                                            <p className="text-[11px] font-['Inter',sans-serif] tracking-[0.16em] uppercase text-[#f5db99] font-medium">
                                                {style.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
