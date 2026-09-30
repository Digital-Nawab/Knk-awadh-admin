"use client";

import React, { useState } from "react";
import { faqList } from "./AboutData";

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section id="faq" className="px-6 py-20 md:py-24 bg-secondary/60">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        FAQ
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[52px] sm:text-[64px] md:text-[76px] lg:text-[88px] font-medium leading-[0.88] tracking-[-0.04em] text-[#29231f]">
                        Frequently Asked
                        <br />
                        <span className="italic text-[#b58a52]">Questions</span>
                    </h2>
                </div>

                <div className="border-t border-[#d8cbbd]">
                    {faqList.map((item, index) => {
                        const isOpen = openIndex === index;
                        const num = `0${index + 1}`;

                        return (
                            <div key={index} className="border-b border-[#d8cbbd]">
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(index)}
                                    className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7 cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-start gap-4 sm:gap-5">
                                        <span className="mt-1 font-['Inter'] text-[9px] tracking-[0.25em] text-[#b49a7b]">
                                            {num}
                                        </span>
                                        <span
                                            className={`font-['Cormorant_Garamond'] text-[21px] sm:text-[24px] font-medium transition-colors duration-300 ${
                                                isOpen ? "text-[#a47a59]" : "text-[#29231f] group-hover:text-[#a47a59]"
                                            }`}
                                        >
                                            {item.q}
                                        </span>
                                    </div>
                                    <span
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                            isOpen
                                                ? "border-[#b58a52] bg-[#b58a52] text-white rotate-45"
                                                : "border-[#cdbda9] text-[#8f6d4d] group-hover:border-[#b58a52] group-hover:bg-[#b58a52] group-hover:text-white"
                                        }`}
                                    >
                                        <svg
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="max-w-3xl pb-7 pl-8 sm:pl-12 font-['Inter'] text-[13px] sm:text-[14px] leading-[1.9] text-[#70665e]">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
