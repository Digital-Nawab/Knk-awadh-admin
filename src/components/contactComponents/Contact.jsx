"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const BRANCHES = [
    {
        id: "mahanagar",
        name: "KNK Salon Mahanagar",
        address: "Mahanagar Crossing (Chowraha), Mahanagar Colony, Lucknow",
        phone: "+91-9559321711",
        cleanPhone: "+919559321711",
        hours: "Mon - Sun: 10:00 AM – 08:30 PM",
        tag: "Flagship Luxury Studio",
        primaryAction: {
            label: "GET DIRECTIONS →",
            href: "https://www.google.com/maps/search/?api=1&query=KNK+Salon+Mahanagar+Crossing+Chowraha+Mahanagar+Colony+Lucknow",
            type: "link",
        },
        secondaryAction: {
            label: "CALL SALON →",
            href: "tel:+919559321711",
            type: "tel",
        },
        mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.8267230489953!2d80.9529367!3d26.8772986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd7915ec11b5%3A0xe7a505ea5d475ce9!2sKNK%20Salon%20Mahanagar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    },
    {
        id: "gomti-nagar",
        name: "KNK Salon Gomti Nagar",
        address: "02/01 Vipul Khand, Gomti Nagar, Lucknow",
        phone: "+91-8881000551",
        cleanPhone: "+918881000551",
        hours: "Mon - Sun: 10:00 AM – 08:30 PM",
        tag: "Signature Hair & Nail Lounge",
        primaryAction: {
            label: "GET DIRECTIONS →",
            href: "https://www.google.com/maps/search/?api=1&query=KNK+Salon+02%2F01+Vipul+Khand+Gomti+Nagar+Lucknow",
            type: "link",
        },
        secondaryAction: {
            label: "CALL SALON →",
            href: "tel:+918881000551",
            type: "tel",
        },
        mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.882194639912!2d80.9959604!3d26.843657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be37b019315d9%3A0x67a353fe2d3c9ec4!2s02%2F01%2C%20Vipul%20Khand%2C%20Gomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    },
    {
        id: "hazratganj",
        name: "KNK Awadh Salon & Academy – Hazratganj",
        address: "Ground Floor 11B, Tilak Marg, Opp. Ganna Sansthaan, Hazratganj Colony, Lucknow 226001",
        phone: "+91-8881000529",
        cleanPhone: "+918881000529",
        hours: "Mon - Sun: 10:00 AM – 08:30 PM",
        tag: "Heritage Studio & Cosmetology Academy",
        primaryAction: {
            label: "GET DIRECTIONS →",
            href: "https://www.google.com/maps/search/?api=1&query=KNK+Awadh+Salon+Academy+Ground+Floor+11B+Tilak+Marg+Opp+Ganna+Sansthaan+Hazratganj+Colony+Lucknow+226001",
            type: "link",
        },
        secondaryAction: {
            label: "CALL SALON →",
            href: "tel:+918881000529",
            type: "tel",
        },
        mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.3907797746187!2d80.9482811!3d26.8589204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd080fcfc319%3A0xd60416e788c0a221!2s11B%2C%20Tilak%20Marg%2C%20Dalibagh%20Colony%2C%20Hazratganj%2C%20Lucknow%2C%20Uttar%20Pradesh%20226001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    },
];

