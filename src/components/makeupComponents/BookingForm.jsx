"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { INK, MUTED, GOLD, LINE } from "./Makeupdata";

export default function BookingForm({ serviceName = "Makeup Artistry" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        city: "Lucknow",
        date: new Date().toISOString().split("T")[0],
        message: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMsg("");

        if (!form.name.trim() || form.name.trim().length < 2) {
            setErrorMsg("Please enter your full name.");
            return;
        }

        const cleanPhone = form.mobile.replace(/[^\d+]/g, "");
        if (!cleanPhone || cleanPhone.length < 10) {
            setErrorMsg("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            setErrorMsg("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        const payload = {
            form_type: "inpage_booking",
            name: form.name.trim(),
            phone: cleanPhone,
            email: form.email.trim() || null,
            service: serviceName,
            location: form.city.trim() || "Lucknow Studio",
            date: form.date || new Date().toISOString().split("T")[0],
            message: form.message.trim() || null,
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
                const queryParams = new URLSearchParams({
                    bookingId: data.bookingId ? String(data.bookingId) : "",
                    service: serviceName,
                    name: form.name.trim(),
                    date: form.date,
                    location: form.city.trim() || "Lucknow Studio",
                });
                router.push(`/thank-you?${queryParams.toString()}`);
            } else {
                setErrorMsg(data.error || "Failed to reserve appointment. Please try again.");
            }
        } catch {
            setErrorMsg("A network error occurred. Please check your connection and retry.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-[#fffdf9] border rounded-2xl p-8 md:p-10 grid sm:grid-cols-2 gap-5" style={{ borderColor: LINE }}>
            {errorMsg && (
                <div className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                    {errorMsg}
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
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors font-mono"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="+91 10-digit number"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Your Email</label>
                <input
                    name="email" value={form.email} onChange={handleChange} type="email"
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="you@email.com"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Preferred Date *</label>
                <input
                    name="date" type="date" value={form.date} onChange={handleChange} required
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors cursor-pointer"
                    style={{ borderColor: LINE, color: INK }}
                />
            </div>
            <div className="sm:col-span-2">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Salon Studio / City</label>
                <input
                    name="city" value={form.city} onChange={handleChange}
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="Mahanagar / Hazratganj / Gomti Nagar"
                />
            </div>
            <div className="sm:col-span-2">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Special Requests / Notes</label>
                <textarea
                    name="message" value={form.message} onChange={handleChange} rows={3}
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors resize-none"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="Tell us about your preference or occasion"
                />
            </div>
            <div className="sm:col-span-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-10 py-4 rounded-full text-[#fbf7f0] transition-transform duration-300 hover:scale-105 disabled:opacity-60 cursor-pointer"
                    style={{ backgroundColor: GOLD }}
                >
                    {loading ? "Confirming..." : "Book An Appointment"}
                </button>
            </div>
        </form>
    );
}