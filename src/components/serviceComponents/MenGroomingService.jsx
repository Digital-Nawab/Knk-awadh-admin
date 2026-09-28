"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";

// Core 5 Services with rich details & imagery
const CORE_SERVICES = [
    {
        id: "haircut",
        number: "01",
        title: "Hair Cut & Styling",
        subtitle: "Cranial Calibration & Precision Fades",
        duration: "45 MINS",
        badge: "Most Requested",
        image: "/assets/images/new/home/services/haircut.webp",
        shortDesc: "Tailored skin fades, low/mid tapers, textured crops, and corporate scissor cuts engineered to match your head shape and hair whorl.",
        inclusions: [
            "Consultation calibrated to facial symmetry",
            "Invigorating wash with cooling scalp massage",
            "Straight-razor neck cleanup with hot lather",
            "Custom blow-dry with matte clay or pomade"
        ],
        idealFor: "Men wanting a crisp, long-lasting cut that stays sharp for 3+ weeks."
    },
    {
        id: "beard",
        number: "02",
        title: "Beard Sculpting & Trim",
        subtitle: "Jawline Contouring & Razor Detailing",
        duration: "30 MINS",
        badge: "Barber Signature",
        image: "/assets/images/new/home/MEN'S GROOMING.webp",
        shortDesc: "Architectural beard contouring to sharpen your jawline, balance symmetry, eliminate patchiness, and condition coarse facial hair.",
        inclusions: [
            "Beard density & cheekline mapping",
            "Steamed towel wrap to soften bristles",
            "Straight-razor cheekline & neckline crisping",
            "Cold-pressed cedarwood & argan oil treatment"
        ],
        idealFor: "Stubble, corporate beards, full beards, and wedding groom prep."
    },
    {
        id: "shaving",
        number: "03",
        title: "Hot Towel Shave",
        subtitle: "Traditional Single-Blade Ritual",
        duration: "35 MINS",
        badge: "The Classic Ritual",
        image: "/assets/images/new/home/services/mensgrooming.webp",
        shortDesc: "Experience the lost luxury of traditional barbershop wet shaving. Steaming eucalyptus towels, rich badger-brush lather, and zero razor burn.",
        inclusions: [
            "Pre-shave essential oil skin barrier prep",
            "Steaming eucalyptus & lavender towel wrap",
            "Warm badger-brush whipped lather application",
            "Single-pass sanitized straight-razor glide",
            "Icy closing compress & soothing witch-hazel balm"
        ],
        idealFor: "Gentlemen seeking baby-smooth skin free of redness or stubble shadows."
    },
    {
        id: "facial",
        number: "04",
        title: "Facial & Detan Clean Up",
        subtitle: "Charcoal Detox & Sun Tan Defense",
        duration: "50 MINS",
        badge: "Skin Rejuvenation",
        image: "/assets/images/new/home/services/facial.webp",
        shortDesc: "Formulated specifically for thicker male skin. Clears congested pores, extracts stubborn blackheads, and removes deep urban sun tanning.",
        inclusions: [
            "Ultrasonic deep-pore exfoliation",
            "Activated charcoal impurity detox mask",
            "Instant sun-tan removal lightening pack",
            "Cooling aloe vera & peptide hydration massage"
        ],
        idealFor: "Combating dullness, outdoor sun damage, oiliness, and razor irritation."
    },
    {
        id: "hair-spa",
        number: "05",
        title: "Hair Spa & Scalp Detox",
        subtitle: "Root Nourishment & Acupressure Therapy",
        duration: "45 MINS",
        badge: "Stress Relief",
        image: "/assets/images/new/home/services/hairspa.webp",
        shortDesc: "Revitalize fatigued hair roots and banish dandruff. Combines deep cleansing scalp scrub, ozone steam, and a 20-minute therapeutic head massage.",
        inclusions: [
            "Anti-dandruff micro-exfoliating scalp scrub",
            "Ozone steam infusion to open follicle roots",
            "20-Minute acupressure head, neck & shoulder massage",
            "Cold-water cuticle close & hair-strengthening tonic"
        ],
        idealFor: "Relieving executive stress, dry itchy scalp, hair fall, and fatigue."
    }
];

