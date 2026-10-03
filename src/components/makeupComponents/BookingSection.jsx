"use client";

import React from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, GOLD } from "./Makeupdata";
import BookingForm from "./BookingForm";

export default function BookingSection() {
    return (
        <section id="book" className="relative px-5 py-20 sm:px-6 md:py-28 bg-[#fbf7f0] scroll-mt-20">
            <span id="booking" className="absolute -top-24 opacity-0 pointer-events-none" />
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12 sm:mb-14">
                    <Eyebrow>RESERVE YOUR SLOT</Eyebrow>
                    <h2
                        className="mt-4 font-['Cormorant_Garamond',serif] text-[34px] sm:text-[46px] md:text-[54px] font-medium leading-[1.08] tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        Book Your Makeup{" "}
                        <span className="italic" style={{ color: GOLD }}>
                            Appointment in Lucknow
                        </span>
                    </h2>
                    <GoldDivider center />
                    <p className="mt-5 font-['Inter',sans-serif] text-[13.5px] sm:text-[15px] leading-[1.85] text-[#6b6055] max-w-xl mx-auto">
                        Ready for your makeup appointment? Tell us your preferred makeup service, KNK location
                        and date. Our team will contact you to confirm availability and appointment details.
                    </p>
                </div>
                <BookingForm />
            </div>
        </section>
    );
}