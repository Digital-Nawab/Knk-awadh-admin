"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { INK, MUTED, GOLD, LINE } from "./Makeupdata";

const makeupServicesOptions = [
    "Bridal Makeup",
    "HD Bridal Makeup",
    "Airbrush Bridal Makeup",
    "Engagement Makeup",
    "Party Makeup",
    "Reception Makeup",
    "Bespoke Occasion Makeup",
];

const knkLocations = [
    { value: "Mahanagar", label: "KNK Salon — Mahanagar, Lucknow" },
    { value: "Gomti Nagar", label: "KNK Salon — Gomti Nagar, Lucknow" },
    { value: "Hazratganj", label: "KNK Awadh Salon & Academy — Hazratganj, Lucknow" },
];

const preferredTimeOptions = [
    "Morning (10:00 AM - 01:00 PM)",
    "Afternoon (01:00 PM - 04:00 PM)",
    "Evening (04:00 PM - 08:00 PM)",
    "Early Bridal Call (Custom Timing)",
];

export default function BookingForm({ initialService = "" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [formStartedAt, setFormStartedAt] = useState(0);

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        service: initialService || "",
        location: "",
        date: "",
        time: "",
        message: "",
        hp_company_url: "", // honeypot
    });

    useEffect(() => {
        setFormStartedAt(Date.now());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMsg("");

        if (!form.name.trim() || form.name.trim().length < 2) {
            setErrorMsg("Please enter your full name.");
            return;
        }

        const cleanPhone = form.mobile.replace(/[^\d+]/g, "");
        if (!cleanPhone || cleanPhone.length < 10) {
            setErrorMsg("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            setErrorMsg("Please enter a valid email address.");
            return;
        }

        if (!form.service) {
            setErrorMsg("Please choose a makeup service.");
            return;
        }

        if (!form.location) {
            setErrorMsg("Please choose your preferred KNK location.");
            return;
        }

        if (!form.date) {
            setErrorMsg("Please choose your preferred appointment date.");
            return;
        }

        setLoading(true);

        const locationToSend = form.location.startsWith("KNK")
            ? form.location
            : `KNK ${form.location}`;

        const payload = {
            form_type: "makeup_page_booking",
            name: form.name.trim(),
            phone: cleanPhone,
            email: form.email.trim() || null,
            service: form.service,
            location: locationToSend,
            date: form.date,
            time: form.time || null,
            message: form.message.trim() || null,
            hp_company_url: form.hp_company_url || null,
            form_started_at: formStartedAt || Date.now() - 3000,
        };

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                const queryParams = new URLSearchParams({
                    bookingId: data.bookingId ? String(data.bookingId) : "",
                    service: form.service,
                    name: form.name.trim(),
                    date: form.date,
                    location: locationToSend,
                });
                router.push(`/thank-you?${queryParams.toString()}`);
            } else {
                setErrorMsg(data.error || "Failed to reserve appointment. Please try again.");
            }
        } catch {
            setErrorMsg("A network error occurred. Please check your connection and retry.");
        } finally {
            setLoading(false);
        }
    }

    const todayStr = new Date().toISOString().split("T")[0];

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-[#fffdfa] border border-[#d8cabb] rounded-3xl p-6 sm:p-9 md:p-11 shadow-[0_12px_40px_rgba(40,25,15,0.06)] grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
            {/* Honeypot for bot protection */}
            <input
                type="text"
                name="hp_company_url"
                value={form.hp_company_url}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
            />

            {errorMsg && (
                <div className="sm:col-span-2 rounded-xl border border-red-300 bg-red-50/90 p-4 text-xs font-['Inter',sans-serif] text-red-700 font-medium">
                    {errorMsg}
                </div>
            )}

            {/* Your Name * */}
            <div className="sm:col-span-1">
                <label className="font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 block text-[#6a5e52]">
                    Your Name *
                </label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full bg-[#fbf7f0] border border-[#d8cabb] focus:border-[#b58a52] rounded-xl px-4 py-3.5 font-['Inter',sans-serif] text-[13.5px] outline-none transition-colors text-[#29231f] placeholder:text-[#a89b8d]"
                />
            </div>

            {/* Contact Number * */}
            <div className="sm:col-span-1">
                <label className="font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 block text-[#6a5e52]">
                    Contact Number *
                </label>
                <input
                    name="mobile"
                    type="tel"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    placeholder="+91 10-digit mobile number"
                    className="w-full bg-[#fbf7f0] border border-[#d8cabb] focus:border-[#b58a52] rounded-xl px-4 py-3.5 font-['Inter',sans-serif] text-[13.5px] outline-none transition-colors text-[#29231f] placeholder:text-[#a89b8d]"
                />
            </div>

            {/* Your Email */}
            <div className="sm:col-span-1">
                <label className="font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 block text-[#6a5e52]">
                    Your Email
                </label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="w-full bg-[#fbf7f0] border border-[#d8cabb] focus:border-[#b58a52] rounded-xl px-4 py-3.5 font-['Inter',sans-serif] text-[13.5px] outline-none transition-colors text-[#29231f] placeholder:text-[#a89b8d]"
                />
            </div>

            {/* Makeup Service * */}
            <div className="sm:col-span-1">
                <label className="font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 block text-[#6a5e52]">
                    Makeup Service *
                </label>
                <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#fbf7f0] border border-[#d8cabb] focus:border-[#b58a52] rounded-xl px-4 py-3.5 font-['Inter',sans-serif] text-[13.5px] outline-none transition-colors text-[#29231f] cursor-pointer"
                >
                    <option value="" disabled>
                        Choose a makeup service
                    </option>
                    {makeupServicesOptions.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            {/* Preferred KNK Location * */}
            <div className="sm:col-span-2">
                <label className="font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 block text-[#6a5e52]">
                    Preferred KNK Location *
                </label>
                <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#fbf7f0] border border-[#d8cabb] focus:border-[#b58a52] rounded-xl px-4 py-3.5 font-['Inter',sans-serif] text-[13.5px] outline-none transition-colors text-[#29231f] cursor-pointer"
                >
                    <option value="" disabled>
                        Choose preferred KNK location
                    </option>
                    {knkLocations.map((loc) => {
                        const val = typeof loc === "string" ? loc : loc.value;
                        const label = typeof loc === "string" ? `${loc}, Lucknow` : loc.label;
                        return (
                            <option key={val} value={val}>
                                {label}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Preferred Date * */}
            <div className="sm:col-span-1">
                <label className="font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 block text-[#6a5e52]">
                    Preferred Date *
                </label>
                <input
                    name="date"
                    type="date"
                    min={todayStr}
                    value={form.date}
                    onChange={handleChange}
                    required
                    placeholder="DD/MM/YYYY"
                    className="w-full bg-[#fbf7f0] border border-[#d8cabb] focus:border-[#b58a52] rounded-xl px-4 py-3.5 font-['Inter',sans-serif] text-[13.5px] outline-none transition-colors text-[#29231f] cursor-pointer"
                />
            </div>

            {/* Preferred Time */}
            <div className="sm:col-span-1">
                <label className="font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 block text-[#6a5e52]">
                    Preferred Time
                </label>
                <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full bg-[#fbf7f0] border border-[#d8cabb] focus:border-[#b58a52] rounded-xl px-4 py-3.5 font-['Inter',sans-serif] text-[13.5px] outline-none transition-colors text-[#29231f] cursor-pointer"
                >
                    <option value="">Choose preferred time</option>
                    {preferredTimeOptions.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>

            {/* Special Requests / Notes */}
            <div className="sm:col-span-2">
                <label className="font-['Inter',sans-serif] text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 block text-[#6a5e52]">
                    Special Requests / Notes
                </label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your preferred look, event, or special requirements"
                    className="w-full bg-[#fbf7f0] border border-[#d8cabb] focus:border-[#b58a52] rounded-xl px-4 py-3 font-['Inter',sans-serif] text-[13.5px] outline-none transition-colors resize-none text-[#29231f] placeholder:text-[#a89b8d]"
                />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center font-['Inter',sans-serif] text-[12px] font-bold tracking-[0.22em] uppercase px-8 py-4 sm:py-4.5 rounded-full text-[#fbf7f0] shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg disabled:opacity-60 cursor-pointer text-center"
                    style={{ backgroundColor: GOLD }}
                >
                    {loading ? "REQUESTING APPOINTMENT..." : "[ REQUEST APPOINTMENT ]"}
                </button>

                {/* Subtext */}
                <p className="mt-3.5 text-center font-['Inter',sans-serif] text-[11.5px] leading-relaxed text-[#7c7063]">
                    Appointment requests are subject to availability. Our team will contact you to confirm your preferred date, time and location.
                </p>

                {/* WhatsApp Chat Link */}
                <div className="mt-4 pt-4 border-t border-[#ebdccf] text-center">
                    <a
                        href="https://wa.me/918881000552?text=Hi%20KNK%20Salon%2C%20I%20would%20like%20to%20book%20a%20makeup%20appointment%20in%20Lucknow."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-['Inter',sans-serif] text-[12px] font-semibold text-[#8a6838] hover:text-[#523d20] transition-colors"
                    >
                        <span>Prefer WhatsApp?</span>
                        <span className="font-bold underline decoration-[#c49a4d]">→ Chat with KNK</span>
                    </a>
                </div>
            </div>
        </form>
    );
}