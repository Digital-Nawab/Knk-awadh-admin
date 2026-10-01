"use client";

import React, { useMemo, useRef, useState } from "react";
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
    const [form, setForm] = useState({ name: "", email: "", mobile: "", city: "", course: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (open) setForm((f) => ({ ...f, course: courseTitle || "" }));
    }, [open, courseTitle]);

    React.useEffect(() => {
        if (!open) setSubmitted(false);
    }, [open]);

    if (!open) return null;

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_type: "academy",
                    name: form.name,
                    phone: form.mobile,
                    email: form.email,
                    city: form.city,
                    course: form.course,
                    message: form.message,
                    form_started_at: Date.now(),
                }),
            });
            if (res.ok) {
                setSubmitted(true);
            } else {
                setSubmitted(true); // fallback graceful message
            }
        } catch {
            setSubmitted(true);
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
                                        value={form.mobile}
                                        onChange={handleChange}
                                        placeholder="+91 Mobile number"
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
                                            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none"
                                        >
                                            <div className="flex items-start sm:items-center gap-4">
                                                <div
                                                    className={`size-11 sm:size-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                                                        isOpen ? "bg-[#b58a52] text-white" : "bg-[#f4eee1] text-[#a17b5a]"
                                                    }`}
                                                >
                                                    <Icon size={20} strokeWidth={1.8} />
                                                </div>

                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <span className="font-['Inter'] text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#a17b5a]">
                                                            {c.category}
                                                        </span>
                                                        {isFeatured && (
                                                            <span className="inline-flex items-center gap-1 font-['Inter'] text-[8.5px] font-bold uppercase tracking-[0.16em] px-2.5 py-0.5 rounded-full bg-[#b58a52] text-white">
                                                                <Sparkles size={10} /> Popular Flagship
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h3 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-semibold text-[#29231f]">
                                                        {c.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-5 pt-2 md:pt-0 border-t md:border-t-0 border-[#e8dfc8]">
                                                {/* Duration Pill */}
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f4eee1] text-[#29231f] border border-[#e6dece]">
                                                    <Clock className="size-3.5 text-[#b58a52]" />
                                                    <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-wider">
                                                        {c.duration}
                                                    </span>
                                                </div>

                                                {/* Quick Actions */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setModalCourse(c.title);
                                                        }}
                                                        className="px-4 py-2 rounded-full font-['Inter'] text-[10.5px] font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105"
                                                        style={{ backgroundColor: GOLD }}
                                                    >
                                                        Enroll Now
                                                    </button>

                                                    <div
                                                        className={`size-8 rounded-full flex items-center justify-center border border-[#d0bda4] text-[#a17b5a] transition-transform duration-300 ${
                                                            isOpen ? "rotate-180 bg-[#f4eee1]" : "bg-white"
                                                        }`}
                                                    >
                                                        <ChevronDown size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expandable Syllabus Blueprint Drawer */}
                                        <div
                                            className="grid transition-all duration-300 ease-in-out"
                                            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                        >
                                            <div className="overflow-hidden border-t border-[#e8dfc8] bg-[#fbf7f0]/60 px-5 sm:px-7 py-6">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <BookOpen className="size-4 text-[#b58a52]" />
                                                    <span className="font-['Inter'] text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#29231f]">
                                                        Comprehensive Syllabus & Module Blueprint
                                                    </span>
                                                </div>

                                                {c.sections ? (
                                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                        {c.sections.map((sec) => (
                                                            <div
                                                                key={sec.title}
                                                                className="p-4 rounded-xl bg-white border border-[#e8dfc8] shadow-2xs"
                                                            >
                                                                <p className="mb-2.5 font-['Cormorant_Garamond'] text-base font-semibold text-[#b58a52] flex items-center gap-1.5">
                                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#b58a52]" />
                                                                    {sec.title}
                                                                </p>
                                                                <ul className="space-y-1.5">
                                                                    {sec.items.map((point) => (
                                                                        <li
                                                                            key={point}
                                                                            className="flex items-start gap-2 font-['Inter'] text-[12px] leading-relaxed text-[#71665c]"
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
                                                    <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e8dfc8] shadow-2xs">
                                                        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                                            {c.points.map((point) => (
                                                                <li
                                                                    key={point}
                                                                    className="flex items-start gap-2 font-['Inter'] text-[12px] leading-relaxed text-[#71665c]"
                                                                >
                                                                    <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-[#b58a52]" />
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Bottom Drawer Bar with Actions */}
                                                <div className="mt-6 pt-4 border-t border-[#e8dfc8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                                                    <div className="flex items-center gap-2 text-[#71665c] font-['Inter'] text-[11.5px] sm:text-[12px]">
                                                        <Sparkles className="size-3.5 text-[#b58a52] shrink-0" />
                                                        <span>Includes IAF Recognized Certification & Live Practical Evaluation</span>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                                        <a
                                                            href={`https://wa.me/918881000552?text=Hello,%20I'm%20interested%20in%20learning%20more%20about%20the%20${encodeURIComponent(c.title)}%20at%20KNK%20Academy.`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-[#25D366] text-[#128C7E] bg-white text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider hover:bg-[#25D366]/10 transition-colors text-center"
                                                        >
                                                            <MessageCircle className="size-3.5 shrink-0" />
                                                            <span>WhatsApp Syllabus</span>
                                                        </a>

                                                        <button
                                                            type="button"
                                                            onClick={() => setModalCourse(c.title)}
                                                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full font-['Inter'] text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm transition-transform hover:scale-105 text-center"
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