import React from 'react';
import Link from 'next/link';

function Footer() {
    return (
        <>
            <footer className="bg-primary py-14 text-cream">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 text-center md:px-10">
                    <span className="font-display text-2xl tracking-[0.35em] uppercase">
                        KNK Awadh Salon & Academy · Lucknow
                    </span>
                    <div className="h-px w-40 animate-shimmer bg-gradient-to-r from-transparent via-gold to-transparent bg-[length:200%_100%]" />

                    {/* Footer Navigation */}
                    <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-2 font-sans text-xs tracking-[0.18em] uppercase text-cream/80">
                        <Link href="/" className="transition-colors hover:text-gold">Home</Link>
                        <Link href="/about" className="transition-colors hover:text-gold">About</Link>
                        <Link href="/services/hair" className="transition-colors hover:text-gold">Services</Link>
                        <Link href="/makeup" className="transition-colors hover:text-gold">Makeup</Link>
                        <Link href="/academy" className="transition-colors hover:text-gold">Academy</Link>
                        <Link href="/gallery" className="transition-colors hover:text-gold">Gallery</Link>
                        <Link href="/contact-us" className="text-gold font-medium transition-colors hover:text-gold-soft">Contact Us</Link>
                    </nav>

                    <p className="text-xs tracking-[0.2em] uppercase opacity-70">
                        Awadh · Lucknow · Beauty with artistry
                    </p>
                    <p className="text-[11px] opacity-50">
                        © 2026 KNK Salon. All rights reserved.
                    </p>
                </div>
            </footer>
            {/* floating chat button */}
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