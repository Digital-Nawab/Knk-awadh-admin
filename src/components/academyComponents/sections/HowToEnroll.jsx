"use client";

import React from "react";
import { INK, MUTED, LINE, enrollSteps } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";

export default function HowToEnroll() {
    return (
        <section className="px-6 py-20 md:py-24">
            <div className="max-w-3xl mx-auto mb-14">
                <SectionHeading eyebrow="Getting Started" line1="How to" line2="enroll." center />
                <div className="flex justify-center"><GoldDivider center /></div>
            </div>
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {enrollSteps.map((step, i) => (
                    <div key={step.title} className="relative bg-[#fffdf9] border rounded-2xl p-7" style={{ borderColor: LINE }}>
                        <span className="font-['Cormorant_Garamond'] text-5xl italic" style={{ color: "#e8dcc8" }}>
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-3 font-['Cormorant_Garamond'] text-xl font-medium" style={{ color: INK }}>
                            {step.title}
                        </h3>
                        <p className="mt-3 font-['Inter'] text-[12px] leading-relaxed" style={{ color: MUTED }}>
                            {step.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}