"use client";

import { MapPin, Phone, ExternalLink } from "lucide-react";

export default function LucknowLocations() {
  const locations = [
    {
      id: "mahanagar",
      name: "KNK Salon Mahanagar",
      address: "Mahanagar Crossing (Chowraha), Mahanagar Colony, Lucknow",
      phone: "+91 95593 21711",
      tel: "tel:+919559321711",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=KNK+Salon+Mahanagar+Crossing+Chowraha+Lucknow",
      embedMapUrl: "https://maps.google.com/maps?q=KNK+Salon+Mahanagar+Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed",
      tag: "Flagship Studio",
    },
    {
      id: "gomti-nagar",
      name: "KNK Salon Gomti Nagar",
      address: "02/01 Vipul Khand, Gomti Nagar, Lucknow",
      phone: "+91 88810 00551",
      tel: "tel:+918881000551",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=KNK+Salon+02+01+Vipul+Khand+Gomti+Nagar+Lucknow",
      embedMapUrl: "https://maps.google.com/maps?q=KNK+Salon+Vipul+Khand+Gomti+Nagar+Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed",
      tag: "Luxe Suite",
    },
    {
      id: "hazratganj",
      name: "KNK Awadh Salon & Academy – Hazratganj",
      address: "Ground Floor 11B, Tilak Marg, Opp. Ganna Sansthaan, Lucknow",
      phone: "+91 88810 00552",
      tel: "tel:+918881000552",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=KNK+Awadh+Salon+Academy+Tilak+Marg+Hazratganj+Lucknow",
      embedMapUrl: "https://maps.google.com/maps?q=KNK+Awadh+Salon+Academy+Tilak+Marg+Hazratganj+Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed",
      tag: "Academy & Studio",
    },
  ];

  return (
    <section id="locations" className="py-16 sm:py-24 bg-[#FAF7F2] relative border-y border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B3203F]/10 border border-[#B3203F]/20 text-[#B3203F] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>3 Premium Studios in Lucknow</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#161413] tracking-tight mb-2">
            Our Locations in Lucknow
          </h2>
          <p className="text-xs sm:text-sm text-[#7A726B] font-inter">
            Visit our salon &amp; academy at your nearest location or book a private suite consultation.
          </p>
        </div>

        {/* 3 Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-white rounded-2xl border border-[#EAE2D5] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#C5A265] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B3203F] bg-[#B3203F]/8 px-2 py-0.5 rounded-md">
                    {loc.tag}
                  </span>
                </div>

                <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#161413] mb-2 leading-snug">
                  {loc.name}
                </h3>

                <p className="text-xs text-[#7A726B] leading-relaxed mb-3 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B3203F] shrink-0 mt-0.5" />
                  <span>{loc.address}</span>
                </p>

                {/* Call phone link */}
                <div className="mb-4">
                  <a
                    href={loc.tel}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#161413] hover:text-[#B3203F] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B3203F]" />
                    <span>{loc.phone}</span>
                  </a>
                </div>
              </div>

              {/* Real Google Map Embed */}
              <div className="pt-2">
                <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden border border-[#EAE2D5] bg-[#EBF2E8] mb-4 shadow-inner">
                  <iframe
                    title={`${loc.name} Location Map`}
                    src={loc.embedMapUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Actions: Get Directions & Call (with specific branch phone number) */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-[#B3203F] text-[#B3203F] hover:bg-[#B3203F] hover:text-white font-semibold text-[11px] sm:text-xs transition-colors duration-200"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={loc.tel}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#B3203F] hover:bg-[#8F152F] text-white font-semibold text-xs transition-colors duration-200 shadow-xs"
                    title={`Call ${loc.phone}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
