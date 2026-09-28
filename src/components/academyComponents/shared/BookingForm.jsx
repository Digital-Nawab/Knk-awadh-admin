"use client";

import React, { useState } from "react";
import { INK, MUTED, GOLD, LINE, courseOptions } from "./constants";

export default function BookingForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formStartedAt] = useState(Date.now());
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        city: "",
        course: "",
        message: "",
        hp_company_url: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (!form.name || !form.mobile || !form.course) return;

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
                    hp_company_url: form.hp_company_url,
                    form_started_at: formStartedAt,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setSubmitted(true);
            } else {
                setError(data.error || "Failed to submit application. Please try again.");
            }
        } catch {
            setError("Network error. Please try again or reach out directly.");
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <div className="bg-[#fffdf9] border rounded-2xl p-10 text-center" style={{ borderColor: LINE }}>
                <span className="text-3xl mb-3 block">🎓</span>
                <p className="font-['Cormorant_Garamond'] text-2xl font-medium mb-2" style={{ color: INK }}>
                    Application received.
                </p>
                <p className="font-['Inter'] text-[13px] max-w-md mx-auto" style={{ color: MUTED }}>
                    Our academy admissions counselor will call you shortly to guide you on syllabus details, batch timings, and certification benefits.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-[#fffdf9] border rounded-2xl p-8 md:p-10 grid sm:grid-cols-2 gap-5" style={{ borderColor: LINE }}>
            {/* Honeypot */}
            <input
                type="text"
                name="hp_company_url"
                value={form.hp_company_url}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
            />

            {error && (
                <div className="sm:col-span-2 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs font-['Inter']">
                    {error}
                </div>
            )}

            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Your Name *</label>
                <input
                    name="name" value={form.name} onChange={handleChange} required
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="Your full name"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Contact Number *</label>
                <input
                    name="mobile" value={form.mobile} onChange={handleChange} required
                    type="tel"
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="+91"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Email</label>
                <input
                    name="email" value={form.email} onChange={handleChange} type="email"
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="you@email.com"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>City</label>
                <input
                    name="city" value={form.city} onChange={handleChange}
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="Lucknow"
                />
            </div>
            <div className="sm:col-span-2">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Select Course *</label>
                <select
                    name="course" value={form.course} onChange={handleChange} required
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                >
                    <option value="">Select a course</option>
                    {courseOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="sm:col-span-2">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Your Message</label>
                <textarea
                    name="message" value={form.message} onChange={handleChange} rows={3}
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors resize-none"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="Tell us about your learning goals or questions"
                />
            </div>
            <div className="sm:col-span-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-10 py-4 rounded-full text-[#fbf7f0] transition-transform duration-300 hover:scale-105 disabled:opacity-60"
                    style={{ backgroundColor: GOLD }}
                >
                    {loading ? "Submitting..." : "Book An Appointment"}
                </button>
            </div>
        </form>
    );
}