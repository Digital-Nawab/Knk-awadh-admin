"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    RefreshCw,
    ExternalLink,
    ChevronDown,
    Copy,
    Check,
    Download,
    Calendar,
    Phone,
    MapPin,
    Sparkles,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowRight,
} from "lucide-react";
import {
    LEAD_STATUS_PIPELINE,
    getStatusMeta,
    formatLeadSource,
} from "@/app/admin/bookings/page";


export default function Dashboard() {
    const todayFormatted = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        assigned: 0,
        follow_up: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0,
        spam: 0,
        today: 0,
        homePage: 0,
        popup: 0,
        landingPages: 0,
        bridalLanding: 0,
        salonLanding: 0,
        skinAesthetics: 0,
        website: 0,
    });

    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [channelTab, setChannelTab] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [copiedPhoneId, setCopiedPhoneId] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [notice, setNotice] = useState(null);

    const showNotice = (msg, type = "success") => {
        setNotice({ msg, type });
        setTimeout(() => setNotice(null), 3500);
    };

    const fetchOverviewData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/bookings?status=all&formType=all");
            if (res.ok) {
                const data = await res.json();
                if (data.stats) {
                    setStats((prev) => ({ ...prev, ...data.stats }));
                }
                if (data.bookings && Array.isArray(data.bookings)) {
                    setRecentBookings(data.bookings);
                }
            }
        } catch (err) {
            console.error("Error fetching overview data:", err);
            showNotice("Could not refresh live leads.", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOverviewData();
    }, [fetchOverviewData]);

    const copyPhone = (id, phone) => {
        if (!phone) return;
        navigator.clipboard.writeText(phone);
        setCopiedPhoneId(id);
        setTimeout(() => setCopiedPhoneId(null), 2000);
    };

    // Quick status change from Overview
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            setUpdatingId(id);
            const res = await fetch(`/api/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setRecentBookings((prev) =>
                    prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
                );
                showNotice(`Lead #${id} status changed to ${getStatusMeta(newStatus).label}.`);
                fetchOverviewData();
            } else {
                showNotice("Failed to update status.", "error");
            }
        } catch {
            showNotice("Network error updating status.", "error");
        } finally {
            setUpdatingId(null);
        }
    };

    // Filter leads displayed in Overview table
    const filteredLeads = useMemo(() => {
        return recentBookings.filter((b) => {
            const src = formatLeadSource(b.form_type);

            // Channel tab filter
            if (channelTab === "home_page" && src.group !== "home_page") return false;
            if (channelTab === "popup" && src.group !== "popup") return false;
            if (channelTab === "landing_page" && src.group !== "landing_page") return false;
            if (channelTab === "skin_aesthetics" && src.group !== "skin_aesthetics") return false;

            // Status filter
            if (statusFilter !== "all") {
                const rawStatus = (b.status || "pending").toLowerCase();
                const target = statusFilter.toLowerCase();
                if (target === "follow_up" && (rawStatus === "follow_up" || rawStatus === "follow-up")) {
                    // match
                } else if (target === "confirmed" && (rawStatus === "confirmed" || rawStatus === "booked")) {
                    // match
                } else if (rawStatus !== target) {
                    return false;
                }
            }

            // Search filter
            if (search.trim()) {
                const term = search.toLowerCase();
                const nameMatch = (b.name || "").toLowerCase().includes(term);
                const phoneMatch = (b.phone || "").toLowerCase().includes(term);
                const serviceMatch = (b.service_or_course || "").toLowerCase().includes(term);
                const locationMatch = (b.branch_location || "").toLowerCase().includes(term);
                if (!nameMatch && !phoneMatch && !serviceMatch && !locationMatch) return false;
            }

            return true;
        });
    }, [recentBookings, channelTab, statusFilter, search]);

    const displayedLeads = filteredLeads.slice(0, 10);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Action Feedback Banner */}
            {notice && (
                <div
                    className={`p-3.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                        notice.type === "error"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                    }`}
                >
                    <div className="flex items-center gap-2">
                        {notice.type === "error" ? (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        <span>{notice.msg}</span>
                    </div>
                </div>
            )}

            {/* =========================================================================
                HEADER SECTION
            ========================================================================== */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2dbd2] pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
                        <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                            {todayFormatted} • Live Leads Intelligence
                        </p>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl italic text-ink font-normal">
                        Overview: Bookings &amp; Leads
                    </h1>
                    <p className="mt-1 font-sans text-xs text-muted max-w-2xl">
                        Real-time tracking of client inquiries across Home Page, Website Popup Modal, and Campaign Landing Pages.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                    <button
                        type="button"
                        onClick={fetchOverviewData}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-[#faf7f2] text-ink border border-border shadow-2xs transition-all cursor-pointer disabled:opacity-60"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 text-muted ${loading ? "animate-spin" : ""}`} />
                        <span>{loading ? "Refreshing..." : "Refresh"}</span>
                    </button>

                    <Link
                        href="/admin/bookings"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary hover:bg-[#342a22] text-cream shadow-luxe transition-all cursor-pointer"
                    >
                        <span>Manage All Inquiries &amp; Export</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </Link>
                </div>
            </div>

            {/* =========================================================================
                POINT 1: TOTAL LEADS — BREAKDOWN BY CHANNELS
                Home page, Popup, Landing page with counts & active indicators
            ========================================================================== */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">
                        1. Total Leads by Channel Source
                    </span>
                    <span className="font-sans text-[10px] text-muted">
                        Click card to filter leads
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                    {/* Card 1: Total Leads */}
                    <Link
                        href="/admin/bookings?formType=all"
                        className="relative bg-white p-5 rounded-2xl border border-border shadow-xs hover:border-gold hover:shadow-soft transition-all group block"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted bg-[#f5efe4] px-2.5 py-0.5 rounded-full">
                                All Channels
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-250">
                                +{stats.today} today
                            </span>
                        </div>
                        <p className="font-display text-4xl sm:text-5xl italic text-ink font-semibold mt-3 group-hover:text-gold-deep transition-colors">
                            {stats.total || 0}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-xs font-sans">
                            <span className="font-semibold text-ink">Total Client Leads</span>
                            <span className="text-gold-deep text-[11px] group-hover:translate-x-0.5 transition-transform">
                                View &rarr;
                            </span>
                        </div>
                        <p className="text-[10px] text-muted mt-0.5">
                            Cumulative digital submissions
                        </p>
                    </Link>

                    {/* Card 2: Home Page Leads */}
                    <Link
                        href="/admin/bookings?formType=home_page"
                        className="relative bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs hover:border-amber-500 hover:shadow-soft transition-all group block bg-gradient-to-br from-white via-white to-amber-50/20"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-full">
                                Home Page
                            </span>
                            <span className="text-[10px] font-mono text-muted">
                                Hero + Studio
                            </span>
                        </div>
                        <p className="font-display text-4xl sm:text-5xl italic text-amber-900 font-semibold mt-3 group-hover:text-amber-700 transition-colors">
                            {stats.homePage || 0}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-xs font-sans">
                            <span className="font-semibold text-amber-950">Home Page Leads</span>
                            <span className="text-amber-800 text-[11px] group-hover:translate-x-0.5 transition-transform">
                                Filter &rarr;
                            </span>
                        </div>
                        <p className="text-[10px] text-muted mt-0.5">
                            Hero Concierge &amp; Studio Form
                        </p>
                    </Link>

                    {/* Card 3: Popup Modal Leads */}
                    <Link
                        href="/admin/bookings?formType=popup"
                        className="relative bg-white p-5 rounded-2xl border border-purple-200/80 shadow-xs hover:border-purple-500 hover:shadow-soft transition-all group block bg-gradient-to-br from-white via-white to-purple-50/20"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-900 bg-purple-100/70 px-2.5 py-0.5 rounded-full">
                                Popup Modal
                            </span>
                            <span className="text-[10px] font-mono text-muted">
                                Site-Wide
                            </span>
                        </div>
                        <p className="font-display text-4xl sm:text-5xl italic text-purple-900 font-semibold mt-3 group-hover:text-purple-700 transition-colors">
                            {stats.popup || 0}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-xs font-sans">
                            <span className="font-semibold text-purple-950">Popup Modal Leads</span>
                            <span className="text-purple-800 text-[11px] group-hover:translate-x-0.5 transition-transform">
                                Filter &rarr;
                            </span>
                        </div>
                        <p className="text-[10px] text-muted mt-0.5">
                            &quot;Book Appointment&quot; popups
                        </p>
                    </Link>

                    {/* Card 4: Landing Page Leads */}
                    <Link
                        href="/admin/bookings?formType=landing_page"
                        className="relative bg-white p-5 rounded-2xl border border-rose-200/80 shadow-xs hover:border-rose-500 hover:shadow-soft transition-all group block bg-gradient-to-br from-white via-white to-rose-50/20"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-900 bg-rose-100/70 px-2.5 py-0.5 rounded-full">
                                Landing Pages
                            </span>
                            <span className="text-[10px] font-mono text-muted">
                                Ads Campaigns
                            </span>
                        </div>
                        <p className="font-display text-4xl sm:text-5xl italic text-rose-900 font-semibold mt-3 group-hover:text-rose-700 transition-colors">
                            {stats.landingPages || (stats.bridalLanding + stats.salonLanding) || 0}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-xs font-sans">
                            <span className="font-semibold text-rose-950">Landing Page Leads</span>
                            <span className="text-rose-800 text-[11px] group-hover:translate-x-0.5 transition-transform">
                                Filter &rarr;
                            </span>
                        </div>
                        <p className="text-[10px] text-muted mt-0.5">
                            Bridal &amp; Salon campaign pages
                        </p>
                    </Link>

                    {/* Card 5: Skin Aesthetics Leads */}
                    <Link
                        href="/admin/bookings?formType=skin_aesthetics"
                        className="relative bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs hover:border-[#784e2d] hover:shadow-soft transition-all group block bg-gradient-to-br from-white via-white to-[#fbf4eb]/40"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#784e2d] bg-[#fbf4eb] px-2.5 py-0.5 rounded-full border border-[#e8d5be]">
                                Skin Aesthetics
                            </span>
                            <span className="text-[10px] font-mono text-muted">
                                KNK SKKIN
                            </span>
                        </div>
                        <p className="font-display text-4xl sm:text-5xl italic text-[#784e2d] font-semibold mt-3 group-hover:text-[#533620] transition-colors">
                            {stats.skinAesthetics || 0}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-xs font-sans">
                            <span className="font-semibold text-ink">Skin &amp; Clinic Leads</span>
                            <span className="text-gold-deep text-[11px] group-hover:translate-x-0.5 transition-transform">
                                Filter &rarr;
                            </span>
                        </div>
                        <p className="text-[10px] text-muted mt-0.5">
                            Doctor consultations &amp; treatments
                        </p>
                    </Link>
                </div>
            </div>

            {/* =========================================================================
                POINT 2: LEAD STATUS PIPELINE ORDER
                1. Pending -> 2. Assigned -> 3. Follow-up -> 4. Confirmed / Booked -> 5. Completed -> 6. Cancelled
            ========================================================================== */}
            <div className="bg-white p-4 rounded-2xl border border-border shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                    <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">
                        2. Standard Lead &amp; Booking Pipeline Flow
                    </span>
                    <span className="font-sans text-[10px] text-muted">
                        Active pipeline progression
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
                    {LEAD_STATUS_PIPELINE.map((pStep, idx) => {
                        const countKey = pStep.key === "follow_up" ? "follow_up" : pStep.key;
                        const count = stats[countKey] ?? 0;
                        const isSelected = statusFilter === pStep.key;

                        return (
                            <button
                                key={pStep.key}
                                type="button"
                                onClick={() => setStatusFilter(isSelected ? "all" : pStep.key)}
                                className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                                    isSelected
                                        ? "ring-2 ring-gold border-gold bg-[#faf7f2] shadow-xs"
                                        : "border-[#ede6da] hover:border-gold hover:bg-[#fcfaf7]"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-muted font-semibold">
                                        0{idx + 1}
                                    </span>
                                    <span className={`h-2.5 w-2.5 rounded-full ${pStep.dotClass}`} />
                                </div>
                                <p className="font-semibold text-ink text-xs mt-1.5 truncate">
                                    {pStep.label}
                                </p>
                                <div className="flex items-center justify-between mt-1 text-xs">
                                    <span className="text-muted text-[10px]">{pStep.desc}</span>
                                    <span className="font-mono font-bold text-ink text-sm">
                                        {count}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* =========================================================================
                LEADS FEED TABLE (WITH NAME, CHANNEL, SERVICE, AND STATUS)
            ========================================================================== */}
            <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
                {/* Table Toolbar */}
                <div className="p-4 sm:p-5 border-b border-[#eee7dc] bg-[#fbf9f5] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div>
                        <h2 className="font-display text-xl sm:text-2xl italic text-ink font-medium">
                            Live Incoming Leads
                        </h2>
                        <p className="font-sans text-[11px] text-muted mt-0.5">
                            Showing latest client submissions from Home Page, Popup, and Landing Pages with live status.
                        </p>
                    </div>

                    {/* Filter Tabs & Search */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Channel Source Tabs */}
                        <div className="flex items-center p-1 bg-white border border-[#e8e2d5] rounded-xl text-xs font-sans">
                            <button
                                type="button"
                                onClick={() => setChannelTab("all")}
                                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                    channelTab === "all"
                                        ? "bg-primary text-cream font-semibold"
                                        : "text-muted hover:text-ink"
                                }`}
                            >
                                All ({stats.total || 0})
                            </button>
                            <button
                                type="button"
                                onClick={() => setChannelTab("home_page")}
                                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                    channelTab === "home_page"
                                        ? "bg-amber-800 text-cream font-semibold"
                                        : "text-amber-900 hover:text-amber-950"
                                }`}
                            >
                                Home ({stats.homePage || 0})
                            </button>
                            <button
                                type="button"
                                onClick={() => setChannelTab("popup")}
                                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                    channelTab === "popup"
                                        ? "bg-purple-800 text-cream font-semibold"
                                        : "text-purple-900 hover:text-purple-950"
                                }`}
                            >
                                Popup ({stats.popup || 0})
                            </button>
                            <button
                                type="button"
                                onClick={() => setChannelTab("landing_page")}
                                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                    channelTab === "landing_page"
                                        ? "bg-rose-800 text-cream font-semibold"
                                        : "text-rose-900 hover:text-rose-950"
                                }`}
                            >
                                Landing ({stats.landingPages || 0})
                            </button>
                            <button
                                type="button"
                                onClick={() => setChannelTab("skin_aesthetics")}
                                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                    channelTab === "skin_aesthetics"
                                        ? "bg-[#784e2d] text-cream font-semibold"
                                        : "text-[#784e2d] hover:text-[#533620]"
                                }`}
                            >
                                Skin Aesthetics ({stats.skinAesthetics || 0})
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="relative min-w-[200px]">
                            <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search client name..."
                                className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#e8e2d5] rounded-xl text-xs font-sans text-ink placeholder:text-muted focus:outline-none focus:border-gold"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-2.5 py-1.5 bg-white border border-[#e8e2d5] rounded-xl text-xs font-sans text-ink focus:outline-none focus:border-gold cursor-pointer"
                        >
                            <option value="all">All Statuses</option>
                            {LEAD_STATUS_PIPELINE.map((st) => (
                                <option key={st.key} value={st.key}>
                                    {st.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-[#eee7dc] bg-[#faf7f2] text-[10px] uppercase tracking-wider text-muted font-semibold">
                                <th className="py-3 px-4">Client Name &amp; Contact</th>
                                <th className="py-3 px-4">Lead Source</th>
                                <th className="py-3 px-4">Selected Service</th>
                                <th className="py-3 px-4">Branch / Date</th>
                                <th className="py-3 px-4">Pipeline Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#eee7dc]">
                            {loading && recentBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-10 text-center text-muted">
                                        <RefreshCw className="w-5 h-5 mx-auto mb-2 animate-spin text-gold" />
                                        <span>Loading live client leads...</span>
                                    </td>
                                </tr>
                            ) : displayedLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-10 text-center text-muted">
                                        No leads matching the selected filter criteria.
                                    </td>
                                </tr>
                            ) : (
                                displayedLeads.map((lead) => {
                                    const source = formatLeadSource(lead.form_type);
                                    const statusMeta = getStatusMeta(lead.status);
                                    const created = lead.created_at ? new Date(lead.created_at) : null;
                                    const dateStr = created
                                        ? created.toLocaleDateString("en-IN", {
                                              day: "numeric",
                                              month: "short",
                                          })
                                        : "";
                                    const timeStr = created
                                        ? created.toLocaleTimeString("en-IN", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                          })
                                        : "";

                                    return (
                                        <tr
                                            key={lead.id}
                                            className="hover:bg-[#fbf9f5] transition-colors"
                                        >
                                            {/* Client Name & Phone */}
                                            <td className="py-3.5 px-4">
                                                <div className="font-semibold text-ink text-[13px]">
                                                    {lead.name}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-muted text-[11px] font-mono mt-0.5">
                                                    <span>{lead.phone}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => copyPhone(lead.id, lead.phone)}
                                                        className="text-stone-400 hover:text-gold-deep p-0.5 cursor-pointer"
                                                        title="Copy phone number"
                                                    >
                                                        {copiedPhoneId === lead.id ? (
                                                            <Check className="w-3 h-3 text-emerald-600" />
                                                        ) : (
                                                            <Copy className="w-3 h-3" />
                                                        )}
                                                    </button>
                                                </div>
                                                {lead.email && (
                                                    <div className="text-[10px] text-muted truncate max-w-[160px]">
                                                        {lead.email}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Lead Source */}
                                            <td className="py-3.5 px-4">
                                                <span
                                                    className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${source.badgeClass}`}
                                                >
                                                    {source.badgeText}
                                                </span>
                                                <span className="block text-[10px] text-muted mt-0.5 font-mono">
                                                    #{lead.booking_number || 1}
                                                </span>
                                            </td>

                                            {/* Selected Service */}
                                            <td className="py-3.5 px-4 font-medium text-ink">
                                                <div className="truncate max-w-[190px]">
                                                    {lead.service_or_course || "General Consultation"}
                                                </div>
                                                {lead.message && (
                                                    <div className="text-[10px] text-muted italic truncate max-w-[190px] mt-0.5">
                                                        &quot;{lead.message}&quot;
                                                    </div>
                                                )}
                                            </td>

                                            {/* Branch & Date */}
                                            <td className="py-3.5 px-4 text-muted text-[11px]">
                                                <div>{lead.branch_location || "Mahanagar"}</div>
                                                <div className="text-[10px] text-stone-400 mt-0.5">
                                                    {lead.booking_date || `${dateStr}, ${timeStr}`}
                                                </div>
                                            </td>

                                            {/* Status with Quick Update Dropdown */}
                                            <td className="py-3.5 px-4">
                                                <div className="relative inline-block">
                                                    <select
                                                        value={lead.status || "pending"}
                                                        disabled={updatingId === lead.id}
                                                        onChange={(e) =>
                                                            handleStatusUpdate(lead.id, e.target.value)
                                                        }
                                                        className={`text-[11px] font-semibold rounded-lg px-2.5 py-1 border transition-colors cursor-pointer pr-6 appearance-none ${statusMeta.badgeClass}`}
                                                    >
                                                        {LEAD_STATUS_PIPELINE.map((st) => (
                                                            <option key={st.key} value={st.key}>
                                                                {st.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3.5 px-4 text-right">
                                                <Link
                                                    href={`/admin/bookings?search=${encodeURIComponent(
                                                        lead.phone || lead.name
                                                    )}`}
                                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold-deep hover:underline cursor-pointer"
                                                >
                                                    <span>Console</span>
                                                    <ExternalLink className="w-3 h-3" />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="p-4 bg-[#fbf9f5] border-t border-[#eee7dc] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-muted text-[11px]">
                        Showing top {displayedLeads.length} of {filteredLeads.length} matching inquiries (Total: {stats.total} leads in database)
                    </span>

                    <Link
                        href="/admin/bookings"
                        className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-gold-deep transition-colors text-xs"
                    >
                        <span>View all {stats.total} leads in Bookings Management Console</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>

        </div>
    );
}