"use client";

import { Sparkles, Scissors, Shirt, Heart, CircleDot } from "lucide-react";

export default function WhatsIncludedAndProcess() {
  const inclusions = [
    {
      title: "Makeup",
      desc: "HD/Airbrush base, contour, eyes & lips",
      icon: Sparkles,
    },
    {
      title: "Hairstyling",
      desc: "Floral buns, waves & matha patti",
      icon: Scissors,
    },
    {
      title: "Draping",
      desc: "Double-dupatta & lehenga pleats",
      icon: Shirt,
    },
    {
      title: "Finishing Touches",
      desc: "3D lashes, body glow & shimmer",
      icon: Heart,
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      desc: "Discuss your look",
    },
    {
      step: "02",
      title: "Skin Preparation",
      desc: "Cleanse & prep",
    },
    {
      step: "03",
      title: "Makeup",
      desc: "Perfecting details",
    },
    {
      step: "04",
      title: "Final Look",
      desc: "Your dream look",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] relative border-b border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Module: What's Included? matching screenshot */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B3203F] uppercase block mb-1">
                ALL-INCLUSIVE PACKAGES
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#161413]">
                What&apos;s Included?
              </h2>
            </div>

            {/* 4 Circular Pink Icons Grid matching screenshot */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 pt-2">
              {inclusions.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-2xl p-5 border border-[#EAE2D5] shadow-sm flex flex-col items-center text-center group hover:border-[#B3203F]/40 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FCECEE] text-[#B3203F] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <h3 className="font-playfair text-sm sm:text-base font-bold text-[#161413] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#7A726B] leading-tight">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Module: Our Bridal Process matching screenshot */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#C9A24B] uppercase block mb-1">
                STEP-BY-STEP TRANSFORMATION
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#161413]">
                Our Bridal Process
              </h2>
            </div>

            {/* 4 Stepped Circles in a Row matching screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 pt-2">
              {processSteps.map((step, idx) => (
                <div
                  key={step.step}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE2D5] shadow-sm flex flex-col items-center text-center relative group hover:border-[#C9A24B]/60 hover:shadow-md transition-all duration-200"
                >
                  {/* Step Number Circle */}
                  <div className="w-10 h-10 rounded-full border border-[#B3203F] text-[#B3203F] font-semibold text-xs flex items-center justify-center mb-3 bg-[#FFFDF9] group-hover:bg-[#B3203F] group-hover:text-white transition-colors">
                    {step.step}
                  </div>
                  <h3 className="font-playfair text-xs sm:text-sm font-bold text-[#161413] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-[#7A726B]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Reassurance text */}
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#EAE2D5] text-xs text-[#7A726B] flex items-center gap-2">
              <CircleDot className="w-4 h-4 text-[#B3203F] shrink-0" />
              <span>
                Personalized dressing suite provided with dedicated lead stylist and hair artist for zero rush.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
