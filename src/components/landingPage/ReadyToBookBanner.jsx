"use client";

import { Calendar, MessageCircle, Sparkles } from "lucide-react";
import { useBookingModal } from "@/components/landingPage/BookingContext";

export default function ReadyToBookBanner() {
  const { openBookingModal } = useBookingModal();
  const whatsappUrl =
    "https://wa.me/918881000552?text=" +
    encodeURIComponent(
      "Hello KNK Salon Lucknow! I would like to book an appointment for Bridal Makeup."
    );

  return (
    <section className="relative w-full bg-[#0E0D0C] text-white py-14 sm:py-18 overflow-hidden border-t border-[#23201D]">
      {/* Ambient gradient lights */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#B3203F]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#C9A24B]/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4">
        <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
          Ready to Book Your Bridal Look?
        </h2>
        <p className="text-xs sm:text-sm text-[#C7BEB4] font-inter max-w-xl mx-auto">
          Let&apos;s make your special day even more beautiful.
        </p>

        {/* Two CTA Buttons matching screenshot */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#B3203F] hover:bg-[#961732] text-white font-medium text-xs sm:text-sm shadow-lg shadow-[#B3203F]/35 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 hover:border-[#25D366] bg-black/40 hover:bg-[#25D366]/10 text-white font-medium text-xs sm:text-sm transition-all duration-200 group"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
            <span>WhatsApp Now</span>
          </a>
        </div>
      </div>
    </section>
  );
}
