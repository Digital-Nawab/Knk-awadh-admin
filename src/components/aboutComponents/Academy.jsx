"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function Academy({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.academy, ...data };

    return (
        <section id="academy" className="px-6 py-20 md:py-24 bg-secondary/60">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                <div>
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        {d.eyebrow}
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[52px] sm:text-[64px] md:text-[76px] lg:text-[88px] font-medium leading-[0.88] tracking-[-0.04em] text-[#29231f] mb-6">
                        {d.heading}
                        <br />
                        <span className="italic text-[#b58a52]">{d.headingHighlight}</span>
                    </h2>
                    <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9] mb-8">
                        {d.description}
                    </p>
                    <a
                        href={d.ctaLink || "/academy"}
                        className="inline-flex items-center justify-center border border-[#b58a52] text-[#a17b5a] font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-colors hover:bg-[#b58a52]/10"
                    >
                        {d.ctaText || "Explore Makeup Courses →"}
                    </a>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft border border-border">
                    <img
                        src={d.image || "/assets/images/about/academy-training.webp"}
                        alt="KNK Makeup Academy training session"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}