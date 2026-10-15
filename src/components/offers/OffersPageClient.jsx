"use client";

import React, { useState, useEffect } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import BookingModal from "@/components/common/BookingModal";

// Fallback reel-size offers matching user's exact flyer posters
const DEFAULT_OFFERS = [
    {
        id: 1,
        title: "Hair Offer — A Little Extra Love For Women",
        altText: "A Little Extra Love — Head Wash, Hair Mask & Blow Dry at ₹499",
        imageUrl: "/admin-assets/offers/offer_1.webp",
        displayOrder: 1,
        isActive: true,
    },
    {
        id: 2,
        title: "Hair Spa — Buy 4 Get 1 Free",
        altText: "Hair Spa Buy 4 Get 1 Free Offer",
        imageUrl: "/admin-assets/offers/offer_2.webp",
        displayOrder: 2,
        isActive: true,
    },
    {
        id: 3,
        title: "Men's Grooming Combo Deal",
        altText: "Men's Grooming Combo Deal — Haircut, Beard & D-Tan at ₹499",
        imageUrl: "/admin-assets/offers/offer_3.webp",
        displayOrder: 3,
        isActive: true,
    },
];

export default function OffersPageClient({ initialOffers = [] }) {
    const [offers, setOffers] = useState(
        initialOffers && initialOffers.length > 0 ? initialOffers : DEFAULT_OFFERS
    );
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedOfferTitle, setSelectedOfferTitle] = useState("");

    // Load active offers dynamically from backend API
    useEffect(() => {
        let isMounted = true;
        fetch("/api/offers?activeOnly=true")
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => {
                if (data.offers && Array.isArray(data.offers) && data.offers.length > 0 && isMounted) {
                    setOffers(data.offers);
                }
            })
            .catch(() => {
                // Keep default or initial offers
            });

        return () => {
            isMounted = false;
        };
    }, []);

    // Filter active offers in display order
    const activeOffers = offers.filter((o) => o.isActive);

    const handleOpenBooking = (offer) => {
        const serviceName = offer.altText || offer.title || "Exclusive Salon Offer";
        setSelectedOfferTitle(serviceName);
        setIsBookingModalOpen(true);
    };

    return (
        <div className="bg-[#FAF7F2] text-[#241D18] min-h-screen pt-28 pb-20">
            {/* Breadcrumbs Navigation */}
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Offers" },
                    ]}
                />
            </div>

            {/* Simple Clean Header */}
            <section className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-4 pb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold/25 via-gold/15 to-transparent border border-gold/40 shadow-sm mb-3">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-80" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                    </span>
                    <span className="font-sans text-[10.5px] font-bold tracking-[0.25em] uppercase text-gold">
                        Exclusive Privileges
                    </span>
                    <span className="text-[8.5px] bg-gold text-[#241D18] font-bold px-1.5 py-0.5 rounded-full uppercase">
                        HOT
                    </span>
                </div>

                <h1 className="font-display italic text-3xl sm:text-5xl text-[#241D18] font-normal leading-tight">
                    Exclusive Salon Offers
                </h1>

                <p className="font-sans text-xs sm:text-sm text-[#665a4e] max-w-lg mx-auto mt-2.5 font-light tracking-wide">
                    Explore our curated seasonal offers and packages. Reserve your appointment with our master stylists today.
                </p>
            </section>

            {/* Reel-Size Offers Grid (Clean flyer images with Book Now underneath) */}
            <section className="max-w-6xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {activeOffers.map((offer) => (
                        <div key={offer.id} className="flex flex-col group">
                            {/* Reel-size Flyer Poster Card */}
                            <div className="relative overflow-hidden rounded-2xl border-2 border-[#D4BC88]/60 bg-white shadow-[0_12px_36px_rgba(140,110,60,0.14)] transition-all duration-500 group-hover:shadow-[0_20px_45px_rgba(140,110,60,0.24)] group-hover:-translate-y-1">
                                <img
                                    src={offer.imageUrl || "/admin-assets/offers/offer_1.webp"}
                                    alt={offer.altText || offer.title || "KNK Awadh Salon Offer"}
                                    className="w-full aspect-[9/16] object-cover block rounded-2xl"
                                    onError={(e) => {
                                        e.currentTarget.src = "/admin-assets/offers/offer_1.webp";
                                    }}
                                />
                            </div>

                            {/* Book Now Button (Olive-Gold Luxury Style) */}
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={() => handleOpenBooking(offer)}
                                    className="w-full py-3.5 px-6 rounded-md bg-[#877443] hover:bg-[#736336] active:scale-[0.99] text-white font-sans text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-[0_4px_16px_rgba(135,116,67,0.35)] hover:shadow-[0_6px_22px_rgba(135,116,67,0.5)] cursor-pointer"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {activeOffers.length === 0 && (
                    <div className="text-center py-16 px-4 bg-white/70 rounded-2xl border border-gold/30 my-8">
                        <p className="font-display italic text-2xl text-[#241D18]">
                            No active offers available at the moment.
                        </p>
                        <p className="font-sans text-xs text-[#665a4e] mt-2">
                            Please check back soon or visit our studio.
                        </p>
                    </div>
                )}
            </section>

            {/* Popup Booking Form (Modal) */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                initialService={selectedOfferTitle}
            />
        </div>
    );
}
