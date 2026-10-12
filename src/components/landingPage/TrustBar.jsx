"use client";

import { Users, Award, MapPin } from "lucide-react";

export default function TrustBar() {
  const highlights = [
    {
      icon: Users,
      title: "Real Brides",
      subtitle: "Our Happy Clients",
    },
    {
      icon: Award,
      title: "Professional Artists",
      subtitle: "Experienced & Skilled",
    },
    {
      icon: MapPin,
      title: "Lucknow Locations",
      subtitle: "Mahanagar | Gomti Nagar | Hazratganj",
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-[#FFFDF9] rounded-2xl sm:rounded-full border border-[#EAE2D5] shadow-[0_10px_35px_rgba(20,18,16,0.06)] px-6 py-4 sm:py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#EAE2D5]">
          {highlights.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-3.5 ${
                  index === 0
                    ? "md:pr-6"
                    : index === 1
                    ? "md:px-6 pt-3 md:pt-0"
                    : "md:pl-6 pt-3 md:pt-0"
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-[#FAF5EE] border border-[#E4D8C5] flex items-center justify-center shrink-0 text-[#B3203F]">
                  <IconComponent className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="font-playfair text-[15px] sm:text-base font-bold text-[#161413] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#7A726B] font-inter mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
