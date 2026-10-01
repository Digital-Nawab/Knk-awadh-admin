"use client";

import React from "react";
import { mentors, mentorsImage } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import { Award, Sparkles, CheckCircle2, Star } from "lucide-react";

export default function Mentors() {
    return (
        <section className="px-5 sm:px-8 py-20 md:py-28 bg-[#f4eee1] relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center mb-14">
                <SectionHeading
                    eyebrow="Direct Mentorship"
                    line1="Learn directly from the"
                    line2="master founders."
                    description="A mother-daughter duo leading a family-owned legacy across two decades of high-fashion artistry and royal bridal cosmetology. Every batch is directly guided, evaluated, and certified by Poonam and Ishitta Chowdhary."
                    center
                />
                <div className="flex justify-center">
                    <GoldDivider center />
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left: Real Mentors Editorial Portrait */}
                <div className="lg:col-span-5 relative">
                    <div className="relative max-w-[420px] mx-auto">
                        {/* Decorative background border */}
                        <div
                            className="absolute -inset-3 sm:-inset-4 rounded-3xl border border-[#b58a52]/40 pointer-events-none rotate-1"
                            aria-hidden="true"
                        />

                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(41,35,31,0.3)] border border-[#d0bda4] bg-white">
                            <img
                                src={mentorsImage}
                                alt="Poonam Ranjan Chowdhary and Ishitta Chowdhary, Founders & Mentors at KNK Academy"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                            <div className="absolute bottom-5 left-5 right-5 text-white">
                                <p className="font-['Inter'] text-[9.5px] uppercase tracking-[0.22em] text-[#ead9ae] font-semibold">
                                    Founders & Academic Directorate
                                </p>
                                <p className="font-['Cormorant_Garamond'] text-xl font-medium leading-snug">
                                    Poonam Ranjan & Ishitta Chowdhary
                                </p>
                            </div>
                        </div>

                        {/* Floating Mentor Seal Badge */}
                        <div className="absolute -bottom-5 right-0 sm:-right-6 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-[#29231f] text-white border border-[#b58a52] shadow-xl flex items-center gap-2.5 sm:gap-3">
                            <div className="size-8 sm:size-9 rounded-full bg-[#b58a52]/20 border border-[#b58a52] flex items-center justify-center text-[#ead9ae] shrink-0">
                                <Star className="size-3.5 sm:size-4 fill-[#ead9ae]" />
                            </div>
                            <div>
                                <p className="font-['Inter'] text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] text-[#ead9ae] font-semibold">
                                    Personal Evaluation
                                </p>
                                <p className="font-['Inter'] text-[10px] sm:text-[11px] text-[#fbf7f0]/85">
                                    In Every Single Batch
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Mentor Profiles & Credentials */}
                <div className="lg:col-span-7 space-y-6">
                    {mentors.map((m, idx) => (
                        <div
                            key={m.name}
                            className="p-6 sm:p-7 rounded-2xl bg-[#fffdf9] border border-[#d0bda4] shadow-xs transition-all duration-300 hover:border-[#b58a52] hover:shadow-md"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <span className="font-['Inter'] text-[9.5px] uppercase tracking-[0.22em] font-semibold text-[#a17b5a] px-2.5 py-1 rounded-full bg-[#f4eee1]">
                                    {m.role}
                                </span>
                                {m.credentials && (
                                    <span className="font-['Inter'] text-[11px] text-[#71665c] font-medium">
                                        {m.credentials}
                                    </span>
                                )}
                            </div>

                            <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-[28px] font-semibold text-[#29231f]">
                                {m.name}
                            </h3>

                            {m.title && (
                                <p className="font-['Cormorant_Garamond'] italic text-base text-[#b58a52] mb-3">
                                    {m.title}
                                </p>
                            )}

                            <p className="font-['Inter'] text-[13px] sm:text-[13.5px] leading-[1.85] text-[#71665c]">
                                {m.bio}
                            </p>

                            <div className="mt-4 pt-3.5 border-t border-[#f4eee1] flex flex-wrap items-center gap-3 sm:gap-4 text-[#29231f] font-['Inter'] text-[11px] sm:text-[11.5px]">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="size-3.5 text-[#b58a52]" />
                                    <span>Practical Demos</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="size-3.5 text-[#b58a52]" />
                                    <span>Portfolio Direction</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="size-3.5 text-[#b58a52]" />
                                    <span>Industry Networking</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}