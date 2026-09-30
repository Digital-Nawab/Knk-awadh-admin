"use client";

import React from "react";

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
                    <h1 className="mt-6 font-['Cormorant_Garamond'] text-[46px] font-medium leading-[0.95] tracking-[-0.04em] text-[#29231f] sm:text-[60px] md:text-[72px] lg:text-[76px] xl:text-[88px]">
                        About KNK Awadh
                        <br />
                        <span className="italic text-[#b58a52]">Salon &amp; Academy</span>
                    </h1>
                    {/* Supporting headline */}
                    <p className="mt-4 font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl text-[#29231f] leading-snug">
                        A luxury salon, makeup studio and beauty academy in Lucknow.
                    </p>
                    {/* Gold divider */}
                    <div className="mt-6 flex items-center gap-3">
                        <span className="h-[2px] w-16 bg-[#b58a52]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#b58a52]" />
                        <span className="h-px w-10 bg-[#d0bda4]" />
                    </div>
                    {/* Description */}
                    <p className="mt-6 max-w-[500px] font-['Inter'] text-[13px] leading-[1.9] text-[#71665c] sm:text-[14px]">
                        KNK Awadh Salon &amp; Academy is a luxury beauty destination in Lucknow offering professional hair, makeup, beauty, nail, skin and grooming services, along with professional beauty and makeup education through its academy.
                    </p>
                    {/* Hero CTAs */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="#booking"
                            className="inline-flex items-center justify-center bg-gradient-gold text-cream font-sans text-sm tracking-[0.15em] uppercase px-8 py-3.5 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105"
                        >
                            Book Appointment
                        </a>
                        <a
                            href="#services"
                            className="inline-flex items-center justify-center border border-gold text-gold-deep font-sans text-sm tracking-[0.15em] uppercase px-8 py-3.5 rounded-full transition-colors hover:bg-gold/10"
                        >
                            Explore Services
                        </a>
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
                        playsInline
                        preload="metadata"
                    />
                </div>
            </div>
        </section>
    );
}