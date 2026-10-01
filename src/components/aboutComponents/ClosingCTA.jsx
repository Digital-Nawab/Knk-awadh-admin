"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function ClosingCTA({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.closing_cta, ...data };

    return (
        <section className="px-6 pb-24 pt-8 text-center">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-medium text-[#29231f] mb-3">
                {d.heading} <span className="italic text-[#b58a52]">{d.headingHighlight}</span>
            </h2>
            <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] mb-8">
                {d.description}
            </p>
            <a
                href={`tel:${(d.phone || '+919559321711').replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center bg-[#b58a52] text-[#fbf7f0] font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-10 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105"
            >
                {d.buttonText || "Call Now"}
            </a>
        </section>
    );
}