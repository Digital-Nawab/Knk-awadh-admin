"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
    Plus,
    Trash2,
    Edit3,
    Eye,
    UploadCloud,
    CheckCircle2,
    AlertCircle,
    X,
    Search,
    MapPin,
    ArrowUpRight,
    Image as ImageIcon,
    RefreshCw,
    SlidersHorizontal,
    Layers
} from "lucide-react";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
const MAX_FILE_SIZE_KB = 500;

const BRANCH_CONFIG = {
    gomtinagar: {
        id: "gomtinagar",
        name: "KNK Gomti Nagar",
        title: "Modern Luxury & Spa Wellness",
        address: "02/01 Vipul Khand, Gomti Nagar, Lucknow",
        phone: "+91 88810 00551",
        badge: "Contemporary Haven",
        accent: "border-amber-500/30 bg-amber-500/5",
        pill: "bg-amber-100 text-amber-900 border-amber-300",
    },
    hazratganj: {
        id: "hazratganj",
        name: "KNK Hazratganj",
        title: "Awadh Flagship & Royal Suites",
        address: "Ground Floor 11B, Tilak Marg, Dalibagh Colony, Hazratganj, Lucknow",
        phone: "+91 88810 00529",
        badge: "Flagship Sanctuary",
        accent: "border-rose-500/30 bg-rose-500/5",
        pill: "bg-rose-100 text-rose-900 border-rose-300",
    }
};

