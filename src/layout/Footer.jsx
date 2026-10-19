"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, ArrowUpRight, Sparkles } from 'lucide-react';

// Fallback categories while API loads (matches Navbar 1:1)
const DEFAULT_SERVICES_MENU = [
    { id: 'nails', label: 'Nails', href: '/services/nails' },
    { id: 'hair', label: 'Hair', href: '/services/hair' },
    { id: 'beauty', label: 'Beauty', href: '/services/beauty' },
    { id: 'facial', label: 'Facial', href: '/services/facial' },
    { id: 'body', label: 'Body', href: '/services/body' },
];

const ADDITIONAL_SERVICES = [
    { id: 'makeup', label: 'Makeup', href: '/makeup' },
    { id: 'men-grooming', label: "Men's Grooming", href: '/services/men-grooming' },
    { id: 'academy', label: 'Academy', href: '/makeup-academy' },
];

function Footer() {
    const [servicesMenu, setServicesMenu] = useState(DEFAULT_SERVICES_MENU);

    // Fetch dynamic categories from backend API exactly like Navbar
    useEffect(() => {
        let isMounted = true;
        fetch('/api/services/categories')
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => {
                if (data.categories && Array.isArray(data.categories) && data.categories.length > 0 && isMounted) {
                    setServicesMenu(
                        data.categories
                            .filter((cat) => cat.slug !== 'test')
                            .map((cat) => ({
                                id: cat.slug || String(cat.id),
                                label: cat.name,
                                href: `/services/${cat.slug}`,
                            }))
                    );
                }
            })
            .catch(() => { });

        return () => {
            isMounted = false;
        };
    }, []);

    // Combine dynamic categories with Makeup, Men's Grooming, and Academy
    const allServices = [
        ...servicesMenu.filter((item) => item.id !== 'test' && !['makeup', 'men-grooming', 'academy'].includes(item.id)),
        ...ADDITIONAL_SERVICES,
    ];

    return (
        <>
            <footer className="relative bg-[#1A1410] text-[#FBF7F0] pt-12 sm:pt-16 pb-8 sm:pb-10 border-t border-[#C9A24A]/25 overflow-hidden">
                {/* Subtle Awadhi Jaali background motif */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02]" aria-hidden="true">
                    <svg className="w-full h-full text-white" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="footerJaali" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#footerJaali)" />
                    </svg>
                </div>

                <div className="relative max-w-7xl mx-auto px-5 sm:px-10 z-10 ">
                    {/* =========================================================================
                        MAIN STRUCTURED MULTI-COLUMN FOOTER
                        Mobile: 2 columns (Brand full width, Services & Explore side-by-side, Branches full width)
                        Desktop: Exact 12-column layout (4 + 3 + 2 + 3)
                    ========================================================================== */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 sm:gap-8 pb-10 sm:pb-12 border-b border-[#C9A24A]/15">

                        {/* Column 1: Brand & Heritage (Span 2 on mobile, Span 4 on desktop) */}
                        <div className="col-span-2 md:col-span-2 lg:col-span-4 flex flex-col justify-between">
                            <div>
                                <span className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-medium tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#FBF7F0] block">
                                    KNK Awadh
                                </span>
                                <p className="text-[10.5px] sm:text-[11px] font-['Inter'] tracking-[0.24em] sm:tracking-[0.3em] uppercase text-[#b58a52] mt-1 font-medium">
                                    Salon &amp; Academy · Lucknow
                                </p>

                                <div className="h-px w-24 sm:w-28 animate-shimmer bg-gradient-to-r from-[#b58a52] via-[#EAD9AE] to-transparent my-3.5 sm:my-4" />

                                <p className="text-xs sm:text-[13px] text-[#FBF7F0]/70 font-['Inter'] leading-[1.75] sm:leading-[1.8] max-w-sm">
                                    Lucknow’s premier destination for couture hairstyling, bespoke bridal transformations, clinical aesthetics, and professional beauty academy education.
                                </p>
                            </div>

                            <div className="mt-5 sm:mt-6 pt-2 sm:pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
                                <a
                                    href="https://wa.me/918881000552"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 sm:py-2 rounded-full bg-white/[0.04] border border-[#C9A24A]/30 text-xs font-['Inter'] tracking-[0.12em] uppercase text-[#EAD9AE] hover:bg-[#C9A24A]/15 hover:border-[#C9A24A]/60 transition-all"
                                >
                                    <svg viewBox="0 0 24 24" className="size-3.5 fill-[#25D366] shrink-0" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                    <span>Reserve Appointment</span>
                                </a>
                                <a
                                    href="tel:+918881000551"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 sm:py-2 rounded-full bg-white/[0.04] border border-[#C9A24A]/30 text-xs font-['Inter'] tracking-[0.12em] uppercase text-[#FBF7F0]/80 hover:bg-[#C9A24A]/15 hover:text-[#EAD9AE] transition-all"
                                >
                                    <Phone className="size-3 text-[#b58a52]" />
                                    <span>Call Studio</span>
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Dynamic Services from Navbar / API (Span 1 on mobile, Span 3 on desktop) */}
                        <div className="col-span-1 md:col-span-1 lg:col-span-3">
                            <h3 className="font-['Inter'] text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#b58a52] mb-4 sm:mb-5 flex items-center gap-2">
                                <span>Services</span>
                                <span className="h-px w-6 sm:w-8 bg-[#C9A24A]/30" />
                            </h3>
                            <ul className="space-y-2 sm:space-y-2.5 text-xs font-['Inter'] tracking-[0.12em] sm:tracking-[0.14em] uppercase text-[#FBF7F0]/75">
                                {allServices.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={item.href}
                                            className="hover:text-[#b58a52] hover:translate-x-1 inline-flex items-center gap-1.5 sm:gap-2 transition-all group py-0.5"
                                        >
                                            <span className="text-[#b58a52]/40 group-hover:text-[#b58a52] text-[10px] transition-colors">✦</span>
                                            <span className="break-words">{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Explore / Quick Links (Span 1 on mobile, Span 2 on desktop) */}
                        <div className="col-span-1 md:col-span-1 lg:col-span-2">
                            <h3 className="font-['Inter'] text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#b58a52] mb-4 sm:mb-5 flex items-center gap-2">
                                <span>Explore</span>
                                <span className="h-px w-6 sm:w-8 bg-[#C9A24A]/30" />
                            </h3>
                            <ul className="space-y-2 sm:space-y-2.5 text-xs font-['Inter'] tracking-[0.12em] sm:tracking-[0.14em] uppercase text-[#FBF7F0]/75">
                                <li>
                                    <Link href="/" className="hover:text-[#b58a52] transition-colors py-0.5 inline-block">Home</Link>
                                </li>
                                <li>
                                    <Link href="/about" className="hover:text-[#b58a52] transition-colors py-0.5 inline-block">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/gallery" className="hover:text-[#b58a52] transition-colors py-0.5 inline-block">Gallery</Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="hover:text-[#b58a52] transition-colors py-0.5 inline-block">Blog</Link>
                                </li>
                                <li>
                                    <Link href="/knk-interior" className="text-[#EAD9AE] hover:text-[#b58a52] transition-colors flex items-center gap-1 py-0.5">
                                        <span>KNK Interior</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/offers" className="text-[#EAD9AE] hover:text-[#b58a52] transition-colors py-0.5 inline-block">
                                        KNK Offers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/enroll-for-course" className="text-[#EAD9AE] hover:text-[#b58a52] transition-colors py-0.5 inline-block font-medium">
                                        Enroll For Course
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact-us" className="text-[#b58a52] font-medium hover:text-[#EAD9AE] transition-colors py-0.5 inline-block">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Three Lucknow Branches (Span 2 on mobile, Span 3 on desktop) */}
                        <div className="col-span-2 md:col-span-2 lg:col-span-3">
                            <h3 className="font-['Inter'] text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#b58a52] mb-4 sm:mb-5 flex items-center gap-2">
                                <span>Branches</span>
                                <span className="h-px w-6 sm:w-8 bg-[#C9A24A]/30" />
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 text-xs font-['Inter'] text-[#FBF7F0]/75">
                                <div className="p-3.5 sm:p-0 rounded-xl sm:rounded-none bg-white/[0.03] sm:bg-transparent border border-[#C9A24A]/15 sm:border-none">
                                    <p className="font-medium text-[#FBF7F0] tracking-wide flex items-center gap-1.5">
                                        <MapPin className="size-3.5 text-[#b58a52] shrink-0" />
                                        <span>Hazratganj (Flagship)</span>
                                    </p>
                                    <p className="text-[11.5px] text-[#FBF7F0]/65 mt-1 leading-snug pl-5 sm:pl-0">Ground Floor 11B, Tilak Marg, Dalibagh</p>
                                    <a href="tel:+918881000529" className="text-[11.5px] text-[#b58a52] hover:underline mt-1.5 inline-flex items-center gap-1.5 pl-5 sm:pl-0 font-medium">
                                        <Phone className="size-3 text-[#b58a52]" />
                                        <span>+91 88810 00529</span>
                                    </a>
                                </div>
                                <div className="p-3.5 sm:p-0 rounded-xl sm:rounded-none bg-white/[0.03] sm:bg-transparent border border-[#C9A24A]/15 sm:border-none">
                                    <p className="font-medium text-[#FBF7F0] tracking-wide flex items-center gap-1.5">
                                        <MapPin className="size-3.5 text-[#b58a52] shrink-0" />
                                        <span>Gomti Nagar</span>
                                    </p>
                                    <p className="text-[11.5px] text-[#FBF7F0]/65 mt-1 leading-snug pl-5 sm:pl-0">02/01 Vipul Khand, Gomti Nagar</p>
                                    <a href="tel:+918881000551" className="text-[11.5px] text-[#b58a52] hover:underline mt-1.5 inline-flex items-center gap-1.5 pl-5 sm:pl-0 font-medium">
                                        <Phone className="size-3 text-[#b58a52]" />
                                        <span>+91 88810 00551</span>
                                    </a>
                                </div>
                                <div className="p-3.5 sm:p-0 rounded-xl sm:rounded-none bg-white/[0.03] sm:bg-transparent border border-[#C9A24A]/15 sm:border-none">
                                    <p className="font-medium text-[#FBF7F0] tracking-wide flex items-center gap-1.5">
                                        <MapPin className="size-3.5 text-[#b58a52] shrink-0" />
                                        <span>Mahanagar</span>
                                    </p>
                                    <p className="text-[11.5px] text-[#FBF7F0]/65 mt-1 leading-snug pl-5 sm:pl-0">Mahanagar Crossing, Lucknow</p>
                                    <a href="tel:+919559321711" className="text-[11.5px] text-[#b58a52] hover:underline mt-1.5 inline-flex items-center gap-1.5 pl-5 sm:pl-0 font-medium">
                                        <Phone className="size-3 text-[#b58a52]" />
                                        <span>+91 95593 21711</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* =========================================================================
                        BOTTOM BAR / COPYRIGHT & BRAND SIGN-OFF
                    ========================================================================== */}
                    <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left text-[11px] sm:text-xs font-['Inter'] text-[#FBF7F0]/60 tracking-[0.14em]">
                        <p className="tracking-[0.16em] sm:tracking-[0.2em] uppercase">
                            Awadh · Lucknow · Beauty with artistry
                        </p>
                        <p className="text-[10.5px] sm:text-[11px] text-[#FBF7F0]/50">
                            © 2026 KNK Salon &amp; Academy. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp chat button */}
            <div className="fixed bottom-4 right-4 z-[60] md:bottom-7 md:right-7">
                <a
                    href="https://wa.me/918881000552"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with KNK Salon on WhatsApp"
                    className="grid size-12 sm:size-14 place-items-center rounded-full bg-gradient-gold text-primary shadow-luxe transition-transform hover:scale-110"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="size-6 sm:size-7 fill-current"
                        aria-hidden="true"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                </a>
            </div>
        </>
    );
}

export default Footer;