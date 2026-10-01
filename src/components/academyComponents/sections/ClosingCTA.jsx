"use client";

import React from "react";
import { GOLD } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import { Phone, MessageCircle, MapPin, Sparkles, ArrowRight } from "lucide-react";

export default function ClosingCTA() {
    return (
        <section className="relative px-5 sm:px-8 py-20 md:py-28 bg-[#241d18] text-[#fbf7f0] overflow-hidden">
            {/* Ambient luxury radial glow */}
            <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(181,138,82,0.18),_transparent_70%)] pointer-events-none"
                aria-hidden="true"
            />

            <div className="relative max-w-4xl mx-auto text-center">
                {/* Decorative border container */}
                <div className="relative p-6 sm:p-12 md:p-14 rounded-3xl border border-[#b58a52]/40 bg-[#29231f]/80 backdrop-blur-xs shadow-2xl">
                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#ead9ae]" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#ead9ae]" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#ead9ae]" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#ead9ae]" />

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#b58a52]/50 text-[#ead9ae] mb-6">
                        <Sparkles className="size-3" />
                        <span className="font-['Inter'] text-[10px] uppercase tracking-[0.24em] font-semibold">
                            Begin Your Artistry Legacy
                        </span>
                        <Sparkles className="size-3" />
                    </div>

                    <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] text-[#fbf7f0]">
                        Shape your future as a{" "}
                        <span className="italic font-medium text-[#ead9ae]">
                            certified beauty master.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-xl mx-auto font-['Inter'] text-[13.5px] sm:text-[14.5px] leading-[1.85] text-[#d0c7bb]">
                        Call our admissions advisors or message us directly on WhatsApp. We will help you select the ideal course, schedule a studio walkthrough, and reserve your vanity seat.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row justify-center items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                        <a
                            href="tel:+916390008020"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-['Inter'] text-[11px] font-semibold tracking-[0.2em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[#241d18] shadow-lg transition-transform duration-300 hover:scale-105"
                            style={{ backgroundColor: GOLD }}
                        >
                            <Phone className="size-3.5 text-[#241d18]" />
                            <span>Call: +91 63900 08020</span>
                        </a>

                        <a
                            href="https://wa.me/918881000552?text=Hi%20there,%20I'm%20interested%20in%20enrolling%20at%20KNK%20Makeup%20Academy."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-['Inter'] text-[11px] font-semibold tracking-[0.2em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#ead9ae]/50 text-[#fbf7f0] bg-white/5 transition-all duration-300 hover:bg-white/15"
                        >
                            <MessageCircle className="size-3.5 text-[#25D366]" />
                            <span>WhatsApp Admissions</span>
                        </a>
                    </div>

                    {/* Studio location reassurance */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[#a89d91] font-['Inter'] text-[11.5px]">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-[#ead9ae]" />
                            <span>Hazratganj Studio & Academy</span>
                        </div>
                        <span className="hidden sm:inline text-[#ead9ae]/40">•</span>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-[#ead9ae]" />
                            <span>Gomti Nagar Studio & Academy</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}