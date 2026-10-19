"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    RefreshCw,
    Copy,
    Check,
    X,
    ExternalLink,
    ChevronDown,
    Trash2,
    Download,
    CheckSquare,
    Square,
    Filter,
    ArrowUpDown,
    CheckCircle2,
    Clock,
    UserCheck,
    PhoneCall,
    XCircle,
    Calendar,
    Phone,
    Mail,
    MapPin,
    AlertCircle,
} from "lucide-react";

// Standard lead and booking status pipeline order:
// 1. Pending — New incoming inquiry or submission
// 2. Assigned — Routed or assigned to a specific staff member or branch
// 3. Follow-up — Contact made, waiting for client confirmation/consultation
// 4. Confirmed / Booked — Appointment or service officially finalized
// 5. Completed — Service successfully delivered
// 6. Cancelled — Client or salon called off booking
// 7. Spam — Spam or junk inquiry
export const LEAD_STATUS_PIPELINE = [
    {
        key: "pending",
        label: "Pending",
        desc: "New incoming inquiry",
        badgeClass: "bg-amber-50 text-amber-800 border-amber-300",
        dotClass: "bg-amber-500",
    },
    {
        key: "assigned",
        label: "Assigned",
        desc: "Assigned to staff/branch",
        badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-250",
        dotClass: "bg-indigo-500",
    },
    {
        key: "follow_up",
        label: "Follow-up",
        desc: "Contact made, awaiting reply",
        badgeClass: "bg-sky-50 text-sky-700 border-sky-300",
        dotClass: "bg-sky-500",
    },
    {
        key: "confirmed",
        label: "Confirmed / Booked",
        desc: "Appointment finalized",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-300",
        dotClass: "bg-emerald-500",
    },
    {
        key: "completed",
        label: "Completed",
        desc: "Service delivered",
        badgeClass: "bg-teal-50 text-teal-800 border-teal-300",
        dotClass: "bg-teal-600",
    },
    {
        key: "cancelled",
        label: "Cancelled",
        desc: "Inquiry or booking called off",
        badgeClass: "bg-rose-50 text-rose-700 border-rose-300",
        dotClass: "bg-rose-500",
    },
    {
        key: "spam",
        label: "Spam",
        desc: "Spam / junk inquiry",
        badgeClass: "bg-stone-100 text-stone-700 border-stone-300",
        dotClass: "bg-stone-500",
    },
];

export function getStatusMeta(statusKey) {
    const raw = (statusKey || "").toLowerCase().trim();
    if (raw === "follow-up") return LEAD_STATUS_PIPELINE.find((s) => s.key === "follow_up");
    if (raw === "booked") return LEAD_STATUS_PIPELINE.find((s) => s.key === "confirmed");
    return (
        LEAD_STATUS_PIPELINE.find((s) => s.key === raw) || {
            key: raw || "pending",
            label: raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : "Pending",
            desc: "Lead inquiry",
            badgeClass: "bg-stone-50 text-stone-700 border-stone-300",
            dotClass: "bg-stone-400",
        }
    );
}

