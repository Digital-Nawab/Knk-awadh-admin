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
    { id: 'test', label: 'Test', href: '/services/test' },
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
                        data.categories.map((cat) => ({
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

    return (
        <>
            <footer className="relative bg-[#1A1410] text-[#FBF7F0] pt-16 pb-10 border-t border-[#C9A24A]/25 overflow-hidden">
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

                <div className="relative max-w-7xl mx-auto px-6 sm:px-10 z-10">
                    {/* =========================================================================
                        MAIN STRUCTURED MULTI-COLUMN FOOTER
                    ========================================================================== */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#C9A24A]/15">

                        {/* Column 1: Brand & Heritage (Span 4) */}
                        <div className="lg:col-span-4 flex flex-col justify-between">
                            <div>
                                <span className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-medium tracking-[0.2em] uppercase text-[#FBF7F0] block">
                                    KNK Awadh
                                </span>
                                <p className="text-[11px] font-['Inter'] tracking-[0.3em] uppercase text-[#b58a52] mt-1 font-medium">
                                    Salon &amp; Academy · Lucknow
                                </p>

                                <div className="h-px w-28 animate-shimmer bg-gradient-to-r from-[#b58a52] via-[#EAD9AE] to-transparent my-4" />

                                <p className="text-xs sm:text-[13px] text-[#FBF7F0]/70 font-['Inter'] leading-[1.8] max-w-sm">
                                    Lucknow’s premier destination for couture hairstyling, bespoke bridal transformations, clinical aesthetics, and professional beauty academy education.
                                </p>
                            </div>

                            <div className="mt-6 pt-4">
                                <a
                                    href="https://wa.me/918881000552"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-[#C9A24A]/30 text-xs font-['Inter'] tracking-[0.12em] uppercase text-[#EAD9AE] hover:bg-[#C9A24A]/15 hover:border-[#C9A24A]/60 transition-all"
                                >
                                    <Sparkles className="size-3 text-[#b58a52]" />
                                    <span>Reserve Appointment</span>
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Dynamic Services from Navbar / API (Span 3) */}
                        <div className="lg:col-span-3">
                            <h3 className="font-['Inter'] text-xs font-semibold tracking-[0.25em] uppercase text-[#b58a52] mb-5 flex items-center gap-2">
                                <span>Services</span>
                                <span className="h-px w-8 bg-[#C9A24A]/30" />
                            </h3>
                            <ul className="space-y-2.5 text-xs font-['Inter'] tracking-[0.14em] uppercase text-[#FBF7F0]/75">
                                {servicesMenu.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={item.href}
                                            className="hover:text-[#b58a52] hover:translate-x-1 inline-flex items-center gap-2 transition-all group"
                                        >
                                            <span className="text-[#b58a52]/40 group-hover:text-[#b58a52] text-[10px] transition-colors">✦</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Explore / Quick Links (Span 2) */}
                        <div className="lg:col-span-2">
                            <h3 className="font-['Inter'] text-xs font-semibold tracking-[0.25em] uppercase text-[#b58a52] mb-5 flex items-center gap-2">
                                <span>Explore</span>
                                <span className="h-px w-8 bg-[#C9A24A]/30" />
                            </h3>
                            <ul className="space-y-2.5 text-xs font-['Inter'] tracking-[0.14em] uppercase text-[#FBF7F0]/75">
                                <li>
                                    <Link href="/" className="hover:text-[#b58a52] transition-colors">Home</Link>
                                </li>
                                <li>
                                    <Link href="/about" className="hover:text-[#b58a52] transition-colors">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/makeup" className="hover:text-[#b58a52] transition-colors">Makeup</Link>
                                </li>
                                <li>
                                    <Link href="/academy" className="hover:text-[#b58a52] transition-colors">Academy</Link>
                                </li>
                                <li>
                                    <Link href="/gallery" className="hover:text-[#b58a52] transition-colors">Gallery</Link>
                                </li>
                                <li>
                                    <Link href="/knk-interior" className="text-[#EAD9AE] hover:text-[#b58a52] transition-colors flex items-center gap-1">
                                        <span>KNK Interior</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact-us" className="text-[#b58a52] font-medium hover:text-[#EAD9AE] transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Three Lucknow Branches (Span 3) */}
                        <div className="lg:col-span-3">
                            <h3 className="font-['Inter'] text-xs font-semibold tracking-[0.25em] uppercase text-[#b58a52] mb-5 flex items-center gap-2">
                                <span>Branches</span>
                                <span className="h-px w-8 bg-[#C9A24A]/30" />
                            </h3>
                            <div className="space-y-4 text-xs font-['Inter'] text-[#FBF7F0]/75">
                                <div>
                                    <p className="font-medium text-[#FBF7F0] tracking-wide">Hazratganj (Flagship)</p>
                                    <p className="text-[11px] text-[#FBF7F0]/60 mt-0.5 leading-snug">Ground Floor 11B, Tilak Marg, Dalibagh</p>
                                    <a href="tel:+918881000529" className="text-[11px] text-[#b58a52] hover:underline mt-0.5 inline-block">
                                        +91 88810 00529
                                    </a>
                                </div>
                                <div>
                                    <p className="font-medium text-[#FBF7F0] tracking-wide">Gomti Nagar</p>
                                    <p className="text-[11px] text-[#FBF7F0]/60 mt-0.5 leading-snug">02/01 Vipul Khand, Gomti Nagar</p>
                                    <a href="tel:+918881000551" className="text-[11px] text-[#b58a52] hover:underline mt-0.5 inline-block">
                                        +91 88810 00551
                                    </a>
                                </div>
                                <div>
                                    <p className="font-medium text-[#FBF7F0] tracking-wide">Mahanagar</p>
                                    <p className="text-[11px] text-[#FBF7F0]/60 mt-0.5 leading-snug">Mahanagar Crossing, Lucknow</p>
                                    <a href="tel:+919559321711" className="text-[11px] text-[#b58a52] hover:underline mt-0.5 inline-block">
                                        +91 95593 21711
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* =========================================================================
                        BOTTOM BAR / COPYRIGHT & BRAND SIGN-OFF
                    ========================================================================== */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-['Inter'] text-[#FBF7F0]/50 tracking-[0.14em]">
                        <p className="tracking-[0.2em] uppercase">
                            Awadh · Lucknow · Beauty with artistry
                        </p>
                        <p className="text-[11px]">
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
                    className="grid size-14 place-items-center rounded-full bg-gradient-gold text-primary shadow-luxe transition-transform hover:scale-110"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                    </svg>
                </a>
            </div>
        </>
    );
}

export default Footer;