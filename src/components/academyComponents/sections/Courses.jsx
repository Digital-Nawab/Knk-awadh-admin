"use client";

import React, { useMemo, useRef, useState } from "react";
import {
    Sparkles, UserRound, GraduationCap, Camera, Wind, Scissors,
    Hand, Shirt, Layers, PenTool, Flower2, ChevronDown, ChevronLeft, ChevronRight, X,
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
        // TODO: point this at your actual booking endpoint
        setSubmitted(true);
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
            style={{ backgroundColor: "rgba(36,29,24,0.55)" }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
                style={{ backgroundColor: "#fffdf9" }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ color: MUTED, backgroundColor: CREAM_DEEP }}
                >
                    <X size={14} />
                </button>

                <div className="px-7 pb-8 pt-9">
                    <p className="font-['Inter'] text-[10px] font-medium uppercase tracking-[0.25em]" style={{ color: GOLD_DEEP }}>
                        Book Appointment
                    </p>
                    <h3 className="mt-2 font-['Cormorant_Garamond'] text-2xl font-medium" style={{ color: INK }}>
                        {courseTitle || "Reserve your seat"}
                    </h3>

                    {submitted ? (
                        <div className="mt-8 rounded-xl px-5 py-6 text-center" style={{ backgroundColor: CREAM_DEEP }}>
                            <p className="font-['Inter'] text-[13px] leading-relaxed" style={{ color: INK }}>
                                Thank you! Our academy counsellor will reach out to you shortly.
                            </p>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-5 rounded-full px-6 py-2.5 font-['Inter'] text-[11px] uppercase tracking-[0.2em]"
                                style={{ backgroundColor: GOLD, color: "#fffdf9" }}
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                            <input required name="name" value={form.name} onChange={handleChange} placeholder="Name *"
                                className="w-full rounded-lg border bg-transparent px-4 py-3 font-['Inter'] text-[13px] outline-none"
                                style={{ borderColor: LINE, color: INK }} />
                            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email"
                                className="w-full rounded-lg border bg-transparent px-4 py-3 font-['Inter'] text-[13px] outline-none"
                                style={{ borderColor: LINE, color: INK }} />
                            <input required name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number *"
                                className="w-full rounded-lg border bg-transparent px-4 py-3 font-['Inter'] text-[13px] outline-none"
                                style={{ borderColor: LINE, color: INK }} />
                            <input name="city" value={form.city} onChange={handleChange} placeholder="City"
                                className="w-full rounded-lg border bg-transparent px-4 py-3 font-['Inter'] text-[13px] outline-none"
                                style={{ borderColor: LINE, color: INK }} />
                            <select required name="course" value={form.course} onChange={handleChange}
                                className="w-full rounded-lg border bg-transparent px-4 py-3 font-['Inter'] text-[13px] outline-none"
                                style={{ borderColor: LINE, color: form.course ? INK : MUTED }}>
                                <option value="">Select Course *</option>
                                {courseOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" rows={3}
                                className="w-full resize-none rounded-lg border bg-transparent px-4 py-3 font-['Inter'] text-[13px] outline-none"
                                style={{ borderColor: LINE, color: INK }} />
                            <button type="submit"
                                className="mt-1 w-full rounded-full px-6 py-3.5 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.2em]"
                                style={{ backgroundColor: GOLD, color: "#fffdf9" }}>
                                Book An Appointment
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

    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [openIndex, setOpenIndex] = useState(0);
    const [modalCourse, setModalCourse] = useState(null);
    const tabsRef = useRef(null);

    const activeCourses = useMemo(
        () => courses.filter((c) => c.category === activeCategory),
        [activeCategory]
    );

    function selectCategory(cat, btnEl) {
        setActiveCategory(cat);
        setOpenIndex(0);
        btnEl?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }

    function scrollTabs(direction) {
        const el = tabsRef.current;
        if (!el) return;
        el.scrollBy({ left: direction * 220, behavior: "smooth" });
    }

    return (
        <section id="courses" className="px-6 py-20 md:py-24" style={{ backgroundColor: CREAM_DEEP }}>
            <div className="max-w-3xl mx-auto text-center mb-14">
                <SectionHeading eyebrow="Enroll Today" line1="Our" line2="courses." center />
                <div className="flex justify-center"><GoldDivider center /></div>
                <p className="mt-7 font-['Inter'] text-[13px] leading-[1.9] sm:text-[14px]" style={{ color: MUTED }}>
                    From a one-week Airbrush course to a full 6-month diploma, pick the
                    program that matches where you want your career to go — every course,
                    every module, laid out below.
                </p>
            </div>

            <div className="max-w-5xl mx-auto">
                {/* Underline tab strip with prev/next buttons */}
                <div className="relative mb-10 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => scrollTabs(-1)}
                        aria-label="Previous categories"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
                        style={{ backgroundColor: "#fffdf9", border: `1px solid ${LINE}`, color: GOLD_DEEP }}
                    >
                        <ChevronLeft size={16} strokeWidth={2} />
                    </button>

                    <div className="relative min-w-0 flex-1">
                        <div
                            ref={tabsRef}
                            className="flex gap-1 overflow-x-auto scroll-smooth border-b [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                            style={{ borderColor: LINE }}
                        >
                            {categories.map((cat) => {
                                const Icon = CATEGORY_ICON[cat] || Sparkles;
                                const isActive = cat === activeCategory;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={(e) => selectCategory(cat, e.currentTarget)}
                                        className="relative flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-4 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.13em] transition-colors duration-300"
                                        style={{ color: isActive ? INK : MUTED }}
                                    >
                                        <Icon size={14} strokeWidth={1.75} style={{ color: isActive ? GOLD_DEEP : MUTED }} />
                                        {cat}
                                        <span
                                            className="absolute inset-x-3 -bottom-px h-[2px] rounded-full transition-opacity duration-300"
                                            style={{ backgroundColor: GOLD, opacity: isActive ? 1 : 0 }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        {/* edge fades hinting there's more to scroll */}
                        <div className="pointer-events-none absolute left-0 top-0 h-full w-8" style={{ background: `linear-gradient(90deg, ${CREAM_DEEP}, transparent)` }} />
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-8" style={{ background: `linear-gradient(270deg, ${CREAM_DEEP}, transparent)` }} />
                    </div>

                    <button
                        type="button"
                        onClick={() => scrollTabs(1)}
                        aria-label="Next categories"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
                        style={{ backgroundColor: "#fffdf9", border: `1px solid ${LINE}`, color: GOLD_DEEP }}
                    >
                        <ChevronRight size={16} strokeWidth={2} />
                    </button>
                </div>

                {/* Course cards */}
                <div className="grid gap-4">
                    {activeCourses.map((c, i) => {
                        const isOpen = i === openIndex;
                        const Icon = CATEGORY_ICON[c.category] || Sparkles;
                        return (
                            <div
                                key={c.title + c.duration}
                                className="overflow-hidden rounded-2xl transition-shadow duration-300"
                                style={{
                                    backgroundColor: "#fffdf9",
                                    border: `1px solid ${isOpen ? GOLD : LINE}`,
                                    boxShadow: isOpen ? "0 20px 40px -24px rgba(181,138,82,0.35)" : "none",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                                >
                                    <span
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                                        style={{ backgroundColor: isOpen ? GOLD : CREAM_DEEP }}
                                    >
                                        <Icon size={17} strokeWidth={1.75} style={{ color: isOpen ? "#fffdf9" : GOLD_DEEP }} />
                                    </span>

                                    <span className="min-w-0 flex-1">
                                        <span className="flex flex-wrap items-center gap-2">
                                            {c.featured && (
                                                <span
                                                    className="font-['Inter'] text-[8px] font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded-full"
                                                    style={{ backgroundColor: GOLD, color: "#241d18" }}
                                                >
                                                    Popular
                                                </span>
                                            )}
                                            <span className="font-['Cormorant_Garamond'] text-lg font-medium sm:text-xl" style={{ color: INK }}>
                                                {c.title}
                                            </span>
                                        </span>
                                        <span className="mt-0.5 block font-['Inter'] text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: GOLD_DEEP }}>
                                            {c.duration}
                                        </span>
                                    </span>

                                    <ChevronDown
                                        size={16}
                                        className="shrink-0 transition-transform duration-300"
                                        style={{ color: GOLD_DEEP, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                                    />
                                </button>

                                <div
                                    className="grid transition-all duration-300 ease-out"
                                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-5 pb-7 pt-1 sm:px-6" style={{ borderTop: `1px solid ${LINE}` }}>
                                            {c.sections ? (
                                                <div className="mb-6 mt-5 grid gap-5 sm:grid-cols-2">
                                                    {c.sections.map((sec) => (
                                                        <div key={sec.title}>
                                                            <p className="mb-2 font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: GOLD_DEEP }}>
                                                                {sec.title}
                                                            </p>
                                                            <ul className="grid gap-2">
                                                                {sec.items.map((point) => (
                                                                    <li key={point} className="flex items-start gap-2 font-['Inter'] text-[12px] leading-relaxed" style={{ color: MUTED }}>
                                                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} />
                                                                        {point}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <ul className="mb-6 mt-5 grid gap-2 sm:grid-cols-2">
                                                    {c.points.map((point) => (
                                                        <li key={point} className="flex items-start gap-2 font-['Inter'] text-[12px] leading-relaxed" style={{ color: MUTED }}>
                                                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => setModalCourse(c.title)}
                                                className="inline-flex items-center justify-center rounded-full px-6 py-3 font-['Inter'] text-[11px] uppercase tracking-[0.2em] transition-colors"
                                                style={{ border: `1px solid ${GOLD}`, color: GOLD_DEEP }}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <BookingModal open={!!modalCourse} onClose={() => setModalCourse(null)} courseTitle={modalCourse} />
        </section>
    );
}