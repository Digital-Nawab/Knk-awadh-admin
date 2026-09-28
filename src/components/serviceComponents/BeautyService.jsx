"use client";

import React, { useState } from "react";
import { Eyebrow, GoldDivider } from "./ServiceUI";
import ProcessSteps from "./ProcessSteps";
import ServicesCTA from "./ServicesCTA";
import CategoryServiceShowcase from "./CategoryServiceShowcase";
import { beautyShowcaseServices } from "@/data/categoryShowcaseData";

const beautyMenu = {
    "Wax Bar": {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 3c3 3 5 6.5 5 10a5 5 0 0 1-10 0c0-3.5 2-7 5-10Z" />
            </svg>
        ),
        items: [
            "Eyebrow (Thread/Wax)",
            "Upper lip (Thread/Wax)",
            "Lower lip (Thread/Wax)",
            "Forehead (Thread/Wax)",
            "Side locks (Thread/Wax)",
            "Full face (Thread/Wax)",
        ],
    },
    "Body Wax": {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 12c2-5 6-8 8-8s6 3 8 8-6 8-8 8-10-3-8-8Z" />
            </svg>
        ),
        items: [
            "Underarms (Rica/Thalgo)",
            "Half arms (Rica/Thalgo)",
            "Full arms (Rica/Thalgo)",
            "Abdomen (Rica/Thalgo)",
            "Half leg (Rica/Thalgo)",
            "Half back (Rica/Thalgo)",
            "Full leg (Rica/Thalgo)",
            "Full front (Rica/Thalgo)",
            "Full back (Rica/Thalgo)",
            "B-Line (Rica/Thalgo)",
            "B-wax (Rica/Thalgo)",
            "Full body wax (Rica/Thalgo)",
        ],
    },
    Bleach: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
                <circle cx="12" cy="12" r="4" />
            </svg>
        ),
        items: [
            "Face & Neck (Raga/Kanpeki)",
            "Full Arms (Raga/Kanpeki)",
            "Full Back (Raga/Kanpeki)",
            "Full Front (Raga/Kanpeki)",
            "Full Legs (Raga/Kanpeki)",
            "Full Body (Raga/Kanpeki)",
        ],
    },
};

function TreatmentMenu() {
    const categories = Object.keys(beautyMenu);
    const [active, setActive] = useState(categories[0]);
    const activeData = beautyMenu[active];

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
                                    {beautyMenu[cat].icon}
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

export default function BeautyService() {
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
                        <pattern id="beautyJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                            <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#beautyJaali)" />
                </svg>

                <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                    <div className="relative z-10 max-w-[600px]">
                        <Eyebrow>Beauty</Eyebrow>
                        <h1 className="mt-6 font-display text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-ink sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                            Beauty,
                            <br />
                            <span className="italic text-gold">refined with care.</span>
                        </h1>
                        <GoldDivider />
                        <p className="mt-7 max-w-[500px] font-sans text-[13px] leading-[1.9] text-muted sm:text-[14px]">
                            Threading, waxing, bleach or a fresh mani-pedi — every beauty
                            ritual handled by experts trained for finish and comfort.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="tel:+919559321711"
                                className="inline-flex items-center justify-center bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105"
                            >
                                Book Now
                            </a>
                            <a
                                href="#beauty-services"
                                className="inline-flex items-center justify-center border border-gold text-gold-deep font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-colors hover:bg-gold/10"
                            >
                                View Beauty Services
                            </a>
                        </div>
                    </div>

                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxe border border-border">
                        <img
                            src="/assets/images/new/service/beautyservice.webp"
                            alt="KNK Awadh beauty treatment"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Beauty Services Cards Showcase */}
            <CategoryServiceShowcase
                id="beauty-services"
                category="Beauty"
                eyebrow="Skin Radiance & Grooming"
                title="Beauty Services"
                subtitle="From customized multi-step facials and pore-purifying cleanups to gentle Rica waxing, precision threading, and velvet body polishing."
                services={beautyShowcaseServices}
            />

            {/* Our beauty treatment menu */}
            <section className="px-6 py-20 md:py-28 bg-secondary">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-[600px] mx-auto text-center mb-14">
                        <Eyebrow>What We Do</Eyebrow>
                        <h2 className="mt-6 font-display text-[48px] font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-[60px] md:text-[68px]">
                            Our beauty <span className="italic text-gold">services.</span>
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