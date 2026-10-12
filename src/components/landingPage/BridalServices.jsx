"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Check, X, Calendar, MessageCircle } from "lucide-react";
import { bridalServices } from "@/data/bridalData";
import { useBookingModal } from "@/components/landingPage/BookingContext";

export default function BridalServices() {
  const { openBookingModal } = useBookingModal();
  const [selectedService, setSelectedService] = useState(null);

  const fallbackServices = [
    {
      id: "hd-bridal",
      title: "HD Bridal Makeup",
      subtitle: "High Definition Camera Ready",
      image: "/landing-page/images/bridal/service-hd.webp",
      description:
        "Ultra-fine micro pigment formulation designed for 4K video lenses. Delivers a natural velvet-satin radiance that looks soft, breathable, and luminous.",
      details:
        "Engineered for 4K video and high-resolution bridal cinematography. Provides a natural velvet-satin glow with weightless micro-pigments that last 14+ hours.",
      features: [
        "Natural velvet matte & satin radiance",
        "Camera-ready 4K micro finish",
        "Custom skin undertone matching",
        "Dior, MAC & NARS luxury vanity kit",
      ],
      idealFor: "All skin types & close-up wedding photography",
      tag: "Most Popular",
    },
    {
      id: "airbrush-bridal",
      title: "Airbrush Bridal Makeup",
      subtitle: "Flawless Porcelain Longevity",
      image: "/landing-page/images/bridal/service-airbrush.webp",
      description:
        "Temptu pro-compressor micro-misting technique creating an untouchable, silicone-based barrier. 18-hour waterproof and tear-resistant perfection.",
      details:
        "Temptu pro-compressor micro-misting technique creating an untouchable, silicone-based barrier. 18-hour waterproof and tear-resistant perfection.",
      features: [
        "18+ hours transfer-proof wear",
        "Zero-contact hygienic mist application",
        "Waterproof, tear & sweat resistant",
        "Seamless poreless porcelain finish",
      ],
      idealFor: "Humid Lucknow weather, long varmala & overnight pheras",
      tag: "18-Hr Waterproof",
    },
    {
      id: "engagement-sagan",
      title: "Engagement & Sagan Look",
      subtitle: "Romantic Dewy Glow",
      image: "/landing-page/images/bridal/service-engagement.webp",
      description:
        "Soft-glam romantic aesthetic featuring luminous glass skin, pastel-friendly tonal eyes, gentle contouring, and modern textured hair styling.",
      details:
        "Soft-glam romantic aesthetic featuring luminous glass skin, pastel-friendly tonal eyes, gentle contouring, and modern textured hair styling.",
      features: [
        "Luminous dewy glass-skin glow",
        "Soft pastel & rose-gold eye tones",
        "Textured waves or modern floral hair",
        "Lightweight comfortable wear for cocktails",
      ],
      idealFor: "Engagement, Roka, Sagan & Cocktail parties",
      tag: "Royal Dewy",
    },
    {
      id: "reception-glam",
      title: "Reception & Cocktail Glam",
      subtitle: "Regal Statement Artistry",
      image: "/landing-page/images/bridal/service-reception.webp",
      description:
        "High-impact evening royalty with dramatic cut-crease or sultry smoky eyes, sculpted cheekbones, sculpted lip contour, and timeless Hollywood waves.",
      details:
        "High-impact evening royalty with dramatic cut-crease or sultry smoky eyes, sculpted cheekbones, sculpted lip contour, and timeless Hollywood bridal waves.",
      features: [
        "Sculpted regal contour & highlight",
        "Sultry smoky or winged statement eyes",
        "Hollywood waves or sculpted royal updo",
        "All-night camera and chandelier illumination",
      ],
      idealFor: "Grand Wedding Reception & Sangeet",
      tag: "Evening Royalty",
    },
  ];

  const services = bridalServices && bridalServices.length > 0 ? bridalServices : fallbackServices;

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#B3203F] uppercase block mb-2">
            OUR SERVICES
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#161413] tracking-tight mb-3">
            Bridal Makeup Services
          </h2>
          <p className="text-sm sm:text-base text-[#7A726B] font-inter">
            Complete bridal beauty solutions for your special day.
          </p>
        </div>

        {/* 4 Cards Grid: Consistent Portrait Aspect Ratio & High-End Aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7 items-stretch">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl border border-[#EAE2D5] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#C5A265] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Standardized 4:5 Aspect Ratio Image with Zero Inconsistent Cropping */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF5EE]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-30 group-hover:opacity-60 transition-opacity" />

                  {/* Floating Tag Badge */}
                  {service.tag && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[#F5DB99] text-[9.5px] font-semibold uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-2.5 h-2.5 text-[#F5DB99]" />
                      <span>{service.tag}</span>
                    </div>
                  )}
                </div>

                {/* Card Body (Compact & Balanced) */}
                <div className="p-4 sm:p-5">
                  {service.subtitle && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B3203F] block mb-1">
                      {service.subtitle}
                    </span>
                  )}
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#161413] group-hover:text-[#B3203F] transition-colors leading-snug mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#7A726B] leading-relaxed line-clamp-2 mb-2.5">
                    {service.description}
                  </p>

                  {/* Key Feature Badges */}
                  {service.features && (
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.slice(0, 2).map((feat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF5EE] border border-[#EAE2D5] text-[9.5px] text-[#524B44] font-medium"
                        >
                          <Check className="w-2.5 h-2.5 text-[#B3203F]" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons at Bottom */}
              <div className="px-4 sm:px-5 pb-4 pt-2.5 border-t border-[#F5EFE6] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#7A726B] hover:text-[#161413] transition-colors cursor-pointer"
                >
                  <span>Explore Look</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => openBookingModal(service.title)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B3203F] hover:bg-[#961732] text-white text-[11px] font-semibold shadow-xs hover:shadow-sm active:scale-95 transition cursor-pointer"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#EAE2D5] overflow-hidden p-6 sm:p-8">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 text-[#7A726B] hover:text-[#161413] rounded-full hover:bg-[#F5EFE6] transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold tracking-widest text-[#B3203F] uppercase">
                Bridal Package Details
              </span>
            </div>

            <h3 className="font-playfair text-2xl font-bold text-[#161413] mb-3">
              {selectedService.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#7A726B] leading-relaxed mb-4">
              {selectedService.details || selectedService.description}
            </p>

            {selectedService.features && (
              <div className="space-y-2 mb-5">
                <span className="text-xs font-semibold uppercase text-[#161413] tracking-wider block">
                  What&apos;s Included:
                </span>
                {selectedService.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[#524B44]">
                    <Check className="w-3.5 h-3.5 text-[#B3203F] shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedService.idealFor && (
              <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5] text-xs text-[#7A726B] mb-5">
                <strong className="text-[#161413]">Recommended For:</strong> {selectedService.idealFor}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const title = selectedService?.title;
                  setSelectedService(null);
                  openBookingModal(title);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#B3203F] hover:bg-[#961732] text-white text-xs sm:text-sm font-medium shadow-md transition cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Look</span>
              </button>
              <a
                href={`https://wa.me/918881000552?text=Hi%20KNK,%20I%20am%20interested%20in%20${encodeURIComponent(
                  selectedService.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs sm:text-sm font-semibold transition shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