// Curated Executive Combos
const SIGNATURE_PACKAGES = [
    {
        id: "exec-refresh",
        title: "The Executive Refresh",
        tag: "Weekly Maintenance",
        duration: "1 Hr 15 Mins",
        desc: "The essential grooming combination to keep your hair sharp and beard impeccably maintained.",
        features: [
            "Precision Haircut & Custom Fade",
            "Beard Sculpting & Razor Cheekline",
            "Refreshing Shampoo & Scalp Rinse",
            "Matte Clay Styling Finish"
        ],
        highlight: false
    },
    {
        id: "royal-shave-detan",
        title: "The Royal Awadh Experience",
        tag: "Signature Master Ritual",
        duration: "1 Hr 45 Mins",
        desc: "An indulgent full-body relaxation session combining classic barbershop discipline and clinical skin detan.",
        features: [
            "Precision Haircut / Restyle",
            "Traditional Eucalyptus Hot Towel Shave",
            "Activated Charcoal Detan Clean Up",
            "20-Min Therapeutic Head Massage",
            "Post-Groom Herbal Tea Service"
        ],
        highlight: true
    },
    {
        id: "imperial-groom",
        title: "The Imperial Wedding Groom",
        tag: "Special Occasion / Groom",
        duration: "2 Hrs 30 Mins",
        desc: "Comprehensive royal preparation for weddings, engagement ceremonies, and stage spotlight moments.",
        features: [
            "Bespoke Haircut & Profile Calibration",
            "Royal Hot Oil Beard Detailing & Shape",
            "O3+ Men's Power Radiance Facial",
            "Scalp Detox Spa & Acupressure Therapy",
            "Hand & Foot Executive Grooming"
        ],
        highlight: false
    }
];

// Interactive Rate Card Data
const MENU_CATEGORIES = {
    all: "Full Menu",
    hair: "Hair & Fades",
    beard: "Beard & Shave",
    skin: "Face & Detan",
    spa: "Scalp & Massage"
};

const MENU_ITEMS = [
    { cat: "hair", name: "Executive Precision Haircut", duration: "35 min", desc: "Consultation, precision scissor/clipper cut, shampoo wash & blow-dry style" },
    { cat: "hair", name: "Skin Fade & Disconnected Undercut", duration: "45 min", desc: "Razor-clean low, mid, or drop fade with tailored top blending" },
    { cat: "hair", name: "Textured French Crop Cut", duration: "40 min", desc: "Blunt textured fringe with tapered temple and nape" },
    { cat: "hair", name: "Natural Gray Blending (Hair)", duration: "30 min", desc: "Ammonia-free subtle color blending that conceals grays naturally" },

    { cat: "beard", name: "Beard Sculpting & Jawline Shape-Up", duration: "30 min", desc: "Length de-bulking, neckline contouring, razor edging, and argan oil" },
    { cat: "beard", name: "Traditional Eucalyptus Hot Towel Shave", duration: "35 min", desc: "Pre-shave essential oils, warm lather, single blade pass, cold compress" },
    { cat: "beard", name: "Quick Stubble Cleanup & Lineup", duration: "20 min", desc: "Straight-razor cheek and neck cleanup to maintain crisp lines" },
    { cat: "beard", name: "Beard Gray Blending / Darkening", duration: "25 min", desc: "Targeted non-staining beard color for a fuller, uniform look" },

    { cat: "skin", name: "Men's Activated Charcoal Detox Facial", duration: "45 min", desc: "Deep pore unclogging, blackhead removal, and anti-pollution defense" },
    { cat: "skin", name: "Sun-Tan Removal & De-Tan Therapy", duration: "35 min", desc: "Instant active brightening pack reversing harsh bike/outdoor UV tan" },
    { cat: "skin", name: "O3+ Men's Radiance Skin Treatment", duration: "60 min", desc: "Clinical oxygenating facial for peak luminosity before big events" },
    { cat: "skin", name: "Under-Eye Anti-Fatigue Session", duration: "25 min", desc: "Targeted lymphatic drainage and cooling patches for dark circles" },

    { cat: "spa", name: "Restorative Hair Spa & Scalp Detox", duration: "45 min", desc: "Micro-exfoliating scalp scrub, ozone steam, root serum & conditioning" },
    { cat: "spa", name: "Therapeutic Acupressure Head Massage", duration: "25 min", desc: "Warm almond or Brahmi herbal oil massage targeting cranial pressure points" },
    { cat: "spa", name: "Anti-Dandruff Intensive Scalp Treatment", duration: "40 min", desc: "Salicylic scalp peel and tea tree steam mask to banish stubborn flakes" }
];

