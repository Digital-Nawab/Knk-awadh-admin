"use client";

import React from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, MUTED, GOLD } from "./Makeupdata";

export default function TrendyIntro() {
    return (
        <section className="px-6 py-20 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
                <Eyebrow>Trends</Eyebrow>
                <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                    Trendy bridal <span className="italic" style={{ color: GOLD }}>makeup looks.</span>
                </h2>
                <GoldDivider center />
                <p className="mt-7 font-['Inter'] text-[13px] leading-[1.9] sm:text-[14px]" style={{ color: MUTED }}>
                    Every bride wants to feel beautiful and self-assured walking toward
                    her partner. Alongside the lehenga and the jewellery, the makeup she
                    wears ties the whole look together, softening features and adding a
                    natural glow. Many brides today look for an artist who understands
                    Lucknow's own aesthetic — an elegant, understated Awadhi charm that
                    photographs beautifully without ever looking overdone.
                </p>
            </div>
        </section>
    );
}