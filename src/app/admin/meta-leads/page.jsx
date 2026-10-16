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

// Standard status pipeline matching Bookings & Google Leads
export const META_LEAD_STATUS_PIPELINE = [
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

// Meta / Instagram / Facebook SVG Icons
function MetaIcon({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
    );
}

function InstagramBadgeIcon({ className = "w-3 h-3" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );
}

function FacebookBadgeIcon({ className = "w-3 h-3" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

export default function AdminMetaLeadsPage() {
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
        instagram_leads: 0,
        facebook_leads: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [platformFilter, setPlatformFilter] = useState("all"); // "all", "instagram", "facebook"
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
    const [copiedToken, setCopiedToken] = useState(false);
    const [copiedKey, setCopiedKey] = useState(false);
    const [webhookConfig, setWebhookConfig] = useState(null);
    const [customDomain, setCustomDomain] = useState("");
    const [isEditingDomain, setIsEditingDomain] = useState(false);
    const [useLocalUrl, setUseLocalUrl] = useState(false);

    // Fetch leads and stats
    const fetchLeads = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const params = new URLSearchParams();
            if (statusFilter !== "all") params.append("status", statusFilter);
            if (platformFilter !== "all") params.append("platform", platformFilter);
            if (searchQuery.trim()) params.append("search", searchQuery.trim());
            if (testFilter === "real") params.append("isTest", "0");
            if (testFilter === "test") params.append("isTest", "1");

            const res = await fetch(`/api/admin/meta-leads?${params.toString()}`);
            const data = await res.json();

            if (res.ok && data.success) {
                setLeads(data.leads || []);
                if (data.stats) setStats(data.stats);
            } else {
                setError(data.error || "Failed to load Meta leads.");
            }
        } catch (err) {
            setError(err.message || "Network error loading leads.");
        } finally {
            setLoading(false);
        }
    }, [statusFilter, platformFilter, searchQuery, testFilter]);

    // Fetch webhook config
    const fetchWebhookConfig = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/meta-leads/config");
            const data = await res.json();
            if (res.ok && data.success) {
                setWebhookConfig(data);
            }
        } catch {
            // Keep fallback
        }
    }, []);

    useEffect(() => {
        fetchLeads();
        fetchWebhookConfig();
    }, [fetchLeads, fetchWebhookConfig]);

    // Close status menu on outside click
    useEffect(() => {
        const handleClickOutside = () => setOpenStatusMenuId(null);
        if (openStatusMenuId) {
            window.addEventListener("click", handleClickOutside);
            return () => window.removeEventListener("click", handleClickOutside);
        }
    }, [openStatusMenuId]);

    // Update Lead Status
    const handleStatusChange = async (id, newStatus, e) => {
        if (e) e.stopPropagation();
        setOpenStatusMenuId(null);
        setUpdatingId(id);

        try {
            const res = await fetch(`/api/admin/meta-leads/${id}`, {
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
            alert(err.message || "Network error updating status.");
        } finally {
            setUpdatingId(null);
        }
    };

    // Save Notes
    const handleSaveNotes = async () => {
        if (!notesModalLead) return;
        setUpdatingId(notesModalLead.id);

        try {
            const res = await fetch(`/api/admin/meta-leads/${notesModalLead.id}`, {
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
                alert(data.error || "Failed to update notes.");
            }
        } catch (err) {
            alert(err.message || "Network error saving notes.");
        } finally {
            setUpdatingId(null);
        }
    };

    // Assign Lead
    const handleAssignLead = async (id, assignedTo, preferredBranch) => {
        setUpdatingId(id);
        try {
            const res = await fetch(`/api/admin/meta-leads/${id}`, {
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
                fetchLeads();
            } else {
                alert(data.error || "Failed to assign lead.");
            }
        } catch (err) {
            alert(err.message || "Network error assigning lead.");
        } finally {
            setUpdatingId(null);
        }
    };

    // Delete single lead
    const handleDeleteLead = async (id, e) => {
        if (e) e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this Meta lead?")) return;

        setUpdatingId(id);
        try {
            const res = await fetch(`/api/admin/meta-leads/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (res.ok && data.success) {
                setLeads((prev) => prev.filter((l) => l.id !== id));
                setSelectedIds((prev) => prev.filter((i) => i !== id));
                fetchLeads();
            } else {
                alert(data.error || "Failed to delete lead.");
            }
        } catch (err) {
            alert(err.message || "Network error deleting lead.");
        } finally {
            setUpdatingId(null);
        }
    };

    // Simulate Test Lead
    const handleSimulateLead = async (simulatedPlatform = "instagram") => {
        if (isBrowserOnLive) {
            alert("Test lead simulation is disabled on live production to preserve real lead data.");
            return;
        }
        try {
            setSimulating(true);
            const res = await fetch("/api/admin/meta-leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "simulate", platform: simulatedPlatform }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                fetchLeads();
                alert(`Test ${simulatedPlatform.toUpperCase()} lead generated and added successfully!`);
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
            const res = await fetch("/api/admin/meta-leads", {
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
            "Platform",
            "Date",
            "Name",
            "Phone",
            "Email",
            "Service",
            "Branch",
            "City",
            "Postal Code",
            "Campaign Name",
            "Ad Set",
            "Ad Name",
            "Form Name",
            "Status",
            "Is Test",
            "Notes",
        ];

        const rows = leads.map((l) => [
            l.lead_id || l.id,
            l.platform || "instagram",
            new Date(l.created_at).toLocaleString("en-IN"),
            `"${(l.name || "").replace(/"/g, '""')}"`,
            `"${l.phone || ""}"`,
            `"${l.email || ""}"`,
            `"${(l.service_interested || "").replace(/"/g, '""')}"`,
            `"${(l.preferred_branch || "").replace(/"/g, '""')}"`,
            `"${(l.city || "").replace(/"/g, '""')}"`,
            `"${l.postal_code || ""}"`,
            `"${(l.campaign_name || "").replace(/"/g, '""')}"`,
            `"${(l.adset_name || "").replace(/"/g, '""')}"`,
            `"${(l.ad_name || "").replace(/"/g, '""')}"`,
            `"${(l.form_name || "").replace(/"/g, '""')}"`,
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
            `meta_leads_${new Date().toISOString().slice(0, 10)}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Format WhatsApp URL
    const formatWhatsappUrl = (phone, name, platform) => {
        const digits = String(phone || "").replace(/\D/g, "");
        const clean = digits.startsWith("91") && digits.length > 10 ? digits : `91${digits.slice(-10)}`;
        const sourceName = (platform || "").toLowerCase().includes("face") ? "Facebook" : "Instagram";
        const message = `Hello ${name || "Client"}, thank you for connecting with KNK Salon Awadh via our ${sourceName} Ad! How can we assist you with your appointment or service inquiry today?`;
        return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
    };

    // Check if the current browser session is running on a live website
    const isBrowserOnLive =
        typeof window !== "undefined" &&
        window.location.hostname !== "localhost" &&
        window.location.hostname !== "127.0.0.1" &&
        !window.location.hostname.startsWith("192.168.");

    // Compute effective base origin
    let effectiveOrigin = "";
    if (customDomain.trim()) {
        effectiveOrigin = customDomain.trim().replace(/\/$/, "");
        if (!effectiveOrigin.startsWith("http://") && !effectiveOrigin.startsWith("https://")) {
            effectiveOrigin = `https://${effectiveOrigin}`;
        }
    } else if (isBrowserOnLive) {
        effectiveOrigin = window.location.origin;
    } else if (useLocalUrl) {
        effectiveOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    } else if (webhookConfig?.liveOrigin && !webhookConfig.liveOrigin.includes("localhost")) {
        effectiveOrigin = webhookConfig.liveOrigin;
    } else if (webhookConfig?.productionUrl && !webhookConfig.productionUrl.includes("localhost")) {
        effectiveOrigin = webhookConfig.productionUrl.replace("/api/webhooks/meta-leads", "");
    } else {
        effectiveOrigin = "https://knksalonawadh.com";
    }

    const webhookUrl = `${effectiveOrigin}/api/webhooks/meta-leads`;
    const verifyToken = webhookConfig?.verifyToken || "knk_meta_verify_2026";
    const secretKey = webhookConfig?.secretKey || "knk_meta_leads_2026";

    // Platform Badge component
    const renderPlatformBadge = (platform) => {
        const p = String(platform || "").toLowerCase();
        if (p.includes("face") || p === "fb") {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/20">
                    <FacebookBadgeIcon className="w-2.5 h-2.5 fill-[#1877F2]" />
                    Facebook
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#fcb045]/10 text-[#C13584] border border-[#E1306C]/30">
                <InstagramBadgeIcon className="w-2.5 h-2.5 stroke-[#C13584]" />
                Instagram
            </span>
        );
    };

    return (
        <div className="space-y-5 w-full pb-16 font-sans">
            {/* Top Banner / Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#EAE2D5] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-xs">
                            <InstagramBadgeIcon className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#161413]">
                            Meta Ads Leads CRM
                        </h1>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E1306C]/10 text-[#C13584] border border-[#E1306C]/20">
                            Instagram &amp; Facebook Ads
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#7A726B]">
                        Real-time lead capture from Meta Instant Forms, Instagram Reels &amp; Facebook Sponsored Ads.
                    </p>
                </div>

                {/* Header CTA Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    <button
                        onClick={() => setSetupModalOpen(true)}
                        className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border border-[#C13584] text-[#C13584] hover:bg-[#C13584]/5 text-xs font-semibold shadow-xs transition cursor-pointer"
                    >
                        <ShieldCheck className="w-4 h-4 text-[#C13584]" />
                        <span>Meta Webhook &amp; Token</span>
                    </button>

                    {/* Disable Send Test Lead on Live */}
                    {!isBrowserOnLive ? (
                        <div className="inline-flex rounded-xl sm:rounded-2xl overflow-hidden border border-[#B3203F] shadow-xs">
                            <button
                                onClick={() => handleSimulateLead("instagram")}
                                disabled={simulating}
                                className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-2.5 bg-[#B3203F] hover:bg-[#961732] text-white text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
                                title="Generate Instagram test lead"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-[#F5DB99]" />
                                <span>{simulating ? "..." : "+ Insta Lead"}</span>
                            </button>
                            <button
                                onClick={() => handleSimulateLead("facebook")}
                                disabled={simulating}
                                className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-2.5 bg-[#1877F2] hover:bg-[#1567d3] text-white text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
                                title="Generate Facebook test lead"
                            >
                                <span>+ FB Lead</span>
                            </button>
                        </div>
                    ) : (
                        <div
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 text-stone-400 text-xs font-medium border border-stone-200 cursor-not-allowed select-none"
                            title="Test lead generator is disabled in live production environment to protect real data"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-stone-300" />
                            <span>Test Leads (Disabled on Live)</span>
                        </div>
                    )}

                    <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border border-[#EAE2D5] text-[#524B44] hover:text-[#161413] hover:border-[#161413] text-xs font-medium transition cursor-pointer"
                        title="Export Leads to CSV"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Export</span>
                    </button>

                    <button
                        onClick={fetchLeads}
                        disabled={loading}
                        className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white border border-[#EAE2D5] text-[#524B44] hover:text-[#161413] transition disabled:opacity-50 cursor-pointer"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Pipeline KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
                {META_LEAD_STATUS_PIPELINE.map((pipeline) => {
                    const count = stats[pipeline.key] || 0;
                    const isSelected = statusFilter === pipeline.key;

                    return (
                        <button
                            key={pipeline.key}
                            onClick={() => setStatusFilter(isSelected ? "all" : pipeline.key)}
                            className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-[94px] sm:h-[100px] ${
                                isSelected
                                    ? "bg-white border-[#B3203F] shadow-sm ring-2 ring-[#B3203F]/10"
                                    : "bg-white border-[#EAE2D5] hover:border-[#B3203F]/40 hover:shadow-xs"
                            }`}
                        >
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-[11px] font-semibold text-[#7A726B] truncate">
                                    {pipeline.label}
                                </span>
                                <span className={`w-2 h-2 rounded-full shrink-0 ${pipeline.dotClass}`} />
                            </div>
                            <div className="flex items-baseline justify-between">
                                <span className="text-2xl sm:text-3xl font-bold font-playfair text-[#161413]">
                                    {count}
                                </span>
                                {pipeline.key === "pending" && count > 0 && (
                                    <span className="animate-pulse text-[9.5px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full">
                                        Action
                                    </span>
                                )}
                            </div>
                            <p className="text-[10px] text-[#A39990] truncate">{pipeline.desc}</p>
                        </button>
                    );
                })}
            </div>

            {/* Secondary Stats Strip: Total, Today, Instagram vs Facebook Breakdown */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5] text-xs text-[#524B44]">
                <div className="flex items-center gap-4 flex-wrap">
                    <div>
                        <strong className="text-[#161413]">Total Meta Leads:</strong> {stats.total || 0}
                    </div>
                    <div>
                        <strong className="text-[#161413]">Today&apos;s Inflow:</strong>{" "}
                        <span className="text-emerald-700 font-bold">+{stats.today_leads || 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E1306C]" />
                        <strong className="text-[#161413]">Instagram:</strong> {stats.instagram_leads || 0}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1877F2]" />
                        <strong className="text-[#161413]">Facebook:</strong> {stats.facebook_leads || 0}
                    </div>
                    {stats.test_leads > 0 && (
                        <div>
                            <strong className="text-[#161413]">Test Leads:</strong> {stats.test_leads}
                        </div>
                    )}
                </div>

                {/* Filters Strip */}
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Platform Toggle */}
                    <div className="flex items-center gap-1 bg-white border border-[#EAE2D5] rounded-xl p-0.5">
                        <button
                            onClick={() => setPlatformFilter("all")}
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                                platformFilter === "all" ? "bg-[#161413] text-white" : "text-[#7A726B] hover:text-[#161413]"
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setPlatformFilter("instagram")}
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                                platformFilter === "instagram" ? "bg-[#C13584] text-white" : "text-[#7A726B] hover:text-[#C13584]"
                            }`}
                        >
                            Instagram
                        </button>
                        <button
                            onClick={() => setPlatformFilter("facebook")}
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                                platformFilter === "facebook" ? "bg-[#1877F2] text-white" : "text-[#7A726B] hover:text-[#1877F2]"
                            }`}
                        >
                            Facebook
                        </button>
                    </div>

                    {/* Test Lead Filter */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setTestFilter("all")}
                            className={`px-2 py-0.5 rounded-xl text-[11px] font-semibold transition ${
                                testFilter === "all"
                                    ? "bg-white text-[#161413] shadow-xs border border-[#EAE2D5]"
                                    : "text-[#7A726B] hover:text-[#161413]"
                            }`}
                        >
                            All Leads
                        </button>
                        <button
                            onClick={() => setTestFilter("real")}
                            className={`px-2 py-0.5 rounded-xl text-[11px] font-semibold transition ${
                                testFilter === "real"
                                    ? "bg-white text-[#161413] shadow-xs border border-[#EAE2D5]"
                                    : "text-[#7A726B] hover:text-[#161413]"
                            }`}
                        >
                            Real Ads
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter, Search & Status Pipeline Bar */}
            <div className="bg-white border border-[#EAE2D5] rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-[#A39990] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by client name, phone, email, city, campaign, ad or form..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-[#EAE2D5] text-xs sm:text-sm text-[#161413] placeholder-[#A39990] focus:outline-none focus:border-[#B3203F] focus:ring-1 focus:ring-[#B3203F] transition bg-[#FAF5EE]/30"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A39990] hover:text-[#161413]"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    <div className="text-xs text-[#7A726B] self-end sm:self-center shrink-0">
                        Showing <strong className="text-[#161413]">{leads.length}</strong> leads
                    </div>
                </div>
            </div>

            {/* Bulk Actions Banner (appears when rows selected) */}
            {selectedIds.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#161413] text-white shadow-md animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 text-xs font-medium">
                        <CheckSquare className="w-4 h-4 text-[#F5DB99]" />
                        <span>
                            {selectedIds.length} lead{selectedIds.length > 1 ? "s" : ""} selected
                        </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] text-[#A39990]">Mark as:</span>
                        {META_LEAD_STATUS_PIPELINE.map((p) => (
                            <button
                                key={p.key}
                                onClick={() => handleBulkAction("update_status", p.key)}
                                className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white/10 hover:bg-white/20 transition cursor-pointer"
                            >
                                {p.label}
                            </button>
                        ))}
                        <button
                            onClick={() => handleBulkAction("delete")}
                            className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition cursor-pointer ml-2"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setSelectedIds([])}
                            className="text-[11px] text-[#A39990] hover:text-white transition ml-1"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Leads Table Container */}
            <div className="bg-white border border-[#EAE2D5] rounded-2xl sm:rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
                {loading ? (
                    <div className="py-20 text-center space-y-3">
                        <RefreshCw className="w-6 h-6 animate-spin text-[#B3203F] mx-auto" />
                        <p className="text-xs text-[#7A726B]">Loading Meta leads...</p>
                    </div>
                ) : error ? (
                    <div className="py-16 text-center space-y-3 px-4">
                        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                        <p className="text-sm font-semibold text-rose-700">{error}</p>
                        <button
                            onClick={fetchLeads}
                            className="px-4 py-2 rounded-xl bg-[#B3203F] text-white text-xs font-semibold"
                        >
                            Try Again
                        </button>
                    </div>
                ) : leads.length === 0 ? (
                    <div className="py-20 text-center space-y-3 px-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white mx-auto shadow-xs">
                            <InstagramBadgeIcon className="w-6 h-6" />
                        </div>
                        <h3 className="font-playfair text-lg font-bold text-[#161413]">
                            No Meta leads found
                        </h3>
                        <p className="text-xs text-[#7A726B] max-w-md mx-auto">
                            {searchQuery || statusFilter !== "all" || platformFilter !== "all"
                                ? "Try resetting your search query or status/platform filters to view other leads."
                                : "Your Meta webhook endpoint is live. When clients submit your Instagram or Facebook Lead Forms, they will appear here instantly."}
                        </p>
                        {!isBrowserOnLive && (
                            <button
                                onClick={() => handleSimulateLead("instagram")}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B3203F] text-white text-xs font-semibold hover:bg-[#961732] transition cursor-pointer"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-[#F5DB99]" />
                                <span>Simulate Sample Lead</span>
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#EAE2D5] bg-[#FAF5EE]/60 text-[11px] font-bold text-[#7A726B] uppercase tracking-wider">
                                    <th className="py-3.5 pl-4 sm:pl-6 pr-2 w-10">
                                        <button
                                            onClick={() => {
                                                if (selectedIds.length === leads.length) {
                                                    setSelectedIds([]);
                                                } else {
                                                    setSelectedIds(leads.map((l) => l.id));
                                                }
                                            }}
                                            className="text-[#7A726B] hover:text-[#161413]"
                                        >
                                            {selectedIds.length === leads.length && leads.length > 0 ? (
                                                <CheckSquare className="w-4 h-4 text-[#B3203F]" />
                                            ) : (
                                                <Square className="w-4 h-4" />
                                            )}
                                        </button>
                                    </th>
                                    <th className="py-3.5 px-3">Lead / Client</th>
                                    <th className="py-3.5 px-3">Source &amp; Campaign</th>
                                    <th className="py-3.5 px-3">Service &amp; Branch</th>
                                    <th className="py-3.5 px-3">Status</th>
                                    <th className="py-3.5 px-3">Notes</th>
                                    <th className="py-3.5 px-3">Received</th>
                                    <th className="py-3.5 pr-4 sm:pr-6 pl-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EAE2D5]/70 text-xs text-[#524B44]">
                                {leads.map((lead) => {
                                    const isSelected = selectedIds.includes(lead.id);
                                    const statusObj =
                                        META_LEAD_STATUS_PIPELINE.find((p) => p.key === lead.status) ||
                                        META_LEAD_STATUS_PIPELINE[0];

                                    return (
                                        <tr
                                            key={lead.id}
                                            className={`hover:bg-[#FAF5EE]/40 transition-colors ${
                                                isSelected ? "bg-[#FAF5EE]" : ""
                                            }`}
                                        >
                                            {/* Select Checkbox */}
                                            <td className="py-3.5 pl-4 sm:pl-6 pr-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedIds((prev) =>
                                                            prev.includes(lead.id)
                                                                ? prev.filter((i) => i !== lead.id)
                                                                : [...prev, lead.id]
                                                        );
                                                    }}
                                                    className="text-[#7A726B] hover:text-[#161413]"
                                                >
                                                    {isSelected ? (
                                                        <CheckSquare className="w-4 h-4 text-[#B3203F]" />
                                                    ) : (
                                                        <Square className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </td>

                                            {/* Client Info */}
                                            <td className="py-3.5 px-3">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-sm text-[#161413]">
                                                            {lead.name}
                                                        </span>
                                                        {lead.is_test ? (
                                                            <span className="text-[9.5px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                                                                Test
                                                            </span>
                                                        ) : null}
                                                    </div>

                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <a
                                                            href={`tel:${lead.phone}`}
                                                            className="inline-flex items-center gap-1 font-semibold text-[#161413] hover:text-[#B3203F]"
                                                        >
                                                            <Phone className="w-3 h-3 text-[#A39990]" />
                                                            <span>{lead.phone}</span>
                                                        </a>

                                                        {/* Quick WhatsApp Link */}
                                                        {lead.phone && (
                                                            <a
                                                                href={formatWhatsappUrl(lead.phone, lead.name, lead.platform)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-semibold border border-emerald-200 transition"
                                                                title="Open WhatsApp chat"
                                                            >
                                                                <MessageCircle className="w-3 h-3" />
                                                                <span>WhatsApp</span>
                                                            </a>
                                                        )}
                                                    </div>

                                                    {lead.email && (
                                                        <div className="flex items-center gap-1 text-[11px] text-[#7A726B]">
                                                            <Mail className="w-3 h-3 text-[#A39990]" />
                                                            <span className="truncate max-w-[200px]">{lead.email}</span>
                                                        </div>
                                                    )}

                                                    {lead.city && (
                                                        <div className="flex items-center gap-1 text-[11px] text-[#A39990]">
                                                            <MapPin className="w-3 h-3" />
                                                            <span>{lead.city}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Source & Campaign */}
                                            <td className="py-3.5 px-3">
                                                <div className="space-y-1 max-w-[240px]">
                                                    <div>{renderPlatformBadge(lead.platform)}</div>
                                                    {lead.campaign_name ? (
                                                        <div
                                                            className="text-xs font-semibold text-[#161413] truncate"
                                                            title={lead.campaign_name}
                                                        >
                                                            {lead.campaign_name}
                                                        </div>
                                                    ) : (
                                                        <div className="text-xs text-[#A39990] italic">
                                                            Direct Ad / Reel
                                                        </div>
                                                    )}
                                                    {lead.form_name && (
                                                        <div
                                                            className="text-[11px] text-[#7A726B] truncate"
                                                            title={lead.form_name}
                                                        >
                                                            Form: {lead.form_name}
                                                        </div>
                                                    )}
                                                    {lead.ad_name && (
                                                        <div
                                                            className="text-[10px] text-[#A39990] truncate"
                                                            title={lead.ad_name}
                                                        >
                                                            Ad: {lead.ad_name}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Service & Branch */}
                                            <td className="py-3.5 px-3">
                                                <div className="space-y-1 max-w-[200px]">
                                                    <div className="font-semibold text-xs text-[#161413] truncate">
                                                        {lead.service_interested || "General Salon Inquiry"}
                                                    </div>
                                                    <div className="text-[11px] text-[#7A726B] truncate">
                                                        {lead.preferred_branch || "KNK Salon Lucknow"}
                                                    </div>
                                                    {lead.assigned_to && (
                                                        <div className="inline-flex items-center gap-1 text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                                                            <UserCheck className="w-2.5 h-2.5" />
                                                            <span>{lead.assigned_to}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Status with quick pipeline dropdown */}
                                            <td className="py-3.5 px-3 relative">
                                                <div className="relative inline-block text-left">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenStatusMenuId(
                                                                openStatusMenuId === lead.id ? null : lead.id
                                                            );
                                                        }}
                                                        disabled={updatingId === lead.id}
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                                                            statusObj.badgeClass
                                                        } ${updatingId === lead.id ? "opacity-50" : ""}`}
                                                    >
                                                        <span className={`w-1.5 h-1.5 rounded-full ${statusObj.dotClass}`} />
                                                        <span>{statusObj.label}</span>
                                                        <ChevronDown className="w-3 h-3 opacity-60" />
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    {openStatusMenuId === lead.id && (
                                                        <div
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="absolute left-0 mt-1.5 w-44 rounded-2xl bg-white border border-[#EAE2D5] shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95"
                                                        >
                                                            <div className="px-3 py-1 text-[10px] font-bold text-[#A39990] uppercase tracking-wider">
                                                                Change Status
                                                            </div>
                                                            {META_LEAD_STATUS_PIPELINE.map((p) => (
                                                                <button
                                                                    key={p.key}
                                                                    onClick={(e) => handleStatusChange(lead.id, p.key, e)}
                                                                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-[#FAF5EE] transition cursor-pointer ${
                                                                        lead.status === p.key
                                                                            ? "font-bold text-[#B3203F]"
                                                                            : "text-[#524B44]"
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <span className={`w-2 h-2 rounded-full ${p.dotClass}`} />
                                                                        <span>{p.label}</span>
                                                                    </div>
                                                                    {lead.status === p.key && <Check className="w-3.5 h-3.5" />}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Notes Preview / Edit */}
                                            <td className="py-3.5 px-3">
                                                <button
                                                    onClick={() => {
                                                        setNotesModalLead(lead);
                                                        setNoteText(lead.notes || "");
                                                    }}
                                                    className="group flex items-start gap-1.5 text-left max-w-[160px] cursor-pointer"
                                                    title="Click to view or edit staff notes"
                                                >
                                                    <FileText className="w-3.5 h-3.5 text-[#A39990] shrink-0 mt-0.5 group-hover:text-[#B3203F]" />
                                                    <span className="text-[11px] text-[#7A726B] line-clamp-2 group-hover:text-[#161413]">
                                                        {lead.notes ? lead.notes : <span className="italic text-[#A39990]">Add note...</span>}
                                                    </span>
                                                </button>
                                            </td>

                                            {/* Received Date / Time */}
                                            <td className="py-3.5 px-3">
                                                <div className="space-y-0.5 text-[11px] text-[#7A726B] whitespace-nowrap">
                                                    <div className="font-medium text-[#161413]">
                                                        {new Date(lead.created_at).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </div>
                                                    <div className="text-[10px] text-[#A39990]">
                                                        {new Date(lead.created_at).toLocaleTimeString("en-IN", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Action buttons */}
                                            <td className="py-3.5 pr-4 sm:pr-6 pl-2 text-right">
                                                <div className="inline-flex items-center gap-1">
                                                    <button
                                                        onClick={() => setSelectedLeadModal(lead)}
                                                        className="p-1.5 rounded-xl hover:bg-[#FAF5EE] text-[#524B44] hover:text-[#161413] transition cursor-pointer"
                                                        title="View full lead details & payload"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleDeleteLead(lead.id, e)}
                                                        disabled={updatingId === lead.id}
                                                        className="p-1.5 rounded-xl hover:bg-rose-50 text-[#A39990] hover:text-rose-600 transition cursor-pointer disabled:opacity-50"
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

            {/* Modal: Setup & Webhook Guide */}
            {setupModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#EAE2D5] shadow-2xl p-6 sm:p-7 space-y-6">
                        <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-4">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white">
                                    <InstagramBadgeIcon className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-playfair text-xl font-bold text-[#161413]">
                                        Meta Leads Webhook Integration
                                    </h3>
                                    <p className="text-xs text-[#7A726B]">
                                        Capture Instagram &amp; Facebook leads automatically into your admin CRM.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSetupModalOpen(false)}
                                className="p-2 rounded-xl hover:bg-[#FAF5EE] text-[#7A726B] hover:text-[#161413]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Domain Customization if on local dev */}
                        {!isBrowserOnLive && (
                            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                                <div className="font-semibold flex items-center gap-1.5">
                                    <Globe className="w-3.5 h-3.5 text-amber-700" />
                                    <span>Production Domain Configuration:</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="https://knksalonawadh.com"
                                        value={customDomain}
                                        onChange={(e) => setCustomDomain(e.target.value)}
                                        className="flex-1 px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs text-[#161413]"
                                    />
                                    {customDomain && (
                                        <button
                                            onClick={() => setCustomDomain("")}
                                            className="text-xs text-amber-800 underline"
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Webhook URL Copy Box */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#161413] uppercase tracking-wider">
                                1. Webhook Callback URL
                            </label>
                            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5]">
                                <code className="flex-1 text-xs text-[#161413] font-mono break-all select-all">
                                    {webhookUrl}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(webhookUrl);
                                        setCopiedUrl(true);
                                        setTimeout(() => setCopiedUrl(false), 2000);
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE2D5] text-xs font-semibold text-[#161413] hover:border-[#B3203F] transition shrink-0 cursor-pointer"
                                >
                                    {copiedUrl ? (
                                        <span className="flex items-center gap-1 text-emerald-600">
                                            <Check className="w-3.5 h-3.5" /> Copied
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <Copy className="w-3.5 h-3.5" /> Copy
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Meta Verify Token Copy Box */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#161413] uppercase tracking-wider">
                                2. Meta Verify Token (hub.verify_token)
                            </label>
                            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5]">
                                <code className="flex-1 text-xs text-[#161413] font-mono select-all">
                                    {verifyToken}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(verifyToken);
                                        setCopiedToken(true);
                                        setTimeout(() => setCopiedToken(false), 2000);
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE2D5] text-xs font-semibold text-[#161413] hover:border-[#B3203F] transition shrink-0 cursor-pointer"
                                >
                                    {copiedToken ? (
                                        <span className="flex items-center gap-1 text-emerald-600">
                                            <Check className="w-3.5 h-3.5" /> Copied
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <Copy className="w-3.5 h-3.5" /> Copy
                                        </span>
                                    )}
                                </button>
                            </div>
                            <p className="text-[11px] text-[#7A726B]">
                                Enter this exact verify token in Meta for Developers when subscribing to your webhook.
                            </p>
                        </div>

                        {/* Secret Key for Zapier / Make / Pabbly */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#161413] uppercase tracking-wider">
                                3. Secret Key (For Zapier / Make / Pabbly Connect)
                            </label>
                            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#FAF5EE] border border-[#EAE2D5]">
                                <code className="flex-1 text-xs text-[#161413] font-mono select-all">
                                    {secretKey}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(secretKey);
                                        setCopiedKey(true);
                                        setTimeout(() => setCopiedKey(false), 2000);
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE2D5] text-xs font-semibold text-[#161413] hover:border-[#B3203F] transition shrink-0 cursor-pointer"
                                >
                                    {copiedKey ? (
                                        <span className="flex items-center gap-1 text-emerald-600">
                                            <Check className="w-3.5 h-3.5" /> Copied
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <Copy className="w-3.5 h-3.5" /> Copy
                                        </span>
                                    )}
                                </button>
                            </div>
                            <p className="text-[11px] text-[#7A726B]">
                                Use as query parameter: <code className="font-mono">{webhookUrl}?key={secretKey}</code>
                            </p>
                        </div>

                        {/* Step-by-Step Instructions */}
                        <div className="space-y-3 pt-2">
                            <h4 className="font-bold text-sm text-[#161413]">Integration Options</h4>

                            {/* Option 1: Meta App */}
                            <div className="p-4 rounded-2xl bg-[#FAF5EE]/70 border border-[#EAE2D5] space-y-2 text-xs">
                                <strong className="text-[#161413] block font-bold">
                                    Option A: Direct Meta App (Facebook &amp; Instagram Webhooks)
                                </strong>
                                <ol className="list-decimal list-inside space-y-1 text-[#524B44]">
                                    <li>Open developers.facebook.com and go to your Meta App.</li>
                                    <li>Add product <strong>Webhooks</strong> &gt; Select <strong>Page</strong> topic.</li>
                                    <li>Click <strong>Subscribe to this object</strong>.</li>
                                    <li>Paste Callback URL: <span className="font-mono font-bold text-[#161413]">{webhookUrl}</span></li>
                                    <li>Paste Verify Token: <span className="font-mono font-bold text-[#161413]">{verifyToken}</span></li>
                                    <li>Click <strong>Verify and Save</strong>.</li>
                                    <li>Subscribe to the <strong className="text-[#161413]">leadgen</strong> event field.</li>
                                </ol>
                            </div>

                            {/* Option 2: Zapier / Make / Pabbly */}
                            <div className="p-4 rounded-2xl bg-[#FAF5EE]/70 border border-[#EAE2D5] space-y-2 text-xs">
                                <strong className="text-[#161413] block font-bold">
                                    Option B: Zero-Code Instant Automation (Zapier, Make.com, or Pabbly Connect)
                                </strong>
                                <ol className="list-decimal list-inside space-y-1 text-[#524B44]">
                                    <li>Create a Trigger: <strong>Facebook Lead Ads</strong> &gt; <strong>New Lead</strong>.</li>
                                    <li>Select your Page &amp; Lead Ad Form.</li>
                                    <li>Add Action: <strong>Webhooks</strong> &gt; <strong>POST</strong>.</li>
                                    <li>Enter URL: <span className="font-mono font-bold text-[#161413]">{webhookUrl}?key={secretKey}</span></li>
                                    <li>Map fields: name, phone, email, city, service, campaign_name, platform.</li>
                                    <li>Test and publish the scenario!</li>
                                </ol>
                            </div>
                        </div>

                        <div className="text-right pt-2">
                            <button
                                onClick={() => setSetupModalOpen(false)}
                                className="px-5 py-2.5 rounded-2xl bg-[#161413] text-white text-xs font-semibold hover:bg-black transition cursor-pointer"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Lead Details Viewer */}
            {selectedLeadModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#EAE2D5] shadow-2xl p-6 sm:p-7 space-y-6">
                        <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-playfair text-xl font-bold text-[#161413]">
                                        {selectedLeadModal.name}
                                    </h3>
                                    {renderPlatformBadge(selectedLeadModal.platform)}
                                    {selectedLeadModal.is_test ? (
                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                                            Test Lead
                                        </span>
                                    ) : null}
                                </div>
                                <p className="text-xs text-[#7A726B]">
                                    Lead ID: #{selectedLeadModal.lead_id || selectedLeadModal.id} &bull; Received on{" "}
                                    {new Date(selectedLeadModal.created_at).toLocaleString("en-IN")}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedLeadModal(null)}
                                className="p-2 rounded-xl hover:bg-[#FAF5EE] text-[#7A726B] hover:text-[#161413]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Quick Contact & Action Buttons */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <a
                                href={`tel:${selectedLeadModal.phone}`}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#161413] text-white text-xs font-semibold hover:bg-black transition"
                            >
                                <Phone className="w-3.5 h-3.5" /> Call {selectedLeadModal.phone}
                            </a>
                            {selectedLeadModal.phone && (
                                <a
                                    href={formatWhatsappUrl(
                                        selectedLeadModal.phone,
                                        selectedLeadModal.name,
                                        selectedLeadModal.platform
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
                                >
                                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Client
                                </a>
                            )}
                            {selectedLeadModal.email && (
                                <a
                                    href={`mailto:${selectedLeadModal.email}`}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#EAE2D5] text-[#161413] text-xs font-semibold hover:bg-[#FAF5EE] transition"
                                >
                                    <Mail className="w-3.5 h-3.5" /> Email
                                </a>
                            )}
                        </div>

                        {/* Customer & Inquiry Breakdown Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="p-4 rounded-2xl bg-[#FAF5EE]/60 border border-[#EAE2D5] space-y-2">
                                <span className="font-bold text-[#161413] uppercase tracking-wider text-[10px]">
                                    Client Information
                                </span>
                                <div>
                                    <span className="text-[#7A726B]">Full Name:</span>{" "}
                                    <strong className="text-[#161413]">{selectedLeadModal.name}</strong>
                                </div>
                                <div>
                                    <span className="text-[#7A726B]">Phone:</span>{" "}
                                    <strong className="text-[#161413]">{selectedLeadModal.phone}</strong>
                                </div>
                                <div>
                                    <span className="text-[#7A726B]">Email:</span>{" "}
                                    <span className="text-[#161413]">{selectedLeadModal.email || "Not provided"}</span>
                                </div>
                                <div>
                                    <span className="text-[#7A726B]">City:</span>{" "}
                                    <span className="text-[#161413]">{selectedLeadModal.city || "Not provided"}</span>
                                </div>
                                <div>
                                    <span className="text-[#7A726B]">Postal Code:</span>{" "}
                                    <span className="text-[#161413]">{selectedLeadModal.postal_code || "N/A"}</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#FAF5EE]/60 border border-[#EAE2D5] space-y-2">
                                <span className="font-bold text-[#161413] uppercase tracking-wider text-[10px]">
                                    Ad Campaign &amp; Form
                                </span>
                                <div>
                                    <span className="text-[#7A726B]">Platform:</span>{" "}
                                    <strong className="text-[#161413] capitalize">{selectedLeadModal.platform}</strong>
                                </div>
                                <div>
                                    <span className="text-[#7A726B]">Campaign Name:</span>{" "}
                                    <strong className="text-[#161413]">{selectedLeadModal.campaign_name || "N/A"}</strong>
                                </div>
                                <div>
                                    <span className="text-[#7A726B]">Ad Set Name:</span>{" "}
                                    <span className="text-[#161413]">{selectedLeadModal.adset_name || "N/A"}</span>
                                </div>
                                <div>
                                    <span className="text-[#7A726B]">Ad Name:</span>{" "}
                                    <span className="text-[#161413]">{selectedLeadModal.ad_name || "N/A"}</span>
                                </div>
                                <div>
                                    <span className="text-[#7A726B]">Lead Form Name:</span>{" "}
                                    <span className="text-[#161413]">{selectedLeadModal.form_name || selectedLeadModal.form_id || "N/A"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Service & Assignment */}
                        <div className="p-4 rounded-2xl bg-[#FAF5EE]/60 border border-[#EAE2D5] space-y-3 text-xs">
                            <span className="font-bold text-[#161413] uppercase tracking-wider text-[10px]">
                                Requirement &amp; Salon Allocation
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <span className="text-[#7A726B]">Service Interested:</span>{" "}
                                    <strong className="text-[#161413] block">
                                        {selectedLeadModal.service_interested || "General Inquiry"}
                                    </strong>
                                </div>
                                <div>
                                    <span className="text-[#7A726B]">Preferred Branch:</span>{" "}
                                    <strong className="text-[#161413] block">
                                        {selectedLeadModal.preferred_branch || "KNK Salon Lucknow"}
                                    </strong>
                                </div>
                            </div>

                            {/* Branch / Staff Assignment Dropdown */}
                            <div className="pt-2 border-t border-[#EAE2D5] flex items-center gap-2 flex-wrap">
                                <span className="text-[11px] font-semibold text-[#161413]">Assign to Branch:</span>
                                {BRANCH_OPTIONS.map((branch) => (
                                    <button
                                        key={branch}
                                        onClick={() => {
                                            handleAssignLead(selectedLeadModal.id, branch, branch);
                                            setSelectedLeadModal((prev) => ({
                                                ...prev,
                                                assigned_to: branch,
                                                preferred_branch: branch,
                                            }));
                                        }}
                                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
                                            selectedLeadModal.assigned_to === branch
                                                ? "bg-indigo-600 text-white"
                                                : "bg-white border border-[#EAE2D5] text-[#524B44] hover:border-indigo-600"
                                        }`}
                                    >
                                        {branch}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Form Fields if any */}
                        {selectedLeadModal.custom_fields && (
                            <div className="p-4 rounded-2xl bg-[#FAF5EE]/60 border border-[#EAE2D5] space-y-2 text-xs">
                                <span className="font-bold text-[#161413] uppercase tracking-wider text-[10px]">
                                    Additional Form Questions &amp; Answers
                                </span>
                                <div className="space-y-1.5">
                                    {Object.entries(
                                        typeof selectedLeadModal.custom_fields === "string"
                                            ? JSON.parse(selectedLeadModal.custom_fields || "{}")
                                            : selectedLeadModal.custom_fields
                                    ).map(([k, v]) => (
                                        <div key={k} className="flex items-start justify-between gap-2 border-b border-[#EAE2D5]/50 pb-1">
                                            <span className="text-[#7A726B]">{k}:</span>
                                            <strong className="text-[#161413] text-right">{String(v)}</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Raw JSON Payload */}
                        <div className="space-y-1.5">
                            <span className="font-bold text-[#161413] uppercase tracking-wider text-[10px]">
                                Raw Webhook Payload
                            </span>
                            <pre className="p-3 rounded-2xl bg-[#161413] text-[#F5DB99] text-[10.5px] font-mono overflow-x-auto max-h-48">
                                {JSON.stringify(
                                    typeof selectedLeadModal.raw_payload === "string"
                                        ? JSON.parse(selectedLeadModal.raw_payload || "{}")
                                        : selectedLeadModal.raw_payload || {},
                                    null,
                                    2
                                )}
                            </pre>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <button
                                onClick={() => {
                                    handleDeleteLead(selectedLeadModal.id);
                                    setSelectedLeadModal(null);
                                }}
                                className="px-4 py-2 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                            >
                                Delete Lead
                            </button>
                            <button
                                onClick={() => setSelectedLeadModal(null)}
                                className="px-5 py-2.5 rounded-2xl bg-[#161413] text-white text-xs font-semibold hover:bg-black transition cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Internal Staff Notes */}
            {notesModalLead && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
                    <div className="bg-white rounded-3xl max-w-lg w-full border border-[#EAE2D5] shadow-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-3">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#B3203F]" />
                                <h3 className="font-playfair text-lg font-bold text-[#161413]">
                                    Staff Notes: {notesModalLead.name}
                                </h3>
                            </div>
                            <button
                                onClick={() => setNotesModalLead(null)}
                                className="p-1.5 rounded-xl hover:bg-[#FAF5EE] text-[#7A726B] hover:text-[#161413]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <textarea
                            rows={5}
                            placeholder="Add client preferences, appointment confirmation notes, service discussed, or follow-up status..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="w-full p-3.5 rounded-2xl border border-[#EAE2D5] text-xs sm:text-sm text-[#161413] placeholder-[#A39990] focus:outline-none focus:border-[#B3203F] focus:ring-1 focus:ring-[#B3203F] transition bg-[#FAF5EE]/30"
                        />

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setNotesModalLead(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#7A726B] hover:text-[#161413] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveNotes}
                                disabled={updatingId === notesModalLead.id}
                                className="px-5 py-2.5 rounded-2xl bg-[#B3203F] text-white text-xs font-semibold hover:bg-[#961732] transition disabled:opacity-50 cursor-pointer"
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
