"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";
import { galleryImages } from "./AboutData";

export default function Gallery() {
    return (
        <section id="gallery" className="px-6 py-20 md:py-24">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-2xl mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        Gallery
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        Looks we've
                        <br />
                        <span className="italic text-[#b58a52]">created.</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((img) => (
                        <div key={img.alt} className="aspect-[4/5] rounded-2xl overflow-hidden shadow-soft border border-border group">
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}