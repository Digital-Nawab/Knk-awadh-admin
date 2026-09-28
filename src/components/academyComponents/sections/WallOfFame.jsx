"use client";

import React, { useState } from "react";
import { INK, GOLD, LINE, wallOfFameImages } from "../shared/constants";
import { Eyebrow } from "../shared/SharedUI";
import Lightbox from "../shared/Lightbox";

export default function WallOfFame() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="px-6 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-[560px] mb-12">
                    <Eyebrow>Our Students</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                        Wall of <span className="italic" style={{ color: GOLD }}>fame.</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wallOfFameImages.map((src, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            className="aspect-[4/5] cursor-zoom-in overflow-hidden rounded-2xl border bg-white p-2 outline-none transition-transform duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-offset-2"
                            style={{ borderColor: LINE }}
                        >
                            <img
                                src={src}
                                alt={`Wall of fame ${i + 1}`}
                                className="h-full w-full object-contain"
                            />
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