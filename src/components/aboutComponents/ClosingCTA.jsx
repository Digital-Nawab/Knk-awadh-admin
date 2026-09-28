"use client";

import React from "react";

export default function ClosingCTA() {
    return (
        <section className="px-6 pb-24 pt-8 text-center">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-medium text-[#29231f] mb-3">
                Ready for your <span className="italic text-[#b58a52]">next appointment?</span>
            </h2>
            <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] mb-8">
                Call us or drop by any of our three Lucknow locations.
            </p>
            <a
                href="tel:+919559321711"
                className="inline-flex items-center justify-center bg-[#b58a52] text-[#fbf7f0] font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-10 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105"
            >
                Call Now
            </a>
        </section>
    );
}