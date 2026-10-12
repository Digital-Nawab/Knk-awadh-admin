"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, RefreshCw, Copy, Check, X, ExternalLink } from "lucide-react";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        confirmed: 0,
        today: 0,
        bridalLanding: 0,
        salonLanding: 0,
        website: 0,
    });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [copiedPhoneId, setCopiedPhoneId] = useState(null);

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
                setStats(
                    data.stats || {
                        total: 0,
                        pending: 0,
                        confirmed: 0,
                        today: 0,
                        bridalLanding: 0,
                        salonLanding: 0,
                        website: 0,
                    }
                );
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
                setStats((prev) => {
                    const prevStatus = bookings.find((b) => b.id === id)?.status || "pending";
                    if (prevStatus === newStatus) return prev;
                    return {
                        ...prev,
                        pending:
                            newStatus === "pending"
                                ? prev.pending + 1
                                : prevStatus === "pending"
                                ? Math.max(0, prev.pending - 1)
                                : prev.pending,
                        confirmed:
                            newStatus === "confirmed"
                                ? prev.confirmed + 1
                                : prevStatus === "confirmed"
                                ? Math.max(0, prev.confirmed - 1)
                                : prev.confirmed,
                    };
                });
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
                setStats((prev) => ({
                    ...prev,
                    total: Math.max(0, prev.total - 1),
                }));
            }
        } catch (err) {
            console.error("Error deleting booking:", err);
        }
    };

    const copyPhoneToClipboard = (id, phone) => {
        if (!phone) return;
        navigator.clipboard.writeText(phone);
        setCopiedPhoneId(id);
        setTimeout(() => setCopiedPhoneId(null), 2000);
    };

    // Clean, clear categorization without emojis or clutter
    const formatFormType = useCallback((type) => {
        const raw = (type || "").toLowerCase().trim();

        // 1. Bridal Landing Page leads
        if (
            raw === "bridal_landing_page" ||
            raw === "bridal_landing_modal" ||
            raw === "makeup_landing_page" ||
            raw === "landing_page" ||
            raw === "landing_page_bridal" ||
            raw === "bridal_landing" ||
            raw === "makeup-artist-lucknow"
        ) {
            return {
                channel: "bridal_landing",
                channelName: "Bridal Landing Page",
                badgeText: "Bridal Landing Page",
                path: "/makeup-artist-lucknow",
                badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
                borderAccent: "border-l-rose-500",
            };
        }

        // 2. Salon Landing Page leads
        if (
            raw === "salon_landing_page" ||
            raw === "salon_landing_modal" ||
            raw === "salon-landing-page" ||
            raw === "salon_landing" ||
            raw === "salon-services-lucknow"
        ) {
            return {
                channel: "salon_landing",
                channelName: "Salon Landing Page",
                badgeText: "Salon Landing Page",
                path: "/salon-services-lucknow",
                badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
                borderAccent: "border-l-amber-500",
            };
        }

        // 3. Main Website Leads
        let originName = "Main Website";
        let path = "/";

        if (raw === "hero_concierge") {
            originName = "Website Concierge";
            path = "/#concierge";
        } else if (raw === "luxury_booking") {
            originName = "Luxury Studio Form";
            path = "/#booking";
        } else if (raw === "modal_booking" || raw === "popup_modal") {
            originName = "Website Popup";
            path = "/";
        } else if (raw === "makeup" || raw === "makeup_page_booking") {
            originName = "Bridal Makeup Page";
            path = "/makeup";
        } else if (raw === "academy") {
            originName = "Academy Admission";
            path = "/academy";
        } else if (raw === "contact_us" || raw === "contact") {
            originName = "Contact Us Page";
            path = "/contact-us";
        } else if (raw === "about_page_booking" || raw === "about") {
            originName = "About Page";
            path = "/about";
        } else if (type) {
            originName = `Website: ${type.replace(/_/g, " ")}`;
        }

        return {
            channel: "website",
            channelName: "Main Website",
            badgeText: originName,
            path: path,
            badgeClass: "bg-stone-100 text-stone-700 border-stone-200",
            borderAccent: "border-l-stone-400",
        };
    }, []);

    const formatStatusBadge = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "completed":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "cancelled":
                return "bg-rose-50 text-rose-700 border-rose-200";
            default:
                return "bg-amber-50 text-amber-700 border-amber-200";
        }
    };

    const isFiltered = typeFilter !== "all" || statusFilter !== "all" || search.trim() !== "";

    return (
        <div className="max-w-7xl mx-auto space-y-5">
            {/* Header: Clean & Minimal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2dbd2] pb-5">
                <div>
                    <h1 className="font-display text-3xl text-ink font-semibold">
                        Bookings &amp; Inquiries
                    </h1>
                    <p className="font-sans text-xs text-muted mt-1">
                        Live lead stream from Main Website, Bridal Landing Page, and Salon Landing Page.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={fetchBookings}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-white hover:bg-[#faf7f2] text-ink border border-border shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 text-muted ${loading ? "animate-spin" : ""}`} />
                        <span>{loading ? "Updating..." : "Refresh"}</span>
                    </button>
                </div>
            </div>

            {/* Clean Metrics: Exactly 4 Cards in ONE Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                {/* 1. Total Leads */}
                <div
                    onClick={() => setTypeFilter("all")}
                    className={`p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                        typeFilter === "all"
                            ? "border-ink shadow-xs ring-1 ring-ink"
                            : "border-[#e8e2d5] hover:border-[#c9a24a]"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-muted">
                            Total Leads
                        </span>
                        {stats.pending > 0 && (
                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                {stats.pending} pending
                            </span>
                        )}
                    </div>
                    <p className="font-display text-3xl font-bold text-ink mt-2">
                        {stats.total || 0}
                    </p>
                    <p className="text-[11px] text-muted mt-1">
                        All channels combined
                    </p>
                </div>

                {/* 2. Bridal Landing Page */}
                <div
                    onClick={() => setTypeFilter(typeFilter === "bridal_landing" ? "all" : "bridal_landing")}
                    className={`p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                        typeFilter === "bridal_landing" || typeFilter === "bridal_landing_page"
                            ? "border-rose-500 shadow-xs ring-1 ring-rose-500 bg-rose-50/20"
                            : "border-[#e8e2d5] hover:border-rose-300"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-rose-800">
                            Bridal Landing
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                            /makeup-artist-lucknow
                        </span>
                    </div>
                    <p className="font-display text-3xl font-bold text-rose-700 mt-2">
                        {stats.bridalLanding || 0}
                    </p>
                    <p className="text-[11px] text-muted mt-1">
                        Bridal studio campaign leads
                    </p>
                </div>

                {/* 3. Salon Landing Page */}
                <div
                    onClick={() => setTypeFilter(typeFilter === "salon_landing" ? "all" : "salon_landing")}
                    className={`p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                        typeFilter === "salon_landing" || typeFilter === "salon_landing_page"
                            ? "border-amber-500 shadow-xs ring-1 ring-amber-500 bg-amber-50/20"
                            : "border-[#e8e2d5] hover:border-amber-300"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-900">
                            Salon Landing
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                            /salon-services-lucknow
                        </span>
                    </div>
                    <p className="font-display text-3xl font-bold text-amber-800 mt-2">
                        {stats.salonLanding || 0}
                    </p>
                    <p className="text-[11px] text-muted mt-1">
                        Salon services campaign leads
                    </p>
                </div>

                {/* 4. Main Website */}
                <div
                    onClick={() => setTypeFilter(typeFilter === "website" ? "all" : "website")}
                    className={`p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                        typeFilter === "website"
                            ? "border-stone-800 shadow-xs ring-1 ring-stone-800 bg-stone-50/40"
                            : "border-[#e8e2d5] hover:border-stone-400"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-700">
                            Main Website
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                            knkawadh.com
                        </span>
                    </div>
                    <p className="font-display text-3xl font-bold text-stone-800 mt-2">
                        {stats.website || 0}
                    </p>
                    <p className="text-[11px] text-muted mt-1">
                        Concierge, Studio &amp; Contact forms
                    </p>
                </div>
            </div>

            {/* Filter Bar: Simple & Clear */}
            <div className="bg-white p-3.5 rounded-xl border border-[#e8e2d5] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Clean Segmented Tabs (No emojis) */}
                <div className="flex flex-wrap items-center gap-1.5">
                    <button
                        type="button"
                        onClick={() => setTypeFilter("all")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            typeFilter === "all"
                                ? "bg-ink text-white font-semibold"
                                : "text-muted hover:text-ink hover:bg-[#faf7f2]"
                        }`}
                    >
                        All Sources ({stats.total || 0})
                    </button>

                    <button
                        type="button"
                        onClick={() => setTypeFilter("bridal_landing")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            typeFilter === "bridal_landing" || typeFilter === "bridal_landing_page"
                                ? "bg-rose-700 text-white font-semibold"
                                : "text-rose-800 hover:bg-rose-50"
                        }`}
                    >
                        Bridal Landing ({stats.bridalLanding || 0})
                    </button>

                    <button
                        type="button"
                        onClick={() => setTypeFilter("salon_landing")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            typeFilter === "salon_landing" || typeFilter === "salon_landing_page"
                                ? "bg-amber-800 text-white font-semibold"
                                : "text-amber-900 hover:bg-amber-50"
                        }`}
                    >
                        Salon Landing ({stats.salonLanding || 0})
                    </button>

                    <button
                        type="button"
                        onClick={() => setTypeFilter("website")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            typeFilter === "website"
                                ? "bg-stone-800 text-white font-semibold"
                                : "text-stone-800 hover:bg-stone-100"
                        }`}
                    >
                        Main Website ({stats.website || 0})
                    </button>
                </div>

                {/* Search & Status Filter */}
                <div className="flex flex-wrap items-center gap-2.5">
                    <div className="relative min-w-[220px]">
                        <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search client, phone, service..."
                            className="w-full pl-8 pr-7 py-1.5 bg-[#faf7f2] border border-border rounded-lg text-xs font-sans text-ink placeholder-muted focus:outline-none focus:border-gold focus:bg-white transition-all"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-2.5 py-1.5 bg-white border border-border rounded-lg text-xs font-sans text-ink focus:outline-none focus:border-gold cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    {isFiltered && (
                        <button
                            type="button"
                            onClick={() => {
                                setTypeFilter("all");
                                setStatusFilter("all");
                                setSearch("");
                            }}
                            className="text-xs text-rose-700 hover:underline font-medium cursor-pointer px-1"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>

            {/* Bookings Table: Simple, Spacious, Clear */}
            <div className="bg-white rounded-xl border border-[#e8e2d5] shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#fcfaf7] border-b border-[#e8e2d5] font-sans text-[10px] tracking-[0.16em] uppercase text-muted">
                                <th className="py-3.5 px-4 font-semibold">Client</th>
                                <th className="py-3.5 px-4 font-semibold">Lead Source</th>
                                <th className="py-3.5 px-4 font-semibold">Service / Inquiry</th>
                                <th className="py-3.5 px-4 font-semibold">Date &amp; Time</th>
                                <th className="py-3.5 px-4 font-semibold">Branch</th>
                                <th className="py-3.5 px-4 font-semibold">Status</th>
                                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#f2ede4] font-sans text-xs">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-muted">
                                        Loading leads...
                                    </td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-muted">
                                        No leads found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((item) => {
                                    const source = formatFormType(item.form_type);
                                    const isUpdating = updatingId === item.id;
                                    const isCopied = copiedPhoneId === item.id;

                                    return (
                                        <tr
                                            key={item.id}
                                            className={`hover:bg-[#faf7f2] transition-colors border-l-3 ${source.borderAccent}`}
                                        >
                                            {/* Client */}
                                            <td className="py-3 px-4">
                                                <p className="font-semibold text-ink text-sm">
                                                    {item.name}
                                                </p>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <a
                                                        href={`tel:${item.phone}`}
                                                        className="text-gold-deep hover:underline font-mono text-xs"
                                                    >
                                                        {item.phone}
                                                    </a>
                                                    <button
                                                        type="button"
                                                        onClick={() => copyPhoneToClipboard(item.id, item.phone)}
                                                        className="text-muted hover:text-ink cursor-pointer"
                                                        title="Copy phone"
                                                    >
                                                        {isCopied ? (
                                                            <Check className="w-3 h-3 text-emerald-600" />
                                                        ) : (
                                                            <Copy className="w-3 h-3" />
                                                        )}
                                                    </button>
                                                </div>
                                                {item.email && (
                                                    <p className="text-[11px] text-muted truncate max-w-[160px]">
                                                        {item.email}
                                                    </p>
                                                )}
                                            </td>

                                            {/* Lead Source: Simple, Bold & Distinct Badge */}
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <div className="flex flex-col items-start gap-1">
                                                    <span
                                                        className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${source.badgeClass}`}
                                                    >
                                                        {source.badgeText}
                                                    </span>
                                                    <span className="text-[10px] text-muted font-mono">
                                                        {source.path}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Service / Inquiry */}
                                            <td className="py-3 px-4 max-w-[190px]">
                                                <p className="font-medium text-ink truncate">
                                                    {item.service_or_course || "—"}
                                                </p>
                                                {item.guests > 1 && (
                                                    <span className="text-[10px] text-muted block">
                                                        {item.guests} Guests
                                                    </span>
                                                )}
                                            </td>

                                            {/* Date & Time */}
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <p className="text-ink font-medium">
                                                    {item.booking_date || "Flexible"}
                                                </p>
                                                <p className="text-[10px] text-muted">
                                                    {item.booking_time || "Any time"}
                                                </p>
                                            </td>

                                            {/* Branch */}
                                            <td className="py-3 px-4 text-muted whitespace-nowrap">
                                                {item.branch_location || item.city || "Lucknow"}
                                            </td>

                                            {/* Status */}
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <select
                                                    value={item.status}
                                                    disabled={isUpdating}
                                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                    className={`border text-[11px] font-semibold rounded-md px-2 py-1 outline-none uppercase tracking-wider cursor-pointer ${formatStatusBadge(
                                                        item.status
                                                    )} ${isUpdating ? "opacity-50" : ""}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedBooking(item)}
                                                    className="px-2.5 py-1 bg-white hover:bg-[#faf7f2] text-ink rounded border border-border text-xs font-medium transition cursor-pointer"
                                                >
                                                    Details
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(item.id)}
                                                    className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded text-xs transition cursor-pointer"
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

                {/* Footer Count */}
                <div className="bg-[#fcfaf7] px-4 py-2.5 border-t border-[#e8e2d5] text-xs text-muted flex items-center justify-between">
                    <span>
                        Showing {bookings.length} of {stats.total || 0} leads
                    </span>
                    <span className="font-mono text-[11px]">
                        Bridal: {stats.bridalLanding || 0} | Salon: {stats.salonLanding || 0} | Website: {stats.website || 0}
                    </span>
                </div>
            </div>

            {/* Lead Details Modal: Clean & Clear */}
            {selectedBooking && (() => {
                const source = formatFormType(selectedBooking.form_type);
                const cleanPhone = selectedBooking.phone.replace(/[^\d]/g, "");

                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="bg-white rounded-xl max-w-lg w-full p-6 border border-border shadow-xl space-y-5 relative max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="absolute top-4 right-4 text-muted hover:text-ink p-1 cursor-pointer"
                                aria-label="Close dialog"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div>
                                <span className="font-mono text-[10px] uppercase text-muted tracking-wider block">
                                    Lead #{selectedBooking.id}
                                </span>
                                <h2 className="font-display text-2xl text-ink font-semibold mt-0.5">
                                    {selectedBooking.name}
                                </h2>
                                <p className="text-xs text-muted">
                                    Received: {new Date(selectedBooking.created_at).toLocaleString("en-IN")}
                                </p>
                            </div>

                            {/* Clear Lead Source Banner */}
                            <div className="p-3 rounded-lg bg-[#faf7f2] border border-border flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] uppercase text-muted tracking-wider font-semibold block">
                                        Source Channel:
                                    </span>
                                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded text-xs font-semibold border ${source.badgeClass}`}>
                                        {source.badgeText}
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-muted">
                                    {source.path}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-xs bg-[#faf7f2] p-4 rounded-lg border border-border">
                                <div>
                                    <span className="text-[10px] uppercase text-muted tracking-wider block">Phone:</span>
                                    <a href={`tel:${selectedBooking.phone}`} className="font-semibold text-ink hover:underline font-mono">
                                        {selectedBooking.phone}
                                    </a>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase text-muted tracking-wider block">Email:</span>
                                    <span className="text-ink">{selectedBooking.email || "—"}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase text-muted tracking-wider block">Service:</span>
                                    <span className="font-semibold text-gold-deep">
                                        {selectedBooking.service_or_course || "General Inquiry"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase text-muted tracking-wider block">Date &amp; Time:</span>
                                    <span className="text-ink">
                                        {selectedBooking.booking_date || "Flexible"} {selectedBooking.booking_time ? `(${selectedBooking.booking_time})` : ""}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase text-muted tracking-wider block">Branch:</span>
                                    <span className="text-ink font-medium">
                                        {selectedBooking.branch_location || selectedBooking.city || "Lucknow"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase text-muted tracking-wider block">Guests:</span>
                                    <span className="text-ink">{selectedBooking.guests || 1}</span>
                                </div>
                            </div>

                            {selectedBooking.message && (
                                <div>
                                    <span className="text-[10px] uppercase text-muted tracking-wider block mb-1">
                                        Client Message / Notes:
                                    </span>
                                    <p className="text-xs text-ink bg-[#faf7f2] p-3 rounded-lg border border-border leading-relaxed">
                                        {selectedBooking.message}
                                    </p>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-3 border-t border-border">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted font-medium">Status:</span>
                                    <select
                                        value={selectedBooking.status}
                                        onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
                                        className={`border text-xs rounded-md px-2.5 py-1 uppercase tracking-wider font-semibold cursor-pointer ${formatStatusBadge(
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
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                        `Hello ${selectedBooking.name}, this is KNK Salon Awadh following up on your appointment request.`
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 bg-[#25D366] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition cursor-pointer"
                                >
                                    WhatsApp Client ↗
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
