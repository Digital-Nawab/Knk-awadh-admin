"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function MakeupComparison() {
  const [showFullSpecs, setShowFullSpecs] = useState(false);

  const hdPoints = [
    "Camera-ready 4K soft-focus finish",
    "Natural, breathable second-skin glow",
    "Best for dry/normal skin & winter weddings",
  ];

  const airbrushPoints = [
    "18+ Hours tear-proof & sweat-proof wear",
    "Poreless matte porcelain coverage",
    "Best for humid weather & long overnight pheras",
  ];

  const fullSpecs = [
    { feature: "Finish Radiance", hd: "Velvet satin dewy skin finish", airbrush: "Poreless matte porcelain veil" },
    { feature: "Wear Longevity", hd: "12 to 14 Hours", airbrush: "18+ Hours (100% Tear-Proof)" },
    { feature: "Application Tool", hd: "Artisan precision brushes & sponges", airbrush: "Temptu Pro micro-compressor air mist" },
    { feature: "Best Weather", hd: "Winter & indoor AC celebrations", airbrush: "Summer, humid weather & long outdoor pheras" },
    { feature: "Touch-up Needed", hd: "Minimal powder dab", airbrush: "Zero touch-up required" },
  ];

  const artistWhatsApp =
    "https://wa.me/918881000552?text=" +
    encodeURIComponent(
      "Hello KNK Bridal Expert, I am confused between HD and Airbrush bridal makeup. Could you please advise me for my wedding day?"
    );

  return (
    <section id="comparison" className="py-14 sm:py-20 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Minimal Section Header */}
        <div className="text-left max-w-3xl mb-8 sm:mb-10">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#B3203F] uppercase block mb-1.5">
            MAKEUP COMPARISON
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#161413] tracking-tight">
            HD vs Airbrush Bridal Makeup
          </h2>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Card: HD vs Airbrush Side by Side (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EAE2D5] p-6 sm:p-7 shadow-[0_2px_16px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#EAE2D5]">
              {/* HD Makeup Column */}
              <div className="sm:pr-6 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B3203F]" />
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#161413]">
                    HD Makeup
                  </h3>
                </div>

                <div className="space-y-2.5 pt-1">
                  {hdPoints.map((pt) => (
                    <div key={pt} className="flex items-center gap-2.5 text-xs sm:text-[13.5px] text-[#524B44]">
                      <Check className="w-4 h-4 text-[#B3203F] shrink-0 stroke-[2.5]" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Airbrush Makeup Column */}
              <div className="sm:pl-6 pt-5 sm:pt-0 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C9A24B]" />
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#161413]">
                    Airbrush Makeup
                  </h3>
                </div>

                <div className="space-y-2.5 pt-1">
                  {airbrushPoints.map((pt) => (
                    <div key={pt} className="flex items-center gap-2.5 text-xs sm:text-[13.5px] text-[#524B44]">
                      <Check className="w-4 h-4 text-[#B3203F] shrink-0 stroke-[2.5]" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expandable Technical Comparison Link */}
            <div className="pt-5 mt-5 border-t border-[#F5EFE6]">
              <button
                type="button"
                onClick={() => setShowFullSpecs(!showFullSpecs)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B3203F] hover:text-[#961732] transition"
              >
                <span>{showFullSpecs ? "Hide Technical Details" : "View Technical Comparison (Longevity, Weather & Finish)"}</span>
                {showFullSpecs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showFullSpecs && (
                <div className="mt-4 overflow-x-auto animate-in fade-in duration-200">
                  <table className="w-full text-left text-xs border border-[#EAE2D5] rounded-xl overflow-hidden">
                    <thead className="bg-[#FAF5EE] text-[#161413] font-semibold border-b border-[#EAE2D5]">
                      <tr>
                        <th className="p-2.5">Specification</th>
                        <th className="p-2.5">HD Bridal</th>
                        <th className="p-2.5">Airbrush Bridal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE2D5] text-[#524B44]">
                      {fullSpecs.map((spec) => (
                        <tr key={spec.feature} className="hover:bg-[#FAF8F5]">
                          <td className="p-2.5 font-medium text-[#161413]">{spec.feature}</td>
                          <td className="p-2.5">{spec.hd}</td>
                          <td className="p-2.5">{spec.airbrush}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Card: Clean Expert Advice (4 cols) */}
          <div className="lg:col-span-4 bg-[#FAF4EB] rounded-2xl border border-[#EAE2D5] p-6 sm:p-7 flex flex-col justify-between shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 border border-white">
                  <Image
                    src="/landing-page/images/bridal/bridal-8.webp"
                    alt="KNK Luxury Bride Consultation"
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-[#B3203F] uppercase block mb-0.5">
                    EXPERT ADVICE
                  </span>
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#161413] leading-snug">
                    Not sure which one is right for you?
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[#6E665F] leading-relaxed my-3">
                Our lead artists assess your skin type, wedding lighting, and venue atmosphere to recommend your ideal finish.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={artistWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#B3203F] hover:bg-[#961732] text-white font-medium text-xs sm:text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk to Our Artist</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
