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
import { DEFAULT_MAKEUP_SECTIONS } from "@/data/makeupDefaults";

export default function Makeup({ initialData }) {
    const data = initialData || DEFAULT_MAKEUP_SECTIONS;

    return (
        <div className="bg-[#fbf7f0] text-[#29231f]">
            {/* 1. Hero Section */}
            <HeroSection data={data?.hero} />

            {/* 2. Portfolio Gallery */}
            <LooksGallery data={data?.gallery} />

            {/* 3. Bridal Makeup Trends */}
            <TrendyIntro data={data?.trends} />

            {/* 4. Bespoke Atelier - Signature Makeup Looks & Services */}
            <SignatureMakeupServices data={data?.signature} />

            {/* 5. Bridal Makeup Styles for Different Wedding Styles */}
            <BridalStylesSection data={data?.styles} />

            {/* 6. Studio Banner Break */}
            <BannerImage
                src={data?.banner?.image || bannerImage}
                alt={data?.banner?.alt_text || "KNK Awadh Makeup Studio Lucknow"}
                data={data?.banner}
            />

            {/* 7. Frequently Asked Questions (FAQ) */}
            <MakeupFAQ data={data?.faq} />

            {/* 8. Reserve Your Slot - Booking Form */}
            <BookingSection data={data?.booking_info} />

            {/* 9. Loved By Real Brides */}
            <Testimonials data={data?.testimonials} />

            {/* 10. Makeup CTA */}
            <MakeupCTA data={data?.cta} />
        </div>
    );
}