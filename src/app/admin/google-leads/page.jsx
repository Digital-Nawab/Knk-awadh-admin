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
    Send,
    HelpCircle,
    FileText,
    Sparkles,
    ShieldCheck,
    MessageCircle,
    SlidersHorizontal,
    Globe,
    Layers,
} from "lucide-react";

// Standard status pipeline matching Bookings & Leads
export const GOOGLE_LEAD_STATUS_PIPELINE = [
    {
        key: "pending",
        label: "Pending",
        desc: "New incoming lead",
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
        desc: "Lost or called off",
        badgeClass: "bg-rose-50 text-rose-700 border-rose-300",
        dotClass: "bg-rose-500",
    },
];

const BRANCH_OPTIONS = [
    "KNK Salon Mahanagar",
    "KNK Salon Gomti Nagar",
    "KNK Salon Hazratganj",
    "Central Studio",
];

export default function AdminGoogleLeadsPage() {
    const [leads, setLeads] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        assigned: 0,
        follow_up: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0,
        today_leads: 0,
        test_leads: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [testFilter, setTestFilter] = useState("all"); // "all", "real", "test"
    const [selectedIds, setSelectedIds] = useState([]);
    const [updatingId, setUpdatingId] = useState(null);
    const [openStatusMenuId, setOpenStatusMenuId] = useState(null);

    // Modals
    const [setupModalOpen, setSetupModalOpen] = useState(false);
    const [selectedLeadModal, setSelectedLeadModal] = useState(null);
    const [notesModalLead, setNotesModalLead] = useState(null);
    const [noteText, setNoteText] = useState("");
    const [simulating, setSimulating] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(false);
    const [copiedKey, setCopiedKey] = useState(false);
    const [webhookConfig, setWebhookConfig] = useState(null);

    // Fetch leads and stats
    const fetchLeads = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const params = new URLSearchParams();
            if (statusFilter !== "all") params.append("status", statusFilter);
            if (searchQuery.trim()) params.append("search", searchQuery.trim());
            if (testFilter === "real") params.append("isTest", "0");
            if (testFilter === "test") params.append("isTest", "1");

            const res = await fetch(`/api/admin/google-leads?${params.toString()}`);
            const data = await res.json();

            if (res.ok && data.success) {
                setLeads(data.leads || []);
                if (data.stats) setStats(data.stats);
            } else {
                setError(data.error || "Failed to load Google Ads leads.");
            }
        } catch (err) {
            setError(err.message || "Network error loading leads.");
        } finally {
            setLoading(false);
        }
    }, [statusFilter, searchQuery, testFilter]);

    // Fetch webhook config
    const fetchWebhookConfig = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/google-leads/config");
            const data = await res.json();
            if (res.ok && data.success) {
                setWebhookConfig(data);
            }
        } catch {
            // fallback
        }
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    useEffect(() => {
        fetchWebhookConfig();
    }, [fetchWebhookConfig]);

    // Status update handler
    const handleUpdateStatus = async (id, newStatus) => {
        setUpdatingId(id);
        setOpenStatusMenuId(null);
        try {
            const res = await fetch(`/api/admin/google-leads/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setLeads((prev) =>
                    prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
                );
                // Refresh stats
                fetchLeads();
            } else {
                alert(data.error || "Failed to update status.");
            }
        } catch (err) {
            alert(err.message || "Failed to update status.");
        } finally {
            setUpdatingId(null);
        }
    };

    // Notes save handler
    const handleSaveNotes = async () => {
        if (!notesModalLead) return;
        setUpdatingId(notesModalLead.id);
        try {
            const res = await fetch(`/api/admin/google-leads/${notesModalLead.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notes: noteText }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setLeads((prev) =>
                    prev.map((l) => (l.id === notesModalLead.id ? { ...l, notes: noteText } : l))
                );
                setNotesModalLead(null);
            } else {
                alert(data.error || "Failed to save notes.");
            }
        } catch (err) {
            alert(err.message || "Error saving notes.");
        } finally {
            setUpdatingId(null);
        }
    };

    // Assign branch / staff
    const handleAssign = async (id, assignedTo, preferredBranch) => {
        setUpdatingId(id);
        try {
            const res = await fetch(`/api/admin/google-leads/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ assignedTo, preferredBranch }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setLeads((prev) =>
                    prev.map((l) =>
                        l.id === id
                            ? {
                                  ...l,
                                  assigned_to: assignedTo,
                                  preferred_branch: preferredBranch || l.preferred_branch,
                                  status: l.status === "pending" ? "assigned" : l.status,
                              }
                            : l
                    )
                );
            }
        } catch {
            // ignore
        } finally {
            setUpdatingId(null);
        }
    };

    // Delete single lead
    const handleDeleteLead = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
        setUpdatingId(id);
        try {
            const res = await fetch(`/api/admin/google-leads/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (res.ok && data.success) {
                setLeads((prev) => prev.filter((l) => l.id !== id));
                setSelectedIds((prev) => prev.filter((item) => item !== id));
            } else {
                alert(data.error || "Failed to delete lead.");
            }
        } catch (err) {
            alert(err.message || "Failed to delete lead.");
        } finally {
            setUpdatingId(null);
        }
    };

    // Simulate test lead
    const handleSimulateLead = async () => {
        try {
            setSimulating(true);
            const res = await fetch("/api/admin/google-leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "simulate" }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                alert("Test Google Ads lead received and saved to CRM successfully!");
                fetchLeads();
            } else {
                alert(data.error || "Simulation failed.");
            }
        } catch (err) {
            alert(err.message || "Simulation error.");
        } finally {
            setSimulating(false);
        }
    };

    // Bulk actions
    const handleBulkAction = async (action, status = null) => {
        if (selectedIds.length === 0) return;
        if (action === "delete" && !window.confirm(`Delete ${selectedIds.length} selected leads?`)) return;

        try {
            const res = await fetch("/api/admin/google-leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, ids: selectedIds, status }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setSelectedIds([]);
                fetchLeads();
            } else {
                alert(data.error || "Bulk action failed.");
            }
        } catch (err) {
            alert(err.message || "Bulk action error.");
        }
    };

    // Export to CSV
    const handleExportCSV = () => {
        if (leads.length === 0) {
            alert("No leads to export.");
            return;
        }

        const headers = [
            "Lead ID",
            "Date",
            "Name",
            "Phone",
            "Email",
            "Service",
            "Branch",
            "City",
            "Postal Code",
            "Campaign ID",
            "Campaign Name",
            "Status",
            "Is Test",
            "Notes",
        ];

        const rows = leads.map((l) => [
            l.lead_id || l.id,
            new Date(l.created_at).toLocaleString("en-IN"),
            `"${(l.name || "").replace(/"/g, '""')}"`,
            `"${l.phone || ""}"`,
            `"${l.email || ""}"`,
            `"${(l.service_interested || "").replace(/"/g, '""')}"`,
            `"${(l.preferred_branch || "").replace(/"/g, '""')}"`,
            `"${(l.city || "").replace(/"/g, '""')}"`,
            `"${l.postal_code || ""}"`,
            `"${l.campaign_id || ""}"`,
            `"${(l.campaign_name || "").replace(/"/g, '""')}"`,
            l.status,
            l.is_test ? "Yes" : "No",
            `"${(l.notes || "").replace(/"/g, '""')}"`,
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute(
            "download",
            `google_ads_leads_${new Date().toISOString().slice(0, 10)}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Format Indian phone number for WhatsApp
    const formatWhatsappUrl = (phone, name) => {
        const digits = String(phone || "").replace(/\D/g, "");
        const clean = digits.startsWith("91") && digits.length > 10 ? digits : `91${digits.slice(-10)}`;
        const message = `Hello ${name || "Client"}, thank you for connecting with KNK Salon Awadh via our Google Ad! How can we assist you with your appointment or service inquiry today?`;
        return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
    };

    const webhookUrl =
        webhookConfig?.webhookUrl ||
        (typeof window !== "undefined"
            ? `${window.location.origin}/api/webhooks/google-leads`
            : "https://knksalonawadh.com/api/webhooks/google-leads");
    const secretKey = webhookConfig?.secretKey || "knk_google_leads_2026";

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
            {/* Top Banner / Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-[#EAE2D5] rounded-3xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-2xl bg-[#4285F4]/10 border border-[#4285F4]/20 flex items-center justify-center text-[#4285F4]">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                        </div>
                        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#161413]">
                            Google Ads Leads CRM
                        </h1>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4285F4]/10 text-[#4285F4] border border-[#4285F4]/20">
                            Live Webhook Sync
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#7A726B]">
                        Real-time lead capture from Google Search, Display &amp; YouTube Lead Form Assets.
                    </p>
                </div>

                {/* Header CTA Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        onClick={() => setSetupModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/5 text-xs font-semibold shadow-xs hover:shadow-sm transition cursor-pointer"
                    >
                        <ShieldCheck className="w-4 h-4 text-[#4285F4]" />
                        <span>Webhook Setup &amp; Key</span>
                    </button>

                    <button
                        onClick={handleSimulateLead}
                        disabled={simulating}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#B3203F] hover:bg-[#961732] text-white text-xs font-semibold shadow-xs hover:shadow-sm transition disabled:opacity-50 cursor-pointer"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#F5DB99]" />
                        <span>{simulating ? "Simulating..." : "Send Test Lead"}</span>
                    </button>

                    <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-white border border-[#EAE2D5] text-[#524B44] hover:text-[#161413] hover:border-[#161413] text-xs font-medium transition cursor-pointer"
                        title="Export Leads to CSV"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Export</span>
                    </button>

                    <button
                        onClick={fetchLeads}
                        disabled={loading}
                        className="p-2.5 rounded-2xl bg-white border border-[#EAE2D5] text-[#524B44] hover:text-[#161413] transition disabled:opacity-50 cursor-pointer"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Pipeline KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
                {GOOGLE_LEAD_STATUS_PIPELINE.map((pipeline) => {
                    const count = stats[pipeline.key] || 0;
                    const isSelected = statusFilter === pipeline.key;

                    return (
                        <button
                            key={pipeline.key}
                            onClick={() => setStatusFilter(isSelected ? "all" : pipeline.key)}
                            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                                isSelected
                                    ? "bg-white border-[#B3203F] shadow-sm ring-2 ring-[#B3203F]/10"
                                    : "bg-white border-[#EAE2D5] hover:border-[#B3203F]/40"
                            }`}
                        >
                            <div className="flex items-center justify-between gap-1 mb-2">
                                <span className="text-[11px] font-semibold text-[#7A726B] truncate">
                                    {pipeline.label}
                                </span>
                                <span className={`w-2 h-2 rounded-full ${pipeline.dotClass}`} />
                            </div>
                            <div className="flex items-baseline justify-between">
                                <span className="text-2xl sm:text-3xl font-bold font-playfair text-[#161413]">
                                    {count}
                                </span>
                                {pipeline.key === "pending" && count > 0 && (
                                    <span className="animate-pulse text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full">
                                        Action
                                    </span>
                                )}
                            </div>
                            <p className="text-[10px] text-[#A39990] mt-1 truncate">{pipeline.desc}</p>
                        </button>
                    );
                })}
            </div>

            {/* Secondary Stats Strip: Total, Today & Test Leads */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5] text-xs text-[#524B44]">
                <div className="flex items-center gap-4 flex-wrap">
                    <div>
                        <strong className="text-[#161413]">Total Captured:</strong> {stats.total || 0}
                    </div>
                    <div>
                        <strong className="text-[#161413]">Today&apos;s Inflow:</strong>{" "}
                        <span className="text-emerald-700 font-bold">+{stats.today_leads || 0}</span>
                    </div>
                    {stats.test_leads > 0 && (
                        <div>
                            <strong className="text-[#161413]">Test Leads:</strong> {stats.test_leads}
                        </div>
                    )}
                </div>

                {/* Test Lead Filter Toggle */}
                <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#7A726B]">Filter View:</span>
                    <button
                        onClick={() => setTestFilter("all")}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition ${
                            testFilter === "all"
                                ? "bg-white text-[#161413] shadow-xs border border-[#EAE2D5]"
                                : "text-[#7A726B] hover:text-[#161413]"
                        }`}
                    >
                        All Leads
                    </button>
                    <button
                        onClick={() => setTestFilter("real")}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition ${
                            testFilter === "real"
                                ? "bg-white text-[#161413] shadow-xs border border-[#EAE2D5]"
                                : "text-[#7A726B] hover:text-[#161413]"
                        }`}
                    >
                        Real Ads
                    </button>
                    <button
                        onClick={() => setTestFilter("test")}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition ${
                            testFilter === "test"
                                ? "bg-white text-[#161413] shadow-xs border border-[#EAE2D5]"
                                : "text-[#7A726B] hover:text-[#161413]"
                        }`}
                    >
                        Test Leads
                    </button>
                </div>
            </div>

            {/* Filter, Search & Bulk Actions Bar */}
            <div className="bg-white border border-[#EAE2D5] rounded-3xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-[#A39990] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by client name, phone, email, city, campaign or service..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5] focus:border-[#B3203F] focus:bg-white text-xs sm:text-sm text-[#161413] placeholder-[#A39990] outline-none transition"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A39990] hover:text-[#161413]"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Status Pill Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                        <button
                            onClick={() => setStatusFilter("all")}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                                statusFilter === "all"
                                    ? "bg-[#161413] text-white"
                                    : "bg-[#FAF5EE] text-[#524B44] hover:bg-[#EAE2D5]"
                            }`}
                        >
                            All ({stats.total || 0})
                        </button>
                        {GOOGLE_LEAD_STATUS_PIPELINE.map((p) => {
                            const count = stats[p.key] || 0;
                            const active = statusFilter === p.key;
                            return (
                                <button
                                    key={p.key}
                                    onClick={() => setStatusFilter(p.key)}
                                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                                        active
                                            ? "bg-[#B3203F] text-white shadow-xs"
                                            : "bg-[#FAF5EE] text-[#524B44] hover:bg-[#EAE2D5]"
                                    }`}
                                >
                                    {p.label} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Bulk Actions Bar if items selected */}
                {selectedIds.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F5EFE6] bg-[#FAF5EE] -mx-4 -mb-4 p-4 rounded-b-3xl">
                        <div className="text-xs font-semibold text-[#161413]">
                            {selectedIds.length} leads selected
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-[#7A726B]">Move to:</span>
                            {GOOGLE_LEAD_STATUS_PIPELINE.map((p) => (
                                <button
                                    key={p.key}
                                    onClick={() => handleBulkAction("update_status", p.key)}
                                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-[#EAE2D5] hover:border-[#161413] text-[#161413] transition"
                                >
                                    {p.label}
                                </button>
                            ))}
                            <button
                                onClick={() => handleBulkAction("delete")}
                                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition"
                            >
                                Delete Selected
                            </button>
                            <button
                                onClick={() => setSelectedIds([])}
                                className="text-xs text-[#7A726B] hover:text-[#161413] underline ml-2"
                            >
                                Deselect All
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{error}</span>
                    </div>
                    <button
                        onClick={fetchLeads}
                        className="font-semibold underline hover:text-rose-900"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Leads Table Container */}
            <div className="bg-white border border-[#EAE2D5] rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.03)] overflow-hidden">
                {loading && leads.length === 0 ? (
                    <div className="py-20 text-center space-y-3">
                        <RefreshCw className="w-8 h-8 text-[#B3203F] animate-spin mx-auto" />
                        <p className="text-xs text-[#7A726B]">Loading Google Ads leads...</p>
                    </div>
                ) : leads.length === 0 ? (
                    <div className="py-20 text-center max-w-md mx-auto space-y-4 px-4">
                        <div className="w-14 h-14 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 flex items-center justify-center text-[#4285F4] mx-auto">
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-playfair text-xl font-bold text-[#161413]">
                                No Google Ads Leads Found
                            </h3>
                            <p className="text-xs text-[#7A726B] leading-relaxed">
                                Connect your Google Ads Lead Form webhook or send a test lead to see live entries here.
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-3 pt-2">
                            <button
                                onClick={handleSimulateLead}
                                disabled={simulating}
                                className="px-4 py-2.5 rounded-2xl bg-[#B3203F] text-white text-xs font-semibold hover:bg-[#961732] shadow-sm transition cursor-pointer"
                            >
                                {simulating ? "Sending..." : "Send Test Lead Now"}
                            </button>
                            <button
                                onClick={() => setSetupModalOpen(true)}
                                className="px-4 py-2.5 rounded-2xl bg-[#FAF5EE] text-[#161413] border border-[#EAE2D5] text-xs font-semibold hover:bg-[#EAE2D5] transition cursor-pointer"
                            >
                                View Webhook Guide
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#EAE2D5] bg-[#FAF5EE]/70 text-[11px] font-bold uppercase tracking-wider text-[#7A726B]">
                                    <th className="py-3.5 pl-5 pr-3 w-10">
                                        <input
                                            type="checkbox"
                                            checked={
                                                leads.length > 0 && selectedIds.length === leads.length
                                            }
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedIds(leads.map((l) => l.id));
                                                } else {
                                                    setSelectedIds([]);
                                                }
                                            }}
                                            className="rounded accent-[#B3203F] cursor-pointer"
                                        />
                                    </th>
                                    <th className="py-3.5 px-3">Client Details</th>
                                    <th className="py-3.5 px-3">Service &amp; Interest</th>
                                    <th className="py-3.5 px-3">Campaign &amp; Location</th>
                                    <th className="py-3.5 px-3">Status Pipeline</th>
                                    <th className="py-3.5 px-3">Branch &amp; Notes</th>
                                    <th className="py-3.5 pr-5 pl-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F5EFE6] text-xs">
                                {leads.map((lead) => {
                                    const isSelected = selectedIds.includes(lead.id);
                                    const currentStatusObj =
                                        GOOGLE_LEAD_STATUS_PIPELINE.find(
                                            (s) => s.key === lead.status
                                        ) || GOOGLE_LEAD_STATUS_PIPELINE[0];
                                    const isToday =
                                        new Date(lead.created_at).toDateString() ===
                                        new Date().toDateString();

                                    return (
                                        <tr
                                            key={lead.id}
                                            className={`hover:bg-[#FAF8F5] transition-colors ${
                                                isSelected ? "bg-[#B3203F]/5" : ""
                                            } ${lead.is_test ? "bg-amber-50/30" : ""}`}
                                        >
                                            {/* Select Checkbox */}
                                            <td className="py-4 pl-5 pr-3 align-top">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedIds((prev) => [...prev, lead.id]);
                                                        } else {
                                                            setSelectedIds((prev) =>
                                                                prev.filter((id) => id !== lead.id)
                                                            );
                                                        }
                                                    }}
                                                    className="rounded accent-[#B3203F] cursor-pointer mt-1"
                                                />
                                            </td>

                                            {/* Client Details */}
                                            <td className="py-4 px-3 align-top">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span className="font-semibold text-sm text-[#161413]">
                                                            {lead.name}
                                                        </span>
                                                        {isToday && (
                                                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                                                New
                                                            </span>
                                                        )}
                                                        {lead.is_test ? (
                                                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 border border-amber-300">
                                                                Test
                                                            </span>
                                                        ) : null}
                                                    </div>

                                                    {/* Contact Links */}
                                                    <div className="flex items-center gap-2 pt-0.5">
                                                        <a
                                                            href={`tel:${lead.phone}`}
                                                            className="inline-flex items-center gap-1 text-[#161413] hover:text-[#B3203F] font-medium"
                                                        >
                                                            <Phone className="w-3 h-3 text-[#B3203F]" />
                                                            <span>{lead.phone}</span>
                                                        </a>

                                                        <a
                                                            href={formatWhatsappUrl(lead.phone, lead.name)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition font-medium text-[10px]"
                                                            title="Chat on WhatsApp with customized message"
                                                        >
                                                            <MessageCircle className="w-3 h-3" />
                                                            <span>WhatsApp</span>
                                                        </a>
                                                    </div>

                                                    {lead.email && (
                                                        <a
                                                            href={`mailto:${lead.email}`}
                                                            className="inline-flex items-center gap-1 text-[#7A726B] hover:text-[#161413] text-[11px] truncate max-w-[200px]"
                                                        >
                                                            <Mail className="w-3 h-3 text-[#A39990]" />
                                                            <span>{lead.email}</span>
                                                        </a>
                                                    )}

                                                    <div className="text-[10.5px] text-[#A39990] pt-0.5">
                                                        {new Date(lead.created_at).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Service & Inquiry */}
                                            <td className="py-4 px-3 align-top">
                                                <div className="space-y-1">
                                                    <div className="font-medium text-[#161413]">
                                                        {lead.service_interested || "General Salon Inquiry"}
                                                    </div>
                                                    {lead.preferred_branch && (
                                                        <span className="inline-block px-2 py-0.5 rounded-md bg-[#FAF5EE] border border-[#EAE2D5] text-[10.5px] text-[#784e2d] font-medium">
                                                            {lead.preferred_branch}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Campaign & Location */}
                                            <td className="py-4 px-3 align-top">
                                                <div className="space-y-1">
                                                    <div className="text-[#524B44] font-medium">
                                                        {lead.campaign_name || (lead.campaign_id ? `Campaign ID: ${lead.campaign_id}` : "Google Ad Asset")}
                                                    </div>
                                                    {(lead.city || lead.postal_code) && (
                                                        <div className="flex items-center gap-1 text-[11px] text-[#7A726B]">
                                                            <MapPin className="w-3 h-3 text-[#B3203F]" />
                                                            <span>
                                                                {[lead.city, lead.postal_code]
                                                                    .filter(Boolean)
                                                                    .join(", ")}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {lead.lead_id && (
                                                        <span className="text-[10px] text-[#A39990] block font-mono">
                                                            ID: {String(lead.lead_id).slice(0, 15)}...
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Status Dropdown */}
                                            <td className="py-4 px-3 align-top">
                                                <div className="relative inline-block">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenStatusMenuId(
                                                                openStatusMenuId === lead.id
                                                                    ? null
                                                                    : lead.id
                                                                )
                                                            }
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition cursor-pointer ${currentStatusObj.badgeClass}`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${currentStatusObj.dotClass}`}
                                                            />
                                                            <span>{currentStatusObj.label}</span>
                                                            <ChevronDown className="w-3 h-3 opacity-60" />
                                                        </button>

                                                    {/* Status Selection Popover */}
                                                    {openStatusMenuId === lead.id && (
                                                        <div className="absolute left-0 mt-1 z-30 w-48 bg-white rounded-2xl shadow-xl border border-[#EAE2D5] py-1.5 animate-in fade-in duration-150">
                                                            <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#A39990] border-b border-[#F5EFE6]">
                                                                Move Pipeline
                                                            </div>
                                                            {GOOGLE_LEAD_STATUS_PIPELINE.map((p) => (
                                                                <button
                                                                    key={p.key}
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleUpdateStatus(lead.id, p.key)
                                                                    }
                                                                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#FAF5EE] transition ${
                                                                        lead.status === p.key
                                                                            ? "font-bold text-[#B3203F]"
                                                                            : "text-[#524B44]"
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <span
                                                                            className={`w-1.5 h-1.5 rounded-full ${p.dotClass}`}
                                                                        />
                                                                        <span>{p.label}</span>
                                                                    </div>
                                                                    {lead.status === p.key && (
                                                                        <Check className="w-3 h-3 text-[#B3203F]" />
                                                                    )}
                                                                </button>
                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Branch Assignment & Notes */}
                                            <td className="py-4 px-3 align-top">
                                                <div className="space-y-1.5 max-w-[180px]">
                                                    {/* Quick Notes preview or button */}
                                                    {lead.notes ? (
                                                        <button
                                                            onClick={() => {
                                                                setNotesModalLead(lead);
                                                                setNoteText(lead.notes || "");
                                                            }}
                                                            className="text-left group block"
                                                        >
                                                            <p className="text-[11px] text-[#524B44] line-clamp-2 leading-relaxed bg-[#FAF5EE] p-1.5 rounded-lg border border-[#EAE2D5] group-hover:border-[#B3203F] transition">
                                                                {lead.notes}
                                                            </p>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => {
                                                                setNotesModalLead(lead);
                                                                setNoteText("");
                                                            }}
                                                            className="inline-flex items-center gap-1 text-[11px] text-[#7A726B] hover:text-[#B3203F] transition cursor-pointer"
                                                        >
                                                            <FileText className="w-3 h-3" />
                                                            <span>+ Add Note</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="py-4 pr-5 pl-3 align-top text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => setSelectedLeadModal(lead)}
                                                        className="p-1.5 text-[#524B44] hover:text-[#161413] hover:bg-[#FAF5EE] rounded-lg transition"
                                                        title="View Full Lead Details"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setNotesModalLead(lead);
                                                            setNoteText(lead.notes || "");
                                                        }}
                                                        className="p-1.5 text-[#524B44] hover:text-[#B3203F] hover:bg-[#FAF5EE] rounded-lg transition"
                                                        title="Edit Internal Note"
                                                    >
                                                        <FileText className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteLead(lead.id)}
                                                        className="p-1.5 text-[#A39990] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                                        title="Delete Lead"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL 1: Connect Google Ads Setup Guide */}
            {setupModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#EAE2D5] overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSetupModalOpen(false)}
                            className="absolute top-5 right-5 p-2 text-[#7A726B] hover:text-[#161413] rounded-full hover:bg-[#FAF5EE] transition cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-2xl bg-[#4285F4]/10 border border-[#4285F4]/20 flex items-center justify-center text-[#4285F4]">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#161413]">
                                    Connect Google Ads Lead Form
                                </h3>
                                <p className="text-xs text-[#7A726B]">
                                    Follow these 4 simple steps to start receiving leads directly in this CRM.
                                </p>
                            </div>
                        </div>

                        {/* Copyable Webhook URL & Key Cards */}
                        <div className="space-y-3 mb-6">
                            <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5] space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7A726B] block">
                                    1. Webhook URL (Paste into Google Ads)
                                </label>
                                <div className="flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-[#EAE2D5]">
                                    <code className="text-xs font-mono text-[#161413] select-all truncate">
                                        {webhookUrl}
                                    </code>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigator.clipboard.writeText(webhookUrl);
                                            setCopiedUrl(true);
                                            setTimeout(() => setCopiedUrl(false), 2000);
                                        }}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#161413] text-white hover:bg-[#B3203F] text-xs font-medium transition cursor-pointer shrink-0"
                                    >
                                        {copiedUrl ? (
                                            <>
                                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3.5 h-3.5" />
                                                <span>Copy URL</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5] space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7A726B] block">
                                    2. Webhook Key / Key Token
                                </label>
                                <div className="flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-[#EAE2D5]">
                                    <code className="text-xs font-mono text-[#161413] select-all">
                                        {secretKey}
                                    </code>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigator.clipboard.writeText(secretKey);
                                            setCopiedKey(true);
                                            setTimeout(() => setCopiedKey(false), 2000);
                                        }}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#FAF5EE] hover:bg-[#EAE2D5] text-[#161413] text-xs font-medium border border-[#EAE2D5] transition cursor-pointer shrink-0"
                                    >
                                        {copiedKey ? (
                                            <>
                                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3.5 h-3.5" />
                                                <span>Copy Key</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Step by Step Visual Guide */}
                        <div className="space-y-3 mb-6">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#161413]">
                                Step-by-Step Instructions:
                            </h4>
                            <div className="space-y-2 text-xs text-[#524B44] leading-relaxed">
                                <div className="flex gap-2.5 p-2.5 rounded-xl bg-white border border-[#EAE2D5]">
                                    <span className="w-5 h-5 rounded-full bg-[#B3203F] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                        1
                                    </span>
                                    <span>
                                        Open <strong>Google Ads</strong> and navigate to <strong>Campaigns &gt; Assets &gt; Lead form</strong>.
                                    </span>
                                </div>
                                <div className="flex gap-2.5 p-2.5 rounded-xl bg-white border border-[#EAE2D5]">
                                    <span className="w-5 h-5 rounded-full bg-[#B3203F] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                        2
                                    </span>
                                    <span>
                                        Scroll down to the <strong>&ldquo;Lead delivery option&rdquo;</strong> section and select <strong>&ldquo;Manage your leads with a webhook&rdquo;</strong>.
                                    </span>
                                </div>
                                <div className="flex gap-2.5 p-2.5 rounded-xl bg-white border border-[#EAE2D5]">
                                    <span className="w-5 h-5 rounded-full bg-[#B3203F] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                        3
                                    </span>
                                    <span>
                                        Paste the <strong>Webhook URL</strong> and <strong>Key</strong> copied above.
                                    </span>
                                </div>
                                <div className="flex gap-2.5 p-2.5 rounded-xl bg-white border border-[#EAE2D5]">
                                    <span className="w-5 h-5 rounded-full bg-[#B3203F] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                        4
                                    </span>
                                    <span>
                                        Click <strong>&ldquo;Send test data&rdquo;</strong> in Google Ads. Google will display a green checkmark, confirming verification!
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAE2D5]">
                            <button
                                onClick={handleSimulateLead}
                                disabled={simulating}
                                className="px-4 py-2.5 rounded-2xl bg-[#B3203F] hover:bg-[#961732] text-white text-xs font-semibold shadow-xs transition"
                            >
                                <Sparkles className="w-3.5 h-3.5 inline mr-1 text-[#F5DB99]" />
                                {simulating ? "Simulating..." : "Test Simulation Now"}
                            </button>
                            <button
                                onClick={() => setSetupModalOpen(false)}
                                className="px-5 py-2.5 rounded-2xl bg-[#FAF5EE] text-[#161413] text-xs font-semibold hover:bg-[#EAE2D5] transition"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: Full Lead Detail Drawer / Modal */}
            {selectedLeadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#EAE2D5] overflow-hidden p-6 sm:p-7 max-h-[85vh] overflow-y-auto space-y-5">
                        <button
                            onClick={() => setSelectedLeadModal(null)}
                            className="absolute top-4 right-4 p-2 text-[#7A726B] hover:text-[#161413] rounded-full hover:bg-[#FAF5EE] transition cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4285F4] block mb-1">
                                Google Ads Lead Dossier
                            </span>
                            <h3 className="font-playfair text-2xl font-bold text-[#161413]">
                                {selectedLeadModal.name}
                            </h3>
                            <p className="text-xs text-[#7A726B]">
                                Lead ID: {selectedLeadModal.lead_id || selectedLeadModal.id}
                            </p>
                        </div>

                        {/* Quick Contact Buttons */}
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                            <a
                                href={`tel:${selectedLeadModal.phone}`}
                                className="flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#161413] text-white text-xs font-semibold hover:bg-[#B3203F] transition shadow-xs"
                            >
                                <Phone className="w-3.5 h-3.5 text-[#F5DB99]" />
                                <span>Call {selectedLeadModal.phone}</span>
                            </a>
                            <a
                                href={formatWhatsappUrl(
                                    selectedLeadModal.phone,
                                    selectedLeadModal.name
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition shadow-xs"
                            >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp Message</span>
                            </a>
                        </div>

                        {/* Details Table */}
                        <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5] space-y-2 text-xs">
                            <div className="flex justify-between py-1 border-b border-[#EAE2D5]">
                                <span className="text-[#7A726B]">Email:</span>
                                <span className="font-semibold text-[#161413]">
                                    {selectedLeadModal.email || "Not Provided"}
                                </span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[#EAE2D5]">
                                <span className="text-[#7A726B]">Service Interested:</span>
                                <span className="font-semibold text-[#161413]">
                                    {selectedLeadModal.service_interested || "General Salon"}
                                </span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[#EAE2D5]">
                                <span className="text-[#7A726B]">Preferred Branch:</span>
                                <span className="font-semibold text-[#161413]">
                                    {selectedLeadModal.preferred_branch || "Any Branch"}
                                </span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[#EAE2D5]">
                                <span className="text-[#7A726B]">City / Pincode:</span>
                                <span className="font-semibold text-[#161413]">
                                    {[selectedLeadModal.city, selectedLeadModal.postal_code]
                                        .filter(Boolean)
                                        .join(" - ") || "Not Provided"}
                                </span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[#EAE2D5]">
                                <span className="text-[#7A726B]">Campaign Name:</span>
                                <span className="font-semibold text-[#161413]">
                                    {selectedLeadModal.campaign_name || "N/A"}
                                </span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[#EAE2D5]">
                                <span className="text-[#7A726B]">Campaign ID:</span>
                                <span className="font-mono text-[#524B44]">
                                    {selectedLeadModal.campaign_id || "N/A"}
                                </span>
                            </div>
                            {selectedLeadModal.gcl_id && (
                                <div className="flex justify-between py-1 border-b border-[#EAE2D5]">
                                    <span className="text-[#7A726B]">Google Click ID (GCLID):</span>
                                    <span className="font-mono text-[10px] text-[#524B44] max-w-[200px] truncate">
                                        {selectedLeadModal.gcl_id}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between py-1">
                                <span className="text-[#7A726B]">Submission Time:</span>
                                <span className="text-[#524B44]">
                                    {new Date(selectedLeadModal.created_at).toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        {/* Internal Notes */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#7A726B] block">
                                Internal Staff Notes:
                            </label>
                            <p className="text-xs text-[#524B44] bg-[#FAF5EE] p-3 rounded-2xl border border-[#EAE2D5]">
                                {selectedLeadModal.notes || "No notes added yet."}
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setSelectedLeadModal(null)}
                                className="px-5 py-2.5 rounded-2xl bg-[#161413] text-white text-xs font-semibold hover:bg-[#B3203F] transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 3: Internal Notes Editor Modal */}
            {notesModalLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-md bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#EAE2D5] overflow-hidden p-6 sm:p-7 space-y-4">
                        <button
                            onClick={() => setNotesModalLead(null)}
                            className="absolute top-4 right-4 p-2 text-[#7A726B] hover:text-[#161413] rounded-full hover:bg-[#FAF5EE] transition cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B3203F] block mb-1">
                                Staff CRM Note
                            </span>
                            <h3 className="font-playfair text-xl font-bold text-[#161413]">
                                Notes for {notesModalLead.name}
                            </h3>
                        </div>

                        <textarea
                            rows={4}
                            placeholder="Add call records, client preferences, budget, scheduled consultation date, etc..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="w-full p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5] focus:border-[#B3203F] focus:bg-white text-xs sm:text-sm text-[#161413] placeholder-[#A39990] outline-none transition"
                        />

                        <div className="flex items-center justify-end gap-2.5 pt-2">
                            <button
                                type="button"
                                onClick={() => setNotesModalLead(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#7A726B] hover:text-[#161413]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveNotes}
                                disabled={updatingId !== null}
                                className="px-5 py-2.5 rounded-2xl bg-[#B3203F] hover:bg-[#961732] text-white text-xs font-semibold shadow-xs transition"
                            >
                                Save Note
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
