"use client";

import React from "react";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function Services({ data = {} }) {
    const d = { ...DEFAULT_ABOUT_SECTIONS.services, ...data };
    const items = d.items || DEFAULT_ABOUT_SECTIONS.services.items;

    return (
        <section id="services" className="px-6 py-20 md:py-24">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-3xl mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        {d.eyebrow}
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[46px] sm:text-[58px] md:text-[70px] lg:text-[80px] font-medium leading-[0.95] tracking-[-0.04em] text-[#29231f]">
                        {d.heading}
                        <br />
                        <span className="italic text-[#b58a52]">{d.headingHighlight}</span>
                    </h2>
                    <p className="mt-5 max-w-2xl font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9]">
                        {d.description}
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((service, idx) => (
                        <div key={idx} className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft group flex flex-col justify-between">
                            <div>
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={service.img}
                                        alt={service.cleanTitle || service.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#29231f] mb-2">{service.title}</h3>
                                    <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.8]">{service.text}</p>
                                </div>
                            </div>
                            <div className="px-6 pb-6 pt-0">
                                <a
                                    href={service.href}
                                    className="inline-flex items-center gap-1.5 font-['Inter'] text-[11px] font-semibold tracking-[0.15em] uppercase text-[#a17b5a] hover:text-[#b58a52] transition-colors"
                                >
                                    {service.cta}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}