"use client";

import React from "react";
import { INK, MUTED, GOLD, LINE, curriculum } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";

export default function Curriculum() {
    return (
        <section className="px-6 py-20 md:py-24">
            <div className="max-w-3xl mx-auto mb-14">
                <SectionHeading eyebrow="What You'll Learn" line1="Our" line2="curriculum." center />
                <div className="flex justify-center"><GoldDivider center /></div>
            </div>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                {curriculum.map((block) => (
                    <div
                        key={block.title}
                        className="bg-[#fffdf9] border rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(181,138,82,0.4)]"
                        style={{ borderColor: LINE }}
                    >
                        <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium mb-4" style={{ color: INK }}>
                            {block.title}
                        </h3>
                        <ul className="space-y-2">
                            {block.items.map((item) => (
                                <li key={item} className="flex items-start gap-2 font-['Inter'] text-[12px] leading-relaxed" style={{ color: MUTED }}>
                                    <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}