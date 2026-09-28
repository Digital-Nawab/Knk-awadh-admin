"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const galleryImages = [
    { src: '/assets/images/new/home/bridal/1.webp', alt: 'KNK Salon interior' },
    { src: '/assets/images/new/home/bridal/2.webp', alt: 'Hair styling at KNK' },
    { src: '/assets/images/new/home/bridal/3.webp', alt: 'Makeup artistry at KNK' },
    { src: '/assets/images/new/home/bridal/4.webp', alt: 'Bridal look at KNK' },
    { src: '/assets/images/new/home/bridal/5.webp', alt: 'Nail art at KNK' },
];

function LuxuryBooking() {
    const router = useRouter();
    const [activeImage, setActiveImage] = useState(0);
    const [formStartedAt] = useState(Date.now());
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % galleryImages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const handleBookingSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setStatusMessage(null);

        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData.entries());
        payload.form_type = "luxury_booking";

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setStatusMessage({ type: "success", text: data.message || "Thank you! Your appointment request has been reserved." });
                event.target.reset();
                const queryParams = new URLSearchParams({
                    bookingId: data.bookingId ? String(data.bookingId) : "",
                    service: payload.service || "Luxury Treatment",
                    name: payload.name || "",
                    date: payload.date || "",
                    location: payload.location || "",
                });
                router.push(`/thank-you?${queryParams.toString()}`);
            } else {
                setStatusMessage({ type: "error", text: data.error || "Failed to submit booking. Please call us." });
            }
        } catch {
            setStatusMessage({ type: "error", text: "Network error. Please try again or reach out via WhatsApp." });
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <section
                id="book"
                className="relative overflow-hidden bg-[#f7f3eb] py-20 sm:py-24 lg:py-28"
            >
                {/* Decorative Background */}
                <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#c49a4d]/5 blur-3xl" />
                <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#9b7b65]/5 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                    {/* =====================================================
                    HEADER
                        ====================================================== */}
                    <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div className="reveal">
                            {/* <div className="mb-5 flex items-center gap-3">
                                <span className="h-px w-8 bg-[#b88c50]" />
                                <span className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#92765b]">
                                    The Concierge
                                </span>
                            </div> */}
                            <h2 className="font-['Cormorant_Garamond'] text-[55px] font-medium leading-[0.86] tracking-[-0.045em] text-[#29231f] sm:text-[68px] lg:text-[78px]">
                                Book Your Appointment
                            </h2>
                        </div>
                        <div className="max-w-xl lg:ml-auto">
                            <p className="font-['Inter'] text-[13px] leading-[1.8] text-[#756b63]">
                                Whether you're preparing for a special occasion or simply ready
                                for a little self-care, reserve your time with our artists and let
                                us create an experience made for you.
                            </p>
                        </div>
                    </div>
                    {/* =====================================================
                        MAIN BOOKING GRID
                    ====================================================== */}
                    <div className="grid overflow-hidden rounded-[2px] border border-[#d8cbbd] bg-[#fbfaf7] shadow-[0_25px_80px_rgba(46,36,28,0.10)] lg:grid-cols-[1.15fr_0.85fr]">
                        {/* =================================================
                            LEFT — BOOKING FORM
                        ================================================== */}
                        <div className="relative border-b border-[#ddd3c7] p-6 sm:p-8 md:p-10 lg:border-b-0 lg:border-r xl:p-12">
                            {/* Top gold line */}
                            <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c49a4d] to-transparent" />
                            {/* Form heading */}
                            <div className="mb-9">
                                <span className="font-['Inter'] text-[8px] font-medium uppercase tracking-[0.3em] text-[#a07c5d]">
                                    Book an appointment
                                </span>
                            </div>
                            <form
                                id="knkBookingForm"
                                onSubmit={handleBookingSubmit}
                                className="space-y-7"
                            >
                                {/* Honeypot for spam bots */}
                                <input
                                    type="text"
                                    name="hp_company_url"
                                    className="hidden"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                                <input type="hidden" name="form_started_at" value={formStartedAt} />

                                {statusMessage && (
                                    <div
                                        className={`p-4 rounded-lg text-xs leading-relaxed font-['Inter'] ${
                                            statusMessage.type === "success"
                                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                                : "bg-rose-50 text-rose-800 border border-rose-200"
                                        }`}
                                    >
                                        {statusMessage.text}
                                    </div>
                                )}

                                {/* =========================================
                                    NAME + PHONE
                                ========================================== */}
                                <div className="grid gap-7 sm:grid-cols-2">
                                    {/* Name */}
                                    <div className="group relative">
                                        <input
                                            id="booking_name"
                                            name="name"
                                            type="text"
                                            required=""
                                            placeholder=" "
                                            className="peer w-full border-0 border-b border-[#d6cec4] bg-transparent px-0 pb-3 pt-2 font-['Inter'] text-[13px] text-[#302a26] outline-none transition-all duration-300 focus:border-[#b58a52]"
                                        />
                                        <label
                                            htmlFor="booking_name"
                                            className="pointer-events-none absolute left-0 top-2 origin-left font-['Inter'] text-[11px] text-[#978d84] transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-[11px] peer-focus:-top-3 peer-focus:scale-[0.82] peer-focus:text-[#a77e52] peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:scale-[0.82]"
                                        >
                                            Your name
                                        </label>
                                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#b58a52] transition-all duration-500 group-focus-within:w-full" />
                                    </div>
                                    {/* Phone */}
                                    <div className="group relative">
                                        <input
                                            id="booking_phone"
                                            name="phone"
                                            type="tel"
                                            required=""
                                            placeholder=" "
                                            className="peer w-full border-0 border-b border-[#d6cec4] bg-transparent px-0 pb-3 pt-2 font-['Inter'] text-[13px] text-[#302a26] outline-none transition-all duration-300 focus:border-[#b58a52]"
                                        />
                                        <label
                                            htmlFor="booking_phone"
                                            className="pointer-events-none absolute left-0 top-2 origin-left font-['Inter'] text-[11px] text-[#978d84] transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-[11px] peer-focus:-top-3 peer-focus:scale-[0.82] peer-focus:text-[#a77e52] peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:scale-[0.82]"
                                        >
                                            Mobile number
                                        </label>
                                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#b58a52] transition-all duration-500 group-focus-within:w-full" />
                                    </div>
                                </div>
                                {/* =========================================
           SERVICE
      ========================================== */}
                                <div>
                                    <label className="mb-3 block font-['Inter'] text-[9px] font-medium uppercase tracking-[0.25em] text-[#92765b]">
                                        Pick Your Service
                                    </label>
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                        {/* Hair */}
                                        <label className="service-option cursor-pointer">
                                            <input
                                                type="radio"
                                                name="service"
                                                defaultValue="Hair"
                                                className="peer sr-only"
                                                defaultChecked=""
                                            />
                                            <span className="flex min-h-[58px] items-center justify-center border border-[#d9d0c5] px-3 text-center font-['Inter'] text-[9px] uppercase tracking-[0.12em] text-[#62584f] transition-all duration-300 peer-checked:border-[#b58a52] peer-checked:bg-[#29231f] peer-checked:text-[#fffaf2] hover:border-[#b58a52]">
                                                Hair
                                            </span>
                                        </label>
                                        {/* Beauty */}
                                        <label className="service-option cursor-pointer">
                                            <input
                                                type="radio"
                                                name="service"
                                                defaultValue="Beauty"
                                                className="peer sr-only"
                                            />
                                            <span className="flex min-h-[58px] items-center justify-center border border-[#d9d0c5] px-3 text-center font-['Inter'] text-[9px] uppercase tracking-[0.12em] text-[#62584f] transition-all duration-300 peer-checked:border-[#b58a52] peer-checked:bg-[#29231f] peer-checked:text-[#fffaf2] hover:border-[#b58a52]">
                                                Beauty
                                            </span>
                                        </label>
                                        {/* Nails */}
                                        <label className="service-option cursor-pointer">
                                            <input
                                                type="radio"
                                                name="service"
                                                defaultValue="Nails"
                                                className="peer sr-only"
                                            />
                                            <span className="flex min-h-[58px] items-center justify-center border border-[#d9d0c5] px-3 text-center font-['Inter'] text-[9px] uppercase tracking-[0.12em] text-[#62584f] transition-all duration-300 peer-checked:border-[#b58a52] peer-checked:bg-[#29231f] peer-checked:text-[#fffaf2] hover:border-[#b58a52]">
                                                Nails
                                            </span>
                                        </label>
                                        {/* Bridal Makeup & Aesthetics */}
                                        <label className="service-option cursor-pointer">
                                            <input
                                                type="radio"
                                                name="service"
                                                defaultValue="Bridal Makeup & Aesthetics"
                                                className="peer sr-only"
                                            />
                                            <span className="flex min-h-[58px] items-center justify-center border border-[#d9d0c5] px-3 text-center font-['Inter'] text-[9px] uppercase tracking-[0.12em] text-[#62584f] transition-all duration-300 peer-checked:border-[#b58a52] peer-checked:bg-[#29231f] peer-checked:text-[#fffaf2] hover:border-[#b58a52]">
                                                Bridal Makeup & Aesthetics
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                {/* =========================================
           DATE + TIME
      ========================================== */}                                <div className="grid gap-7 sm:grid-cols-2">
                                    {/* Date */}
                                    <div className="group relative">
                                        <label
                                            htmlFor="booking_date"
                                            className="mb-2 block font-['Inter'] text-[9px] font-medium uppercase tracking-[0.25em] text-[#92765b]"
                                        >
                                            Preferred date
                                        </label>
                                        <input
                                            id="booking_date"
                                            name="date"
                                            type="date"
                                            required=""
                                            className="w-full border-0 border-b border-[#d6cec4] bg-transparent px-0 pb-3 font-['Inter'] text-[12px] text-[#302a26] outline-none transition-all duration-300 focus:border-[#b58a52]"
                                        />
                                    </div>
                                    {/* Location */}
                                    <div>
                                        <label
                                            htmlFor="booking_location"
                                            className="mb-2 block font-['Inter'] text-[9px] font-medium uppercase tracking-[0.25em] text-[#92765b]"
                                        >
                                            Preferred location
                                        </label>
                                        <select
                                            id="booking_location"
                                            name="location"
                                            required=""
                                            className="w-full border-0 border-b border-[#d6cec4] bg-transparent px-0 pb-3 font-['Inter'] text-[12px] text-[#302a26] outline-none transition-all duration-300 focus:border-[#b58a52]"
                                        >
                                            <option value="">Choose your salon</option>
                                            <option value="Mahanagar, Lucknow">Mahanagar, Lucknow</option>
                                            <option value="Gomti Nagar, Lucknow">Gomti Nagar, Lucknow</option>
                                            <option value="Hazratganj, Lucknow">Hazratganj, Lucknow</option>
                                        </select>
                                    </div>
                                </div>
                                {/* =========================================
           WHATSAPP + BUTTON
      ========================================== */}
                                <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                    <label className="flex cursor-pointer items-center gap-3">
                                        <input
                                            type="checkbox"
                                            name="whatsapp"
                                            defaultValue="yes"
                                            className="peer sr-only"
                                            defaultChecked=""
                                        />
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#c8b79e] transition-all duration-300 peer-checked:border-[#b58a52] peer-checked:bg-[#b58a52]">
                                            <svg
                                                className="h-3 w-3 text-white opacity-0 transition peer-checked:opacity-100"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                            >
                                                <path d="m5 12 4 4L19 6" />
                                            </svg>
                                        </span>
                                        <span className="font-['Inter'] text-[10px] text-[#80766e]">
                                            Confirm via WhatsApp
                                        </span>
                                    </label>
                                    <button
                                        type="submit"
                                        className="group flex items-center justify-center gap-5 bg-[#29231f] px-7 py-4 font-['Inter'] text-[9px] font-medium uppercase tracking-[0.2em] text-[#fffaf3] transition-all duration-500 hover:bg-[#b58a52] hover:shadow-[0_12px_30px_rgba(181,138,82,0.25)]"
                                    >
                                        <span>Request Appointment</span>
                                        <span className="text-[17px] transition-transform duration-300 group-hover:translate-x-1">
                                            ↗
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* =================================================
       RIGHT — IMAGE ROTATION
  ================================================== */}
                        <div id="visit" className="relative flex flex-col bg-[#eee6da]">
                            <div className="group relative h-[300px] w-full overflow-hidden sm:h-[420px] lg:h-full lg:min-h-[520px]">
                                {galleryImages.map((img, index) => (
                                    <img
                                        key={img.src}
                                        src={img.src}
                                        alt={img.alt}
                                        width={600}
                                        height={520}
                                        loading="lazy"
                                        decoding="async"
                                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${index === activeImage ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    />
                                ))}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211a16]/50 via-transparent to-transparent" />
                                {/* Dots */}
                                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                                    {galleryImages.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setActiveImage(index)}
                                            aria-label={`Show image ${index + 1}`}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${index === activeImage
                                                    ? 'w-6 bg-white'
                                                    : 'w-1.5 bg-white/50 hover:bg-white/75'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* =====================================================
     TRUST STRIP
====================================================== */}
                    <div className="mt-7 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-7">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] tracking-[0.15em] text-[#c19a5c]">
                                ★★★★★
                            </span>
                            <span className="font-['Inter'] text-[8px] uppercase tracking-[0.18em] text-[#8c8178]">
                                Loved by our guests
                            </span>
                        </div>
                        <span className="hidden h-1 w-1 rounded-full bg-[#c5a276] sm:block" />
                        <span className="font-['Inter'] text-[8px] uppercase tracking-[0.18em] text-[#8c8178]">
                            Premium beauty experience
                        </span>
                        <span className="hidden h-1 w-1 rounded-full bg-[#c5a276] sm:block" />
                        <span className="font-['Inter'] text-[8px] uppercase tracking-[0.18em] text-[#8c8178]">
                            Expert artists
                        </span>
                    </div>
                </div>
            </section>
        </>

    );
}
export default LuxuryBooking;

