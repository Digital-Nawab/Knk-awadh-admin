"use client";

import React from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, GOLD } from "./Makeupdata";
import BookingForm from "./BookingForm";
import { DEFAULT_MAKEUP_SECTIONS } from "@/data/makeupDefaults";

export default function BookingSection({ data }) {
    const content = { ...DEFAULT_MAKEUP_SECTIONS.booking_info, ...(data || {}) };

    return (
        <section id="book" className="relative px-5 py-20 sm:px-6 md:py-28 bg-[#fbf7f0] scroll-mt-20">
            <span id="booking" className="absolute -top-24 opacity-0 pointer-events-none" />
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12 sm:mb-14">
                    <Eyebrow>{content.eyebrow || content.badge || "RESERVE YOUR SLOT"}</Eyebrow>
                    <h2
                        className="mt-4 font-['Cormorant_Garamond',serif] text-[34px] sm:text-[46px] md:text-[54px] font-medium leading-[1.08] tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        {content.heading || content.heading_line1 || "Book Your Makeup Consultation"}{" "}
                        <span className="italic" style={{ color: GOLD }}>
                            {content.headingHighlight || content.heading_highlight || "in Lucknow"}
                        </span>
                    </h2>
                    <GoldDivider center />
                    <p className="mt-5 font-['Inter',sans-serif] text-[13.5px] sm:text-[15px] leading-[1.85] text-[#6b6055] max-w-xl mx-auto">
                        {content.description}
                    </p>
                </div>
                <BookingForm />
            </div>
        </section>
    );
}