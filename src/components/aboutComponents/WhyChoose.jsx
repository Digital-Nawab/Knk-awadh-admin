"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function WhyChoose({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.why_choose, ...data };
    const points = d.points || DEFAULT_ABOUT_SECTIONS.why_choose.points;

    return (
        <section className="px-6 py-20 md:py-24">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                <div className="relative aspect-[4/4] rounded-2xl overflow-hidden shadow-soft border border-border order-2 md:order-1">
                    <img
                        src={d.image || "/assets/images/about/why-choose.webp"}
                        alt="KNK Awadh team at work"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="order-1 md:order-2">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        {d.eyebrow}
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[52px] sm:text-[64px] md:text-[76px] lg:text-[88px] font-medium leading-[0.88] tracking-[-0.04em] text-[#29231f] mb-6">
                        {d.heading}
                        <br />
                        <span className="italic text-[#b58a52]">{d.headingHighlight}</span>
                    </h2>
                    <ul className="space-y-4">
                        {points.map((item, idx) => (
                            <li key={idx} className="flex gap-3 font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9]">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b58a52] shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}