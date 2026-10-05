import React from 'react';
import { DEFAULT_HOME_SECTIONS } from '@/data/homeDefaults';

function Location({ data }) {
    const content = { ...DEFAULT_HOME_SECTIONS.locations, ...(data || {}) };
    const rawItems = (Array.isArray(content.items) && content.items.length > 0)
        ? content.items
        : (DEFAULT_HOME_SECTIONS.locations.items || []);
    const items = Array.isArray(rawItems) ? rawItems : [];

    return (
        <>
            <section className="bg-[#f7f3eb] px-6 py-20 sm:px-8 lg:px-16 xl:px-20">
                <div className="mx-auto max-w-[1230px]">
                    {/* ================= HEADER ================= */}
                    <div className="mb-16">
                        {/* Main Heading */}
                        <h2 className="font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.82] tracking-[-0.035em] text-[#29231f] sm:text-[76px] md:text-[86px] lg:text-[92px]">
                            {content.heading || content.heading_line1 || "Visit our"}
                            <br />
                            <span className="italic text-[#a27d5e]">
                                {content.headingHighlight || content.heading_highlight || "Luxury Salons"}
                            </span>
                        </h2>
                    </div>
                    {/* ================= LOCATION LIST ================= */}
                    <div className="border-t border-[#d8d1c7]">
                        {items.map((loc, idx) => (
                            <div
                                key={idx}
                                className="grid min-h-[178px] grid-cols-1 items-center gap-8 border-b border-[#d8d1c7] py-10 md:grid-cols-[1fr_auto] md:py-11"
                            >
                                {/* Location Information */}
                                <div>
                                    <h3 className="mb-3 font-['Cormorant_Garamond'] text-[38px] font-semibold italic leading-none tracking-[-0.02em] text-[#29231f] sm:text-[42px]">
                                        {loc.name}
                                    </h3>
                                    <p className="max-w-[500px] font-['Inter'] text-[13px] leading-[1.65] text-[#98928b]">
                                        {loc.address}
                                    </p>
                                    {loc.phone && (
                                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                                            <a
                                                href={`tel:${String(loc.phone).replace(/[^0-9+]/g, '')}`}
                                                className="font-['Inter'] text-[10px] tracking-[0.04em] text-[#a47a59] transition hover:text-[#29231f]"
                                            >
                                                {loc.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>
                                {/* CTA */}
                                <div className="md:pr-0">
                                    <a
                                        href={typeof loc.directionsUrl === 'string' ? loc.directionsUrl : (typeof loc.directions_url === 'string' ? loc.directions_url : "#")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 border-b border-[#5c5149] pb-2 font-['Inter'] text-[9px] font-medium uppercase tracking-[0.23em] text-[#493e37] transition hover:text-[#a47a59]"
                                    >
                                        Get Directions
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
export default Location;