"use client";

import React from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, MUTED, GOLD, LINE, sideImage, beautyTips } from "./Makeupdata";

export default function BeautyTips() {
    return (
        <section className="px-6 py-20 md:py-24">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border order-2 md:order-1" style={{ borderColor: LINE }}>
                    <img src={sideImage} alt="Bridal skincare" className="w-full h-full object-cover" />
                </div>
                <div className="order-1 md:order-2">
                    <Eyebrow>Before the Big Day</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[36px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[44px]" style={{ color: INK }}>
                        Bridal beauty <span className="italic" style={{ color: GOLD }}>tips.</span>
                    </h2>
                    <GoldDivider />
                    <ul className="mt-7 space-y-3">
                        {beautyTips.map((tip) => (
                            <li key={tip} className="flex items-center gap-3 font-['Inter'] text-[13px]" style={{ color: MUTED }}>
                                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}