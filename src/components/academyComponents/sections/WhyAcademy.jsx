"use client";

import React from "react";
import { MUTED, GOLD, LINE, CREAM_DEEP, whyAcademyImage, whyAcademyPoints } from "../shared/constants";
import { SectionHeading } from "../shared/SharedUI";

export default function WhyAcademy() {
    return (
        <section className="px-6 py-20 md:py-24">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                <div>
                    <SectionHeading eyebrow="Why Choose Us" line1="Why KNK" line2="Academy." />
                    <ul className="mt-7 space-y-3">
                        {whyAcademyPoints.map((point) => (
                            <li key={point} className="flex items-start gap-3 font-['Inter'] text-[13px] leading-[1.9]" style={{ color: MUTED }}>
                                <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border" style={{ borderColor: LINE }}>
                    <img src={whyAcademyImage} alt="KNK Academy classroom" className="w-full h-full object-cover" />
                </div>
            </div>
        </section>
    );
}