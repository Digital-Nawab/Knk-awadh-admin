"use client";

import React from "react";
import { Eyebrow } from "./Makeupui";
import { INK, GOLD, LINE, looksGallery } from "./Makeupdata";

export default function LooksGallery() {
    return (
        <section id="looks" className="px-6 py-16 md:py-20" style={{ backgroundColor: "#f4eee1" }}>
            <div className="max-w-6xl mx-auto">
                <div className="max-w-[560px] mb-12">
                    <Eyebrow>Portfolio</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                        Makeup <span className="italic" style={{ color: GOLD }}>looks.</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {looksGallery.map((item, i) => (
                        <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border" style={{ borderColor: LINE }}>
                            <img
                                src={item.src}
                                alt={`Makeup look ${i + 1}`}
                                className="w-full h-full object-cover"
                                style={{ objectPosition: item.position }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}