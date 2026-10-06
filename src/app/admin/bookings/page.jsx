"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, today: 0 });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({
                status: statusFilter,
                formType: typeFilter,
                search: search,
            });
            const res = await fetch(`/api/bookings?${query.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setBookings(data.bookings || []);
                setStats(data.stats || { total: 0, pending: 0, confirmed: 0, today: 0 });
            }
        } catch (err) {
            console.error("Error fetching bookings:", err);
        } finally {
            setLoading(false);
        }
    }, [statusFilter, typeFilter, search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchBookings();
        }, 200);
        return () => clearTimeout(timer);
    }, [fetchBookings]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            setUpdatingId(id);
            const res = await fetch(`/api/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setBookings((prev) =>
                    prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
                );
                if (selectedBooking && selectedBooking.id === id) {
                    setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
                }
            }
        } catch (err) {
            console.error("Error updating status:", err);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this booking lead?")) return;
        try {
            const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
            if (res.ok) {
                setBookings((prev) => prev.filter((b) => b.id !== id));
                if (selectedBooking?.id === id) setSelectedBooking(null);
            }
        } catch (err) {
            console.error("Error deleting booking:", err);
        }
    };

    const formatFormType = (type) => {
        switch (type) {
            case "hero_concierge":
                return { label: "Hero Concierge", badge: "bg-amber-100 text-amber-800" };
            case "luxury_booking":
                return { label: "Luxury Studio", badge: "bg-stone-100 text-stone-800" };
            case "modal_booking":
            case "popup_modal":
                return { label: "Popup Modal", badge: "bg-purple-100 text-purple-800" };
            case "makeup":
            case "makeup_page_booking":
                return { label: "Bridal Makeup", badge: "bg-rose-100 text-rose-800" };
            case "academy":
                return { label: "Academy Admission", badge: "bg-blue-100 text-blue-800" };
            case "contact_us":
            case "contact":
                return { label: "Contact Us", badge: "bg-teal-100 text-teal-800" };
            case "about_page_booking":
            case "about":
                return { label: "About Page", badge: "bg-orange-100 text-orange-800" };
            default:
                return { label: type || "General", badge: "bg-gray-100 text-gray-800" };
        }
    };

    const formatStatusBadge = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-emerald-100 text-emerald-800 border-emerald-300";
            case "completed":
                return "bg-blue-100 text-blue-800 border-blue-300";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-300";
            default:
                return "bg-amber-100 text-amber-800 border-amber-300";
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2dbd2] pb-6">
                <div>
                    <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                        Lead Management
                    </span>
                    <h1 className="font-display text-4xl italic text-ink mt-1">
                        Bookings &amp; Inquiries
                    </h1>
                    <p className="font-sans text-xs text-muted mt-1">
                        Live reservations from Concierge, Bridal Studio, and Beauty Academy.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchBookings}
                        className="px-4 py-2 border border-border bg-white rounded-lg font-sans text-xs tracking-wider uppercase text-ink hover:border-gold hover:text-gold-deep transition-colors"
                    >
                        ↻ Refresh
                    </button>
                </div>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-[#e8e2d5] shadow-sm">
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted">Today's Leads</p>
                    <p className="font-display text-3xl italic text-ink mt-2">{stats.today}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#e8e2d5] shadow-sm">
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-amber-700">Pending Review</p>
                    <p className="font-display text-3xl italic text-amber-600 mt-2">{stats.pending}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#e8e2d5] shadow-sm">
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700">Confirmed</p>
                    <p className="font-display text-3xl italic text-emerald-600 mt-2">{stats.confirmed}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#e8e2d5] shadow-sm">
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted">Total All Time</p>
                    <p className="font-display text-3xl italic text-ink mt-2">{stats.total}</p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#e8e2d5] flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3 flex-1 min-w-[260px]">
                    <div className="relative w-full max-w-sm">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search client, phone, or service..."
                            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-xs font-sans focus:outline-none focus:border-gold"
                        />
                        <span className="absolute left-3 top-2.5 text-muted text-xs">🔍</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="text-muted font-sans text-[11px] uppercase tracking-wider">Source:</span>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="border border-border rounded-lg px-3 py-1.5 font-sans bg-white focus:outline-none focus:border-gold"
                        >
                            <option value="all">All Sources</option>
                            <option value="modal_booking">Popup Modal</option>
                            <option value="hero_concierge">Hero Concierge</option>
                            <option value="luxury_booking">Luxury Studio</option>
                            <option value="makeup">Bridal Makeup</option>
                            <option value="academy">Academy Admission</option>
                            <option value="about_page_booking">About Page</option>
                            <option value="contact_us">Contact Us</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-muted font-sans text-[11px] uppercase tracking-wider">Status:</span>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-border rounded-lg px-3 py-1.5 font-sans bg-white focus:outline-none focus:border-gold"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl border border-[#e8e2d5] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#fcfaf7] border-b border-[#e8e2d5] font-sans text-[10px] tracking-[0.18em] uppercase text-muted">
                                <th className="py-3.5 px-4 font-semibold">Client</th>
                                <th className="py-3.5 px-4 font-semibold">Source</th>
                                <th className="py-3.5 px-4 font-semibold">Service / Course</th>
                                <th className="py-3.5 px-4 font-semibold">Date &amp; Time</th>
                                <th className="py-3.5 px-4 font-semibold">Branch / City</th>
                                <th className="py-3.5 px-4 font-semibold">Status</th>
                                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f2ede4] font-sans text-xs">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-muted">
                                        Loading bookings...
                                    </td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-muted">
                                        No bookings found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((item) => {
                                    const source = formatFormType(item.form_type);
                                    return (
                                        <tr key={item.id} className="hover:bg-[#faf7f2] transition-colors">
                                            <td className="py-3.5 px-4">
                                                <p className="font-semibold text-ink">{item.name}</p>
                                                <a
                                                    href={`tel:${item.phone}`}
                                                    className="text-gold-deep hover:underline font-mono text-[11px] block"
                                                >
                                                    {item.phone}
                                                </a>
                                                {item.email && (
                                                    <p className="text-[11px] text-muted truncate max-w-[160px]">
                                                        {item.email}
                                                    </p>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span
                                                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase ${source.badge}`}
                                                >
                                                    {source.label}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <p className="font-medium text-ink max-w-[180px] truncate">
                                                    {item.service_or_course || "—"}
                                                </p>
                                                {item.guests > 1 && (
                                                    <span className="text-[10px] text-muted block">
                                                        {item.guests} Guests
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <p className="text-ink">{item.booking_date || "Flexible"}</p>
                                                <p className="text-[10px] text-muted">{item.booking_time || ""}</p>
                                            </td>
                                            <td className="py-3.5 px-4 text-muted">
                                                {item.branch_location || item.city || "Lucknow"}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <select
                                                    value={item.status}
                                                    disabled={updatingId === item.id}
                                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                    className={`border text-[11px] font-medium rounded-md px-2 py-1 outline-none uppercase tracking-wider cursor-pointer ${formatStatusBadge(
                                                        item.status
                                                    )}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                                                <button
                                                    onClick={() => setSelectedBooking(item)}
                                                    className="px-2.5 py-1 bg-cream hover:bg-gold-soft/50 text-ink rounded border border-border text-[11px] transition-colors"
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="px-2.5 py-1 bg-white hover:bg-red-50 text-red-600 rounded border border-red-200 text-[11px] transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-border shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="absolute top-5 right-5 text-muted hover:text-ink text-xl font-bold"
                        >
                            ✕
                        </button>
                        <div>
                            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                                Booking #{selectedBooking.id}
                            </span>
                            <h2 className="font-display text-2xl italic text-ink mt-1">
                                {selectedBooking.name}
                            </h2>
                            <p className="text-xs text-muted">
                                Received on: {new Date(selectedBooking.created_at).toLocaleString("en-IN")}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs font-sans bg-[#faf7f2] p-4 rounded-xl border border-border">
                            <div>
                                <span className="text-[10px] uppercase text-muted tracking-wider block">Phone:</span>
                                <a href={`tel:${selectedBooking.phone}`} className="font-bold text-ink hover:underline">
                                    {selectedBooking.phone}
                                </a>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase text-muted tracking-wider block">Email:</span>
                                <span className="text-ink">{selectedBooking.email || "Not provided"}</span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase text-muted tracking-wider block">Form Source:</span>
                                <span className="font-medium text-ink">
                                    {formatFormType(selectedBooking.form_type).label}
                                </span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase text-muted tracking-wider block">Branch / City:</span>
                                <span className="text-ink">
                                    {selectedBooking.branch_location || selectedBooking.city || "Lucknow"}
                                </span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase text-muted tracking-wider block">Service / Course:</span>
                                <span className="font-bold text-gold-deep">
                                    {selectedBooking.service_or_course || "General Inquiry"}
                                </span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase text-muted tracking-wider block">Appointment Slot:</span>
                                <span className="text-ink">
                                    {selectedBooking.booking_date || "Flexible"} {selectedBooking.booking_time ? `(${selectedBooking.booking_time})` : ""}
                                </span>
                            </div>
                        </div>

                        {selectedBooking.message && (
                            <div>
                                <span className="text-[10px] uppercase text-muted tracking-wider block mb-1">
                                    Client Notes / Message:
                                </span>
                                <p className="text-xs text-ink bg-cream p-3 rounded-lg border border-border leading-relaxed">
                                    {selectedBooking.message}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-muted">Status:</span>
                                <select
                                    value={selectedBooking.status}
                                    onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
                                    className={`border text-xs rounded-md px-2.5 py-1 uppercase tracking-wider font-semibold ${formatStatusBadge(
                                        selectedBooking.status
                                    )}`}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <a
                                href={`https://wa.me/${selectedBooking.phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                                    `Hello ${selectedBooking.name}, this is KNK Salon Awadh following up on your appointment request.`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 bg-[#25D366] text-white rounded-lg text-xs font-semibold hover:opacity-90 flex items-center gap-1.5"
                            >
                                WhatsApp Client ↗
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
