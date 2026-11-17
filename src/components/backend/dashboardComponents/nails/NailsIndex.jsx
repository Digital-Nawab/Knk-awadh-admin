"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    NAILS_SECTION_METADATA,
    DEFAULT_NAILS_SECTIONS,
} from "@/data/nailsDefaults";

function MediaUploader({ label, value, onChange, accept = "image/*,video/*", helperText }) {
    const fileRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [uploadErr, setUploadErr] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const isVideo = value && (value.endsWith(".mp4") || value.endsWith(".webm") || value.includes("video"));

    const handleFile = async (file) => {
        if (!file) return;
        setUploading(true);
        setUploadErr("");
        setUploadSuccess(false);

        try {
            const fd = new FormData();
            fd.append("file", file);

            const res = await fetch("/api/admin/nails/upload", {
                method: "POST",
                body: fd,
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Upload failed");
            }

            onChange(data.url, data.type);
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 5000);
        } catch (err) {
            setUploadErr(err.message || "Failed to upload file.");
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                    {label}
                </label>
            )}

            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative h-20 w-28 rounded-xl overflow-hidden border border-border bg-ink/5 shrink-0 shadow-sm">
                        {isVideo ? (
                            <video src={value} className="h-full w-full object-cover" controls preload="metadata" muted />
                        ) : (
                            <img src={value} alt="Preview" className="h-full w-full object-cover" />
                        )}
                    </div>
                ) : (
                    <div className="h-20 w-28 rounded-xl border border-dashed border-border bg-ink/5 flex items-center justify-center text-[10px] text-muted shrink-0">
                        No Media
                    </div>
                )}

                <div className="flex-1 w-full space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            disabled={uploading}
                            className="px-4 py-2 rounded-xl bg-gold/15 text-gold-deep border border-gold/30 hover:bg-gold hover:text-white font-sans text-xs tracking-wider uppercase font-semibold transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {uploading ? "Uploading..." : (value ? "Change Asset" : "Upload Asset")}
                        </button>
                        {value && (
                            <button
                                type="button"
                                onClick={() => onChange("", "image")}
                                className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 bg-rose-50/60 hover:bg-rose-100 font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <input
                        ref={fileRef}
                        type="file"
                        accept={accept}
                        onChange={(e) => handleFile(e.target.files?.[0])}
                        className="hidden"
                    />

                    {helperText && <p className="text-[11px] text-muted font-sans">{helperText}</p>}
                    {uploadErr && <p className="text-[11px] text-rose-600 font-sans">{uploadErr}</p>}
                    {uploadSuccess && (
                        <p className="text-[11px] text-emerald-700 font-sans font-medium">
                            ✓ Uploaded successfully! Click &ldquo;Save Section&rdquo; below to persist changes.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function NailsIndex() {
    const [sections, setSections] = useState(DEFAULT_NAILS_SECTIONS);
    const [activeTab, setActiveTab] = useState("hero");
    const [loading, setLoading] = useState(true);
    const [savingTab, setSavingTab] = useState(false);
    const [savingAll, setSavingAll] = useState(false);
    const [toast, setToast] = useState({ type: "", message: "" });

    // Showcase card add/edit modal state
    const [editingCardIndex, setEditingCardIndex] = useState(null);
    const [cardModalOpen, setCardModalOpen] = useState(false);
    const [cardForm, setCardForm] = useState({
        id: "",
        title: "",
        category: "Nails",
        filter_category: "Art & French",
        short_desc: "",
        description: "",
        image: "/assets/images/services/nail-art.webp",
        highlights: "Bespoke, High Gloss, UV-Cured",
        url: "/services/nails/nail-art",
        display_order: 1,
    });

    useEffect(() => {
        loadData();
    }, []);

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast({ type: "", message: "" }), 4000);
    };

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/nails");
            const data = await res.json();
            if (res.ok && data.sections) {
                setSections(data.sections);
            }
        } catch {
            showToast("error", "Failed to load Nails Services content from database.");
        } finally {
            setLoading(false);
        }
    };

    const handleFieldChange = (sectionKey, field, val) => {
        setSections((prev) => ({
            ...prev,
            [sectionKey]: {
                ...(prev[sectionKey] || {}),
                [field]: val,
            },
        }));
    };

    const saveSection = async (sectionKey) => {
        setSavingTab(true);
        try {
            const res = await fetch(`/api/admin/nails/${sectionKey}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: sections[sectionKey] }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast(
                    "success",
                    `Section "${NAILS_SECTION_METADATA.find((s) => s.key === sectionKey)?.label || sectionKey}" saved successfully!`
                );
            } else {
                throw new Error(data.error || "Save failed");
            }
        } catch (err) {
            showToast("error", err.message || "Could not save section.");
        } finally {
            setSavingTab(false);
        }
    };

    const saveAllSections = async () => {
        setSavingAll(true);
        try {
            const res = await fetch("/api/admin/nails", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: sections }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast("success", "All Nails Services sections saved successfully!");
            } else {
                throw new Error(data.error || "Save all failed");
            }
        } catch (err) {
            showToast("error", err.message || "Could not save all sections.");
        } finally {
            setSavingAll(false);
        }
    };

    // Showcase CRUD
    const openAddCard = () => {
        const nextOrder = (sections.showcase?.items?.length || 0) + 1;
        setCardForm({
            id: `nail-${Date.now()}`,
            title: "",
            category: "Nails",
            filter_category: "Art & French",
            short_desc: "",
            description: "",
            image: "/assets/images/services/nail-art.webp",
            highlights: "Handcrafted, Luxury Finish",
            url: "/services/nails/nail-art",
            display_order: nextOrder,
        });
        setEditingCardIndex(null);
        setCardModalOpen(true);
    };

    const openEditCard = (index) => {
        const card = sections.showcase?.items?.[index];
        if (!card) return;
        setCardForm({
            id: card.id || `nail-${index}`,
            title: card.title || "",
            category: card.category || "Nails",
            filter_category: card.filter_category || card.filterCategory || "Art & French",
            short_desc: card.short_desc || card.shortDesc || "",
            description: card.description || card.moreDesc || "",
            image: card.image || "",
            highlights: Array.isArray(card.highlights) ? card.highlights.join(", ") : (card.highlights || ""),
            url: card.url || `/services/nails/${card.id || "nail-art"}`,
            display_order: card.display_order || index + 1,
        });
        setEditingCardIndex(index);
        setCardModalOpen(true);
    };

    const handleSaveCard = (e) => {
        e.preventDefault();
        if (!cardForm.title.trim()) {
            showToast("error", "Card title is required.");
            return;
        }

        const highlightsArr = cardForm.highlights
            ? cardForm.highlights.split(",").map((s) => s.trim()).filter(Boolean)
            : [];

        const newCard = {
            ...cardForm,
            highlights: highlightsArr,
            display_order: parseInt(cardForm.display_order, 10) || 1,
        };

        const currentItems = [...(sections.showcase?.items || [])];

        if (editingCardIndex !== null && editingCardIndex >= 0) {
            currentItems[editingCardIndex] = newCard;
        } else {
            currentItems.push(newCard);
        }

        // Sort by display_order
        currentItems.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

        handleFieldChange("showcase", "items", currentItems);
        setCardModalOpen(false);
        showToast("success", "Card updated in memory. Remember to click 'Save Section'.");
    };

    const handleDeleteCard = (index) => {
        if (!confirm("Are you sure you want to delete this service card?")) return;
        const currentItems = [...(sections.showcase?.items || [])];
        currentItems.splice(index, 1);
        handleFieldChange("showcase", "items", currentItems);
        showToast("success", "Card removed. Remember to click 'Save Section'.");
    };

    // Treatment Menu CRUD
    const handleAddMenuCategory = () => {
        const catName = prompt("Enter new category tab name (e.g., 'Spa Rituals'):");
        if (!catName || !catName.trim()) return;
        const categories = [...(sections.menu?.categories || [])];
        categories.push({ category: catName.trim(), items: ["New Treatment Item"] });
        handleFieldChange("menu", "categories", categories);
    };

    const handleDeleteMenuCategory = (catIdx) => {
        if (!confirm("Delete this category tab and its items?")) return;
        const categories = [...(sections.menu?.categories || [])];
        categories.splice(catIdx, 1);
        handleFieldChange("menu", "categories", categories);
    };

    const handleAddMenuItem = (catIdx) => {
        const itemName = prompt("Enter item name (e.g. 'French Ombre Nail Polish'):");
        if (!itemName || !itemName.trim()) return;
        const categories = [...(sections.menu?.categories || [])];
        categories[catIdx].items = [...(categories[catIdx].items || []), itemName.trim()];
        handleFieldChange("menu", "categories", categories);
    };

    const handleDeleteMenuItem = (catIdx, itemIdx) => {
        const categories = [...(sections.menu?.categories || [])];
        categories[catIdx].items.splice(itemIdx, 1);
        handleFieldChange("menu", "categories", categories);
    };

    if (loading) {
        return (
            <div className="p-8 sm:p-12 space-y-6 max-w-6xl mx-auto">
                <div className="h-8 w-64 bg-border/40 rounded-lg animate-pulse" />
                <div className="h-12 w-full bg-border/30 rounded-xl animate-pulse" />
                <div className="h-96 w-full bg-border/20 rounded-2xl animate-pulse" />
            </div>
        );
    }

    const hero = sections.hero || {};
    const showcase = sections.showcase || {};
    const menu = sections.menu || {};
    const processSteps = sections.process || {};
    const cta = sections.cta || {};

    return (
        <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 font-sans">
            {/* Toast notification */}
            {toast.message && (
                <div
                    className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl font-sans text-xs font-semibold tracking-wide border flex items-center gap-3 transition-all ${
                        toast.type === "success"
                            ? "bg-emerald-900/95 text-emerald-100 border-emerald-500/40"
                            : "bg-rose-900/95 text-rose-100 border-rose-500/40"
                    }`}
                >
                    <span>{toast.type === "success" ? "✓" : "⚠"}</span>
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <Link href="/admin/dashboard" className="text-xs text-muted hover:text-gold transition-colors">
                            Dashboard
                        </Link>
                        <span className="text-muted text-xs">/</span>
                        <span className="text-xs font-medium text-gold-deep">Nails Services CMS</span>
                    </div>
                    <h1 className="font-display italic text-3xl sm:text-4xl text-ink font-medium">
                        Nails Services Management
                    </h1>
                    <p className="font-sans text-xs sm:text-sm text-muted mt-1">
                        Dedicated CMS for <code className="bg-ink/5 px-2 py-0.5 rounded text-gold-deep">/services/nails</code>. Powered by dedicated table <code className="bg-ink/5 px-2 py-0.5 rounded font-mono text-emerald-700">nails_sections</code>.
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <Link
                        href="/services/nails"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gold/40 text-gold-deep hover:bg-gold/10 font-sans text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                        <span>View Live Page</span>
                        <span>↗</span>
                    </Link>

                    <button
                        type="button"
                        onClick={saveAllSections}
                        disabled={savingAll}
                        className="px-5 py-2.5 rounded-xl bg-gold text-white hover:bg-gold-deep font-sans text-xs font-semibold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {savingAll ? "Saving All..." : "Save All Sections"}
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-border pb-3">
                {NAILS_SECTION_METADATA.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2.5 rounded-xl font-sans text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                                isActive
                                    ? "bg-ink text-gold shadow-sm"
                                    : "bg-white text-muted border border-border hover:border-gold hover:text-ink"
                            }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* TAB CONTENT */}

            {/* 1. HERO SECTION */}
            {activeTab === "hero" && (
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border space-y-8 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/70 pb-4">
                        <div>
                            <h2 className="font-display text-2xl italic text-ink">Hero Banner & Video/Image</h2>
                            <p className="font-sans text-xs text-muted mt-1">
                                Customize the top hero area. Supports live video or high-res image with synchronized poster thumbnail.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => saveSection("hero")}
                            disabled={savingTab}
                            className="px-5 py-2 rounded-xl bg-gold text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-gold-deep transition-all cursor-pointer disabled:opacity-50"
                        >
                            {savingTab ? "Saving..." : "Save Section"}
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Eyebrow Tag
                            </label>
                            <input
                                type="text"
                                value={hero.eyebrow || ""}
                                onChange={(e) => handleFieldChange("hero", "eyebrow", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                                placeholder="Precision Nail Architecture"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Title Prefix
                            </label>
                            <input
                                type="text"
                                value={hero.titlePrefix || ""}
                                onChange={(e) => handleFieldChange("hero", "titlePrefix", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                                placeholder="Nails,"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Title Highlight (Italic Gold)
                            </label>
                            <input
                                type="text"
                                value={hero.titleHighlight || ""}
                                onChange={(e) => handleFieldChange("hero", "titleHighlight", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                                placeholder="done right."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Media Type (Image vs Video)
                            </label>
                            <select
                                value={hero.mediaType || "image"}
                                onChange={(e) => handleFieldChange("hero", "mediaType", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold cursor-pointer"
                            >
                                <option value="image">Static Image</option>
                                <option value="video">Cinematic Video (MP4 / WebM)</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                value={hero.description || ""}
                                onChange={(e) => handleFieldChange("hero", "description", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                                placeholder="Gel, acrylic, extensions or a simple mani-pedi..."
                            />
                        </div>
                    </div>

                    {/* Media Configuration */}
                    <div className="pt-6 border-t border-border/70 space-y-6">
                        <h3 className="font-display text-xl italic text-ink">Hero Media Assets</h3>

                        {hero.mediaType === "video" ? (
                            <div className="grid sm:grid-cols-2 gap-6 bg-[#faf7f2] p-6 rounded-2xl border border-border">
                                <div>
                                    <MediaUploader
                                        label="Hero Video File (MP4 / WebM)"
                                        value={hero.videoUrl || ""}
                                        accept="video/mp4,video/webm"
                                        helperText="Upload the new hero video here. Old video and stale caches are automatically superseded."
                                        onChange={(url) => {
                                            handleFieldChange("hero", "videoUrl", url);
                                            handleFieldChange("hero", "mediaUrl", url);
                                        }}
                                    />
                                    <div className="mt-3">
                                        <label className="block text-[11px] font-medium text-muted mb-1">
                                            Or enter video URL directly:
                                        </label>
                                        <input
                                            type="text"
                                            value={hero.videoUrl || ""}
                                            onChange={(e) => {
                                                handleFieldChange("hero", "videoUrl", e.target.value);
                                                handleFieldChange("hero", "mediaUrl", e.target.value);
                                            }}
                                            className="w-full bg-white border border-border rounded-lg px-3 py-2 text-xs outline-none focus:border-gold"
                                            placeholder="/admin-assets/nails/video.mp4"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <MediaUploader
                                        label="Synchronized Video Poster / Thumbnail"
                                        value={hero.posterUrl || ""}
                                        accept="image/*"
                                        helperText="Display preview image before video plays. Always kept synchronized with current video."
                                        onChange={(url) => {
                                            handleFieldChange("hero", "posterUrl", url);
                                            handleFieldChange("hero", "thumbnailUrl", url);
                                        }}
                                    />
                                    <div className="mt-3">
                                        <label className="block text-[11px] font-medium text-muted mb-1">
                                            Or enter poster image URL:
                                        </label>
                                        <input
                                            type="text"
                                            value={hero.posterUrl || ""}
                                            onChange={(e) => {
                                                handleFieldChange("hero", "posterUrl", e.target.value);
                                                handleFieldChange("hero", "thumbnailUrl", e.target.value);
                                            }}
                                            className="w-full bg-white border border-border rounded-lg px-3 py-2 text-xs outline-none focus:border-gold"
                                            placeholder="/admin-assets/nails/poster.webp"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#faf7f2] p-6 rounded-2xl border border-border">
                                <MediaUploader
                                    label="Hero Image (High Quality WEBP / JPG / PNG)"
                                    value={hero.image || "/assets/images/new/service/NAILS.webp"}
                                    accept="image/*"
                                    helperText="Appears on the right side of the hero section."
                                    onChange={(url) => handleFieldChange("hero", "image", url)}
                                />
                                <div className="mt-3 max-w-md">
                                    <label className="block text-[11px] font-medium text-muted mb-1">
                                        Or enter image URL:
                                    </label>
                                    <input
                                        type="text"
                                        value={hero.image || ""}
                                        onChange={(e) => handleFieldChange("hero", "image", e.target.value)}
                                        className="w-full bg-white border border-border rounded-lg px-3 py-2 text-xs outline-none focus:border-gold"
                                        placeholder="/assets/images/new/service/NAILS.webp"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="pt-6 border-t border-border/70 space-y-4">
                        <h3 className="font-display text-xl italic text-ink">Action Buttons</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                    Primary Button Text
                                </label>
                                <input
                                    type="text"
                                    value={hero.btn1Text || "Book Now"}
                                    onChange={(e) => handleFieldChange("hero", "btn1Text", e.target.value)}
                                    className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                    Primary Button Link
                                </label>
                                <input
                                    type="text"
                                    value={hero.btn1Link || "#book"}
                                    onChange={(e) => handleFieldChange("hero", "btn1Link", e.target.value)}
                                    className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                    Secondary Button Text
                                </label>
                                <input
                                    type="text"
                                    value={hero.btn2Text || "View Nail Services"}
                                    onChange={(e) => handleFieldChange("hero", "btn2Text", e.target.value)}
                                    className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                    Secondary Button Link
                                </label>
                                <input
                                    type="text"
                                    value={hero.btn2Link || "#nail-services"}
                                    onChange={(e) => handleFieldChange("hero", "btn2Link", e.target.value)}
                                    className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. SHOWCASE CARDS */}
            {activeTab === "showcase" && (
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border space-y-8 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/70 pb-4 flex-wrap gap-4">
                        <div>
                            <h2 className="font-display text-2xl italic text-ink">Nails Services Showcase Cards</h2>
                            <p className="font-sans text-xs text-muted mt-1">
                                Manage the carousel cards: add, edit, reorder, or delete nails service items.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={openAddCard}
                                className="px-4 py-2 rounded-xl bg-ink text-gold font-sans text-xs uppercase tracking-wider font-semibold hover:bg-ink/80 transition-all cursor-pointer"
                            >
                                + Add Service Card
                            </button>
                            <button
                                type="button"
                                onClick={() => saveSection("showcase")}
                                disabled={savingTab}
                                className="px-5 py-2 rounded-xl bg-gold text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-gold-deep transition-all cursor-pointer disabled:opacity-50"
                            >
                                {savingTab ? "Saving..." : "Save Section"}
                            </button>
                        </div>
                    </div>

                    {/* Section Headings */}
                    <div className="grid sm:grid-cols-3 gap-6 bg-[#faf7f2] p-6 rounded-2xl border border-border">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Eyebrow
                            </label>
                            <input
                                type="text"
                                value={showcase.eyebrow || ""}
                                onChange={(e) => handleFieldChange("showcase", "eyebrow", e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={showcase.title || ""}
                                onChange={(e) => handleFieldChange("showcase", "title", e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Subtitle
                            </label>
                            <textarea
                                rows={2}
                                value={showcase.subtitle || ""}
                                onChange={(e) => handleFieldChange("showcase", "subtitle", e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {(showcase.items || []).map((card, idx) => (
                            <div
                                key={card.id || idx}
                                className="border border-border rounded-2xl overflow-hidden bg-[#faf7f2] flex flex-col justify-between shadow-sm hover:border-gold transition-all"
                            >
                                <div>
                                    <div className="relative aspect-[16/10] bg-ink/10 overflow-hidden">
                                        <img
                                            src={card.image || "/assets/images/services/nail-art.webp"}
                                            alt={card.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <span className="absolute top-2 left-2 bg-ink/80 text-cream text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full">
                                            {card.filter_category || card.filterCategory || "Nails"}
                                        </span>
                                        <span className="absolute top-2 right-2 bg-gold text-ink text-[10px] font-bold px-2 py-0.5 rounded-full">
                                            #{card.display_order || idx + 1}
                                        </span>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <h3 className="font-display text-lg italic text-ink font-semibold">
                                            {card.title}
                                        </h3>
                                        <p className="text-xs text-muted line-clamp-2">
                                            {card.short_desc || card.shortDesc}
                                        </p>
                                        {card.highlights && (
                                            <div className="flex flex-wrap gap-1 pt-1">
                                                {(Array.isArray(card.highlights) ? card.highlights : [card.highlights]).map((h, hIdx) => (
                                                    <span key={hIdx} className="text-[9px] bg-white border border-border px-2 py-0.5 rounded-full text-gold-deep">
                                                        ✦ {h}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 pt-0 border-t border-border/50 flex items-center justify-between gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => openEditCard(idx)}
                                        className="px-3 py-1.5 rounded-lg border border-gold/40 text-gold-deep hover:bg-gold hover:text-white text-xs font-semibold transition-all cursor-pointer"
                                    >
                                        Edit Card
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteCard(idx)}
                                        className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-all cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 3. TREATMENT MENU */}
            {activeTab === "menu" && (
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border space-y-8 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/70 pb-4 flex-wrap gap-4">
                        <div>
                            <h2 className="font-display text-2xl italic text-ink">Treatment Menu ("The full menu")</h2>
                            <p className="font-sans text-xs text-muted mt-1">
                                Manage categories and treatment items in the editorial menu tabs.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleAddMenuCategory}
                                className="px-4 py-2 rounded-xl bg-ink text-gold font-sans text-xs uppercase tracking-wider font-semibold hover:bg-ink/80 transition-all cursor-pointer"
                            >
                                + Add Category Tab
                            </button>
                            <button
                                type="button"
                                onClick={() => saveSection("menu")}
                                disabled={savingTab}
                                className="px-5 py-2 rounded-xl bg-gold text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-gold-deep transition-all cursor-pointer disabled:opacity-50"
                            >
                                {savingTab ? "Saving..." : "Save Section"}
                            </button>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6 bg-[#faf7f2] p-6 rounded-2xl border border-border">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Eyebrow
                            </label>
                            <input
                                type="text"
                                value={menu.eyebrow || "What We Do"}
                                onChange={(e) => handleFieldChange("menu", "eyebrow", e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Title Prefix
                            </label>
                            <input
                                type="text"
                                value={menu.title || "Our nail"}
                                onChange={(e) => handleFieldChange("menu", "title", e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Title Highlight (Italic Gold)
                            </label>
                            <input
                                type="text"
                                value={menu.titleHighlight || "services."}
                                onChange={(e) => handleFieldChange("menu", "titleHighlight", e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    {/* Category Tabs & Items List */}
                    <div className="space-y-6 pt-4">
                        {(menu.categories || []).map((cat, catIdx) => (
                            <div key={catIdx} className="bg-[#faf7f2] p-6 rounded-2xl border border-border space-y-4">
                                <div className="flex items-center justify-between border-b border-border/60 pb-3 flex-wrap gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className="font-sans text-xs font-bold uppercase tracking-wider text-gold-deep">
                                            Tab {catIdx + 1}:
                                        </span>
                                        <input
                                            type="text"
                                            value={cat.category}
                                            onChange={(e) => {
                                                const cats = [...menu.categories];
                                                cats[catIdx].category = e.target.value;
                                                handleFieldChange("menu", "categories", cats);
                                            }}
                                            className="bg-white border border-border rounded-lg px-3 py-1.5 font-display text-lg font-medium outline-none focus:border-gold"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleAddMenuItem(catIdx)}
                                            className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold-deep hover:bg-gold hover:text-white text-xs font-semibold transition-all cursor-pointer"
                                        >
                                            + Add Item
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteMenuCategory(catIdx)}
                                            className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-all cursor-pointer"
                                        >
                                            Delete Tab
                                        </button>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {(cat.items || []).map((item, itemIdx) => (
                                        <div
                                            key={itemIdx}
                                            className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-border text-xs"
                                        >
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const cats = [...menu.categories];
                                                    cats[catIdx].items[itemIdx] = e.target.value;
                                                    handleFieldChange("menu", "categories", cats);
                                                }}
                                                className="bg-transparent border-0 outline-none w-full font-sans text-xs"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteMenuItem(catIdx, itemIdx)}
                                                className="text-rose-500 hover:text-rose-700 font-bold ml-2 cursor-pointer"
                                                title="Delete item"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 4. PROCESS STEPS */}
            {activeTab === "process" && (
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border space-y-8 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/70 pb-4">
                        <div>
                            <h2 className="font-display text-2xl italic text-ink">Process Steps ("How It Works")</h2>
                            <p className="font-sans text-xs text-muted mt-1">
                                Customize the 4 steps guiding clients from booking to glowing finish.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => saveSection("process")}
                            disabled={savingTab}
                            className="px-5 py-2 rounded-xl bg-gold text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-gold-deep transition-all cursor-pointer disabled:opacity-50"
                        >
                            {savingTab ? "Saving..." : "Save Section"}
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6 bg-[#faf7f2] p-6 rounded-2xl border border-border">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Eyebrow
                            </label>
                            <input
                                type="text"
                                value={processSteps.eyebrow || "How It Works"}
                                onChange={(e) => handleFieldChange("process", "eyebrow", e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Title Prefix
                            </label>
                            <input
                                type="text"
                                value={processSteps.title || "Simple, from"}
                                onChange={(e) => handleFieldChange("process", "title", e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Title Highlight
                            </label>
                            <input
                                type="text"
                                value={processSteps.titleHighlight || "start to finish."}
                                onChange={(e) => handleFieldChange("process", "titleHighlight", e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                        {(processSteps.steps || []).map((step, idx) => (
                            <div key={idx} className="bg-[#faf7f2] p-5 rounded-2xl border border-border space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-display text-2xl italic text-gold">Step</span>
                                    <input
                                        type="text"
                                        value={step.n || `0${idx + 1}`}
                                        onChange={(e) => {
                                            const stepsArr = [...processSteps.steps];
                                            stepsArr[idx].n = e.target.value;
                                            handleFieldChange("process", "steps", stepsArr);
                                        }}
                                        className="w-14 text-center font-display text-xl italic text-gold-deep bg-white border border-border rounded-lg px-2 py-1 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={step.title || ""}
                                        onChange={(e) => {
                                            const stepsArr = [...processSteps.steps];
                                            stepsArr[idx].title = e.target.value;
                                            handleFieldChange("process", "steps", stepsArr);
                                        }}
                                        className="w-full bg-white border border-border rounded-lg px-3 py-2 text-xs font-semibold outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={step.text || ""}
                                        onChange={(e) => {
                                            const stepsArr = [...processSteps.steps];
                                            stepsArr[idx].text = e.target.value;
                                            handleFieldChange("process", "steps", stepsArr);
                                        }}
                                        className="w-full bg-white border border-border rounded-lg px-3 py-2 text-xs outline-none focus:border-gold"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 5. CALL TO ACTION (CTA) */}
            {activeTab === "cta" && (
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border space-y-8 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/70 pb-4">
                        <div>
                            <h2 className="font-display text-2xl italic text-ink">Call to Action (CTA)</h2>
                            <p className="font-sans text-xs text-muted mt-1">
                                Manage the bottom conversion banner: telephone, WhatsApp concierge, and invitation copy.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => saveSection("cta")}
                            disabled={savingTab}
                            className="px-5 py-2 rounded-xl bg-gold text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-gold-deep transition-all cursor-pointer disabled:opacity-50"
                        >
                            {savingTab ? "Saving..." : "Save Section"}
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Eyebrow
                            </label>
                            <input
                                type="text"
                                value={cta.eyebrow || "Ready When You Are"}
                                onChange={(e) => handleFieldChange("cta", "eyebrow", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Title Prefix
                            </label>
                            <input
                                type="text"
                                value={cta.title || "Let's find"}
                                onChange={(e) => handleFieldChange("cta", "title", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Title Highlight (Italic Gold)
                            </label>
                            <input
                                type="text"
                                value={cta.titleHighlight || "your look."}
                                onChange={(e) => handleFieldChange("cta", "titleHighlight", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Description
                            </label>
                            <textarea
                                rows={2}
                                value={cta.description || ""}
                                onChange={(e) => handleFieldChange("cta", "description", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={cta.phone || "+919559321711"}
                                onChange={(e) => handleFieldChange("cta", "phone", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                Call Button Label
                            </label>
                            <input
                                type="text"
                                value={cta.phoneText || "Call Now"}
                                onChange={(e) => handleFieldChange("cta", "phoneText", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                WhatsApp Link
                            </label>
                            <input
                                type="text"
                                value={cta.whatsapp || "https://wa.me/918881000552"}
                                onChange={(e) => handleFieldChange("cta", "whatsapp", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                                WhatsApp Button Label
                            </label>
                            <input
                                type="text"
                                value={cta.whatsappText || "Chat on WhatsApp"}
                                onChange={(e) => handleFieldChange("cta", "whatsappText", e.target.value)}
                                className="w-full bg-[#faf7f2] border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-gold"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* SHOWCASE CARD EDIT/ADD MODAL */}
            {cardModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-border my-8">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h3 className="font-display text-2xl italic text-ink font-medium">
                                {editingCardIndex !== null ? "Edit Service Card" : "Add New Service Card"}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setCardModalOpen(false)}
                                className="text-muted hover:text-ink text-2xl font-bold leading-none cursor-pointer"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSaveCard} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-muted mb-1">
                                        Card Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={cardForm.title}
                                        onChange={(e) => setCardForm({ ...cardForm, title: e.target.value })}
                                        className="w-full bg-[#faf7f2] border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                                        placeholder="e.g. Russian Gel Manicure"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase text-muted mb-1">
                                        Filter Category
                                    </label>
                                    <input
                                        type="text"
                                        value={cardForm.filter_category}
                                        onChange={(e) => setCardForm({ ...cardForm, filter_category: e.target.value })}
                                        className="w-full bg-[#faf7f2] border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                                        placeholder="Art & French / Gel & Acrylic / Spa & Care"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase text-muted mb-1">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        value={cardForm.display_order}
                                        onChange={(e) => setCardForm({ ...cardForm, display_order: e.target.value })}
                                        className="w-full bg-[#faf7f2] border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase text-muted mb-1">
                                        Highlights (comma separated tags)
                                    </label>
                                    <input
                                        type="text"
                                        value={cardForm.highlights}
                                        onChange={(e) => setCardForm({ ...cardForm, highlights: e.target.value })}
                                        className="w-full bg-[#faf7f2] border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                                        placeholder="Parisian Chic, High Gloss, Bespoke Apex"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold uppercase text-muted mb-1">
                                        Short Description
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={cardForm.short_desc}
                                        onChange={(e) => setCardForm({ ...cardForm, short_desc: e.target.value })}
                                        className="w-full bg-[#faf7f2] border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                                        placeholder="Brief summary visible on the card"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold uppercase text-muted mb-1">
                                        Full Description (Read More)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={cardForm.description}
                                        onChange={(e) => setCardForm({ ...cardForm, description: e.target.value })}
                                        className="w-full bg-[#faf7f2] border border-border rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-gold"
                                        placeholder="Detailed explanation expanding when 'Read More' is clicked"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <MediaUploader
                                        label="Service Image"
                                        value={cardForm.image}
                                        accept="image/*"
                                        onChange={(url) => setCardForm({ ...cardForm, image: url })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                                <button
                                    type="button"
                                    onClick={() => setCardModalOpen(false)}
                                    className="px-4 py-2 rounded-xl border border-border text-muted hover:text-ink text-xs font-semibold uppercase transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-gold text-white hover:bg-gold-deep text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                                >
                                    Save Card
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
