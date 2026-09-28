"use client";

import React from "react";
import { socials } from "./AboutData";

export default function Hero() {
    return (
        <section className="relative overflow-hidden px-6 pt-24 pb-20 md:pt-32 md:pb-24">

            <svg aria-hidden="true" className="absolute inset-0 w-full h-full text-ink opacity-[0.05]" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <pattern id="heroJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                        <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#heroJaali)" />
            </svg>

            <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                <div className="relative z-10 max-w-[600px]">
                    {/* Eyebrow */}
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        Best Salon in Lucknow
                    </p>
                    {/* Heading */}
                    <h1 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        Luxury and
                        <br />
                        <span className="italic text-[#b58a52]">beauty meet.</span>
                    </h1>
                    {/* Gold divider */}
                    <div className="mt-8 flex items-center gap-3">
                        <span className="h-[2px] w-16 bg-[#b58a52]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#b58a52]" />
                        <span className="h-px w-10 bg-[#d0bda4]" />
                    </div>
                    {/* Description */}
                    <p className="mt-7 max-w-[500px] font-['Inter'] text-[13px] leading-[1.9] text-[#71665c] sm:text-[14px]">
                        Nestled in the heart of Lucknow, KNK Awadh is a sanctuary of opulence —
                        offering top-tier makeup, haircare and wellness treatments, crafted with
                        the same patience the city's karigars bring to chikankari and ittar.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="tel:+919559321711"
                            className="inline-flex items-center justify-center bg-gradient-gold text-cream font-sans text-sm tracking-[0.15em] uppercase px-8 py-3.5 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105"
                        >
                            Call Now
                        </a>
                        <a
                            href="https://wa.me/918881000552"
                            className="inline-flex items-center justify-center border border-gold text-gold-deep font-sans text-sm tracking-[0.15em] uppercase px-8 py-3.5 rounded-full transition-colors hover:bg-gold/10"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>
                    <div className="mt-10 flex items-center gap-5">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted hover:text-gold-deep transition-colors"
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxe border border-border">
                    <video
                        src="/assets/videos/luxury-interior-knk-awadh.webm"
                        alt="KNK Awadh salon interior"
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                    />
                </div>
            </div>
        </section>
    );
}