"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Placeholder slider images — repeat celebrity.webp until real images are provided.
const celebritySlides = [
    '/assets/images/new/home/celebrity/celebrity-artist-06.webp',
    '/assets/images/new/home/celebrity/celebrity-artist-09.webp',
    '/assets/images/new/home/celebrity/celebrity-artist-07.webp',
    '/assets/images/new/home/celebrity/celebrity-artist-08.webp',
    '/assets/images/new/home/celebrity/celebrity-artist-05.webp',
    '/assets/images/new/home/celebrity/celebrity-artist-01.webp',
    '/assets/images/new/home/celebrity/celebrity-artist-03.webp',
    '/assets/images/new/home/celebrity/celebrity-artist-04.webp',
    '/assets/images/new/home/celebrity/celebrity-artist-02.webp',
];

function CelebrityMakeup() {
    return (
        <>
            <section
                id="celebrity-makeup"
                className="relative overflow-hidden bg-[#3b2419] py-20 sm:py-24 lg:py-32"
            >
                {/* Background decorative typography */}
                <div className="pointer-events-none absolute -right-10 top-8 select-none font-['Cormorant_Garamond'] text-[150px] font-medium leading-none text-white/[0.025] sm:text-[220px] lg:text-[300px]">
                    GLAM
                </div>
                <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#c49a4d]/10 blur-[100px]" />
                <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
                    {/* =====================================================
     TOP EDITORIAL LABEL
====================================================== */}
                    <div className="mb-12 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="h-px w-10 bg-[#c49a4d]" />
                            <span className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.4em] text-[#d3b37b]">
                                KNK Celebrity Makeup
                            </span>
                        </div>
                        <span className="hidden font-['Cormorant_Garamond'] text-[18px] italic text-white/30 sm:block">
                            Beauty / 04
                        </span>
                    </div>
                    {/* =====================================================
     MAIN EDITORIAL GRID
====================================================== */}
                    <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 xl:grid-cols-[0.75fr_1.25fr]">
                        {/* =================================================
       LEFT — TYPOGRAPHY
  ================================================== */}
                        <div className="relative z-20 order-2 lg:order-1">
                            {/* Small eyebrow */}
                            <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#d3b37b]">
                                The KNK Celebrity 
                            </p>
                            {/* HUGE HEADING */}
                            <h2 className="mt-6 font-['Cormorant_Garamond'] text-[68px] font-medium leading-[0.76] tracking-[-0.055em] text-[#faf7f0] sm:text-[82px] md:text-[100px] lg:-mr-28 lg:text-[105px] xl:text-[125px]">
                                The KNK
                                <br />
                                Celebrity
                                <br />
                                <span className="ml-8 italic text-[#c49a4d] sm:ml-12">
                                    Edit.
                                </span>
                            </h2>
                            {/* Description */}
                            <p className="mt-9 max-w-[440px] font-['Inter'] text-[12px] leading-[1.9] text-[#c0b5aa] sm:text-[13px]">
                                Step into a look designed for the spotlight. Our
                                celebrity-inspired makeup experience blends flawless skin,
                                sculpted features and refined detailing to create a sophisticated,
                                camera-ready finish.
                            </p>
                            {/* =================================================
         SIGNATURE DETAILS
    ================================================== */}
                            <div className="mt-9 grid max-w-[450px] grid-cols-3 border-y border-white/10 py-5">
                                <div className="border-r border-white/10 pr-3">
                                    <p className="font-['Cormorant_Garamond'] text-[23px] italic text-[#c49a4d]">
                                        HD
                                    </p>
                                    <p className="mt-1 font-['Inter'] text-[7px] uppercase tracking-[0.2em] text-[#8e847b]">
                                        Finish
                                    </p>
                                </div>
                                <div className="border-r border-white/10 px-4">
                                    <p className="font-['Cormorant_Garamond'] text-[23px] italic text-[#c49a4d]">
                                        Pro
                                    </p>
                                    <p className="mt-1 font-['Inter'] text-[7px] uppercase tracking-[0.2em] text-[#8e847b]">
                                        Artists
                                    </p>
                                </div>
                                <div className="pl-4">
                                    <p className="font-['Cormorant_Garamond'] text-[23px] italic text-[#c49a4d]">
                                        Glow
                                    </p>
                                    <p className="mt-1 font-['Inter'] text-[7px] uppercase tracking-[0.2em] text-[#8e847b]">
                                        Skin
                                    </p>
                                </div>
                            </div>
                            {/* =================================================
         CTA
    ================================================== */}
                            <div className="mt-9 flex flex-wrap items-center gap-7">
                                <a
                                    href="#book"
                                    className="group inline-flex items-center gap-4 rounded-full bg-[#c49a4d] px-7 py-3.5 font-['Inter'] text-[8px] font-semibold uppercase tracking-[0.22em] text-[#29231f] transition-all duration-500 hover:-translate-y-1 hover:bg-[#d6b875] hover:shadow-[0_15px_35px_rgba(196,154,77,0.25)]"
                                >
                                    <span>Book Celebrity Glam</span>
                                    <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                                        ↗
                                    </span>
                                </a>
                                <a
                                    href="#services"
                                    className="font-['Inter'] text-[8px] uppercase tracking-[0.2em] text-[#a69a90] transition-colors hover:text-white"
                                >
                                    Explore Looks
                                </a>
                            </div>
                        </div>
                        {/* =================================================
       RIGHT — EDITORIAL IMAGE COMPOSITION
  ================================================== */}
                        <div className="relative order-1 min-h-[550px] sm:min-h-[650px] lg:order-2 lg:min-h-[700px]">
                            {/* Main image frame — now a Swiper slider */}
                            <div className="celebrity-image-frame celebrity-swiper-wrap absolute right-0 top-0 h-[500px] w-[82%] overflow-hidden sm:h-[590px] lg:h-[650px] xl:h-[690px]">
                                <Swiper
                                    modules={[Autoplay, Pagination]}
                                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                                    pagination={{ clickable: true, el: '.celebrity-swiper-pagination' }}
                                    loop={true}
                                    speed={1000}
                                    className="h-full w-full"
                                >
                                    {celebritySlides.map((src, i) => (
                                        <SwiperSlide key={i}>
                                            <img
                                                src={src}
                                                alt="Celebrity inspired makeup at KNK Salon"
                                                width={600}
                                                height={690}
                                                loading="lazy"
                                                decoding="async"
                                                className="celebrity-editorial-image h-full w-full object-cover object-center"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                {/* Image shadow */}
                                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-black/5" />
                                {/* Image border */}
                                <div className="pointer-events-none absolute inset-4 z-10 border border-white/20" />
                                {/* Bottom label */}
                                <div className="pointer-events-none absolute bottom-8 left-8 z-20">
                                    <p className="font-['Inter'] text-[7px] uppercase tracking-[0.35em] text-white/60">
                                        KNK Beauty Studio
                                    </p>
                                    <p className="mt-2 font-['Cormorant_Garamond'] text-[26px] italic text-white">
                                        Own the spotlight.
                                    </p>
                                </div>
                                {/* Swiper pagination dots */}
                                <div className="celebrity-swiper-pagination absolute bottom-8 right-8 z-20 flex items-center gap-2" />
                            </div>
                            {/* Vertical editorial text */}
                            <div className="absolute bottom-24 right-[-30px] hidden rotate-90 lg:block">
                                <span className="font-['Inter'] text-[7px] uppercase tracking-[0.45em] text-white/30">
                                    Celebrity Makeup · KNK · Lucknow
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* =====================================================
     BOTTOM MARQUEE
====================================================== */}
                    <div className="mt-14 overflow-hidden border-y border-white/10 py-4">
                        <div className="celebrity-marquee flex w-max items-center gap-10 whitespace-nowrap">
                            <span className="font-['Cormorant_Garamond'] text-[19px] italic text-white/50">
                                Red Carpet
                            </span>
                            <span className="text-[#c49a4d]">✦</span>
                            <span className="font-['Cormorant_Garamond'] text-[19px] italic text-white/50">
                                Editorial Glam
                            </span>
                            <span className="text-[#c49a4d]">✦</span>
                            <span className="font-['Cormorant_Garamond'] text-[19px] italic text-white/50">
                                Camera Ready
                            </span>
                            <span className="text-[#c49a4d]">✦</span>
                            <span className="font-['Cormorant_Garamond'] text-[19px] italic text-white/50">
                                Signature Beauty
                            </span>
                            <span className="text-[#c49a4d]">✦</span>
                            <span className="font-['Cormorant_Garamond'] text-[19px] italic text-white/50">
                                Red Carpet
                            </span>
                            <span className="text-[#c49a4d]">✦</span>
                            <span className="font-['Cormorant_Garamond'] text-[19px] italic text-white/50">
                                Editorial Glam
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n\n    /* -----------------------------------------\n       CINEMATIC IMAGE MOVEMENT\n    ----------------------------------------- */\n\n    .celebrity-editorial-image {\n\n      transform: scale(1.04);\n\n      animation:\n              celebrityImageZoom 14s ease-in-out infinite alternate;\n\n      will-change: transform;\n\n      backface-visibility: hidden;\n\n      -webkit-backface-visibility: hidden;\n    }\n\n\n    @keyframes celebrityImageZoom {\n\n      0% {\n        transform:\n                scale(1.04)\n                translate3d(0, 0, 0);\n      }\n\n      50% {\n        transform:\n                scale(1.09)\n                translate3d(-0.6%, -0.5%, 0);\n      }\n\n      100% {\n        transform:\n                scale(1.04)\n                translate3d(0.5%, 0.3%, 0);\n      }\n\n    }\n\n\n    /* -----------------------------------------\n       MARQUEE\n    ----------------------------------------- */\n\n    .celebrity-marquee {\n\n      animation:\n              celebrityMarquee 28s linear infinite;\n\n    }\n\n\n    @keyframes celebrityMarquee {\n\n      from {\n        transform: translateX(0);\n      }\n\n      to {\n        transform: translateX(-35%);\n      }\n\n    }\n\n\n    /* -----------------------------------------\n       IMAGE HOVER\n    ----------------------------------------- */\n\n    .celebrity-image-frame {\n\n      transition:\n              transform 700ms cubic-bezier(.2,.8,.2,1);\n\n    }\n\n\n    .celebrity-image-frame:hover {\n\n      transform:\n              translateY(-8px);\n\n    }\n\n\n    /* -----------------------------------------\n       ACCESSIBILITY\n    ----------------------------------------- */\n\n    @media (prefers-reduced-motion: reduce) {\n\n      .celebrity-editorial-image,\n      .celebrity-marquee {\n\n        animation: none;\n\n      }\n\n    }\n\n\n    /* -----------------------------------------\n       MOBILE\n    ----------------------------------------- */\n\n    @media (max-width: 639px) {\n\n      .celebrity-image-frame {\n\n        width: 92%;\n        height: 520px;\n\n      }\n\n    }\n\n\n    /* -----------------------------------------\n       SWIPER PAGINATION (gold dots)\n    ----------------------------------------- */\n\n    .celebrity-swiper-wrap .swiper {\n\n      width: 100%;\n      height: 100%;\n\n    }\n\n    .celebrity-swiper-pagination .swiper-pagination-bullet {\n\n      width: 6px;\n      height: 6px;\n      border-radius: 9999px;\n      background: rgba(255, 255, 255, 0.4);\n      opacity: 1;\n      margin: 0 !important;\n      transition: width 500ms, background 500ms;\n      cursor: pointer;\n    }\n\n    .celebrity-swiper-pagination .swiper-pagination-bullet-active {\n\n      width: 24px;\n      background: #c49a4d;\n\n    }\n\n  "
                }}
            />
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n\n    .celebrity-makeup-image {\n      transform: scale(1.02);\n      animation: celebrityMakeupMotion 12s ease-in-out infinite;\n      will-change: transform;\n      backface-visibility: hidden;\n      -webkit-backface-visibility: hidden;\n    }\n\n    @keyframes celebrityMakeupMotion {\n\n      0% {\n        transform: scale(1.02) translate3d(0, 0, 0);\n      }\n\n      25% {\n        transform: scale(1.055) translate3d(-0.4%, -0.3%, 0);\n      }\n\n      50% {\n        transform: scale(1.08) translate3d(0.4%, -0.6%, 0);\n      }\n\n      75% {\n        transform: scale(1.055) translate3d(0.3%, 0.2%, 0);\n      }\n\n      100% {\n        transform: scale(1.02) translate3d(0, 0, 0);\n      }\n\n    }\n\n    /* Reduce animation for users who prefer less motion */\n    @media (prefers-reduced-motion: reduce) {\n\n      .celebrity-makeup-image {\n        animation: none;\n        transform: scale(1.02);\n      }\n\n    }\n\n  "
                }}
            />
        </>

    );
}
export default CelebrityMakeup;