import React from 'react';

function Review() {
    return (
        <>
            <section
                id="reviews"
                className="border-y border-border bg-secondary/50 py-24"
            >
                <div className="mx-auto max-w-7xl px-5 md:px-10">
                    <div className="reveal">
                        <p className="text-[11px] tracking-[0.4em] uppercase text-gold-deep">
                            Guest Love
                        </p>
                        <h2 className="mt-4 font-display text-4xl md:text-6xl">
                            What our <span className="italic">guests say</span>
                        </h2>
                    </div>
                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        <figure className="reveal h-full rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-luxe">
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
                                The balayage turned out exactly the way I wanted. The team is
                                polite and the studio genuinely feels premium.
                            </blockquote>
                            <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-5">
                                <div>
                                    <p className="font-display text-lg">Ritika Sharma</p>
                                    <p className="text-[10px] tracking-[0.25em] uppercase text-muted">
                                        Hair Colour
                                    </p>
                                </div>
                                <span className="text-gold">★★★★★</span>
                            </figcaption>
                        </figure>
                        <figure
                            className="reveal h-full rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-luxe"
                            style={{ transitionDelay: "100ms" }}
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
                                KNK did my wedding makeup and it stayed flawless for 14 hours.
                                Every single photo has that perfect glow.
                            </blockquote>
                            <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-5">
                                <div>
                                    <p className="font-display text-lg">Ayesha Khan</p>
                                    <p className="text-[10px] tracking-[0.25em] uppercase text-muted">
                                        Bridal
                                    </p>
                                </div>
                                <span className="text-gold">★★★★★</span>
                            </figcaption>
                        </figure>
                        <figure
                            className="reveal h-full rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-luxe"
                            style={{ transitionDelay: "200ms" }}
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
                                Best grooming experience in Awadh. My hair fall reduced noticeably
                                after the hair spa. Highly recommended.
                            </blockquote>
                            <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-5">
                                <div>
                                    <p className="font-display text-lg">Nikhil Verma</p>
                                    <p className="text-[10px] tracking-[0.25em] uppercase text-muted">
                                        Hair Spa
                                    </p>
                                </div>
                                <span className="text-gold">★★★★★</span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>
        </>

    );
}
export default Review;