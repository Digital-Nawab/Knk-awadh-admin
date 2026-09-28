"use client";

import React from "react";
import { INK, GOLD } from "../shared/constants";
import { Eyebrow } from "../shared/SharedUI";
import FaqAccordion from "../shared/FaqAccordion";

export default function FaqSection() {
    return (
        <section className="px-6 py-20 md:py-24">
            <div className="max-w-3xl mx-auto text-center mb-14">
                <Eyebrow>Questions</Eyebrow>
                <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                    Frequently <span className="italic" style={{ color: GOLD }}>asked.</span>
                </h2>
            </div>
            <FaqAccordion />
        </section>
    );
}