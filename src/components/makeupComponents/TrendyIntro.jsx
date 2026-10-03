"use client";

import React from "react";
import Link from "next/link";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, GOLD, LINE } from "./Makeupdata";

const trends = [
    {
        number: "01",
        title: "Soft Glam Bridal Makeup",
        description:
            "A polished bridal look with softly defined eyes, balanced complexion, and a glamorous but refined finish.",
    },
    {
        number: "02",
        title: "Natural Bridal Makeup",
        description:
            "A more subtle makeup style that enhances the bride's natural features while keeping the overall look elegant and fresh.",
    },
    {
        number: "03",
        title: "Traditional Bridal Makeup",
        description:
            "A classic option that complements traditional bridal attire, jewellery and ceremony styling.",
    },
    {
        number: "04",
        title: "Modern Bridal Makeup",
        description:
            "Contemporary makeup with customized eye makeup, complexion and lip tones suited to the bride's overall styling.",
    },
    {
        number: "05",
        title: "HD Bridal Makeup",
        description:
            "A camera-friendly makeup approach designed for weddings, photography and videography.",
    },
    {
        number: "06",
        title: "Airbrush Bridal Makeup",
        description:
            "An airbrush-applied makeup option that can provide a lightweight, professionally finished look depending on the bride's skin and requirements.",
    },
];

export default function TrendyIntro() {
    return (
        <section className="relative px-5 py-20 sm:px-6 md:py-28 bg-[#fbf7f0] overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Intro Header */}
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow>BRIDAL MAKEUP TRENDS</Eyebrow>
                    <h2
                        className="mt-4 font-['Cormorant_Garamond',serif] text-[34px] sm:text-[46px] md:text-[54px] font-medium leading-[1.08] tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        Trendy Bridal{" "}
                        <span className="italic" style={{ color: GOLD }}>
                            Makeup Looks in Lucknow
                        </span>
                    </h2>
                    <GoldDivider center />
                    <p className="mt-6 font-['Inter',sans-serif] text-[13.5px] sm:text-[15px] leading-[1.9] text-[#63574c]">
                        Bridal makeup trends continue to evolve, from soft-glam and natural finishes to
                        traditional bridal looks with defined eyes and statement lips. At KNK Awadh Salon &amp;
                        Academy, bridal makeup can be customized around your outfit, jewellery, wedding ceremony,
                        personal style, and preferred finish.
                    </p>
                </div>

                {/* Trends Subhead */}
                <div className="mt-16 sm:mt-20 text-center">
                    <span className="inline-block text-[11px] font-['Inter',sans-serif] font-semibold tracking-[0.28em] uppercase text-[#a17b5a] mb-2">
                        Look Aesthetics
                    </span>
                    <h3
                        className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight"
                        style={{ color: INK }}
                    >
                        Current Bridal Makeup Trends
                    </h3>
                    <div className="mt-3 mx-auto w-12 h-px bg-[#c49a4d]" />
                </div>

                {/* 6 Trends Grid */}
                <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {trends.map((item) => (
                        <div
                            key={item.number}
                            className="group relative bg-[#fffdf9] border rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                            style={{ borderColor: LINE }}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-semibold italic"
                                        style={{ color: GOLD }}
                                    >
                                        {item.number}
                                    </span>
                                    <span className="w-2 h-2 rounded-full bg-[#d0bda4] group-hover:bg-[#b58a52] transition-colors" />
                                </div>
                                <h4
                                    className="font-['Cormorant_Garamond',serif] text-[22px] sm:text-[24px] font-medium leading-snug group-hover:text-[#b58a52] transition-colors"
                                    style={{ color: INK }}
                                >
                                    {item.title}
                                </h4>
                                <p className="mt-3 font-['Inter',sans-serif] text-[13px] sm:text-[13.5px] leading-[1.75] text-[#6b6055]">
                                    {item.description}
                                </p>
                            </div>
                            <div className="mt-5 pt-3 border-t border-[#f0e6d8] flex items-center text-[10px] font-['Inter',sans-serif] font-semibold tracking-[0.2em] uppercase text-[#a17b5a]">
                                <span>Customized Lucknow Artistry</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href="/makeup-services/bridal-makeup"
                        className="inline-flex items-center justify-center gap-2 font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#fbf7f0] shadow-md transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: GOLD }}
                    >
                        <span>Explore Bridal Makeup</span>
                        <span className="text-sm font-bold">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}