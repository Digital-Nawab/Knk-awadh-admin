"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Eyebrow, GoldDivider } from "./ServiceUI";
import ProcessSteps from "./ProcessSteps";
import ServicesCTA from "./ServicesCTA";
import CategoryServiceShowcase from "./CategoryServiceShowcase";

function getCategoryAdjective(catName = "") {
    const lower = catName.toLowerCase().trim();
    if (lower === "nails") return "nail";
    if (lower === "men's grooming" || lower === "men-grooming") return "men's grooming";
    return lower;
}

export default function DynamicCategoryPage({ categorySlug = "nails" }) {
    const [category, setCategory] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError("");

        const loadCategoryData = async () => {
            try {
                // Fetch category and its services by category slug
                const res = await fetch(`/api/services/categories/slug/${categorySlug}`);
                if (!res.ok) {
                    // Try fetching category alone or services alone
                    const catRes = await fetch("/api/services/categories");
                    const catData = await catRes.json();
                    const matchedCat = catData.categories?.find(
                        (c) => c.slug === categorySlug || (c.slug === "nails" && categorySlug === "nail-art")
                    );

                    if (matchedCat && isMounted) {
                        setCategory(matchedCat);
                        const sRes = await fetch(`/api/services?category=${matchedCat.slug}`);
                        const sData = await sRes.json();
                        setServices(sData.services || []);
                        return;
                    }
                    throw new Error("Category not found");
                }

                const data = await res.json();
                if (isMounted) {
                    setCategory(data.category);
                    setServices(data.services || []);
                }
            } catch (err) {
                console.warn("Could not load dynamic category data:", err);
                if (isMounted) {
                    setError("Failed to load category services.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (categorySlug) {
            loadCategoryData();
        }

        return () => {
            isMounted = false;
        };
    }, [categorySlug]);

    const catName = category?.name || (categorySlug ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace("-", " ") : "Services");
    const headline = category?.title || `${catName}, done right.`;
    const titleParts = headline.includes(",") ? headline.split(",") : [headline];
    const catAdjective = getCategoryAdjective(catName);

    // Filter tabs based on filter_category if present
    const filterTabs = useMemo(() => {
        const set = new Set();
        services.forEach((s) => {
            const fc = s.filter_category || s.filterCategory;
            if (fc && fc.trim()) {
                set.add(fc.trim());
            }
        });
        if (set.size > 1) {
            return ["All", ...Array.from(set)];
        }
        return [];
    }, [services]);

    // Filter services based on active tab
    const displayedServices = useMemo(() => {
        if (!filterTabs.length || activeTab === "All") {
            return services;
        }
        return services.filter((s) => {
            const fc = s.filter_category || s.filterCategory;
            return fc === activeTab;
        });
    }, [services, activeTab, filterTabs]);

    return (
        <div className="bg-cream">
            {/* Hero Section */}
            <section className="relative overflow-hidden px-6 pt-20 pb-20 md:pt-28 md:pb-24">
                <div
                    aria-hidden="true"
                    className="fixed inset-x-0 top-0 h-24 bg-primary z-40 pointer-events-none"
                />
                <svg
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full text-ink opacity-[0.05]"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <pattern id="categoryJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                            <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#categoryJaali)" />
                </svg>

                <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                    <div className="relative z-10 max-w-[600px]">
                        <Eyebrow>{catName}</Eyebrow>
                        <h1 className="mt-6 font-display text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-ink sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                            {titleParts[0]}
                            {titleParts.length > 1 && (
                                <>
                                    ,
                                    <br />
                                    <span className="italic text-gold">{titleParts.slice(1).join(",")}</span>
                                </>
                            )}
                        </h1>
                        <GoldDivider />
                        <p className="mt-7 max-w-[500px] font-sans text-[13px] leading-[1.9] text-muted sm:text-[14px]">
                            {category?.short_desc ||
                                `Experience bespoke ${catName.toLowerCase()} artistry handled by senior certified specialists trained for precision, hygiene, and radiant luxury.`}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#book"
                                data-booking-trigger="true"
                                data-service={catName}
                                className="inline-flex items-center justify-center bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105 cursor-pointer font-medium"
                            >
                                Book Now
                            </a>
                            <a
                                href="#services-menu"
                                className="inline-flex items-center justify-center border border-gold text-gold-deep font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-colors hover:bg-gold/10 font-medium"
                            >
                                View {catName} Services
                            </a>
                        </div>
                    </div>

                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxe border border-border">
                        <img
                            src={category?.image || "/assets/images/new/service/NAILS.webp"}
                            alt={category?.name || `${catName} specialist at KNK Awadh`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Services Cards Showcase (Dynamic from API) */}
            {services.length > 0 && (
                <CategoryServiceShowcase
                    id="services-showcase"
                    category={catName}
                    eyebrow={`${catName} Architecture`}
                    title={`${catName} Services`}
                    subtitle={`Handcrafted ${catName.toLowerCase()} treatments executed with hospital-grade sterile hygiene and international prestige formulations.`}
                    services={services}
                />
            )}

            {/* "Our ___ services." Section */}
            <section id="services-menu" className="px-6 py-20 md:py-28 bg-secondary">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-[600px] mx-auto text-center mb-14">
                        <Eyebrow>What We Do</Eyebrow>
                        <h2 className="mt-6 font-display text-[48px] font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-[60px] md:text-[68px]">
                            Our {catAdjective} <span className="italic text-gold">services.</span>
                        </h2>
                        <GoldDivider center />
                    </div>

                    {/* The Full Menu Container */}
                    <div className="relative mx-auto mt-12 max-w-4xl">
                        <div className="relative border border-gold/40 bg-cream px-6 py-12 sm:px-10 md:px-16 md:py-16">
                            {/* Gold Corner Accents */}
                            <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-6 border-l border-t border-gold" />
                            <span aria-hidden="true" className="absolute right-0 top-0 h-6 w-6 border-r border-t border-gold" />
                            <span aria-hidden="true" className="absolute left-0 bottom-0 h-6 w-6 border-l border-b border-gold" />
                            <span aria-hidden="true" className="absolute right-0 bottom-0 h-6 w-6 border-r border-b border-gold" />

                            <p className="text-center font-display italic text-3xl text-gold-deep">
                                The full menu
                            </p>
                            <GoldDivider center />

                            {/* Filter Tabs if multiple sub-categories exist */}
                            {filterTabs.length > 0 && (
                                <div className="mt-10 flex flex-wrap justify-center gap-3">
                                    {filterTabs.map((tab) => {
                                        const isActive = tab === activeTab;
                                        return (
                                            <button
                                                key={tab}
                                                type="button"
                                                onClick={() => setActiveTab(tab)}
                                                className={`group flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${isActive
                                                        ? "border-gold bg-gold text-cream shadow-luxe"
                                                        : "border-border text-muted hover:border-gold hover:text-gold-deep"
                                                    }`}
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.4"
                                                    className={`h-4 w-4 ${isActive ? "text-cream" : "text-gold"}`}
                                                >
                                                    <path d="M9 3c-2 3-3 7-3 10a6 6 0 0 0 12 0c0-3-1-7-3-10" />
                                                    <path d="M9 3c1 1.5 1.5 3.2 1.5 5" />
                                                </svg>
                                                {tab}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Editorial Services List */}
                            {loading ? (
                                <div className="mt-12 grid gap-x-12 gap-y-3 sm:grid-cols-2">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="h-14 bg-ink/[0.03] rounded-lg animate-pulse" />
                                    ))}
                                </div>
                            ) : displayedServices.length === 0 ? (
                                <div className="mt-12 text-center py-10">
                                    <p className="font-display italic text-xl text-muted">
                                        No services registered under this category yet.
                                    </p>
                                    <p className="mt-2 text-xs text-muted">
                                        Check back soon or consult with our front desk for bespoke requests.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-12 grid gap-x-12 gap-y-1 sm:grid-cols-2">
                                    {displayedServices.map((service, i) => (
                                        <Link
                                            key={service.id || service.slug || i}
                                            href={`/services/${categorySlug}/${service.slug}`}
                                            className="group relative flex items-baseline gap-4 py-4 cursor-pointer"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full"
                                            />
                                            <span className="font-display text-sm italic text-gold-deep shrink-0">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="font-display text-lg text-ink transition-colors duration-300 group-hover:text-gold-deep sm:text-xl">
                                                {service.name || service.title}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="ml-auto text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 shrink-0"
                                            >
                                                &#10022;
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-x-0 bottom-0 h-px bg-border/60"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <div className="mt-10 text-center">
                                <a
                                    href="#book"
                                    data-booking-trigger="true"
                                    data-service={catName}
                                    className="inline-flex items-center justify-center bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105 cursor-pointer font-medium"
                                >
                                    Book {catName}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProcessSteps />
            <ServicesCTA />
        </div>
    );
}
