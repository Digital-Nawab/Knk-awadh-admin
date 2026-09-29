"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';

// Fallback categories while API loads
const DEFAULT_SERVICES_MENU = [
    { id: 'nails', label: 'Nails', href: '/services/nails' },
    { id: 'hair', label: 'Hair', href: '/services/hair' },
    { id: 'beauty', label: 'Beauty', href: '/services/beauty' },
    { id: 'facial', label: 'Facial', href: '/services/facial' },
    { id: 'body', label: 'Body', href: '/services/body' },
];
const AESTHETICS_MENU = [
    { id: 'microblading', label: 'Microblading', href: '/microblading' },
    { id: 'laser', label: 'Laser', href: '/laser-treatment' },
];

function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === '/' || pathname === '';
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [servicesMenu, setServicesMenu] = useState(DEFAULT_SERVICES_MENU);
    const [aestheticsOpen, setAestheticsOpen] = useState(false);
    // Fetch dynamic categories from backend API
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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    return (
        <header
            id="siteHeader"
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isHome
                ? (scrolled ? 'bg-cream/95 backdrop-blur text-primary shadow-sm' : 'bg-transparent text-white')
                : (scrolled ? 'bg-white text-primary shadow-sm' : 'bg-[#241D18] text-white shadow-sm')
                }`}
        >
            <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 lg:gap-6 xl:gap-8 px-5 pt-4 pb-2 md:px-8 xl:px-10">
                <a href="/" className="leading-none shrink-0">
                    <img
                        className="w-28 xl:w-32"
                        src="/assets/images/new/logo.png"
                        alt="KNK Awadh"
                    />
                </a>
                <div className="hidden items-center gap-3.5 xl:gap-5 2xl:gap-7 text-[10px] xl:text-[11px] tracking-[0.12em] xl:tracking-[0.15em] 2xl:tracking-[0.18em] uppercase lg:flex whitespace-nowrap shrink-0">
                    <Link
                        href="/"
                        className="relative whitespace-nowrap transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="relative whitespace-nowrap transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
                    >
                        About Us
                    </Link>

                    {/* Services — dynamic dropdown fetched from API */}
                    <div className="group relative">
                        <span
                            className="relative flex cursor-default items-center gap-1 transition-colors group-hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all group-hover:after:w-full whitespace-nowrap"
                        >
                            Services
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={10}
                                height={10}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mt-px transition-transform duration-200 group-hover:rotate-180"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </span>

                        <div className="invisible absolute left-0 top-full mt-3 w-52 rounded-xl bg-cream py-2 text-primary opacity-0 shadow-luxe normal-case tracking-normal transition-all duration-200 group-hover:visible group-hover:opacity-100">
                            {servicesMenu.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="block px-4 py-2 text-xs tracking-[0.1em] uppercase hover:bg-secondary hover:text-gold-deep"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Aesthetics — with dropdown, opens on hover */}
                    {/* <div className="group relative">
                        <Link
                            href="/aesthetic"
                            className="relative flex items-center gap-1 transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full whitespace-nowrap"
                        >
                            Aesthetics
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={10}
                                height={10}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mt-px transition-transform duration-200 group-hover:rotate-180"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </Link>

                        <div className="invisible absolute left-0 top-full mt-3 w-48 rounded-xl bg-cream py-2 text-primary opacity-0 shadow-luxe normal-case tracking-normal transition-all duration-200 group-hover:visible group-hover:opacity-100">
                            {AESTHETICS_MENU.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="block px-4 py-2 text-xs tracking-[0.1em] uppercase hover:bg-secondary hover:text-gold-deep"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div> */}
                    <Link
                        href="/makeup"
                        className="relative whitespace-nowrap transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
                    >
                        Makeup
                    </Link>
                    <Link
                        href="/services/men-grooming"
                        className="relative whitespace-nowrap transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
                    >
                        Men's Grooming
                    </Link>
                    <Link
                        href="/gallery"
                        className="relative whitespace-nowrap transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
                    >
                        Gallery
                    </Link>
                    <Link
                        href="/academy"
                        className="relative whitespace-nowrap transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
                    >
                        Academy
                    </Link>
                    <Link
                        href="https://soft-focus-affair-nextjs.vercel.app/"
                        className="relative whitespace-nowrap transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
                    >
                        Skin & Aesthetics
                    </Link>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <Link
                        href="/book"
                        className="hidden rounded-full bg-gradient-gold px-5 xl:px-6 py-2.5 xl:py-3 text-[11px] tracking-[0.16em] xl:tracking-[0.2em] uppercase text-primary shadow-luxe transition-transform hover:scale-105 sm:inline-block whitespace-nowrap shrink-0"
                    >
                        Book Now
                    </Link>
                    <button
                        id="menuBtn"
                        aria-label="Menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="rounded-full border border-border p-2 lg:hidden"
                    >
                        {menuOpen ? (
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
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        ) : (
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
                                <path d="M4 5h16" />
                                <path d="M4 12h16" />
                                <path d="M4 19h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>
            {/* mobile menu */}
            <div
                id="mobileMenu"
                className={`${menuOpen ? 'flex' : 'hidden'
                    } flex-col gap-1 border-t border-border bg-cream/95 backdrop-blur px-5 py-4 text-xs tracking-[0.2em] uppercase text-primary lg:hidden`}
            >
                <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-2 py-3 hover:bg-secondary"
                >
                    Home
                </Link>
                <Link
                    href="/about"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-2 py-3 hover:bg-secondary"
                >
                    About Us
                </Link>

                {/* Services — accordion on mobile */}
                <div>
                    <button
                        type="button"
                        onClick={() => setServicesOpen((prev) => !prev)}
                        aria-expanded={servicesOpen}
                        className="flex w-full items-center justify-between rounded-lg px-2 py-3 hover:bg-secondary uppercase tracking-[0.2em]"
                    >
                        SERVICES
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={12}
                            height={12}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                    {servicesOpen && (
                        <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                            {servicesMenu.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => {
                                        setServicesOpen(false);
                                        setMenuOpen(false);
                                    }}
                                    className="rounded-lg px-2 py-2 text-[11px] hover:bg-secondary"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Aesthetics — commented out */}
                {/* <div>
                    <button
                        type="button"
                        onClick={() => setAestheticsOpen((prev) => !prev)}
                        aria-expanded={aestheticsOpen}
                        className="flex w-full items-center justify-between rounded-lg px-2 py-3 hover:bg-secondary"
                    >
                        Aesthetics
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={12}
                            height={12}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-200 ${aestheticsOpen ? 'rotate-180' : ''}`}
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                    {aestheticsOpen && (
                        <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                            {AESTHETICS_MENU.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => {
                                        setAestheticsOpen(false);
                                        setMenuOpen(false);
                                    }}
                                    className="rounded-lg px-2 py-2 text-[11px] hover:bg-secondary"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div> */}

                <Link
                    href="/makeup"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-2 py-3 hover:bg-secondary"
                >
                    Makeup
                </Link>
                <Link
                    href="/services/men-grooming"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-2 py-3 hover:bg-secondary"
                >
                    Men's Grooming
                </Link>

                <Link
                    href="/gallery"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-2 py-3 hover:bg-secondary"
                >
                    Gallery
                </Link>
                <Link
                    href="/academy"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-2 py-3 hover:bg-secondary"
                >
                    Academy
                </Link>
                <Link
                    href="https://soft-focus-affair-nextjs.vercel.app/"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-2 py-3 hover:bg-secondary"
                >
                    Skin & Aesthetics
                </Link>
                <Link
                    href="/book"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 rounded-full bg-gradient-gold px-6 py-3 text-center text-primary"
                >
                    Book Now
                </Link>
            </div>
        </header>
    );
}
export default Navbar;