"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
const MAX_FILE_SIZE_MB = 15;

export default function OffersIndex() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Search query
    const [searchQuery, setSearchQuery] = useState("");

    // Add / Edit Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [modalError, setModalError] = useState("");

    // Simplified form data: only Image, Alt Text / Title, Display Order, Active
    const [formData, setFormData] = useState({
        title: "",
        altText: "",
        displayOrder: 1,
        isActive: true,
        imageUrl: "",
    });

    // File upload
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Delete modal
    const [deletingId, setDeletingId] = useState(null);
    const [confirmDeleteOffer, setConfirmDeleteOffer] = useState(null);

    // Status toggling
    const [togglingId, setTogglingId] = useState(null);

    // Preview modal
    const [previewOffer, setPreviewOffer] = useState(null);

    const loadOffers = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/offers");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load offers.");
            setOffers(data.offers || []);
        } catch (err) {
            setError(err.message || "Failed to load offers.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOffers();
    }, [loadOffers]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(""), 4000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    // Open Modal for Add
    const handleOpenAdd = () => {
        setEditingOffer(null);
        setFormData({
            title: "",
            altText: "",
            displayOrder: offers.length + 1,
            isActive: true,
            imageUrl: "",
        });
        setSelectedFile(null);
        setFilePreview("");
        setModalError("");
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const handleOpenEdit = (offer) => {
        setEditingOffer(offer);
        setFormData({
            title: offer.title || offer.altText || "",
            altText: offer.altText || offer.title || "",
            displayOrder: offer.displayOrder ?? 1,
            isActive: Boolean(offer.isActive),
            imageUrl: offer.imageUrl || "",
        });
        setSelectedFile(null);
        setFilePreview(offer.imageUrl || "");
        setModalError("");
        setIsModalOpen(true);
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!IMAGE_TYPES.includes(file.type)) {
            setModalError("Please select a valid image file (JPG, PNG, WEBP, AVIF).");
            return;
        }

        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setModalError(`File size must be under ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        setSelectedFile(file);
        setFilePreview(URL.createObjectURL(file));
        setModalError("");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (!IMAGE_TYPES.includes(file.type)) {
                setModalError("Please select a valid image file (JPG, PNG, WEBP, AVIF).");
                return;
            }
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                setModalError(`File size must be under ${MAX_FILE_SIZE_MB}MB.`);
                return;
            }
            setSelectedFile(file);
            setFilePreview(URL.createObjectURL(file));
            setModalError("");
        }
    };

    // Submit form (Create or Update)
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setModalError("");

        const titleText = (formData.altText || formData.title || "").trim();
        if (!titleText) {
            setModalError("Please provide an Alt Text / Offer Title.");
            return;
        }

        if (!editingOffer && !selectedFile && !formData.imageUrl) {
            setModalError("Please upload an offer flyer image or provide an image URL.");
            return;
        }

        setSubmitting(true);

        try {
            const data = new FormData();
            data.append("title", titleText);
            data.append("altText", titleText);
            data.append("displayOrder", String(formData.displayOrder || 1));
            data.append("isActive", formData.isActive ? "true" : "false");

            if (selectedFile) {
                data.append("image", selectedFile);
            } else if (formData.imageUrl) {
                data.append("imageUrl", formData.imageUrl.trim());
            }

            const url = editingOffer ? `/api/offers/${editingOffer.id}` : "/api/offers";
            const method = editingOffer ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                body: data,
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to save offer.");

            setSuccessMessage(
                editingOffer
                    ? `Offer "${titleText}" updated successfully.`
                    : `New offer "${titleText}" published successfully.`
            );
            setIsModalOpen(false);
            loadOffers();
        } catch (err) {
            setModalError(err.message || "An error occurred while saving the offer.");
        } finally {
            setSubmitting(false);
        }
    };

    // Quick status toggle
    const handleToggleStatus = async (offer) => {
        setTogglingId(offer.id);
        const newStatus = !offer.isActive;
        try {
            const res = await fetch(`/api/offers/${offer.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: newStatus }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to update status.");

            setOffers((prev) =>
                prev.map((item) => (item.id === offer.id ? { ...item, isActive: newStatus } : item))
            );
            setSuccessMessage(`Offer "${offer.altText || offer.title}" is now ${newStatus ? "Active" : "Hidden"}.`);
        } catch (err) {
            setError(err.message || "Failed to update offer status.");
        } finally {
            setTogglingId(null);
        }
    };

    // Delete offer
    const handleDeleteOffer = async () => {
        if (!confirmDeleteOffer) return;
        setDeletingId(confirmDeleteOffer.id);
        try {
            const res = await fetch(`/api/offers/${confirmDeleteOffer.id}`, {
                method: "DELETE",
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to delete offer.");

            setOffers((prev) => prev.filter((item) => item.id !== confirmDeleteOffer.id));
            setSuccessMessage(`Offer "${confirmDeleteOffer.altText || confirmDeleteOffer.title}" deleted.`);
            setConfirmDeleteOffer(null);
        } catch (err) {
            setError(err.message || "Failed to delete offer.");
        } finally {
            setDeletingId(null);
        }
    };

    // Filter offers by search query
    const filteredOffers = offers.filter((item) => {
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            const matchTitle = (item.title || "").toLowerCase().includes(q);
            const matchAlt = (item.altText || "").toLowerCase().includes(q);
            if (!matchTitle && !matchAlt) return false;
        }
        return true;
    });

    const activeCount = offers.filter((o) => o.isActive).length;

    return (
        <div className="space-y-6">
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                        <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
                            Reel Offers CMS
                        </span>
                    </div>
                    <h1 className="font-display italic text-3xl sm:text-4xl text-ink font-normal mt-1">
                        Offers Management
                    </h1>
                    <p className="font-sans text-xs text-muted max-w-xl mt-1 leading-relaxed">
                        Upload reel-size promotional flyers with alt text. Manage active/hidden status on the{" "}
                        <Link href="/offers" target="_blank" className="text-gold font-medium hover:underline">
                            /offers
                        </Link>{" "}
                        page.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/offers"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white text-ink text-xs font-sans tracking-wide hover:border-gold hover:text-gold transition-colors"
                    >
                        <span>View Live Page</span>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                    </Link>

                    <button
                        onClick={handleOpenAdd}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-gold text-primary font-sans text-xs font-semibold tracking-wider uppercase shadow-luxe hover:opacity-95 transition-all cursor-pointer"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Add New Offer</span>
                    </button>
                </div>
            </div>

            {/* Notification messages */}
            {successMessage && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-sans animate-fade-in">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>{successMessage}</span>
                    </div>
                    <button onClick={() => setSuccessMessage("")} className="text-emerald-700/60 hover:text-emerald-800">
                        ✕
                    </button>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-sans">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{error}</span>
                    </div>
                    <button onClick={() => setError("")} className="text-red-700/60 hover:text-red-800">
                        ✕
                    </button>
                </div>
            )}

            {/* Metric KPI cards & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-border/80 shadow-sm">
                <div className="flex items-center gap-4 text-xs font-sans">
                    <span className="text-muted">
                        Total Offers: <strong className="text-ink font-mono">{offers.length}</strong>
                    </span>
                    <span className="text-emerald-700 font-medium">
                        Active: <strong className="font-mono">{activeCount}</strong>
                    </span>
                    <span className="text-muted">
                        Hidden: <strong className="font-mono">{offers.length - activeCount}</strong>
                    </span>
                </div>

                {/* Search Box */}
                <div className="relative min-w-[220px]">
                    <svg
                        className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by alt text..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-secondary/80 border border-border/80 text-xs font-sans text-ink placeholder:text-muted focus:outline-none focus:border-gold"
                    />
                </div>
            </div>

            {/* Reel Offers Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center p-16 text-muted">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="font-sans text-xs">Loading offers...</p>
                </div>
            ) : filteredOffers.length === 0 ? (
                <div className="text-center p-16 rounded-2xl bg-white border border-border/80 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                        </svg>
                    </div>
                    <h3 className="font-display italic text-xl text-ink">No offers found</h3>
                    <p className="font-sans text-xs text-muted max-w-sm mx-auto mt-1">
                        Upload your first promotional reel-size flyer using &apos;Add New Offer&apos;.
                    </p>
                    <button
                        onClick={handleOpenAdd}
                        className="mt-4 px-4 py-2 rounded-xl bg-gold/20 text-gold-deep font-sans text-xs font-semibold hover:bg-gold/30 transition-colors cursor-pointer"
                    >
                        + Add Offer
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredOffers.map((offer) => (
                        <div
                            key={offer.id}
                            className={`group relative flex flex-col rounded-2xl bg-white border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                                offer.isActive ? "border-border/80" : "border-border/40 opacity-70 bg-secondary/30"
                            }`}
                        >
                            {/* Reel-size Image Thumbnail */}
                            <div className="relative aspect-[9/16] bg-ink/5 overflow-hidden border-b border-border/60">
                                <img
                                    src={offer.imageUrl || "/admin-assets/offers/offer_1.webp"}
                                    alt={offer.altText || offer.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src = "/admin-assets/offers/offer_1.webp";
                                    }}
                                />

                                {/* Top Order Badge & Preview */}
                                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2">
                                    <span className="px-2 py-0.5 rounded-md bg-black/60 text-white font-mono text-[10px] font-semibold backdrop-blur-sm shadow-sm">
                                        Order #{offer.displayOrder}
                                    </span>

                                    <button
                                        onClick={() => setPreviewOffer(offer)}
                                        title="Preview Reel"
                                        className="p-1.5 rounded-full bg-white/90 hover:bg-white text-ink shadow-sm transition-transform hover:scale-110 cursor-pointer"
                                    >
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Card Footer: Alt text & Actions */}
                            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                <div>
                                    <span className="font-sans text-[9px] uppercase tracking-wider text-gold-deep font-semibold block">
                                        Alt Text / Title
                                    </span>
                                    <h3 className="font-sans text-xs text-ink font-semibold mt-0.5 line-clamp-2">
                                        {offer.altText || offer.title}
                                    </h3>
                                </div>

                                <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                                    {/* Active / Hidden Status Toggle */}
                                    <button
                                        onClick={() => handleToggleStatus(offer)}
                                        disabled={togglingId === offer.id}
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-sans font-medium transition-all cursor-pointer ${
                                            offer.isActive
                                                ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
                                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                        }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                offer.isActive ? "bg-emerald-600 animate-pulse" : "bg-gray-400"
                                            }`}
                                        />
                                        <span>{offer.isActive ? "Active" : "Hidden"}</span>
                                    </button>

                                    {/* Edit / Delete */}
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleOpenEdit(offer)}
                                            title="Edit Offer"
                                            className="p-1.5 rounded-lg text-muted hover:text-gold hover:bg-gold/10 transition-colors cursor-pointer"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => setConfirmDeleteOffer(offer)}
                                            title="Delete Offer"
                                            className="p-1.5 rounded-lg text-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* =========================================================================
                SIMPLIFIED ADD / EDIT MODAL (Only Image, Alt Text, Order & Status)
            ========================================================================== */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsModalOpen(false);
                    }}
                >
                    <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border overflow-hidden my-8 animate-fade-in">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
                            <div>
                                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                                    {editingOffer ? "Edit Offer" : "New Reel Offer"}
                                </span>
                                <h2 className="font-display italic text-2xl text-ink font-normal mt-0.5">
                                    {editingOffer ? "Update Offer Flyer" : "Upload Offer Flyer"}
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-full text-muted hover:text-ink hover:bg-white transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmitForm} className="p-6 space-y-4">
                            {modalError && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                                    {modalError}
                                </div>
                            )}

                            {/* 1. Image Upload Area */}
                            <div>
                                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Flyer / Poster Image <span className="text-red-500">*</span>
                                </label>

                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                                        isDragging
                                            ? "border-gold bg-gold/5"
                                            : "border-border hover:border-gold/60 bg-secondary/30"
                                    }`}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/avif"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                    {filePreview ? (
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={filePreview}
                                                alt="Preview"
                                                className="w-20 aspect-[9/16] object-cover rounded-lg border border-border shadow-sm"
                                            />
                                            <div className="text-left flex-1">
                                                <p className="font-sans text-xs text-ink font-semibold">
                                                    {selectedFile ? selectedFile.name : "Current Flyer"}
                                                </p>
                                                <p className="font-sans text-[11px] text-muted mt-0.5">
                                                    Click or drop another image to replace.
                                                </p>
                                                <span className="inline-block mt-2 text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded">
                                                    Ready to upload
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-6">
                                            <svg
                                                className="w-8 h-8 mx-auto text-muted mb-2"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            >
                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <path d="m21 15-5-5L5 21" />
                                            </svg>
                                            <p className="font-sans text-xs text-ink font-medium">
                                                Drag &amp; drop reel image here, or <span className="text-gold underline">browse</span>
                                            </p>
                                            <p className="font-sans text-[10px] text-muted mt-1">
                                                Recommended: 9:16 vertical flyer (JPG, PNG, WEBP)
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Or image URL */}
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder="Or paste image URL (e.g. /admin-assets/offers/offer_1.webp)"
                                        value={formData.imageUrl}
                                        onChange={(e) => {
                                            setFormData((prev) => ({ ...prev, imageUrl: e.target.value }));
                                            if (!selectedFile && e.target.value) {
                                                setFilePreview(e.target.value);
                                            }
                                        }}
                                        className="w-full px-3 py-2 rounded-lg bg-secondary/40 border border-border text-xs font-sans text-ink placeholder:text-muted focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            {/* 2. Alt Text / Title Field */}
                            <div>
                                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1">
                                    Alt Text / Offer Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. A Little Extra Love — Head Wash, Hair Mask & Blow Dry at ₹499"
                                    value={formData.altText}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            altText: e.target.value,
                                            title: e.target.value,
                                        }))
                                    }
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-xs font-sans text-ink placeholder:text-muted focus:border-gold focus:outline-none"
                                />
                                <span className="text-[10px] font-sans text-muted mt-1 block">
                                    Used for image SEO alt attribute and pre-selected booking service name.
                                </span>
                            </div>

                            {/* 3. Display Order */}
                            <div>
                                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.displayOrder}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            displayOrder: parseInt(e.target.value) || 1,
                                        }))
                                    }
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-xs font-sans text-ink focus:border-gold focus:outline-none font-mono"
                                />
                            </div>

                            {/* 4. Active Switch */}
                            <div className="flex items-center gap-3 pt-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                                        }
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                                </label>
                                <span className="font-sans text-xs font-medium text-ink">
                                    {formData.isActive ? "Active (Visible on website)" : "Hidden (Draft)"}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl border border-border text-xs font-sans text-muted hover:text-ink transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-gold text-primary font-sans text-xs font-semibold tracking-wider uppercase shadow-luxe hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {submitting ? "Saving..." : editingOffer ? "Update Offer" : "Save Offer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            {confirmDeleteOffer && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setConfirmDeleteOffer(null);
                    }}
                >
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border p-6 text-center animate-fade-in">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                        </div>

                        <h3 className="font-display italic text-xl text-ink font-semibold">Delete Offer</h3>
                        <p className="font-sans text-xs text-muted mt-2">
                            Are you sure you want to permanently delete{" "}
                            <span className="font-semibold text-ink">
                                &quot;{confirmDeleteOffer.altText || confirmDeleteOffer.title}&quot;
                            </span>
                            ?
                        </p>

                        <div className="flex items-center justify-center gap-3 mt-6">
                            <button
                                onClick={() => setConfirmDeleteOffer(null)}
                                className="px-5 py-2.5 rounded-xl border border-border text-xs font-sans text-muted hover:text-ink cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteOffer}
                                disabled={deletingId === confirmDeleteOffer.id}
                                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer disabled:opacity-50"
                            >
                                {deletingId === confirmDeleteOffer.id ? "Deleting..." : "Delete Permanently"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Reel Modal */}
            {previewOffer && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setPreviewOffer(null);
                    }}
                >
                    <div className="relative w-full max-w-xs rounded-2xl bg-[#FAF7F2] border-2 border-gold/40 shadow-2xl overflow-hidden p-3.5 my-8 animate-fade-in text-center">
                        <button
                            onClick={() => setPreviewOffer(null)}
                            className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                        >
                            ✕
                        </button>

                        <div className="relative aspect-[9/16] rounded-xl overflow-hidden shadow-md">
                            <img
                                src={previewOffer.imageUrl}
                                alt={previewOffer.altText || previewOffer.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <p className="font-sans text-xs font-semibold text-ink mt-3">
                            {previewOffer.altText || previewOffer.title}
                        </p>

                        <div className="mt-3">
                            <div className="w-full py-3 rounded-md bg-[#877443] text-white font-sans text-xs font-bold tracking-widest uppercase">
                                Book Now
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
