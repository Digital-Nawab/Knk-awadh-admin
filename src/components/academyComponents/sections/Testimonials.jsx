"use client";

import React from "react";
import { testimonials } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="px-5 sm:px-8 py-20 md:py-28 bg-[#fbf7f0] relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center mb-14">
                <SectionHeading
                    eyebrow="Alumni Reflections"
                    line1="Voices of our"
                    line2="certified graduates."
                    description="Hear from our former students who transitioned from passionate beginners into independent bridal makeup artists, luxury salon directors, and freelance beauty entrepreneurs."
                    center
                />
                <div className="flex justify-center">
                    <GoldDivider center />
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((t, i) => (
                    <div
                        key={i}
                        className="relative rounded-3xl bg-[#fffdf9] border border-[#e8dfc8] p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#b58a52] group"
                    >
                        <div>
                            {/* Stars & Quote Icon */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-1 text-[#b58a52]">
                                    {[...Array(5)].map((_, sIdx) => (
                                        <Star key={sIdx} className="size-3.5 fill-[#b58a52]" />
                                    ))}
                                </div>
                                <Quote className="size-6 text-[#d0bda4] opacity-50" />
                            </div>

                            {/* Quote Text */}
                            <p className="font-['Cormorant_Garamond'] italic text-lg sm:text-[19px] leading-relaxed text-[#29231f] mb-6">
                                "{t.text}"
                            </p>
                        </div>

                        {/* Author info & Course badge */}
                        <div className="pt-4 border-t border-[#f4eee1] flex items-center gap-3.5">
                            <div className="size-10 rounded-full bg-[#f4eee1] border border-[#d0bda4] flex items-center justify-center font-['Cormorant_Garamond'] text-lg italic text-[#a17b5a] shrink-0 font-medium">
                                G{i + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                    <h4 className="font-['Cormorant_Garamond'] text-lg font-semibold text-[#29231f] leading-none">
                                        {t.name}
                                    </h4>
                                    <CheckCircle2 className="size-3 text-[#2e7d32]" />
                                </div>
                                <p className="font-['Inter'] text-[10.5px] uppercase tracking-wider text-[#a17b5a] truncate mt-0.5">
                                    {t.course}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}