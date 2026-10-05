import React from 'react';
import Link from 'next/link';
import { DEFAULT_HOME_SECTIONS } from '@/data/homeDefaults';

function Services({ data }) {
    const content = { ...DEFAULT_HOME_SECTIONS.services, ...(data || {}) };
    const rawItems = (Array.isArray(content.items) && content.items.length > 0)
        ? content.items
        : (DEFAULT_HOME_SECTIONS.services.items || []);
    const items = Array.isArray(rawItems) ? rawItems : [];

    return (
        <>
            {/* ============ SERVICES ============ */}
            <section className="bg-[#f8f6f1] px-5 py-16 md:px-10 lg:px-[9%] lg:py-24">
                {/* ================= HEADER ================= */}
                <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_300px]">
                    <div>
                        <h2 className="font-['Cormorant_Garamond'] text-[56px] font-medium leading-[0.82] tracking-[-0.04em] text-[#272523] sm:text-[72px] md:text-[88px] lg:text-[96px] xl:text-[100px]">
                            {content.heading || content.heading_line1 || "Everything you need"}
                            <br />
                            <span className="italic text-[#c49a4d]">
                                {content.headingHighlight || content.heading_highlight || "extraordinary."}
                            </span>
                        </h2>
                    </div>

                    <div className="pb-1 lg:pb-2">
                        <p className="max-w-[290px] font-['Inter'] text-[13px] font-normal leading-[1.75] text-[#5e5a55]">
                            {content.description || content.subheading || ""}
                        </p>
                    </div>
                </div>
                {/* ================= SERVICES ROW ================= */}
                <div className="flex flex-col gap-3 md:flex-row">
                    {items.map((item, index) => {
                        const href = item.href || (typeof item.link === 'string' ? item.link : "/services");
                        return (
                            <Link
                                key={index}
                                href={href}
                                className="group relative h-[530px] overflow-hidden md:flex-1"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    width={400}
                                    height={530}
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                                <div className="absolute bottom-5 left-5 right-5 text-white">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="font-['Cormorant_Garamond'] text-[32px] leading-none">
                                                {item.title}
                                            </h3>
                                            <div className="mt-2 flex items-center gap-3">
                                                <span className="font-['Inter'] text-[10px]">
                                                    {item.subtitle}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="mb-1 text-[25px] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                            ↗
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
export default Services;