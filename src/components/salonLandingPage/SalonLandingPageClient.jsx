"use client";

import { useState } from "react";
import BridalNavbar from "@/components/salonLandingPage/BridalNavbar";
import BridalHero from "@/components/salonLandingPage/BridalHero";
import TrustBar from "@/components/salonLandingPage/TrustBar";
import BridalServices from "@/components/salonLandingPage/BridalServices";
import WhyChooseKnk from "@/components/salonLandingPage/WhyChooseKnk";
import MakeupComparison from "@/components/salonLandingPage/MakeupComparison";
import WhatsIncludedAndProcess from "@/components/salonLandingPage/WhatsIncludedAndProcess";
import PortfolioAndTestimonials from "@/components/salonLandingPage/PortfolioAndTestimonials";
import LucknowLocations from "@/components/salonLandingPage/LucknowLocations";
import FaqAndBooking from "@/components/salonLandingPage/FaqAndBooking";
import ReadyToBookBanner from "@/components/salonLandingPage/ReadyToBookBanner";
import BridalFooter from "@/components/salonLandingPage/BridalFooter";
import MobileBottomBar from "@/components/salonLandingPage/MobileBottomBar";
import SearchModal from "@/components/salonLandingPage/SearchModal";
import BookingModal from "@/components/salonLandingPage/BookingModal";
import { BookingProvider } from "@/components/salonLandingPage/BookingContext";

export default function SalonLandingPageClient() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#161413] font-sans antialiased overflow-x-hidden selection:bg-[#B3203F] selection:text-white">
        {/* 1. Header / Navbar */}
        <BridalNavbar onOpenSearch={() => setSearchOpen(true)} />

        {/* Main Content */}
        <main className="flex-1 w-full pt-20">
          {/* 2. Luxury Salon Hero with Video */}
          <BridalHero />

          {/* 3. Trust Bar (Happy Guests | Master Stylists | Lucknow Locations) */}
          <TrustBar />

          {/* 4. Signature Salon Services Grid */}
          <BridalServices />

          {/* 5. Why Choose KNK? & Real Salon Work Banner */}
          <WhyChooseKnk />

          {/* 6. Nanoplastia vs Keratin Treatment Comparison */}
          <MakeupComparison />

          {/* 7. All-Inclusive Salon Care & Step-by-Step Experience */}
          <WhatsIncludedAndProcess />

          {/* 8. Salon Transformations & What Our Guests Say */}
          <PortfolioAndTestimonials />

          {/* 9. Our Locations in Lucknow with Interactive Maps */}
          <LucknowLocations />

          {/* 10. Reserve Your Salon Experience & Chair Availability */}
          <FaqAndBooking />

          {/* 11. Ready to Book CTA Banner */}
          <ReadyToBookBanner />
        </main>

        {/* 12. Full Luxury Footer */}
        <BridalFooter />

        {/* 13. Mobile Sticky Bottom Bar (Call, WhatsApp, Book) */}
        <MobileBottomBar />

        {/* 14. Quick Search Modal */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* 15. Global Booking Consultation Popup Modal */}
        <BookingModal />
      </div>
    </BookingProvider>
  );
}
