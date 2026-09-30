"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function BookingForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        service: "",
        location: "",
        date: "",
        message: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.mobile || !form.service || !form.location) return;

        setLoading(true);
        setErrorMsg("");
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_type: "about_page_booking",
                    name: form.name.trim(),
                    phone: form.mobile.trim(),
                    email: form.email.trim() || null,
                    service: form.service,
                    location: form.location,
                    date: form.date || null,
                    message: form.message.trim() || null,
                    form_started_at: Date.now() - 3000,
                }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                const queryParams = new URLSearchParams({
                    bookingId: data.bookingId ? String(data.bookingId) : "",
                    service: form.service || "Luxury Treatment",
                    name: form.name.trim(),
                    date: form.date || "",
                    location: form.location || "",
                });
                router.push(`/thank-you?${queryParams.toString()}`);
            } else {
                setErrorMsg(data.error || "Failed to submit booking. Please call us directly.");
            }
        } catch (error) {
            console.error("Booking submission error:", error);
            setErrorMsg("Network error. Please try again or reach out via WhatsApp.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-soft">
            <div className="grid sm:grid-cols-2 gap-5">
                {errorMsg && (
                    <div className="sm:col-span-2">
                        <p className="font-['Inter'] text-xs text-rose-600 bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-lg">
                            {errorMsg}
                        </p>
                    </div>
                )}
                {/* Name */}
                <div className="sm:col-span-1">
                    <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">
                        Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] placeholder:text-[#a3978c] outline-none focus:border-[#b58a52] transition-colors"
                        placeholder="Your full name"
                    />
                </div>

                {/* Mobile Number */}
                <div className="sm:col-span-1">
                    <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">
                        Mobile Number *
                    </label>
                    <input
                        type="tel"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        required
                        className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] placeholder:text-[#a3978c] outline-none focus:border-[#b58a52] transition-colors"
                        placeholder="+91 | Enter mobile number"
                    />
                </div>

                {/* Email */}
                <div className="sm:col-span-1">
                    <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] placeholder:text-[#a3978c] outline-none focus:border-[#b58a52] transition-colors"
                        placeholder="Your email address (Optional)"
                    />
                </div>

                {/* Service Dropdown */}
                <div className="sm:col-span-1">
                    <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">
                        Service *
                    </label>
                    <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] outline-none focus:border-[#b58a52] transition-colors"
                    >
                        <option value="" disabled>
                            Select a service
                        </option>
                        <option value="Bridal Makeup">Bridal Makeup</option>
                        <option value="Engagement Makeup">Engagement Makeup</option>
                        <option value="Party Makeup">Party Makeup</option>
                        <option value="Hair Services">Hair Services</option>
                        <option value="Facial & Beauty">Facial &amp; Beauty</option>
                        <option value="Nail Services">Nail Services</option>
                        <option value="Men's Grooming">Men's Grooming</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Preferred Location Dropdown */}
                <div className="sm:col-span-1">
                    <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">
                        Preferred Location *
                    </label>
                    <select
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                        className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] outline-none focus:border-[#b58a52] transition-colors"
                    >
                        <option value="" disabled>
                            Select location
                        </option>
                        <option value="Mahanagar">Mahanagar</option>
                        <option value="Gomti Nagar">Gomti Nagar</option>
                        <option value="Hazratganj">Hazratganj</option>
                    </select>
                </div>

                {/* Preferred Date */}
                <div className="sm:col-span-1">
                    <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">
                        Preferred Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] placeholder:text-[#a3978c] outline-none focus:border-[#b58a52] transition-colors"
                        placeholder="DD/MM/YYYY"
                    />
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                    <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase text-[#71665c] mb-2 block">
                        Message
                    </label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-cream border border-border rounded-lg px-4 py-3 font-['Inter'] text-sm text-[#29231f] placeholder:text-[#a3978c] outline-none focus:border-[#b58a52] transition-colors resize-none"
                        placeholder="Tell us what you're looking to book"
                    />
                </div>

                {/* CTA Submit Button */}
                <div className="sm:col-span-2 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-[#b58a52] text-[#fbf7f0] font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-10 py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-105 disabled:opacity-70"
                    >
                        {loading ? "Processing..." : "Book My Appointment"}
                    </button>
                </div>
            </div>

            {/* Below the button: WhatsApp section */}
            <div className="mt-8 pt-6 border-t border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="font-['Inter'] text-[13px] text-[#71665c]">
                    Prefer WhatsApp? Send us your preferred service, location, and date, and our team will contact you.
                </p>
                <a
                    href="https://wa.me/918881000552?text=Hi%20KNK%20Awadh%2C%20I%20would%20like%20to%20book%20an%20appointment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center border border-[#b58a52] text-[#a17b5a] font-['Inter'] text-[11px] tracking-[0.15em] uppercase px-6 py-3 rounded-full hover:bg-[#b58a52]/10 transition-colors"
                >
                    Chat on WhatsApp
                </a>
            </div>
        </form>
    );
}

export default function BookingSection() {
    return (
        <section id="booking" className="px-6 py-14 md:py-20">
            <div id="contact" className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                        Book an Appointment
                    </p>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[52px] sm:text-[64px] md:text-[76px] lg:text-[88px] font-medium leading-[0.88] tracking-[-0.04em] text-[#29231f]">
                        Book an
                        <br />
                        <span className="italic text-[#b58a52]">Appointment</span>
                    </h2>
                    <p className="mt-4 font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.8] max-w-xl mx-auto">
                        Choose your preferred service, KNK location and date. Our team will contact you to confirm availability.
                    </p>
                </div>
                <BookingForm />
            </div>
        </section>
    );
}