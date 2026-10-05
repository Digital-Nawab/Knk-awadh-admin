"use client";

import React, { useState } from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, GOLD, LINE } from "./Makeupdata";
import { DEFAULT_MAKEUP_SECTIONS } from "@/data/makeupDefaults";

const defaultFaqs = DEFAULT_MAKEUP_SECTIONS.faq.items;

export default function MakeupFAQ({ data }) {
    const content = { ...DEFAULT_MAKEUP_SECTIONS.faq, ...(data || {}) };
    const rawFaqs = (Array.isArray(content.items) && content.items.length > 0) ? content.items : defaultFaqs;
    const faqs = Array.isArray(rawFaqs) ? rawFaqs : [];
    const [openIndex, setOpenIndex] = useState(0);

    function toggleFaq(index) {
        setOpenIndex(openIndex === index ? -1 : index);
    }

    // JSON-LD Schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
            },
        })),
    };

    return (
        <section id="faq" className="relative px-5 py-20 sm:px-6 md:py-28 bg-[#f4eee1] overflow-hidden">
            {/* Schema markup for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <Eyebrow>{content.eyebrow || content.badge || "FREQUENTLY ASKED QUESTIONS"}</Eyebrow>
                    <h2
                        className="mt-4 font-['Cormorant_Garamond',serif] text-[34px] sm:text-[46px] md:text-[54px] font-medium leading-[1.08] tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        {content.heading || content.heading_line1 || "Common Questions About Makeup Services"}{" "}
                        <span className="italic" style={{ color: GOLD }}>
                            {content.headingHighlight || content.heading_highlight || "in Lucknow"}
                        </span>
                    </h2>
                    <GoldDivider center />
                    <p className="mt-5 font-['Inter',sans-serif] text-[13.5px] sm:text-[14.5px] text-[#6b6055] max-w-xl mx-auto">
                        {content.description}
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-3.5">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                    isOpen
                                        ? "bg-[#fffdfa] border-[#b58a52] shadow-md"
                                        : "bg-[#fffdfa]/80 border-[#d8cabb] hover:border-[#b58a52]/60 hover:bg-[#fffdfa]"
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={isOpen}
                                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                                >
                                    <span
                                        className="font-['Cormorant_Garamond',serif] text-lg sm:text-[21px] font-medium leading-snug"
                                        style={{ color: isOpen ? GOLD : INK }}
                                    >
                                        {faq.q}
                                    </span>
                                    <span
                                        className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                            isOpen
                                                ? "bg-[#b58a52] text-[#fffdfa] border-[#b58a52] rotate-180"
                                                : "border-[#d8cabb] text-[#71665c] bg-[#fbf7f0]"
                                        }`}
                                    >
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[#f0e6d8]">
                                        <p className="font-['Inter',sans-serif] text-[13.5px] sm:text-[14px] leading-[1.8] text-[#5e5349] mt-3">
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
