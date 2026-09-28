"use client";

import React, { useState } from "react";
import { INK, MUTED, GOLD, GOLD_DEEP, LINE, faqs } from "./constants";

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="max-w-3xl mx-auto divide-y" style={{ borderColor: LINE }}>
            {faqs.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                    <div key={item.q} className="py-5" style={{ borderColor: LINE }}>
                        <button
                            onClick={() => setOpenIndex(isOpen ? -1 : i)}
                            className="w-full flex items-center justify-between gap-4 text-left"
                        >
                            <span className="font-['Cormorant_Garamond'] text-xl font-medium" style={{ color: INK }}>
                                {item.q}
                            </span>
                            <span
                                className="shrink-0 h-7 w-7 rounded-full border flex items-center justify-center font-['Inter'] text-sm transition-transform duration-300"
                                style={{ borderColor: GOLD, color: GOLD_DEEP, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                            >
                                +
                            </span>
                        </button>
                        {isOpen && (
                            <p className="mt-4 font-['Inter'] text-[13px] leading-[1.9] max-w-2xl" style={{ color: MUTED }}>
                                {item.a}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}