export default function InteriorIndex() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Active branch tab: 'all' | 'gomtinagar' | 'hazratganj'
    const [activeBranchTab, setActiveBranchTab] = useState("all");
    const [activeStatusFilter, setActiveStatusFilter] = useState("all"); // 'all' | 'active' | 'inactive'
    const [searchQuery, setSearchQuery] = useState("");

    // Upload modal state
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadBranch, setUploadBranch] = useState("gomtinagar");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadAltText, setUploadAltText] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Edit modal state
    const [editItem, setEditItem] = useState(null);
    const [editBranch, setEditBranch] = useState("gomtinagar");
    const [editAltText, setEditAltText] = useState("");
    const [editOrder, setEditOrder] = useState(1);
    const [editActive, setEditActive] = useState(true);
    const [savingEdit, setSavingEdit] = useState(false);

    // Delete confirmation state
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // Status toggling state
    const [togglingId, setTogglingId] = useState(null);

    // Lightbox / Image preview modal
    const [previewItem, setPreviewItem] = useState(null);

    // Toast auto dismiss
    useEffect(() => {
        if (!successMessage) return;
        const timer = setTimeout(() => setSuccessMessage(""), 4000);
        return () => clearTimeout(timer);
    }, [successMessage]);

    // Load items from API
    const loadInterior = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/interior");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load interior images.");
            setItems(data.interior || []);
        } catch (err) {
            setError(err.message || "Failed to load interior gallery. Please refresh.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadInterior();
    }, [loadInterior]);

    // Handle files selection
    const handleFilesAdded = (fileList) => {
        if (!fileList || fileList.length === 0) return;
        setUploadError("");

        const newFiles = [];
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (!IMAGE_TYPES.includes(file.type)) {
                setUploadError(`"${file.name}" is not a supported image (JPG, PNG, WEBP, AVIF).`);
                continue;
            }
            if (file.size > MAX_FILE_SIZE_KB * 1024) {
                setUploadError(`"${file.name}" exceeds the ${MAX_FILE_SIZE_KB}KB limit (${(file.size / 1024).toFixed(0)}KB). Please upload an image under 500KB.`);
                continue;
            }
            newFiles.push({
                file,
                id: `${file.name}-${Date.now()}-${Math.random()}`,
                name: file.name,
                size: (file.size / 1024).toFixed(0) + " KB",
                previewUrl: URL.createObjectURL(file),
            });
        }

        setSelectedFiles((prev) => [...prev, ...newFiles]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            handleFilesAdded(e.dataTransfer.files);
        }
    };

    const handleRemoveSelectedFile = (id) => {
        setSelectedFiles((prev) => {
            const fileObj = prev.find((f) => f.id === id);
            if (fileObj?.previewUrl) URL.revokeObjectURL(fileObj.previewUrl);
            return prev.filter((f) => f.id !== id);
        });
    };

    const openUploadModalFor = (branch = "gomtinagar") => {
        setUploadBranch(branch === "all" ? "gomtinagar" : branch);
        setSelectedFiles([]);
        setUploadAltText("");
        setUploadError("");
        setShowUploadModal(true);
    };

    // Upload submit
    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        if (selectedFiles.length === 0) {
            setUploadError("Please select at least one photo to upload.");
            return;
        }

        setUploading(true);
        setUploadError("");

        try {
            const fd = new FormData();
            fd.append("branch", uploadBranch);
            selectedFiles.forEach((item) => {
                fd.append("images", item.file);
            });
            if (uploadAltText.trim()) {
                fd.append("altText", uploadAltText.trim());
                fd.append("title", uploadAltText.trim());
            }

            const res = await fetch("/api/interior", {
                method: "POST",
                body: fd,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to upload images.");

            // Revoke object URLs
            selectedFiles.forEach((f) => {
                if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
            });

            setSelectedFiles([]);
            setUploadAltText("");
            setShowUploadModal(false);
            setSuccessMessage(data.message || "Images uploaded successfully!");
            await loadInterior();
        } catch (err) {
            setUploadError(err.message || "Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    // Toggle active status
    const handleToggleStatus = async (item) => {
        setTogglingId(item.id);
        const newStatus = !item.is_active;

        // Optimistic UI update
        setItems((prev) =>
            prev.map((it) => (it.id === item.id ? { ...it, is_active: newStatus ? 1 : 0 } : it))
        );

        try {
            const res = await fetch(`/api/interior/${item.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: newStatus }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update status.");

            setSuccessMessage(
                `Image #${item.id} (${item.alt_text || item.title || "Interior Photo"}) is now ${newStatus ? "ACTIVE on frontend" : "INACTIVE (hidden)"}.`
            );
        } catch (err) {
            // Revert optimistic update
            setItems((prev) =>
                prev.map((it) => (it.id === item.id ? { ...it, is_active: item.is_active } : it))
            );
            setError(err.message || "Failed to update status.");
        } finally {
            setTogglingId(null);
        }
    };

    // Open Edit modal
    const handleOpenEdit = (item) => {
        setEditItem(item);
        setEditBranch(item.branch || "gomtinagar");
        setEditAltText(item.alt_text || item.title || "");
        setEditOrder(item.display_order ?? 1);
        setEditActive(Boolean(item.is_active));
    };

    // Save Edit
    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editItem) return;

        setSavingEdit(true);
        try {
            const res = await fetch(`/api/interior/${editItem.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    branch: editBranch,
                    altText: editAltText.trim(),
                    title: editAltText.trim(),
                    displayOrder: Number(editOrder),
                    isActive: editActive,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update interior photo.");

            setSuccessMessage("Interior photo details updated successfully.");
            setEditItem(null);
            await loadInterior();
        } catch (err) {
            setError(err.message || "Failed to update photo.");
        } finally {
            setSavingEdit(false);
        }
    };

    // Delete photo
    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/interior/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to delete photo.");

            setItems((prev) => prev.filter((it) => it.id !== id));
            setConfirmDeleteId(null);
            setSuccessMessage("Interior photo deleted successfully.");
        } catch (err) {
            setError(err.message || "Failed to delete photo.");
        } finally {
            setDeletingId(null);
        }
    };

    // Filter items based on active branch tab, status filter, and search query
    const gomtiNagarItems = items.filter((it) => (it.branch || "").toLowerCase() === "gomtinagar");
    const hazratganjItems = items.filter((it) => (it.branch || "").toLowerCase() === "hazratganj");

    const filterList = (list) => {
        return list.filter((item) => {
            if (activeStatusFilter === "active" && !item.is_active) return false;
            if (activeStatusFilter === "inactive" && item.is_active) return false;
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matchAlt = (item.alt_text || item.title || "").toLowerCase().includes(q);
                if (!matchAlt) return false;
            }
            return true;
        });
    };

    const filteredGomti = filterList(gomtiNagarItems);
    const filteredHazratganj = filterList(hazratganjItems);

    const activeCount = items.filter((it) => it.is_active).length;
    const inactiveCount = items.length - activeCount;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* =========================================================================
                PAGE HEADER
            ========================================================================== */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                            Frontend Sanctuaries
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        <span className="font-sans text-[10px] tracking-wider text-muted">
                            Architecture & Interior CMS
                        </span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl italic text-ink">
                        KNK Interior Management
                    </h1>
                    <p className="mt-1.5 font-sans text-xs sm:text-[13px] text-muted">
                        Manage interior architecture and suite galleries for{" "}
                        <strong className="text-ink font-semibold">Gomti Nagar</strong> and{" "}
                        <strong className="text-ink font-semibold">Hazratganj</strong> branches.
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <Link
                        href="/knk-interior"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border bg-white text-ink font-sans text-xs tracking-wider uppercase hover:border-gold hover:text-gold transition-colors shadow-xs"
                    >
                        <span>View Live /knk-interior</span>
                        <ArrowUpRight className="size-3.5" />
                    </Link>

                    <button
                        type="button"
                        onClick={() => openUploadModalFor(activeBranchTab)}
                        className="inline-flex items-center gap-2 bg-gold text-cream font-sans text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full shadow-luxe hover:scale-[1.02] transition-transform font-medium"
                    >
                        <Plus className="size-4" />
                        Upload Interior Photo
                    </button>
                </div>
            </div>

            {/* =========================================================================
                ALERT TOASTS
            ========================================================================== */}
            {successMessage && (
                <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans shadow-sm animate-in fade-in duration-200">
                    <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                        <span>{successMessage}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSuccessMessage("")}
                        className="text-emerald-700 hover:text-emerald-900"
                    >
                        <X className="size-4" />
                    </button>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-sans shadow-sm">
                    <div className="flex items-center gap-2.5">
                        <AlertCircle className="size-4 text-rose-600 shrink-0" />
                        <span>{error}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setError("")}
                        className="text-rose-700 hover:text-rose-900"
                    >
                        <X className="size-4" />
                    </button>
                </div>
            )}

            {/* =========================================================================
                BRANCH SELECTOR CARDS / TABS
                Clearly separating Gomti Nagar and Hazratganj sections
            ========================================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* All Branches Overview Card */}
                <button
                    type="button"
                    onClick={() => setActiveBranchTab("all")}
                    className={`text-left p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                        activeBranchTab === "all"
                            ? "bg-ink text-cream border-ink shadow-md ring-2 ring-gold/40"
                            : "bg-white text-ink border-border hover:border-gold/50 shadow-xs"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-semibold ${
                            activeBranchTab === "all" ? "text-gold" : "text-muted"
                        }`}>
                            Consolidated View
                        </span>
                        <Layers className={`size-4 ${activeBranchTab === "all" ? "text-gold" : "text-muted"}`} />
                    </div>
                    <h3 className="font-display text-2xl font-medium">All Branches</h3>
                    <p className={`text-xs mt-1 font-sans ${activeBranchTab === "all" ? "text-cream/70" : "text-muted"}`}>
                        {items.length} total interior photos across all branches
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                            activeBranchTab === "all" ? "bg-white/10 text-cream" : "bg-secondary text-ink"
                        }`}>
                            {activeCount} Active Live
                        </span>
                        {inactiveCount > 0 && (
                            <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                                activeBranchTab === "all" ? "bg-rose-500/20 text-rose-300" : "bg-rose-50 text-rose-700"
                            }`}>
                                {inactiveCount} Inactive
                            </span>
                        )}
                    </div>
                </button>

                {/* Gomti Nagar Dedicated Tab */}
                <button
                    type="button"
                    onClick={() => setActiveBranchTab("gomtinagar")}
                    className={`text-left p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                        activeBranchTab === "gomtinagar"
                            ? "bg-amber-950 text-amber-50 border-amber-800 shadow-md ring-2 ring-amber-400/50"
                            : "bg-white text-ink border-border hover:border-amber-400/50 shadow-xs"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-semibold ${
                            activeBranchTab === "gomtinagar" ? "text-amber-300" : "text-amber-700"
                        }`}>
                            Branch 01
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Contemporary Haven
                        </span>
                    </div>
                    <h3 className="font-display text-2xl font-medium">KNK Gomti Nagar</h3>
                    <p className={`text-xs mt-1 font-sans ${activeBranchTab === "gomtinagar" ? "text-amber-200/70" : "text-muted"}`}>
                        Vipul Khand, Gomti Nagar · Arched bays & spa sanctuary
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                            activeBranchTab === "gomtinagar" ? "bg-white/15 text-amber-100" : "bg-amber-50 text-amber-900 border border-amber-200"
                        }`}>
                            {gomtiNagarItems.length} Photos ({gomtiNagarItems.filter(i => i.is_active).length} Active)
                        </span>
                    </div>
                </button>

                {/* Hazratganj Dedicated Tab */}
                <button
                    type="button"
                    onClick={() => setActiveBranchTab("hazratganj")}
                    className={`text-left p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                        activeBranchTab === "hazratganj"
                            ? "bg-rose-950 text-rose-50 border-rose-800 shadow-md ring-2 ring-rose-400/50"
                            : "bg-white text-ink border-border hover:border-rose-400/50 shadow-xs"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-semibold ${
                            activeBranchTab === "hazratganj" ? "text-rose-300" : "text-rose-700"
                        }`}>
                            Branch 02
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            Flagship Sanctuary
                        </span>
                    </div>
                    <h3 className="font-display text-2xl font-medium">KNK Hazratganj</h3>
                    <p className={`text-xs mt-1 font-sans ${activeBranchTab === "hazratganj" ? "text-rose-200/70" : "text-muted"}`}>
                        Tilak Marg, Dalibagh · Royal suites & Awadhi jaali
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                            activeBranchTab === "hazratganj" ? "bg-white/15 text-rose-100" : "bg-rose-50 text-rose-900 border border-rose-200"
                        }`}>
                            {hazratganjItems.length} Photos ({hazratganjItems.filter(i => i.is_active).length} Active)
                        </span>
                    </div>
                </button>
            </div>

            {/* =========================================================================
                CONTROLS: SEARCH & STATUS FILTER
            ========================================================================== */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border shadow-xs">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="size-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by alt text..."
                        className="w-full pl-10 pr-4 py-2 text-xs font-sans rounded-xl border border-border bg-secondary/40 text-ink placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs"
                        >
                            <X className="size-3.5" />
                        </button>
                    )}
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-2">
                    <div className="inline-flex rounded-xl bg-secondary p-1 border border-border">
                        <button
                            type="button"
                            onClick={() => setActiveStatusFilter("all")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                                activeStatusFilter === "all"
                                    ? "bg-white text-ink shadow-xs"
                                    : "text-muted hover:text-ink"
                            }`}
                        >
                            All ({items.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveStatusFilter("active")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                                activeStatusFilter === "active"
                                    ? "bg-white text-ink shadow-xs"
                                    : "text-muted hover:text-ink"
                            }`}
                        >
                            Active ({activeCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveStatusFilter("inactive")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                                activeStatusFilter === "inactive"
                                    ? "bg-white text-ink shadow-xs"
                                    : "text-muted hover:text-ink"
                            }`}
                        >
                            Inactive ({inactiveCount})
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={loadInterior}
                        title="Refresh data from server"
                        className="p-2 rounded-xl border border-border bg-white text-muted hover:text-ink hover:border-gold transition-colors"
                    >
                        <RefreshCw className={`size-4 ${loading ? "animate-spin text-gold" : ""}`} />
                    </button>
                </div>
            </div>

            {/* =========================================================================
                BRANCH SECTIONS DISPLAY
            ========================================================================== */}
            {loading ? (
                <div className="bg-white rounded-3xl border border-border p-16 text-center shadow-xs">
                    <div className="inline-block animate-spin text-gold mb-3">
                        <RefreshCw className="size-8" />
                    </div>
                    <p className="font-display text-xl text-ink">Loading KNK Interior Galleries...</p>
                    <p className="font-sans text-xs text-muted mt-1">Fetching latest branch data from database</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {/* -------------------------------------------------------------
                        GOMTI NAGAR SECTION
                    -------------------------------------------------------------- */}
                    {(activeBranchTab === "all" || activeBranchTab === "gomtinagar") && (
                        <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
                            {/* Branch Section Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                                            Branch · Gomti Nagar
                                        </span>
                                        <span className="text-xs text-muted font-sans">
                                            {filteredGomti.length} photos shown ({gomtiNagarItems.length} total)
                                        </span>
                                    </div>
                                    <h2 className="font-display text-3xl font-medium text-ink">
                                        KNK Gomti Nagar Gallery
                                    </h2>
                                    <div className="flex items-center gap-2 text-xs text-muted mt-1 font-sans">
                                        <MapPin className="size-3.5 text-amber-600" />
                                        <span>02/01 Vipul Khand, Gomti Nagar, Lucknow</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => openUploadModalFor("gomtinagar")}
                                    className="inline-flex items-center gap-2 bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-sans font-medium px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-xs"
                                >
                                    <Plus className="size-4" />
                                    Add Photo to Gomti Nagar
                                </button>
                            </div>

                            {/* Images Grid */}
                            {filteredGomti.length === 0 ? (
                                <div className="py-16 text-center">
                                    <ImageIcon className="size-10 text-muted mx-auto mb-3 opacity-40" />
                                    <p className="font-display text-lg text-ink">No photos found for Gomti Nagar</p>
                                    <p className="font-sans text-xs text-muted mt-1">
                                        {searchQuery || activeStatusFilter !== "all"
                                            ? "Try clearing your search or status filter."
                                            : "Click 'Add Photo to Gomti Nagar' above to upload the first photo."}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
                                    {filteredGomti.map((item) => (
                                        <InteriorCard
                                            key={item.id}
                                            item={item}
                                            branchConfig={BRANCH_CONFIG.gomtinagar}
                                            onToggleStatus={() => handleToggleStatus(item)}
                                            onOpenEdit={() => handleOpenEdit(item)}
                                            onConfirmDelete={() => setConfirmDeleteId(item.id)}
                                            onPreview={() => setPreviewItem(item)}
                                            isToggling={togglingId === item.id}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* -------------------------------------------------------------
                        HAZRATGANJ SECTION
                    -------------------------------------------------------------- */}
                    {(activeBranchTab === "all" || activeBranchTab === "hazratganj") && (
                        <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
                            {/* Branch Section Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                                            Branch · Hazratganj
                                        </span>
                                        <span className="text-xs text-muted font-sans">
                                            {filteredHazratganj.length} photos shown ({hazratganjItems.length} total)
                                        </span>
                                    </div>
                                    <h2 className="font-display text-3xl font-medium text-ink">
                                        KNK Hazratganj Gallery (Flagship)
                                    </h2>
                                    <div className="flex items-center gap-2 text-xs text-muted mt-1 font-sans">
                                        <MapPin className="size-3.5 text-rose-600" />
                                        <span>Ground Floor 11B, Tilak Marg, Dalibagh Colony, Hazratganj, Lucknow</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => openUploadModalFor("hazratganj")}
                                    className="inline-flex items-center gap-2 bg-rose-900 hover:bg-rose-950 text-rose-50 text-xs font-sans font-medium px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-xs"
                                >
                                    <Plus className="size-4" />
                                    Add Photo to Hazratganj
                                </button>
                            </div>

                            {/* Images Grid */}
                            {filteredHazratganj.length === 0 ? (
                                <div className="py-16 text-center">
                                    <ImageIcon className="size-10 text-muted mx-auto mb-3 opacity-40" />
                                    <p className="font-display text-lg text-ink">No photos found for Hazratganj</p>
                                    <p className="font-sans text-xs text-muted mt-1">
                                        {searchQuery || activeStatusFilter !== "all"
                                            ? "Try clearing your search or status filter."
                                            : "Click 'Add Photo to Hazratganj' above to upload the first photo."}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
                                    {filteredHazratganj.map((item) => (
                                        <InteriorCard
                                            key={item.id}
                                            item={item}
                                            branchConfig={BRANCH_CONFIG.hazratganj}
                                            onToggleStatus={() => handleToggleStatus(item)}
                                            onOpenEdit={() => handleOpenEdit(item)}
                                            onConfirmDelete={() => setConfirmDeleteId(item.id)}
                                            onPreview={() => setPreviewItem(item)}
                                            isToggling={togglingId === item.id}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* =========================================================================
                UPLOAD MODAL
            ========================================================================== */}
            {showUploadModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
                    onClick={() => !uploading && setShowUploadModal(false)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-border space-y-6 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-4 border-b border-border">
                            <div>
                                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                                    CMS Uploader
                                </span>
                                <h3 className="font-display text-2xl font-medium text-ink mt-0.5">
                                    Upload Interior Photos
                                </h3>
                            </div>
                            <button
                                type="button"
                                disabled={uploading}
                                onClick={() => setShowUploadModal(false)}
                                className="text-muted hover:text-ink p-1.5 rounded-full hover:bg-secondary transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {uploadError && (
                            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans">
                                {uploadError}
                            </div>
                        )}

                        <form onSubmit={handleUploadSubmit} className="space-y-5">
                            {/* Branch Selector */}
                            <div>
                                <label className="block text-xs font-sans font-semibold text-ink uppercase tracking-wider mb-2">
                                    Target Branch Sanctuary *
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setUploadBranch("gomtinagar")}
                                        className={`p-3.5 rounded-xl border text-left transition-all ${
                                            uploadBranch === "gomtinagar"
                                                ? "border-amber-600 bg-amber-50 text-amber-950 ring-2 ring-amber-400/40"
                                                : "border-border bg-white text-muted hover:border-amber-400"
                                        }`}
                                    >
                                        <span className="block font-display text-base font-medium">KNK Gomti Nagar</span>
                                        <span className="block text-[11px] font-sans text-muted mt-0.5">Contemporary Haven</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setUploadBranch("hazratganj")}
                                        className={`p-3.5 rounded-xl border text-left transition-all ${
                                            uploadBranch === "hazratganj"
                                                ? "border-rose-600 bg-rose-50 text-rose-950 ring-2 ring-rose-400/40"
                                                : "border-border bg-white text-muted hover:border-rose-400"
                                        }`}
                                    >
                                        <span className="block font-display text-base font-medium">KNK Hazratganj</span>
                                        <span className="block text-[11px] font-sans text-muted mt-0.5">Flagship Sanctuary</span>
                                    </button>
                                </div>
                            </div>

                            {/* Drop Zone */}
                            <div>
                                <label className="block text-xs font-sans font-semibold text-ink uppercase tracking-wider mb-2">
                                    Select Image Files (WEBP, JPG, PNG) *
                                </label>
                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                                        isDragging
                                            ? "border-gold bg-gold/5"
                                            : "border-border/80 hover:border-gold bg-secondary/30"
                                    }`}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/avif"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleFilesAdded(e.target.files)}
                                    />
                                    <UploadCloud className="size-9 text-gold mx-auto mb-2" />
                                    <p className="font-sans text-xs font-medium text-ink">
                                        Click to browse or drag & drop photos here
                                    </p>
                                    <p className="font-sans text-[11px] text-muted mt-1">
                                        Supports multiple WEBP, JPG, PNG up to {MAX_FILE_SIZE_KB}KB each
                                    </p>
                                </div>
                            </div>

                            {/* Selected Files Preview List */}
                            {selectedFiles.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-sans font-semibold text-ink">
                                            {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} queued
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedFiles([])}
                                            className="text-[11px] text-rose-600 hover:text-rose-800 font-sans font-medium"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 max-h-44 overflow-y-auto p-1 bg-secondary/40 rounded-xl border border-border">
                                        {selectedFiles.map((fileObj) => (
                                            <div
                                                key={fileObj.id}
                                                className="relative group rounded-lg overflow-hidden border border-border aspect-square bg-white"
                                            >
                                                <img
                                                    src={fileObj.previewUrl}
                                                    alt={fileObj.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSelectedFile(fileObj.id)}
                                                    className="absolute top-1 right-1 size-5 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="size-3" />
                                                </button>
                                                <div className="absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5 text-[9px] text-white truncate">
                                                    {fileObj.size}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Alt Text (Optional) */}
                            <div>
                                <label className="block text-xs font-sans font-semibold text-ink uppercase tracking-wider mb-2">
                                    Alt Text (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={uploadAltText}
                                    onChange={(e) => setUploadAltText(e.target.value)}
                                    placeholder="e.g. Royal Bridal Vanity Suite (or leave blank for filename)"
                                    className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-border bg-white text-ink placeholder:text-muted focus:outline-none focus:border-gold"
                                />
                                <p className="text-[11px] text-muted font-sans mt-1">
                                    Used for image accessibility alt text and SEO on the frontend gallery.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                                <button
                                    type="button"
                                    disabled={uploading}
                                    onClick={() => setShowUploadModal(false)}
                                    className="px-5 py-2.5 rounded-full border border-border font-sans text-xs text-muted hover:text-ink transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading || selectedFiles.length === 0}
                                    className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-deep text-cream font-sans text-xs tracking-wider uppercase font-semibold disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-soft"
                                >
                                    {uploading
                                        ? `Uploading ${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""}...`
                                        : `Upload to ${uploadBranch === "gomtinagar" ? "Gomti Nagar" : "Hazratganj"}`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* =========================================================================
                EDIT PHOTO MODAL
            ========================================================================== */}
            {editItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
                    onClick={() => !savingEdit && setEditItem(null)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-border space-y-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-4 border-b border-border">
                            <div>
                                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                                    Photo Details
                                </span>
                                <h3 className="font-display text-2xl font-medium text-ink mt-0.5">
                                    Edit Interior Photo
                                </h3>
                            </div>
                            <button
                                type="button"
                                disabled={savingEdit}
                                onClick={() => setEditItem(null)}
                                className="text-muted hover:text-ink p-1.5 rounded-full hover:bg-secondary transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="space-y-4">
                            {/* Preview Thumbnail */}
                            <div className="flex items-center gap-4 p-3 bg-secondary/40 rounded-2xl border border-border">
                                <img
                                    src={editItem.image_url}
                                    alt={editItem.title}
                                    className="size-20 rounded-xl object-cover border border-border shrink-0"
                                />
                                <div className="min-w-0">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-medium block">
                                        Alt Text
                                    </span>
                                    <p className="font-sans text-xs font-semibold text-ink truncate mt-0.5">
                                        {editAltText || editItem.alt_text || editItem.title || "No Alt Text"}
                                    </p>
                                    <span className="inline-block mt-2 font-sans text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-white border border-border text-ink">
                                        ID #{editItem.id}
                                    </span>
                                </div>
                            </div>

                            {/* Branch Assignment */}
                            <div>
                                <label className="block text-xs font-sans font-semibold text-ink uppercase tracking-wider mb-2">
                                    Assigned Branch *
                                </label>
                                <select
                                    value={editBranch}
                                    onChange={(e) => setEditBranch(e.target.value)}
                                    className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-border bg-white text-ink focus:outline-none focus:border-gold"
                                >
                                    <option value="gomtinagar">KNK Gomti Nagar (Modern Luxury & Spa)</option>
                                    <option value="hazratganj">KNK Hazratganj (Awadh Flagship & Royal Suites)</option>
                                </select>
                            </div>

                            {/* Alt Text */}
                            <div>
                                <label className="block text-xs font-sans font-semibold text-ink uppercase tracking-wider mb-2">
                                    Alt Text
                                </label>
                                <input
                                    type="text"
                                    value={editAltText}
                                    onChange={(e) => setEditAltText(e.target.value)}
                                    placeholder="Enter alt text for image..."
                                    className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-border bg-white text-ink focus:outline-none focus:border-gold"
                                />
                                <p className="text-[11px] text-muted font-sans mt-1">
                                    Alt text will be applied to the image alt attribute on the frontend.
                                </p>
                            </div>

                            {/* Display Order */}
                            <div>
                                <label className="block text-xs font-sans font-semibold text-ink uppercase tracking-wider mb-2">
                                    Display Order (within branch)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={editOrder}
                                    onChange={(e) => setEditOrder(e.target.value)}
                                    className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-border bg-white text-ink focus:outline-none focus:border-gold"
                                />
                                <p className="text-[11px] text-muted font-sans mt-1">
                                    Lower numbers appear first on the frontend masonry gallery.
                                </p>
                            </div>

                            {/* Active Toggle */}
                            <div className="flex items-center justify-between p-3.5 bg-secondary/40 rounded-xl border border-border">
                                <div>
                                    <p className="text-xs font-sans font-semibold text-ink">Active on Frontend</p>
                                    <p className="text-[11px] text-muted font-sans mt-0.5">
                                        When disabled, this photo will be hidden from /knk-interior.
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editActive}
                                        onChange={(e) => setEditActive(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                                <button
                                    type="button"
                                    disabled={savingEdit}
                                    onClick={() => setEditItem(null)}
                                    className="px-5 py-2.5 rounded-full border border-border font-sans text-xs text-muted hover:text-ink transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={savingEdit}
                                    className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-deep text-cream font-sans text-xs tracking-wider uppercase font-semibold disabled:opacity-50 transition-colors shadow-soft"
                                >
                                    {savingEdit ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* =========================================================================
                DELETE CONFIRMATION DIALOG
            ========================================================================== */}
            {confirmDeleteId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
                    onClick={() => !deletingId && setConfirmDeleteId(null)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-border space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="size-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                            <Trash2 className="size-6" />
                        </div>
                        <div>
                            <h4 className="font-display text-2xl font-medium text-ink">Delete Photo?</h4>
                            <p className="font-sans text-xs text-muted mt-1.5 leading-relaxed">
                                This will permanently remove this interior photo from the database and frontend gallery.
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-3 pt-2">
                            <button
                                type="button"
                                disabled={deletingId}
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-5 py-2.5 rounded-full border border-border font-sans text-xs text-muted hover:text-ink transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={deletingId}
                                onClick={() => handleDelete(confirmDeleteId)}
                                className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs tracking-wider uppercase font-semibold transition-colors shadow-soft"
                            >
                                {deletingId ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================================
                PREVIEW / LIGHTBOX MODAL
            ========================================================================== */}
            {previewItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setPreviewItem(null)}
                >
                    <div
                        className="relative max-w-4xl w-full flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setPreviewItem(null)}
                            className="absolute -top-12 right-0 size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        >
                            <X className="size-5" />
                        </button>
                        <img
                            src={previewItem.image_url}
                            alt={previewItem.title || "Preview"}
                            className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/10"
                        />
                        <div className="mt-4 text-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 font-medium block">Alt Text</span>
                            <h4 className="text-white font-sans text-sm mt-0.5">{previewItem.alt_text || previewItem.title || "No Alt Text"}</h4>
                            <p className="text-white/50 font-mono text-xs mt-1">
                                Branch: {previewItem.branch === "gomtinagar" ? "Gomti Nagar" : "Hazratganj"} · Order: #{previewItem.display_order}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// -----------------------------------------------------------------------------
// INDIVIDUAL CARD COMPONENT
// -----------------------------------------------------------------------------
function InteriorCard({
    item,
    branchConfig,
    onToggleStatus,
    onOpenEdit,
    onConfirmDelete,
    onPreview,
    isToggling,
}) {
    const isActive = Boolean(item.is_active);

    return (
        <div className="group rounded-2xl overflow-hidden border border-border bg-white shadow-xs hover:shadow-soft hover:border-gold/60 transition-all flex flex-col">
            {/* Image Box */}
            <div className="relative aspect-[4/3] bg-secondary/50 overflow-hidden">
                <img
                    src={item.image_url}
                    alt={item.title || "Interior image"}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top overlay badge: Order and Branch */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold bg-black/70 backdrop-blur-xs text-white px-2 py-0.5 rounded-md">
                        #{item.display_order}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs ${
                        item.branch === "gomtinagar"
                            ? "bg-amber-950/80 text-amber-200 border border-amber-500/30"
                            : "bg-rose-950/80 text-rose-200 border border-rose-500/30"
                    }`}>
                        {item.branch === "gomtinagar" ? "Gomti Nagar" : "Hazratganj"}
                    </span>
                </div>

                {/* Top right quick preview button */}
                <button
                    type="button"
                    onClick={onPreview}
                    title="Preview full size"
                    className="absolute top-2.5 right-2.5 size-7 rounded-full bg-black/60 hover:bg-gold text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-xs"
                >
                    <Eye className="size-3.5" />
                </button>

                {/* Inactive overlay mask */}
                {!isActive && (
                    <div className="absolute inset-0 bg-ink/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-white/90 bg-black/60 px-3 py-1 rounded-full border border-white/20">
                            Hidden (Inactive)
                        </span>
                    </div>
                )}
            </div>

            {/* Info and Actions */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-medium block mb-1">
                        Alt Text
                    </span>
                    <p className="font-sans text-xs font-semibold text-ink line-clamp-2" title={item.alt_text || item.title || "No Alt Text"}>
                        {item.alt_text || item.title || <span className="text-muted font-normal italic">No Alt Text</span>}
                    </p>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between">
                    {/* Status Toggle Button */}
                    <button
                        type="button"
                        onClick={onToggleStatus}
                        disabled={isToggling}
                        className={`inline-flex items-center gap-1.5 text-[11px] font-sans font-medium px-2.5 py-1 rounded-full transition-colors ${
                            isActive
                                ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-200"
                        }`}
                    >
                        <span
                            className={`size-1.5 rounded-full ${
                                isActive ? "bg-emerald-600" : "bg-neutral-400"
                            }`}
                        />
                        {isToggling ? "Updating..." : isActive ? "Active" : "Inactive"}
                    </button>

                    {/* Edit and Delete Buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={onOpenEdit}
                            title="Edit details & order"
                            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-secondary transition-colors"
                        >
                            <Edit3 className="size-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={onConfirmDelete}
                            title="Delete photo"
                            className="p-1.5 rounded-lg text-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                            <Trash2 className="size-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