const SERVICE_GROUPS = [
    {
        category: "Bridal & Makeup",
        options: [
            "Celebrity Bridal & HD Makeup",
            "Airbrush Bridal Makeup",
            "Engagement & Reception Makeup",
            "Party & Cocktail Glam",
            "Pre-Bridal Consultation & Rituals",
        ],
    },
    {
        category: "Hair Artistry & Treatments",
        options: [
            "Designer Haircut & Styling",
            "Global Hair Colour & Balayage",
            "Keratin & Botoplex Therapy",
            "Nanoplastia Bond Straightening",
            "Hair Smoothening Ritual",
            "Deep Conditioning Hair Spa",
        ],
    },
    {
        category: "Skin, Facials & Aesthetics",
        options: [
            "Signature HydraFacial MD",
            "Luxury Facials (O3+ / Casmara / Kanpeki)",
            "Deep Pore Face Clean-Up",
            "Microblading & Semi-Permanent Makeup",
            "Laser Hair Reduction",
            "Aesthetic Skin Treatments",
        ],
    },
    {
        category: "Nails & Beauty",
        options: [
            "Gel & Acrylic Nail Extensions",
            "Bespoke Nail Art",
            "Luxury Manicure & Pedicure",
            "Gentle Waxing Rituals",
            "Body Care & Polishing",
        ],
    },
    {
        category: "Academy & Courses",
        options: [
            "Cosmetology & Hair Diploma Admission",
            "Professional Makeup Artistry Course",
            "Nail Art & Extension Masterclass",
        ],
    },
    {
        category: "Other Inquiries",
        options: [
            "Men's Royal Grooming",
            "General Salon Inquiry",
            "Other / Bespoke Consultation",
        ],
    },
];

