"use client";

import React from "react";
import { GOLD } from "../shared/constants";
import { Eyebrow } from "../shared/SharedUI";

export default function ClosingCTA() {
    return (
        <section className="px-6 py-20 md:py-24 text-center bg-[#fffdf9]">
            <div className="max-w-[560px] mx-auto">
                <Eyebrow>Start Today</Eyebrow>
                <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] text-[#241d18] sm:text-[52px] md:text-[58px]">
                    Shape your <span className="italic" style={{ color: GOLD }}>makeup career.</span>
                </h2>
                <p className="mt-7 font-['Inter'] text-[13px] leading-[1.9] text-[#6f665d] sm:text-[14px]">
                    Call our academy team or send a message and we'll help you pick
                    the right course to start your journey.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                    <a
                        href="tel:+916390008020"
                        className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#241d18] transition-transform duration-300 hover:scale-105"
                        style={{ backgroundColor: GOLD }}
                    >
                        Call Now
                    </a>
                    <a
                        href="https://wa.me/918881000552?text=Hi%20there,%20I'm%20interested%20in%20enrolling%20at%20KNK%20Makeup%20Academy."
                        className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full border border-[#4a4038] text-[#241d18] transition-colors duration-300 hover:bg-[#241d18] hover:text-[#fbf7f0]"
                    >
                        Chat Now
                    </a>
                </div>
            </div>
        </section>
    );
}