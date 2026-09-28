"use client";

import React from "react";
import { INK, MUTED } from "./Makeupdata";

export default function LookSpotlight({ look, shaded = false }) {
    return (
        <section className="px-6 py-16 md:py-20" style={{ backgroundColor: shaded ? "#f4eee1" : "transparent" }}>
            <div className="max-w-3xl mx-auto">
                <h3 className="font-['Cormorant_Garamond'] text-[32px] font-medium leading-[0.95] tracking-[-0.03em] sm:text-[40px]" style={{ color: INK }}>
                    {look.title}
                </h3>
                <p className="mt-5 font-['Inter'] text-[13px] leading-[1.9] sm:text-[14px]" style={{ color: MUTED }}>
                    {look.text}
                </p>
            </div>
        </section>
    );
}