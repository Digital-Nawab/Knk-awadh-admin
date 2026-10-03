"use client";

import React from "react";
import HeroSection from "./HeroSection";
import LooksGallery from "./LooksGallery";
import TrendyIntro from "./TrendyIntro";
import SignatureMakeupServices from "./SignatureMakeupServices";
import BridalStylesSection from "./BridalStylesSection";
import BannerImage from "./BannerImage";
import MakeupFAQ from "./MakeupFAQ";
import BookingSection from "./BookingSection";
import Testimonials from "./Testimonials";
import MakeupCTA from "./MakeupCTA";
import { bannerImage } from "./Makeupdata";

export default function Makeup() {
    return (
        <div className="bg-[#fbf7f0] text-[#29231f]">
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Portfolio Gallery */}
            <LooksGallery />

            {/* 3. Bridal Makeup Trends */}
            <TrendyIntro />

            {/* 4. Bespoke Atelier - Signature Makeup Looks & Services */}
            <SignatureMakeupServices />

            {/* 5. Bridal Makeup Styles for Different Wedding Styles */}
            <BridalStylesSection />

            {/* 6. Studio Banner Break */}
            <BannerImage src={bannerImage} alt="KNK Awadh Makeup Studio Lucknow" />

            {/* 7. Frequently Asked Questions (FAQ) */}
            <MakeupFAQ />

            {/* 8. Reserve Your Slot - Booking Form */}
            <BookingSection />

            {/* 9. Loved By Real Brides */}
            <Testimonials />

            {/* 10. Makeup CTA */}
            <MakeupCTA />
        </div>
    );
}