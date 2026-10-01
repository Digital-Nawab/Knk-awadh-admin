"use client";

import React, { useState } from "react";
import { wallOfFameImages } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import Lightbox from "../shared/Lightbox";
import { Maximize2 } from "lucide-react";

export default function WallOfFame() {
    const [activeIndex, setActiveIndex] = useState(null);
    const displayImages = wallOfFameImages.slice(0, 5);

    return (
        <section className="px-5 sm:px-8 py-20 md:py-28 bg-[#fbf7f0] relative">
            <div className="max-w-4xl mx-auto text-center mb-14">
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

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                    {/* Featured Large Anchor Card (Left 5 Cols) */}
                    <div className="md:col-span-5 relative group">
                        <button
                            type="button"
                            onClick={() => setActiveIndex(0)}
                            aria-label="Enlarge student creation 1"
                            className="w-full aspect-[4/5] sm:aspect-auto min-h-[280px] sm:min-h-[420px] md:min-h-[540px] text-left cursor-zoom-in rounded-3xl overflow-hidden border border-[#d0bda4] shadow-xs relative bg-white block transition-all duration-500 hover:shadow-xl hover:border-[#b58a52]"
                        >
                            <img
                                src={displayImages[0]}
                                alt="Student creation 1"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                                <div className="size-11 rounded-full bg-white/90 shadow-md text-[#29231f] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize2 className="size-5" />
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Right 7 Cols: 4-Card Collage (2x2 Grid) */}
                    <div className="md:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
                        {displayImages.slice(1, 5).map((src, i) => {
                            const actualIdx = i + 1;
                            return (
                                <button
                                    key={actualIdx}
                                    type="button"
                                    onClick={() => setActiveIndex(actualIdx)}
                                    aria-label={`Enlarge student creation ${actualIdx + 1}`}
                                    className="group relative cursor-zoom-in rounded-2xl overflow-hidden border border-[#d0bda4] shadow-xs bg-white text-left aspect-[4/5] transition-all duration-300 hover:shadow-xl hover:border-[#b58a52] block"
                                >
                                    <img
                                        src={src}
                                        alt={`Student creation ${actualIdx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                                        <div className="size-9 rounded-full bg-white/90 shadow-md text-[#29231f] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Maximize2 className="size-4" />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Lightbox
                images={displayImages}
                index={activeIndex}
                onClose={() => setActiveIndex(null)}
                onPrev={() =>
                    setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
                }
                onNext={() => setActiveIndex((prev) => (prev + 1) % displayImages.length)}
            />
        </section>
    );
}