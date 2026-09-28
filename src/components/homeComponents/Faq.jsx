"use client";

import React, { useState } from "react";

const FAQ_ITEMS = [
    {
        q: "Do I need to book an appointment in advance?",
        a: "We recommend booking an appointment in advance, especially for bridal services, hair treatments, and premium facial therapies. This guarantees we reserve the appropriate senior specialist and private studio time specifically for you.",
    },
    {
        q: "What specialized hair services do you offer?",
        a: "Our hair artistry includes bespoke styling, global colour, custom balayage, organic Nanoplastia, Keratin infusion, deep hair spa rituals, and smoothening treatments formulated for your exact hair texture.",
    },
    {
        q: "Do you provide celebrity and bridal makeup services?",
        a: "Yes. We offer bespoke bridal and celebrity occasion makeup sculpted around your bone structure, outfit, and personal aesthetics. We offer airbrush, HD, and waterproof long-stay finishes.",
    },
    {
        q: "How long does a luxury salon appointment take?",
        a: "Duration varies by treatment. Express blowouts and nail services take 45-60 minutes, while complete balayage, Nanoplastia, or full pre-bridal packages can range from 2.5 to 4 hours. We ensure your experience is relaxing and never rushed.",
    },
    {
        q: "What are your salon opening timings and locations?",
        a: "KNK Salon Awadh is open Monday through Sunday, 10:00 AM to 8:30 PM across our luxury locations in Mahanagar, Gomti Nagar, and Hazratganj.",
    },
    {
        q: "How can I book an appointment or bridal consultation?",
        a: "You can book directly using our website concierge form above, via WhatsApp, or by calling our desk. Our concierge will confirm your date, time slot, and preferred artist.",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section
            id="faq"
            className="relative overflow-hidden bg-[#f8f6f1] py-20 sm:py-24 lg:py-28"
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#c49a4d]/5 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#9e7785]/5 blur-3xl" />
            <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
                {/* ================= HEADER ================= */}
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#c49a4d]" />
                            <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-[0.35em] text-[#a47a59]">
                                FAQ
                            </span>
                        </div>
                        <h2 className="font-['Cormorant_Garamond'] text-[52px] font-medium leading-[0.9] tracking-[-0.04em] text-[#29231f] sm:text-[68px] lg:text-[82px]">
                            Questions,
                            <br />
                            <span className="italic text-[#c49a4d]">answered.</span>
                        </h2>
                    </div>
                    <div className="max-w-xl lg:ml-auto lg:pb-2">
                        <p className="font-['Inter'] text-[13px] leading-[1.9] text-[#6d645d]">
                            Everything you need to know before your visit. From appointments
                            and services to timings and salon experience — we've got you
                            covered.
                        </p>
                    </div>
                </div>

                {/* ================= FAQ LIST ================= */}
                <div className="mt-14 border-t border-[#d8cbbd]">
                    {FAQ_ITEMS.map((item, index) => {
                        const isOpen = openIndex === index;
                        const num = `0${index + 1}`;

                        return (
                            <div key={index} className="faq-item border-b border-[#d8cbbd]">
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(index)}
                                    className="faq-question group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7 cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-start gap-5">
                                        <span className="mt-1 font-['Inter'] text-[9px] tracking-[0.25em] text-[#b49a7b]">
                                            {num}
                                        </span>
                                        <span
                                            className={`font-['Cormorant_Garamond'] text-[22px] font-medium transition-colors duration-300 sm:text-[25px] ${
                                                isOpen ? "text-[#a47a59]" : "text-[#332c27] group-hover:text-[#a47a59]"
                                            }`}
                                        >
                                            {item.q}
                                        </span>
                                    </div>
                                    <span
                                        className={`faq-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                            isOpen
                                                ? "border-[#c49a4d] bg-[#c49a4d] text-white rotate-45"
                                                : "border-[#cdbda9] text-[#8f6d4d] group-hover:border-[#c49a4d] group-hover:bg-[#c49a4d] group-hover:text-white"
                                        }`}
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`faq-answer grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="max-w-3xl pb-7 pl-10 font-['Inter'] text-[13px] leading-[1.9] text-[#70665e] sm:pl-14">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ================= BOTTOM CTA ================= */}
                <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-[2rem] border border-[#d8cbbd] bg-[#f2ece3] px-7 py-7 sm:flex-row sm:items-center sm:px-9">
                    <div>
                        <p className="font-['Cormorant_Garamond'] text-2xl italic text-[#493e37]">
                            Still have a question?
                        </p>
                        <p className="mt-1 font-['Inter'] text-[11px] text-[#756b63]">
                            Our concierge team will be happy to help you.
                        </p>
                    </div>
                    <a
                        href="#book"
                        className="group inline-flex items-center gap-4 rounded-full bg-[#29231f] px-7 py-3.5 font-['Inter'] text-[9px] font-medium uppercase tracking-[0.22em] text-[#fffaf3] transition-all duration-300 hover:bg-[#c49a4d] hover:shadow-lg"
                    >
                        <span>Book Appointment</span>
                        <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}