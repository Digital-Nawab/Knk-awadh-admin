"use client";

import React from "react";
import { INK, MUTED, GOLD, LINE, galleryImages } from "../shared/constants";
import { Eyebrow } from "../shared/SharedUI";

export default function CertificationHighlight() {
    return (
        <section className="px-6 py-20 md:py-24">
            <div className="max-w-6xl mx-auto rounded-2xl border overflow-hidden grid md:grid-cols-2" style={{ borderColor: LINE }}>
                <div className="p-10 md:p-14">
                    <Eyebrow>Recognised Everywhere</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[36px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[44px]" style={{ color: INK }}>
                        IAF-certified, <span className="italic" style={{ color: GOLD }}>industry ready.</span>
                    </h2>
                    <p className="mt-6 font-['Inter'] text-[13px] leading-[1.9]" style={{ color: MUTED }}>
                        Every graduate leaves with a certification recognised globally
                        in the beauty industry, a professional portfolio shoot, and a
                        month of hands-on internship experience working alongside our
                        expert artists — so you're ready to take on real clients from
                        day one.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="#book"
                            className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#fbf7f0] transition-transform duration-300 hover:scale-105"
                            style={{ backgroundColor: GOLD }}
                        >
                            Get Certified
                        </a>
                    </div>
                </div>
                <div className="relative min-h-[260px]">
                    <img src={galleryImages[0]} alt="KNK Academy certification and portfolio work" className="absolute inset-0 w-full h-full object-cover" />
                </div>
            </div>
        </section>
    );
}