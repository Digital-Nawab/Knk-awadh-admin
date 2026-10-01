"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function Testimonials({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.testimonials, ...data };
    const items = d.items || DEFAULT_ABOUT_SECTIONS.testimonials.items;

    return (
        <section className="px-6 py-20 md:py-24 bg-secondary/60">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-2xl mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        {d.eyebrow}
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        {d.heading}
                        <br />
                        <span className="italic text-[#b58a52]">{d.headingHighlight}</span>
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((t, index) => (
                        <div key={index} className="bg-card border border-border rounded-2xl p-7 shadow-soft">
                            <p className="font-['Cormorant_Garamond'] italic text-lg text-[#29231f] leading-snug mb-5">
                                "{t.text}"
                            </p>
                            <p className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c]">
                                {t.name} · Client
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}