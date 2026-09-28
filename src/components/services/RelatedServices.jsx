import React from 'react';
import Link from 'next/link';

export default function RelatedServices({
    title = "Explore Related Treatments",
    subtitle = "Complete your luxury pampering ritual with these complementary salon services.",
    services = []
}) {
    if (!services || services.length === 0) return null;

    return (
        <section className="bg-[#fcf9f4] py-16 sm:py-20 px-5 md:px-10 lg:px-16 text-ink border-b border-border/50">
            <div className="mx-auto max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-deep font-semibold block mb-2">
                        Complete Your Look
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl italic text-ink font-medium">
                        {title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-muted font-sans">
                        {subtitle}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((svc, idx) => (
                        <div
                            key={idx}
                            className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:border-gold hover:shadow-soft"
                        >
                            <div>
                                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep font-semibold block mb-2">
                                    Related Ritual
                                </span>
                                <h3 className="font-display text-2xl text-ink font-medium mb-3 group-hover:text-gold-deep transition-colors">
                                    {svc.title || svc.name}
                                </h3>
                                <p className="font-sans text-xs text-muted leading-relaxed mb-6">
                                    {svc.desc || svc.shortDesc || "Crafted to complement your aesthetic journey with precision care."}
                                </p>
                            </div>
                            <Link
                                href={svc.url}
                                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-ink group-hover:text-gold-deep transition-colors"
                            >
                                <span>Explore Service</span>
                                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
