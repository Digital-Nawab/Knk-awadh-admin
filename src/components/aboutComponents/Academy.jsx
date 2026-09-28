"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";

export default function Academy() {
    return (
        <section id="academy" className="px-6 py-20 md:py-24 bg-secondary/60">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                <div>
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        KNK International Academy
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] mb-6 sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        Learn from artists
                        <br />
                        <span className="italic text-[#b58a52]">brides trust.</span>
                    </h2>
                    <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9] mb-8">
                        Our academy runs a professional makeup artist course covering bridal,
                        editorial and fashion makeup — built for students who want to work,
                        not just learn theory. Graduates go on to freelance, join studios, or
                        build their own bridal practice.
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center border border-[#b58a52] text-[#a17b5a] font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-colors hover:bg-[#b58a52]/10"
                    >
                        Enquire About the Course
                    </a>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft border border-border">
                    <img
                        src="/assets/images/about/academy-training.webp"
                        alt="KNK Academy training session"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}