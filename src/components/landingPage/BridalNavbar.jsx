"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Calendar, Search, ChevronDown, Sparkles } from "lucide-react";
import { useBookingModal } from "@/components/landingPage/BookingContext";

export default function BridalNavbar({ onOpenSearch }) {
  const pathname = usePathname();
  const isLandingPage =
    pathname === "/makeup-artist-lucknow" ||
    pathname === "/makeup-artist-lucknow/" ||
    pathname === "/makeup-landing-page" ||
    pathname === "/landing-page";
  const { openBookingModal } = useBookingModal();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: isLandingPage ? "#hero" : "/makeup-artist-lucknow" },
    { label: "Services", href: isLandingPage ? "#services" : "/makeup-artist-lucknow#services", hasDropdown: true },
    { label: "About", href: isLandingPage ? "#why-choose" : "/makeup-artist-lucknow#why-choose" },
    { label: "Gallery", href: isLandingPage ? "#portfolio" : "/makeup-artist-lucknow#portfolio" },
    { label: "Locations", href: isLandingPage ? "#locations" : "/makeup-artist-lucknow#locations" },
    { label: "Contact", href: isLandingPage ? "#booking" : "/makeup-artist-lucknow#booking" },
  ];

  const serviceDropdown = [
    { title: "HD Bridal Makeup", desc: "4K Camera-Ready Radiance", href: isLandingPage ? "#services" : "/makeup-artist-lucknow#services" },
    { title: "Airbrush Makeup", desc: "18-Hour Waterproof Perfection", href: isLandingPage ? "#services" : "/makeup-artist-lucknow#services" },
    { title: "Engagement & Sagan", desc: "Romantic Soft-Glam Look", href: isLandingPage ? "#services" : "/makeup-artist-lucknow#services" },
    { title: "Reception Glam", desc: "Regal Evening Artistry", href: isLandingPage ? "#services" : "/makeup-artist-lucknow#services" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFFDF9]/95 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.08)] border-b border-[#EAE2D5]"
          : "bg-[#FFFDF9]/95 backdrop-blur-sm border-b border-[#EAE2D5]/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href={isLandingPage ? "#hero" : "/makeup-artist-lucknow"}
            className="group flex items-center focus:outline-none"
            aria-label="KNK Awadh Salon and Academy - Home"
          >
            <div className="relative h-12 sm:h-14 w-24 sm:w-28 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/landing-page/images/logo.png"
                alt="KNK Awadh Salon & Academy"
                fill
                priority
                sizes="(max-width: 640px) 96px, 112px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative group py-2"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!isLandingPage) {
                        window.location.href = "/makeup-artist-lucknow#services";
                        return;
                      }
                      const el = document.getElementById("services");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-1 text-[13.5px] font-medium text-[#2D2926] hover:text-[#B3203F] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#7A726B] group-hover:text-[#B3203F] group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Dropdown menu */}
                  {servicesOpen && (
                    <div className="absolute top-full left-0 w-56 pt-2 z-50 animate-in fade-in duration-150">
                      <div className="bg-[#FFFDF9] rounded-2xl shadow-xl border border-[#EAE2D5] p-1.5 space-y-0.5">
                        {serviceDropdown.map((s) => (
                          <Link
                            key={s.title}
                            href={s.href}
                            onClick={() => setServicesOpen(false)}
                            className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#161413] hover:text-[#B3203F] hover:bg-[#F9F4EB] transition-colors"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13.5px] font-medium text-[#2D2926] hover:text-[#B3203F] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#B3203F] hover:after:w-full after:transition-all"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions: Search Icon + Crimson "Book Appointment" */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-[#7A726B] hover:text-[#161413] hover:bg-[#F5EFE6] rounded-full transition-colors"
              aria-label="Search bridal services"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => openBookingModal()}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#B3203F] hover:bg-[#961732] text-white text-[13.5px] font-medium shadow-md shadow-[#B3203F]/25 hover:shadow-lg hover:shadow-[#B3203F]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Actions: Book button + Hamburger */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="text-xs font-medium bg-[#B3203F] text-white px-3.5 py-1.5 rounded-full shadow-sm hover:bg-[#961732] transition cursor-pointer"
            >
              Book
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#161413] hover:text-[#B3203F] hover:bg-[#F5EFE6] transition focus:outline-none cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-[#EAE2D5] bg-[#FFFDF9] px-4 pt-4 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-[15px] font-medium text-[#161413] hover:bg-[#F9F4EB] hover:text-[#B3203F] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#EAE2D5] space-y-2">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openBookingModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#B3203F] text-white font-medium text-sm shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Bridal Appointment</span>
            </button>
            <a
              href="tel:+918881000552"
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#C9A24B] text-[#161413] text-sm font-medium hover:bg-[#F9F4EB]"
            >
              <Phone className="w-4 h-4 text-[#C9A24B]" />
              <span>Call Helpline: +91 88810 00552</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
