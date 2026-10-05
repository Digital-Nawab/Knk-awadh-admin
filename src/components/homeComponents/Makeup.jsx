"use client";

import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_HOME_SECTIONS } from '@/data/homeDefaults';

const defaultServices = DEFAULT_HOME_SECTIONS.grooming.items || [];

// Pixel offsets for each entrance direction — applied via inline style,
// so the transform is guaranteed to render (not dependent on Tailwind's
// JIT scanner picking up dynamically-referenced arbitrary-value classes).
const directionOffsets = {
    'top-left': { x: -35, y: -35 },
    top: { x: 0, y: -35 },
    'top-right': { x: 35, y: -35 },
    'bottom-left': { x: -35, y: 35 },
    bottom: { x: 0, y: 35 },
    'bottom-right': { x: 35, y: 35 },
};

function Makeup({ data }) {
    const content = { ...DEFAULT_HOME_SECTIONS.grooming, ...(data || {}) };
    const rawItems = (Array.isArray(content.items) && content.items.length > 0)
        ? content.items
        : (Array.isArray(content.services) && content.services.length > 0 ? content.services : defaultServices);
    const services = Array.isArray(rawItems) ? rawItems : defaultServices;
    const [visible, setVisible] = useState(() => services.map(() => false));
    const tileRefs = useRef([]);

    useEffect(() => {
        setVisible(services.map(() => false));
    }, [services]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = Number(entry.target.dataset.index);
                    if (entry.isIntersecting) {
                        // Wait two frames so the browser paints the initial
                        // (offset/hidden) state first — otherwise, for tiles
                        // already in view on page load, React + the browser
                        // can skip straight to the final state with no visible animation.
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                setVisible((prev) => {
                                    if (prev[idx]) return prev;
                                    const next = [...prev];
                                    next[idx] = true;
                                    return next;
                                });
                            });
                        });
                    } else {
                        // Leaving the viewport — reset so the animation
                        // replays the next time it scrolls back into view.
                        setVisible((prev) => {
                            if (!prev[idx]) return prev;
                            const next = [...prev];
                            next[idx] = false;
                            return next;
                        });
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
        );

        tileRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [services]);

    return (
        <>
            <section
                id="makeup"
                className="relative overflow-hidden bg-[#f3ede5] pb-20 pt-8 sm:pb-12 sm:pt-6 lg:pb-24 lg:pt-10"
            >
                {/* Background Decorative Text */}
                <div className="pointer-events-none absolute -bottom-10 right-[-30px] select-none font-['Cormorant_Garamond'] text-[180px] leading-none text-[#d8c9b7]/40 sm:text-[240px] lg:text-[320px]">
                    {content.bgWord || content.bg_watermark || "FACE"}
                </div>
                <div className="mx-auto max-w-[1440px] items-center gap-14 px-4 sm:px-6 lg:gap-20 lg:px-10 xl:px-12">

                    <div className="mx-auto max-w-[1280px]">

                        {/* =====================================================
                            REMAINING CONTENT (centered)
                        ====================================================== */}
                        <div className="mx-auto mt-2 max-w-[1280px] text-center">
                            {/* =================================================
                                SERVICES — photo tile gallery
                            ================================================== */}
                            <p className="font-['Cormorant_Garamond'] text-[26px] italic text-[#8e6e50]">
                                {content.title || content.heading || "All things beauty & grooming."}
                            </p>
                            <div className="mx-auto mt-6 grid max-w-[1200px] grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:gap-5">
                                {services.map((service, idx) => {
                                    const offset = directionOffsets[service.direction] || { x: 0, y: 0 };
                                    const isVisible = visible[idx];
                                    return (
                                        <a
                                            key={service.name + idx}
                                            ref={(el) => (tileRefs.current[idx] = el)}
                                            data-index={idx}
                                            href={service.href || service.link || "#services"}
                                            className="service-tile group relative block w-full h-[450px] overflow-hidden"
                                            style={{
                                                opacity: isVisible ? 1 : 0,
                                                transform: isVisible
                                                    ? 'translate(0px, 0px)'
                                                    : `translate(${offset.x}px, ${offset.y}px)`,
                                                transitionProperty: 'transform, opacity',
                                                transitionDuration: '800ms',
                                                transitionTimingFunction: 'ease-out',
                                                transitionDelay: isVisible ? `${idx * 120}ms` : '0ms',
                                                willChange: 'transform, opacity',
                                            }}
                                        >
                                            <img
                                                src={service.file}
                                                alt={service.name}
                                                width={400}
                                                height={450}
                                                loading="lazy"
                                                decoding="async"
                                                className="service-tile-photo h-full w-full object-cover"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211a15]/85 via-[#211a15]/10 to-transparent transition-opacity duration-500 group-hover:from-[#211a15]/90" />
                                            <span className="pointer-events-none absolute bottom-0 left-0 right-0 border-t border-white/0 p-2.5 text-left transition-all duration-500 group-hover:border-white/20">
                                                <span className="block font-['Cormorant_Garamond'] text-[15px] italic leading-tight text-white sm:text-[16px]">
                                                    {service.name}
                                                </span>
                                            </span>
                                        </a>
                                    );
                                })}
                            </div> 
                        </div>
                    </div>

                </div>
            </section>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n\n    /* ---------------------------------------------\n       SERVICE TILES — HOVER ZOOM\n    --------------------------------------------- */\n\n    .service-tile-photo {\n\n      transform: scale(1);\n\n      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);\n\n    }\n\n    .service-tile:hover .service-tile-photo {\n\n      transform: scale(1.08);\n\n    }\n\n\n    /* ---------------------------------------------\n       REDUCE MOTION\n    --------------------------------------------- */\n\n    @media (prefers-reduced-motion: reduce) {\n\n      .service-tile-photo {\n\n        transition: none;\n\n      }\n\n    }\n\n  "
                }}
            />
        </>

    );
}
export default Makeup;