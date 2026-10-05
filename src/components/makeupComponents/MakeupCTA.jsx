"use client";

import React from "react";
import { Eyebrow } from "./Makeupui";
import { GOLD } from "./Makeupdata";
import { DEFAULT_MAKEUP_SECTIONS } from "@/data/makeupDefaults";

export default function MakeupCTA({ data }) {
    const content = { ...DEFAULT_MAKEUP_SECTIONS.cta, ...(data || {}) };

    return (
        <section
            className="px-6 py-20 md:py-24 text-center bg-[#fffdf9]">
            <div className="max-w-[560px] mx-auto">
                <Eyebrow>
                    {content.eyebrow || content.badge || "Ready When You Are"}
                </Eyebrow>

                <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] text-[#241d18] sm:text-[52px] md:text-[58px]">
                    {content.heading || content.heading_line1 || "Ready For Your Bespoke"}{" "}
                    <span
                        className="italic"
                        style={{ color: GOLD }}
                    >
                        {content.headingHighlight || content.heading_highlight || "Makeup Consultation?"}
                    </span>
                </h2>

                <p className="mt-7 font-['Inter'] text-[13px] leading-[1.9] text-[#6f665d] sm:text-[14px]">
                    {content.description}
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-4">
                    {/* Call Now */}
                    <a
                        href={`tel:${String(content.phone || content.call_number || "+918881000552").replace(/[^0-9+]/g, '')}`}
                        className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#241d18] transition-transform duration-300 hover:scale-105"
                        style={{ backgroundColor: GOLD }}
                    >
                        {content.phoneText || content.call_text || "Call Now"}
                    </a>

                    {/* Chat Now */}
                    <a
                        href={content.whatsappUrl || content.chat_whatsapp_url || "https://wa.me/918881000552?text=Hi%20there%2C%20I'm%20interested%20in%20booking%20a%20makeup%20appointment%20with%20you."}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full border border-[#4a4038] text-[#241d18] transition-colors duration-300 hover:bg-[#241d18] hover:text-[#fbf7f0]"
                    >
                        {content.whatsappText || content.chat_text || "Chat Now"}
                    </a>
                </div>
            </div>
        </section>
    );
}