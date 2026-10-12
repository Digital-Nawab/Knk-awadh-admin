"use client";

import { useState } from "react";
import BridalNavbar from "@/components/landingPage/BridalNavbar";
import BridalHero from "@/components/landingPage/BridalHero";
import TrustBar from "@/components/landingPage/TrustBar";
import BridalServices from "@/components/landingPage/BridalServices";
import WhyChooseKnk from "@/components/landingPage/WhyChooseKnk";
import MakeupComparison from "@/components/landingPage/MakeupComparison";
import WhatsIncludedAndProcess from "@/components/landingPage/WhatsIncludedAndProcess";
import PortfolioAndTestimonials from "@/components/landingPage/PortfolioAndTestimonials";
import LucknowLocations from "@/components/landingPage/LucknowLocations";
import FaqAndBooking from "@/components/landingPage/FaqAndBooking";
import ReadyToBookBanner from "@/components/landingPage/ReadyToBookBanner";
import BridalFooter from "@/components/landingPage/BridalFooter";
import MobileBottomBar from "@/components/landingPage/MobileBottomBar";
import SearchModal from "@/components/landingPage/SearchModal";
import BookingModal from "@/components/landingPage/BookingModal";
import { BookingProvider } from "@/components/landingPage/BookingContext";

export default function MakeupLandingPage() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#161413] font-sans antialiased overflow-x-hidden selection:bg-[#B3203F] selection:text-white">
        {/* 1. Header / Navbar */}
        <BridalNavbar onOpenSearch={() => setSearchOpen(true)} />

        {/* Main Content */}
        <main className="flex-1 w-full pt-20">
          {/* 2. Dark Luxury Hero Video */}
          <BridalHero />

          {/* 3. Trust Bar (Real Brides | Professional Artists | Lucknow Locations) */}
          <TrustBar />

          {/* 4. Bridal Makeup Services Grid */}
          <BridalServices />

          {/* 5. Why Choose KNK? */}
          <WhyChooseKnk />

          {/* 6. HD vs Airbrush Makeup Comparison */}
          <MakeupComparison />

          {/* 7. What's Included? & Our Bridal Process */}
          <WhatsIncludedAndProcess />

          {/* 8. Real Bride Portfolio & Testimonials */}
          <PortfolioAndTestimonials />

          {/* 9. Our Locations in Lucknow */}
          <LucknowLocations />

          {/* 10. Bespoke Bridal Booking & Date Availability */}
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
