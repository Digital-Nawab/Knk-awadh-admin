"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";
import { testimonials } from "./AboutData";

export default function Testimonials() {
    return (
        <section className="px-6 py-20 md:py-24 bg-secondary/60">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-2xl mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        What Clients Say
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        Loved by
                        <br />
                        <span className="italic text-[#b58a52]">our clients.</span>
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, index) => (
                        <div key={t.name} className="bg-card border border-border rounded-2xl p-7 shadow-soft">
                            <p className="font-['Cormorant_Garamond'] italic text-lg text-[#29231f] leading-snug mb-5">
                                "{t.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <img
                                    src={`/assets/images/testimonials/avatar-${(index % 6) + 1}.webp`}
                                    alt={t.name}
                                    className="h-10 w-10 rounded-full object-cover border border-border"
                                />
                                <p className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c]">{t.name} · Client</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}