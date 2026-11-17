"use client";

import React, { useEffect, useState } from "react";
import { Eyebrow, GoldDivider } from "./ServiceUI";
import { steps as defaultSteps } from "./servicesData";

export default function ProcessSteps({ categorySlug = "nails", category = "" }) {
    const [processData, setProcessData] = useState({
        eyebrow: "How It Works",
        title: "Simple, from",
        titleHighlight: "start to finish.",
        steps: defaultSteps,
    });

    useEffect(() => {
        const slug = (categorySlug || category || "nails").toLowerCase().trim();
        fetch(`/api/services/process?category=${encodeURIComponent(slug)}`)
            .then((r) => r.json())
            .then((d) => {
                if (d?.process) {
                    setProcessData({
                        eyebrow: d.process.eyebrow || "How It Works",
                        title: d.process.title || "Simple, from",
                        titleHighlight: d.process.titleHighlight || "start to finish.",
                        steps: Array.isArray(d.process.steps) && d.process.steps.length > 0
                            ? d.process.steps
                            : defaultSteps,
                    });
                }
            })
            .catch(() => {});
    }, [categorySlug, category]);

    return (
        <section className="px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-[600px] mb-20">
                    <Eyebrow>{processData.eyebrow}</Eyebrow>
                    <h2 className="mt-6 font-display text-[48px] font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-[60px] md:text-[68px]">
                        {processData.title}{" "}
                        <span className="italic text-gold">{processData.titleHighlight}</span>
                    </h2>
                    <GoldDivider />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
                    {processData.steps.map((step, i) => (
                        <div
                            key={step.n || i}
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