"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, X, Sparkles, Eye } from "lucide-react";
import { portfolioImages, bridalTestimonials } from "@/data/salonLandingData";

export default function PortfolioAndTestimonials() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const testimonials =
    bridalTestimonials && bridalTestimonials.length > 0
      ? bridalTestimonials
      : [
          {
            id: "1",
            name: "Aditi Saxena",
            venue: "KNK Salon Mahanagar",
            rating: 5,
            quote:
              "My hair was severely damaged from frequent heat styling, but KNK's Nanoplastia completely transformed the texture. It feels like pure silk and the caramel balayage looks so natural! Hands down the best hair salon in Lucknow.",
          },
          {
            id: "2",
            name: "Rohit Kapoor",
            venue: "KNK Salon Hazratganj",
            rating: 5,
            quote:
              "The premier men's grooming station in Lucknow. Extremely hygienic, skilled barbers, and the hot towel shave followed by the charcoal detox cleanup is a ritual I now book every month.",
          },
          {
            id: "3",
            name: "Dr. Mansi Varma",
            venue: "KNK Salon Gomti Nagar",
            rating: 5,
            quote:
              "Booked their signature HydraFacial before a medical conference. The instant hydration and glass skin radiance received so many compliments! The nail technicians are true perfectionists.",
          },
        ];

  const current = testimonials[currentTestimonialIndex];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const [portfolioIndex, setPortfolioIndex] = useState(0);

  const nextPortfolio = () => {
    setPortfolioIndex((prev) => (prev + 1) % portfolioImages.length);
  };

  const prevPortfolio = () => {
    setPortfolioIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
  };

  const visiblePortfolio = [0, 1, 2].map(
    (offset) => portfolioImages[(portfolioIndex + offset) % portfolioImages.length]
  );

  const filters = ["All", "Hair Makeover", "Hair Restoration", "Skin & Facial", "Nail Art", "Men's Grooming"];

  const filteredGallery = portfolioImages.filter((item) => {
    if (activeFilter === "All") return true;
    return (
      item.ceremony?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      item.technique?.toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Salon Transformations with prominent large cards */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header with Navigation Arrows */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#161413]">
                    Salon Transformations
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7A726B] font-inter mt-1">
                    Real guests. Real results. Real Lucknow glam.
                  </p>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevPortfolio}
                    className="p-2 rounded-full border border-[#D9CEC1] hover:border-[#B3203F] text-[#524B44] hover:text-[#B3203F] bg-white transition shadow-sm cursor-pointer"
                    aria-label="Previous salon look"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextPortfolio}
                    className="p-2 rounded-full border border-[#D9CEC1] hover:border-[#B3203F] text-[#524B44] hover:text-[#B3203F] bg-white transition shadow-sm cursor-pointer"
                    aria-label="Next salon look"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3 Large, Prominent Salon Looks */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                {visiblePortfolio.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => setLightboxImage(item)}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF5EE] border border-[#EAE2D5] cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <Image
                      src={item.image}
                      alt={item.title || "Real Salon Transformation Lucknow"}
                      fill
                      sizes="(max-width: 640px) 33vw, 22vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Technique Badge on Top */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/55 text-white backdrop-blur-md border border-white/10">
                        {item.technique}
                      </span>
                    </div>

                    {/* Bottom Gradient with Client Info */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end text-white">
                      <p className="text-xs font-semibold leading-tight drop-shadow-sm">
                        {item.client || item.bride}
                      </p>
                      <p className="text-[10px] text-[#EADCC8] leading-tight mt-0.5 drop-shadow-sm truncate">
                        {item.ceremony}
                      </p>
                    </div>

                    {/* Hover Zoom Eye Indicator */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2 rounded-full bg-white/90 text-[#161413] shadow-md">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: View Full Gallery Button + Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFullGallery(true)}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#B3203F] hover:bg-[#961732] text-white font-medium text-xs sm:text-sm shadow-md shadow-[#B3203F]/25 hover:shadow-lg transition-all cursor-pointer"
              >
                <span>View Full Gallery (8+ Looks)</span>
              </button>
              <span className="text-xs text-[#7A726B] italic">
                ★ 100% Real Clients Styled at KNK Awadh
              </span>
            </div>
          </div>

          {/* Right Column: What Our Guests Say */}
          <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl border border-[#EAE2D5] p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] min-h-[300px]">
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#161413] mb-4">
                What Our Guests Say
              </h3>

              {/* 5 Stars */}
              <div className="flex items-center gap-1 text-[#E5A93C] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E5A93C]" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-xs sm:text-sm text-[#524B44] leading-relaxed italic mb-4">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="text-xs sm:text-[13px] font-semibold text-[#161413]">
                - {current.name}, {current.venue || "Lucknow"}
              </div>
            </div>

            {/* Carousel Controls: Dots + Next Arrow */}
            <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#EAE2D5]">
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentTestimonialIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentTestimonialIndex
                        ? "w-6 bg-[#B3203F]"
                        : "w-2 bg-[#D9CEC1] hover:bg-[#B3203F]/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  className="p-2 rounded-full border border-[#D9CEC1] hover:border-[#B3203F] text-[#524B44] hover:text-[#B3203F] bg-white transition cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  className="p-2 rounded-full border border-[#D9CEC1] hover:border-[#B3203F] text-[#524B44] hover:text-[#B3203F] bg-white transition cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-[#161412] text-white rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[3/4] w-full bg-black">
              <Image
                src={lightboxImage.image}
                alt={lightboxImage.title}
                fill
                sizes="600px"
                className="object-contain"
              />
            </div>
            <div className="p-5 bg-[#1B1917]">
              <div className="text-xs text-[#C9A24B] uppercase tracking-wider font-semibold">
                {lightboxImage.ceremony || "Salon Transformation"}
              </div>
              <h4 className="font-playfair text-xl font-bold mt-1">
                {lightboxImage.title}
              </h4>
              <p className="text-xs text-[#B5ABA0] mt-1">
                Guest: {lightboxImage.client || lightboxImage.bride || "KNK Guest"} &bull; Technique: {lightboxImage.technique || "Salon Artistry"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Full Gallery Modal */}
      {showFullGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative max-w-5xl w-full bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#EAE2D5] p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowFullGallery(false)}
              className="absolute top-4 right-4 p-2 text-[#7A726B] hover:text-[#161413] rounded-full hover:bg-[#F5EFE6] transition cursor-pointer"
              aria-label="Close full gallery"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center max-w-lg mx-auto mb-6">
              <span className="text-[11px] font-semibold tracking-widest text-[#B3203F] uppercase">
                COMPLETE LOOKBOOK
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#161413] mt-1">
                Transformations at KNK Awadh
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                    activeFilter === f
                      ? "bg-[#B3203F] text-white"
                      : "bg-[#FAF5EE] text-[#524B44] hover:bg-[#F0E6D5]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxImage(item)}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#FAF5EE] border border-[#EAE2D5] cursor-pointer shadow-sm hover:shadow-lg transition-all"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                    <p className="text-xs font-semibold">{item.client || item.bride}</p>
                    <p className="text-[10px] text-[#E6D3AF]">{item.technique}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
