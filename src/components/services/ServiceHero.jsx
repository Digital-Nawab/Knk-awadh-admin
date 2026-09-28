import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function ServiceHero({
    breadcrumbs = [],
    eyebrow = "Artistry & Care",
    h1 = "",
    shortDesc = "",
    image = "",
    badge = "Signature Luxury",
    bookUrl = "#book",
    secondaryLabel = "View Menu",
    secondaryUrl = "#menu-details"
}) {
    return (
        <section className="relative overflow-hidden bg-cream px-5 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24 lg:px-16 text-ink border-b border-border/60">
            {/* Subtle luxury ambient pattern */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-[#e8cfc6]/20 blur-3xl"
            />

            <div className="mx-auto max-w-7xl">
                {breadcrumbs.length > 0 && (
                    <div className="mb-6">
                        <Breadcrumbs items={breadcrumbs} />
                    </div>
                )}

                <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                    <div className="relative z-10 max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-3">
                            <span className="h-px w-8 bg-gold" />
                            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-deep">
                                {eyebrow}
                            </span>
                            <span className="h-px w-8 bg-gold" />
                        </div>

                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium leading-[1.05] tracking-tight text-[#241d18]">
                            {h1}
                        </h1>

                        <div className="my-6 h-px w-24 bg-gradient-to-r from-gold via-gold-soft to-transparent" />

                        <p className="font-sans text-sm sm:text-base leading-relaxed text-muted max-w-xl">
                            {shortDesc}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <a
                                href="#book"
                                data-booking-trigger="true"
                                data-service={h1}
                                className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-luxe transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                Book An Appointment
                            </a>

                            <a
                                href={secondaryUrl}
                                className="inline-flex items-center justify-center rounded-full border border-gold/60 bg-cream/60 px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#403830] transition-colors hover:bg-gold/15"
                            >
                                {secondaryLabel} ↓
                            </a>

                            <a
                                href="tel:+919559321711"
                                className="inline-flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-gold-deep font-semibold hover:underline px-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                +91 95593 21711
                            </a>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border pt-6 text-xs text-muted font-sans">
                            <div className="flex items-center gap-2">
                                <span className="text-gold">✦</span>
                                <span>Master Specialists</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gold">✦</span>
                                <span>Global Prestige Products</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gold">✦</span>
                                <span>Mahanagar · Hazratganj · Gomti Nagar</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-3xl border border-gold/40 bg-secondary p-2 shadow-2xl">
                            <div className="relative h-full w-full overflow-hidden rounded-2xl">
                                <img
                                    src={image || "/assets/images/new/service/hairservice.webp"}
                                    alt={h1}
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                                    <span className="font-display text-lg italic tracking-wide">
                                        KNK Salon Awadh
                                    </span>
                                    <span className="rounded-full bg-gold/90 backdrop-blur px-3.5 py-1 text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-primary">
                                        {badge}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
