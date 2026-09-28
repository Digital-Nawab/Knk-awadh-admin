"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";
import { services } from "./AboutData";

export default function Services() {
    return (
        <section id="services" className="px-6 py-20 md:py-24">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-2xl mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        Our Services
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        Makeup, hair &
                        <br />
                        <span className="italic text-[#b58a52]">skin, one roof.</span>
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div key={service.title} className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft group">
                            <div className="aspect-[4/5] overflow-hidden">
                                <img
                                    src={service.img}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-['Cormorant_Garamond'] text-xl font-medium text-[#29231f] mb-2">{service.title}</h3>
                                <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9]">{service.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
 