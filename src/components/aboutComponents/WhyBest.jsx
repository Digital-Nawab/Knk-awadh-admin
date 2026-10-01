"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function WhyBest({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.why_best, ...data };
    const items = d.items || DEFAULT_ABOUT_SECTIONS.why_best.items;

    return (
        <section className="px-6 py-20 md:py-24 bg-secondary/60">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-2xl mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        {d.eyebrow}
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[52px] sm:text-[64px] md:text-[76px] lg:text-[88px] font-medium leading-[0.88] tracking-[-0.04em] text-[#29231f]">
                        {d.heading}
                        <br />
                        <span className="italic text-[#b58a52]">{d.headingHighlight}</span>
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    {items.map((item, idx) => (
                        <div key={idx} className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-soft flex gap-4 items-start">
                            <svg width="22" height="22" viewBox="0 0 28 28" className="text-[#b58a52] shrink-0 mt-1">
                                <path
                                    d="M14 3 C19 3 23 8 23 14 C23 20 19 25 14 25 C13 25 13 22 15 20 C11 20 8 17 8 14 C8 10 11 7 14 7 C13 5 12 3 14 3 Z"
                                    fill="none" stroke="currentColor" strokeWidth="1.6"
                                />
                            </svg>
                            <div>
                                <h3 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-medium text-[#29231f] mb-1.5">{item.title}</h3>
                                <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.8]">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}