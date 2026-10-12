"use client";

import { useState } from "react";
import { Search, X, ArrowRight, Sparkles, MapPin } from "lucide-react";
import { useBookingModal } from "./BookingContext";

export default function SearchModal({ isOpen, onClose }) {
  const { openBookingModal } = useBookingModal();
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const quickLinks = [
    { label: "Hair Cut & Styling", section: "#services", type: "Service" },
    { label: "French Balayage & Colour", section: "#services", type: "Service" },
    { label: "Nanoplastia Hair Treatment", section: "#services", type: "Service" },
    { label: "Keratin Smoothing Therapy", section: "#services", type: "Service" },
    { label: "Advanced HydraFacial & Skin", section: "#services", type: "Service" },
    { label: "Nail Art & Gel Extensions", section: "#services", type: "Service" },
    { label: "Men's Executive Grooming", section: "#services", type: "Service" },
    { label: "Nanoplastia vs Keratin Guide", section: "#comparison", type: "Guide" },
    { label: "Mahanagar Branch", section: "#locations", type: "Location" },
    { label: "Gomti Nagar Branch", section: "#locations", type: "Location" },
    { label: "Hazratganj Flagship Studio", section: "#locations", type: "Location" },
    { label: "Book Salon Appointment Form", section: "#booking", type: "Booking" },
  ];

  const filtered = quickLinks.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#EAE2D5] overflow-hidden p-5 sm:p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 border-b border-[#EAE2D5] pb-4 mb-4">
          <Search className="w-5 h-5 text-[#B3203F] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, haircuts, nanoplastia, branches..."
            className="w-full bg-transparent text-sm sm:text-base text-[#161413] placeholder-[#A39E98] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#7A726B] hover:text-[#161413] rounded-full hover:bg-[#F5EFE6] transition cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1.5 max-h-72 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <a
                key={item.label}
                href={item.section}
                onClick={(e) => {
                  if (item.type === "Booking") {
                    e.preventDefault();
                    onClose();
                    openBookingModal();
                  } else {
                    onClose();
                  }
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F9F4EB] text-xs sm:text-sm text-[#161413] hover:text-[#B3203F] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#EAE2D5] text-[#7A726B]">
                    {item.type}
                  </span>
                  <span>{item.label}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#7A726B] group-hover:translate-x-1 group-hover:text-[#B3203F] transition-transform" />
              </a>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-[#7A726B]">
              No matching salon service found. Try &quot;Nanoplastia&quot;, &quot;HydraFacial&quot;, or &quot;Mahanagar&quot;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
