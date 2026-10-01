"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function Intro({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.intro, ...data };

    return (
        <section className="px-6 py-16 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
                <p className="font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-[#29231f] leading-snug">
                    {d.quote}
                </p>
                <p className="mt-6 font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9]">
                    {d.description}
                </p>
            </div>
        </section>
    );
}