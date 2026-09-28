"use client";

import React from "react";

export default function Experts() {
    return (
        <section className="px-6 py-20 md:py-28">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-luxe border border-border">
                    <img
                        src="/assets/images/about/experts.webp"
                        alt="Poonam & Ishitta Chowdhary, founders of KNK Awadh"
                        className="w-full h-full object-cover"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute -bottom-3 -right-3 h-14 w-14 rounded-full bg-gold-soft shadow-luxe animate-floatSoft"
                    />
                </div>
                <div>
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        Meet Our Experts
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] mb-6 sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        Poonam &
                        <br />
                        <span className="italic text-[#b58a52]">Ishitta.</span>
                    </h2>
                    <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9] mb-6">
                        A dynamic mother-daughter duo and among Lucknow's most trusted makeup
                        artists, Poonam & Ishitta lead our internationally acclaimed academy —
                        training the next generation in creative and fashion makeup.
                    </p>
                    <ul className="space-y-3">
                        {[
                            "Hands-on training for global competitiveness",
                            "Specialised bridal and editorial makeup skills",
                            "Blending traditional Awadhi beauty with modern technique",
                        ].map((item) => (
                            <li key={item} className="flex gap-3 font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9]">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b58a52] shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}