"use client";

import React from "react";
import Link from "next/link";

const signatureServices = [
    {
        id: "bridal-makeup",
        title: "Bridal Makeup",
        subtitle: "The Royal Awadhi Bride",
        badge: "WEDDING MAKEUP",
        ctaText: "Explore Bridal Makeup",
        url: "/makeup-services/bridal-makeup",
        image: "/assets/images/new/makeup-bride.webp",
        highlights: [
            "HD & Airbrush Options",
            "Bridal Hairstyling",
            "Dupatta & Jewellery Draping",
        ],
        description:
            "Customized bridal makeup for wedding ceremonies, photography, and reception celebrations, planned around your outfit, jewellery, personal style, and preferred finish.",
        number: "01",
    },
    {
        id: "engagement-makeup",
        title: "Engagement Makeup in Lucknow",
        subtitle: "Romantic Engagement Makeup",
        badge: "RING CEREMONY",
        ctaText: "Explore Engagement Makeup",
        url: "/makeup-services/engagement-makeup",
        image: "/assets/images/new/home/bridal/8.webp",
        highlights: [
            "Dewy or Refined Finish",
            "Customized Eye Makeup",
            "Event-Ready Styling",
        ],
        description:
            "Luminous engagement makeup customized for ring ceremonies, pre-wedding celebrations, your outfit, and preferred makeup style.",
        number: "02",
    },
    {
        id: "party-makeup",
        title: "Party Makeup in Lucknow",
        subtitle: "Evening Party Makeup",
        badge: "CELEBRATION GLAM",
        ctaText: "Explore Party Makeup",
        url: "/makeup-services/party-makeup",
        image: "/assets/images/new/home/bridal/5.webp",
        highlights: [
            "Customized Eye Makeup",
            "Soft Glam to Full Glam",
            "Customized Lip & Complexion",
        ],
        description:
            "Customized party makeup for cocktails, sangeet celebrations, festive occasions, evening events, and special gatherings.",
        number: "03",
    },
];

import { DEFAULT_MAKEUP_SECTIONS } from "@/data/makeupDefaults";

const defaultServices = DEFAULT_MAKEUP_SECTIONS.signature.items || DEFAULT_MAKEUP_SECTIONS.signature.services || [];