export default function MenGroomingService() {
    const { openBooking } = useBooking();
    const [selectedStation, setSelectedStation] = useState(0);
    const [activeMenuCat, setActiveMenuCat] = useState("all");

    const filteredMenuItems = activeMenuCat === "all"
        ? MENU_ITEMS
        : MENU_ITEMS.filter(item => item.cat === activeMenuCat);

    return (
        <div className="bg-[#0e0c0b] text-[#f7f2ea] selection:bg-gold selection:text-black min-h-screen">

            {/* 1. CINEMATIC HERO SECTION */}
            <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-[#2b231c]">
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
                                    Awadh Gentleman's Atelier · Lucknow
                                </span>
                            </div>

                            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.05] text-[#f7f2ea]">
                                The Art of{" "}
                                <span className="block font-medium italic text-transparent bg-clip-text bg-gradient-to-r from-[#ffd97d] via-[#f3cb69] to-[#bf973b]">
                                    Gentleman’s Grooming
                                </span>
                            </h1>

                            <p className="mt-6 font-sans text-sm sm:text-base leading-relaxed text-[#b8aba0] max-w-xl">
                                Where classic barbershop discipline meets executive wellness. Precision clipper fades,
                                bespoke beard architecture, eucalyptus hot towel wet shaves, and purifying charcoal detan therapies —
                                executed in private comfort.
                            </p>

                            {/* Trust Badges */}
                            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#2d251e]">
                                <div className="p-2.5 rounded-xl bg-[#171310] border border-[#2b221a]">
                                    <span className="block font-display text-lg text-[#e5c07b]">100%</span>
                                    <span className="font-sans text-[10px] text-[#9c8e82] uppercase tracking-wider">Single-Use Blades</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#171310] border border-[#2b221a]">
                                    <span className="block font-display text-lg text-[#e5c07b]">10+ Yrs</span>
                                    <span className="font-sans text-[10px] text-[#9c8e82] uppercase tracking-wider">Master Barbers</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#171310] border border-[#2b221a]">
                                    <span className="block font-display text-lg text-[#e5c07b]">Private</span>
                                    <span className="font-sans text-[10px] text-[#9c8e82] uppercase tracking-wider">Grooming Chairs</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#171310] border border-[#2b221a]">
                                    <span className="block font-display text-lg text-[#e5c07b]">4.9 ★</span>
                                    <span className="font-sans text-[10px] text-[#9c8e82] uppercase tracking-wider">Guest Rating</span>
                                </div>
                            </div>

                            {/* CTA Action Buttons */}
                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <button
                                    onClick={() => openBooking({ serviceName: "Men's Grooming" })}
                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#b38f28] px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#0e0c0b] shadow-[0_10px_30px_rgba(212,175,55,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(212,175,55,0.4)]"
                                >
                                    <span>Book Barber Chair</span>
                                    <span>→</span>
                                </button>
                                <a
                                    href="tel:+919559321711"
                                    className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#16120e] px-7 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#e5c07b] transition-colors hover:bg-[#251e17] hover:border-[#d4af37]"
                                >
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <span>Call +91 95593 21711</span>
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
                                        src="/assets/images/new/home/MEN'S GROOMING.webp"
                                        alt="KNK Awadh Men's Grooming Salon Lucknow"
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                                    {/* Overlay Details */}
                                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                        <div>
                                            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#e5c07b] font-semibold block mb-1">
                                                Private Barber Suite
                                            </span>
                                            <h3 className="font-display text-2xl text-[#f7f2ea] font-medium">
                                                Awadh Heritage Finish
                                            </h3>
                                        </div>
                                        <div className="rounded-full bg-[#d4af37] px-3.5 py-1 text-[10px] font-sans font-bold uppercase tracking-wider text-[#0e0c0b]">
                                            Open Today
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Micro-Card */}
                                <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl border border-[#d4af37]/40 bg-[#16120e]/95 backdrop-blur-md p-3.5 shadow-2xl">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#d4af37]/20 text-[#e5c07b] font-display text-base">
                                        ✂
                                    </div>
                                    <div>
                                        <p className="font-display text-sm font-medium text-[#f7f2ea]">Bespoke Fade & Beard</p>
                                        <p className="font-sans text-[11px] text-[#9c8e82]">Precision Single-Blade Craft</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. THE 5 CORE GROOMING STATIONS (INTERACTIVE SHOWCASE) */}
            <section id="services-grid" className="py-24 px-5 sm:px-8 md:px-12 bg-gradient-to-b from-[#0e0c0b] via-[#14100d] to-[#0e0c0b] border-b border-[#2b231c]">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block mb-2">
                            The Five Core Disciplines
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea]">
                            Executive Grooming <span className="italic text-[#e5c07b]">Stations</span>
                        </h2>
                        <p className="mt-3 font-sans text-xs sm:text-sm text-[#9c8e82] leading-relaxed">
                            Select any discipline below to view the craft process, inclusions, and reserve your chair.
                        </p>
                    </div>

                    {/* Desktop & Mobile Interactive Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {CORE_SERVICES.map((svc, idx) => (
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
                                            {svc.inclusions.map((inc, i) => (
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

            {/* 3. CURATED EXECUTIVE GROOMING PACKAGES */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-[#0e0c0b] border-b border-[#2b231c]">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block mb-2">
                            Curated Combinations
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea]">
                            Signature Grooming <span className="italic text-[#e5c07b]">Combos</span>
                        </h2>
                        <p className="mt-3 font-sans text-xs sm:text-sm text-[#9c8e82]">
                            Comprehensive multi-discipline rituals curated for regular upkeep, business presentations, and wedding grooms.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-stretch">
                        {SIGNATURE_PACKAGES.map((pkg) => (
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
                                        {pkg.features.map((feat, i) => (
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

            {/* 4. THE 4-STEP BARBERSHOP CRAFT PROTOCOL */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-[#120f0d] border-b border-[#2b231c]">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block mb-2">
                            The Gentleman's Standard
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea]">
                            The Grooming <span className="italic text-[#e5c07b]">Protocol</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="rounded-2xl border border-[#2b221a] bg-[#181310] p-6">
                            <span className="font-display text-3xl text-[#d4af37] italic block mb-3">01</span>
                            <h3 className="font-display text-lg text-[#f7f2ea] font-medium mb-2">Cranial & Hair Mapping</h3>
                            <p className="font-sans text-xs text-[#9c8e82] leading-relaxed">
                                Detailed consultation analyzing your head profile, crown pattern, hair whorls, and facial hair growth vectors.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-[#2b221a] bg-[#181310] p-6">
                            <span className="font-display text-3xl text-[#d4af37] italic block mb-3">02</span>
                            <h3 className="font-display text-lg text-[#f7f2ea] font-medium mb-2">Steamed Prep Softening</h3>
                            <p className="font-sans text-xs text-[#9c8e82] leading-relaxed">
                                Steaming essential-oil hot towels relax dermal pores and soften coarse bristles for effortlessly smooth cutting.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-[#2b221a] bg-[#181310] p-6">
                            <span className="font-display text-3xl text-[#d4af37] italic block mb-3">03</span>
                            <h3 className="font-display text-lg text-[#f7f2ea] font-medium mb-2">Single-Blade Precision</h3>
                            <p className="font-sans text-xs text-[#9c8e82] leading-relaxed">
                                100% single-use disposable blades for razor detailing. No dual-use, zero cross-contamination risk.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-[#2b221a] bg-[#181310] p-6">
                            <span className="font-display text-3xl text-[#d4af37] italic block mb-3">04</span>
                            <h3 className="font-display text-lg text-[#f7f2ea] font-medium mb-2">Ice Compress & Style</h3>
                            <p className="font-sans text-xs text-[#9c8e82] leading-relaxed">
                                Cold towel compress seals pores and soothes skin, followed by customized matte clay or natural pomade hold.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. INTERACTIVE FULL RATE CARD / TREATMENT MENU */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-[#0e0c0b] border-b border-[#2b231c]">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block mb-2">
                            Transparent Craft
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea]">
                            The Barbershop <span className="italic text-[#e5c07b]">Menu</span>
                        </h2>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                        {Object.entries(MENU_CATEGORIES).map(([key, label]) => (
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

            {/* 6. CLIENT REVIEWS & TESTIMONIALS */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-[#120f0d] border-b border-[#2b231c]">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block mb-2">
                            Gentlemen's Verdict
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea]">
                            Words from Our <span className="italic text-[#e5c07b]">Patrons</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="rounded-2xl border border-[#282018] bg-[#16120e] p-8 flex flex-col justify-between">
                            <div>
                                <div className="text-[#d4af37] mb-3 text-sm tracking-widest">★★★★★</div>
                                <p className="font-sans text-xs sm:text-[13px] text-[#b8aba0] leading-relaxed italic mb-6">
                                    "Hands down the cleanest fade in Lucknow. The barber actually measured my skull whorl before touching the clippers. The hot towel shave afterwards felt genuinely royal."
                                </p>
                            </div>
                            <div className="border-t border-[#292018] pt-4">
                                <span className="font-display text-base text-[#f7f2ea] block font-medium">Vikramaditya S.</span>
                                <span className="font-sans text-[10px] uppercase tracking-wider text-[#9c8e82]">Managing Director, Gomti Nagar</span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#282018] bg-[#16120e] p-8 flex flex-col justify-between">
                            <div>
                                <div className="text-[#d4af37] mb-3 text-sm tracking-widest">★★★★★</div>
                                <p className="font-sans text-xs sm:text-[13px] text-[#b8aba0] leading-relaxed italic mb-6">
                                    "I came in before my wedding for the Imperial Groom package. Beard contouring and the charcoal detan cleared my skin completely. My photos turned out phenomenal."
                                </p>
                            </div>
                            <div className="border-t border-[#292018] pt-4">
                                <span className="font-display text-base text-[#f7f2ea] block font-medium">Aditya Rawat</span>
                                <span className="font-sans text-[10px] uppercase tracking-wider text-[#9c8e82]">Wedding Groom, Hazratganj</span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#282018] bg-[#16120e] p-8 flex flex-col justify-between">
                            <div>
                                <div className="text-[#d4af37] mb-3 text-sm tracking-widest">★★★★★</div>
                                <p className="font-sans text-xs sm:text-[13px] text-[#b8aba0] leading-relaxed italic mb-6">
                                    "Private chairs, no chaotic noise, and single-use fresh blades unpacked right in front of you. That level of hygiene and discipline is hard to find elsewhere."
                                </p>
                            </div>
                            <div className="border-t border-[#292018] pt-4">
                                <span className="font-display text-base text-[#f7f2ea] block font-medium">Sameer Kapoor</span>
                                <span className="font-sans text-[10px] uppercase tracking-wider text-[#9c8e82]">Executive Guest, Aliganj</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FREQUENTLY ASKED QUESTIONS */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-[#0e0c0b] border-b border-[#2b231c]">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center max-w-xl mx-auto mb-14">
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block mb-2">
                            Clarifications
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea]">
                            Grooming <span className="italic text-[#e5c07b]">Inquiries</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <details className="group rounded-2xl border border-[#2b221a] bg-[#16120e] p-6 transition-all duration-300 open:border-[#d4af37]/60">
                            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-medium text-[#f7f2ea]">
                                <span>How often should I get my haircut & beard maintained?</span>
                                <span className="text-[#d4af37] transition-transform duration-300 group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-4 font-sans text-xs sm:text-sm text-[#9c8e82] leading-relaxed">
                                For tight skin fades and clean beard cheeklines, visiting every 10 to 14 days keeps your lines razor-crisp. For classic scissor cuts, an appointment every 3 to 4 weeks ensures graceful grow-out.
                            </p>
                        </details>

                        <details className="group rounded-2xl border border-[#2b221a] bg-[#16120e] p-6 transition-all duration-300 open:border-[#d4af37]/60">
                            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-medium text-[#f7f2ea]">
                                <span>I have sensitive skin prone to razor burn. Is the hot towel shave safe for me?</span>
                                <span className="text-[#d4af37] transition-transform duration-300 group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-4 font-sans text-xs sm:text-sm text-[#9c8e82] leading-relaxed">
                                Absolutely. The ritual uses pre-shave essential oils to create a protective barrier, warm eucalyptus steaming to soften hair shafts, single-pass sanitized blades, and an ice-cold compress with witch-hazel balm to eliminate razor bumps and irritation.
                            </p>
                        </details>

                        <details className="group rounded-2xl border border-[#2b221a] bg-[#16120e] p-6 transition-all duration-300 open:border-[#d4af37]/60">
                            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-medium text-[#f7f2ea]">
                                <span>Do you offer pre-wedding groom packages?</span>
                                <span className="text-[#d4af37] transition-transform duration-300 group-open:rotate-180">▼</span>
                            </summary>
                            <p className="mt-4 font-sans text-xs sm:text-sm text-[#9c8e82] leading-relaxed">
                                Yes. We curate bespoke Imperial Groom packages including haircuts, beard detailing, skin lightening facials, scalp detox spas, and hand-foot grooming scheduled in the days leading up to your wedding ceremonies.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* 8. VIP CONCIERGE BOOKING CTA */}
            <section className="py-24 px-5 sm:px-8 md:px-12 bg-gradient-to-b from-[#14100c] to-[#0e0c0b]">
                <div className="mx-auto max-w-5xl rounded-3xl border border-[#d4af37]/40 bg-[#16120e] p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-[#d4af37]/15 blur-3xl"
                    />

                    <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#e5c07b] font-semibold block mb-3">
                        Reserve Your Master Appointment
                    </span>
                    <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f7f2ea] max-w-xl mx-auto leading-tight">
                        Experience Royal Barbershop Craft at KNK Awadh
                    </h2>
                    <p className="mt-4 font-sans text-xs sm:text-sm text-[#9c8e82] max-w-lg mx-auto leading-relaxed">
                        Step into executive confidence. Private chairs, unhurried attention, and master barbers dedicated to your appearance.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => openBooking({ serviceName: "Men's Grooming VIP Slot" })}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#b38f28] px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#0e0c0b] shadow-[0_10px_30px_rgba(212,175,55,0.25)] transition-all duration-300 hover:scale-105"
                        >
                            <span>Reserve Your Chair Online</span>
                            <span>→</span>
                        </button>
                        <a
                            href="tel:+919559321711"
                            className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/50 bg-black/40 px-7 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#e5c07b] transition-colors hover:bg-[#d4af37] hover:text-[#0e0c0b]"
                        >
                            <span>Direct Line: +91 95593 21711</span>
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
