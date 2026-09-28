"use client";

import React from "react";
import { CREAM_DEEP } from "../shared/constants";
import { Eyebrow } from "../shared/SharedUI";
import BookingForm from "../shared/BookingForm";

export default function BookAppointment() {
    return (
        <section id="book" className="px-6 py-20 md:py-24" style={{ backgroundColor: CREAM_DEEP }}>
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <Eyebrow>Reserve Your Seat</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                        Book an
                        <br />
                        <span className="italic text-[#b58a52]">appointment.</span>
                    </h2>
                </div>
                <BookingForm />
            </div>
        </section>
    );
}