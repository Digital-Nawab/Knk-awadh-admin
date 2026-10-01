"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function AboutOverview({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.overview, ...data };
    const items = d.items || DEFAULT_ABOUT_SECTIONS.overview.items;

    return (
        <section className="px-6 py-20 md:py-24">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-3xl mb-12">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        {d.eyebrow}
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[46px] sm:text-[58px] md:text-[70px] lg:text-[80px] font-medium leading-[0.95] tracking-[-0.04em] text-[#29231f]">
                        {d.heading}
                        <br />
                        <span className="italic text-[#b58a52]">{d.headingHighlight}</span>
                    </h2>
                    <p className="mt-6 font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9]">
                        {d.description}
                    </p>
                    <div className="mt-8 flex items-center gap-3">
                        <span className="h-[2px] w-16 bg-[#b58a52]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#b58a52]" />
                        <span className="h-px w-10 bg-[#d0bda4]" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-soft flex flex-col justify-between ${
                                idx === items.length - 1 ? "md:col-span-2" : ""
                            }`}
                        >
                            <div>
                                <h3 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-medium text-[#29231f] mb-3">
                                    {item.q}
                                </h3>
                                <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.85]">
                                    {item.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
