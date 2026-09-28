"use client";

import React, { useState } from "react";
import { Eyebrow, GoldDivider } from "./ServiceUI";
import ProcessSteps from "./ProcessSteps";
import ServicesCTA from "./ServicesCTA";

const bodyMenu = {
    "Foot & Head Massage": {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 3a5 5 0 0 0-5 5c0 3 2 4 2 7a3 3 0 0 0 6 0c0-3 2-4 2-7a5 5 0 0 0-5-5Z" />
            </svg>
        ),
        items: [
            "Foot Massage — Duration 30 Minutes",
            "Foot Massage — Duration 45 Minutes",
            "Head Massage — Duration 30 Minutes",
            "Head Massage — With wash and blow dry",
        ],
    },
    Body: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v6M8 11l4 2 4-2M9 21l3-8 3 8" />
            </svg>
        ),
        items: ["Steam bath — 25 minutes", "Full body scrub"],
    },
    "Body Polish": {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 12c2-5 6-8 8-8s6 3 8 8-6 8-8 8-10-3-8-8Z" />
            </svg>
        ),
        items: ["Regular", "Alga", "Gluta"],
    },
    "Body Massage": {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 17c3-6 5-10 8-10s5 4 8 10" />
                <path d="M4 17h16" />
            </svg>
        ),
        items: [
            "Swedish massage (60/90)",
            "Potli massage (60/90)",
            "Epsom Salt therapy (60/90)",
            "Deep tissue (60/90)",
        ],
    },
};

function TreatmentMenu() {
    const categories = Object.keys(bodyMenu);
    const [active, setActive] = useState(categories[0]);
    const activeData = bodyMenu[active];

    return (
        <div className="relative mx-auto mt-20 max-w-4xl">
            <div className="relative border border-gold/40 bg-cream px-6 py-12 sm:px-10 md:px-16 md:py-16">
                <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-6 border-l border-t border-gold" />
                <span aria-hidden="true" className="absolute right-0 top-0 h-6 w-6 border-r border-t border-gold" />
                <span aria-hidden="true" className="absolute left-0 bottom-0 h-6 w-6 border-l border-b border-gold" />
                <span aria-hidden="true" className="absolute right-0 bottom-0 h-6 w-6 border-r border-b border-gold" />

                <p className="text-center font-display italic text-3xl text-gold-deep">
                    The full menu
                </p>
                <GoldDivider center />

                {/* Tabs */}
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => {
                        const isActive = cat === active;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`group flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                                    isActive
                                        ? "border-gold bg-gold text-cream shadow-luxe"
                                        : "border-border text-muted hover:border-gold hover:text-gold-deep"
                                }`}
                            >
                                <span className={`h-4 w-4 ${isActive ? "text-cream" : "text-gold"}`}>
                                    {bodyMenu[cat].icon}
                                </span>
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Editorial list */}
                <div className="mt-12 grid gap-x-12 gap-y-1 sm:grid-cols-2">
                    {activeData.items.map((item, i) => (
                        <div
                            key={item}
                            className="group relative flex items-baseline gap-4 py-4"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full"
                            />
                            <span className="font-display text-sm italic text-gold-deep">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-display text-lg text-ink transition-colors duration-300 group-hover:text-gold-deep sm:text-xl">
                                {item}
                            </span>
                            <span
                                aria-hidden="true"
                                className="ml-auto text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            >
                                &#10022;
                            </span>
                            <span
                                aria-hidden="true"
                                className="absolute inset-x-0 bottom-0 h-px bg-border/60"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <a
                        href="tel:+919559321711"
                        className="inline-flex items-center justify-center bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105"
                    >
                        Book {active}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function BodyService() {
    return (
        <div className="bg-cream">
            {/* Hero */}
            <section className="relative overflow-hidden px-6 pt-20 pb-20 md:pt-28 md:pb-24">
                <div
                    aria-hidden="true"
                    className="fixed inset-x-0 top-0 h-24 bg-primary z-40 pointer-events-none"
                />
                <svg
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full text-ink opacity-[0.05]"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <pattern id="bodyJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                            <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#bodyJaali)" />
                </svg>

                <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                    <div className="relative z-10 max-w-[600px]">
                        <Eyebrow>Body</Eyebrow>
                        <h1 className="mt-6 font-display text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-ink sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                            Relax
                            <br />
                            <span className="italic text-gold">&amp; treat.</span>
                        </h1>
                        <GoldDivider />
                        <p className="mt-7 max-w-[500px] font-sans text-[13px] leading-[1.9] text-muted sm:text-[14px]">
                            Massage, polishing or a full spa ritual — every body treatment
                            designed for real relaxation and renewal.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="tel:+919559321711"
                                className="inline-flex items-center justify-center bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105"
                            >
                                Book Now
                            </a>
                            <a
                                href="#body-services"
                                className="inline-flex items-center justify-center border border-gold text-gold-deep font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-colors hover:bg-gold/10"
                            >
                                View Body Services
                            </a>
                        </div>
                    </div>

                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxe border border-border">
                        <img
                            src="/assets/images/new/service/bodyservice.webp"
                            alt="KNK Awadh body spa treatment"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Our body services */}
            <section id="body-services" className="px-6 py-20 md:py-28 bg-secondary">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-[600px] mx-auto text-center mb-14">
                        <Eyebrow>What We Do</Eyebrow>
                        <h2 className="mt-6 font-display text-[48px] font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-[60px] md:text-[68px]">
                            Our body <span className="italic text-gold">services.</span>
                        </h2>
                        <GoldDivider center />
                    </div>

                    <TreatmentMenu />
                </div>
            </section>

            <ProcessSteps />
            <ServicesCTA />
        </div>
    );
}