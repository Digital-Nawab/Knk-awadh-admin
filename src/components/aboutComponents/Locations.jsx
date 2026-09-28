"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";
import { locations } from "./AboutData";

export default function Locations() {
    return (
        <section className="px-6 py-14 md:py-20">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-2xl mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        Find Us
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        Three salons,
                        <br />
                        <span className="italic text-[#b58a52]">one standard.</span>
                    </h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                    {locations.map((loc) => (
                        <div key={loc.name} className="bg-card border border-border rounded-2xl p-7 shadow-soft">
                            <h3 className="font-['Cormorant_Garamond'] text-xl font-medium text-[#29231f] mb-3">{loc.name}</h3>
                            <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9] mb-4">{loc.address}</p>
                            <a href={`tel:${loc.phone}`} className="font-['Inter'] text-[13px] text-[#a17b5a] tracking-wide">
                                {loc.phone}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}