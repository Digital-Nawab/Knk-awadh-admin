import React from 'react';
import Layout from '@/layout/Layout';
import BookingForm from '@/components/makeupComponents/BookingForm';
import { getDynamicMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const revalidate = 60;

export async function generateMetadata() {
    return await getDynamicMetadata('/contact-us', {
        title: "Contact KNK Salon Awadh | Luxury Salons in Mahanagar, Gomti Nagar & Hazratganj",
        description: "Connect with KNK Salon Awadh, Lucknow. Book appointments for hair, beauty, nail extensions, and celebrity bridal makeup. Call +91 95593 21711.",
        image: "/assets/images/new/about.webp"
    });
}

const SALON_BRANCHES = [
    {
        name: "Mahanagar Flagship Studio",
        address: "B-21, Mandir Marg, Near Gole Market, Mahanagar, Lucknow, UP 226006",
        phone: "+91 95593 21711",
        hours: "Mon - Sun: 10:00 AM – 08:30 PM",
        tag: "Flagship & Bridal Lounge"
    },
    {
        name: "Gomti Nagar Studio & Academy",
        address: "Vipul Khand 3, Near Husariya Chauraha, Gomti Nagar, Lucknow, UP 226010",
        phone: "+91 95593 21711",
        hours: "Mon - Sun: 10:00 AM – 08:30 PM",
        tag: "Salon & Cosmetology Academy"
    },
    {
        name: "Hazratganj Heritage Studio",
        address: "Sapru Marg, Near Premier Plaza, Hazratganj, Lucknow, UP 226001",
        phone: "+91 95593 21711",
        hours: "Mon - Sun: 10:00 AM – 08:30 PM",
        tag: "Central Heritage Lounge"
    }
];

export default function ContactPage() {
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Contact Us", href: "/contact-us" }
    ];

    const contactSchema = {
        '@context': 'https://schema.org',
        '@type': 'BeautySalon',
        name: 'KNK Salon Awadh',
        url: 'https://www.knksalon.in/contact-us',
        telephone: '+919559321711',
        email: 'info@knksalon.in',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lucknow',
            addressRegion: 'Uttar Pradesh',
            addressCountry: 'IN'
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '10:00',
                closes: '20:30'
            }
        ]
    };

    return (
        <Layout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />

            <main className="min-h-screen bg-cream text-ink">
                {/* Hero Header */}
                <section className="relative overflow-hidden px-5 pt-28 pb-16 md:px-10 md:pt-36 md:pb-20 border-b border-border/60">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-6">
                            <Breadcrumbs items={breadcrumbs} />
                        </div>

                        <div className="max-w-3xl">
                            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-deep font-semibold block mb-2">
                                We Are Here For You
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl italic text-[#241d18] font-medium leading-tight">
                                Contact KNK Salon Awadh
                            </h1>
                            <div className="my-6 h-px w-20 bg-gold" />
                            <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                                Whether scheduling a bridal consultation, reserving a master hair stylist, or enquiring about academy courses, our concierge team is at your service.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Studios & Form Grid */}
                <section className="py-20 px-5 md:px-10 lg:px-16">
                    <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
                        {/* Left: Studio Locations */}
                        <div className="space-y-6">
                            <div>
                                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep font-semibold block mb-2">
                                    Our Locations
                                </span>
                                <h2 className="font-display text-3xl sm:text-4xl italic text-ink font-medium">
                                    Visit Our Lucknow Studios
                                </h2>
                            </div>

                            <div className="space-y-6 pt-4">
                                {SALON_BRANCHES.map((b, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-3xl border border-border bg-white p-7 transition-all duration-300 hover:border-gold hover:shadow-soft"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-display text-2xl text-ink font-medium">
                                                {b.name}
                                            </span>
                                            <span className="rounded-full bg-cream border border-border px-3 py-1 font-sans text-[9px] uppercase tracking-wider text-gold-deep font-semibold">
                                                {b.tag}
                                            </span>
                                        </div>
                                        <p className="font-sans text-xs text-muted leading-relaxed mb-4">
                                            {b.address}
                                        </p>
                                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/50 text-xs font-sans">
                                            <span className="text-[#403830]">⏰ {b.hours}</span>
                                            <a
                                                href={`tel:${b.phone.replace(/[^0-9+]/g, '')}`}
                                                className="text-gold-deep font-semibold hover:underline"
                                            >
                                                📞 {b.phone}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-7 rounded-3xl bg-secondary/80 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <h4 className="font-display text-xl text-ink font-medium">Instant Concierge Desk</h4>
                                    <p className="font-sans text-xs text-muted mt-1">Available 7 days a week for immediate appointments & assistance.</p>
                                </div>
                                <a
                                    href="https://wa.me/918881000552"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-ink px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream hover:bg-gold-deep transition-colors whitespace-nowrap"
                                >
                                    WhatsApp Us ↗
                                </a>
                            </div>
                        </div>

                        {/* Right: Booking / Enquiry Form */}
                        <div>
                            <div className="rounded-3xl border border-gold/40 bg-white p-8 sm:p-10 shadow-luxe">
                                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep font-semibold block mb-2">
                                    Online Concierge
                                </span>
                                <h3 className="font-display text-2xl sm:text-3xl italic text-ink font-medium mb-6">
                                    Send Us An Enquiry
                                </h3>
                                <BookingForm />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
