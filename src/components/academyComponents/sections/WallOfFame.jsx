"use client";

import React, { useState } from "react";
import { wallOfFameImages } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import Lightbox from "../shared/Lightbox";
import { Maximize2 } from "lucide-react";

export default function WallOfFame() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="px-5 sm:px-8 py-20 md:py-28 bg-[#fbf7f0] relative">
            <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-14">
                <SectionHeading
                    eyebrow="Student Showcase"
                    line1="The graduate"
                    line2="wall of fame."
                    description="Real portfolio output, bridal transformations, and backstage credentials sculpted by our students during their intensive training at KNK Academy."
                    center
                />
                <div className="flex justify-center">
                    <GoldDivider center />
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Balanced Symmetric 6-Photo Editorial Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {wallOfFameImages.map((src, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Enlarge student creation ${i + 1}`}
                            className="group relative cursor-zoom-in rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d0bda4] shadow-xs bg-white text-left aspect-[4/5] transition-all duration-500 hover:shadow-xl hover:border-[#b58a52] block"
                        >
                            <img
                                src={src}
                                alt={`Student creation ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="size-10 sm:size-11 rounded-full bg-white/90 shadow-md text-[#29231f] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                                    <Maximize2 className="size-4 sm:size-5" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <Lightbox
                images={wallOfFameImages}
                index={activeIndex}
                onClose={() => setActiveIndex(null)}
                onPrev={() =>
                    setActiveIndex((prev) => (prev - 1 + wallOfFameImages.length) % wallOfFameImages.length)
                }
                onNext={() => setActiveIndex((prev) => (prev + 1) % wallOfFameImages.length)}
            />
        </section>
    );
}