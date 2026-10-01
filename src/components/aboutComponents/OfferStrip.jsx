"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function OfferStrip({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.offer_strip, ...data };

    return (
        <section className="px-6 py-14">
            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-gold px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxe">
                <div className="text-center md:text-left">
                    <p className="font-sans text-xs tracking-[0.3em] uppercase text-cream/80 mb-2">{d.badge}</p>
                    <h3 className="font-display text-2xl md:text-3xl text-cream">
                        {d.title}
                    </h3>
                </div>
                <a
                    href={d.ctaLink || "#contact"}
                    className="shrink-0 inline-flex items-center justify-center bg-cream text-gold-deep font-sans text-sm tracking-[0.15em] uppercase px-8 py-3.5 rounded-full shadow-soft transition-transform duration-300 hover:scale-105"
                >
                    {d.ctaText || "View Offers"}
                </a>
            </div>
        </section>
    );
}