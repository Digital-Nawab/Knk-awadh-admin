import React from 'react';

function About() {
    return (
        <>
            {/* ============ INTRO / ABOUT ============ */}
            <section className="relative overflow-hidden pb-16 pt-20 md:pt-24">
                <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
                            Luxury Salon & Makeup {" "}
                            <span className="italic">Studio in  &amp; Lucknow</span>
                        </h2>

                        <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                            Professional Makeup, Hair, Nails, Skin & Beauty Services
                        </p>
                        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
                            From bridal and HD makeup to professional hair, nails, facials, beauty and aesthetic treatments, KNK brings premium salon experiences together across Lucknow.
                        </p>
                        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
                            <div>
                                <p className="font-display text-3xl text-gold-deep md:text-4xl">
                                    25k+
                                </p>
                                <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-muted">
                                    Happy Clients
                                </p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-gold-deep md:text-4xl">
                                    12+
                                </p>
                                <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-muted">
                                    Years Experience
                                </p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-gold-deep md:text-4xl">
                                    4.9/5
                                </p>
                                <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-muted">
                                    Google Rating
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-[10rem_10rem_2rem_2rem] border border-gold-soft/60 shadow-luxe animate-floatSoft">
                            <img
                                src="/assets/images/new/about.webp"
                                alt="KNK Salon client with a glossy blow-dry finish"
                                width={600}
                                height={800}
                                loading="lazy"
                                decoding="async"
                                className="h-[28rem] w-full object-cover md:h-[36rem]"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-2 rounded-2xl border border-border bg-card/90 px-6 py-5 shadow-soft backdrop-blur md:-left-10">
                            <p className="font-display text-2xl text-gold-deep">Open Today</p>
                            <p className="text-xs text-muted">10:00 AM – 8:30 PM</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default About;