"use client";

import React from "react";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import FaqAccordion from "../shared/FaqAccordion";

export default function FaqSection() {
    return (
        <section className="px-5 sm:px-8 py-20 md:py-28 bg-[#fbf7f0] relative">
            <div className="max-w-4xl mx-auto text-center mb-14">
                <SectionHeading
                    eyebrow="Clarifications"
                    line1="Frequently asked"
                    line2="questions."
                    description="Everything you need to know about our admission criteria, kit allocations, IAF certification, and post-graduation placement support."
                    center
                />
                <div className="flex justify-center">
                    <GoldDivider center />
                </div>
            </div>
            <FaqAccordion />
        </section>
    );
}