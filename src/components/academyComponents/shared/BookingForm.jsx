"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { INK, MUTED, GOLD, LINE, courseOptions } from "./constants";
import { Sparkles, ShieldCheck, Clock, CheckCircle2, Send, ArrowRight } from "lucide-react";

export default function BookingForm() {
    const router = useRouter();
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
        let sanitizedValue = value;
        if (name === "name") {
            sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
        } else if (name === "mobile") {
            sanitizedValue = value.replace(/\D/g, "").slice(0, 13);
        }
        setForm((prev) => ({ ...prev, [name]: sanitizedValue }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (!form.name || !form.mobile || !form.course) return;

        const cleanName = form.name.replace(/[^a-zA-Z\s]/g, "").trim();
        if (!cleanName || cleanName.length < 2) {
            setError("Please enter your name (alphabets only, no numbers or special characters).");
            return;
        }

        const cleanPhone = form.mobile.replace(/\D/g, "");
        if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 13) {
            setError("Please enter a valid mobile number (10 to 13 digits, numbers only).");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_type: "academy",
                    name: cleanName,
                    phone: cleanPhone,
                    email: form.email,
                    city: form.city,
                    course: form.course,
                    service: form.course,
                    location: form.city ? `Academy (${form.city})` : "KNK Academy Lucknow",
                    message: form.message,
                    hp_company_url: form.hp_company_url,
                    form_started_at: formStartedAt,
                }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                const queryParams = new URLSearchParams({
                    bookingId: data.bookingId ? String(data.bookingId) : "",
                    service: form.course || "Academy Course",
                    name: form.name.trim(),
                    date: new Date().toISOString().split("T")[0],
                    location: form.city ? `Academy (${form.city})` : "KNK Academy Lucknow",
                });
                router.push(`/thank-you?${queryParams.toString()}`);
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
            <div className="bg-[#fffdf9] border border-[#b58a52] rounded-3xl p-8 sm:p-12 text-center shadow-xl">
                <div className="size-16 rounded-full bg-[#f4eee1] border border-[#b58a52] text-[#b58a52] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="size-8" />
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-normal text-[#29231f] mb-3">
                    Application Received
                </h3>
                <p className="font-['Inter'] text-[13.5px] leading-relaxed text-[#71665c] max-w-lg mx-auto mb-6">
                    Thank you, <strong>{form.name}</strong>. Our senior academy admissions counsellor will contact you shortly to review your syllabus details, batch schedule options, and fee structures.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4eee1] border border-[#e6dece] text-[#29231f] text-[12px] font-medium">
                    <Clock className="size-3.5 text-[#b58a52]" />
                    <span>Average response time: within 2 hours</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#fffdf9] border border-[#d0bda4] rounded-3xl p-5 sm:p-10 shadow-lg">
            {/* Top reassurance strip */}
            <div className="mb-6 pb-6 border-b border-[#f4eee1] flex flex-wrap items-center justify-between gap-3 text-[#71665c] font-['Inter'] text-[11.5px]">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-[#2e7d32]" />
                    <span>Official KNK Academic Registration</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="size-4 text-[#b58a52]" />
                    <span>Quick Callback Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-[#b58a52]" />
                    <span>Free Course Brochure Provided</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Honeypot anti-spam */}
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
                    <div className="sm:col-span-2 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-['Inter']">
                        {error}
                    </div>
                )}

                <div className="sm:col-span-1">
                    <label className="font-['Inter'] text-[10px] tracking-[0.16em] uppercase mb-1.5 block font-semibold text-[#71665c]">
                        Your Full Name *
                    </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#fbf7f0] border rounded-xl px-4 py-3 font-['Inter'] text-[13.5px] outline-none transition-all focus:border-[#b58a52] focus:bg-white"
                        style={{ borderColor: LINE, color: INK }}
                        placeholder="e.g. Priya Sharma"
                    />
                </div>

                <div className="sm:col-span-1">
                    <label className="font-['Inter'] text-[10px] tracking-[0.16em] uppercase mb-1.5 block font-semibold text-[#71665c]">
                        Mobile Number *
                    </label>
                    <input
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        required
                        type="tel"
                        maxLength={13}
                        className="w-full bg-[#fbf7f0] border rounded-xl px-4 py-3 font-['Inter'] text-[13.5px] outline-none transition-all focus:border-[#b58a52] focus:bg-white"
                        style={{ borderColor: LINE, color: INK }}
                        placeholder="10-13 digit mobile number"
                    />
                </div>

                <div className="sm:col-span-1">
                    <label className="font-['Inter'] text-[10px] tracking-[0.16em] uppercase mb-1.5 block font-semibold text-[#71665c]">
                        Email Address
                    </label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        className="w-full bg-[#fbf7f0] border rounded-xl px-4 py-3 font-['Inter'] text-[13.5px] outline-none transition-all focus:border-[#b58a52] focus:bg-white"
                        style={{ borderColor: LINE, color: INK }}
                        placeholder="you@email.com"
                    />
                </div>

                <div className="sm:col-span-1">
                    <label className="font-['Inter'] text-[10px] tracking-[0.16em] uppercase mb-1.5 block font-semibold text-[#71665c]">
                        City / Location
                    </label>
                    <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full bg-[#fbf7f0] border rounded-xl px-4 py-3 font-['Inter'] text-[13.5px] outline-none transition-all focus:border-[#b58a52] focus:bg-white"
                        style={{ borderColor: LINE, color: INK }}
                        placeholder="e.g. Lucknow, Kanpur, Ayodhya..."
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className="font-['Inter'] text-[10px] tracking-[0.16em] uppercase mb-1.5 block font-semibold text-[#71665c]">
                        Select Course of Interest *
                    </label>
                    <select
                        name="course"
                        value={form.course}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#fbf7f0] border rounded-xl px-4 py-3 font-['Inter'] text-[13.5px] outline-none transition-all focus:border-[#b58a52] focus:bg-white"
                        style={{ borderColor: LINE, color: form.course ? INK : MUTED }}
                    >
                        <option value="">Select a course / diploma...</option>
                        {courseOptions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div className="sm:col-span-2">
                    <label className="font-['Inter'] text-[10px] tracking-[0.16em] uppercase mb-1.5 block font-semibold text-[#71665c]">
                        Your Goals or Prior Experience (Optional)
                    </label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-[#fbf7f0] border rounded-xl px-4 py-3 font-['Inter'] text-[13.5px] outline-none transition-all focus:border-[#b58a52] focus:bg-white resize-none"
                        style={{ borderColor: LINE, color: INK }}
                        placeholder="Tell us about your learning background, preferred batch timing (weekday/weekend), or any questions..."
                    />
                </div>

                <div className="sm:col-span-2 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 font-['Inter'] text-[11px] font-semibold tracking-[0.2em] uppercase px-10 py-4 rounded-full text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 cursor-pointer"
                        style={{ backgroundColor: GOLD }}
                    >
                        <span>{loading ? "Registering Application..." : "Submit Consultation Request"}</span>
                        <ArrowRight className="size-4" />
                    </button>
                    <p className="mt-3 text-center font-['Inter'] text-[11px] text-[#71665c]">
                        Your contact details remain strictly confidential and will only be used for academic consultation.
                    </p>
                </div>
            </form>
        </div>
    );
}