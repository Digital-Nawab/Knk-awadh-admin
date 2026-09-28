import React from 'react';

export default function ServiceBenefits({
    title = "Key Benefits & Features",
    subtitle = "Experience the transformative difference that distinguishes KNK Salon treatments across Lucknow.",
    benefits = []
}) {
    if (!benefits || benefits.length === 0) return null;

    return (
        <section className="bg-cream py-16 sm:py-20 px-5 md:px-10 lg:px-16 text-ink border-b border-border/50">
            <div className="mx-auto max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-deep font-semibold block mb-2">
                        Visible Perfection
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-ink font-medium">
                        {title}
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-muted font-sans leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((b, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-border/80 bg-[#fffdfa] p-7 transition-all duration-300 hover:border-gold hover:shadow-soft"
                        >
                            <div className="h-10 w-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold-deep mb-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h3 className="font-display text-xl text-ink font-medium mb-2.5">
                                {b.title}
                            </h3>
                            <p className="font-sans text-xs text-muted leading-relaxed">
                                {b.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
