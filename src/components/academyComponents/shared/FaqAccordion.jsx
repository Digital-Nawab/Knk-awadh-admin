"use client";

import React, { useState } from "react";
import { INK, MUTED, GOLD, GOLD_DEEP, LINE, faqs } from "./constants";
import { ChevronDown, HelpCircle, Phone, MessageCircle } from "lucide-react";

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="max-w-4xl mx-auto space-y-3.5">
            {faqs.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                    <div
                        key={item.q}
                        className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                            isOpen
                                ? "bg-[#fffdf9] border-[#b58a52] shadow-sm"
                                : "bg-[#fffdf9]/70 border-[#e8dfc8] hover:border-[#d0bda4]"
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? -1 : i)}
                            className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none"
                        >
                            <span className="font-['Cormorant_Garamond'] text-lg sm:text-xl font-medium text-[#29231f]">
                                {item.q}
                            </span>
                            <span
                                className={`size-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                    isOpen
                                        ? "rotate-180 bg-[#b58a52] text-white border-[#b58a52]"
                                        : "border-[#d0bda4] text-[#a17b5a] bg-[#fbf7f0]"
                                }`}
                            >
                                <ChevronDown size={15} />
                            </span>
                        </button>

                        <div
                            className="grid transition-all duration-300 ease-in-out"
                            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                            <div className="overflow-hidden">
                                <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#f4eee1]">
                                    <p className="font-['Inter'] text-[13px] sm:text-[13.5px] leading-[1.85] text-[#71665c]">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Counsellor Quick Help Bar */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#f4eee1] border border-[#e6dece] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="size-10 rounded-full bg-[#b58a52]/20 text-[#b58a52] flex items-center justify-center shrink-0">
                        <HelpCircle className="size-5" />
                    </div>
                    <div>
                        <p className="font-['Cormorant_Garamond'] text-lg font-medium text-[#29231f]">
                            Still have questions about batch schedules or kit costs?
                        </p>
                        <p className="font-['Inter'] text-[12px] text-[#71665c]">
                            Our admissions counsellors are available daily from 10:00 AM – 7:30 PM.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2.5 shrink-0 w-full sm:w-auto">
                    <a
                        href="tel:+918881000552"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#29231f] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#b58a52] transition-colors text-center"
                    >
                        <Phone size={12} />
                        <span>Call Us</span>
                    </a>
                    <a
                        href="https://wa.me/918881000552?text=Hello,%20I%20have%20a%20question%20regarding%20KNK%20Academy%20courses."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-[#d0bda4] bg-white text-[#29231f] text-[11px] font-semibold uppercase tracking-wider hover:border-[#b58a52] transition-colors text-center"
                    >
                        <MessageCircle size={12} className="text-[#25D366]" />
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
}