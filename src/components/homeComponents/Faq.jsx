"use client";

import React, { useState } from 'react';
import { DEFAULT_HOME_SECTIONS } from '@/data/homeDefaults';

const defaultFaqs = DEFAULT_HOME_SECTIONS.faq.items;

export default function Faq({ data }) {
    const content = { ...DEFAULT_HOME_SECTIONS.faq, ...(data || {}) };
    const rawItems = (Array.isArray(content.items) && content.items.length > 0)
        ? content.items
        : defaultFaqs;
    const items = Array.isArray(rawItems) ? rawItems : [];
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section
            id="faq"
            className="relative overflow-hidden bg-[#f8f6f1] py-20 sm:py-24 lg:py-28"
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#c49a4d]/5 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#9e7785]/5 blur-3xl" />
            <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
                {/* ================= HEADER ================= */}
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#c49a4d]" />
                            <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-[0.35em] text-[#a47a59]">
                                {content.eyebrow || content.badge || "FAQ"}
                            </span>
                        </div>
                        <h2 className="font-['Cormorant_Garamond'] text-[52px] font-medium leading-[0.9] tracking-[-0.04em] text-[#29231f] sm:text-[68px] lg:text-[82px]">
                            {content.heading || content.heading_line1 || "Questions,"}
                            <br />
                            <span className="italic text-[#c49a4d]">
                                {content.headingHighlight || content.heading_highlight || "answered."}
                            </span>
                        </h2>
                    </div>
                    <div className="max-w-xl lg:ml-auto lg:pb-2">
                        <p className="font-['Inter'] text-[13px] leading-[1.9] text-[#6d645d]">
                            {content.description || content.subheading}
                        </p>
                    </div>
                </div>

                {/* ================= FAQ LIST ================= */}
                <div className="mt-14 border-t border-[#d8cbbd]">
                    {items.map((item, index) => {
                        const isOpen = openIndex === index;
                        const num = `0${index + 1}`;

                        return (
                            <div key={index} className="faq-item border-b border-[#d8cbbd]">
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(index)}
                                    className="faq-question group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7 cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-start gap-5">
                                        <span className="mt-1 font-['Inter'] text-[9px] tracking-[0.25em] text-[#b49a7b]">
                                            {num}
                                        </span>
                                        <span
                                            className={`font-['Cormorant_Garamond'] text-[22px] font-medium transition-colors duration-300 sm:text-[25px] ${
                                                isOpen ? "text-[#a47a59]" : "text-[#332c27] group-hover:text-[#a47a59]"
                                            }`}
                                        >
                                            {item.q}
                                        </span>
                                    </div>
                                    <span
                                        className={`faq-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                            isOpen
                                                ? "border-[#c49a4d] bg-[#c49a4d] text-white rotate-45"
                                                : "border-[#cdbda9] text-[#8f6d4d] group-hover:border-[#c49a4d] group-hover:bg-[#c49a4d] group-hover:text-white"
                                        }`}
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`faq-answer grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="max-w-3xl pb-7 pl-10 font-['Inter'] text-[13px] leading-[1.9] text-[#70665e] sm:pl-14">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ================= BOTTOM CTA ================= */}
                <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-[2rem] border border-[#d8cbbd] bg-[#f2ece3] px-7 py-7 sm:flex-row sm:items-center sm:px-9">
                    <div>
                        <p className="font-['Cormorant_Garamond'] text-2xl italic text-[#493e37]">
                            {content.ctaTitle || content.cta_title || "Still have a question?"}
                        </p>
                        <p className="mt-1 font-['Inter'] text-[11px] text-[#756b63]">
                            {content.ctaSubtitle || content.cta_subtitle || "Our concierge team will be happy to help you."}
                        </p>
                    </div>
                    <a
                        href={typeof content.ctaButtonLink === 'string' ? content.ctaButtonLink : (typeof content.cta_button_link === 'string' ? content.cta_button_link : "#book")}
                        className="group inline-flex items-center gap-4 rounded-full bg-[#29231f] px-7 py-3.5 font-['Inter'] text-[9px] font-medium uppercase tracking-[0.22em] text-[#fffaf3] transition-all duration-300 hover:bg-[#c49a4d] hover:shadow-lg"
                    >
                        <span>{content.ctaButtonText || content.cta_button_text || "Book Appointment"}</span>
                        <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}