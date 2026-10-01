"use client";

import React from "react";
import { CREAM_DEEP } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import BookingForm from "../shared/BookingForm";

export default function BookAppointment() {
    return (
        <section id="book" className="px-5 sm:px-8 py-20 md:py-28 bg-[#f4eee1] relative scroll-mt-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 sm:mb-14">
                    <SectionHeading
                        eyebrow="Reserve Your Vanity Seat"
                        line1="Book an academic"
                        line2="consultation & studio tour."
                        description="Schedule a private session with our senior course advisors. Discuss batch availability, kit choices, and take a personal tour of our Hazratganj and Gomti Nagar academy studios."
                        center
                    />
                    <div className="flex justify-center">
                        <GoldDivider center />
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    <BookingForm />
                </div>
            </div>
        </section>
    );
}