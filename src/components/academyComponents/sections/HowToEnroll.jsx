"use client";

import React from "react";
import { enrollSteps } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import { MessageSquareText, Compass, Sparkles, Award, ArrowRight } from "lucide-react";

const STEP_ICONS = [
    MessageSquareText,
    Compass,
    Sparkles,
    Award
];

export default function HowToEnroll() {
    return (
        <section className="px-5 sm:px-8 py-20 md:py-28 bg-[#fbf7f0] relative">
            <div className="max-w-4xl mx-auto text-center mb-14">
                <SectionHeading
                    eyebrow="Admissions Process"
                    line1="Your roadmap to"
                    line2="professional enrollment."
                    description="From your very first counselling session to graduation day portfolio shoots and job placement assistance — our simple 4-step admission journey."
                    center
                />
                <div className="flex justify-center">
                    <GoldDivider center />
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {/* Horizontal connecting line on desktop */}
                    <div
                        className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-px bg-gradient-to-r from-[#d0bda4]/20 via-[#b58a52]/40 to-[#d0bda4]/20 -translate-y-12 pointer-events-none"
                        aria-hidden="true"
                    />

                    {enrollSteps.map((step, i) => {
                        const Icon = STEP_ICONS[i % STEP_ICONS.length];
                        return (
                            <div
                                key={step.title}
                                className="relative rounded-3xl bg-[#fffdf9] border border-[#e8dfc8] p-6 sm:p-8 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-[#b58a52] flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="size-12 rounded-2xl bg-[#f4eee1] text-[#b58a52] flex items-center justify-center group-hover:bg-[#b58a52] group-hover:text-white transition-colors shadow-2xs">
                                            <Icon className="size-5" />
                                        </div>
                                        <span className="font-['Cormorant_Garamond'] text-3xl font-light italic text-[#d0bda4] group-hover:text-[#b58a52] transition-colors">
                                            0{i + 1}
                                        </span>
                                    </div>

                                    <h3 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-semibold text-[#29231f] mb-2.5">
                                        {step.title}
                                    </h3>
                                    <p className="font-['Inter'] text-[12.5px] leading-relaxed text-[#71665c]">
                                        {step.text}
                                    </p>
                                </div>

                                <div className="mt-6 pt-3 border-t border-[#f4eee1] flex items-center gap-1.5 text-[#a17b5a] font-['Inter'] text-[10.5px] uppercase tracking-wider font-semibold">
                                    <span>Milestone 0{i + 1}</span>
                                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="#book"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-9 py-4 rounded-full text-white shadow-md transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: "#b58a52" }}
                    >
                        <span>Start Your Admission</span>
                        <ArrowRight className="size-3.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}