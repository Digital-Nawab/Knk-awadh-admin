"use client";

import React, { useState } from 'react';

export default function ServiceFaq({
    title = "Frequently Asked Questions",
    subtitle = "Clear answers about the procedure, preparation, longevity, and maintenance.",
    faqs = []
}) {
    const [openIndex, setOpenIndex] = useState(0);

    if (!faqs || faqs.length === 0) return null;

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: f.a
            }
        }))
    };

    return (
        <section className="bg-cream py-16 sm:py-20 px-5 md:px-10 lg:px-16 text-ink border-b border-border/50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-deep font-semibold block mb-2">
                        Clarity & Trust
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl italic text-ink font-medium">
                        {title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-muted font-sans">
                        {subtitle}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className="rounded-2xl border border-border bg-white transition-colors"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <span className="font-display text-xl sm:text-2xl text-ink font-medium pr-4">
                                        {faq.q}
                                    </span>
                                    <span
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-xs text-gold-deep transition-transform duration-300 ${
                                            isOpen ? "rotate-180 bg-gold/15" : "bg-cream"
                                        }`}
                                    >
                                        ↓
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm font-sans text-muted leading-relaxed border-t border-border/40">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
