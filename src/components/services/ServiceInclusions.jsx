import React from 'react';

export default function ServiceInclusions({
    title = "What The Service Includes",
    subtitle = "Our signature step-by-step ritual engineered for complete hair and skin transformation.",
    items = [],
    suitableFor = ""
}) {
    return (
        <section id="menu-details" className="bg-[#fcf9f4] py-16 sm:py-20 px-5 md:px-10 lg:px-16 text-ink border-b border-border/50">
            <div className="mx-auto max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-deep font-semibold block mb-2">
                        Comprehensive Care
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-ink font-medium">
                        {title}
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-muted font-sans leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((step, idx) => (
                        <div
                            key={idx}
                            className="group relative rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-soft"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="font-display text-2xl italic text-gold-deep">
                                    0{idx + 1}
                                </span>
                                <span className="h-6 w-6 rounded-full bg-cream border border-border flex items-center justify-center text-xs text-gold">
                                    ✦
                                </span>
                            </div>
                            <h3 className="font-display text-xl text-ink font-medium mb-2 group-hover:text-gold-deep transition-colors">
                                {typeof step === "string" ? step.split(":")[0] || step : step.title}
                            </h3>
                            <p className="font-sans text-xs text-muted leading-relaxed">
                                {typeof step === "string" ? (step.includes(":") ? step.split(":")[1].trim() : "Executed with high-grade European salon products by senior specialists.") : step.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {suitableFor && (
                    <div className="mt-12 rounded-2xl bg-secondary/70 border border-border p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="max-w-3xl">
                            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-deep font-bold block mb-1">
                                Ideal Candidate & Suitability:
                            </span>
                            <p className="font-sans text-xs sm:text-sm text-[#403830] leading-relaxed">
                                {suitableFor}
                            </p>
                        </div>
                        <a
                            href="#book"
                            className="whitespace-nowrap rounded-full bg-ink px-6 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-cream hover:bg-gold-deep transition-colors"
                        >
                            Consult With Us →
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
