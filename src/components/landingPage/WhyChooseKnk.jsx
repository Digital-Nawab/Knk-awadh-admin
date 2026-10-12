"use client";

import Image from "next/image";
import {
  Sparkles,
  Award,
  Palette,
  Scissors,
  Calendar,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Star,
  ShieldCheck,
} from "lucide-react";
import { useBookingModal } from "@/components/landingPage/BookingContext";

export default function WhyChooseKnk() {
  const { openBookingModal } = useBookingModal();
  const highlights = [
    {
      icon: Award,
      title: "12+ Years Master Artistry",
      desc: "Internationally certified lead artists trained in royal Awadhi aesthetics and modern bridal glamour.",
    },
    {
      icon: Palette,
      title: "Custom Pigment & Outfit Matching",
      desc: "Every foundation and lip shade is custom-blended to harmonise with your lehenga fabric, jewelry, and skin undertones.",
    },
    {
      icon: ShieldCheck,
      title: "Ultra-Luxury International Vanity",
      desc: "Only authentic global kits: Dior, Charlotte Tilbury, MAC, Temptu Airbrush, NARS & Huda Beauty.",
    },
    {
      icon: Scissors,
      title: "Complete Hair & Veil Couture",
      desc: "Intricate floral joodas, Hollywood waves, secure Matha Patti alignment, and double-dupatta draping included.",
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Pre-Wedding Consultation",
      desc: "One-on-one shade consultation and bespoke skin prep roadmap to guarantee total peace of mind on your big day.",
    },
  ];

  const whatsappUrl =
    "https://wa.me/918881000552?text=" +
    encodeURIComponent(
      "Hello KNK Salon! I want to understand more about your bridal makeup packages, trial availability and wedding booking."
    );

  return (
    <section
      id="why-choose"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#FFFDF9] relative border-y border-[#EAE2D5] overflow-hidden"
    >
      {/* Subtle luxury background elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#C9A24B]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-[#B3203F]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Rich Editorial Story + Interactive Features */}
          <div className="lg:col-span-7 space-y-7">
            {/* Eyebrow Label */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B3203F]/10 border border-[#B3203F]/20 text-[#B3203F] text-xs font-semibold tracking-widest uppercase mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHY CHOOSE KNK AWADH</span>
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#161413] tracking-tight leading-[1.16]">
                Your Dream Look, <br />
                <span className="italic font-normal text-[#B3203F]">
                  Crafted with Royalty &amp; Precision
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#6E665E] font-inter mt-3 max-w-xl leading-relaxed">
                Every bride is singular. We combine royal Awadhi elegance with modern red-carpet techniques to ensure your look lasts gracefully through 16+ hours of ceremonies, flash photography, and emotional tears.
              </p>
            </div>

            {/* Feature Cards Grid / List */}
            <div className="space-y-3.5 pt-1">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EAE2D5] hover:border-[#C9A24B]/60 hover:shadow-md transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FAF5EE] to-[#F2E5D4] border border-[#C9A24B]/30 text-[#8A152E] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#8A152E] group-hover:text-white transition-all duration-300 shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm sm:text-[15px] font-bold text-[#161413] group-hover:text-[#8A152E] transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[10px] font-mono text-[#A39E98] hidden sm:inline">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#6E665E] mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAs Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#B3203F] hover:bg-[#961732] text-white font-medium text-sm sm:text-[15px] shadow-lg shadow-[#B3203F]/25 hover:shadow-xl hover:shadow-[#B3203F]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Bridal Date</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-[#25D366]/10 border border-[#EAE2D5] hover:border-[#25D366] text-[#161413] font-medium text-sm sm:text-[15px] transition-all duration-200 shadow-xs group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span>WhatsApp Artist</span>
              </a>
            </div>

            {/* Reassurance Micro Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#7A726B] pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B3203F]" />
                <span>Zero Stock Images</span>
              </div>
              <span className="text-[#C9A24B]">&bull;</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B3203F]" />
                <span>Private VIP Suites</span>
              </div>
              <span className="text-[#C9A24B]">&bull;</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B3203F]" />
                <span>Sanitized Kits</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Fashion Editorial Portrait Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Gold Rim Glow */}
              <div className="absolute -inset-2.5 rounded-[32px] bg-gradient-to-tr from-[#C9A24B]/30 via-transparent to-[#B3203F]/25 blur-md -z-10" />

              {/* Main Editorial Image Card */}
              <div className="relative rounded-[28px] overflow-hidden bg-white border border-[#EAE2D5] shadow-2xl group">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF5EE]">
                  <Image
                    src="/landing-page/images/bridal/bride-6.jpg"
                    alt="Real Bride of KNK Awadh Lucknow"
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gentle gradient vignette for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                      <span>100% Real Bride Work</span>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C9A24B]/90 backdrop-blur-md text-[#161413] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <Star className="w-3 h-3 fill-current" />
                      <span>4.9 / 5.0</span>
                    </div>
                  </div>

                  {/* Bottom Luxury Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-5 rounded-2xl bg-[#0E0D0C]/85 backdrop-blur-md border border-white/15 text-white shadow-2xl">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C9A24B] block mb-0.5">
                          AUTHENTIC BRIDAL PORTFOLIO
                        </span>
                        <h4 className="font-playfair text-base sm:text-lg font-bold text-white leading-tight">
                          Real Work Only &bull; Zero Stock Photos
                        </h4>
                        <p className="text-[11px] text-[#C4BCB3] mt-1 leading-snug">
                          Captured live at our Hazratganj, Mahanagar &amp; Gomti Nagar bridal lounges.
                        </p>
                      </div>

                      <a
                        href="#portfolio"
                        className="shrink-0 w-11 h-11 rounded-full bg-[#B3203F] hover:bg-[#961732] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                        aria-label="View Full Bridal Portfolio Gallery"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extra Floating Stat Pill at Top Corner */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white border border-[#EAE2D5] rounded-2xl p-3.5 shadow-xl items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#C9A24B]/30 flex items-center justify-center text-[#B3203F]">
                  <Sparkles className="w-5 h-5 text-[#B3203F]" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#161413] leading-none">
                    2,500+ Brides
                  </div>
                  <div className="text-[10px] text-[#7A726B] font-medium mt-0.5">
                    Styled in Lucknow since 2014
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
