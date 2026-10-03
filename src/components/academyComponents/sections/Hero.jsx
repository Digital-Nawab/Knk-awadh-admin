"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Award, ArrowUpRight, CheckCircle2, Phone, Calendar } from "lucide-react";
import { INK, MUTED, GOLD, GOLD_DEEP, LINE, whyAcademyImage, bridalArtImage } from "../shared/constants";
import { Eyebrow, GoldDivider } from "../shared/SharedUI";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-[#fbf7f0]">
            {/* Subtle Awadhi Jaali background motif */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]" aria-hidden="true">
                <svg className="w-full h-full" style={{ color: INK }} preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <pattern id="academyHeroJaali" width="64" height="56" patternUnits="userSpaceOnUse">
                            <path d="M32 4 L60 28 L32 52 L4 28 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="32" cy="28" r="3" fill="none" stroke="currentColor" strokeWidth="0.8" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#academyHeroJaali)" />
                </svg>
            </div>

            {/* Ambient luxury glow (desktop only to prevent mobile shadow/blur artifacts) */}
            <div
                className="hidden md:block absolute top-1/4 right-1/4 w-[550px] h-[350px] bg-gradient-to-br from-[#b58a52]/10 via-[#ead9ae]/5 to-transparent blur-3xl pointer-events-none rounded-full"
                aria-hidden="true"
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                {/* Breadcrumbs Navigation */}
                <nav aria-label="Breadcrumb" className="mb-6 flex items-center">
                    <ol className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-['Inter'] uppercase tracking-[0.25em] text-[#8B7D6E]">
                        <li>
                            <Link href="/" className="hover:text-[#b58a52] transition-colors">
                                Home
                            </Link>
                        </li>
                        <li className="text-[#b58a52]/60">/</li>
                        <li className="text-[#29231f] font-medium" aria-current="page">
                            Academy
                        </li>
                    </ol>
                </nav>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
                    {/* Left Column: Text & Hierarchy */}
                    <div className="lg:col-span-7 relative z-10 max-w-2xl">
                        {/* Live batch status pill */}
                        <div className="mb-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f4eee1] border border-[#e6dece] shadow-xs">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b58a52] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b58a52]" />
                            </span>
                            <span className="font-['Inter'] text-[10px] sm:text-[10.5px] font-medium tracking-[0.16em] uppercase text-[#71665c]">
                                Admissions Open • <span className="text-[#29231f] font-semibold">2026 Masterclass Batches</span>
                            </span>
                        </div>

                        {/* Refined Heading (not oversized!) */}
                        <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.12] tracking-[-0.025em] text-[#29231f]">
                            Your passion.
                            <br />
                            <span className="italic font-medium text-[#b58a52]">
                                Crafted into an international career.
                            </span>
                        </h1>

                        <GoldDivider />

                        {/* Preserved Narrative Text */}
                        <p className="mt-6 font-['Inter'] text-[13.5px] sm:text-[14.5px] leading-[1.85] text-[#71665c]">
                            Start a career as a professional makeup artist at the best makeup academy in
                            Lucknow. Learn from a globally trained team, build a portfolio
                            with real shoots, and walk away with an IAF-certified
                            qualification recognised across the beauty industry.
                        </p>

                        {/* Feature Badges Grid */}
                        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#e8dfc8]">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 shrink-0 text-[#b58a52]" />
                                <span className="font-['Inter'] text-[11px] font-medium text-[#29231f] tracking-wide">
                                    IAF Certified
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 shrink-0 text-[#b58a52]" />
                                <span className="font-['Inter'] text-[11px] font-medium text-[#29231f] tracking-wide">
                                    15+ Yrs Legacy
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 shrink-0 text-[#b58a52]" />
                                <span className="font-['Inter'] text-[11px] font-medium text-[#29231f] tracking-wide">
                                    100% Practical
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 shrink-0 text-[#b58a52]" />
                                <span className="font-['Inter'] text-[11px] font-medium text-[#29231f] tracking-wide">
                                    1-Mo Internship
                                </span>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
                            <a
                                href="#book"
                                data-booking-trigger="true"
                                data-service="Academy Admission Consultation"
                                className="inline-flex items-center justify-center gap-2 font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-3.5 sm:py-4 rounded-full text-[#fbf7f0] shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer text-center"
                                style={{ backgroundColor: GOLD }}
                            >
                                <span>Enroll Now</span>
                                <ArrowUpRight className="size-3.5" />
                            </a>

                            <a
                                href="#courses"
                                className="inline-flex items-center justify-center gap-2 font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-3.5 sm:py-4 rounded-full border bg-white/60 hover:bg-white text-[#29231f] transition-all duration-300 text-center"
                                style={{ borderColor: LINE }}
                            >
                                <span>View Courses (12)</span>
                            </a>

                            <a
                                href="tel:+918881000552"
                                className="inline-flex items-center justify-center sm:justify-start gap-2 font-['Inter'] text-[12px] text-[#71665c] hover:text-[#b58a52] transition-colors pt-1 sm:pt-0 sm:ml-1"
                            >
                                <Phone className="size-3.5 text-[#b58a52]" />
                                <span>Admissions: +91 88810 00552</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Editorial Multi-Layered Visual Composition */}
                    <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                        <div className="relative mx-auto max-w-[380px] sm:max-w-[480px]">
                            {/* Decorative gold backdrop frame */}
                            <div
                                className="absolute -inset-2 sm:-inset-4 rounded-3xl border border-[#b58a52]/30 pointer-events-none -rotate-1 transition-transform duration-500"
                                aria-hidden="true"
                            />

                            {/* Main Anchor Portrait Image */}
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(41,35,31,0.22)] border border-[#e8dfc8] bg-white">
                                <img
                                    src={whyAcademyImage}
                                    alt="KNK Makeup Academy students and mentors in live training session"
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />

                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <p className="font-['Inter'] text-[9px] uppercase tracking-[0.2em] text-[#ead9ae]">
                                        Studio Sanctuary
                                    </p>
                                    <p className="font-['Cormorant_Garamond'] text-lg font-medium leading-tight">
                                        Hands-on vanity workstations & runway lights
                                    </p>
                                </div>
                            </div>

                            {/* Overlapping Floating Polaroid Card (Bottom-Left) */}
                            <div className="absolute -bottom-6 left-0 sm:-bottom-8 sm:-left-10 w-36 sm:w-52 p-2 sm:p-2.5 rounded-xl bg-[#fffdf9] border border-[#d0bda4] shadow-xl sm:shadow-2xl transition-transform duration-500 hover:-translate-y-1">
                                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-1.5 sm:mb-2 bg-[#f4eee1]">
                                    <img
                                        src={bridalArtImage}
                                        alt="Editorial bridal makeup demo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="px-1 py-0.5">
                                    <div className="flex items-center gap-1 text-[#b58a52]">
                                        <Sparkles className="size-2.5 sm:size-3" />
                                        <span className="font-['Inter'] text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.16em] font-semibold">
                                            Masterclass Demo
                                        </span>
                                    </div>
                                    <p className="font-['Cormorant_Garamond'] text-[11px] sm:text-xs font-medium text-[#29231f]">
                                        Bridal & Couture Artistry
                                    </p>
                                </div>
                            </div>

                            {/* Overlapping Accreditation Stamp Badge (Top-Right) */}
                            <div className="absolute -top-4 right-0 sm:-top-5 sm:-right-6 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl bg-[#29231f] text-[#fbf7f0] border border-[#b58a52]/50 shadow-xl flex items-center gap-2.5 sm:gap-3">
                                <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-[#b58a52]/20 border border-[#b58a52] flex items-center justify-center text-[#ead9ae] shrink-0">
                                    <Award className="size-3.5 sm:size-4" />
                                </div>
                                <div>
                                    <p className="font-['Inter'] text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-[#ead9ae] font-semibold">
                                        IAF Certified
                                    </p>
                                    <p className="font-['Inter'] text-[9px] sm:text-[10px] text-[#fbf7f0]/80">
                                        Valid in 80+ Countries
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}