export default function Contact() {
    const router = useRouter();
    const [selectedBranchForMap, setSelectedBranchForMap] = useState("mahanagar");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        branch: "KNK Salon Mahanagar",
        service: "Celebrity Bridal & HD Makeup",
        date: "",
        message: "",
        hp_company_url: "", // Honeypot spam trap
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errorMsg) setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        // Validation
        const trimmedName = form.name.trim();
        if (!trimmedName || trimmedName.length < 2) {
            setErrorMsg("Please enter your full name (minimum 2 characters).");
            return;
        }

        const cleanPhone = form.mobile.replace(/[^\d+]/g, "");
        if (!cleanPhone || cleanPhone.replace(/\D/g, "").length < 10) {
            setErrorMsg("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            setErrorMsg("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        const payload = {
            form_type: "contact_us",
            name: trimmedName,
            phone: cleanPhone,
            email: form.email.trim() || null,
            location: form.branch,
            service: form.service,
            date: form.date || new Date().toISOString().split("T")[0],
            message: form.message.trim() || null,
            hp_company_url: form.hp_company_url,
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
                setSuccessMsg(
                    data.message ||
                    "Thank you! Your message has been received. Our concierge team will reach out shortly."
                );

                // Redirect to thank-you page after brief timeout
                const queryParams = new URLSearchParams({
                    bookingId: data.bookingId ? String(data.bookingId) : "",
                    service: form.service,
                    name: trimmedName,
                    date: form.date || new Date().toISOString().split("T")[0],
                    location: form.branch,
                });

                setTimeout(() => {
                    router.push(`/thank-you?${queryParams.toString()}`);
                }, 1200);
            } else {
                setErrorMsg(
                    data.error || "Failed to submit your inquiry. Please call us directly."
                );
            }
        } catch {
            setErrorMsg("A network error occurred. Please try again or reach us via WhatsApp.");
        } finally {
            setLoading(false);
        }
    };

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Contact Us", href: "/contact-us" },
    ];

    const activeBranchMap = BRANCHES.find((b) => b.id === selectedBranchForMap) || BRANCHES[0];

    return (
        <div className="min-h-screen bg-cream text-ink">
            {/* ================= HERO HEADER ================= */}
            <section className="relative overflow-hidden px-5 pt-28 pb-14 md:px-10 md:pt-36 md:pb-20 border-b border-border/70 bg-gradient-cream">
                {/* Ambient gold glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/10 blur-[100px]"
                />

                <div className="mx-auto max-w-7xl">
                    <div className="mb-6">
                        <Breadcrumbs items={breadcrumbs} />
                    </div>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-px w-6 bg-gold" />
                            <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold-deep font-semibold">
                                KNK Awadh Concierge Desk
                            </span>
                        </div>

                        <h1 className="font-display italic text-4xl sm:text-5xl md:text-6xl text-[#241D18] font-normal leading-tight">
                            Connect With Our <br />
                            <span className="text-gold-deep">Awadh Studios</span>
                        </h1>

                        <div className="my-5 h-px w-24 bg-gradient-to-r from-gold to-transparent" />

                        <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
                            Experience royal hospitality, master beauty craft, and bespoke bridal consultations across our three premier locations in Lucknow. We are here to assist with appointments, bridal inquiries, and cosmetology academy admissions.
                        </p>

                        {/* Quick Touchpoint Badges */}
                        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 font-sans text-xs">
                            <a
                                href="tel:+919559321711"
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[#241D18] shadow-sm transition-all hover:border-gold hover:text-gold-deep"
                            >
                                <span className="text-gold-deep">📞</span>
                                <span className="font-semibold">+91 95593 21711</span>
                            </a>
                            <a
                                href="https://wa.me/918881000552"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[#241D18] shadow-sm transition-all hover:border-emerald-500 hover:text-emerald-700"
                            >
                                <span className="text-emerald-600">💬</span>
                                <span className="font-semibold">WhatsApp Concierge</span>
                            </a>
                            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-muted">
                                <span>⏰</span>
                                <span>Mon – Sun: 10:00 AM – 08:30 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= LOCATIONS LIST SECTION (SCREENSHOT ACCURATE) ================= */}
            <section className="py-16 sm:py-20 px-5 md:px-10 lg:px-16 bg-[#FBF7F0] border-b border-border/60">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 sm:mb-12">
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep font-semibold block mb-2">
                            Our Signature Destinations
                        </span>
                        <h2 className="font-display italic text-3xl sm:text-4xl text-[#241D18] font-normal">
                            Visit Our Salons &amp; Academy
                        </h2>
                    </div>

                    {/* Locations Rows with Thin Dividers matching Screenshot layout */}
                    <div className="divide-y divide-[#E6DECE]">
                        {BRANCHES.map((b) => (
                            <div
                                key={b.id}
                                className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors hover:bg-cream/40 px-2 sm:px-4 rounded-xl"
                            >
                                {/* Left Side: Name, Address, Phone */}
                                <div className="space-y-1.5 max-w-2xl">
                                    <h3 className="font-display italic text-2xl sm:text-3xl md:text-[34px] text-[#241D18] font-normal leading-tight">
                                        {b.name}
                                    </h3>
                                    <p className="font-sans text-xs sm:text-[13px] text-[#7A6E63] leading-relaxed">
                                        {b.address}
                                    </p>
                                    <p className="font-sans text-xs sm:text-[13px] text-[#7A6E63] tracking-wide">
                                        <a
                                            href={`tel:${b.cleanPhone}`}
                                            className="hover:text-gold-deep transition-colors"
                                        >
                                            {b.phone}
                                        </a>
                                    </p>
                                </div>

                                {/* Right Side: Action Links (GET DIRECTIONS → / CALL SALON →) */}
                                <div className="flex flex-wrap items-center gap-4 sm:gap-6 shrink-0 md:justify-end">
                                    {/* Primary Action */}
                                    <a
                                        href={b.primaryAction.href}
                                        target={b.primaryAction.type === "link" ? "_blank" : undefined}
                                        rel={b.primaryAction.type === "link" ? "noopener noreferrer" : undefined}
                                        className="font-sans text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold text-[#241D18] hover:text-gold-deep border-b border-[#241D18]/50 hover:border-gold-deep pb-0.5 transition-all inline-flex items-center gap-1.5"
                                    >
                                        {b.primaryAction.label}
                                    </a>

                                    {/* Secondary Action */}
                                    <a
                                        href={b.secondaryAction.href}
                                        target={b.secondaryAction.type === "link" ? "_blank" : undefined}
                                        rel={b.secondaryAction.type === "link" ? "noopener noreferrer" : undefined}
                                        className="font-sans text-[11px] sm:text-xs tracking-[0.2em] uppercase text-muted hover:text-gold-deep transition-colors inline-flex items-center gap-1"
                                    >
                                        {b.secondaryAction.label}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= MAIN INTERACTION: FORM & CONCIERGE GRID ================= */}
            <section className="py-20 px-5 md:px-10 lg:px-16">
                <div className="mx-auto max-w-7xl grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
                    {/* Left Column: Direct Concierge Touchpoints */}
                    <div className="space-y-8">
                        <div>
                            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep font-semibold block mb-2">
                                At Your Service
                            </span>
                            <h2 className="font-display italic text-3xl sm:text-4xl text-[#241D18] font-normal leading-tight">
                                Direct Concierge &amp; Personal Booking
                            </h2>
                            <p className="font-sans text-xs sm:text-sm text-muted mt-3 leading-relaxed">
                                Prefer speaking directly with our lead styling coordinators or bridal managers? Reach out via phone or WhatsApp for immediate consultation and customized salon packages.
                            </p>
                        </div>

                        {/* Concierge Cards */}
                        <div className="space-y-4">
                            {/* Card 1: Bridal & VIP Lounge */}
                            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft transition-all hover:border-gold">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-sans text-[10px] uppercase tracking-wider text-rose-800 font-semibold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                                        Bridal &amp; Pre-Bridal
                                    </span>
                                    <span className="text-xs text-muted">Specialist Line</span>
                                </div>
                                <h4 className="font-display text-xl text-[#241D18] font-medium">
                                    VIP Bridal Consultation Desk
                                </h4>
                                <p className="font-sans text-xs text-muted mt-1 leading-relaxed">
                                    Trial sessions, trousseau consultations, and mother-daughter bridal styling appointments.
                                </p>
                                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-sans">
                                    <a
                                        href="tel:+918881000551"
                                        className="font-semibold text-gold-deep hover:underline"
                                    >
                                        📞 +91 88810 00551
                                    </a>
                                    <a
                                        href="https://wa.me/918881000552?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Bridal%20Makeup%20packages%20at%20KNK%20Awadh."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-700 font-semibold hover:underline"
                                    >
                                        WhatsApp Desk ↗
                                    </a>
                                </div>
                            </div>

                            {/* Card 2: Academy Admissions */}
                            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft transition-all hover:border-gold">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-sans text-[10px] uppercase tracking-wider text-blue-800 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                                        Cosmetology &amp; Artistry
                                    </span>
                                    <span className="text-xs text-muted">Hazratganj Campus</span>
                                </div>
                                <h4 className="font-display text-xl text-[#241D18] font-medium">
                                    KNK Beauty Academy Admissions
                                </h4>
                                <p className="font-sans text-xs text-muted mt-1 leading-relaxed">
                                    Professional diploma courses in hair dressing, advanced makeup, nail artistry, and cosmetology.
                                </p>
                                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-sans">
                                    <a
                                        href="tel:+916390008020"
                                        className="font-semibold text-gold-deep hover:underline"
                                    >
                                        📞 +91 63900 08020
                                    </a>
                                    <a
                                        href="https://wa.me/916390008020?text=Hello%2C%20I%20am%20interested%20in%20courses%20at%20KNK%20Beauty%20Academy."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-700 font-semibold hover:underline"
                                    >
                                        Inquire via WhatsApp ↗
                                    </a>
                                </div>
                            </div>

                            {/* Card 3: Instant Support & Timings */}
                            <div className="rounded-2xl border border-border bg-card p-6">
                                <div className="flex items-start gap-4">
                                    <div className="size-10 rounded-full bg-gold/15 flex items-center justify-center text-gold-deep shrink-0 text-lg">
                                        ⏰
                                    </div>
                                    <div className="space-y-1 text-xs font-sans">
                                        <h5 className="font-semibold text-[#241D18] text-sm">
                                            Salon Operating Hours
                                        </h5>
                                        <p className="text-muted leading-relaxed">
                                            All three studios in Lucknow are open <strong>7 days a week</strong> from <strong>10:00 AM to 08:30 PM</strong>.
                                        </p>
                                        <p className="text-[#8B7D6E] pt-1">
                                            Valet parking available at Mahanagar and Hazratganj studios.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interactive Luxury Contact Form */}
                    <div className="relative">
                        <div className="rounded-3xl border border-gold/40 bg-white p-7 sm:p-10 shadow-luxe relative overflow-hidden">
                            {/* Subtle gold corner ribbon */}
                            <div className="absolute top-0 right-0 h-28 w-28 overflow-hidden pointer-events-none">
                                <div className="absolute transform rotate-45 bg-gradient-gold text-primary font-sans text-[9px] font-bold tracking-widest uppercase py-1 right-[-40px] top-[24px] w-[140px] text-center shadow-sm">
                                    Live Desk
                                </div>
                            </div>

                            <div>
                                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep font-semibold block mb-1">
                                    Online Concierge
                                </span>
                                <h3 className="font-display italic text-2xl sm:text-3xl text-[#241D18] font-normal">
                                    Send Us An Inquiry
                                </h3>
                                <p className="font-sans text-xs text-muted mt-1 mb-6">
                                    Fill in your details below and our concierge desk will contact you to confirm your appointment or consultation.
                                </p>
                            </div>

                            {/* Status Notifications */}
                            {errorMsg && (
                                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-sans text-red-700 flex items-center gap-2">
                                    <span className="text-base">⚠️</span>
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            {successMsg && (
                                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-sans text-emerald-800 flex items-center gap-2">
                                    <span className="text-base">✓</span>
                                    <span>{successMsg}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Honeypot bot protection (hidden) */}
                                <input
                                    type="text"
                                    name="hp_company_url"
                                    value={form.hp_company_url}
                                    onChange={handleChange}
                                    style={{ display: "none" }}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />

                                {/* Name & Mobile Row */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#7A6E63] font-medium block mb-1.5">
                                            Your Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Priya Sharma"
                                            className="w-full rounded-xl border border-border bg-[#FBF7F0]/70 px-4 py-3 font-sans text-xs text-ink placeholder:text-muted/60 focus:border-gold focus:bg-white focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#7A6E63] font-medium block mb-1.5">
                                            Mobile Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            required
                                            maxLength={14}
                                            value={form.mobile}
                                            onChange={handleChange}
                                            placeholder="10-digit phone number"
                                            className="w-full rounded-xl border border-border bg-[#FBF7F0]/70 px-4 py-3 font-sans text-xs text-ink placeholder:text-muted/60 focus:border-gold focus:bg-white focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Email & Preferred Branch Row */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#7A6E63] font-medium block mb-1.5">
                                            Email Address <span className="text-muted text-[10px] lowercase">(optional)</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="name@example.com"
                                            className="w-full rounded-xl border border-border bg-[#FBF7F0]/70 px-4 py-3 font-sans text-xs text-ink placeholder:text-muted/60 focus:border-gold focus:bg-white focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#7A6E63] font-medium block mb-1.5">
                                            Preferred Salon Branch <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="branch"
                                            value={form.branch}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-border bg-[#FBF7F0]/70 px-4 py-3 font-sans text-xs text-ink focus:border-gold focus:bg-white focus:outline-none transition-colors cursor-pointer"
                                        >
                                            <option value="KNK Salon Mahanagar">KNK Salon Mahanagar</option>
                                            <option value="KNK Salon Gomti Nagar">KNK Salon Gomti Nagar</option>
                                            <option value="KNK Awadh Salon & Academy – Hazratganj">
                                                KNK Awadh Salon &amp; Academy – Hazratganj
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* Service of Interest */}
                                <div>
                                    <label className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#7A6E63] font-medium block mb-1.5">
                                        Service or Inquiry Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="service"
                                        value={form.service}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-border bg-[#FBF7F0]/70 px-4 py-3 font-sans text-xs text-ink focus:border-gold focus:bg-white focus:outline-none transition-colors cursor-pointer"
                                    >
                                        {SERVICE_GROUPS.map((group) => (
                                            <optgroup key={group.category} label={`— ${group.category} —`}>
                                                {group.options.map((svc) => (
                                                    <option key={svc} value={svc}>
                                                        {svc}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>

                                {/* Preferred Date (Time Slot removed per requirements) */}
                                <div>
                                    <label className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#7A6E63] font-medium block mb-1.5">
                                        Preferred Date <span className="text-muted text-[10px] lowercase">(optional)</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        min={new Date().toISOString().split("T")[0]}
                                        value={form.date}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-border bg-[#FBF7F0]/70 px-4 py-3 font-sans text-xs text-ink focus:border-gold focus:bg-white focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#7A6E63] font-medium block mb-1.5">
                                        Your Message or Special Request <span className="text-muted text-[10px] lowercase">(optional)</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your wedding date, required hair/skin treatments, or any questions..."
                                        className="w-full rounded-xl border border-border bg-[#FBF7F0]/70 px-4 py-3 font-sans text-xs text-ink placeholder:text-muted/60 focus:border-gold focus:bg-white focus:outline-none transition-colors resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-xl bg-gradient-gold py-4 px-6 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-primary shadow-luxe transition-all hover:scale-[1.01] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="inline-block size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                                <span>Submitting Inquiry...</span>
                                            </>
                                        ) : (
                                            <span>Send Concierge Inquiry →</span>
                                        )}
                                    </button>
                                </div>

                                <p className="text-center font-sans text-[11px] text-muted pt-2">
                                    🔒 Your privacy is honored. We do not spam or share client records.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= INTERACTIVE GOOGLE MAPS PREVIEW ================= */}
            <section className="py-16 px-5 md:px-10 lg:px-16 bg-secondary/50 border-t border-border/60">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep font-semibold block mb-2">
                                Navigation &amp; Directions
                            </span>
                            <h2 className="font-display italic text-3xl sm:text-4xl text-[#241D18] font-normal">
                                Find Us On Google Maps
                            </h2>
                        </div>

                        {/* Branch Selector Tabs */}
                        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-border shadow-sm">
                            {BRANCHES.map((b) => (
                                <button
                                    key={b.id}
                                    type="button"
                                    onClick={() => setSelectedBranchForMap(b.id)}
                                    className={`px-4 py-2 rounded-xl font-sans text-xs tracking-wider uppercase transition-all ${
                                        selectedBranchForMap === b.id
                                            ? "bg-primary text-cream shadow-sm font-semibold"
                                            : "text-muted hover:text-ink hover:bg-cream"
                                    }`}
                                >
                                    {b.name.replace("KNK Salon ", "").replace("KNK Awadh Salon & Academy – ", "")}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Map Box */}
                    <div className="rounded-3xl border border-border overflow-hidden bg-white shadow-soft">
                        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cream/30">
                            <div>
                                <span className="font-display text-xl text-[#241D18] font-medium block">
                                    {activeBranchMap.name}
                                </span>
                                <p className="font-sans text-xs text-muted mt-0.5">
                                    {activeBranchMap.address}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href={`tel:${activeBranchMap.cleanPhone}`}
                                    className="px-4 py-2 rounded-lg border border-border bg-white text-xs font-sans font-medium text-ink hover:border-gold hover:text-gold-deep transition-colors"
                                >
                                    📞 {activeBranchMap.phone}
                                </a>
                                <a
                                    href={activeBranchMap.primaryAction.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg bg-primary text-cream text-xs font-sans tracking-wider uppercase font-medium hover:bg-gold-deep transition-colors"
                                >
                                    Open Maps ↗
                                </a>
                            </div>
                        </div>

                        {/* Google Maps iFrame */}
                        <div className="relative w-full h-[380px] sm:h-[440px] bg-[#f0eae1]">
                            <iframe
                                title={`Map of ${activeBranchMap.name}`}
                                src={activeBranchMap.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full filter saturate-90 contrast-95"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