export default function SignatureMakeupServices({ data }) {
    const content = { ...DEFAULT_MAKEUP_SECTIONS.signature, ...(data || {}) };
    const rawServices = (Array.isArray(content.items) && content.items.length > 0)
        ? content.items
        : ((Array.isArray(content.services) && content.services.length > 0)
            ? content.services
            : defaultServices);
    const services = Array.isArray(rawServices) ? rawServices : [];

    return (
        <section
            id="services"
            className="relative overflow-hidden py-20 md:py-28 bg-[#f8f4ec] text-[#241d18]"
        >
            {/* Subtle background ambient radial lighting */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#e8d5b8]/30 via-transparent to-transparent blur-3xl"
            />

            {/* Subtle luxury Jaali lattice watermark */}
            <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full text-[#cda882] opacity-[0.035] pointer-events-none"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <pattern id="signatureJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                        <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="30" cy="26" r="3" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#signatureJaali)" />
            </svg>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
                    <div className="flex items-center justify-center gap-3">
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c49a4d]" />
                        <p className="font-['Inter',sans-serif] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.38em] text-[#a17b5a]">
                            {content.badge || "BESPOKE ATELIER"}
                        </p>
                        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c49a4d]" />
                    </div>

                    <h2 className="mt-3.5 font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#241d18]">
                        {content.heading_line1}{" "}
                        <span className="italic text-[#c49a4d]">{content.heading_highlight}</span>
                    </h2>

                    {/* Royal Gold Divider */}
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent to-[#c49a4d]" />
                        <span className="h-1.5 w-1.5 rotate-45 bg-[#c49a4d]" />
                        <span className="h-[1.5px] w-14 bg-gradient-to-l from-transparent to-[#c49a4d]" />
                    </div>

                    <p className="mt-5 font-['Inter',sans-serif] text-sm sm:text-[15px] leading-relaxed text-[#685c52] max-w-2xl mx-auto">
                        {content.description}
                    </p>
                </div>

                {/* 3 High-Fashion Editorial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 items-stretch">
                    {services.map((service, sIdx) => (
                        <div
                            key={service.id || sIdx}
                            className="group relative min-h-[580px] sm:h-[620px] lg:h-[660px] rounded-[26px] overflow-hidden border border-[#dfd2c4] hover:border-[#c49a4d] shadow-[0_16px_45px_rgba(40,25,15,0.08)] hover:shadow-[0_25px_65px_rgba(196,154,77,0.28)] transition-all duration-700 hover:-translate-y-2 flex flex-col justify-between"
                        >
                            {/* Full-Height Portrait Background Image */}
                            <div className="absolute inset-0 z-0 overflow-hidden bg-[#1f140e]">
                                <img
                                    src={service.image}
                                    alt={`${service.title} in Lucknow - KNK Awadh`}
                                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-108"
                                    loading="lazy"
                                />
                                
                                {/* Luxury Gradient Overlays for optimal readability */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent h-40" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#160c07] via-[#160c07]/85 to-transparent" />
                            </div>

                            {/* Top Card Floating Bar */}
                            <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                                <span className="backdrop-blur-md bg-[#180e08]/80 border border-[#cda882]/40 text-[#f5db99] font-['Inter',sans-serif] text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] uppercase px-3.5 py-1.5 rounded-full shadow-md">
                                    ✦ {service.badge}
                                </span>

                                <div className="flex items-center gap-2">
                                    <span className="font-['Cormorant_Garamond',serif] italic text-lg sm:text-xl text-[#f5db99]/90 backdrop-blur-md bg-[#180e08]/60 border border-[#cda882]/30 px-3 py-0.5 rounded-full">
                                        NO. {service.number}
                                    </span>
                                    <Link
                                        href={service.url}
                                        aria-label={service.title}
                                        className="w-10 h-10 rounded-full bg-[#180e08]/75 border border-[#cda882]/40 text-[#f5db99] flex items-center justify-center group-hover:bg-[#c49a4d] group-hover:text-[#180e08] group-hover:border-[#c49a4d] transition-all duration-300 group-hover:scale-110 shadow-lg"
                                    >
                                        <svg
                                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Bottom Card Content Suite */}
                            <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-end">
                                <p className="font-['Inter',sans-serif] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e5c697]">
                                    {service.subtitle}
                                </p>

                                <h3 className="mt-1 font-['Cormorant_Garamond',serif] text-2xl sm:text-[32px] font-medium leading-tight text-[#fcfaf7] group-hover:text-[#f5db99] transition-colors duration-300">
                                    {service.title}
                                </h3>

                                {/* Gold divider hairline */}
                                <div className="my-3 h-px w-12 bg-gradient-to-r from-[#c49a4d] to-transparent group-hover:w-24 transition-all duration-500" />

                                <p className="font-['Inter',sans-serif] text-[12.5px] sm:text-[13px] leading-[1.7] text-[#ded3c8] mb-3.5">
                                    {service.description}
                                </p>

                                {/* Micro Highlight Pills */}
                                <div className="space-y-1.5 mb-4">
                                    <p className="text-[10px] font-['Inter',sans-serif] font-bold uppercase tracking-[0.2em] text-[#f5db99]/90">
                                        Highlights
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(Array.isArray(service.highlights)
                                            ? service.highlights
                                            : (typeof service.highlights === 'string' ? service.highlights.split(',').map(s => s.trim()).filter(Boolean) : [])
                                        ).map((h, i) => (
                                            <span
                                                key={i}
                                                className="font-['Inter',sans-serif] text-[9.5px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#cda882]/20 border border-[#cda882]/40 text-[#f5db99]"
                                            >
                                                ✦ {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action link footer */}
                                <Link
                                    href={service.url}
                                    className="mt-2 pt-3.5 border-t border-white/15 flex items-center justify-between text-[#f5db99] font-['Inter',sans-serif] text-[11px] font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors"
                                >
                                    <span>{service.ctaText}</span>
                                    <span className="text-base transition-transform duration-300 group-hover:translate-x-1.5">
                                        &rarr;
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
