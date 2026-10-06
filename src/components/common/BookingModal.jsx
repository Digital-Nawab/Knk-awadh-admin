"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_SERVICES_LIST = [
    {
        category: "Nails",
        items: [
            "French Nail Art",
            "Nail Art",
            "Gel Polish",
            "Gel Nail Extension",
            "Acrylic Nail Extension",
            "Luxury Manicure",
            "Therapeutic Pedicure",
        ],
    },
    {
        category: "Hair",
        items: [
            "Haircut & Styling",
            "Hair Colour & Balayage",
            "Hair Spa Rituals",
            "Keratin Treatment",
            "Smoothening",
            "Nanoplastia Therapy",
            "Couture Hair Styling",
        ],
    },
    {
        category: "Beauty",
        items: [
            "Deep Face Clean-Up",
            "Gentle Waxing Rituals",
            "Precision Threading",
            "Bleach & Detan",
            "Full Body Waxing",
        ],
    },
    {
        category: "Facial",
        items: [
            "Signature HydraFacial",
            "Casmara Luxury Facial",
            "O3+ Radiance Facial",
            "Kanpeki Japanese Facial",
            "Thalgo Marine Facial",
            "Skin Glow Clean-Up",
        ],
    },
    {
        category: "Body",
        items: [
            "Body Care & Polishing",
            "Full Body Exfoliating Scrub",
            "Swedish Body Massage",
            "Deep Tissue Massage",
            "Foot & Head Massage",
            "Steam Bath Therapy",
        ],
    },
    {
        category: "Makeup Studio",
        items: [
            "Bridal Makeup (HD / Airbrush)",
            "Engagement Makeup",
            "Reception Makeup",
            "Party & Cocktail Glam",
        ],
    },
    {
        category: "Men's Grooming",
        items: [
            "Men's Haircut & Styling",
            "Beard Sculpting & Trim",
            "Hot Towel Straight-Razor Shave",
            "Men's Detan & Glow Facial",
            "Men's Hair Spa & Scalp Detox",
        ],
    },
];

const BRANCH_LOCATIONS = [
    "Mahanagar, Lucknow",
    "Gomti Nagar, Lucknow",
    "Hazratganj, Lucknow",
];