// Clean categorization mapping for lead origins: Home page, Popup, Landing page, Website
export function formatLeadSource(formType) {
    const raw = (formType || "").toLowerCase().trim();

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
            group: "landing_page",
            groupName: "Landing Page",
            channel: "bridal_landing",
            channelName: "Bridal Landing Page",
            badgeText: "Landing: Bridal Studio",
            path: "/makeup-artist-lucknow",
            badgeClass: "bg-rose-50 text-rose-800 border-rose-300",
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
            group: "landing_page",
            groupName: "Landing Page",
            channel: "salon_landing",
            channelName: "Salon Landing Page",
            badgeText: "Landing: Salon Services",
            path: "/salon-services-lucknow",
            badgeClass: "bg-amber-50 text-amber-900 border-amber-300",
            borderAccent: "border-l-amber-500",
        };
    }

    // 3. Home Page Leads
    if (raw === "hero_concierge" || raw === "home_concierge") {
        return {
            group: "home_page",
            groupName: "Home Page",
            channel: "home_page",
            channelName: "Home Page Concierge",
            badgeText: "Home: Hero Concierge",
            path: "/#concierge",
            badgeClass: "bg-amber-50 text-amber-800 border-amber-250",
            borderAccent: "border-l-amber-600",
        };
    }

    if (raw === "luxury_booking" || raw === "home") {
        return {
            group: "home_page",
            groupName: "Home Page",
            channel: "home_page",
            channelName: "Home Page Studio Form",
            badgeText: "Home: Luxury Studio",
            path: "/#booking",
            badgeClass: "bg-amber-50 text-amber-800 border-amber-250",
            borderAccent: "border-l-amber-600",
        };
    }

    // 4. Website Popup Modal Leads
    if (raw === "modal_booking" || raw === "popup_modal" || raw === "booking_modal") {
        return {
            group: "popup",
            groupName: "Website Popup",
            channel: "popup",
            channelName: "Website Popup Modal",
            badgeText: "Popup: Booking Modal",
            path: "/",
            badgeClass: "bg-purple-50 text-purple-800 border-purple-250",
            borderAccent: "border-l-purple-500",
        };
    }

    // 5. Skin Aesthetics Leads
    if (
        raw === "skin_consultation" ||
        raw === "skin-aesthetics" ||
        raw === "skin_aesthetics" ||
        raw === "skin" ||
        raw === "aesthetic" ||
        raw === "laser-treatment" ||
        raw === "microblading"
    ) {
        return {
            group: "skin_aesthetics",
            groupName: "Skin Aesthetics",
            channel: "skin_aesthetics",
            channelName: "Skin & Aesthetics Studio",
            badgeText: "Skin Aesthetics",
            path: "/skin-aesthetics",
            badgeClass: "bg-[#fbf4eb] text-[#784e2d] border-[#d8b589] font-medium",
            borderAccent: "border-l-[#C9A24A]",
        };
    }

    // 6. Academy Admissions Leads
    if (raw === "academy" || raw === "enroll_for_course" || raw === "enroll-for-course") {
        return {
            group: "academy",
            groupName: "Academy Admissions",
            channel: "academy",
            channelName: "Academy Course Admission",
            badgeText: "Academy: Course Admission",
            path: "/enroll-for-course",
            badgeClass: "bg-[#fbf4eb] text-[#877443] border-[#d8b589] font-medium",
            borderAccent: "border-l-[#877443]",
        };
    }

    // 7. Other Website Pages
    let originName = "Main Website";
    let path = "/";

    if (raw === "makeup" || raw === "makeup_page_booking") {
        originName = "Bridal Makeup Page";
        path = "/makeup";
    } else if (raw === "contact_us" || raw === "contact") {
        originName = "Contact Us Page";
        path = "/contact-us";
    } else if (raw === "about_page_booking" || raw === "about") {
        originName = "About Page";
        path = "/about";
    } else if (formType) {
        originName = `Website: ${formType.replace(/_/g, " ")}`;
    }

    return {
        group: "website",
        groupName: "Main Website",
        channel: "website",
        channelName: originName,
        badgeText: originName,
        path: path,
        badgeClass: "bg-stone-100 text-stone-700 border-stone-300",
        borderAccent: "border-l-stone-400",
    };
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
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
        academy: 0,
        website: 0,
    });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [copiedPhoneId, setCopiedPhoneId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(15);

    // Multiple selection state for batch operations
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [isDeletingMultiple, setIsDeletingMultiple] = useState(false);
    const [actionNotice, setActionNotice] = useState(null);
    const [showExportMenu, setShowExportMenu] = useState(false);

    // Reset visible count and clear selection when filters change
    useEffect(() => {
        setVisibleCount(15);
        setSelectedIds(new Set());
    }, [statusFilter, typeFilter, search]);

    const showNotice = (msg, type = "success") => {
        setActionNotice({ msg, type });
        setTimeout(() => setActionNotice(null), 4000);
    };

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
                if (data.stats) {
                    setStats((prev) => ({ ...prev, ...data.stats }));
                }
            }
        } catch (err) {
            console.error("Error fetching bookings:", err);
            showNotice("Failed to load leads. Please check your internet connection.", "error");
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

    // Update single lead status
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
                showNotice(`Lead #${id} status updated to ${getStatusMeta(newStatus).label}.`);
                // Re-fetch stats in background
                fetch(`/api/bookings?status=all&formType=all`)
                    .then((r) => r.json())
                    .then((d) => d.stats && setStats(d.stats))
                    .catch(() => {});
            } else {
                showNotice("Failed to update status on server.", "error");
            }
        } catch (err) {
            console.error("Error updating status:", err);
            showNotice("Network error updating status.", "error");
        } finally {
            setUpdatingId(null);
        }
    };

    // Single delete
    const handleDelete = async (id) => {
        if (!confirm(`Are you sure you want to permanently delete lead #${id}?`)) return;
        try {
            const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
            if (res.ok) {
                setBookings((prev) => prev.filter((b) => b.id !== id));
                setSelectedIds((prev) => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
                if (selectedBooking?.id === id) setSelectedBooking(null);
                setStats((prev) => ({
                    ...prev,
                    total: Math.max(0, prev.total - 1),
                }));
                showNotice(`Lead #${id} deleted.`);
            } else {
                showNotice("Failed to delete lead.", "error");
            }
        } catch (err) {
            console.error("Error deleting booking:", err);
            showNotice("Network error deleting lead.", "error");
        }
    };

    // Multiple Delete (Bulk Delete)
    const handleBulkDelete = async () => {
        const count = selectedIds.size;
        if (count === 0) return;

        const confirmMsg = `Are you sure you want to permanently delete ${count} selected lead(s)? This action cannot be undone.`;
        if (!confirm(confirmMsg)) return;

        try {
            setIsDeletingMultiple(true);
            const idList = Array.from(selectedIds);
            const res = await fetch("/api/bookings", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: idList }),
            });

            if (res.ok) {
                const deletedSet = new Set(idList);
                setBookings((prev) => prev.filter((b) => !deletedSet.has(b.id)));
                setSelectedIds(new Set());
                if (selectedBooking && deletedSet.has(selectedBooking.id)) {
                    setSelectedBooking(null);
                }
                setStats((prev) => ({
                    ...prev,
                    total: Math.max(0, prev.total - count),
                }));
                showNotice(`Successfully deleted ${count} lead(s).`);
            } else {
                showNotice("Failed to delete selected leads. Please try again.", "error");
            }
        } catch (err) {
            console.error("Error in bulk delete:", err);
            showNotice("Network error during bulk delete.", "error");
        } finally {
            setIsDeletingMultiple(false);
        }
    };

    // Row selection toggle
    const toggleSelectRow = (id) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    // Select all visible or select all filtered
    const displayedBookings = useMemo(() => {
        return bookings.slice(0, visibleCount);
    }, [bookings, visibleCount]);

    const isAllVisibleSelected =
        displayedBookings.length > 0 &&
        displayedBookings.every((b) => selectedIds.has(b.id));

    const toggleSelectAllVisible = () => {
        if (isAllVisibleSelected) {
            setSelectedIds((prev) => {
                const next = new Set(prev);
                displayedBookings.forEach((b) => next.delete(b.id));
                return next;
            });
        } else {
            setSelectedIds((prev) => {
                const next = new Set(prev);
                displayedBookings.forEach((b) => next.add(b.id));
                return next;
            });
        }
    };

    const selectAllFiltered = () => {
        const next = new Set(bookings.map((b) => b.id));
        setSelectedIds(next);
        showNotice(`Selected all ${bookings.length} matching leads.`);
    };

    const clearSelection = () => {
        setSelectedIds(new Set());
    };

    // =========================================================================
    // EXPORT TO CSV / EXCEL
    // =========================================================================
    const exportLeadsToCSV = (leadsToExport, filenameSuffix = "") => {
        if (!leadsToExport || leadsToExport.length === 0) {
            showNotice("No leads available to export.", "error");
            return;
        }

        const headers = [
            "Lead ID",
            "Daily Booking #",
            "Submission Date",
            "Submission Time",
            "Client Name",
            "Phone Number",
            "Email Address",
            "Lead Channel",
            "Form Type",
            "Selected Service",
            "Preferred Date",
            "Preferred Time",
            "Salon Branch / City",
            "Guests",
            "Pipeline Status",
            "Client Message / Notes",
            "IP Address",
        ];

        const escapeCSV = (val) => {
            if (val === null || val === undefined) return '""';
            const str = String(val).replace(/"/g, '""');
            return `"${str}"`;
        };

        const rows = leadsToExport.map((lead) => {
            const source = formatLeadSource(lead.form_type);
            const statusMeta = getStatusMeta(lead.status);
            const created = lead.created_at ? new Date(lead.created_at) : null;
            const subDate = created ? created.toISOString().split("T")[0] : "";
            const subTime = created ? created.toLocaleTimeString("en-IN") : "";

            return [
                lead.id,
                lead.booking_number ? `#${lead.booking_number}` : "",
                subDate,
                subTime,
                lead.name || "",
                lead.phone || "",
                lead.email || "",
                source.groupName,
                source.badgeText,
                lead.service_or_course || "General Inquiry",
                lead.booking_date || "Flexible",
                lead.booking_time || "",
                lead.branch_location || lead.city || "Lucknow",
                lead.guests || 1,
                statusMeta.label,
                lead.message || "",
                lead.ip_address || "",
            ].map(escapeCSV).join(",");
        });

        // Add UTF-8 BOM so Excel automatically recognizes unicode formatting
        const csvContent = "\uFEFF" + [headers.map(escapeCSV).join(","), ...rows].join("\r\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const todayStr = new Date().toISOString().split("T")[0];
        link.href = url;
        link.setAttribute(
            "download",
            `KNK_Awadh_Leads_${filenameSuffix ? filenameSuffix + "_" : ""}${todayStr}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setShowExportMenu(false);
        showNotice(`Exported ${leadsToExport.length} leads to CSV successfully.`);
    };

    const copyPhoneToClipboard = (id, phone) => {
        if (!phone) return;
        navigator.clipboard.writeText(phone);
        setCopiedPhoneId(id);
        setTimeout(() => setCopiedPhoneId(null), 2000);
    };

    const isFiltered = typeFilter !== "all" || statusFilter !== "all" || search.trim() !== "";
    const hasMore = visibleCount < bookings.length;
    const remainingCount = Math.max(0, bookings.length - visibleCount);

    return (
        <div className="max-w-7xl mx-auto space-y-5">
            {/* Action Feedback Banner */}
            {actionNotice && (
                <div
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                        actionNotice.type === "error"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                    }`}
                >
                    <div className="flex items-center gap-2">
                        {actionNotice.type === "error" ? (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        <span>{actionNotice.msg}</span>
                    </div>
                    <button
                        onClick={() => setActionNotice(null)}
                        className="text-stone-500 hover:text-stone-800 p-0.5 cursor-pointer"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            {/* Header: Clean & Minimal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2dbd2] pb-5">
                <div>
                    <h1 className="font-display text-3xl text-ink font-semibold">
                        Bookings &amp; Leads Management
                    </h1>
                    <p className="font-sans text-xs text-muted mt-1">
                        Track, assign, and manage live inquiries from Home Page, Popup Modals, and Campaign Landing Pages.
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    {/* Leads Export Menu */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowExportMenu((prev) => !prev)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-[#faf7f2] text-ink border border-border shadow-2xs transition-colors cursor-pointer"
                        >
                            <Download className="w-3.5 h-3.5 text-gold-deep" />
                            <span>Export Leads</span>
                            <ChevronDown className="w-3 h-3 text-muted" />
                        </button>

                        {showExportMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-20"
                                    onClick={() => setShowExportMenu(false)}
                                />
                                <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl bg-white border border-border shadow-luxe py-1.5 z-30 text-xs font-sans">
                                    <button
                                        type="button"
                                        onClick={() => exportLeadsToCSV(bookings, "filtered")}
                                        className="w-full text-left px-3.5 py-2 hover:bg-[#faf7f2] text-ink flex items-center justify-between cursor-pointer"
                                    >
                                        <span>Export Filtered Leads</span>
                                        <span className="font-mono text-[10px] text-muted bg-[#f2ede4] px-1.5 py-0.5 rounded">
                                            {bookings.length}
                                        </span>
                                    </button>

                                    {selectedIds.size > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const selList = bookings.filter((b) => selectedIds.has(b.id));
                                                exportLeadsToCSV(selList, "selected");
                                            }}
                                            className="w-full text-left px-3.5 py-2 hover:bg-emerald-50 text-emerald-800 font-semibold flex items-center justify-between cursor-pointer"
                                        >
                                            <span>Export Selected Leads</span>
                                            <span className="font-mono text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded">
                                                {selectedIds.size}
                                            </span>
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            try {
                                                const res = await fetch("/api/bookings?status=all&formType=all");
                                                if (res.ok) {
                                                    const d = await res.json();
                                                    exportLeadsToCSV(d.bookings || bookings, "all");
                                                }
                                            } catch {
                                                exportLeadsToCSV(bookings, "all");
                                            }
                                        }}
                                        className="w-full text-left px-3.5 py-2 hover:bg-[#faf7f2] text-ink flex items-center justify-between border-t border-[#f2ede4] cursor-pointer"
                                    >
                                        <span>Export All Leads (Full DB)</span>
                                        <span className="font-mono text-[10px] text-muted bg-[#f2ede4] px-1.5 py-0.5 rounded">
                                            {stats.total || bookings.length}
                                        </span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Refresh */}
                    <button
                        type="button"
                        onClick={fetchBookings}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-white hover:bg-[#faf7f2] text-ink border border-border shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 text-muted ${loading ? "animate-spin" : ""}`} />
                        <span>{loading ? "Refreshing..." : "Refresh"}</span>
                    </button>
                </div>
            </div>

            {/* Metrics: Lead Sources Breakdown (Home page, Popup, Landing page, Skin Aesthetics, Academy, Website) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
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
                            <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-250">
                                {stats.pending} pending
                            </span>
                        )}
                    </div>
                    <p className="font-display text-3xl font-bold text-ink mt-2">
                        {stats.total || 0}
                    </p>
                    <p className="text-[11px] text-muted mt-1">
                        All channels &amp; campaigns
                    </p>
                </div>

                {/* 2. Home Page Leads */}
                <div
                    onClick={() => setTypeFilter(typeFilter === "home_page" ? "all" : "home_page")}
                    className={`p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                        typeFilter === "home_page"
                            ? "border-amber-700 shadow-xs ring-1 ring-amber-700 bg-amber-50/20"
                            : "border-[#e8e2d5] hover:border-amber-400"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-900">
                            Home Page
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                            Concierge + Studio
                        </span>
                    </div>
                    <p className="font-display text-3xl font-bold text-amber-800 mt-2">
                        {stats.homePage || 0}
                    </p>
                    <p className="text-[11px] text-muted mt-1">
                        Hero concierge &amp; luxury booking
                    </p>
                </div>

                {/* 3. Popup Modal Leads */}
                <div
                    onClick={() => setTypeFilter(typeFilter === "popup" ? "all" : "popup")}
                    className={`p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                        typeFilter === "popup"
                            ? "border-purple-600 shadow-xs ring-1 ring-purple-600 bg-purple-50/20"
                            : "border-[#e8e2d5] hover:border-purple-300"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-purple-900">
                            Popup Modal
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                            Site-wide Popup
                        </span>
                    </div>
                    <p className="font-display text-3xl font-bold text-purple-800 mt-2">
                        {stats.popup || 0}
                    </p>
                    <p className="text-[11px] text-muted mt-1">
                        Book Appointment button popups
                    </p>
                </div>

                {/* 4. Landing Pages (Bridal + Salon) */}
                <div
                    onClick={() => setTypeFilter(typeFilter === "landing_page" ? "all" : "landing_page")}
                    className={`p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                        typeFilter === "landing_page"
                            ? "border-rose-600 shadow-xs ring-1 ring-rose-600 bg-rose-50/20"
                            : "border-[#e8e2d5] hover:border-rose-400"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-rose-900">
                            Landing Pages
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                            Bridal + Salon
                        </span>
                    </div>
                    <p className="font-display text-3xl font-bold text-rose-700 mt-2">
                        {stats.landingPages || (stats.bridalLanding + stats.salonLanding) || 0}
                    </p>
                    <p className="text-[11px] text-muted mt-1">
                        Dedicated ads campaign pages
                    </p>
                </div>

                {/* 5. Skin Aesthetics Leads */}
                <div
                    onClick={() => setTypeFilter(typeFilter === "skin_aesthetics" ? "all" : "skin_aesthetics")}
                    className={`p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                        typeFilter === "skin_aesthetics"
                            ? "border-[#784e2d] shadow-xs ring-1 ring-[#784e2d] bg-[#fbf4eb]/50"
                            : "border-[#e8e2d5] hover:border-[#c9a24a]"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#784e2d]">
                            Skin Aesthetics
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                            KNK SKKIN
                        </span>
                    </div>
                    <p className="font-display text-3xl font-bold text-[#784e2d] mt-2">
                        {stats.skinAesthetics || 0}
                    </p>
                    <p className="text-[11px] text-muted mt-1">
                        Doctor consultation leads
                    </p>
                </div>

                {/* 6. Academy Admissions Leads */}
                <div
                    onClick={() => setTypeFilter(typeFilter === "academy" ? "all" : "academy")}
                    className={`p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                        typeFilter === "academy"
                            ? "border-[#877443] shadow-xs ring-1 ring-[#877443] bg-[#fbf4eb]/50"
                            : "border-[#e8e2d5] hover:border-[#877443]"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#877443]">
                            Academy
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                            Admissions
                        </span>
                    </div>
                    <p className="font-display text-3xl font-bold text-[#877443] mt-2">
                        {stats.academy || 0}
                    </p>
                    <p className="text-[11px] text-muted mt-1">
                        Course enrollment leads
                    </p>
                </div>
            </div>

            {/* Standard Pipeline Ribbon (Pending, Assigned, Follow-up, Confirmed / Booked, Completed, Cancelled) */}
            <div className="bg-white p-3 rounded-xl border border-[#e8e2d5] shadow-2xs">
                <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                        Standard Lead &amp; Booking Pipeline Flow
                    </span>
                    <span className="text-[10px] text-muted">
                        Click any status to filter leads
                    </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
                    {LEAD_STATUS_PIPELINE.map((pStep, idx) => {
                        const countKey = pStep.key === "follow_up" ? "follow_up" : pStep.key;
                        const count = stats[countKey] ?? 0;
                        const isCurrent = statusFilter === pStep.key;

                        return (
                            <button
                                key={pStep.key}
                                type="button"
                                onClick={() => setStatusFilter(isCurrent ? "all" : pStep.key)}
                                className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                                    isCurrent
                                        ? "ring-1 ring-gold border-gold bg-[#faf7f2] shadow-xs"
                                        : "border-[#f0eae0] hover:border-border hover:bg-[#fcfaf7]"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-muted font-semibold">
                                        0{idx + 1}
                                    </span>
                                    <span className={`h-2 w-2 rounded-full ${pStep.dotClass}`} />
                                </div>
                                <p className="font-semibold text-ink text-xs mt-1 truncate">
                                    {pStep.label}
                                </p>
                                <div className="flex items-center justify-between mt-1 text-[11px]">
                                    <span className="text-muted text-[10px]">{pStep.desc}</span>
                                    <span className="font-mono font-bold text-ink">
                                        {count}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Filter Bar: Source tabs & Search */}
            <div className="bg-white p-3.5 rounded-xl border border-[#e8e2d5] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Source Tabs */}
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
                        onClick={() => setTypeFilter("home_page")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            typeFilter === "home_page"
                                ? "bg-amber-800 text-white font-semibold"
                                : "text-amber-900 hover:bg-amber-50"
                        }`}
                    >
                        Home Page ({stats.homePage || 0})
                    </button>

                    <button
                        type="button"
                        onClick={() => setTypeFilter("popup")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            typeFilter === "popup"
                                ? "bg-purple-800 text-white font-semibold"
                                : "text-purple-900 hover:bg-purple-50"
                        }`}
                    >
                        Popup ({stats.popup || 0})
                    </button>

                    <button
                        type="button"
                        onClick={() => setTypeFilter("landing_page")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            typeFilter === "landing_page"
                                ? "bg-rose-800 text-white font-semibold"
                                : "text-rose-900 hover:bg-rose-50"
                        }`}
                    >
                        Landing Pages ({stats.landingPages || (stats.bridalLanding + stats.salonLanding) || 0})
                    </button>

                    <button
                        type="button"
                        onClick={() => setTypeFilter("skin_aesthetics")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            typeFilter === "skin_aesthetics"
                                ? "bg-[#784e2d] text-white font-semibold shadow-xs"
                                : "text-[#784e2d] hover:bg-[#fbf4eb]"
                        }`}
                    >
                        Skin Aesthetics ({stats.skinAesthetics || 0})
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
                        Other Website ({stats.website || 0})
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
                        <option value="all">All Statuses ({bookings.length})</option>
                        {LEAD_STATUS_PIPELINE.map((status) => (
                            <option key={status.key} value={status.key}>
                                {status.label}
                            </option>
                        ))}
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

            {/* Bulk Action Sticky Bar (when 1 or more leads selected) */}
            {selectedIds.size > 0 && (
                <div className="bg-ink text-white px-4 py-3 rounded-xl shadow-luxe flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-semibold text-xs sm:text-sm">
                            {selectedIds.size} lead{selectedIds.size > 1 ? "s" : ""} selected
                        </span>
                        {selectedIds.size < bookings.length && (
                            <button
                                type="button"
                                onClick={selectAllFiltered}
                                className="text-[11px] text-gold underline hover:text-gold-light cursor-pointer font-medium ml-1"
                            >
                                Select all {bookings.length} leads
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Export Selected */}
                        <button
                            type="button"
                            onClick={() => {
                                const selList = bookings.filter((b) => selectedIds.has(b.id));
                                exportLeadsToCSV(selList, "selected");
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>Export ({selectedIds.size})</span>
                        </button>

                        {/* Multiple Delete */}
                        <button
                            type="button"
                            onClick={handleBulkDelete}
                            disabled={isDeletingMultiple}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>
                                {isDeletingMultiple
                                    ? "Deleting..."
                                    : `Delete Selected (${selectedIds.size})`}
                            </span>
                        </button>

                        {/* Clear Selection */}
                        <button
                            type="button"
                            onClick={clearSelection}
                            className="px-2.5 py-1.5 text-white/70 hover:text-white text-xs cursor-pointer"
                        >
                            Deselect
                        </button>
                    </div>
                </div>
            )}

            {/* Bookings Table: Simple, Spacious, Clear */}
            <div className="bg-white rounded-xl border border-[#e8e2d5] shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#fcfaf7] border-b border-[#e8e2d5] font-sans text-[10px] tracking-[0.16em] uppercase text-muted">
                                <th className="py-3.5 pl-4 pr-2 w-10">
                                    <button
                                        type="button"
                                        onClick={toggleSelectAllVisible}
                                        className="text-muted hover:text-ink cursor-pointer p-1"
                                        title={isAllVisibleSelected ? "Deselect all visible" : "Select all visible"}
                                    >
                                        {isAllVisibleSelected ? (
                                            <CheckSquare className="w-4 h-4 text-ink" />
                                        ) : selectedIds.size > 0 ? (
                                            <Square className="w-4 h-4 text-gold-deep" />
                                        ) : (
                                            <Square className="w-4 h-4 text-stone-300" />
                                        )}
                                    </button>
                                </th>
                                <th className="py-3.5 px-3 font-semibold">Client</th>
                                <th className="py-3.5 px-3 font-semibold">Lead Source</th>
                                <th className="py-3.5 px-3 font-semibold">Service / Inquiry</th>
                                <th className="py-3.5 px-3 font-semibold">Date &amp; Time</th>
                                <th className="py-3.5 px-3 font-semibold">Branch</th>
                                <th className="py-3.5 px-3 font-semibold">Status</th>
                                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#f2ede4] font-sans text-xs">
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-muted">
                                        Loading leads...
                                    </td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-muted">
                                        No leads found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                displayedBookings.map((item) => {
                                    const source = formatLeadSource(item.form_type);
                                    const statusMeta = getStatusMeta(item.status);
                                    const isUpdating = updatingId === item.id;
                                    const isCopied = copiedPhoneId === item.id;
                                    const isSelected = selectedIds.has(item.id);

                                    return (
                                        <tr
                                            key={item.id}
                                            className={`hover:bg-[#faf7f2] transition-colors border-l-3 ${source.borderAccent} ${
                                                isSelected ? "bg-amber-50/30" : ""
                                            }`}
                                        >
                                            {/* Selection Checkbox */}
                                            <td className="py-3 pl-4 pr-2">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSelectRow(item.id)}
                                                    className="text-muted hover:text-ink cursor-pointer p-1"
                                                >
                                                    {isSelected ? (
                                                        <CheckSquare className="w-4 h-4 text-ink" />
                                                    ) : (
                                                        <Square className="w-4 h-4 text-stone-300 hover:text-stone-500" />
                                                    )}
                                                </button>
                                            </td>

                                            {/* Client */}
                                            <td className="py-3 px-3">
                                                <div className="flex items-center gap-1.5">
                                                    <p className="font-semibold text-ink text-sm">
                                                        {item.name}
                                                    </p>
                                                    <span
                                                        className="text-[10px] font-mono font-bold text-[#8a6828] bg-[#fbf5ea] border border-[#e8d5b5] px-1.5 py-0.5 rounded-full"
                                                        title={`Daily lead #${item.booking_number || 1}`}
                                                    >
                                                        #{item.booking_number || 1}
                                                    </span>
                                                </div>
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

                                            {/* Lead Source: Clear origin */}
                                            <td className="py-3 px-3 whitespace-nowrap">
                                                <div className="flex flex-col items-start gap-1">
                                                    <span
                                                        className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${source.badgeClass}`}
                                                    >
                                                        {source.badgeText}
                                                    </span>
                                                    <span className="text-[10px] text-muted font-mono">
                                                        #{item.booking_number || 1} · {source.path}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Service / Inquiry */}
                                            <td className="py-3 px-3 max-w-[190px]">
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
                                            <td className="py-3 px-3 whitespace-nowrap">
                                                <p className="text-ink font-medium">
                                                    {item.booking_date || "Flexible"}
                                                </p>
                                                <p className="text-[10px] text-muted">
                                                    {item.booking_time || "Any time"}
                                                </p>
                                            </td>

                                            {/* Branch */}
                                            <td className="py-3 px-3 text-muted whitespace-nowrap">
                                                {item.branch_location || item.city || "Lucknow"}
                                            </td>

                                            {/* Status: Standard 6 Pipeline Statuses */}
                                            <td className="py-3 px-3 whitespace-nowrap">
                                                <select
                                                    value={item.status}
                                                    disabled={isUpdating}
                                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                    className={`border text-[11px] font-semibold rounded-md px-2 py-1 outline-none uppercase tracking-wider cursor-pointer ${
                                                        statusMeta.badgeClass
                                                    } ${isUpdating ? "opacity-50" : ""}`}
                                                >
                                                    {LEAD_STATUS_PIPELINE.map((pStep) => (
                                                        <option key={pStep.key} value={pStep.key}>
                                                            {pStep.label}
                                                        </option>
                                                    ))}
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

                {/* View More / Pagination Controls */}
                {hasMore && (
                    <div className="bg-[#faf7f2] px-5 py-4 border-t border-[#e8e2d5] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-xs text-muted">
                            Showing <span className="font-semibold text-ink">{displayedBookings.length}</span> of <span className="font-semibold text-ink">{bookings.length}</span> leads
                            <span className="text-muted/70 ml-1">({remainingCount} more remaining)</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setVisibleCount((prev) => prev + 15)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-ink hover:bg-black text-white text-xs font-semibold rounded-lg shadow-xs transition-all duration-200 cursor-pointer hover:scale-[1.01]"
                            >
                                <ChevronDown className="w-3.5 h-3.5" />
                                <span>View More (+15)</span>
                                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
                                    {remainingCount} left
                                </span>
                            </button>

                            {remainingCount > 15 && (
                                <button
                                    type="button"
                                    onClick={() => setVisibleCount(bookings.length)}
                                    className="px-3 py-2 bg-white hover:bg-[#f2ede4] text-ink text-xs font-medium rounded-lg border border-border shadow-2xs transition-colors cursor-pointer"
                                >
                                    Show All ({bookings.length})
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer summary */}
                <div className="bg-[#fcfaf7] px-5 py-3 border-t border-[#e8e2d5] flex items-center justify-between text-xs text-muted">
                    <span>
                        Total matching leads: <strong className="text-ink">{bookings.length}</strong>
                    </span>
                    <span className="font-mono text-[11px]">
                        Home: {stats.homePage || 0} | Popup: {stats.popup || 0} | Landing: {stats.landingPages || 0} | Skin: {stats.skinAesthetics || 0} | Other: {stats.website || 0}
                    </span>
                </div>
            </div>

            {/* Lead Details Modal */}
            {selectedBooking && (() => {
                const source = formatLeadSource(selectedBooking.form_type);
                const statusMeta = getStatusMeta(selectedBooking.status);
                const cleanPhone = (selectedBooking.phone || "").replace(/[^\d]/g, "");

                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-150">
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
                                    Daily Lead #{selectedBooking.booking_number || 1} · System ID #{selectedBooking.id}
                                </span>
                                <h2 className="font-display text-2xl text-ink font-semibold mt-0.5">
                                    {selectedBooking.name}
                                </h2>
                                <p className="text-xs text-muted">
                                    Received: {selectedBooking.created_at ? new Date(selectedBooking.created_at).toLocaleString("en-IN") : "Recent"}
                                </p>
                            </div>

                            {/* Clear Lead Source Banner */}
                            <div className="p-3 rounded-lg bg-[#faf7f2] border border-border flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] uppercase text-muted tracking-wider font-semibold block">
                                        Source Origin:
                                    </span>
                                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded text-xs font-semibold border ${source.badgeClass}`}>
                                        {source.badgeText}
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-muted">
                                    {source.path}
                                </span>
                            </div>

                            {/* Details Grid */}
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
                                    <span className="text-[10px] uppercase text-muted tracking-wider block">Selected Service:</span>
                                    <span className="font-semibold text-gold-deep">
                                        {selectedBooking.service_or_course || "General Inquiry"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase text-muted tracking-wider block">Preferred Date:</span>
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

                            {/* Status Pipeline Step */}
                            <div>
                                <span className="text-[10px] uppercase text-muted tracking-wider block mb-1.5 font-semibold">
                                    Pipeline Status:
                                </span>
                                <div className="flex items-center gap-3">
                                    <select
                                        value={selectedBooking.status}
                                        onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
                                        className={`flex-1 border text-xs rounded-lg px-3 py-2 uppercase tracking-wider font-semibold cursor-pointer ${
                                            statusMeta.badgeClass
                                        }`}
                                    >
                                        {LEAD_STATUS_PIPELINE.map((pStep) => (
                                            <option key={pStep.key} value={pStep.key}>
                                                {pStep.label} — {pStep.desc}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-border">
                                <button
                                    type="button"
                                    onClick={() => handleDelete(selectedBooking.id)}
                                    className="px-3 py-2 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-lg transition cursor-pointer"
                                >
                                    Delete Lead
                                </button>

                                <a
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                        `Hello ${selectedBooking.name}, this is KNK Salon Awadh following up on your appointment request.`
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 bg-[#25D366] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition cursor-pointer inline-flex items-center gap-1.5"
                                >
                                    <span>WhatsApp Client ↗</span>
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
