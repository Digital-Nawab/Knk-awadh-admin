"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function Marquee({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.marquee, ...data };
    const items = d.items || DEFAULT_ABOUT_SECTIONS.marquee.items;

    return (
        <div className="w-full bg-[#29231f] py-4 overflow-hidden border-y border-[#3d342e]">
            <div className="flex w-max animate-marquee whitespace-nowrap">
                {[...items, ...items].map((text, idx) => (
                    <span key={idx} className="inline-flex items-center mx-6 font-['Inter'] text-[11px] tracking-[0.25em] uppercase text-[#fbf7f0]/80">
                        {text}
                        <span className="ml-6 text-[#b58a52]">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}