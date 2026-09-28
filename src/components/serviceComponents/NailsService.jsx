"use client";

import React, { useState, useEffect } from "react";
import { Eyebrow, GoldDivider } from "./ServiceUI";
import ProcessSteps from "./ProcessSteps";
import ServicesCTA from "./ServicesCTA";
import CategoryServiceShowcase from "./CategoryServiceShowcase";
import { nailsShowcaseServices } from "@/data/categoryShowcaseData";

const defaultNailMenu = {
    "Nail Extensions": {
        items: [
            "Nail Cut",
            "Nail Filing",
            "Nail Paint Application",
            "Gel Paint Removal",
            "Gel Paint Application",
            "Temporary Nail Extensions",
            "Gel Nail Extensions",
            "Acrylic Nail Extensions",
        ],
    },
    "Mani / Pedi": {
        items: ["Basic", "O3", "Alga", "Bombini", "Biscotti"],
    },
};

function TreatmentMenu({ dynamicTabs = null }) {
    let menuData = defaultNailMenu;

    if (dynamicTabs && Array.isArray(dynamicTabs) && dynamicTabs.length > 0) {
        menuData = {};
        dynamicTabs.forEach((tab) => {
            const catName = tab.category || "Treatments";
            menuData[catName] = {
                items: Array.isArray(tab.items) ? tab.items : [],
            };
        });
    }

    const categories = Object.keys(menuData);
    const [active, setActive] = useState(categories[0] || "Nail Extensions");

    useEffect(() => {
        if (categories.length > 0 && !menuData[active]) {
            setActive(categories[0]);
        }
    }, [categories, active, menuData]);

    const activeData = menuData[active] || { items: [] };

    return (
        <div className="relative mx-auto mt-20 max-w-4xl">
            <div className="relative border border-gold/40 bg-cream px-6 py-12 sm:px-10 md:px-16 md:py-16">
                <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-6 border-l border-t border-gold" />
                <span aria-hidden="true" className="absolute right-0 top-0 h-6 w-6 border-r border-t border-gold" />
                <span aria-hidden="true" className="absolute left-0 bottom-0 h-6 w-6 border-l border-b border-gold" />
                <span aria-hidden="true" className="absolute right-0 bottom-0 h-6 w-6 border-r border-b border-gold" />

                <p className="text-center font-display italic text-3xl text-gold-deep">
                    The full menu
                </p>
                <GoldDivider center />

                {/* Tabs */}
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => {
                        const isActive = cat === active;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`group flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                                    isActive
                                        ? "border-gold bg-gold text-cream shadow-luxe"
                                        : "border-border text-muted hover:border-gold hover:text-gold-deep"
                                }`}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={`h-4 w-4 ${isActive ? "text-cream" : "text-gold"}`}>
                                    <path d="M9 3c-2 3-3 7-3 10a6 6 0 0 0 12 0c0-3-1-7-3-10" />
                                    <path d="M9 3c1 1.5 1.5 3.2 1.5 5" />
                                </svg>
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Editorial list */}
                <div className="mt-12 grid gap-x-12 gap-y-1 sm:grid-cols-2">
                    {activeData.items.map((item, i) => (
                        <div
                            key={`${active}-${item}-${i}`}
                            className="group relative flex items-baseline gap-4 py-4"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full"
                            />
                            <span className="font-display text-sm italic text-gold-deep">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-display text-lg text-ink transition-colors duration-300 group-hover:text-gold-deep sm:text-xl">
                                {item}
                            </span>
                            <span
                                aria-hidden="true"
                                className="ml-auto text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            >
                                &#10022;
                            </span>
                            <span
                                aria-hidden="true"
                                className="absolute inset-x-0 bottom-0 h-px bg-border/60"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <a
                        href="#book"
                        data-booking-trigger="true"
                        data-service={`Nails - ${active}`}
                        className="inline-flex items-center justify-center bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105 cursor-pointer"
                    >
                        Book {active}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function NailsService() {
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchCategory = async () => {
            try {
                const res = await fetch("/api/services/slug/nail-art");
                if (res.ok) {
                    const data = await res.json();
                    if (data.service && isMounted) {
                        setCategoryData(data.service);
                    }
                }
            } catch (e) {
                console.warn("Could not load dynamic category data for nails", e);
            }
        };
        fetchCategory();
        return () => { isMounted = false; };
    }, []);

    const headline = categoryData?.title || "Nails, done right.";
    const titleParts = headline.includes(",") ? headline.split(",") : [headline];

    let dynamicTabs = null;
    if (categoryData?.items) {
        try {
            dynamicTabs = typeof categoryData.items === "string" ? JSON.parse(categoryData.items) : categoryData.items;
        } catch {}
    }

    return (
        <div className="bg-cream">
            {/* Hero */}
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
                        <pattern id="nailsJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                            <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#nailsJaali)" />
                </svg>

                <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                    <div className="relative z-10 max-w-[600px]">
                        <Eyebrow>{categoryData?.name || "Nails"}</Eyebrow>
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
                            {categoryData?.short_desc ||
                                "Gel, acrylic, extensions or a simple mani-pedi — every nail service handled by an artist trained for precision and finish."}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#book"
                                data-booking-trigger="true"
                                data-service="Nails"
                                className="inline-flex items-center justify-center bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105 cursor-pointer"
                            >
                                Book Now
                            </a>
                            <a
                                href="#nail-services"
                                className="inline-flex items-center justify-center border border-gold text-gold-deep font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-colors hover:bg-gold/10"
                            >
                                View Nail Services
                            </a>
                        </div>
                    </div>

                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxe border border-border">
                        <img
                            src={categoryData?.image || "/assets/images/new/service/NAILS.webp"}
                            alt={categoryData?.name || "KNK Awadh nail artist at work"}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Nail Services Cards Showcase (Dynamic from API) */}
            <CategoryServiceShowcase
                id="nail-services"
                category="Nails"
                eyebrow="Precision Nail Architecture"
                title="Nails Services"
                subtitle="From classic Parisian French art and high-durability acrylics to bespoke 3D bridal motifs and relaxing therapeutic pedicures."
                services={nailsShowcaseServices}
            />

            {/* Our nail treatment menu */}
            <section className="px-6 py-20 md:py-28 bg-secondary">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-[600px] mx-auto text-center mb-14">
                        <Eyebrow>What We Do</Eyebrow>
                        <h2 className="mt-6 font-display text-[48px] font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-[60px] md:text-[68px]">
                            Our nail <span className="italic text-gold">services.</span>
                        </h2>
                        <GoldDivider center />
                    </div>

                    <TreatmentMenu dynamicTabs={dynamicTabs} />
                </div>
            </section>

            <ProcessSteps />
            <ServicesCTA />
        </div>
    );
}