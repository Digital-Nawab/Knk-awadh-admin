"use client";

import React, { useState, useEffect } from "react";
import { Eyebrow, GoldDivider } from "./ServiceUI";
import CategoryServiceShowcase from "./CategoryServiceShowcase";
import { DEFAULT_NAILS_SECTIONS } from "@/data/nailsDefaults";
import { nailsShowcaseServices } from "@/data/categoryShowcaseData";

export default function NailsService({ initialData = null }) {
    const data = {
        hero: { ...DEFAULT_NAILS_SECTIONS.hero, ...(initialData?.hero || {}) },
        showcase: { ...DEFAULT_NAILS_SECTIONS.showcase, ...(initialData?.showcase || {}) },
        process: { ...DEFAULT_NAILS_SECTIONS.process, ...(initialData?.process || {}) },
        cta: { ...DEFAULT_NAILS_SECTIONS.cta, ...(initialData?.cta || {}) },
    };

    const hero = data.hero;
    const showcase = data.showcase;
    const processSteps = data.process;
    const cta = data.cta;

    // Headings
    const titlePrefix = hero.titlePrefix || "Nails,";
    const titleHighlight = hero.titleHighlight || "done right.";

    const showcaseServices = Array.isArray(showcase.items) && showcase.items.length > 0
        ? showcase.items
        : nailsShowcaseServices;

    const dynamicSteps = Array.isArray(processSteps.steps) && processSteps.steps.length > 0
        ? processSteps.steps
        : DEFAULT_NAILS_SECTIONS.process.steps;

    const isHeroVideo = hero.mediaType === "video" && Boolean(hero.videoUrl);

    return (
        <div className="bg-cream">
            {/* 1. Hero Section */}
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
                        <pattern id="nailsJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                            <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#nailsJaali)" />
                </svg>

                <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                    <div className="relative z-10 max-w-[600px]">
                        <Eyebrow>{hero.eyebrow || "Nails"}</Eyebrow>
                        <h1 className="mt-6 font-display text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-ink sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                            {titlePrefix}
                            {titleHighlight && (
                                <>
                                    <br />
                                    <span className="italic text-gold">{titleHighlight}</span>
                                </>
                            )}
                        </h1>
                        <GoldDivider />
                        <p className="mt-7 max-w-[500px] font-sans text-[13px] leading-[1.9] text-muted sm:text-[14px]">
                            {hero.description ||
                                "Gel, acrylic, extensions or a simple mani-pedi — every nail service handled by an artist trained for precision and finish."}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href={hero.btn1Link || "#book"}
                                data-booking-trigger="true"
                                data-service="Nails"
                                className="inline-flex items-center justify-center bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105 cursor-pointer font-medium"
                            >
                                {hero.btn1Text || "Book Now"}
                            </a>
                            <a
                                href={hero.btn2Link || "#nail-services"}
                                className="inline-flex items-center justify-center border border-gold text-gold-deep font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-colors hover:bg-gold/10 font-medium"
                            >
                                {hero.btn2Text || "View Nail Services"}
                            </a>
                        </div>
                    </div>

                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxe border border-border bg-ink/10">
                        {isHeroVideo ? (
                            <video
                                key={hero.videoUrl}
                                src={hero.videoUrl}
                                poster={hero.posterUrl || hero.thumbnailUrl || undefined}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src={hero.image || "/assets/images/new/service/NAILS.webp"}
                                alt={hero.eyebrow || "KNK Awadh nail artist at work"}
                                fetchPriority="high"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* 2. Nail Services Cards Showcase (Dynamic from separate nails_sections table) */}
            <CategoryServiceShowcase
                id={showcase.id || "nail-services"}
                category={showcase.category || "Nails"}
                eyebrow={showcase.eyebrow || "Precision Nail Architecture"}
                title={showcase.title || "Nails Services"}
                subtitle={showcase.subtitle || "From classic Parisian French art and high-durability acrylics to bespoke 3D bridal motifs and relaxing therapeutic pedicures."}
                services={showcaseServices}
            />

            {/* 4. Process Steps (How It Works) */}
            <section className="px-6 py-20 md:py-28">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-[600px] mb-20">
                        <Eyebrow>{processSteps.eyebrow || "How It Works"}</Eyebrow>
                        <h2 className="mt-6 font-display text-[48px] font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-[60px] md:text-[68px]">
                            {processSteps.title || "Simple, from"}{" "}
                            <span className="italic text-gold">{processSteps.titleHighlight || "start to finish."}</span>
                        </h2>
                        <GoldDivider />
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
                        {dynamicSteps.map((step, i) => (
                            <div
                                key={step.n || i}
                                className={`group relative pl-6 ${
                                    i === 0 ? "lg:pl-0 lg:border-l-0" : ""
                                } lg:border-l lg:border-border/70`}
                            >
                                <p className="font-display text-3xl italic text-gold">
                                    {step.n}
                                </p>
                                <span className="h-px w-8 bg-gold block mt-4 mb-4 transition-all duration-500 group-hover:w-14" />
                                <h3 className="font-display text-2xl font-medium text-ink transition-colors duration-300 group-hover:text-gold-deep">
                                    {step.title}
                                </h3>
                                <p className="mt-3 max-w-[26ch] font-sans text-[13px] leading-relaxed text-muted">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Services CTA */}
            <section className="px-6 py-20 md:py-24 text-center relative bg-secondary">
                <div className="max-w-[600px] mx-auto">
                    <Eyebrow>{cta.eyebrow || "Ready When You Are"}</Eyebrow>
                    <h2 className="mt-6 font-display text-[48px] font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-[60px] md:text-[68px]">
                        {cta.title || "Let's find"}{" "}
                        <span className="italic text-gold">{cta.titleHighlight || "your look."}</span>
                    </h2>
                    <p className="mt-7 font-sans text-[13px] leading-[1.9] text-muted sm:text-[14px]">
                        {cta.description ||
                            "Call us or send a message — we'll help you pick the right service and the right artist for your occasion."}
                    </p>
                    <div className="mt-9 flex flex-wrap justify-center gap-4">
                        <a
                            href={`tel:${cta.phone || "+919559321711"}`}
                            className="inline-flex items-center justify-center font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full bg-gradient-gold text-cream transition-transform duration-300 hover:scale-105 font-medium"
                        >
                            {cta.phoneText || "Call Now"}
                        </a>
                        <a
                            href={cta.whatsapp || "https://wa.me/918881000552"}
                            className="inline-flex items-center justify-center font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full border border-gold text-gold-deep transition-colors font-medium hover:bg-gold/10"
                        >
                            {cta.whatsappText || "Chat on WhatsApp"}
                        </a>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
            </section>
        </div>
    );
}
