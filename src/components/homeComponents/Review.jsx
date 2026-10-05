import React from 'react';
import { DEFAULT_HOME_SECTIONS } from '@/data/homeDefaults';

function Review({ data }) {
    const content = { ...DEFAULT_HOME_SECTIONS.reviews, ...(data || {}) };
    const rawItems = (Array.isArray(content.items) && content.items.length > 0)
        ? content.items
        : (DEFAULT_HOME_SECTIONS.reviews.items || []);
    const items = Array.isArray(rawItems) ? rawItems : [];

    return (
        <>
            <section
                id="reviews"
                className="border-y border-border bg-secondary/50 py-24"
            >
                <div className="mx-auto max-w-7xl px-5 md:px-10">
                    <div className="reveal">
                        <p className="text-[11px] tracking-[0.4em] uppercase text-gold-deep">
                            {content.eyebrow || content.badge || "Guest Love"}
                        </p>
                        <h2 className="mt-4 font-display text-4xl md:text-6xl">
                            {content.heading || content.heading_line1 || "What our"}{" "}
                            <span className="italic">
                                {content.headingHighlight || content.heading_highlight || "guests say"}
                            </span>
                        </h2>
                    </div>
                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {items.map((rev, index) => {
                            const authorName = rev.author || rev.name || "Guest";
                            const ratingStars = typeof rev.rating === 'number'
                                ? "★".repeat(Math.max(1, Math.min(5, rev.rating)))
                                : (rev.rating || "★★★★★");

                            return (
                                <figure
                                    key={index}
                                    className="reveal h-full rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-luxe"
                                    style={index > 0 ? { transitionDelay: `${index * 100}ms` } : undefined}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="text-gold"
                                    >
                                        <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                                        <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                                    </svg>
                                    <blockquote className="mt-5 text-sm leading-relaxed text-muted">
                                        {rev.quote || rev.text}
                                    </blockquote>
                                    <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-5">
                                        <div>
                                            <p className="font-display text-lg">{authorName}</p>
                                            <p className="text-[10px] tracking-[0.25em] uppercase text-muted">
                                                {rev.service}
                                            </p>
                                        </div>
                                        <span className="text-gold">{ratingStars}</span>
                                    </figcaption>
                                </figure>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
export default Review;