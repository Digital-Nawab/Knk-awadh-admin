"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Calendar } from "lucide-react";
import { useBookingModal } from "./BookingContext";

export default function BridalFooter() {
  const pathname = usePathname();
  const isLandingPage =
    pathname === "/salon-services-lucknow" ||
    pathname === "/salon-services-lucknow/" ||
    pathname === "/salon-landing-page" ||
    pathname === "/salon-landing-page/";
  const { openBookingModal } = useBookingModal();
  const branches = [
    {
      name: "Hazratganj (Flagship)",
      address: "Ground Floor 11B, Tilak Marg, Dalibagh",
      phone: "+91 88810 00529",
      tel: "tel:+918881000529",
    },
    {
      name: "Gomti Nagar",
      address: "02/01 Vipul Khand, Gomti Nagar",
      phone: "+91 88810 00551",
      tel: "tel:+918881000551",
    },
    {
      name: "Mahanagar",
      address: "Mahanagar Crossing, Lucknow",
      phone: "+91 95593 21711",
      tel: "tel:+919559321711",
    },
  ];

  return (
    <footer className="bg-[#FFFDF9] text-[#161413] border-t border-[#EAE2D5] pt-6 sm:pt-8 pb-20 md:pb-6 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 pb-5 sm:pb-6 border-b border-[#EAE2D5]">
          {/* Brand Info */}
          <div className="md:col-span-1 lg:col-span-3 space-y-2.5">
            <Link href={isLandingPage ? "#hero" : "/salon-services-lucknow"} className="inline-block group focus:outline-none">
              <div className="relative h-9 sm:h-11 w-24 sm:w-28 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/salon-landing-page/images/logo.png"
                  alt="KNK Awadh Salon & Academy"
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-[#7A726B] leading-relaxed max-w-sm text-[11px] sm:text-xs">
              Lucknow&apos;s premier luxury salon, hair studio and beauty academy. Dedicated to precision hair styling, French balayage, Nanoplastia, HydraFacials and beauty craft since 2014.
            </p>

            <div className="flex items-center gap-2 pt-0.5 text-[#7A726B]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-[#FAF5EE] border border-[#EAE2D5] flex items-center justify-center hover:text-[#B3203F] hover:border-[#B3203F] transition"
                aria-label="Instagram"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-[#FAF5EE] border border-[#EAE2D5] flex items-center justify-center hover:text-[#B3203F] hover:border-[#B3203F] transition"
                aria-label="Facebook"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-[#FAF5EE] border border-[#EAE2D5] flex items-center justify-center hover:text-[#B3203F] hover:border-[#B3203F] transition"
                aria-label="YouTube"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links & Our Services in 1 Row on Mobile */}
          <div className="md:col-span-1 lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            {/* Quick Links */}
            <div className="space-y-2">
              <h4 className="font-playfair text-xs sm:text-sm font-bold text-[#161413] uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-1 sm:space-y-1.5 text-[#7A726B] text-[11px] sm:text-xs">
                <li>
                  <Link href={isLandingPage ? "#hero" : "/salon-services-lucknow"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href={isLandingPage ? "#services" : "/salon-services-lucknow#services"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href={isLandingPage ? "#why-choose" : "/salon-services-lucknow#why-choose"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    About
                  </Link>
                </li>
                <li>
                  <Link href={isLandingPage ? "#portfolio" : "/salon-services-lucknow#portfolio"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href={isLandingPage ? "#locations" : "/salon-services-lucknow#locations"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Locations
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="hover:text-[#B3203F] text-left transition-colors inline-block py-0.5 cursor-pointer font-medium text-[#B3203F]"
                  >
                    Book Salon Appointment
                  </button>
                </li>
                <li>
                  <Link href={isLandingPage ? "#booking" : "/salon-services-lucknow#booking"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Contact &amp; FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Our Services */}
            <div className="space-y-2">
              <h4 className="font-playfair text-xs sm:text-sm font-bold text-[#161413] uppercase tracking-wider">
                Our Services
              </h4>
              <ul className="space-y-1 sm:space-y-1.5 text-[#7A726B] text-[11px] sm:text-xs">
                <li>
                  <Link href={isLandingPage ? "#services" : "/salon-services-lucknow#services"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Hair Services
                  </Link>
                </li>
                <li>
                  <Link href={isLandingPage ? "#services" : "/salon-services-lucknow#services"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Makeup Services
                  </Link>
                </li>
                <li>
                  <Link href={isLandingPage ? "#services" : "/salon-services-lucknow#services"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Skin and Facial
                  </Link>
                </li>
                <li>
                  <Link href={isLandingPage ? "#services" : "/salon-services-lucknow#services"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Nail Services
                  </Link>
                </li>
                <li>
                  <Link href={isLandingPage ? "#services" : "/salon-services-lucknow#services"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Beauty Services
                  </Link>
                </li>
                <li>
                  <Link href={isLandingPage ? "#services" : "/salon-services-lucknow#services"} className="hover:text-[#B3203F] transition-colors inline-block py-0.5">
                    Men&apos;s Grooming
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Branches Section */}
          <div className="md:col-span-2 lg:col-span-4 space-y-2">
            <h4 className="font-playfair text-xs sm:text-sm font-bold text-[#161413] uppercase tracking-wider">
              Branches
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-2.5">
              {branches.map((branch) => (
                <div
                  key={branch.name}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-[#FAF5EE]/70 border border-[#EAE2D5] hover:border-[#C5A265] transition-colors"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <p className="font-semibold text-[#161413] text-[11px] sm:text-xs">
                      {branch.name}
                    </p>
                    <a
                      href={branch.tel}
                      className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-medium text-[#B3203F] hover:underline shrink-0"
                    >
                      <Phone className="w-2.5 h-2.5 text-[#C5A265] shrink-0" />
                      <span>{branch.phone}</span>
                    </a>
                  </div>
                  <p className="text-[#7A726B] text-[10.5px] sm:text-[11px] leading-tight mt-0.5 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-[#B3203F] shrink-0" />
                    <span className="truncate">{branch.address}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3.5 sm:pt-4 flex flex-col sm:flex-row items-center justify-between text-[#8A8177] gap-2 text-[11px] text-center sm:text-left">
          <div>
            &copy; 2026 KNK Awadh Salon &amp; Academy. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <a href="#hero" className="hover:underline hover:text-[#B3203F] transition-colors">
              Privacy Policy
            </a>
            <span className="text-[#C5A265]">&bull;</span>
            <a href="#hero" className="hover:underline hover:text-[#B3203F] transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
