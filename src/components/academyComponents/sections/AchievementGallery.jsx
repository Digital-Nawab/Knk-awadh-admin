"use client";

import React, { useState } from "react";
import { galleryImages } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import Lightbox from "../shared/Lightbox";
import { Award, Maximize2 } from "lucide-react";

export default function AchievementGallery() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="px-5 sm:px-8 py-20 md:py-28 bg-[#f4eee1] relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center mb-14">
                <SectionHeading
                    eyebrow="Accredited Honors"
                    line1="International certifications &"
                    line2="academic honors."
                    description="Official IAF accreditation documents, global beauty board affiliations, and student convocation seals establishing KNK Academy as Lucknow’s most credentialed beauty institute."
                    center
                />
                <div className="flex justify-center">
                    <GoldDivider center />
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Museum-Grade Mount Display Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {galleryImages.map((src, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Enlarge Certificate ${i + 1}`}
                            className="group relative w-full rounded-3xl bg-[#fffdf9] border border-[#d0bda4] p-4 sm:p-5 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[#b58a52] cursor-zoom-in block text-left"
                        >
                            {/* Inner Framed Mount */}
                            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[#e8dfc8] bg-[#fbf7f0] p-3">
                                {/* Passe-partout mount */}
                                <div className="w-full h-full rounded-xl overflow-hidden bg-white border border-[#e6dece] flex items-center justify-center p-2 relative shadow-inner">
                                    <img
                                        src={src}
                                        alt={`Certificate ${i + 1}`}
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <div className="size-9 rounded-full bg-white/90 shadow-md text-[#29231f] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Maximize2 className="size-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Gold stamp tag on top right */}
                                <div className="absolute top-4 right-4 size-6 rounded-full bg-[#b58a52]/15 border border-[#b58a52]/40 flex items-center justify-center text-[#b58a52]">
                                    <Award className="size-3" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <Lightbox
                images={galleryImages}
                index={activeIndex}
                onClose={() => setActiveIndex(null)}
                onPrev={() =>
                    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                }
                onNext={() => setActiveIndex((prev) => (prev + 1) % galleryImages.length)}
            />
        </section>
    );
}