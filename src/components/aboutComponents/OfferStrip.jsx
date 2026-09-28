"use client";

import React from "react";

export default function OfferStrip() {
    return (
        <section className="px-6 py-14">
            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-gold px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxe">
                <div className="text-center md:text-left">
                    <p className="font-sans text-xs tracking-[0.3em] uppercase text-cream/80 mb-2">Limited Time</p>
                    <h3 className="font-display text-2xl md:text-3xl text-cream">
                        First-visit offer on bridal trials and hair spa
                    </h3>
                </div>
                <a
                    href="#contact"
                    className="shrink-0 inline-flex items-center justify-center bg-cream text-gold-deep font-sans text-sm tracking-[0.15em] uppercase px-8 py-3.5 rounded-full shadow-soft transition-transform duration-300 hover:scale-105"
                >
                    View Offers
                </a>
            </div>
        </section>
    );
}