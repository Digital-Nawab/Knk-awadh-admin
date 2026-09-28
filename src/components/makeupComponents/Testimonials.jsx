"use client";

import React from "react";
import { Eyebrow } from "./Makeupui";
import { INK, MUTED, GOLD, LINE, testimonials } from "./Makeupdata";

export default function Testimonials() {
    return (
        <section className="px-6 py-20 md:py-24" style={{ backgroundColor: "#f4eee1" }}>
            <div className="max-w-6xl mx-auto">
                <div className="max-w-[560px] mx-auto text-center mb-14">
                    <Eyebrow>What Clients Say</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                        Loved by <span className="italic" style={{ color: GOLD }}>real brides.</span>
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div key={t.name} className="bg-[#fffdf9] border rounded-2xl p-7" style={{ borderColor: LINE }}>
                            <p className="font-['Cormorant_Garamond'] italic text-lg leading-snug mb-5" style={{ color: INK }}>
                                "{t.text}"
                            </p>
                            <p className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase" style={{ color: MUTED }}>
                                {t.name} · Client
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}