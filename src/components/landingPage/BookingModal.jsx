"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  User,
  Phone,
  MapPin,
  Sparkles,
  Send,
  CheckCircle2,
  MessageSquare,
  ChevronDown,
  X,
} from "lucide-react";
import { useBookingModal } from "@/components/landingPage/BookingContext";
import { useRouter } from "next/navigation";

export default function BookingModal() {
  const router = useRouter();
  const { isBookingOpen, closeBookingModal, selectedService } = useBookingModal();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: selectedService || "HD Bridal Makeup",
    date: "",
    location: "Mahanagar, Lucknow",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync selectedService from context when modal opens or service changes
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService, isBookingOpen]);

  // Reset state when modal closes / opens
  useEffect(() => {
    if (!isBookingOpen) {
      setSubmitted(false);
      setErrors({});
    }
  }, [isBookingOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isBookingOpen) {
        closeBookingModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBookingOpen, closeBookingModal]);

  if (!isBookingOpen) return null;

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
      newErrors.name = "Please enter bride's name (letters only)";
    }

    // Validate Phone (10 to 13 digits)
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Enter a valid 10 to 13 digit phone number";
    } else if (formData.phone.length > 13) {
      newErrors.phone = "Maximum 13 digits allowed";
    }

    // Validate Date
    if (!formData.date) {
      newErrors.date = "Please select wedding / event date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const text =
      `Hello KNK Salon Lucknow!\n` +
      `I would like to check date availability for Bridal Makeup:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Service: ${formData.service}\n` +
      `• Wedding Date: ${formData.date}\n` +
      `• Preferred Branch: ${formData.location}\n` +
      `• Note / Vision: ${formData.message || "None"}\n\n` +
      `Please share package details and confirm slot availability. Thank you!`;

    const whatsappUrl = `https://wa.me/918881000552?text=${encodeURIComponent(text)}`;

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
          form_type: "bridal_landing_modal",
        }),
      });

      const data = await res.json();
      setIsSubmitting(false);
      setSubmitted(true);

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(
            "knk_bridal_thankyou",
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

      closeBookingModal();
      router.push("/makeup-artist-lucknow/thank-you");
    } catch (err) {
      console.error("Booking modal submission error:", err);
      setIsSubmitting(false);
      setSubmitted(true);

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(
            "knk_bridal_thankyou",
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

      closeBookingModal();
      router.push("/makeup-artist-lucknow/thank-you");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeBookingModal}
      aria-modal="true"
      role="dialog"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EAE2D5] p-5 sm:p-7 md:p-8 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeBookingModal}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-[#7A726B] hover:text-[#161413] hover:bg-[#FAF8F5] transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#F0E9DF] pb-4 mb-5 pr-8">
          <span className="text-[11px] font-semibold tracking-wider text-[#B3203F] uppercase block mb-1">
            Check Date Availability
          </span>
          <h3
            id="booking-modal-title"
            className="font-playfair text-2xl sm:text-3xl font-bold text-[#161413] tracking-tight"
          >
            Bridal Consultation Form
          </h3>
        </div>

        {submitted ? (
          /* Clean Success Confirmation */
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h4 className="font-playfair text-2xl font-bold text-[#161413]">
              Request Prepared!
            </h4>
            <p className="text-xs sm:text-sm text-[#524B44] max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-[#161413]">{formData.name}</strong>. WhatsApp has been opened to connect with our bridal concierge.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/918881000552?text=${encodeURIComponent(
                  `Hello KNK Salon! I submitted an availability inquiry for ${formData.name} for ${formData.service} on date: ${formData.date || "Upcoming"}. Please share details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={closeBookingModal}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#EAE2D5] hover:bg-[#FAF8F5] text-xs sm:text-sm font-semibold text-[#524B44] transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Form matching screenshot */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ROW 1: Bride's Full Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                  Bride&apos;s Full Name *
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
                <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                  Phone Number *
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

            {/* ROW 2: Select Bridal Service */}
            <div>
              <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                Select Bridal Service *
              </label>
              <div className="relative">
                <Sparkles className="w-4 h-4 text-[#A89F93] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] focus:bg-white border border-[#E7DFD4] text-xs sm:text-sm text-[#161413] focus:outline-none focus:border-[#B3203F] focus:ring-1 focus:ring-[#B3203F] transition appearance-none cursor-pointer"
                >
                  <option value="HD Bridal Makeup">HD Bridal Makeup</option>
                  <option value="Airbrush Makeup">Airbrush Makeup</option>
                  <option value="Engagement & Sagan">Engagement & Sagan</option>
                  <option value="Reception Glam">Reception Glam</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#7A726B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* ROW 3: Wedding / Event Date */}
            <div>
              <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                Wedding / Event Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#A89F93] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  required
                  min={today}
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

            {/* ROW 4: Preferred Studio Branch */}
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
                  placeholder="e.g. Red lehenga, morning pheras, bride + 2 family guests..."
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
                    <span>Check Availability &amp; Get Pricing</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
