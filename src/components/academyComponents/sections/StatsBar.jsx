"use client";

import React from "react";
import { stats } from "../shared/constants";
import { Award, GraduationCap, Sparkles, BookOpen } from "lucide-react";

const STAT_ICONS = [
    Sparkles,
    GraduationCap,
    BookOpen,
    Award
];

export default function StatsBar() {
    return (
        <section className="relative px-5 sm:px-8 py-10 sm:py-12 bg-[#241d18] text-[#fbf7f0] border-y border-[#3a3028] overflow-hidden">
            {/* Ambient luxury glow */}
            <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(181,138,82,0.15),_transparent_70%)] pointer-events-none"
                aria-hidden="true"
            />

            <div className="relative max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-8">
                    {stats.map((s, idx) => {
                        const Icon = STAT_ICONS[idx % STAT_ICONS.length];
                        return (
                            <div
                                key={s.label}
                                className="flex flex-col items-center text-center px-2 sm:px-4"
                            >
                                <div className="mb-2 inline-flex items-center justify-center size-8 rounded-full bg-[#b58a52]/15 text-[#b58a52] border border-[#b58a52]/30">
                                    <Icon className="size-4" />
                                </div>
                                <p className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-[42px] font-normal leading-none tracking-tight text-[#ead9ae]">
                                    {s.value}
                                </p>
                                <p className="mt-2.5 font-['Inter'] text-[10px] sm:text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#fbf7f0]">
                                    {s.label}
                                </p>
                                {s.detail && (
                                    <p className="mt-1 font-['Inter'] text-[11px] text-[#a89d91] max-w-[200px]">
                                        {s.detail}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}