"use client";

import React from "react";
import { locations } from "./AboutData";

export default function Locations() {
    return (
        <section className="px-6 py-14 md:py-20">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-3xl mb-14">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        Find KNK Salon in Lucknow
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[52px] sm:text-[64px] md:text-[76px] lg:text-[88px] font-medium leading-[0.88] tracking-[-0.04em] text-[#29231f]">
                        Three Locations,
                        <br />
                        <span className="italic text-[#b58a52]">One KNK Standard</span>
                    </h2>
                    <p className="mt-4 font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.8]">
                        Visit KNK Awadh Salon &amp; Academy at any of our three Lucknow locations.
                    </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                    {locations.map((loc) => (
                        <div key={loc.name} className="bg-card border border-border rounded-2xl p-7 shadow-soft flex flex-col justify-between">
                            <div>
                                <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#29231f] mb-3">{loc.name}</h3>
                                <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.9] mb-4">{loc.address}</p>
                                <a
                                    href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                                    className="font-['Inter'] text-[13px] font-medium text-[#a17b5a] tracking-wide block mb-6 hover:text-[#b58a52] transition-colors"
                                >
                                    {loc.phone}
                                </a>
                            </div>
                            <div className="pt-4 border-t border-border/60 flex items-center gap-3">
                                <a
                                    href={loc.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-['Inter'] text-[11px] font-semibold tracking-[0.1em] uppercase text-[#a17b5a] hover:text-[#b58a52] transition-colors"
                                >
                                    Get Directions →
                                </a>
                                <span className="text-[#d0bda4]">|</span>
                                <a
                                    href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                                    className="font-['Inter'] text-[11px] font-semibold tracking-[0.1em] uppercase text-[#a17b5a] hover:text-[#b58a52] transition-colors"
                                >
                                    Call Now →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}