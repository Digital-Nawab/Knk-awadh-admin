"use client";

import React from "react";
import { Eyebrow } from "./Makeupui";
import { INK, GOLD } from "./Makeupdata";
import BookingForm from "./BookingForm";

export default function BookingSection() {
    return (
        <section className="px-6 py-20 md:py-24">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <Eyebrow>Reserve Your Slot</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                        Book an <span className="italic" style={{ color: GOLD }}>appointment.</span>
                    </h2>
                </div>
                <BookingForm />
            </div>
        </section>
    );
}