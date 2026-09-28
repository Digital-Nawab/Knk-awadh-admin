"use client";

import React, { useState } from "react";
import SectionEyebrow from "./SectionEyebrow";

function BookingForm() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", mobile: "", email: "", city: "", message: "" });
 
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }
 
    function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.mobile) return;
        setSubmitted(true);
    }
 
    if (submitted) {
        return (
            <div className="bg-card border border-border rounded-2xl p-10 text-center shadow-soft">
                <p className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#29231f] mb-2">Request received.</p>
                <p className="font-['Inter'] text-[13px] text-[#71665c]">
                    Our team will call you shortly to confirm your appointment.
                </p>
            </div>
        );
    }
 
    return (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-soft grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">Name *</label>
                <input
                    name="name" value={form.name} onChange={handleChange} required
                    className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] outline-none focus:border-[#b58a52] transition-colors"
                    placeholder="Your full name"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">Mobile Number *</label>
                <input
                    name="mobile" value={form.mobile} onChange={handleChange} required
                    className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] outline-none focus:border-[#b58a52] transition-colors"
                    placeholder="+91"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">E-mail</label>
                <input
                    name="email" value={form.email} onChange={handleChange} type="email"
                    className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] outline-none focus:border-[#b58a52] transition-colors"
                    placeholder="you@email.com"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">City</label>
                <input
                    name="city" value={form.city} onChange={handleChange}
                    className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] outline-none focus:border-[#b58a52] transition-colors"
                    placeholder="Lucknow"
                />
            </div>
            <div className="sm:col-span-2">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">Message</label>
                <textarea
                    name="message" value={form.message} onChange={handleChange} rows={3}
                    className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] outline-none focus:border-[#b58a52] transition-colors resize-none"
                    placeholder="Tell us what you're looking to book"
                />
            </div>
            <div className="sm:col-span-2">
                <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-[#b58a52] text-[#fbf7f0] font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-10 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105"
                >
                    Book An Appointment
                </button>
            </div>
        </form>
    );
}
 
export default function BookingSection() {
    return (
        <section id="contact" className="px-6 py-14 md:py-20">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        Booking Offer
                    </p>
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
 