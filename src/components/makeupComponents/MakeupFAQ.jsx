"use client";

import React, { useState } from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, GOLD, LINE } from "./Makeupdata";

const faqs = [
    {
        q: "What makeup services does KNK offer in Lucknow?",
        a: "KNK Awadh Salon & Academy offers bridal, HD, airbrush, engagement, reception, and party makeup services in Lucknow. Makeup can be customized according to the occasion, outfit, personal style, and preferred finish.",
    },
    {
        q: "Can I customize my makeup look?",
        a: "Yes. Your makeup look can be discussed and customized around your occasion, outfit, jewellery, preferred makeup style, and overall styling requirements.",
    },
    {
        q: "What bridal makeup styles are available?",
        a: "Bridal makeup can range from natural and soft-glam looks to traditional, peach, matte, and more defined bridal styles. The final look can be customized according to your wedding attire, jewellery, ceremony, and personal preference.",
    },
    {
        q: "What is the difference between HD and airbrush makeup?",
        a: "HD makeup uses finely blended makeup techniques for a polished, camera-friendly finish, while airbrush makeup is applied using an airbrush device to create a lightweight, finely distributed layer. The appropriate option depends on your requirements and preferred finish.",
    },
    {
        q: "How early should I book bridal makeup?",
        a: "For weddings and peak wedding dates, we recommend booking in advance because availability can vary by date and service requirements. Contact KNK with your wedding date to check availability.",
    },
    {
        q: "Does KNK offer engagement and party makeup?",
        a: "Yes. KNK offers makeup services for engagement ceremonies, parties, receptions, and other special occasions, with looks customized according to the event and personal style.",
    },
    {
        q: "Does KNK provide bridal hairstyling and draping?",
        a: "Bridal preparation can include hairstyling and draping services depending on the selected service or package. Confirm the exact inclusions with KNK when booking.",
    },
    {
        q: "How can I book a makeup appointment?",
        a: "You can use the appointment/booking option on the website and provide your preferred service, KNK location, and date. The team can then confirm availability and appointment details.",
    },
    {
        q: "Where can I get KNK makeup services in Lucknow?",
        a: "KNK Awadh Salon & Academy has makeup and beauty service locations in Mahanagar, Gomti Nagar and Hazratganj, Lucknow.",
    },
    {
        q: "How can I check current makeup pricing?",
        a: "Makeup pricing can vary according to the service, occasion, selected options and requirements. Contact KNK with your preferred service and date to confirm current pricing and availability.",
    },
];

export default function MakeupFAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    function toggleFaq(index) {
        setOpenIndex(openIndex === index ? -1 : index);
    }

    // JSON-LD Schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
            },
        })),
    };

    return (
        <section id="faq" className="relative px-5 py-20 sm:px-6 md:py-28 bg-[#f4eee1] overflow-hidden">
            {/* Schema markup for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <Eyebrow>FREQUENTLY ASKED QUESTIONS</Eyebrow>
                    <h2
                        className="mt-4 font-['Cormorant_Garamond',serif] text-[34px] sm:text-[46px] md:text-[54px] font-medium leading-[1.08] tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        Frequently Asked Questions{" "}
                        <span className="italic" style={{ color: GOLD }}>
                            About Makeup Services
                        </span>
                    </h2>
                    <GoldDivider center />
                    <p className="mt-5 font-['Inter',sans-serif] text-[13.5px] sm:text-[14.5px] text-[#6b6055] max-w-xl mx-auto">
                        Clear answers to common questions about bridal artistry, bookings, draping, and consultations at KNK Lucknow studios.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-3.5">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                    isOpen
                                        ? "bg-[#fffdfa] border-[#b58a52] shadow-md"
                                        : "bg-[#fffdfa]/80 border-[#d8cabb] hover:border-[#b58a52]/60 hover:bg-[#fffdfa]"
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={isOpen}
                                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                                >
                                    <span
                                        className="font-['Cormorant_Garamond',serif] text-lg sm:text-[21px] font-medium leading-snug"
                                        style={{ color: isOpen ? GOLD : INK }}
                                    >
                                        {faq.q}
                                    </span>
                                    <span
                                        className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                            isOpen
                                                ? "bg-[#b58a52] text-[#fffdfa] border-[#b58a52] rotate-180"
                                                : "border-[#d8cabb] text-[#71665c] bg-[#fbf7f0]"
                                        }`}
                                    >
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[#f0e6d8]">
                                        <p className="font-['Inter',sans-serif] text-[13.5px] sm:text-[14px] leading-[1.8] text-[#5e5349] mt-3">
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
