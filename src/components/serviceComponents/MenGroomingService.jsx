"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";
import { DEFAULT_MEN_GROOMING_SECTIONS } from "@/data/menGroomingDefaults";

export default function MenGroomingService({ initialData }) {
    const { openBooking } = useBooking();
    const [activeMenuCat, setActiveMenuCat] = useState("all");

    const data = {
        hero: { ...DEFAULT_MEN_GROOMING_SECTIONS.hero, ...(initialData?.hero || {}) },
        disciplines: { ...DEFAULT_MEN_GROOMING_SECTIONS.disciplines, ...(initialData?.disciplines || initialData?.services || {}) },
        packages: { ...DEFAULT_MEN_GROOMING_SECTIONS.packages, ...(initialData?.packages || {}) },
        protocol: { ...DEFAULT_MEN_GROOMING_SECTIONS.protocol, ...(initialData?.protocol || {}) },
        menu: { ...DEFAULT_MEN_GROOMING_SECTIONS.menu, ...(initialData?.menu || {}) },
        reviews: { ...DEFAULT_MEN_GROOMING_SECTIONS.reviews, ...(initialData?.reviews || initialData?.testimonials || {}) },
        faq: { ...DEFAULT_MEN_GROOMING_SECTIONS.faq, ...(initialData?.faq || {}) },
        cta: { ...DEFAULT_MEN_GROOMING_SECTIONS.cta, ...(initialData?.cta || {}) },
    };

    const disciplinesList = Array.isArray(data.disciplines.items) ? data.disciplines.items : DEFAULT_MEN_GROOMING_SECTIONS.disciplines.items;
    const packagesList = Array.isArray(data.packages.items) ? data.packages.items : DEFAULT_MEN_GROOMING_SECTIONS.packages.items;
    const protocolList = Array.isArray(data.protocol.items) ? data.protocol.items : DEFAULT_MEN_GROOMING_SECTIONS.protocol.items;
    const menuCategories = data.menu.categories || DEFAULT_MEN_GROOMING_SECTIONS.menu.categories;
    const menuList = Array.isArray(data.menu.items) ? data.menu.items : DEFAULT_MEN_GROOMING_SECTIONS.menu.items;
    const reviewsList = Array.isArray(data.reviews.items) ? data.reviews.items : DEFAULT_MEN_GROOMING_SECTIONS.reviews.items;
    const faqList = Array.isArray(data.faq.items) ? data.faq.items : DEFAULT_MEN_GROOMING_SECTIONS.faq.items;
    const trustBadges = Array.isArray(data.hero.trustBadges) ? data.hero.trustBadges : DEFAULT_MEN_GROOMING_SECTIONS.hero.trustBadges;

    const filteredMenuItems = activeMenuCat === "all"
        ? menuList
        : menuList.filter(item => item.cat === activeMenuCat);

    return (
        <div className="bg-[#0e0c0b] text-[#f7f2ea] selection:bg-gold selection:text-black min-h-screen">

            {/* 1. CINEMATIC HERO SECTION (LIGHT) */}
            <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-[#dfd3c5] bg-[#fbf7f0]">
                {/* Ambient glow backgrounds */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gradient-to-b from-[#d4af37]/15 via-[#9c782b]/5 to-transparent blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/4 -right-40 h-[400px] w-[400px] rounded-full bg-[#8c6721]/10 blur-3xl"
                />

                {/* Subtle vintage barber pinstripe watermark */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"
                />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Left Column: Heading & Executive Value */}
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#d4af37]/35 bg-[#1f1914]/80 backdrop-blur-md px-4 py-1.5 mb-6">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e5c07b]">
                                    {data.hero.badge}
                                </span>
                            </div>

                            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.05] text-[#241d18]">
                                {data.hero.titlePrefix}{" "}
                                <span className="block font-medium italic text-transparent bg-clip-text bg-gradient-to-r from-[#9c782b] via-[#c49a4d] to-[#8c6721]">
                                    {data.hero.titleHighlight}
                                </span>
                            </h1>

                            <p className="mt-6 font-sans text-sm sm:text-base leading-relaxed text-[#5c5044] max-w-xl">
                                {data.hero.description}
                            </p>

                            {/* Trust Badges */}
                            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#dfd3c5]">
                                {trustBadges.map((badge, idx) => (
                                    <div key={idx} className="p-2.5 rounded-xl bg-[#171310] border border-[#2b221a]">
                                        <span className="block font-display text-lg text-[#e5c07b]">{badge.stat}</span>
                                        <span className="font-sans text-[10px] text-[#9c8e82] uppercase tracking-wider">{badge.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Action Buttons */}
                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <button
                                    onClick={() => openBooking({ serviceName: "Men's Grooming" })}
                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#b38f28] px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#0e0c0b] shadow-[0_10px_30px_rgba(212,175,55,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(212,175,55,0.4)]"
                                >
                                    <span>{data.hero.primaryBtnText}</span>
                                    <span>→</span>
                                </button>
                                <a
                                    href={`tel:${data.hero.phone}`}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#16120e] px-7 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#e5c07b] transition-colors hover:bg-[#251e17] hover:border-[#d4af37]"
                                >
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <span>{data.hero.phoneText}</span>
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Luxury Barber Visual Showcase */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative mx-auto max-w-md">
                                {/* Gold frame accent */}
                                <div className="absolute -inset-2 rounded-3xl border border-[#d4af37]/30 bg-gradient-to-b from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />

                                <div className="relative overflow-hidden rounded-2xl border border-[#3d3126] bg-[#1a1410] shadow-[0_25px_60px_rgba(0,0,0,0.8)] aspect-[4/5]">
                                    <img
                                        src={data.hero.showcaseImage}
                                        alt="KNK Awadh Men's Grooming Salon Lucknow"
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                                    {/* Overlay Details */}
                                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                        <div>
                                            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#e5c07b] font-semibold block mb-1">
                                                {data.hero.showcaseBadge}
                                            </span>
                                            <h3 className="font-display text-2xl text-[#f7f2ea] font-medium">
                                                {data.hero.showcaseTitle}
                                            </h3>
                                        </div>
                                        <div className="rounded-full bg-[#d4af37] px-3.5 py-1 text-[10px] font-sans font-bold uppercase tracking-wider text-[#0e0c0b]">
                                            {data.hero.showcaseStatus}
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Micro-Card */}
                                <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl border border-[#d4af37]/40 bg-[#16120e]/95 backdrop-blur-md p-3.5 shadow-2xl">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#d4af37]/20 text-[#e5c07b] font-display text-base">
                                        {data.hero.floatCardIcon}
                                    </div>
                                    <div>
                                        <p className="font-display text-sm font-medium text-[#f7f2ea]">{data.hero.floatCardTitle}</p>
                                        <p className="font-sans text-[11px] text-[#9c8e82]">{data.hero.floatCardDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. THE 5 CORE GROOMING STATIONS (DARK) */}
            <section id="services-grid" className="py-24 px-5 sm:px-8 md:px-12 bg-gradient-to-b from-[#0e0c0b] via-[#14100d] to-[#0e0c0b] border-b border-[#2b231c]">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block mb-2">
                            {data.disciplines.eyebrow}
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea]">
                            {data.disciplines.heading} <span className="italic text-[#e5c07b]">{data.disciplines.headingHighlight}</span>
                        </h2>
                        <p className="mt-3 font-sans text-xs sm:text-sm text-[#9c8e82] leading-relaxed">
                            {data.disciplines.description}
                        </p>
                    </div>

                    {/* Desktop & Mobile Interactive Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {disciplinesList.map((svc) => (
                            <div
                                key={svc.id}
                                className="group relative flex flex-col justify-between rounded-2xl border border-[#2d241c] bg-[#171310] overflow-hidden transition-all duration-300 hover:border-[#d4af37]/70 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1"
                            >
                                {/* Top Image Banner */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-[#1f1914]">
                                    <img
                                        src={svc.image}
                                        alt={svc.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-black/30 to-transparent pointer-events-none" />

                                    {/* Number & Duration Badges */}
                                    <div className="absolute top-3 left-3 flex items-center gap-2">
                                        <span className="font-display text-xs font-bold text-[#0e0c0b] bg-[#e5c07b] rounded-md px-2 py-0.5">
                                            {svc.number}
                                        </span>
                                        <span className="font-sans text-[10px] uppercase tracking-wider text-[#e5c07b] bg-black/75 backdrop-blur px-2.5 py-0.5 rounded-md border border-[#d4af37]/30">
                                            {svc.badge}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#f7f2ea] bg-black/80 px-2 py-0.5 rounded-md border border-white/10">
                                            ⏱ {svc.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Body Content */}
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-display text-2xl font-medium text-[#f7f2ea] group-hover:text-[#e5c07b] transition-colors">
                                            {svc.title}
                                        </h3>
                                        <p className="font-sans text-xs text-[#d4af37]/80 uppercase tracking-wider mt-1 mb-3">
                                            {svc.subtitle}
                                        </p>
                                        <p className="font-sans text-xs sm:text-[13px] text-[#9c8e82] leading-relaxed mb-5">
                                            {svc.shortDesc}
                                        </p>

                                        {/* Inclusions list */}
                                        <div className="space-y-2 mb-6 pt-4 border-t border-[#292018]">
                                            {(svc.inclusions || []).map((inc, i) => (
                                                <div key={i} className="flex items-start gap-2 text-xs font-sans text-[#b8aba0]">
                                                    <span className="text-[#d4af37] font-bold text-xs">✦</span>
                                                    <span>{inc}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-4 border-t border-[#292018] flex items-center justify-between gap-3">
                                        <button
                                            onClick={() => openBooking({ serviceName: `Men's Grooming - ${svc.title}` })}
                                            className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#d4af37]/90 to-[#b8912e] py-3 px-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#0e0c0b] transition-all duration-200 hover:brightness-110 active:scale-95"
                                        >
                                            Book This Station
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. CURATED EXECUTIVE GROOMING PACKAGES (LIGHT) */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-[#fbf7f0] border-b border-[#dfd3c5]">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#9c782b] font-semibold block mb-2">
                            {data.packages.eyebrow}
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#241d18]">
                            {data.packages.heading} <span className="italic text-[#9c782b]">{data.packages.headingHighlight}</span>
                        </h2>
                        <p className="mt-3 font-sans text-xs sm:text-sm text-[#5c5044]">
                            {data.packages.description}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-stretch">
                        {packagesList.map((pkg) => (
                            <div
                                key={pkg.id}
                                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${pkg.highlight
                                        ? "bg-gradient-to-b from-[#241a12] via-[#1a140f] to-[#14100c] border-2 border-[#d4af37] shadow-[0_15px_45px_rgba(212,175,55,0.15)] md:-translate-y-3"
                                        : "bg-[#16120e] border border-[#2d241c] hover:border-[#d4af37]/50"
                                    }`}
                            >
                                {pkg.highlight && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e5c07b] px-4 py-1 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#0e0c0b] shadow-md">
                                        Master Recommendation
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#e5c07b] font-semibold">
                                            {pkg.tag}
                                        </span>
                                        <span className="font-sans text-xs text-[#9c8e82]">
                                            ⏱ {pkg.duration}
                                        </span>
                                    </div>

                                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#f7f2ea] mb-3">
                                        {pkg.title}
                                    </h3>
                                    <p className="font-sans text-xs sm:text-[13px] text-[#9c8e82] leading-relaxed mb-6">
                                        {pkg.desc}
                                    </p>

                                    <div className="space-y-3 mb-8 pt-6 border-t border-[#292018]">
                                        {(pkg.features || []).map((feat, i) => (
                                            <div key={i} className="flex items-center gap-2.5 text-xs font-sans text-[#cfc4ba]">
                                                <span className="text-[#d4af37]">✓</span>
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => openBooking({ serviceName: `Men's Package: ${pkg.title}` })}
                                    className={`w-full py-4 rounded-full font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${pkg.highlight
                                            ? "bg-[#d4af37] text-[#0e0c0b] hover:bg-[#e5c07b] shadow-lg shadow-gold/20"
                                            : "border border-[#d4af37]/50 bg-transparent text-[#e5c07b] hover:bg-[#d4af37] hover:text-[#0e0c0b]"
                                        }`}
                                >
                                    Reserve Package
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. THE 4-STEP BARBERSHOP CRAFT PROTOCOL (DARK) */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-[#120f0d] border-b border-[#2b231c]">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block mb-2">
                            {data.protocol.eyebrow}
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea]">
                            {data.protocol.heading} <span className="italic text-[#e5c07b]">{data.protocol.headingHighlight}</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {protocolList.map((step, idx) => (
                            <div key={idx} className="rounded-2xl border border-[#2b221a] bg-[#181310] p-6">
                                <span className="font-display text-3xl text-[#d4af37] italic block mb-3">{step.number}</span>
                                <h3 className="font-display text-lg text-[#f7f2ea] font-medium mb-2">{step.title}</h3>
                                <p className="font-sans text-xs text-[#9c8e82] leading-relaxed">
                                    {step.desc || step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. INTERACTIVE FULL RATE CARD / TREATMENT MENU (LIGHT) */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-[#fbf7f0] border-b border-[#dfd3c5]">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#9c782b] font-semibold block mb-2">
                            {data.menu.eyebrow}
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#241d18]">
                            {data.menu.heading} <span className="italic text-[#9c782b]">{data.menu.headingHighlight}</span>
                        </h2>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                        {Object.entries(menuCategories).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveMenuCat(key)}
                                className={`rounded-full px-5 py-2 font-sans text-xs font-medium uppercase tracking-[0.15em] transition-all duration-200 ${activeMenuCat === key
                                        ? "bg-[#d4af37] text-[#0e0c0b] shadow-md shadow-gold/20"
                                        : "bg-[#171310] text-[#9c8e82] border border-[#2b221a] hover:border-[#d4af37]/50 hover:text-[#f7f2ea]"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Menu Items List */}
                    <div className="space-y-4">
                        {filteredMenuItems.map((item, i) => (
                            <div
                                key={i}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-[#261f18] bg-[#16120e] p-5 transition-all duration-200 hover:border-[#d4af37]/50 hover:bg-[#1a1510]"
                            >
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-display text-lg sm:text-xl text-[#f7f2ea] group-hover:text-[#e5c07b] transition-colors">
                                            {item.name}
                                        </h3>
                                        <span className="font-sans text-[10px] text-[#9c8e82] bg-black/60 px-2 py-0.5 rounded border border-white/5">
                                            ⏱ {item.duration}
                                        </span>
                                    </div>
                                    <p className="mt-1 font-sans text-xs text-[#9c8e82]">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0 flex sm:justify-end">
                                    <button
                                        onClick={() => openBooking({ serviceName: `Men's Grooming: ${item.name}` })}
                                        className="rounded-full border border-[#d4af37]/40 bg-black/40 px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#e5c07b] transition-colors hover:bg-[#d4af37] hover:text-[#0e0c0b]"
                                    >
                                        Reserve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CLIENT REVIEWS & TESTIMONIALS (DARK) */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-[#120f0d] border-b border-[#2b231c]">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block mb-2">
                            {data.reviews.eyebrow}
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea]">
                            {data.reviews.heading} <span className="italic text-[#e5c07b]">{data.reviews.headingHighlight}</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {reviewsList.map((rev, idx) => (
                            <div key={idx} className="rounded-2xl border border-[#282018] bg-[#16120e] p-8 flex flex-col justify-between">
                                <div>
                                    <div className="text-[#d4af37] mb-3 text-sm tracking-widest">
                                        {typeof rev.rating === "string" && rev.rating.includes("★")
                                            ? rev.rating
                                            : "★".repeat(Math.min(5, Math.max(1, Number(rev.rating) || 5)))}
                                    </div>
                                    <p className="font-sans text-xs sm:text-[13px] text-[#b8aba0] leading-relaxed italic mb-6">
                                        {rev.quote || rev.text}
                                    </p>
                                </div>
                                <div className="border-t border-[#292018] pt-4">
                                    <span className="font-display text-base text-[#f7f2ea] block font-medium">{rev.name || rev.author}</span>
                                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#9c8e82]">{rev.location || rev.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FREQUENTLY ASKED QUESTIONS (LIGHT) */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-[#fbf7f0] border-b border-[#dfd3c5]">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center max-w-xl mx-auto mb-14">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#9c782b] font-semibold block mb-2">
                            {data.faq.eyebrow}
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#241d18]">
                            {data.faq.heading} <span className="italic text-[#9c782b]">{data.faq.headingHighlight}</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqList.map((faq, idx) => (
                            <details key={idx} className="group rounded-2xl border border-[#2b221a] bg-[#16120e] p-6 transition-all duration-300 open:border-[#d4af37]/60">
                                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-medium text-[#f7f2ea]">
                                    <span>{faq.q}</span>
                                    <span className="text-[#d4af37] transition-transform duration-300 group-open:rotate-180">▼</span>
                                </summary>
                                <p className="mt-4 font-sans text-xs sm:text-sm text-[#9c8e82] leading-relaxed">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. VIP CONCIERGE BOOKING CTA (DARK) */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-gradient-to-b from-[#14100c] to-[#0e0c0b]">
                <div className="mx-auto max-w-5xl rounded-3xl border border-[#d4af37]/40 bg-[#16120e] p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-[#d4af37]/15 blur-3xl"
                    />

                    <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#e5c07b] font-semibold block mb-3">
                        {data.cta.eyebrow}
                    </span>
                    <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea] max-w-xl mx-auto leading-tight">
                        {data.cta.heading}
                    </h2>
                    <p className="mt-4 font-sans text-xs sm:text-sm text-[#9c8e82] max-w-lg mx-auto leading-relaxed">
                        {data.cta.description}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => openBooking({ serviceName: "Men's Grooming VIP Slot" })}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#b38f28] px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#0e0c0b] shadow-[0_10px_30px_rgba(212,175,55,0.25)] transition-all duration-300 hover:scale-105"
                        >
                            <span>{data.cta.primaryBtnText || data.cta.btnText}</span>
                            <span>→</span>
                        </button>
                        <a
                            href={`tel:${data.cta.phone}`}
                            className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/50 bg-black/40 px-7 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#e5c07b] transition-colors hover:bg-[#d4af37] hover:text-[#0e0c0b]"
                        >
                            <span>{data.cta.phoneText || data.cta.phoneDisplay}</span>
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
