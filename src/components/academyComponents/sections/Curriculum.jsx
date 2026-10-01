"use client";

import React from "react";
import { INK, MUTED, GOLD, LINE, curriculum } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import { CheckCircle2, BookOpen, Sparkles, Palette } from "lucide-react";

const STAGE_SUBTITLES = [
    "Foundational Anatomy & Product Chemistry",
    "High-Definition & Photographic Precision",
    "Couture Runway & Imperial Bridal Design"
];

const STAGE_ICONS = [
    BookOpen,
    Sparkles,
    Palette
];

export default function Curriculum() {
    return (
        <section className="px-5 sm:px-8 py-20 md:py-28 bg-[#fbf7f0] relative">
            <div className="max-w-4xl mx-auto text-center mb-14">
                <SectionHeading
                    eyebrow="Pedagogical Blueprint"
                    line1="A 3-stage progressive"
                    line2="learning pathway."
                    description="Our curriculum is meticulously sequenced to take you from foundational skin science and brush ergonomics to avant-garde fashion editorials and royal bridal masterclasses."
                    center
                />
                <div className="flex justify-center">
                    <GoldDivider center />
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 sm:gap-8">
                {curriculum.map((block, idx) => {
                    const Icon = STAGE_ICONS[idx % STAGE_ICONS.length];
                    const subtitle = STAGE_SUBTITLES[idx % STAGE_SUBTITLES.length];

                    return (
                        <div
                            key={block.title}
                            className="relative flex flex-col justify-between rounded-3xl bg-[#fffdf9] border border-[#e8dfc8] p-6 sm:p-8 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-[#b58a52] group"
                        >
                            {/* Top Phase Header */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-['Inter'] text-[10px] uppercase tracking-[0.24em] font-bold text-[#a17b5a] px-3 py-1 rounded-full bg-[#f4eee1]">
                                        Phase 0{idx + 1}
                                    </span>
                                    <div className="size-9 rounded-full bg-[#f4eee1] text-[#b58a52] flex items-center justify-center group-hover:bg-[#b58a52] group-hover:text-white transition-colors">
                                        <Icon className="size-4" />
                                    </div>
                                </div>

                                <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-[26px] font-semibold text-[#29231f] mb-1">
                                    {block.title}
                                </h3>
                                <p className="font-['Inter'] text-[11.5px] text-[#71665c] mb-6 pb-4 border-b border-[#e8dfc8]">
                                    {subtitle}
                                </p>

                                {/* List of items */}
                                <ul className="space-y-2.5">
                                    {block.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-2.5 font-['Inter'] text-[12.5px] leading-relaxed text-[#71665c]"
                                        >
                                            <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-[#b58a52]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Phase Footer Tag */}
                            <div className="mt-8 pt-4 border-t border-[#f4eee1] flex items-center justify-between text-[#a17b5a] font-['Inter'] text-[11px] font-medium">
                                <span>{block.items.length} Core Modules</span>
                                <span className="uppercase tracking-wider">Assessed Weekly</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}