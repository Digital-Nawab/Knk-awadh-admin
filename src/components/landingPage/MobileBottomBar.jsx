"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";
import { useBookingModal } from "@/components/landingPage/BookingContext";

export default function MobileBottomBar() {
  const { openBookingModal } = useBookingModal();
  const whatsappUrl =
    "https://wa.me/918881000552?text=" +
    encodeURIComponent(
      "Hello KNK Salon! I would like to inquire about Bridal Makeup dates and packages in Lucknow."
    );

  return (
    <aside
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#EAE2D5] px-3 py-2 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]"
      aria-label="Mobile quick actions"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Call button */}
        <a
          href="tel:+918881000552"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#FAF5EE] hover:bg-[#F0E6D5] active:scale-95 text-[#161413] transition text-center border border-[#EAE2D5]"
          aria-label="Call KNK Salon"
        >
          <Phone className="w-4 h-4 text-[#B3203F] mb-0.5" />
          <span className="text-[11px] font-medium tracking-wide">Call</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 active:scale-95 text-[#128C7E] transition text-center"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] mb-0.5" />
          <span className="text-[11px] font-semibold tracking-wide">WhatsApp</span>
        </a>

        {/* Book Appointment button */}
        <button
          type="button"
          onClick={() => openBookingModal()}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#B3203F] hover:bg-[#961732] active:scale-95 text-white shadow-md shadow-[#B3203F]/25 transition text-center cursor-pointer"
          aria-label="Book Bridal Appointment"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-wide">Book</span>
        </button>
      </div>
    </aside>
  );
}
