"use client";

import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { LOGO_ON_DARK, CONTACT, NAV_LINKS, BOOK_CONSULTATION_HASH } from "./brand";
import { Reveal } from "./Reveal";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Footer = () => (
 <footer className="relative overflow-hidden bg-[#6B4324] px-4 py-10 md:px-10 md:py-16">
    <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-background/20 bg-[#6B4324] text-secondary-foreground grain">
      <div className="flex flex-col items-center px-6 py-14 text-center md:px-16 md:py-20">
        <div className="flex flex-col items-center">
          <img src={LOGO_ON_DARK} alt="KNK SKKIN" className="h-16 w-auto md:h-20" />
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-secondary-foreground/70">
            Salon &amp; Academy
          </p>
        </div>

        <div>
          <ul className="mt-8 flex items-center justify-center gap-4">
            <li>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-background/25 text-secondary-foreground/70 transition-colors duration-500 ease-lux hover:border-gold hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT.phonePlaceholder.replace(/\s+/g, '')}`}
                aria-label={`Call KNK SKKIN ${CONTACT.phonePlaceholder}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-background/25 text-secondary-foreground/70 transition-colors duration-500 ease-lux hover:border-gold hover:text-gold"
              >
                <Phone className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Get directions to KNK SKKIN"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-background/25 text-secondary-foreground/70 transition-colors duration-500 ease-lux hover:border-gold hover:text-gold"
              >
                <MapPin className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 space-y-1.5">
          <p className="text-sm text-secondary-foreground/80">
            <a
              href={`tel:${CONTACT.phonePlaceholder.replace(/\s+/g, '')}`}
              className="hover:text-gold transition-colors"
            >
              {CONTACT.phonePlaceholder}
            </a>
          </p>
          <p className="text-sm text-secondary-foreground/80">
            <a
              href={`mailto:${CONTACT.emailPlaceholder}`}
              className="hover:text-gold transition-colors"
            >
              {CONTACT.emailPlaceholder}
            </a>
          </p>
          <address className="not-italic text-sm text-secondary-foreground/80">
            {CONTACT.address}, {CONTACT.city}
          </address>
        </div>

        <div>
          <Link
            href={BOOK_CONSULTATION_HASH}
            className="group mt-8 inline-flex items-center gap-4 border border-background/25 px-6 py-4 label-xs transition-colors duration-500 ease-lux hover:bg-background hover:text-foreground"
          >
            Book a consultation
            <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-background/10 px-6 py-5 text-center sm:flex-row sm:justify-between md:px-16">
        <p className="label-xs text-secondary-foreground/40">
          © {new Date().getFullYear()} KNK SKKIN — KNK Awadh Salon &amp; Academy
        </p>
        <p className="label-xs text-secondary-foreground/40">Skin, understood.</p>
      </div>
    </div>
  </footer>
);

export default Footer;