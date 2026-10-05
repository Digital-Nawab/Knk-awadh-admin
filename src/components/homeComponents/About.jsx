import React from 'react';
import { DEFAULT_HOME_SECTIONS } from '@/data/homeDefaults';

function About({ data }) {
    const content = { ...DEFAULT_HOME_SECTIONS.about, ...(data || {}) };

    const stats = Array.isArray(content.stats) && content.stats.length > 0
        ? content.stats
        : [
            { number: content.stat1_value || "25k+", label: content.stat1_label || "Happy Clients" },
            { number: content.stat2_value || "12+", label: content.stat2_label || "Years Experience" },
            { number: content.stat3_value || "4.9/5", label: content.stat3_label || "Google Rating" },
        ];

    return (
        <>
            {/* ============ INTRO / ABOUT ============ */}
            <section className="relative overflow-hidden pb-16 pt-20 md:pt-24">
                <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
                            {content.heading || "Luxury Salon & Makeup"}{" "}
                            <span className="italic">
                                {content.headingHighlight || content.italic_heading || "Studio in & Lucknow"}
                            </span>
                        </h2>

                        <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                            {content.eyebrow || content.badge || "Professional Makeup, Hair, Nails, Skin & Beauty Services"}
                        </p>
                        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
                            {content.description}
                        </p>
                        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
                            {stats.map((st, idx) => (
                                <div key={idx}>
                                    <p className="font-display text-3xl text-gold-deep md:text-4xl">
                                        {st.number || st.value}
                                    </p>
                                    <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-muted">
                                        {st.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-[10rem_10rem_2rem_2rem] border border-gold-soft/60 shadow-luxe animate-floatSoft">
                            <img
                                src={content.image || "/assets/images/new/about.webp"}
                                alt={content.imageAlt || "KNK Salon client with a glossy blow-dry finish"}
                                width={600}
                                height={800}
                                loading="lazy"
                                decoding="async"
                                className="h-[28rem] w-full object-cover md:h-[36rem]"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-2 rounded-2xl border border-border bg-card/90 px-6 py-5 shadow-soft backdrop-blur md:-left-10">
                            <p className="font-display text-2xl text-gold-deep">
                                {content.badgeTitle || content.badge_title || "Open Today"}
                            </p>
                            <p className="text-xs text-muted">
                                {content.badgeSubtitle || content.badge_time || "10:00 AM – 8:30 PM"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default About;