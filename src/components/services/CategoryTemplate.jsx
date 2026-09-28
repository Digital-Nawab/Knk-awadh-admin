import React from 'react';
import Layout from '@/layout/Layout';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ServiceFaq from './ServiceFaq';
import ServiceBookingCta from './ServiceBookingCta';
import WhyChooseKnk from './WhyChooseKnk';

export default function CategoryTemplate({
    category,
    galleryImages = [],
    testimonials = [],
    featuredService = null
}) {
    if (!category) return null;

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: category.name, href: category.url }
    ];

    const defaultGallery = galleryImages.length > 0 ? galleryImages : [
        "/assets/images/new/home/bridal/1.webp",
        "/assets/images/new/home/bridal/10.webp",
        "/assets/images/new/home/bridal/15.webp",
        "/assets/images/new/home/bridal/20.webp",
        "/assets/images/new/home/celebrity/4.webp",
        "/assets/images/new/home/celebrity/7.webp"
    ];

    const defaultTestimonials = testimonials.length > 0 ? testimonials : [
        {
            name: "Simran Mehrotra",
            role: "Bridal Client",
            text: "Booked KNK for my engagement and wedding looks. The attention to detail and calm luxury setting took away all my wedding-day stress."
        },
        {
            name: "Rohit Khanna",
            role: "Executive Grooming",
            text: "The precision haircut and hot towel shave at KNK Men's Grooming is unmatched in Lucknow. Superb hygiene and senior barbers."
        },
        {
            name: "Minakshi Sarang",
            role: "Salon & Hair Client",
            text: "Had my Nanoplastia and hair colour done here. My strands feel like silk even months later without any frizz in the humid weather."
        }
    ];

    return (
        <Layout>
            <main className="min-h-screen bg-cream text-ink">
                {/* 1. Hero Section */}
                <section className="relative overflow-hidden px-5 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24 lg:px-16 border-b border-border/60">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl"
                    />

                    <div className="mx-auto max-w-7xl">
                        <div className="mb-6">
                            <Breadcrumbs items={breadcrumbs} />
                        </div>

                        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                            <div className="relative z-10 max-w-2xl">
                                <div className="mb-4 inline-flex items-center gap-3">
                                    <span className="h-px w-8 bg-gold" />
                                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-deep">
                                        {category.eyebrow || "Artistry & Care"}
                                    </span>
                                    <span className="h-px w-8 bg-gold" />
                                </div>

                                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium leading-[1.05] tracking-tight text-[#241d18]">
                                    {category.h1}
                                </h1>

                                <div className="my-6 h-px w-24 bg-gradient-to-r from-gold via-gold-soft to-transparent" />

                                <p className="font-sans text-sm sm:text-base leading-relaxed text-muted max-w-xl">
                                    {category.longDesc || category.shortDesc}
                                </p>

                                <div className="mt-8 flex flex-wrap items-center gap-4">
                                    <a
                                        href="#book"
                                        data-booking-trigger="true"
                                        data-service={category.name}
                                        className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-luxe transition-all duration-300 hover:scale-105 cursor-pointer"
                                    >
                                        Book An Appointment
                                    </a>

                                    <a
                                        href="#services-grid"
                                        className="inline-flex items-center justify-center rounded-full border border-gold/60 bg-cream/60 px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#403830] transition-colors hover:bg-gold/15"
                                    >
                                        Explore All Services ↓
                                    </a>
                                </div>
                            </div>

                            <div className="relative flex justify-center lg:justify-end">
                                <div className="relative aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-3xl border border-gold/40 bg-secondary p-2 shadow-2xl">
                                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                                        <img
                                            src={category.image}
                                            alt={category.h1}
                                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                            loading="eager"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                                            <span className="font-display text-lg italic tracking-wide">
                                                KNK Salon Awadh
                                            </span>
                                            <span className="rounded-full bg-gold/90 backdrop-blur px-3.5 py-1 text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-primary">
                                                {category.badge || "Signature Menu"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Category Highlights / Intro Bar */}
                {category.highlights && (
                    <section className="bg-secondary/60 py-10 px-5 md:px-10 lg:px-16 border-b border-border">
                        <div className="mx-auto max-w-7xl">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {category.highlights.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-deep text-xs font-bold">
                                            ✦
                                        </span>
                                        <span className="font-sans text-xs font-medium text-[#403830]">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 3. Service Grid */}
                <section id="services-grid" className="py-20 px-5 md:px-10 lg:px-16 border-b border-border/50">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-deep font-semibold block mb-2">
                                Curated Menu
                            </span>
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-ink font-medium">
                                {category.name} Services
                            </h2>
                            <p className="mt-3 text-xs sm:text-sm text-muted font-sans leading-relaxed">
                                Select a specific treatment below to learn about the process, inclusions, and benefits.
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {category.services.map((svc, idx) => (
                                <div
                                    key={svc.slug}
                                    className="group flex flex-col justify-between rounded-3xl border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-luxe"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-display text-2xl italic text-gold-deep">
                                                0{idx + 1}
                                            </span>
                                            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-muted/70 bg-cream px-2.5 py-1 rounded-full border border-border">
                                                {category.name}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium mb-3 group-hover:text-gold-deep transition-colors">
                                            {svc.name}
                                        </h3>
                                        <p className="font-sans text-xs sm:text-[13px] text-muted leading-relaxed mb-6">
                                            {svc.shortDesc}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                                        <Link
                                            href={svc.url}
                                            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-ink group-hover:text-gold-deep transition-colors"
                                        >
                                            <span>Explore Details</span>
                                            <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                                        </Link>
                                        <a
                                            href="#book"
                                            data-booking-trigger="true"
                                            data-service={svc.name}
                                            className="rounded-full bg-cream hover:bg-gold hover:text-white px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-[#403830] transition-colors border border-border cursor-pointer"
                                        >
                                            Book Slot
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Featured Spotlight (if available) */}
                {featuredService && (
                    <section className="py-20 px-5 md:px-10 lg:px-16 bg-[#fcf9f4] border-b border-border/50">
                        <div className="mx-auto max-w-7xl">
                            <div className="rounded-3xl border border-gold/40 bg-white p-8 sm:p-12 shadow-soft grid lg:grid-cols-2 gap-10 items-center">
                                <div>
                                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep font-semibold block mb-2">
                                        Spotlight Treatment
                                    </span>
                                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-ink font-medium mb-4">
                                        {featuredService.title}
                                    </h3>
                                    <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed mb-6">
                                        {featuredService.desc}
                                    </p>
                                    <div className="space-y-2 mb-8">
                                        {featuredService.bullets?.map((b, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs font-sans text-[#403830]">
                                                <span className="text-gold">✦</span>
                                                <span>{b}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        href={featuredService.url}
                                        className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream hover:bg-gold-deep transition-colors"
                                    >
                                        Discover {featuredService.title} →
                                    </Link>
                                </div>
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border">
                                    <img
                                        src={featuredService.image || category.image}
                                        alt={featuredService.title}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. Why Choose KNK */}
                <WhyChooseKnk
                    title={`The KNK Standard in ${category.name}`}
                />

                {/* 6. Gallery Section */}
                <section className="py-20 px-5 md:px-10 lg:px-16 bg-cream border-b border-border/50">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-deep font-semibold block mb-2">
                                Visual Artistry
                            </span>
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-ink font-medium">
                                {category.name} Lookbook & Portfolio
                            </h2>
                            <p className="mt-2 text-xs sm:text-sm text-muted font-sans">
                                Real clients, authentic transformations, and timeless beauty captured at our Awadh studios.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {defaultGallery.map((img, i) => (
                                <div
                                    key={i}
                                    className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary"
                                >
                                    <img
                                        src={img}
                                        alt={`KNK ${category.name} portfolio look ${i + 1}`}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gold/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. Testimonials */}
                <section className="py-20 px-5 md:px-10 lg:px-16 bg-[#fcf9f4] border-b border-border/50">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-deep font-semibold block mb-2">
                                Client Love
                            </span>
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-ink font-medium">
                                Words from Our Guests
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {defaultTestimonials.map((t, i) => (
                                <div
                                    key={i}
                                    className="rounded-3xl border border-border bg-white p-8 flex flex-col justify-between shadow-sm"
                                >
                                    <div>
                                        <div className="flex gap-1 text-gold mb-4 text-sm">
                                            ★★★★★
                                        </div>
                                        <p className="font-sans text-xs sm:text-sm text-[#403830] leading-relaxed italic mb-6">
                                            "{t.text}"
                                        </p>
                                    </div>
                                    <div className="border-t border-border/60 pt-4">
                                        <span className="font-display text-lg text-ink block font-medium">
                                            {t.name}
                                        </span>
                                        <span className="font-sans text-[10px] uppercase tracking-wider text-muted">
                                            {t.role || "Verified Guest"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8. FAQs */}
                <ServiceFaq
                    title={`Frequently Asked Questions on ${category.name}`}
                    subtitle="Common queries answered by our senior artists."
                    faqs={category.faqs || []}
                />

                {/* 9. Booking CTA */}
                <ServiceBookingCta
                    title={`Experience Luxury ${category.name} in Lucknow`}
                    subtitle={`Reserve your appointment at KNK Salon Awadh. Our concierge will tailor the ideal slot and specialist for your visit.`}
                    serviceName={category.name}
                />
            </main>
        </Layout>
    );
}
