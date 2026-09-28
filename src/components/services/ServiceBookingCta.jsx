import React from 'react';
import BookingForm from '@/components/makeupComponents/BookingForm';

export default function ServiceBookingCta({
    title = "Reserve Your Artistry Experience",
    subtitle = "Schedule a bespoke session with our master stylists and bridal artists at KNK Salon Awadh.",
    serviceName = "Salon Service"
}) {
    return (
        <section id="book" className="bg-[#f7f2e7] py-20 px-5 md:px-10 lg:px-16 text-ink">
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-px w-6 bg-gold" />
                            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep font-semibold">
                                Priority Reservation
                            </span>
                        </div>
                        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl italic text-[#241d18] font-medium leading-[1.05]">
                            {title}
                        </h2>
                        <div className="my-6 h-px w-24 bg-gold" />
                        <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed max-w-lg mb-8">
                            {subtitle}
                        </p>

                        <div className="space-y-4 rounded-2xl bg-white/70 border border-border p-6 max-w-md">
                            <h4 className="font-display text-xl text-ink font-medium">Prefer Instant Contact?</h4>
                            <p className="font-sans text-xs text-muted">
                                Reach our concierge desk directly for same-day slots, custom wedding packages, or bridal trials.
                            </p>
                            <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                <a
                                    href="tel:+919559321711"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-cream hover:bg-gold-deep transition-colors"
                                >
                                    Call +91 95593 21711
                                </a>
                                <a
                                    href="https://wa.me/918881000552"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-ink hover:bg-cream transition-colors"
                                >
                                    WhatsApp Concierge
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center max-w-md">
                            <div>
                                <span className="font-display text-2xl text-gold-deep block italic">3</span>
                                <span className="font-sans text-[10px] uppercase tracking-wider text-muted">Lucknow Studios</span>
                            </div>
                            <div>
                                <span className="font-display text-2xl text-gold-deep block italic">15+</span>
                                <span className="font-sans text-[10px] uppercase tracking-wider text-muted">Years Artistry</span>
                            </div>
                            <div>
                                <span className="font-display text-2xl text-gold-deep block italic">100%</span>
                                <span className="font-sans text-[10px] uppercase tracking-wider text-muted">Genuine Products</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="rounded-3xl border border-gold/40 bg-white p-6 sm:p-8 shadow-luxe">
                            <div className="mb-6">
                                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-deep font-semibold block mb-1">
                                    Appointment Request
                                </span>
                                <h3 className="font-display text-2xl italic text-ink">
                                    Book {serviceName}
                                </h3>
                            </div>
                            <BookingForm serviceName={serviceName} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
