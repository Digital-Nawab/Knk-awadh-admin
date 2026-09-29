"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";

function slugify(text) {
    if (!text) return "";
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export default function CategoryServiceShowcase({
    id = "services-showcase",
    eyebrow = "Precision Architecture",
    title = "Signature Services",
    subtitle = "Handcrafted treatments executed by senior artists using world-class formulations and hygienic luxury protocols.",
    services: initialServices = [],
    category = "",
}) {
    const { openBooking } = useBooking();
    const sliderRef = useRef(null);
    const [services, setServices] = useState(initialServices);
    const [expandedCards, setExpandedCards] = useState({});
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState("all");

    // Fetch dynamic services from API
    useEffect(() => {
        let isMounted = true;
        const fetchShowcaseServices = async () => {
            try {
                const queryParams = new URLSearchParams();
                if (category) {
                    queryParams.set("category", category);
                }
                const res = await fetch(`/api/services?${queryParams.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.services && data.services.length > 0 && isMounted) {
                        setServices(data.services);
                    }
                }
            } catch (err) {
                console.warn("Could not load dynamic showcase services, using fallback.", err);
            }
        };

        fetchShowcaseServices();
        return () => {
            isMounted = false;
        };
    }, [category]);

    // Extract unique filter categories if present
    const filterTabs = useMemo(() => {
        const categoriesSet = new Set();
        services.forEach((s) => {
            const fc = s.filter_category || s.filterCategory;
            if (fc && fc.trim()) categoriesSet.add(fc.trim());
        });
        if (categoriesSet.size > 1) {
            return ["all", ...Array.from(categoriesSet)];
        }
        return [];
    }, [services]);

    // Filter services based on active filter
    const displayedServices = useMemo(() => {
        if (activeFilter === "all") return services;
        return services.filter((s) => {
            const fc = s.filter_category || s.filterCategory;
            return fc === activeFilter;
        });
    }, [services, activeFilter]);

    const toggleExpand = (index) => {
        setExpandedCards((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const updateScrollState = () => {
        if (!sliderRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setCanScrollLeft(scrollLeft > 15);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

        const cardWidth = 380;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(Math.max(0, index), displayedServices.length - 1));
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;
        updateScrollState();
        slider.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState);
        return () => {
            slider.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [displayedServices]);

    const scroll = (direction) => {
        if (!sliderRef.current) return;
        const cardWidth = 380;
        const offset = direction === "left" ? -cardWidth : cardWidth;
        sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
    };

    const scrollToIndex = (index) => {
        if (!sliderRef.current) return;
        const cardWidth = 380;
        sliderRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        if (sliderRef.current) {
            sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
    };

    if (!services || services.length === 0) return null;

    return (
        <section
            id={id}
            className="relative overflow-hidden py-20 md:py-28 bg-[#1a0f08] text-[#fbf7f0]"
            style={{
                backgroundImage:
                    "radial-gradient(ellipse at 50% 0%, rgba(201, 162, 74, 0.18) 0%, rgba(26, 15, 8, 0) 70%), linear-gradient(180deg, #22140c 0%, #170d06 50%, #120904 100%)",
            }}
        >
            {/* Ambient luxury light halos */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-28 top-1/3 h-[420px] w-[420px] rounded-full bg-[#c49a4d]/10 blur-[120px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 bottom-1/4 h-[450px] w-[450px] rounded-full bg-[#c49a4d]/10 blur-[130px]"
            />

            {/* Subtle Royal Awadhi Jaali watermark */}
            <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full text-[#caa882] opacity-[0.028] pointer-events-none"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <pattern id="luxeArchedJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                        <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="30" cy="26" r="3" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#luxeArchedJaali)" />
            </svg>

            {/* Top gold hairline border */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#cda882]/40 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
                    {eyebrow && (
                        <div className="flex items-center justify-center gap-3">
                            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#cda882]" />
                            <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.38em] text-[#caa882]">
                                {eyebrow}
                            </p>
                            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#cda882]" />
                        </div>
                    )}

                    <h2 className="mt-3.5 font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#faf7f2]">
                        {title}
                    </h2>

                    {/* Awadh royal diamond divider */}
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent to-[#cda882]" />
                        <span className="h-1.5 w-1.5 rotate-45 bg-[#cda882]" />
                        <span className="h-[1.5px] w-14 bg-gradient-to-l from-transparent to-[#cda882]" />
                    </div>

                    {subtitle && (
                        <p className="mt-5 font-sans text-sm sm:text-[15px] leading-relaxed text-[#dcd1c4] max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}

                    {/* Interactive Filter Pills */}
                    {filterTabs.length > 0 && (
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                            {filterTabs.map((tab) => {
                                const isActive = activeFilter === tab;
                                const label = tab === "all" ? `All Creations (${services.length})` : tab;
                                return (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => handleFilterChange(tab)}
                                        className={`font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#c49a4d] to-[#9c7a2e] text-[#140a05] shadow-[0_0_20px_rgba(201,162,74,0.45)] scale-105"
                                                : "bg-[#25150d]/80 text-[#d8c8b7] border border-[#cda882]/30 hover:border-[#cda882] hover:text-white"
                                        }`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Slider / Carousel Container with Royal Arched Cards */}
                <div className="relative group/carousel">
                    {/* Left arrow */}
                    {canScrollLeft && (
                        <button
                            type="button"
                            onClick={() => scroll("left")}
                            aria-label="Previous services"
                            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 h-13 w-13 items-center justify-center rounded-full bg-[#170e08]/90 hover:bg-[#cda882] text-[#e5c697] hover:text-[#170e08] border border-[#cda882]/50 shadow-[0_4px_30px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Right arrow */}
                    {canScrollRight && (
                        <button
                            type="button"
                            onClick={() => scroll("right")}
                            aria-label="Next services"
                            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 h-13 w-13 items-center justify-center rounded-full bg-[#170e08]/90 hover:bg-[#cda882] text-[#e5c697] hover:text-[#170e08] border border-[#cda882]/50 shadow-[0_4px_30px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Scrollable Track */}
                    <div
                        ref={sliderRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 px-2 no-scrollbar"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {displayedServices.map((item, index) => {
                            const isExpanded = !!expandedCards[index];
                            const itemNumber = item.display_order ? String(item.display_order).padStart(2, "0") : String(index + 1).padStart(2, "0");
                            const itemCategorySlug = item.category_slug || slugify(item.category || category || "nails");
                            const itemSlug = item.slug || slugify(item.title || item.name || "");
                            const itemUrl = item.url || `/services/${itemCategorySlug}/${itemSlug}`;
                            const itemTitle = item.title || item.name;
                            const itemCategory = item.category_name || item.category;
                            const itemHighlights = item.highlights || item.tagsList || [];

                            return (
                                <div
                                    key={item.id || item.slug || itemTitle}
                                    className="snap-center shrink-0 w-[88vw] sm:w-[360px] md:w-[380px] flex flex-col"
                                >
                                    {/* Haute Couture Arched Card */}
                                    <div className="relative h-full flex flex-col justify-between bg-gradient-to-b from-[#26150d] via-[#1d1009] to-[#130904] rounded-t-[54px] sm:rounded-t-[64px] rounded-b-[24px] p-4 sm:p-5 border border-[#cda882]/30 hover:border-[#e5c697] shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:shadow-[0_28px_65px_rgba(201,162,74,0.25)] transition-all duration-500 hover:-translate-y-2 group/card">
                                        
                                        {/* Subtle arched top gold halo */}
                                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#e5c697] to-transparent opacity-60 group-hover/card:opacity-100 transition-opacity duration-500 rounded-t-[64px]" />

                                        {/* Card Top: Arched Image Window & Numbering */}
                                        <div>
                                            <div className="relative overflow-hidden rounded-t-[44px] sm:rounded-t-[52px] rounded-b-[16px] aspect-[16/12] bg-[#120904] border border-[#cda882]/20 group/img">
                                                <img
                                                    src={item.image}
                                                    alt={itemTitle}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-108"
                                                    loading="lazy"
                                                />
                                                
                                                {/* Vignette shadow gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1009] via-transparent to-black/25 pointer-events-none" />

                                                {/* Category badge */}
                                                {itemCategory && (
                                                    <span className="absolute top-4 left-4 backdrop-blur-md bg-[#140a05]/85 text-[#e5c697] font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] uppercase px-3.5 py-1 rounded-full border border-[#cda882]/40 shadow-md">
                                                        {itemCategory}
                                                    </span>
                                                )}

                                                {/* Editorial service index counter */}
                                                <span className="absolute top-4 right-4 font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-[#e5c697] backdrop-blur-md bg-[#140a05]/75 border border-[#cda882]/35 px-3 py-0.5 rounded-full shadow-md">
                                                    NO. {itemNumber}
                                                </span>
                                            </div>

                                            {/* Treatment Highlights micro-pills */}
                                            {itemHighlights.length > 0 && (
                                                <div className="mt-4 flex flex-wrap gap-1.5">
                                                    {itemHighlights.map((tag, tagIdx) => (
                                                        <span
                                                            key={tagIdx}
                                                            className="font-sans text-[9.5px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#cda882]/10 border border-[#cda882]/30 text-[#e5c697]/90"
                                                        >
                                                            ✦ {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Service Title */}
                                            <h3 className="mt-3.5 font-['Cormorant_Garamond',serif] text-2xl sm:text-[27px] font-semibold leading-tight tracking-tight text-[#faf7f2]">
                                                {itemTitle}
                                            </h3>

                                            {/* Delicate gold hairline */}
                                            <div className="mt-2.5 mb-3 h-px w-12 bg-gradient-to-r from-[#cda882] to-transparent group-hover/card:w-24 transition-all duration-500" />

                                            {/* Description with Read More */}
                                            <div className="font-sans text-[13px] sm:text-[13.5px] leading-[1.75] text-[#cfc2b3]">
                                                <span>{item.short_desc || item.shortDesc}</span>
                                                {(item.description || item.moreDesc) && (
                                                    <>
                                                        {!isExpanded ? (
                                                            <>
                                                                <span className="text-[#cda882]">... </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleExpand(index)}
                                                                    className="font-medium text-[#e5c697] hover:text-white underline ml-1 cursor-pointer transition-colors text-[11px] tracking-wider uppercase"
                                                                >
                                                                    Read More
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <div className="mt-3 pt-2.5 border-t border-[#cda882]/20 text-[12.5px] leading-relaxed text-[#bcaea1] animate-fadeIn">
                                                                <p>{item.description || item.moreDesc}</p>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleExpand(index)}
                                                                    className="mt-2 inline-block font-medium text-[#e5c697] hover:text-white underline cursor-pointer transition-colors text-[11px] tracking-wider uppercase"
                                                                >
                                                                    Read Less
                                                                </button>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Button: Book Appointment */}
                                        <div className="mt-6 pt-4 border-t border-[#cda882]/15">
                                            <button
                                                type="button"
                                                data-booking-trigger="true"
                                                data-service={itemTitle}
                                                onClick={() => openBooking(itemTitle)}
                                                className="w-full relative overflow-hidden bg-gradient-to-r from-[#c49a4d] via-[#e5c697] to-[#b88c3a] text-[#140a05] font-sans text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase py-3.5 px-5 rounded-full shadow-[0_4px_22px_rgba(196,154,77,0.3)] hover:shadow-[0_6px_30px_rgba(229,198,151,0.55)] hover:brightness-105 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                                            >
                                                <span>Book Appointment</span>
                                                <svg
                                                    className="w-4 h-4 text-[#140a05] transition-transform duration-300 group-hover/btn:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Indicator Dots */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {displayedServices.map((item, idx) => (
                            <button
                                key={`dot-${item.id || item.slug || idx}`}
                                type="button"
                                onClick={() => scrollToIndex(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={`transition-all duration-300 rounded-full cursor-pointer ${
                                    activeIndex === idx
                                        ? "w-8 h-2 bg-[#e5c697] shadow-[0_0_12px_rgba(229,198,151,0.7)]"
                                        : "w-2 h-2 bg-[#cda882]/30 hover:bg-[#cda882]/70"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Mobile Swipe Hint */}
                    <div className="flex md:hidden items-center justify-center gap-2 mt-4 text-[#caa882]/70 font-sans text-[11px] tracking-widest uppercase">
                        <span>&larr; Swipe to explore &rarr;</span>
                    </div>
                </div>
            </div>

            {/* Bottom delicate gold line separator */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#cda882]/30 to-transparent" />
        </section>
    );
}
