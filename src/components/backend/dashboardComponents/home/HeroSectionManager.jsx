"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const MAX_IMAGE_MB = 5;
const MAX_VIDEO_MB = 50;

export default function HeroSectionManager({ showToast, openAddSignal }) {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [togglingId, setTogglingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [confirmId, setConfirmId] = useState(null);

    // Add Modal State
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [addFile, setAddFile] = useState(null);
    const [addPreview, setAddPreview] = useState(null);
    const [addMediaType, setAddMediaType] = useState("image");
    const [addAltText, setAddAltText] = useState("");
    const [addIsActive, setAddIsActive] = useState(true);
    const [addSaving, setAddSaving] = useState(false);
    const [addError, setAddError] = useState("");
    const [isAddDragging, setIsAddDragging] = useState(false);
    const addFileInputRef = useRef(null);

    // Edit Modal State
    const [editingHero, setEditingHero] = useState(null);
    const [editFile, setEditFile] = useState(null);
    const [editPreview, setEditPreview] = useState(null);
    const [editMediaType, setEditMediaType] = useState("image");
    const [editAltText, setEditAltText] = useState("");
    const [editIsActive, setEditIsActive] = useState(true);
    const [editSaving, setEditSaving] = useState(false);
    const [editError, setEditError] = useState("");
    const [isEditDragging, setIsEditDragging] = useState(false);
    const editFileInputRef = useRef(null);

    useEffect(() => {
        loadHeroes();
    }, []);

    useEffect(() => {
        if (openAddSignal && openAddSignal > 0) {
            resetAddForm();
            setIsAddOpen(true);
        }
    }, [openAddSignal]);

    const loadHeroes = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/hero");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load heroes.");
            setHeroes(data.heroes || []);
        } catch (err) {
            setError(err.message || "Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (hero) => {
        setTogglingId(hero.id);
        try {
            const fd = new FormData();
            fd.append("altText", hero.alt_text);
            fd.append("isActive", !hero.is_active);
            const res = await fetch(`/api/hero/${hero.id}`, { method: "PATCH", body: fd });
            if (!res.ok) throw new Error();
            setHeroes((prev) =>
                prev.map((h) => (h.id === hero.id ? { ...h, is_active: h.is_active ? 0 : 1 } : h))
            );
            if (showToast) {
                showToast("success", `Hero banner status updated to ${hero.is_active ? "Draft" : "Active"}.`);
            }
        } catch {
            if (showToast) showToast("error", "Couldn't update hero status.");
        } finally {
            setTogglingId(null);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/hero/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            setHeroes((prev) => prev.filter((h) => h.id !== id));
            if (showToast) showToast("success", "Hero banner deleted successfully.");
        } catch {
            if (showToast) showToast("error", "Couldn't delete this banner.");
        } finally {
            setDeletingId(null);
            setConfirmId(null);
        }
    };

    const resetAddForm = () => {
        setAddFile(null);
        setAddPreview(null);
        setAddMediaType("image");
        setAddAltText("");
        setAddIsActive(true);
        setAddError("");
        if (addFileInputRef.current) addFileInputRef.current.value = "";
    };

    const processAddFile = (file) => {
        if (!file) return;
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");
        if (!isVideo && !isImage) {
            setAddError("Please upload an image (JPG, PNG, WEBP) or video (MP4, WEBM).");
            return;
        }

        const maxBytes = isVideo ? MAX_VIDEO_MB * 1024 * 1024 : MAX_IMAGE_MB * 1024 * 1024;
        if (file.size > maxBytes) {
            setAddError(`File too large. Max ${isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB}MB.`);
            return;
        }

        setAddError("");
        setAddMediaType(isVideo ? "video" : "image");
        setAddFile(file);
        setAddPreview(URL.createObjectURL(file));
    };

    const handleCreateHero = async (e) => {
        e.preventDefault();
        setAddError("");

        if (!addFile) {
            setAddError("Please select an image or video file.");
            return;
        }
        if (!addAltText.trim()) {
            setAddError("Alt text / description is required.");
            return;
        }

        setAddSaving(true);
        try {
            const payload = new FormData();
            payload.append("media", addFile);
            payload.append("altText", addAltText.trim());
            payload.append("isActive", addIsActive);

            const res = await fetch("/api/hero", { method: "POST", body: payload });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to create hero banner.");

            if (showToast) showToast("success", "Hero banner created and published!");
            setIsAddOpen(false);
            resetAddForm();
            loadHeroes();
        } catch (err) {
            setAddError(err.message || "Network error. Please try again.");
        } finally {
            setAddSaving(false);
        }
    };

    const openEdit = (hero) => {
        setEditingHero(hero);
        setEditFile(null);
        setEditPreview(hero.media_url);
        setEditMediaType(hero.media_type || (hero.media_url?.endsWith(".mp4") || hero.media_url?.endsWith(".webm") ? "video" : "image"));
        setEditAltText(hero.alt_text || "");
        setEditIsActive(Boolean(hero.is_active));
        setEditError("");
        if (editFileInputRef.current) editFileInputRef.current.value = "";
    };

    const processEditFile = (file) => {
        if (!file) return;
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");
        if (!isVideo && !isImage) {
            setEditError("Please upload an image (JPG, PNG, WEBP) or video (MP4, WEBM).");
            return;
        }

        const maxBytes = isVideo ? MAX_VIDEO_MB * 1024 * 1024 : MAX_IMAGE_MB * 1024 * 1024;
        if (file.size > maxBytes) {
            setEditError(`File too large. Max ${isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB}MB.`);
            return;
        }

        setEditError("");
        setEditMediaType(isVideo ? "video" : "image");
        setEditFile(file);
        setEditPreview(URL.createObjectURL(file));
    };

    const handleUpdateHero = async (e) => {
        e.preventDefault();
        setEditError("");

        if (!editAltText.trim()) {
            setEditError("Alt text / description is required.");
            return;
        }

        setEditSaving(true);
        try {
            const payload = new FormData();
            if (editFile) payload.append("media", editFile);
            payload.append("altText", editAltText.trim());
            payload.append("isActive", editIsActive);

            const res = await fetch(`/api/hero/${editingHero.id}`, { method: "PATCH", body: payload });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update hero banner.");

            if (showToast) showToast("success", "Hero banner updated successfully!");
            setEditingHero(null);
            loadHeroes();
        } catch (err) {
            setEditError(err.message || "Network error. Please try again.");
        } finally {
            setEditSaving(false);
        }
    };

    const activeCount = heroes.filter((h) => h.is_active).length;

    return (
        <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-secondary/15 p-4 rounded-2xl border border-border/70">
                <div>
                    <h3 className="font-display text-xl italic text-ink">Hero Video & Image Banners</h3>
                    <p className="font-sans text-xs text-muted mt-0.5">
                        {loading
                            ? "Loading banners..."
                            : `${heroes.length} total banner${heroes.length === 1 ? "" : "s"} · ${activeCount} currently active on homepage`}
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={() => {
                            resetAddForm();
                            setIsAddOpen(true);
                        }}
                        className="inline-flex items-center gap-2 bg-gold text-white font-sans text-xs tracking-wider uppercase px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-gold-deep transition-all cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        <span>Add New Hero</span>
                    </button>

                    <Link
                        href="/admin/hero"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-border bg-white text-ink text-xs font-sans hover:border-gold hover:text-gold transition-colors font-medium"
                        title="Open full page view in new tab"
                    >
                        <span>Full Page</span>
                        <span className="text-[10px]">↗</span>
                    </Link>
                </div>
            </div>

            {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                    {error}
                </div>
            )}

            {/* Content Display */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="aspect-video rounded-2xl bg-secondary/20 animate-pulse border border-border" />
                    ))}
                </div>
            ) : heroes.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center bg-secondary/15 rounded-2xl py-14 px-6 border border-dashed border-border">
                    <div className="h-12 w-12 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center mb-3">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                            <path d="M12 3c-4 2-6 5-6 9a6 6 0 0 0 12 0c0-4-2-7-6-9Z" />
                        </svg>
                    </div>
                    <p className="font-display text-lg italic text-ink mb-1">No hero banners yet</p>
                    <p className="font-sans text-xs text-muted mb-4 max-w-sm">
                        Add your first banner slide to showcase your luxury salon on the homepage hero.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            resetAddForm();
                            setIsAddOpen(true);
                        }}
                        className="inline-flex items-center gap-2 bg-gold text-white font-sans text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl font-semibold hover:bg-gold-deep transition-all cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        <span>Add First Hero Banner</span>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {heroes.map((hero) => (
                        <div
                            key={hero.id}
                            className="bg-white rounded-2xl overflow-hidden border border-border shadow-soft flex flex-col transition-all hover:border-gold/50"
                        >
                            {/* Media Preview Box */}
                            <div className="relative aspect-video bg-ink/90 overflow-hidden shrink-0">
                                {hero.media_type === "video" ? (
                                    <video src={hero.media_url} className="h-full w-full object-cover" muted loop autoPlay />
                                ) : (
                                    <img src={hero.media_url} alt={hero.alt_text} className="h-full w-full object-cover" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />

                                <span className="absolute top-2.5 left-2.5 bg-ink/80 backdrop-blur-sm text-cream font-sans text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full font-semibold">
                                    {hero.media_type}
                                </span>

                                <span
                                    className={`absolute top-2.5 right-2.5 font-sans text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full font-semibold shadow-sm ${
                                        hero.is_active ? "bg-emerald-600 text-white" : "bg-neutral-500 text-white"
                                    }`}
                                >
                                    {hero.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {/* Card Content & Actions */}
                            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                <p className="font-sans text-xs text-ink font-medium line-clamp-2">
                                    {hero.alt_text || "Hero Banner"}
                                </p>

                                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                    {/* Toggle Active Switch */}
                                    <button
                                        type="button"
                                        onClick={() => handleToggleStatus(hero)}
                                        disabled={togglingId === hero.id}
                                        className={`relative h-5 w-9 rounded-full transition-colors shrink-0 cursor-pointer disabled:opacity-50 ${
                                            hero.is_active ? "bg-gold" : "bg-neutral-300"
                                        }`}
                                        title={hero.is_active ? "Click to set as inactive" : "Click to activate on homepage"}
                                    >
                                        <span
                                            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                                                hero.is_active ? "translate-x-4" : "translate-x-0.5"
                                            }`}
                                        />
                                    </button>

                                    {/* Edit / Delete Buttons */}
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => openEdit(hero)}
                                            className="px-3 py-1.5 rounded-lg border border-border hover:border-gold text-ink text-xs font-sans font-medium transition-colors cursor-pointer"
                                        >
                                            Edit
                                        </button>

                                        {confirmId === hero.id ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(hero.id)}
                                                    disabled={deletingId === hero.id}
                                                    className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-sans font-semibold cursor-pointer disabled:opacity-50"
                                                >
                                                    {deletingId === hero.id ? "..." : "Confirm"}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setConfirmId(null)}
                                                    className="px-2 py-1.5 text-xs text-muted hover:text-ink cursor-pointer font-sans"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setConfirmId(hero.id)}
                                                className="px-2.5 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-sans font-medium transition-colors cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ADD HERO MODAL */}
            {isAddOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-card w-full max-w-lg rounded-3xl border border-border shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
                            <div>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-gold-deep font-bold">
                                    Homepage CMS
                                </span>
                                <h3 className="font-display text-2xl italic text-ink">Add New Hero Banner</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAddOpen(false)}
                                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-ink cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {addError && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans">
                                {addError}
                            </div>
                        )}

                        <form onSubmit={handleCreateHero} className="space-y-4">
                            {/* File Upload / Preview Dropzone */}
                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Media File (Video or Image) <span className="text-rose-500">*</span>
                                </label>

                                {addPreview ? (
                                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-ink">
                                        {addMediaType === "video" ? (
                                            <video src={addPreview} className="h-full w-full object-cover" muted autoPlay loop />
                                        ) : (
                                            <img src={addPreview} alt="Preview" className="h-full w-full object-cover" />
                                        )}
                                        <div className="absolute top-3 left-3 bg-ink/70 text-white text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full">
                                            {addMediaType}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => addFileInputRef.current?.click()}
                                            className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-ink text-xs font-sans font-semibold px-3 py-1.5 rounded-full shadow-md cursor-pointer transition-colors"
                                        >
                                            Change Media
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            setIsAddDragging(true);
                                        }}
                                        onDragLeave={() => setIsAddDragging(false)}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            setIsAddDragging(false);
                                            processAddFile(e.dataTransfer.files?.[0]);
                                        }}
                                        onClick={() => addFileInputRef.current?.click()}
                                        className={`border-2 border-dashed rounded-2xl py-10 px-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 ${
                                            isAddDragging
                                                ? "border-gold bg-gold/5"
                                                : "border-border hover:border-gold hover:bg-secondary/20"
                                        }`}
                                    >
                                        <div className="h-10 w-10 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                                                <path d="M12 16V4M12 4l-4 4M12 4l4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                                            </svg>
                                        </div>
                                        <p className="font-sans text-xs font-medium text-ink">
                                            Click to browse or drag & drop media
                                        </p>
                                        <p className="font-sans text-[11px] text-muted">
                                            JPG, PNG, WEBP (max {MAX_IMAGE_MB}MB) · MP4, WEBM (max {MAX_VIDEO_MB}MB)
                                        </p>
                                    </div>
                                )}

                                <input
                                    ref={addFileInputRef}
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.webp,.mp4,.webm"
                                    onChange={(e) => processAddFile(e.target.files?.[0])}
                                    className="hidden"
                                />
                            </div>

                            {/* Alt Text / Title */}
                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Alt Text / Caption <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={addAltText}
                                    onChange={(e) => setAddAltText(e.target.value)}
                                    placeholder="e.g. Luxury Bridal Makeup Awadh"
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    required
                                />
                                <p className="font-sans text-[10px] text-muted mt-1">
                                    Describe the banner for accessibility and SEO.
                                </p>
                            </div>

                            {/* Active Toggle */}
                            <div className="flex items-center justify-between pt-2">
                                <div>
                                    <span className="block font-sans text-xs font-semibold text-ink">
                                        Active on Homepage
                                    </span>
                                    <span className="font-sans text-[10px] text-muted">
                                        Show this banner live on the website right away.
                                    </span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={addIsActive}
                                        onChange={(e) => setAddIsActive(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                                </label>
                            </div>

                            {/* Submit & Cancel */}
                            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border/60">
                                <button
                                    type="button"
                                    onClick={() => setIsAddOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-border text-xs font-sans font-medium text-ink hover:bg-secondary/40 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={addSaving}
                                    className="px-5 py-2.5 rounded-xl bg-gold text-white text-xs font-sans uppercase tracking-wider font-semibold hover:bg-gold-deep transition-all cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
                                >
                                    {addSaving ? (
                                        <>
                                            <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <span>Publish Banner</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* EDIT HERO MODAL */}
            {editingHero && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-card w-full max-w-lg rounded-3xl border border-border shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
                            <div>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-gold-deep font-bold">
                                    Homepage CMS
                                </span>
                                <h3 className="font-display text-2xl italic text-ink">Edit Hero Banner</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingHero(null)}
                                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-ink cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {editError && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans">
                                {editError}
                            </div>
                        )}

                        <form onSubmit={handleUpdateHero} className="space-y-4">
                            {/* Media Preview & Replace */}
                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Media File
                                </label>
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-ink">
                                    {editMediaType === "video" ? (
                                        <video src={editPreview} className="h-full w-full object-cover" muted autoPlay loop />
                                    ) : (
                                        <img src={editPreview} alt="Preview" className="h-full w-full object-cover" />
                                    )}
                                    <div className="absolute top-3 left-3 bg-ink/70 text-white text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full">
                                        {editMediaType}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => editFileInputRef.current?.click()}
                                        className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-ink text-xs font-sans font-semibold px-3 py-1.5 rounded-full shadow-md cursor-pointer transition-colors"
                                    >
                                        Replace Media
                                    </button>
                                </div>
                                <input
                                    ref={editFileInputRef}
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.webp,.mp4,.webm"
                                    onChange={(e) => processEditFile(e.target.files?.[0])}
                                    className="hidden"
                                />
                            </div>

                            {/* Alt Text / Title */}
                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Alt Text / Caption <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={editAltText}
                                    onChange={(e) => setEditAltText(e.target.value)}
                                    placeholder="e.g. Luxury Bridal Makeup Awadh"
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    required
                                />
                            </div>

                            {/* Active Toggle */}
                            <div className="flex items-center justify-between pt-2">
                                <div>
                                    <span className="block font-sans text-xs font-semibold text-ink">
                                        Active on Homepage
                                    </span>
                                    <span className="font-sans text-[10px] text-muted">
                                        When turned off, banner will be saved as draft.
                                    </span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editIsActive}
                                        onChange={(e) => setEditIsActive(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                                </label>
                            </div>

                            {/* Submit & Cancel */}
                            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border/60">
                                <button
                                    type="button"
                                    onClick={() => setEditingHero(null)}
                                    className="px-4 py-2.5 rounded-xl border border-border text-xs font-sans font-medium text-ink hover:bg-secondary/40 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editSaving}
                                    className="px-5 py-2.5 rounded-xl bg-gold text-white text-xs font-sans uppercase tracking-wider font-semibold hover:bg-gold-deep transition-all cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
                                >
                                    {editSaving ? (
                                        <>
                                            <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <span>Update Banner</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
