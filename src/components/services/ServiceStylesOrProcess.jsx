import React from 'react';

export default function ServiceStylesOrProcess({
    title = "Signature Styles & Process",
    subtitle = "Tailored styling options and technique variations crafted by our master artists.",
    items = []
}) {
    if (!items || items.length === 0) return null;

    return (
        <section className="bg-[#fcf9f4] py-16 sm:py-20 px-5 md:px-10 lg:px-16 text-ink border-b border-border/50">
            <div className="mx-auto max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-deep font-semibold block mb-2">
                        Artistry & Technique
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-ink font-medium">
                        {title}
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-muted font-sans leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:border-gold-deep hover:shadow-soft"
                        >
                            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold-deep block mb-3">
                                Option 0{idx + 1}
                            </span>
                            <h3 className="font-display text-2xl text-ink font-medium mb-3 group-hover:text-gold-deep transition-colors">
                                {item.title}
                            </h3>
                            <p className="font-sans text-xs text-muted leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
