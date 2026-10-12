"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  User,
  Phone,
  MapPin,
  Sparkles,
  Send,
  CheckCircle2,
  MessageSquare,
  Star,
  Check,
  Crown,
  Sparkle,
  ChevronDown,
  HelpCircle,
  PhoneCall,
} from "lucide-react";
import { bridalFAQs } from "@/data/salonLandingData";
import { useRouter } from "next/navigation";

export default function FaqAndBooking() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Hair Services",
    date: "",
    location: "Mahanagar, Lucknow",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Only allow alphabets and spaces in Name field
  const handleNameChange = (e) => {
    const cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFormData((prev) => ({ ...prev, name: cleanValue }));
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  // Only allow numbers in Phone field, max 13 digits
  const handlePhoneChange = (e) => {
    const cleanValue = e.target.value.replace(/\D/g, "").slice(0, 13);
    setFormData((prev) => ({ ...prev, phone: cleanValue }));
    if (errors.phone && cleanValue.length >= 10) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate Name (alphabets only, min 2 chars)
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name (letters only)";
    }

    // Validate Phone (10 to 13 digits)
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Enter a valid 10 to 13 digit phone number";
    } else if (formData.phone.length > 13) {
      newErrors.phone = "Maximum 13 digits allowed";
    }

    // Validate Date
    if (!formData.date) {
      newErrors.date = "Please select preferred appointment date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const text =
      `Hello KNK Salon Lucknow!\n` +
      `I would like to book a salon appointment:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Service: ${formData.service}\n` +
      `• Preferred Date: ${formData.date}\n` +
      `• Preferred Branch: ${formData.location}\n` +
      `• Note / Requests: ${formData.message || "None"}\n\n` +
      `Please confirm chair availability and appointment time. Thank you!`;

    const url = `https://wa.me/918881000552?text=${encodeURIComponent(text)}`;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone,
          service: formData.service,
          location: formData.location,
          date: formData.date,
          message: formData.message?.trim() || null,
          form_type: "salon_landing_page",
        }),
      });

      const data = await res.json();
      setIsSubmitting(false);
      setSubmitted(true);

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(
            "knk_salon_thankyou",
            JSON.stringify({
              bookingId: data?.bookingId ? String(data.bookingId) : "",
              service: formData.service,
              name: formData.name.trim(),
              date: formData.date,
              location: formData.location,
            })
          );
        } catch (e) {
          console.error("Storage error:", e);
        }
      }

      router.push("/salon-landing-page/thank-you");
    } catch (err) {
      console.error("Booking API error:", err);
      setIsSubmitting(false);
      setSubmitted(true);

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(
            "knk_salon_thankyou",
            JSON.stringify({
              service: formData.service,
              name: formData.name.trim(),
              date: formData.date,
              location: formData.location,
            })
          );
        } catch (e) {
          console.error("Storage error:", e);
        }
      }

      router.push("/salon-landing-page/thank-you");
    }
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A265]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#B3203F]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Editorial & Refined */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#B3203F]/8 border border-[#B3203F]/20 text-[#B3203F] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B3203F]" />
            <span>Bespoke Reservations</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#161413] tracking-tight">
            Reserve Your Salon Experience
          </h2>

          <p className="text-sm sm:text-base text-[#7A726B] font-inter mt-3 leading-relaxed">
            Strictly prioritized appointments to dedicate undivided care and mastery to each guest.
          </p>
        </div>

        {/* 2 Equal Columns: Symmetrical & Balanced */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* ========================================================= */}
          {/* LEFT: Couture Editorial Showcase                          */}
          {/* ========================================================= */}
          <div className="bg-white rounded-3xl border border-[#EAE2D5] overflow-hidden shadow-lg shadow-[#161413]/5 flex flex-col justify-between h-full">
            {/* Top: Salon Showcase with Minimal Quote */}
            <div className="relative h-72 sm:h-80 lg:h-84 w-full bg-[#161413]">
              <Image
                src="/salon-landing-page/images/salon/salon-parallel.webp"
                alt="KNK Awadh Salon Experience"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Floating Tag */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                <Sparkle className="w-3.5 h-3.5 text-[#E6D3AF]" />
                <span>Lucknow&apos;s Luxury Salon</span>
              </div>

              {/* Floating Verified Rating */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B3203F]/90 backdrop-blur-md text-white text-xs font-semibold">
                <span>12+ Years Artistry</span>
              </div>

              {/* Client Quote */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1 text-[#E6D3AF] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E6D3AF]" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-xs sm:text-sm italic text-white/95 leading-snug">
                  &ldquo;The Nanoplastia and balayage gave my hair an unbelievable mirror shine that still looks fresh months later.&rdquo;
                </p>
                <p className="text-[11px] text-[#E6D3AF] mt-1 font-medium">
                  — Aditi Saxena, Mahanagar Studio
                </p>
              </div>
            </div>

            {/* Bottom Content: Clean Bullets & Helpline */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#161413] mb-4 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#C5A265]" />
                  <span>The KNK Signature Care</span>
                </h3>

                <ul className="space-y-3.5 text-xs sm:text-sm text-[#524B44]">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#B3203F]/10 text-[#B3203F] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-[#161413]">1-on-1 Dedicated Senior Stylist</strong> — cranial &amp; hair texture evaluation
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#B3203F]/10 text-[#B3203F] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-[#161413]">100% Authentic Global Formulations</strong> — Kérastase, L&apos;Oréal Pro, Olaplex &amp; O3+
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#B3203F]/10 text-[#B3203F] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-[#161413]">Sterilized Tools &amp; Single-Use Kits</strong> — strict clinical hygiene protocol
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#B3203F]/10 text-[#B3203F] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-[#161413]">Private VIP Treatment Suites</strong> — serene atmosphere with zero wait
                    </span>
                  </li>
                </ul>
              </div>

              {/* Minimal Clean Concierge Row */}
              <div className="mt-6 pt-5 border-t border-[#F0E9DF] flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-[#7A726B] block">Direct Studio Helpline</span>
                  <a
                    href="tel:+918881000552"
                    className="font-bold text-sm text-[#161413] hover:text-[#B3203F] transition"
                  >
                    +91 88810 00552
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+918881000552"
                    className="p-2.5 rounded-xl border border-[#EAE2D5] hover:border-[#B3203F] text-[#161413] transition shadow-xs cursor-pointer"
                    title="Call Studio"
                  >
                    <PhoneCall className="w-4 h-4 text-[#B3203F]" />
                  </a>
                  <a
                    href="https://wa.me/918881000552?text=Hi%20KNK%20Salon!%20I%20would%20like%20to%20inquire%20about%20salon%20appointment%20availability."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold transition shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: Elegant Booking Form                               */}
          {/* ========================================================= */}
          <div className="bg-white rounded-3xl border border-[#EAE2D5] p-6 sm:p-8 lg:p-9 shadow-lg shadow-[#161413]/5 flex flex-col justify-between h-full">
            <div>
              {/* Form Header */}
              <div className="border-b border-[#F0E9DF] pb-4 mb-5">
                <span className="text-[11px] font-semibold tracking-wider text-[#B3203F] uppercase block mb-1">
                  Check Chair Availability
                </span>
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#161413] tracking-tight">
                  Salon Appointment Form
                </h3>
              </div>

              {submitted ? (
                /* Clean Success Card */
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h4 className="font-playfair text-2xl font-bold text-[#161413]">
                    Request Prepared!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#524B44] max-w-sm mx-auto">
                    Thank you, <strong className="text-[#161413]">{formData.name}</strong>. WhatsApp has been opened to connect with our salon concierge.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/918881000552?text=${encodeURIComponent(
                        `Hello KNK Salon! I submitted an availability inquiry for ${formData.name} for ${formData.service} on date: ${formData.date || "Upcoming"}. Please confirm slot.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Open WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#EAE2D5] hover:bg-[#FAF8F5] text-xs font-semibold text-[#524B44] transition cursor-pointer"
                    >
                      New Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Form with Name & Phone in ONE Row */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* ROW 1: Full Name & WhatsApp Number in ONE Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#A89F93] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleNameChange}
                          placeholder="e.g. Aditi Sharma"
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] focus:bg-white border text-xs sm:text-sm text-[#161413] placeholder-[#A89F93] focus:outline-none transition ${
                            errors.name
                              ? "border-red-500 ring-1 ring-red-500/20"
                              : "border-[#E7DFD4] focus:border-[#B3203F] focus:ring-1 focus:ring-[#B3203F]"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2E2824] mb-1 flex items-center justify-between">
                        <span>Phone Number *</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#A89F93] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="e.g. 9876543210"
                          maxLength={13}
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] focus:bg-white border text-xs sm:text-sm text-[#161413] placeholder-[#A89F93] focus:outline-none transition ${
                            errors.phone
                              ? "border-red-500 ring-1 ring-red-500/20"
                              : "border-[#E7DFD4] focus:border-[#B3203F] focus:ring-1 focus:ring-[#B3203F]"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* ROW 2: Select Salon Service */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                      Select Salon Service *
                    </label>
                    <div className="relative">
                      <Sparkles className="w-4 h-4 text-[#A89F93] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] focus:bg-white border border-[#E7DFD4] text-xs sm:text-sm text-[#161413] focus:outline-none focus:border-[#B3203F] focus:ring-1 focus:ring-[#B3203F] transition appearance-none cursor-pointer"
                      >
                        <option value="Hair Services">Hair Services</option>
                        <option value="Makeup Services">Makeup Services</option>
                        <option value="Skin and Facial">Skin and Facial</option>
                        <option value="Nail Services">Nail Services</option>
                        <option value="Beauty Services">Beauty Services</option>
                        <option value="Men's Grooming">Men&apos;s Grooming</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#7A726B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* ROW 3: Preferred Appointment Date */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                      Preferred Appointment Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#A89F93] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] focus:bg-white border text-xs sm:text-sm text-[#161413] focus:outline-none transition ${
                          errors.date
                            ? "border-red-500 ring-1 ring-red-500/20"
                            : "border-[#E7DFD4] focus:border-[#B3203F] focus:ring-1 focus:ring-[#B3203F]"
                        }`}
                      />
                    </div>
                    {errors.date && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.date}</p>
                    )}
                  </div>

                  {/* ROW 4: Preferred Studio Branch (3 branches) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                      Preferred Studio Branch *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#A89F93] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] focus:bg-white border border-[#E7DFD4] text-xs sm:text-sm text-[#161413] focus:outline-none focus:border-[#B3203F] focus:ring-1 focus:ring-[#B3203F] transition appearance-none cursor-pointer"
                      >
                        <option value="Mahanagar, Lucknow">Mahanagar, Lucknow</option>
                        <option value="Gomti Nagar, Lucknow">Gomti Nagar, Lucknow</option>
                        <option value="Hazratganj, Lucknow">Hazratganj, Lucknow</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#7A726B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* ROW 5: Special Note or Requests (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                      Special Note or Requests (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-[#A89F93] absolute left-3.5 top-3 pointer-events-none" />
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="e.g. Haircut + balayage consultation, dry scalp, gel nail extensions..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] focus:bg-white border border-[#E7DFD4] text-xs sm:text-sm text-[#161413] placeholder-[#A89F93] focus:outline-none transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button & Reassurance */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#B3203F] via-[#9F1B36] to-[#80132B] hover:opacity-95 text-white font-medium text-sm sm:text-base shadow-lg shadow-[#B3203F]/20 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Checking Availability...</span>
                        </div>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#FAD59D]" />
                          <span>Check Availability &amp; Book Appointment</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* FAQS: Clean, minimal accordion below                      */}
        {/* ========================================================= */}
        <div className="mt-16 pt-12 border-t border-[#EAE2D5]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A265]/10 border border-[#C5A265]/30 text-[#9F7E42] text-xs font-semibold uppercase tracking-wider mb-2.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#C5A265]" />
              <span>Questions?</span>
            </div>
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#161413]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-[#7A726B] mt-1.5">
              Clear answers to services, treatments, and appointments at KNK Salon.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {bridalFAQs.slice(0, 7).map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#EAE2D5] bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#161413] hover:text-[#B3203F] transition-colors cursor-pointer"
                  >
                    <span className="font-playfair text-sm sm:text-base">{faq.question}</span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#B3203F] text-white border-[#B3203F] rotate-180"
                          : "bg-[#FAF8F5] text-[#524B44] border-[#EAE2D5]"
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#524B44] leading-relaxed border-t border-[#F0E9DF]/60 bg-[#FFFDF9]/60">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick FAQ Footer Callout */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#7A726B]">
              Have a specific question about your hair or skin treatment?{" "}
              <a
                href="https://wa.me/918881000552?text=Hello%20KNK%20Salon!%20I%20have%20a%20salon%20query."
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#B3203F] underline underline-offset-4 hover:text-[#80132B]"
              >
                Chat on WhatsApp &rarr;
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
