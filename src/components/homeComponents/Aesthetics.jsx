import React from 'react';
import { DEFAULT_HOME_SECTIONS } from '@/data/homeDefaults';

function Aesthetics({ data }) {
    const content = { ...DEFAULT_HOME_SECTIONS.aesthetics, ...(data || {}) };
    const rawServices = (Array.isArray(content.services) && content.services.length > 0)
        ? content.services
        : ((Array.isArray(content.tags) && content.tags.length > 0) ? content.tags : (DEFAULT_HOME_SECTIONS.aesthetics.services || []));
    const serviceList = Array.isArray(rawServices) ? rawServices : [];

    return (
        <>
            <section
                id="aesthetics"
                className="relative overflow-hidden bg-[#eee5da] py-20 sm:py-24 lg:py-28"
            >
                {/* Soft Decorative Circle */}
                <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#c9a875]/10 blur-3xl" />
                <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-6 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-14 xl:px-20">
                    {/* =====================================================
                        LEFT — CONTENT
                    ====================================================== */}
                    <div className="relative z-10 max-w-[620px]">
                        {/* Decorative Background Word */}
                        <span className="pointer-events-none absolute -left-12 top-1/2 hidden -translate-y-1/2 select-none font-['Cormorant_Garamond'] text-[170px] leading-none text-[#dfd0be]/70 xl:block">
                            {content.bgWord || content.bg_watermark || "GLOW"}
                        </span>
                        <div className="relative">
                            {/* Section Number */}
                            <div className="mb-9 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#a98565]" />
                                <span className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#92745a]">
                                    {content.sectionNumber || content.section_number || "09 / Aesthetics"}
                                </span>
                            </div>
                            {/* Heading */}
                            <h2 className="font-['Cormorant_Garamond'] text-[52px] font-medium leading-[0.88] tracking-[-0.045em] text-[#29231f] sm:text-[62px] md:text-[72px] lg:text-[66px] xl:text-[78px]">
                                {content.heading || content.heading_line1 || "KNK SKKIN"}
                                <br />
                                <span className="italic text-[#b58a52]">
                                    {content.headingHighlight || content.heading_highlight || "Skin & Aesthetic Treatments in"}
                                </span>
                                <br />
                                {content.headingSuffix || content.heading_city || "Lucknow"}
                            </h2>

                            <p className="mt-6 max-w-xl text-sm font-medium uppercase tracking-[0.2em] text-[#6f6258] sm:text-base">
                                {content.tagline || content.badge || "Skin, Hair, Injectables & Longevity"}
                            </p>
                            {/* Description */}
                            <p className="mt-8 max-w-[510px] font-['Inter'] text-[13px] leading-[1.85] text-[#71665d] sm:text-[14px]">
                                {content.description}
                            </p>
                            {/* =================================================
                                AESTHETIC SERVICES
                            ================================================== */}
                            <div className="mt-9 flex max-w-[600px] flex-wrap gap-2.5">
                                {serviceList.map((tag, idx) => {
                                    const title = typeof tag === 'string' ? tag : (tag?.name || tag?.title || '');
                                    const href = typeof tag === 'object' && typeof tag?.href === 'string'
                                        ? tag.href
                                        : (typeof tag === 'object' && typeof tag?.link === 'string' ? tag.link : "#facial");
                                    return (
                                        <a
                                            key={idx}
                                            href={href}
                                            className="group border border-[#cdbca6] bg-[#f6f0e7]/40 px-4 py-2.5 font-['Inter'] text-[8px] font-medium uppercase tracking-[0.14em] text-[#5c5047] transition-all duration-300 hover:border-[#a98565] hover:bg-[#a98565] hover:text-white"
                                        >
                                            {title}
                                        </a>
                                    );
                                })}
                            </div>
                            {/* =================================================
                                BENEFITS
                            ================================================== */}
                            <div className="mt-9 grid grid-cols-1 gap-4 border-t border-[#d5c8b9] pt-6 sm:grid-cols-3">
                                <div>
                                    <span className="font-['Cormorant_Garamond'] text-[25px] italic text-[#a47d59]">
                                        {content.benefit1_title || "Personalised"}
                                    </span>
                                    <p className="mt-1 font-['Inter'] text-[8px] uppercase tracking-[0.12em] text-[#84786e]">
                                        {content.benefit1_subtitle || "Skin Approach"}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-['Cormorant_Garamond'] text-[25px] italic text-[#a47d59]">
                                        {content.benefit2_title || "Gentle"}
                                    </span>
                                    <p className="mt-1 font-['Inter'] text-[8px] uppercase tracking-[0.12em] text-[#84786e]">
                                        {content.benefit2_subtitle || "Premium Care"}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-['Cormorant_Garamond'] text-[25px] italic text-[#a47d59]">
                                        {content.benefit3_title || "Natural"}
                                    </span>
                                    <p className="mt-1 font-['Inter'] text-[8px] uppercase tracking-[0.12em] text-[#84786e]">
                                        {content.benefit3_subtitle || "Looking Results"}
                                    </p>
                                </div>
                            </div>
                            {/* =================================================
                                CTA
                            ================================================== */}
                            <div className="mt-11 flex flex-wrap items-center gap-7">
                                <a
                                    href={typeof content.cta_primary_link === 'string' ? content.cta_primary_link : "#book"}
                                    className="group inline-flex items-center gap-4 border-b border-[#a98251] pb-3 font-['Inter'] text-[9px] font-medium uppercase tracking-[0.22em] text-[#59483b]"
                                >
                                    <span>{content.cta_primary_text || "Discover Your Glow"}</span>
                                    <span className="text-[18px] leading-none transition-transform duration-300 group-hover:translate-x-2">
                                        →
                                    </span>
                                </a>
                                <a
                                    href={typeof content.cta_secondary_link === 'string' ? content.cta_secondary_link : "#services"}
                                    className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.2em] text-[#9a8878] transition-colors duration-300 hover:text-[#a47d52]"
                                >
                                    {content.cta_secondary_text || "View Treatments"}
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* =====================================================
                        RIGHT — ARCH / WINDOW IMAGE
                    ====================================================== */}
                    <div className="relative flex justify-center lg:justify-end">
                        {/* Decorative Frame */}
                        <div className="absolute -bottom-5 -right-5 hidden h-[calc(100%-15px)] w-[calc(100%-15px)] max-w-[500px] border border-[#bfa989]/40 lg:block" />
                        {/* Arch */}
                        <div className="group relative z-10 w-full max-w-[500px] overflow-hidden  rounded-b-[3px] border border-[#d4c2aa] bg-[#e3d4c1] p-[5px] shadow-[0_25px_65px_rgba(65,48,34,0.14)]">
                            <div className="relative h-[560px] overflow-hidden  rounded-b-[2px] sm:h-[640px] lg:h-[680px]">
                                {/* Image */}
                                <img
                                    src={content.image || "/assets/images/new/home/services/advanced-aesthetics.webp"}
                                    alt="Luxury aesthetic and skin treatment"
                                    width={500}
                                    height={680}
                                    loading="lazy"
                                    decoding="async"
                                    className="aesthetic-image h-full w-full object-cover object-center"
                                />
                                {/* Very subtle overlay */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#291f1a]/20 via-transparent to-transparent" />
                                {/* Image Label */}
                                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                                    <span className="h-px w-8 bg-white/80" />
                                    <span className="font-['Inter'] text-[8px] font-medium uppercase tracking-[0.3em] text-white">
                                        {content.badgeTitle || "Skin & Wellness"}
                                    </span>
                                </div>
                                {/* Floating Number */}
                                <div className="absolute right-7 top-7">
                                    <span className="font-['Cormorant_Garamond'] text-[20px] italic text-white/90">
                                        09
                                    </span>
                                </div>
                                {/* Floating Arrow */}
                                <div className="absolute bottom-7 right-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-black/10 text-white backdrop-blur-sm transition-all duration-500 group-hover:border-[#c49a4d] group-hover:bg-[#c49a4d]">
                                    <span className="text-[18px]">↗</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n\n    .aesthetic-image {\n      transform: scale(1.02);\n      animation: aestheticImageMotion 14s ease-in-out infinite;\n      will-change: transform;\n      backface-visibility: hidden;\n      -webkit-backface-visibility: hidden;\n    }\n\n    @keyframes aestheticImageMotion {\n\n      0% {\n        transform: scale(1.02) translate3d(0, 0, 0);\n      }\n\n      25% {\n        transform: scale(1.045) translate3d(-0.4%, -0.25%, 0);\n      }\n\n      50% {\n        transform: scale(1.07) translate3d(0.35%, -0.5%, 0);\n      }\n\n      75% {\n        transform: scale(1.045) translate3d(0.25%, 0.15%, 0);\n      }\n\n      100% {\n        transform: scale(1.02) translate3d(0, 0, 0);\n      }\n\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n\n      .aesthetic-image {\n        animation: none;\n        transform: scale(1.02);\n      }\n\n    }\n\n  "
                }}
            />
        </>

    );
}
export default Aesthetics;