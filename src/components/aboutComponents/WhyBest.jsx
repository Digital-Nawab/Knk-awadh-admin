"use client";

import React from "react";
import { whyBest } from "./AboutData";

export default function WhyBest() {
    return (
        <section className="px-6 py-20 md:py-24 bg-secondary/60">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-2xl mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        What Sets Us Apart
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        The best hair &
                        <br />
                        <span className="italic text-[#b58a52]">makeup salon.</span>
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    {whyBest.map((item) => (
                        <div key={item} className="bg-card border border-border rounded-2xl p-6 shadow-soft flex gap-4 items-start">
                            <svg width="22" height="22" viewBox="0 0 28 28" className="text-gold shrink-0 mt-0.5">
                                <path
                                    d="M14 3 C19 3 23 8 23 14 C23 20 19 25 14 25 C13 25 13 22 15 20 C11 20 8 17 8 14 C8 10 11 7 14 7 C13 5 12 3 14 3 Z"
                                    fill="none" stroke="currentColor" strokeWidth="1.6"
                                />
                            </svg>
                            <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9]">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}