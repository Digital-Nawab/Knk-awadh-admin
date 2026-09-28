"use client";

import React from "react";

/* Small uppercase label above a heading */
export function Eyebrow({ children, className = "" }) {
    return (
        <p className={`font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-gold-deep ${className}`}>
            {children}
        </p>
    );
}

/* The gold rule + dot used under every heading */
export function GoldDivider({ center = false }) {
    return (
        <div className={`mt-8 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
            <span className="h-[2px] w-16 bg-gold" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="h-px w-10 bg-border" />
        </div>
    );
}

/* One service card in the "All our services" grid */
export function ServiceCard({ service }) {
    return (
        <div className="group bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 font-sans text-[9px] font-medium uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-cream/90 text-gold-deep">
                    {service.category}
                </span>
            </div>
            <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl font-medium leading-tight text-ink">
                        {service.title}
                    </h3>
                    <span className="shrink-0 font-sans text-[12px] pt-1 text-gold-deep">
                        {service.price}
                    </span>
                </div>
                <p className="mt-3 font-sans text-[13px] leading-relaxed text-muted">
                    {service.desc}
                </p>
                <a
                    href="tel:+919559321711"
                    className="mt-5 inline-block font-sans text-[11px] tracking-[0.15em] uppercase pb-1 border-b border-gold text-gold-deep"
                >
                    Book This
                </a>
            </div>
        </div>
    );
}