"use client";

import React from "react";
import {
    whyAcademyPoints,
    academyTrainingImage,
    hairStylingImage,
    bridalArtImage
} from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import { Globe, HeartHandshake, Sparkles, Building2, Award, Briefcase, Quote } from "lucide-react";

const POINT_ICONS = [
    Globe,
    Sparkles,
    Briefcase,
    HeartHandshake,
    Building2,
    Award
];

const POINT_TITLES = [
    "Globally Trained Faculty",
    "Skincare-First Foundation",
    "Backstage Runway Access",
    "Guaranteed 1-Mo Internship",
    "Salon Business Mastery",
    "IAF Global Accreditation"
];

export default function WhyAcademy() {
    return (
        <section className="relative px-5 sm:px-8 py-20 md:py-28 bg-[#fbf7f0] overflow-hidden">
            {/* Subtle background ambient lighting (desktop only to prevent mobile shadow/blur artifacts) */}
            <div
                className="hidden md:block absolute top-1/3 left-0 w-[500px] h-[350px] bg-[#f4eee1] rounded-full blur-3xl pointer-events-none -translate-x-1/2"
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left: Editorial Overlapping Multi-Image Composition */}
                    <div className="lg:col-span-5 order-2 lg:order-1 relative">
                        <div className="relative max-w-[460px] mx-auto">
                            {/* Decorative angled gold frame behind */}
                            <div
                                className="absolute -top-3 left-0 sm:-top-6 sm:-left-6 w-full h-full rounded-3xl border border-[#b58a52]/35 pointer-events-none -rotate-1 sm:-rotate-2"
                                aria-hidden="true"
                            />

                            {/* Anchor Main Training Image */}
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(41,35,31,0.25)] border border-[#e8dfc8] bg-white">
                                <img
                                    src={academyTrainingImage}
                                    alt="Live hands-on training session at KNK Academy"
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                                <div className="absolute bottom-5 left-5 right-5 text-white">
                                    <span className="font-['Inter'] text-[9px] uppercase tracking-[0.22em] text-[#ead9ae] font-semibold">
                                        Hands-On Pedagogy
                                    </span>
                                    <p className="font-['Cormorant_Garamond'] text-xl font-medium leading-snug">
                                        Personalized guidance on live models
                                    </p>
                                </div>
                            </div>

                            {/* Floating Second Overlapping Image (Top-Right) */}
                            <div className="absolute -top-4 right-0 sm:-top-6 sm:-right-8 w-32 sm:w-44 aspect-square rounded-2xl overflow-hidden border-2 border-[#fffdf9] shadow-2xl transition-transform duration-500 hover:scale-105">
                                <img
                                    src={hairStylingImage}
                                    alt="Hair technician training"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Overlapping Founders Quote Banner (Bottom) */}
                            <div className="relative sm:absolute -bottom-8 right-0 sm:-right-6 sm:max-w-[320px] mt-6 sm:mt-0 p-4 sm:p-5 rounded-2xl bg-[#fffdf9] border border-[#d0bda4] shadow-xl">
                                <Quote className="size-5 text-[#b58a52] mb-1.5 opacity-80" />
                                <p className="font-['Cormorant_Garamond'] italic text-[15px] sm:text-[16px] text-[#29231f] leading-snug">
                                    "We don't teach makeup as a routine; we nurture it as an international art form and viable business."
                                </p>
                                <p className="mt-2 font-['Inter'] text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#a17b5a]">
                                    — KNK Academic Directorate
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Section Content & 6 Pillars */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <SectionHeading
                            eyebrow="The KNK Distinction"
                            line1="Why train at"
                            line2="KNK Academy."
                            description="Where royal Awadhi artistry meets international fashion week standards. Our intensive curriculum is structured to transform aspiring enthusiasts into coveted beauty professionals."
                        />
                        <GoldDivider />

                        {/* 6 Value Pillars in Clean Asymmetric Cards */}
                        <div className="mt-8 grid sm:grid-cols-2 gap-4">
                            {whyAcademyPoints.map((point, idx) => {
                                const Icon = POINT_ICONS[idx % POINT_ICONS.length];
                                const title = POINT_TITLES[idx % POINT_TITLES.length];
                                return (
                                    <div
                                        key={point}
                                        className="group p-4 sm:p-5 rounded-xl bg-[#fffdf9] border border-[#e8dfc8] shadow-xs transition-all duration-300 hover:border-[#b58a52] hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between mb-2.5">
                                            <div className="size-8 rounded-lg bg-[#f4eee1] text-[#b58a52] flex items-center justify-center transition-colors group-hover:bg-[#b58a52] group-hover:text-white">
                                                <Icon className="size-4" />
                                            </div>
                                            <span className="font-['Cormorant_Garamond'] text-lg italic text-[#d0bda4] group-hover:text-[#b58a52] transition-colors">
                                                0{idx + 1}
                                            </span>
                                        </div>
                                        <h3 className="font-['Cormorant_Garamond'] text-base sm:text-lg font-semibold text-[#29231f] mb-1.5">
                                            {title}
                                        </h3>
                                        <p className="font-['Inter'] text-[12px] sm:text-[12.5px] leading-relaxed text-[#71665c]">
                                            {point}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}