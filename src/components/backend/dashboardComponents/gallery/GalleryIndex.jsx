"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
const MAX_FILE_SIZE_MB = 15;

export default function GalleryIndex() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Filter & Search
    const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'active' | 'inactive'
    const [searchQuery, setSearchQuery] = useState("");

    // Upload state
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadTitle, setUploadTitle] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Delete confirmation state
    const [deletingId, setDeletingId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    // Status toggle state
    const [togglingId, setTogglingId] = useState(null);

    // Lightbox / View Modal
    const [previewItem, setPreviewItem] = useState(null);

    const loadGallery = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load gallery items.");
            setItems(data.gallery || []);
        } catch (err) {
            setError(err.message || "Failed to load gallery. Please refresh.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadGallery();
    }, [loadGallery]);

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
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                setUploadError(`"${file.name}" exceeds the ${MAX_FILE_SIZE_MB}MB limit.`);
                continue;
            }
            newFiles.push({
                file,
                id: `${file.name}-${Date.now()}-${Math.random()}`,
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
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
            selectedFiles.forEach((item) => {
                fd.append("images", item.file);
            });
            if (uploadTitle.trim()) {
                fd.append("title", uploadTitle.trim());
            }

            const res = await fetch("/api/gallery", {
                method: "POST",
                body: fd,
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Upload failed. Please try again.");
            }

            // Cleanup object URLs
            selectedFiles.forEach((f) => {
                if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
            });

            setSelectedFiles([]);
            setUploadTitle("");
            setShowUploadModal(false);
            setSuccessMessage(data.message || "Images uploaded successfully!");
            setTimeout(() => setSuccessMessage(""), 5000);

            // Reload gallery
            await loadGallery();
        } catch (err) {
            setUploadError(err.message || "Upload failed. Check connection.");
        } finally {
            setUploading(false);
        }
    };

    const handleToggleStatus = async (item) => {
        setTogglingId(item.id);
        const newStatus = !item.is_active;
        try {
            const res = await fetch(`/api/gallery/${item.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: newStatus }),
            });
            if (!res.ok) throw new Error();
            setItems((prev) =>
                prev.map((it) => (it.id === item.id ? { ...it, is_active: newStatus ? 1 : 0 } : it))
            );
        } catch {
            setError("Could not update image status.");
            setTimeout(() => setError(""), 4000);
        } finally {
            setTogglingId(null);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            setItems((prev) => prev.filter((it) => it.id !== id));
            if (previewItem?.id === id) setPreviewItem(null);
            setSuccessMessage("Photo removed successfully.");
            setTimeout(() => setSuccessMessage(""), 4000);
        } catch {
            setError("Could not delete this photo.");
            setTimeout(() => setError(""), 4000);
        } finally {
            setDeletingId(null);
            setConfirmDeleteId(null);
        }
    };

    // Filter items
    const filteredItems = items.filter((item) => {
        if (activeFilter === "active" && !item.is_active) return false;
        if (activeFilter === "inactive" && item.is_active) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchTitle = (item.title || "").toLowerCase().includes(q);
            const matchUrl = (item.image_url || "").toLowerCase().includes(q);
            if (!matchTitle && !matchUrl) return false;
        }
        return true;
    });

    const activeCount = items.filter((it) => it.is_active).length;
    const inactiveCount = items.length - activeCount;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                            Frontend Portfolio
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        <span className="font-sans text-[10px] tracking-wider text-muted">
                            Dynamic Lookbook
                        </span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl italic text-ink">Artistry Gallery</h1>
                    <p className="mt-1.5 font-sans text-xs sm:text-[13px] text-muted">
                        {loading
                            ? "Loading lookbook photos..."
                            : `${items.length} total photos · ${activeCount} visible live on frontend · ${inactiveCount} inactive`}
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <Link
                        href="/gallery"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border bg-white text-ink font-sans text-xs tracking-wider uppercase hover:border-gold hover:text-gold transition-colors"
                    >
                        <span>View Live Gallery</span>
                        <span>↗</span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => {
                            setShowUploadModal(true);
                            setUploadError("");
                        }}
                        className="inline-flex items-center gap-2 bg-gold text-cream font-sans text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full shadow-luxe hover:scale-[1.02] transition-transform font-medium"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        Upload Photos
                    </button>
                </div>
            </div>

            {/* Notifications */}
            {successMessage && (
                <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-600/20 text-emerald-800 text-xs font-sans">
                    <div className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-emerald-600">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{successMessage}</span>
                    </div>
                    <button onClick={() => setSuccessMessage("")} className="text-emerald-600 hover:text-emerald-900 font-bold">
                        ×
                    </button>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-rose-50 border border-rose-600/20 text-rose-800 text-xs font-sans">
                    <span>{error}</span>
                    <button onClick={() => setError("")} className="text-rose-600 hover:text-rose-900 font-bold">
                        ×
                    </button>
                </div>
            )}

            {/* Controls Bar: Filters & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border shadow-xs">
                {/* Filter Pills */}
                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={() => setActiveFilter("all")}
                        className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-colors ${
                            activeFilter === "all"
                                ? "bg-ink text-cream font-semibold"
                                : "text-muted hover:text-ink hover:bg-neutral-100"
                        }`}
                    >
                        All ({items.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveFilter("active")}
                        className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-colors ${
                            activeFilter === "active"
                                ? "bg-emerald-600 text-white font-semibold"
                                : "text-muted hover:text-ink hover:bg-neutral-100"
                        }`}
                    >
                        Active ({activeCount})
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveFilter("inactive")}
                        className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-colors ${
                            activeFilter === "inactive"
                                ? "bg-neutral-700 text-white font-semibold"
                                : "text-muted hover:text-ink hover:bg-neutral-100"
                        }`}
                    >
                        Inactive ({inactiveCount})
                    </button>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search photos by title / filename..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-full bg-secondary text-ink border border-border text-xs focus:outline-none focus:border-gold"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Gallery Grid */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="aspect-[4/5] rounded-xl bg-cream animate-pulse border border-border" />
                    ))}
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-dashed border-border">
                    <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-gold-deep">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                        </svg>
                    </div>
                    <p className="font-display text-2xl italic text-ink mb-1">No photos found</p>
                    <p className="font-sans text-xs text-muted max-w-sm mb-6">
                        {searchQuery || activeFilter !== "all"
                            ? "Try adjusting your filters or search terms."
                            : "Upload your first lookbook photos to showcase bridal transformations on the frontend gallery."}
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowUploadModal(true)}
                        className="bg-gold text-cream font-sans text-xs tracking-wider uppercase px-5 py-2.5 rounded-full font-medium"
                    >
                        Upload Photos
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredItems.map((item) => {
                        const isUploadedAdminAsset = item.image_url?.startsWith("/admin-assets/gallery/");
                        const fileName = item.image_url ? item.image_url.split("/").pop() : "";

                        return (
                            <div
                                key={item.id}
                                className="group relative bg-white rounded-xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                            >
                                {/* Thumbnail Image */}
                                <div
                                    className="relative aspect-[4/5] bg-ink/5 overflow-hidden cursor-pointer"
                                    onClick={() => setPreviewItem(item)}
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.title || "Gallery image"}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Status Badge */}
                                    <div className="absolute top-2.5 left-2.5">
                                        <span
                                            className={`inline-flex items-center gap-1 font-sans text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full backdrop-blur-md shadow-xs ${
                                                item.is_active
                                                    ? "bg-emerald-600/90 text-white font-medium"
                                                    : "bg-neutral-800/80 text-white/80"
                                            }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${
                                                    item.is_active ? "bg-white" : "bg-neutral-400"
                                                }`}
                                            />
                                            {item.is_active ? "Live" : "Hidden"}
                                        </span>
                                    </div>

                                    {/* Storage Tag */}
                                    {isUploadedAdminAsset && (
                                        <div className="absolute top-2.5 right-2.5">
                                            <span className="bg-ink/80 text-gold font-sans text-[8px] tracking-widest uppercase px-1.5 py-0.5 rounded backdrop-blur-md">
                                                Admin Asset
                                            </span>
                                        </div>
                                    )}

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewItem(item);
                                            }}
                                            className="h-9 w-9 rounded-full bg-white/90 text-ink hover:bg-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                                            title="View Full Size"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Content & Controls */}
                                <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
                                    <div>
                                        <p className="font-sans text-[11px] font-medium text-ink truncate" title={item.title || fileName}>
                                            {item.title || fileName}
                                        </p>
                                        <p className="font-sans text-[9px] text-muted truncate" title={fileName}>
                                            {fileName}
                                        </p>
                                    </div>

                                    {/* Action Bar */}
                                    <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                                        {/* Toggle status switch */}
                                        <button
                                            type="button"
                                            onClick={() => handleToggleStatus(item)}
                                            disabled={togglingId === item.id}
                                            title={item.is_active ? "Click to hide from frontend" : "Click to show on frontend"}
                                            className={`relative h-4 w-7 rounded-full transition-colors shrink-0 disabled:opacity-50 ${
                                                item.is_active ? "bg-gold" : "bg-neutral-300"
                                            }`}
                                        >
                                            <span
                                                className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${
                                                    item.is_active ? "translate-x-3.5" : "translate-x-0.5"
                                                }`}
                                            />
                                        </button>

                                        {/* Delete action */}
                                        {confirmDeleteId === item.id ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={deletingId === item.id}
                                                    className="font-sans text-[9px] tracking-wider uppercase text-white bg-rose-600 px-2 py-1 rounded disabled:opacity-50"
                                                >
                                                    {deletingId === item.id ? "..." : "Delete"}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setConfirmDeleteId(null)}
                                                    className="font-sans text-[9px] text-muted hover:text-ink px-1"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setConfirmDeleteId(item.id)}
                                                className="text-muted hover:text-rose-600 transition-colors p-1"
                                                title="Delete photo"
                                            >
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Upload Modal / Drawer */}
            {showUploadModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4 overflow-y-auto"
                    onClick={() => {
                        if (!uploading) setShowUploadModal(false);
                    }}
                >
                    <div
                        className="bg-white rounded-3xl border border-border shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                                    Asset Storage
                                </span>
                                <h2 className="font-display text-3xl italic text-ink mt-1">Upload Gallery Images</h2>
                                <p className="font-sans text-xs text-muted mt-1">
                                    Images are stored preserving their <strong>original file names</strong> in admin assets.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => !uploading && setShowUploadModal(false)}
                                disabled={uploading}
                                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-ink hover:border-gold transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {uploadError && (
                            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-600/20 text-rose-700 text-xs font-sans">
                                {uploadError}
                            </div>
                        )}

                        <form onSubmit={handleUploadSubmit} className="space-y-5">
                            {/* Drag and drop zone */}
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDragging(true);
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                                    isDragging
                                        ? "border-gold bg-gold/5"
                                        : "border-border hover:border-gold hover:bg-neutral-50/50"
                                }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/webp,image/avif"
                                    onChange={(e) => handleFilesAdded(e.target.files)}
                                    className="hidden"
                                />

                                <div className="h-12 w-12 rounded-full bg-gold/10 mx-auto flex items-center justify-center mb-3">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6 text-gold-deep">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                                    </svg>
                                </div>
                                <p className="font-sans text-xs font-medium text-ink">
                                    Click to select photos or drag &amp; drop
                                </p>
                                <p className="font-sans text-[11px] text-muted mt-1">
                                    Supports JPG, PNG, WEBP, AVIF up to {MAX_FILE_SIZE_MB}MB each
                                </p>
                                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-cream text-gold-deep font-sans text-[10px] tracking-wider uppercase font-semibold">
                                    Multiple uploads supported
                                </span>
                            </div>

                            {/* Optional Title */}
                            <div>
                                <label className="block font-sans text-[11px] uppercase tracking-wider text-ink mb-1.5 font-medium">
                                    Photo Title / Caption <span className="text-muted lowercase">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Royal Bridal Makeup Awadh"
                                    value={uploadTitle}
                                    onChange={(e) => setUploadTitle(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                />
                                <p className="font-sans text-[10px] text-muted mt-1">
                                    If left empty, original clean filename will be used as title automatically.
                                </p>
                            </div>

                            {/* Selected files preview */}
                            {selectedFiles.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-sans text-muted">
                                        <span>Selected Photos ({selectedFiles.length})</span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                selectedFiles.forEach((f) => f.previewUrl && URL.revokeObjectURL(f.previewUrl));
                                                setSelectedFiles([]);
                                            }}
                                            className="text-rose-600 hover:underline"
                                        >
                                            Clear all
                                        </button>
                                    </div>

                                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1 border border-border rounded-xl p-2 bg-secondary/50">
                                        {selectedFiles.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between gap-3 p-2 bg-white rounded-lg border border-border"
                                            >
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <img
                                                        src={item.previewUrl}
                                                        alt={item.name}
                                                        className="h-10 w-10 rounded-md object-cover border border-border shrink-0"
                                                    />
                                                    <div className="overflow-hidden">
                                                        <p className="font-sans text-xs text-ink font-medium truncate">
                                                            {item.name}
                                                        </p>
                                                        <p className="font-sans text-[10px] text-muted">{item.size}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSelectedFile(item.id)}
                                                    className="text-muted hover:text-rose-600 p-1 shrink-0"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Submit & Cancel */}
                            <div className="pt-2 flex items-center justify-end gap-3 border-t border-border">
                                <button
                                    type="button"
                                    onClick={() => setShowUploadModal(false)}
                                    disabled={uploading}
                                    className="px-5 py-2.5 rounded-full border border-border text-muted hover:text-ink font-sans text-xs tracking-wider uppercase font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading || selectedFiles.length === 0}
                                    className="inline-flex items-center gap-2 bg-gold text-cream font-sans text-xs tracking-[0.15em] uppercase px-6 py-2.5 rounded-full font-medium shadow-luxe hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {uploading ? (
                                        <>
                                            <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}</span>
                                            <span>→</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Lightbox Preview Modal */}
            {previewItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8"
                    onClick={() => setPreviewItem(null)}
                >
                    <div
                        className="relative max-w-4xl w-full flex flex-col items-center max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setPreviewItem(null)}
                            className="absolute -top-10 right-0 text-white/80 hover:text-white text-3xl font-light"
                        >
                            &times;
                        </button>

                        <div className="relative rounded-xl overflow-hidden bg-ink max-h-[75vh] flex items-center justify-center border border-white/10">
                            <img
                                src={previewItem.image_url}
                                alt={previewItem.title || "Gallery preview"}
                                className="max-h-[75vh] w-auto object-contain"
                            />
                        </div>

                        {/* Modal info bar */}
                        <div className="mt-4 w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-white/15">
                            <div>
                                <p className="font-display italic text-lg">{previewItem.title || "Lookbook photo"}</p>
                                <p className="font-mono text-[11px] text-white/70 truncate max-w-md">
                                    {previewItem.image_url}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigator.clipboard.writeText(previewItem.image_url);
                                        setSuccessMessage("Image URL copied to clipboard!");
                                        setTimeout(() => setSuccessMessage(""), 3000);
                                    }}
                                    className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-sans text-xs tracking-wider uppercase transition-colors"
                                >
                                    Copy URL
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleDelete(previewItem.id);
                                    }}
                                    className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs tracking-wider uppercase transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
