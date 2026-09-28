import React from 'react';

export default function WhyChooseKnk({
    title = "Why Choose KNK Salon Awadh",
    points = []
}) {
    const defaultPoints = [
        "Over 15 years of beauty artistry and trusted bridal reputation in Lucknow",
        "Senior master stylists certified in global European techniques and hair trichology",
        "100% genuine prestige global product lines with bond protection",
        "Hygienic private service suites with hospital-grade tool sterilization",
        "Tailored consultations ensuring results match your bone structure and personal style",
        "Prime luxury destinations across Mahanagar, Hazratganj, and Gomti Nagar"
    ];

    const displayPoints = points && points.length > 0 ? points : defaultPoints;

    return (
        <section className="bg-cream py-16 sm:py-20 px-5 md:px-10 lg:px-16 text-ink border-b border-border/50">
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-deep font-semibold block mb-3">
                            The KNK Standard
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-ink font-medium leading-tight">
                            {title}
                        </h2>
                        <div className="my-6 h-px w-20 bg-gold" />
                        <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed mb-8">
                            We believe luxury is found in the details—the gentleness of the touch, the precision of the cut, the purity of the formulations, and the serene sanctuary we provide for our guests.
                        </p>

                        <div className="space-y-4">
                            {displayPoints.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-3.5">
                                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-[10px] text-gold-deep font-bold">
                                        ✓
                                    </span>
                                    <p className="font-sans text-xs sm:text-sm text-[#403830] leading-relaxed">
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold/30 shadow-2xl">
                            <img
                                src="/assets/images/new/about.webp"
                                alt="KNK Salon Awadh luxury salon ambience"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <span className="font-display text-2xl italic block mb-1">
                                    Awadh · Lucknow
                                </span>
                                <p className="font-sans text-xs text-white/80">
                                    Mahanagar · Hazratganj · Gomti Nagar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
