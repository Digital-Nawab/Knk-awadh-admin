"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function Gallery({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.gallery, ...data };
    const images = (d.images || DEFAULT_ABOUT_SECTIONS.gallery.images).slice(0, 6);

    return (
        <section id="gallery" className="px-6 py-20 md:py-24">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-3xl mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        {d.eyebrow}
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[46px] sm:text-[58px] md:text-[70px] lg:text-[80px] font-medium leading-[0.95] tracking-[-0.04em] text-[#29231f]">
                        {d.heading}
                        <br />
                        <span className="italic text-[#b58a52]">{d.headingHighlight}</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {images.map((img, idx) => (
                        <div key={idx} className="aspect-[4/5] rounded-2xl overflow-hidden shadow-soft border border-border group">
                            <img
                                src={img.src}
                                alt={img.alt || "Lookbook photo"}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <a
                        href={d.ctaLink || "/gallery"}
                        className="inline-flex items-center justify-center bg-gradient-gold text-cream font-sans text-sm tracking-[0.15em] uppercase px-8 py-3.5 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105"
                    >
                        {d.ctaText || "View Makeup Gallery →"}
                    </a>
                </div>
            </div>
        </section>
    );
}