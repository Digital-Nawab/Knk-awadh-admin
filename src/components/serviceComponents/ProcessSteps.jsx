"use client";

import React from "react";
import { Eyebrow, GoldDivider } from "./ServiceUI";
import { steps } from "./servicesData";

export default function ProcessSteps() {
    return (
        <section className="px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-[600px] mb-20">
                    <Eyebrow>How It Works</Eyebrow>
                    <h2 className="mt-6 font-display text-[48px] font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-[60px] md:text-[68px]">
                        Simple, from <span className="italic text-gold">start to finish.</span>
                    </h2>
                    <GoldDivider />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
                    {steps.map((step, i) => (
                        <div
                            key={step.n}
                            className={`group relative pl-6 ${
                                i === 0 ? "lg:pl-0 lg:border-l-0" : ""
                            } lg:border-l lg:border-border/70`}
                        >
                            <p className="font-display text-3xl italic text-gold">
                                {step.n}
                            </p>
                            <span className="h-px w-8 bg-gold block mt-4 mb-4 transition-all duration-500 group-hover:w-14" />
                            <h3 className="font-display text-2xl font-medium text-ink transition-colors duration-300 group-hover:text-gold-deep">
                                {step.title}
                            </h3>
                            <p className="mt-3 max-w-[26ch] font-sans text-[13px] leading-relaxed text-muted">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}