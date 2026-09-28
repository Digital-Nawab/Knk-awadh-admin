"use client";

import React from "react";
import { Eyebrow } from "./ServiceUI";

/* Kept light (secondary), not dark — so it doesn't visually fuse into the
   dark Footer that follows it. A thin border marks the page edge instead
   of relying on a color change. */
export default function ServicesCTA() {
    return (
        <section className="px-6 py-20 md:py-24 text-center relative bg-secondary">
            <div className="max-w-[600px] mx-auto">
                <Eyebrow>Ready When You Are</Eyebrow>
                <h2 className="mt-6 font-display text-[48px] font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-[60px] md:text-[68px]">
                    Let's find <span className="italic text-gold">your look.</span>
                </h2>
                <p className="mt-7 font-sans text-[13px] leading-[1.9] text-muted sm:text-[14px]">
                    Call us or send a message — we'll help you pick the right service
                    and the right artist for your occasion.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                    <a
                        href="tel:+919559321711"
                        className="inline-flex items-center justify-center font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full bg-gradient-gold text-cream transition-transform duration-300 hover:scale-105"
                    >
                        Call Now
                    </a>
                    <a
                        href="https://wa.me/918881000552"
                        className="inline-flex items-center justify-center font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full border border-gold text-gold-deep transition-colors"
                    >
                        Chat on WhatsApp
                    </a>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
        </section>
    );
}