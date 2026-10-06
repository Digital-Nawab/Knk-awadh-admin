"use client";

import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Sparkles, UserRound, GraduationCap, Camera, Wind, Scissors,
    Hand, Shirt, Layers, PenTool, Flower2, ChevronDown, ChevronLeft, ChevronRight,
    X, Clock, CheckCircle2, ArrowRight, MessageCircle, BookOpen, Search
} from "lucide-react";
import { INK, MUTED, GOLD, GOLD_DEEP, LINE, CREAM_DEEP } from "../shared/constants";
import { courses, courseOptions } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";

const CATEGORY_ICON = {
    "Makeup Course": Sparkles,
    "Self Grooming Course": UserRound,
    "Diploma": GraduationCap,
    "Fashion & Photography Course": Camera,
    "Airbrush Makeup Course": Wind,
    "Hair Technician Course": Scissors,
    "Nail Extension Course": Hand,
    "Self Drapping Course": Shirt,
    "Professional Drapping Course": Layers,
    "Professional Henna Art": PenTool,
    "Beautician Course": Flower2,
};

function BookingModal({ open, onClose, courseTitle }) {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", mobile: "", city: "", course: "", message: "", hp_company_url: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [formStartedAt] = useState(Date.now());

    React.useEffect(() => {
        if (open) setForm((f) => ({ ...f, course: courseTitle || "" }));
    }, [open, courseTitle]);

    React.useEffect(() => {
        if (!open) {
            setSubmitted(false);
            setErrorMsg("");
        }
    }, [open]);

    if (!open) return null;

    function handleChange(e) {
        const { name, value } = e.target;
        let sanitizedValue = value;
        if (name === "name") {
            sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
        } else if (name === "mobile") {
            sanitizedValue = value.replace(/\D/g, "").slice(0, 13);
        }
        setForm((f) => ({ ...f, [name]: sanitizedValue }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMsg("");
        const cleanName = form.name.replace(/[^a-zA-Z\s]/g, "").trim();
        if (!cleanName || cleanName.length < 2) {
            setErrorMsg("Please enter your name (alphabets only, no numbers or special characters).");
            return;
        }
        const cleanPhone = form.mobile.replace(/\D/g, "");
        if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 13) {
            setErrorMsg("Please enter a valid mobile number (10 to 13 digits, numbers only).");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_type: "academy",
                    name: form.name.trim(),
                    phone: cleanPhone,
                    email: form.email.trim() || null,
                    city: form.city.trim() || null,
                    course: form.course,
                    service: form.course,
                    location: form.city.trim() ? `Academy (${form.city.trim()})` : "KNK Academy Lucknow",
                    message: form.message.trim() || null,
                    hp_company_url: form.hp_company_url || null,
                    form_started_at: formStartedAt,
                }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                onClose();
                const queryParams = new URLSearchParams({
                    bookingId: data.bookingId ? String(data.bookingId) : "",
                    service: form.course || "Academy Course",
                    name: form.name.trim(),
                    date: new Date().toISOString().split("T")[0],
                    location: form.city.trim() ? `Academy (${form.city.trim()})` : "KNK Academy Lucknow",
                });
                router.push(`/thank-you?${queryParams.toString()}`);
            } else {
                setErrorMsg(data.error || "Failed to submit booking. Please try again.");
            }
        } catch {
            setErrorMsg("Network error. Please try again or contact us directly.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:px-4 sm:py-8 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl bg-[#fffdf9] border border-[#d0bda4] max-h-[92vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header ribbon */}
                <div className="bg-[#241d18] px-5 sm:px-7 py-4 sm:py-5 text-white flex items-center justify-between shrink-0">
                    <div>
                        <p className="font-['Inter'] text-[9px] sm:text-[9.5px] uppercase tracking-[0.24em] text-[#ead9ae] font-semibold">
                            Academy Admissions
                        </p>
                        <h3 className="font-['Cormorant_Garamond'] text-lg sm:text-2xl font-medium text-[#fbf7f0] mt-0.5">
                            {courseTitle || "Reserve Your Seat"}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                        <X size={15} />
                    </button>
                </div>

                <div className="px-5 sm:px-7 py-5 sm:py-7 overflow-y-auto">
                    {submitted ? (
                        <div className="rounded-2xl p-6 text-center bg-[#f4eee1] border border-[#e6dece]">
                            <div className="size-12 rounded-full bg-[#b58a52]/20 text-[#b58a52] flex items-center justify-center mx-auto mb-3">
                                <CheckCircle2 className="size-6" />
                            </div>
                            <h4 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#29231f]">
                                Application Registered
                            </h4>
                            <p className="mt-2 font-['Inter'] text-[13px] leading-relaxed text-[#71665c]">
                                Thank you for your interest in <strong>{form.course}</strong>. Our academic counselor will call you within 2 business hours with fee structures, kit inclusions, and batch schedules.
                            </p>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-6 rounded-full px-8 py-3 font-['Inter'] text-[11px] uppercase tracking-[0.2em] font-semibold text-white transition-transform hover:scale-105"
                                style={{ backgroundColor: GOLD }}
                            >
                                Close Window
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid gap-3.5">
                            <input
                                type="text"
                                name="hp_company_url"
                                value={form.hp_company_url}
                                onChange={handleChange}
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                            />
                            {errorMsg && (
                                <p className="font-['Inter'] text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-2 rounded-lg">
                                    {errorMsg}
                                </p>
                            )}
                            <div className="grid sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block font-['Inter'] text-[10px] uppercase tracking-[0.16em] text-[#71665c] mb-1">
                                        Your Full Name *
                                    </label>
                                    <input
                                        required
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Full name"
                                        className="w-full rounded-xl border bg-[#fbf7f0] px-4 py-2.5 font-['Inter'] text-[13px] outline-none transition-colors focus:border-[#b58a52]"
                                        style={{ borderColor: LINE, color: INK }}
                                    />
                                </div>
                                <div>
                                    <label className="block font-['Inter'] text-[10px] uppercase tracking-[0.16em] text-[#71665c] mb-1">
                                        Mobile Phone *
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        name="mobile"
                                        maxLength={13}
                                        value={form.mobile}
                                        onChange={handleChange}
                                        placeholder="10-13 digit mobile number"
                                        className="w-full rounded-xl border bg-[#fbf7f0] px-4 py-2.5 font-['Inter'] text-[13px] outline-none transition-colors focus:border-[#b58a52]"
                                        style={{ borderColor: LINE, color: INK }}
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block font-['Inter'] text-[10px] uppercase tracking-[0.16em] text-[#71665c] mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@email.com"
                                        className="w-full rounded-xl border bg-[#fbf7f0] px-4 py-2.5 font-['Inter'] text-[13px] outline-none transition-colors focus:border-[#b58a52]"
                                        style={{ borderColor: LINE, color: INK }}
                                    />
                                </div>
                                <div>
                                    <label className="block font-['Inter'] text-[10px] uppercase tracking-[0.16em] text-[#71665c] mb-1">
                                        City
                                    </label>
                                    <input
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="Lucknow"
                                        className="w-full rounded-xl border bg-[#fbf7f0] px-4 py-2.5 font-['Inter'] text-[13px] outline-none transition-colors focus:border-[#b58a52]"
                                        style={{ borderColor: LINE, color: INK }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-['Inter'] text-[10px] uppercase tracking-[0.16em] text-[#71665c] mb-1">
                                    Selected Masterclass *
                                </label>
                                <select
                                    required
                                    name="course"
                                    value={form.course}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border bg-[#fbf7f0] px-4 py-2.5 font-['Inter'] text-[13px] outline-none transition-colors focus:border-[#b58a52]"
                                    style={{ borderColor: LINE, color: form.course ? INK : MUTED }}
                                >
                                    <option value="">Select Course...</option>
                                    {courseOptions.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-['Inter'] text-[10px] uppercase tracking-[0.16em] text-[#71665c] mb-1">
                                    Message or Prior Experience
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your learning goals or batch timing preference..."
                                    rows={2}
                                    className="w-full resize-none rounded-xl border bg-[#fbf7f0] px-4 py-2.5 font-['Inter'] text-[13px] outline-none transition-colors focus:border-[#b58a52]"
                                    style={{ borderColor: LINE, color: INK }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 w-full rounded-full py-3.5 font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] shadow-md transition-all hover:scale-[1.02] disabled:opacity-50"
                                style={{ backgroundColor: GOLD, color: "#fffdf9" }}
                            >
                                {loading ? "Registering..." : "Confirm Consultation Request"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Courses() {
    const categories = useMemo(
        () => courseOptions.filter((cat) => courses.some((c) => c.category === cat)),
        []
    );

    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [modalCourse, setModalCourse] = useState(null);
    const tabsRef = useRef(null);

    const INITIAL_LIMIT = 6;

    const filteredCourses = useMemo(() => {
        return courses.filter((c) => {
            const matchesCat = activeCategory === "all" || c.category === activeCategory;
            const matchesSearch = !searchQuery.trim() ||
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const displayedCourses = useMemo(() => {
        if (showAll || searchQuery.trim() || filteredCourses.length <= INITIAL_LIMIT) {
            return filteredCourses;
        }
        return filteredCourses.slice(0, INITIAL_LIMIT);
    }, [filteredCourses, showAll, searchQuery]);

    function selectCategory(cat, btnEl) {
        setActiveCategory(cat);
        setOpenIndex(0);
        setShowAll(false);
        btnEl?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }

    function scrollTabs(direction) {
        const el = tabsRef.current;
        if (!el) return;
        el.scrollBy({ left: direction * 240, behavior: "smooth" });
    }

    return (
        <section id="courses" className="px-5 sm:px-8 py-20 md:py-28 bg-[#f4eee1] relative scroll-mt-20">
            {/* Section Header */}
            <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-14">
                <SectionHeading
                    eyebrow="Curated Academics"
                    line1="Masterclasses &"
                    line2="professional diplomas."
                    description="From 1-week focused masterclasses to 6-month comprehensive diplomas. Every course is designed with practical live-client simulations and globally recognised credentials."
                    center
                />
                <GoldDivider center />
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Search Bar + Category Strip Controls */}
                <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Category Scroll Strip */}
                    <div className="relative flex items-center gap-2 w-full sm:flex-1 overflow-hidden">
                        <button
                            type="button"
                            onClick={() => scrollTabs(-1)}
                            aria-label="Previous categories"
                            className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fffdf9] border border-[#d0bda4] text-[#a17b5a] shadow-xs hover:bg-[#b58a52] hover:text-white transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <div className="relative min-w-0 flex-1 overflow-hidden">
                            <div
                                ref={tabsRef}
                                className="flex gap-2 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                            >
                                <button
                                    type="button"
                                    onClick={(e) => selectCategory("all", e.currentTarget)}
                                    className={`shrink-0 px-4 py-2 rounded-full font-['Inter'] text-[10.5px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                                        activeCategory === "all"
                                            ? "bg-[#29231f] text-[#fbf7f0] shadow-sm"
                                            : "bg-[#fffdf9] text-[#71665c] border border-[#d0bda4] hover:border-[#b58a52] hover:text-[#29231f]"
                                    }`}
                                >
                                    All Courses ({courses.length})
                                </button>

                                {categories.map((cat) => {
                                    const Icon = CATEGORY_ICON[cat] || Sparkles;
                                    const isActive = cat === activeCategory;
                                    const count = courses.filter((c) => c.category === cat).length;
                                    return (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={(e) => selectCategory(cat, e.currentTarget)}
                                            className={`relative shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-['Inter'] text-[10.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
                                                isActive
                                                    ? "bg-[#b58a52] text-white shadow-sm"
                                                    : "bg-[#fffdf9] text-[#71665c] border border-[#d0bda4] hover:border-[#b58a52] hover:text-[#29231f]"
                                            }`}
                                        >
                                            <Icon size={12} className={isActive ? "text-white" : "text-[#b58a52]"} />
                                            <span>{cat}</span>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-[#f4eee1] text-[#71665c]"}`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => scrollTabs(1)}
                            aria-label="Next categories"
                            className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fffdf9] border border-[#d0bda4] text-[#a17b5a] shadow-xs hover:bg-[#b58a52] hover:text-white transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Quick Search */}
                    <div className="relative w-full sm:w-64 shrink-0">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-[#a17b5a]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search courses..."
                            className="w-full pl-9 pr-3.5 py-2 rounded-full bg-[#fffdf9] border border-[#d0bda4] text-[12px] font-['Inter'] text-[#29231f] placeholder-[#a89d91] outline-none focus:border-[#b58a52] transition-colors"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#a89d91] hover:text-[#29231f]"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Courses Listing Cards */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-16 bg-[#fffdf9] rounded-2xl border border-[#d0bda4]">
                        <p className="font-['Cormorant_Garamond'] text-2xl text-[#29231f]">No matching courses found.</p>
                        <p className="mt-2 font-['Inter'] text-[13px] text-[#71665c]">Try clearing your search query or selecting another discipline.</p>
                        <button
                            type="button"
                            onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                            className="mt-4 px-6 py-2.5 rounded-full bg-[#b58a52] text-white text-[11px] uppercase tracking-wider font-semibold"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4 sm:gap-5">
                            {displayedCourses.map((c, i) => {
                                const isOpen = i === openIndex;
                                const Icon = CATEGORY_ICON[c.category] || Sparkles;
                                const isFeatured = c.featured;

                                return (
                                    <div
                                        key={c.title + c.duration}
                                        className={`overflow-hidden rounded-2xl transition-all duration-300 ${
                                            isFeatured
                                                ? "border-2 border-[#b58a52] shadow-[0_16px_40px_-20px_rgba(181,138,82,0.3)] bg-gradient-to-r from-[#fffdf9] to-[#faf3e6]"
                                                : "border border-[#d0bda4] bg-[#fffdf9] hover:border-[#b58a52]/70 shadow-xs"
                                        }`}
                                    >
                                        {/* Card Header / Summary Clickable Bar */}
                                        <div
                                            onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                            className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4 p-4 sm:p-6 cursor-pointer select-none"
                                        >
                                            <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                                <div
                                                    className={`size-10 sm:size-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                                                        isOpen ? "bg-[#b58a52] text-white" : "bg-[#f4eee1] text-[#a17b5a]"
                                                    }`}
                                                >
                                                    <Icon size={18} className="sm:size-5" strokeWidth={1.8} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                                                        <span className="font-['Inter'] text-[9px] sm:text-[9.5px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold text-[#a17b5a]">
                                                            {c.category}
                                                        </span>
                                                        {isFeatured && (
                                                            <span className="inline-flex items-center gap-1 font-['Inter'] text-[8px] sm:text-[8.5px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] px-2 sm:px-2.5 py-0.5 rounded-full bg-[#b58a52] text-white">
                                                                <Sparkles size={9} className="sm:size-2.5" /> Popular Flagship
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h3 className="font-['Cormorant_Garamond'] text-lg sm:text-2xl font-semibold text-[#29231f] leading-snug break-words">
                                                        {c.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-5 pt-2.5 md:pt-0 border-t md:border-t-0 border-[#e8dfc8]">
                                                {/* Duration Pill */}
                                                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#f4eee1] text-[#29231f] border border-[#e6dece] shrink-0">
                                                    <Clock className="size-3 sm:size-3.5 text-[#b58a52]" />
                                                    <span className="font-['Inter'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                                        {c.duration}
                                                    </span>
                                                </div>

                                                {/* Quick Actions */}
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setModalCourse(c.title);
                                                        }}
                                                        className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-['Inter'] text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 shrink-0"
                                                        style={{ backgroundColor: GOLD }}
                                                    >
                                                        Enroll Now
                                                    </button>

                                                    <div
                                                        className={`size-7 sm:size-8 rounded-full flex items-center justify-center border border-[#d0bda4] text-[#a17b5a] transition-transform duration-300 shrink-0 ${
                                                            isOpen ? "rotate-180 bg-[#f4eee1]" : "bg-white"
                                                        }`}
                                                    >
                                                        <ChevronDown size={15} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expandable Syllabus Blueprint Drawer */}
                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${
                                                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                        >
                                            <div className="overflow-hidden min-h-0">
                                                <div className="border-t border-[#e8dfc8] bg-[#fbf7f0]/60 px-4 py-5 sm:px-7 sm:py-6">
                                                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                                        <BookOpen className="size-3.5 sm:size-4 text-[#b58a52] shrink-0" />
                                                        <span className="font-['Inter'] text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-semibold text-[#29231f]">
                                                            Comprehensive Syllabus &amp; Module Blueprint
                                                        </span>
                                                    </div>

                                                    {c.sections ? (
                                                        <div className="grid gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                            {c.sections.map((sec) => (
                                                                <div
                                                                    key={sec.title}
                                                                    className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#e8dfc8] shadow-2xs"
                                                                >
                                                                    <p className="mb-2 sm:mb-2.5 font-['Cormorant_Garamond'] text-[15px] sm:text-base font-semibold text-[#b58a52] flex items-center gap-1.5">
                                                                        <span className="h-1.5 w-1.5 rounded-full bg-[#b58a52]" />
                                                                        {sec.title}
                                                                    </p>
                                                                    <ul className="space-y-1.5">
                                                                        {sec.items.map((point) => (
                                                                            <li
                                                                                key={point}
                                                                                className="flex items-start gap-2 font-['Inter'] text-[11.5px] sm:text-[12px] leading-relaxed text-[#71665c]"
                                                                            >
                                                                                <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-[#b58a52]/80" />
                                                                                <span>{point}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="p-3.5 sm:p-5 rounded-xl bg-white border border-[#e8dfc8] shadow-2xs">
                                                            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                                                                {c.points.map((point) => (
                                                                    <li
                                                                        key={point}
                                                                        className="flex items-start gap-2 font-['Inter'] text-[11.5px] sm:text-[12px] leading-relaxed text-[#71665c]"
                                                                    >
                                                                        <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-[#b58a52]" />
                                                                        <span>{point}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Bottom Drawer Bar with Actions */}
                                                    <div className="mt-5 sm:mt-6 pt-4 border-t border-[#e8dfc8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                                                        <div className="flex items-center gap-2 text-[#71665c] font-['Inter'] text-[11px] sm:text-[12px]">
                                                            <Sparkles className="size-3.5 text-[#b58a52] shrink-0" />
                                                            <span>Includes IAF Recognized Certification &amp; Live Practical Evaluation</span>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
                                                            <a
                                                                href={`https://wa.me/918881000552?text=Hello,%20I'm%20interested%20in%20learning%20more%20about%20the%20${encodeURIComponent(c.title)}%20at%20KNK%20Academy.`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-[#25D366] text-[#128C7E] bg-white text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider hover:bg-[#25D366]/10 transition-colors text-center"
                                                            >
                                                                <MessageCircle className="size-3.5 shrink-0" />
                                                                <span>WhatsApp Syllabus</span>
                                                            </a>

                                                            <button
                                                                type="button"
                                                                onClick={() => setModalCourse(c.title)}
                                                                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full font-['Inter'] text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm transition-transform hover:scale-105 text-center"
                                                                style={{ backgroundColor: GOLD }}
                                                            >
                                                                <span>Reserve Seat</span>
                                                                <ArrowRight className="size-3.5 shrink-0" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* View More / View Less Button */}
                        {filteredCourses.length > INITIAL_LIMIT && !searchQuery.trim() && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setShowAll((prev) => !prev)}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-sm hover:scale-105"
                                    style={{
                                        backgroundColor: showAll ? "#fffdf9" : "#b58a52",
                                        color: showAll ? "#29231f" : "#ffffff",
                                        border: "1px solid #b58a52",
                                    }}
                                >
                                    <span>{showAll ? "View Less" : `View More (${filteredCourses.length - INITIAL_LIMIT} More Courses)`}</span>
                                    <ChevronDown
                                        size={15}
                                        className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                                    />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <BookingModal open={!!modalCourse} onClose={() => setModalCourse(null)} courseTitle={modalCourse} />
        </section>
    );
}