export default function BookingModal({ isOpen, onClose, initialService = "" }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [service, setService] = useState("");
    const [branch, setBranch] = useState("Mahanagar, Lucknow");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [servicesList, setServicesList] = useState(DEFAULT_SERVICES_LIST);

    // Initialize date to today's date formatted as YYYY-MM-DD
    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        setDate(`${yyyy}-${mm}-${dd}`);
    }, []);

    // Load active services dynamically from backend
    useEffect(() => {
        let isMounted = true;
        const fetchDynamicServices = async () => {
            try {
                const res = await fetch("/api/services");
                if (res.ok) {
                    const data = await res.json();
                    if (data.services && data.services.length > 0 && isMounted) {
                        const grouped = {};
                        data.services.forEach((s) => {
                            const cat = s.category_name || "General";
                            if (!grouped[cat]) grouped[cat] = [];
                            if (!grouped[cat].includes(s.name)) {
                                grouped[cat].push(s.name);
                            }
                        });
                        const formatted = Object.keys(grouped).map((cat) => ({
                            category: cat,
                            items: grouped[cat],
                        }));
                        setServicesList(formatted);
                    }
                }
            } catch (err) {
                console.warn("Could not fetch dynamic services list, using fallback.", err);
            }
        };
        fetchDynamicServices();
        return () => {
            isMounted = false;
        };
    }, []);

    // Set service whenever modal opens or initialService changes
    useEffect(() => {
        if (isOpen) {
            setErrorMsg("");
            if (initialService) {
                setService(initialService);
            } else if (!service && servicesList.length > 0 && servicesList[0].items.length > 0) {
                setService(servicesList[0].items[0]);
            }
        }
    }, [isOpen, initialService, servicesList]);

    // Handle Escape key to close modal
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent background scrolling when open
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        // Frontend validation
        const cleanName = name.replace(/[^a-zA-Z\s]/g, "").trim();
        if (!cleanName || cleanName.length < 2) {
            setErrorMsg("Please enter your full name (alphabets only, no numbers or special characters).");
            return;
        }

        const cleanPhone = phone.replace(/\D/g, "");
        if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 13) {
            setErrorMsg("Please enter a valid mobile number (10 to 13 digits, numbers only).");
            return;
        }

        if (!service) {
            setErrorMsg("Please select a service.");
            return;
        }

        if (!date) {
            setErrorMsg("Please choose your preferred appointment date.");
            return;
        }

        if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setErrorMsg("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        const payload = {
            form_type: "modal_booking",
            name: name.trim(),
            phone: cleanPhone,
            email: email.trim() || null,
            service: service,
            location: branch,
            date: date,
            message: notes.trim() || null,
            form_started_at: Date.now() - 3000,
        };

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Close modal and redirect to dedicated Thank You page
                onClose();
                const queryParams = new URLSearchParams({
                    bookingId: data.bookingId ? String(data.bookingId) : "",
                    service: service,
                    name: name.trim(),
                    date: date,
                    location: branch,
                });
                router.push(`/thank-you?${queryParams.toString()}`);
            } else {
                setErrorMsg(data.error || "Failed to reserve appointment. Please call us directly.");
            }
        } catch {
            setErrorMsg("A network error occurred. Please check your connection or contact us on WhatsApp.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetAndClose = () => {
        setName("");
        setPhone("");
        setEmail("");
        setNotes("");
        setErrorMsg("");
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/65 backdrop-blur-sm transition-opacity duration-300"
            onClick={(e) => {
                if (e.target === e.currentTarget) handleResetAndClose();
            }}
        >
            <div className="relative w-full max-w-xl my-auto overflow-hidden rounded-2xl border border-gold/40 bg-cream text-ink shadow-[0_25px_80px_rgba(0,0,0,0.35)] transition-all">
                {/* Top luxury gold bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-gold via-gold-soft to-gold" />

                {/* Close Button */}
                <button
                    onClick={handleResetAndClose}
                    type="button"
                    aria-label="Close modal"
                    className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-white/80 text-muted transition-colors hover:border-gold hover:bg-gold/10 hover:text-ink cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                {/* Booking Form */}
                <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
                    <div className="mb-6">
                        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                            KNK Salon Concierge
                        </span>
                        <h2 className="mt-1 font-display text-2xl sm:text-3xl italic text-ink">
                            Book An Appointment
                        </h2>
                        <p className="mt-1 font-sans text-xs text-muted">
                            Select your desired service and preferred date. We will confirm your bespoke luxury session.
                        </p>
                    </div>

                    {errorMsg && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Radhika Sharma"
                                    value={name}
                                    onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                                    className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 font-sans text-xs text-ink placeholder:text-muted/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                                />
                            </div>
                            <div>
                                <label className="block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink mb-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    required
                                    maxLength={13}
                                    placeholder="10-13 digit mobile number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 13))}
                                    className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 font-sans text-xs text-ink placeholder:text-muted/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold font-mono"
                                />
                            </div>
                        </div>

                        {/* Service Selection */}
                        <div>
                            <label className="block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink mb-1">
                                Selected Service <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                required
                                className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 font-sans text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer"
                            >
                                <option value="" disabled>Select a service</option>
                                {servicesList.map((group) => (
                                    <optgroup key={group.category} label={`— ${group.category} —`}>
                                        {group.items.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                                <option value="Consultation / Other Service">
                                    Other / Bespoke Consultation
                                </option>
                            </select>
                        </div>

                        {/* Salon Studio Location */}
                        <div>
                            <label className="block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink mb-1">
                                Salon Studio Location
                            </label>
                            <select
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 font-sans text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer"
                            >
                                {BRANCH_LOCATIONS.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Preferred Date (Time Slot removed per requirements) */}
                        <div>
                            <label className="block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink mb-1">
                                Preferred Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 font-sans text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer"
                            />
                        </div>

                        {/* Email & Special Requests / Notes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink mb-1">
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 font-sans text-xs text-ink placeholder:text-muted/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                                />
                            </div>
                            <div>
                                <label className="block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink mb-1">
                                    Special Requests / Notes
                                </label>
                                <input
                                    type="text"
                                    placeholder="Any specific preference or stylist"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 font-sans text-xs text-ink placeholder:text-muted/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-full bg-gradient-gold py-3.5 px-6 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-luxe transition-transform hover:scale-[1.02] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
                            >
                                {loading ? "Securing Appointment..." : "Confirm & Book Slot"}
                            </button>
                            <p className="mt-2.5 text-center font-sans text-[10px] text-muted tracking-wide">
                                ✦ Free cancellation • No advance payment required • Instant confirmation
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
