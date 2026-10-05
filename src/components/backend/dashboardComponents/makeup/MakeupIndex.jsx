"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MAKEUP_SECTION_METADATA, DEFAULT_MAKEUP_SECTIONS } from "@/data/makeupDefaults";

function ImageUploader({ label, value, onChange, accept = "image/*" }) {
    const fileRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [uploadErr, setUploadErr] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFile = async (file) => {
        if (!file) return;
        setUploading(true);
        setUploadErr("");
        setUploadSuccess(false);

        try {
            const fd = new FormData();
            fd.append("file", file);

            const res = await fetch("/api/makeup/upload", {
                method: "POST",
                body: fd,
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Upload failed");
            }

            onChange(data.url);
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 6000);
        } catch (err) {
            setUploadErr(err.message || "Failed to upload asset.");
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

            <div className="flex items-center gap-3">
                {/* Preview */}
                {value ? (
                    <div className="relative h-16 w-20 rounded-xl overflow-hidden border border-border bg-ink/5 shrink-0">
                        {value.endsWith(".webm") || value.endsWith(".mp4") ? (
                            <video src={value} className="h-full w-full object-cover" muted />
                        ) : (
                            <img src={value} alt="Preview" className="h-full w-full object-cover" />
                        )}
                    </div>
                ) : (
                    <div className="h-16 w-20 rounded-xl border border-dashed border-border bg-ink/5 flex items-center justify-center text-[10px] text-muted shrink-0">
                        No Image
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
                            {uploading ? "Uploading..." : (value ? "Change File" : "Upload File")}
                        </button>
                        {value && (
                            <button
                                type="button"
                                onClick={() => onChange("")}
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

                    {uploadErr && (
                        <p className="text-[11px] text-rose-600 font-sans">{uploadErr}</p>
                    )}
                    {uploadSuccess && (
                        <p className="text-[11px] text-emerald-700 font-sans font-medium animate-fadeIn">
                            ✓ File uploaded! Click &ldquo;Save Section&rdquo; below to save changes.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function MakeupIndex() {
    const [sections, setSections] = useState(DEFAULT_MAKEUP_SECTIONS);
    const [activeTab, setActiveTab] = useState("hero");
    const [loading, setLoading] = useState(true);
    const [savingTab, setSavingTab] = useState(false);
    const [savingAll, setSavingAll] = useState(false);
    const [toast, setToast] = useState({ type: "", message: "" });

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
            const res = await fetch("/api/makeup");
            const data = await res.json();
            if (res.ok && data.sections) {
                setSections(data.sections);
            }
        } catch {
            showToast("error", "Failed to load Makeup page content from server.");
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
            const res = await fetch(`/api/makeup/${sectionKey}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: sections[sectionKey] }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast("success", `Section "${MAKEUP_SECTION_METADATA.find(s => s.key === sectionKey)?.label || sectionKey}" updated successfully!`);
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
            const res = await fetch("/api/makeup", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sections }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast("success", "All Makeup Page sections updated successfully!");
            } else {
                throw new Error(data.error || "Save failed");
            }
        } catch (err) {
            showToast("error", err.message || "Could not save changes.");
        } finally {
            setSavingAll(false);
        }
    };

    const currentMeta = MAKEUP_SECTION_METADATA.find((s) => s.key === activeTab) || MAKEUP_SECTION_METADATA[0];
    const currentData = sections[activeTab] || DEFAULT_MAKEUP_SECTIONS[activeTab] || {};

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                            Makeup Page CMS
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        <span className="font-sans text-[10px] tracking-wider text-muted">
                            Bridal & Artistry Module
                        </span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl italic text-ink">Makeup Page CMS</h1>
                    <p className="mt-1 font-sans text-xs text-muted max-w-xl">
                        Manage all 8 sections of the Bridal & Celebrity Makeup page. Update looks, pricing, trends, portfolio galleries, FAQs, and wedding styles.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <Link
                        href="/makeup"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border bg-white text-ink text-xs font-sans tracking-wide hover:border-gold hover:text-gold transition-colors font-medium"
                    >
                        <span>Visit Live Makeup</span>
                        <span>↗</span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => saveSection(activeTab)}
                        disabled={savingTab || savingAll}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-white text-xs font-sans uppercase tracking-wider font-semibold shadow-sm hover:bg-gold-deep transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {savingTab ? (
                            <>
                                <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Saving Section...</span>
                            </>
                        ) : (
                            <span>Save Current Section</span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={saveAllSections}
                        disabled={savingTab || savingAll}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream text-xs font-sans uppercase tracking-wider font-semibold shadow-sm hover:bg-ink/80 transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {savingAll ? (
                            <>
                                <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Saving All...</span>
                            </>
                        ) : (
                            <span>Save All Changes</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Toast Alerts */}
            {toast.message && (
                <div
                    className={`p-4 rounded-2xl flex items-center justify-between text-xs font-sans transition-all animate-fadeIn ${
                        toast.type === "success"
                            ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                            : "bg-rose-50 border border-rose-200 text-rose-800"
                    }`}
                >
                    <div className="flex items-center gap-2.5">
                        <span className="font-bold text-sm">
                            {toast.type === "success" ? "✓" : "⚠"}
                        </span>
                        <span>{toast.message}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setToast({ type: "", message: "" })}
                        className="text-xs opacity-60 hover:opacity-100"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Main Tabs & Form Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Navigation Column */}
                <div className="lg:col-span-3 space-y-1.5 bg-card/60 border border-border/80 rounded-3xl p-3 shadow-soft sticky top-6">
                    <p className="px-3 py-2 text-[10px] font-sans uppercase tracking-[0.25em] text-muted font-bold">
                        Makeup Sections
                    </p>

                    <nav className="space-y-1">
                        {MAKEUP_SECTION_METADATA.map((meta, idx) => {
                            const isActive = activeTab === meta.key;
                            return (
                                <button
                                    key={meta.key}
                                    type="button"
                                    onClick={() => setActiveTab(meta.key)}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-sans text-xs transition-all text-left cursor-pointer ${
                                        isActive
                                            ? "bg-gold text-white font-semibold shadow-sm"
                                            : "text-ink/80 hover:bg-secondary/70 hover:text-ink font-medium"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 truncate">
                                        <span className={`text-[10px] font-mono ${isActive ? "text-white/80" : "text-muted"}`}>
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="truncate">{meta.label}</span>
                                    </div>
                                    {isActive && <span className="text-[10px]">●</span>}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="pt-3 border-t border-border/40 px-3">
                        <p className="text-[11px] text-muted leading-relaxed">
                            Click on any section to configure its titles, services, images, and FAQs.
                        </p>
                    </div>
                </div>

                {/* Right Form Editor Column */}
                <div className="lg:col-span-9 bg-card border border-border rounded-3xl p-6 sm:p-9 shadow-soft space-y-8">
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/60 pb-5">
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-deep font-bold">
                                Section Editor
                            </span>
                            <h2 className="font-display text-2xl sm:text-3xl italic text-ink">
                                {currentMeta.label}
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={() => saveSection(activeTab)}
                            disabled={savingTab || savingAll}
                            className="px-4 py-2 rounded-xl bg-gold text-white text-xs font-sans uppercase tracking-wider font-semibold shadow-sm hover:bg-gold-deep transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {savingTab ? "Saving..." : "Save Section"}
                        </button>
                    </div>

                    {/* SECTION 1: HERO */}
                    {activeTab === "hero" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Eyebrow
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.eyebrow || ""}
                                        onChange={(e) => handleFieldChange("hero", "eyebrow", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Tags / Trust Badges (Comma-Separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={(currentData.tags || []).join(", ")}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "hero",
                                                "tags",
                                                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.heading || ""}
                                        onChange={(e) => handleFieldChange("hero", "heading", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading Highlight (Italic)
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.headingHighlight || ""}
                                        onChange={(e) => handleFieldChange("hero", "headingHighlight", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={currentData.description || ""}
                                    onChange={(e) => handleFieldChange("hero", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Primary Button Text &amp; Link
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={currentData.btn1Text || ""}
                                            onChange={(e) => handleFieldChange("hero", "btn1Text", e.target.value)}
                                            placeholder="Book Makeup Appointment"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={currentData.btn1Link || ""}
                                            onChange={(e) => handleFieldChange("hero", "btn1Link", e.target.value)}
                                            placeholder="#book"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Secondary Button Text &amp; Link
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={currentData.btn2Text || ""}
                                            onChange={(e) => handleFieldChange("hero", "btn2Text", e.target.value)}
                                            placeholder="View Makeup Looks"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={currentData.btn2Link || ""}
                                            onChange={(e) => handleFieldChange("hero", "btn2Link", e.target.value)}
                                            placeholder="#portfolio"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                                <ImageUploader
                                    label="Hero Featured Image"
                                    value={currentData.image}
                                    onChange={(url) => handleFieldChange("hero", "image", url)}
                                />
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Object Position (CSS)
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.imagePosition || "center 15%"}
                                        onChange={(e) => handleFieldChange("hero", "imagePosition", e.target.value)}
                                        placeholder="e.g. center 15% or center top"
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 2: GALLERY */}
                    {activeTab === "gallery" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Eyebrow
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.eyebrow || ""}
                                        onChange={(e) => handleFieldChange("gallery", "eyebrow", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Occasions Tags Strip (Comma-Separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={(currentData.categories || []).join(", ")}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "gallery",
                                                "categories",
                                                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.heading || ""}
                                        onChange={(e) => handleFieldChange("gallery", "heading", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading Highlight (Italic)
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.headingHighlight || ""}
                                        onChange={(e) => handleFieldChange("gallery", "headingHighlight", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    rows={2}
                                    value={currentData.description || ""}
                                    onChange={(e) => handleFieldChange("gallery", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            {/* Gallery Items */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                        Gallery Photos ({currentData.items?.length || 0})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...(currentData.items || [])];
                                            updated.push({
                                                src: "/assets/images/new/home/bridal/1.webp",
                                                position: "center 20%",
                                                caption: "KNK Signature Artistry",
                                            });
                                            handleFieldChange("gallery", "items", updated);
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 text-xs font-semibold hover:bg-gold hover:text-white transition-all cursor-pointer"
                                    >
                                        + Add Photo
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(currentData.items || []).map((photo, idx) => (
                                        <div key={idx} className="p-3.5 rounded-2xl border border-border bg-secondary/15 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-bold text-gold-deep">
                                                    Photo #{idx + 1}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = currentData.items.filter((_, i) => i !== idx);
                                                        handleFieldChange("gallery", "items", updated);
                                                    }}
                                                    className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px]"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={photo.caption || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], caption: e.target.value };
                                                        handleFieldChange("gallery", "items", updated);
                                                    }}
                                                    placeholder="Caption text"
                                                    className="w-full px-2.5 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                />
                                                <input
                                                    type="text"
                                                    value={photo.position || "center 20%"}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], position: e.target.value };
                                                        handleFieldChange("gallery", "items", updated);
                                                    }}
                                                    placeholder="Position (e.g. center top)"
                                                    className="w-full px-2.5 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                />
                                            </div>

                                            <ImageUploader
                                                value={photo.src}
                                                onChange={(url) => {
                                                    const updated = [...(currentData.items || [])];
                                                    updated[idx] = { ...updated[idx], src: url };
                                                    handleFieldChange("gallery", "items", updated);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 3: TRENDS */}
                    {activeTab === "trends" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Eyebrow
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.eyebrow || ""}
                                        onChange={(e) => handleFieldChange("trends", "eyebrow", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={currentData.heading || ""}
                                            onChange={(e) => handleFieldChange("trends", "heading", e.target.value)}
                                            placeholder="Trendy Bridal"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={currentData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("trends", "headingHighlight", e.target.value)}
                                            placeholder="Makeup Looks in Lucknow"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={currentData.description || ""}
                                    onChange={(e) => handleFieldChange("trends", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            {/* Trends Cards */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                    Bridal Makeup Trend Cards ({currentData.items?.length || 0})
                                </label>

                                <div className="space-y-3">
                                    {(currentData.items || []).map((trend, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-border bg-secondary/10 space-y-2.5">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="text"
                                                    value={trend.number || `0${idx + 1}`}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], number: e.target.value };
                                                        handleFieldChange("trends", "items", updated);
                                                    }}
                                                    className="w-16 px-2.5 py-1.5 rounded-lg border border-border text-xs font-mono font-bold text-gold-deep bg-white"
                                                />
                                                <input
                                                    type="text"
                                                    value={trend.title || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], title: e.target.value };
                                                        handleFieldChange("trends", "items", updated);
                                                    }}
                                                    placeholder="Trend Title"
                                                    className="flex-1 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold bg-white"
                                                />
                                            </div>

                                            <textarea
                                                rows={2}
                                                value={trend.description || ""}
                                                onChange={(e) => {
                                                    const updated = [...(currentData.items || [])];
                                                    updated[idx] = { ...updated[idx], description: e.target.value };
                                                    handleFieldChange("trends", "items", updated);
                                                }}
                                                placeholder="Trend description..."
                                                className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 4: SIGNATURE (ATELIER) */}
                    {activeTab === "signature" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Eyebrow
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.eyebrow || ""}
                                        onChange={(e) => handleFieldChange("signature", "eyebrow", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={currentData.heading || ""}
                                            onChange={(e) => handleFieldChange("signature", "heading", e.target.value)}
                                            placeholder="Signature Makeup Services &"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={currentData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("signature", "headingHighlight", e.target.value)}
                                            placeholder="Occasions in Lucknow"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    rows={2}
                                    value={currentData.description || ""}
                                    onChange={(e) => handleFieldChange("signature", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            {/* Signature Cards */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                    Signature Atelier Services ({currentData.items?.length || 0})
                                </label>

                                <div className="space-y-4">
                                    {(currentData.items || []).map((srv, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-border bg-secondary/10 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-bold text-gold-deep">
                                                    Service #{idx + 1} ({srv.badge || srv.title})
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={srv.title || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], title: e.target.value };
                                                            handleFieldChange("signature", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white font-semibold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Subtitle
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={srv.subtitle || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], subtitle: e.target.value };
                                                            handleFieldChange("signature", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Badge Label
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={srv.badge || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], badge: e.target.value };
                                                            handleFieldChange("signature", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={srv.description || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], description: e.target.value };
                                                        handleFieldChange("signature", "items", updated);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Highlights (Comma-Separated)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={(srv.highlights || []).join(", ")}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = {
                                                                ...updated[idx],
                                                                highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                                                            };
                                                            handleFieldChange("signature", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        CTA Link URL
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={srv.url || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], url: e.target.value };
                                                            handleFieldChange("signature", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <ImageUploader
                                                label="Service Photo"
                                                value={srv.image}
                                                onChange={(url) => {
                                                    const updated = [...(currentData.items || [])];
                                                    updated[idx] = { ...updated[idx], image: url };
                                                    handleFieldChange("signature", "items", updated);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 5: STYLES */}
                    {activeTab === "styles" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Eyebrow
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.eyebrow || ""}
                                        onChange={(e) => handleFieldChange("styles", "eyebrow", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={currentData.heading || ""}
                                            onChange={(e) => handleFieldChange("styles", "heading", e.target.value)}
                                            placeholder="Bridal Makeup Styles for"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={currentData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("styles", "headingHighlight", e.target.value)}
                                            placeholder="Different Wedding Ceremonies"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    rows={2}
                                    value={currentData.description || ""}
                                    onChange={(e) => handleFieldChange("styles", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            {/* Wedding Styles Cards */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                    Bridal Styles Cards ({currentData.items?.length || 0})
                                </label>

                                <div className="space-y-4">
                                    {(currentData.items || []).map((style, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-border bg-secondary/10 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-bold text-gold-deep">
                                                    Style #{idx + 1}: {style.title}
                                                </span>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Style Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={style.title || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], title: e.target.value };
                                                        handleFieldChange("styles", "items", updated);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white font-semibold"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Style Description
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={style.text || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], text: e.target.value };
                                                        handleFieldChange("styles", "items", updated);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Best Suited Tags (Comma-Separated)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={(style.bestSuited || []).join(", ")}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = {
                                                            ...updated[idx],
                                                            bestSuited: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                                                        };
                                                        handleFieldChange("styles", "items", updated);
                                                    }}
                                                    placeholder="Heavy lehengas, Kundan jewellery, ..."
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                                                <ImageUploader
                                                    label="Style Look Photo"
                                                    value={style.image}
                                                    onChange={(url) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], image: url };
                                                        handleFieldChange("styles", "items", updated);
                                                    }}
                                                />
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Position
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={style.imagePosition || "center 20%"}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], imagePosition: e.target.value };
                                                            handleFieldChange("styles", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 6: BANNER */}
                    {activeTab === "banner" && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Alt Text
                                </label>
                                <input
                                    type="text"
                                    value={currentData.alt || ""}
                                    onChange={(e) => handleFieldChange("banner", "alt", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            <ImageUploader
                                label="Studio Break Banner Image"
                                value={currentData.src}
                                onChange={(url) => handleFieldChange("banner", "src", url)}
                            />
                        </div>
                    )}

                    {/* SECTION 7: FAQ */}
                    {activeTab === "faq" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Eyebrow
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.eyebrow || ""}
                                        onChange={(e) => handleFieldChange("faq", "eyebrow", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={currentData.heading || ""}
                                            onChange={(e) => handleFieldChange("faq", "heading", e.target.value)}
                                            placeholder="Bridal Makeup"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={currentData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("faq", "headingHighlight", e.target.value)}
                                            placeholder="FAQs in Lucknow"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    rows={2}
                                    value={currentData.description || ""}
                                    onChange={(e) => handleFieldChange("faq", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            {/* FAQ Items */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                        Makeup FAQ Accordion Items ({currentData.items?.length || 0})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...(currentData.items || [])];
                                            updated.push({
                                                q: "New bridal makeup question?",
                                                a: "Detailed answer explaining the makeup options, trial, and booking details.",
                                            });
                                            handleFieldChange("faq", "items", updated);
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 text-xs font-semibold hover:bg-gold hover:text-white transition-all cursor-pointer"
                                    >
                                        + Add FAQ
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {(currentData.items || []).map((faqItem, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-border bg-secondary/10 space-y-2.5">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-bold text-gold-deep">
                                                    Q#{idx + 1}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = currentData.items.filter((_, i) => i !== idx);
                                                        handleFieldChange("faq", "items", updated);
                                                    }}
                                                    className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px]"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            <input
                                                type="text"
                                                value={faqItem.q || ""}
                                                onChange={(e) => {
                                                    const updated = [...(currentData.items || [])];
                                                    updated[idx] = { ...updated[idx], q: e.target.value };
                                                    handleFieldChange("faq", "items", updated);
                                                }}
                                                placeholder="Question..."
                                                className="w-full px-3 py-2 rounded-lg border border-border text-xs font-semibold bg-white"
                                            />
                                            <textarea
                                                rows={2}
                                                value={faqItem.a || ""}
                                                onChange={(e) => {
                                                    const updated = [...(currentData.items || [])];
                                                    updated[idx] = { ...updated[idx], a: e.target.value };
                                                    handleFieldChange("faq", "items", updated);
                                                }}
                                                placeholder="Answer..."
                                                className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 8: TESTIMONIALS */}
                    {activeTab === "testimonials" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Eyebrow
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.eyebrow || ""}
                                        onChange={(e) => handleFieldChange("testimonials", "eyebrow", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={currentData.heading || ""}
                                            onChange={(e) => handleFieldChange("testimonials", "heading", e.target.value)}
                                            placeholder="Loved by"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={currentData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("testimonials", "headingHighlight", e.target.value)}
                                            placeholder="real brides."
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials List */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                        Brides Testimonials ({currentData.items?.length || 0})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...(currentData.items || [])];
                                            updated.push({
                                                name: "Bride Name",
                                                text: "The makeup was gorgeous and lasted through all the ceremonies.",
                                            });
                                            handleFieldChange("testimonials", "items", updated);
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 text-xs font-semibold hover:bg-gold hover:text-white transition-all cursor-pointer"
                                    >
                                        + Add Testimonial
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {(currentData.items || []).map((testim, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-border bg-secondary/10 space-y-2.5">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-bold text-gold-deep">
                                                    Bride #{idx + 1}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = currentData.items.filter((_, i) => i !== idx);
                                                        handleFieldChange("testimonials", "items", updated);
                                                    }}
                                                    className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px]"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            <input
                                                type="text"
                                                value={testim.name || ""}
                                                onChange={(e) => {
                                                    const updated = [...(currentData.items || [])];
                                                    updated[idx] = { ...updated[idx], name: e.target.value };
                                                    handleFieldChange("testimonials", "items", updated);
                                                }}
                                                placeholder="Bride's Name"
                                                className="w-full px-3 py-1.5 rounded-lg border border-border text-xs font-semibold bg-white"
                                            />
                                            <textarea
                                                rows={2}
                                                value={testim.text || ""}
                                                onChange={(e) => {
                                                    const updated = [...(currentData.items || [])];
                                                    updated[idx] = { ...updated[idx], text: e.target.value };
                                                    handleFieldChange("testimonials", "items", updated);
                                                }}
                                                placeholder="Testimonial text..."
                                                className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bottom Save Bar for Current Section */}
                    <div className="pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-3 bg-secondary/10 -mx-6 -mb-6 sm:-mx-9 sm:-mb-9 p-5 sm:p-7 rounded-b-3xl">
                        <div className="text-xs text-muted">
                            Section: <span className="font-semibold text-ink">{currentMeta.label}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => saveSection(activeTab)}
                            disabled={savingTab || savingAll}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold text-white text-xs font-sans uppercase tracking-wider font-semibold shadow-sm hover:bg-gold-deep transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {savingTab ? (
                                <>
                                    <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Saving Section...</span>
                                </>
                            ) : (
                                <span>Save {currentMeta.label}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
