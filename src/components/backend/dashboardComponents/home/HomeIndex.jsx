"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HOME_SECTION_METADATA, DEFAULT_HOME_SECTIONS } from "@/data/homeDefaults";
import HeroSectionManager from "./HeroSectionManager";

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

            const res = await fetch("/api/home/upload", {
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

export default function HomeIndex() {
    const [sections, setSections] = useState(DEFAULT_HOME_SECTIONS);
    const [activeTab, setActiveTab] = useState("hero");
    const [heroAddSignal, setHeroAddSignal] = useState(0);
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
            const res = await fetch("/api/home");
            const data = await res.json();
            if (res.ok && data.sections) {
                setSections(data.sections);
            }
        } catch {
            showToast("error", "Failed to load Home page content from server.");
        } finally {
            setLoading(false);
        }
    };

    const handleSectionChange = (sectionKey, newContent) => {
        setSections((prev) => ({
            ...prev,
            [sectionKey]: newContent,
        }));
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
        if (sectionKey === "hero") {
            showToast("success", "Hero banners are auto-saved directly via the Hero system.");
            return;
        }
        setSavingTab(true);
        try {
            const res = await fetch(`/api/home/${sectionKey}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: sections[sectionKey] }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast("success", `Section "${HOME_SECTION_METADATA.find(s => s.key === sectionKey)?.label || sectionKey}" updated successfully!`);
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
            const { hero, ...sectionsToSave } = sections;
            const res = await fetch("/api/home", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sections: sectionsToSave }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast("success", "All Home Page sections updated successfully!");
            } else {
                throw new Error(data.error || "Save failed");
            }
        } catch (err) {
            showToast("error", err.message || "Could not save changes.");
        } finally {
            setSavingAll(false);
        }
    };

    const currentMeta = HOME_SECTION_METADATA.find((s) => s.key === activeTab) || HOME_SECTION_METADATA[0];
    const currentData = sections[activeTab] || DEFAULT_HOME_SECTIONS[activeTab] || {};

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                            Home Page CMS
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        <span className="font-sans text-[10px] tracking-wider text-muted">
                            Complete Content Management
                        </span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl italic text-ink">Home Page CMS</h1>
                    <p className="mt-1 font-sans text-xs text-muted max-w-xl">
                        Manage all 12 sections of the Homepage dynamically. Update hero banners, studio intro, service cards, images, reviews, and FAQs without touching code.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <Link
                        href="/"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border bg-white text-ink text-xs font-sans tracking-wide hover:border-gold hover:text-gold transition-colors font-medium"
                    >
                        <span>Visit Live Home</span>
                        <span>↗</span>
                    </Link>

                    {activeTab === "hero" ? (
                        <button
                            type="button"
                            onClick={() => setHeroAddSignal((s) => s + 1)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-white text-xs font-sans uppercase tracking-wider font-semibold shadow-sm hover:bg-gold-deep transition-all cursor-pointer"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            <span>Add Hero Banner</span>
                        </button>
                    ) : (
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
                    )}

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
                        Homepage Sections
                    </p>

                    <nav className="space-y-1">
                        {HOME_SECTION_METADATA.map((meta, idx) => {
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
                            Select a section to edit its content and click Save Section.
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

                        <div className="flex items-center gap-2">
                            {activeTab === "hero" ? (
                                <button
                                    type="button"
                                    onClick={() => setHeroAddSignal((s) => s + 1)}
                                    className="px-4 py-2 rounded-xl bg-gold text-white text-xs font-sans uppercase tracking-wider font-semibold shadow-sm hover:bg-gold-deep transition-all cursor-pointer inline-flex items-center gap-1.5"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                    <span>Add New Hero</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => saveSection(activeTab)}
                                    disabled={savingTab || savingAll}
                                    className="px-4 py-2 rounded-xl bg-gold text-white text-xs font-sans uppercase tracking-wider font-semibold shadow-sm hover:bg-gold-deep transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {savingTab ? "Saving..." : "Save Section"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* SECTION 0: HERO BANNERS */}
                    {activeTab === "hero" && (
                        <HeroSectionManager
                            showToast={showToast}
                            openAddSignal={heroAddSignal}
                        />
                    )}

                    {/* SECTION 1: ABOUT */}
                    {activeTab === "about" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Main Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.heading || ""}
                                        onChange={(e) => handleFieldChange("about", "heading", e.target.value)}
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
                                        onChange={(e) => handleFieldChange("about", "headingHighlight", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Eyebrow Tagline
                                </label>
                                <input
                                    type="text"
                                    value={currentData.eyebrow || ""}
                                    onChange={(e) => handleFieldChange("about", "eyebrow", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Description Story
                                </label>
                                <textarea
                                    rows={3}
                                    value={currentData.description || ""}
                                    onChange={(e) => handleFieldChange("about", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            <ImageUploader
                                label="Featured Studio Photo"
                                value={currentData.image}
                                onChange={(url) => handleFieldChange("about", "image", url)}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Floating Badge Title
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.badgeTitle || ""}
                                        onChange={(e) => handleFieldChange("about", "badgeTitle", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Floating Badge Subtitle
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.badgeSubtitle || ""}
                                        onChange={(e) => handleFieldChange("about", "badgeSubtitle", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            {/* Stats Manager */}
                            <div className="space-y-3 pt-4 border-t border-border/60">
                                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                    Key Metric Numbers (Counters)
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {(currentData.stats || []).map((st, idx) => (
                                        <div key={idx} className="p-3.5 rounded-2xl border border-border bg-secondary/15 space-y-2">
                                            <input
                                                type="text"
                                                value={st.number || ""}
                                                onChange={(e) => {
                                                    const updated = [...(currentData.stats || [])];
                                                    updated[idx] = { ...updated[idx], number: e.target.value };
                                                    handleFieldChange("about", "stats", updated);
                                                }}
                                                placeholder="e.g. 25k+"
                                                className="w-full px-3 py-1.5 rounded-lg border border-border text-xs font-bold text-ink bg-white"
                                            />
                                            <input
                                                type="text"
                                                value={st.label || ""}
                                                onChange={(e) => {
                                                    const updated = [...(currentData.stats || [])];
                                                    updated[idx] = { ...updated[idx], label: e.target.value };
                                                    handleFieldChange("about", "stats", updated);
                                                }}
                                                placeholder="e.g. Happy Clients"
                                                className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink bg-white"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 2: SERVICES */}
                    {activeTab === "services" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.heading || ""}
                                        onChange={(e) => handleFieldChange("services", "heading", e.target.value)}
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
                                        onChange={(e) => handleFieldChange("services", "headingHighlight", e.target.value)}
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
                                    onChange={(e) => handleFieldChange("services", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            {/* Service Cards List */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                        Service Showcase Cards ({currentData.items?.length || 0})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...(currentData.items || [])];
                                            updated.push({
                                                title: "New Service Category",
                                                subtitle: "Description of service category",
                                                image: "/assets/images/new/home/services/salon-service.webp",
                                                href: "/services",
                                            });
                                            handleFieldChange("services", "items", updated);
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 text-xs font-semibold hover:bg-gold hover:text-white transition-all cursor-pointer"
                                    >
                                        + Add Card
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {(currentData.items || []).map((card, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-border bg-secondary/10 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-bold text-gold-deep">
                                                    Card #{idx + 1}
                                                </span>
                                                <div className="flex items-center gap-1.5">
                                                    {idx > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updated = [...(currentData.items || [])];
                                                                const temp = updated[idx - 1];
                                                                updated[idx - 1] = updated[idx];
                                                                updated[idx] = temp;
                                                                handleFieldChange("services", "items", updated);
                                                            }}
                                                            className="px-2 py-0.5 rounded bg-white border border-border text-[10px]"
                                                        >
                                                            ↑ Up
                                                        </button>
                                                    )}
                                                    {idx < (currentData.items?.length || 0) - 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updated = [...(currentData.items || [])];
                                                                const temp = updated[idx + 1];
                                                                updated[idx + 1] = updated[idx];
                                                                updated[idx] = temp;
                                                                handleFieldChange("services", "items", updated);
                                                            }}
                                                            className="px-2 py-0.5 rounded bg-white border border-border text-[10px]"
                                                        >
                                                            ↓ Down
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updated = currentData.items.filter((_, i) => i !== idx);
                                                            handleFieldChange("services", "items", updated);
                                                        }}
                                                        className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px] hover:bg-rose-100"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Card Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={card.title || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], title: e.target.value };
                                                            handleFieldChange("services", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Target Link (URL)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={card.href || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], href: e.target.value };
                                                            handleFieldChange("services", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Subtitle / Tags Text
                                                </label>
                                                <input
                                                    type="text"
                                                    value={card.subtitle || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], subtitle: e.target.value };
                                                        handleFieldChange("services", "items", updated);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                />
                                            </div>

                                            <ImageUploader
                                                label="Card Background Image"
                                                value={card.image}
                                                onChange={(url) => {
                                                    const updated = [...(currentData.items || [])];
                                                    updated[idx] = { ...updated[idx], image: url };
                                                    handleFieldChange("services", "items", updated);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 3: GROOMING TILES */}
                    {activeTab === "grooming" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.title || ""}
                                        onChange={(e) => handleFieldChange("grooming", "title", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Background Watermark Word
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.bgWord || ""}
                                        onChange={(e) => handleFieldChange("grooming", "bgWord", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                    Beauty & Grooming Photo Tiles ({currentData.items?.length || 0})
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(currentData.items || []).map((tile, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-border bg-secondary/15 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-bold text-gold-deep">
                                                    Tile #{idx + 1}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Service Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={tile.name || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], name: e.target.value };
                                                            handleFieldChange("grooming", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Link
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={tile.href || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], href: e.target.value };
                                                            handleFieldChange("grooming", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <ImageUploader
                                                label="Tile Photo"
                                                value={tile.file}
                                                onChange={(url) => {
                                                    const updated = [...(currentData.items || [])];
                                                    updated[idx] = { ...updated[idx], file: url };
                                                    handleFieldChange("grooming", "items", updated);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 4: AESTHETICS */}
                    {activeTab === "aesthetics" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Section Eyebrow Number
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.sectionNumber || ""}
                                        onChange={(e) => handleFieldChange("aesthetics", "sectionNumber", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Brand Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.heading || ""}
                                        onChange={(e) => handleFieldChange("aesthetics", "heading", e.target.value)}
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
                                        onChange={(e) => handleFieldChange("aesthetics", "headingHighlight", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Tagline
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.tagline || ""}
                                        onChange={(e) => handleFieldChange("aesthetics", "tagline", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Background Watermark
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.bgWord || ""}
                                        onChange={(e) => handleFieldChange("aesthetics", "bgWord", e.target.value)}
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
                                    onChange={(e) => handleFieldChange("aesthetics", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            {/* Service Pills */}
                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Aesthetic Treatment Pills (Comma-Separated)
                                </label>
                                <input
                                    type="text"
                                    value={(currentData.services || []).join(", ")}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            "aesthetics",
                                            "services",
                                            e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                                        )
                                    }
                                    placeholder="Signature Facial, Hydra Facial, Laser Hair Removal, ..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            <ImageUploader
                                label="Featured Aesthetics Photo"
                                value={currentData.image}
                                onChange={(url) => handleFieldChange("aesthetics", "image", url)}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Floating Badge Title
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.badgeTitle || ""}
                                        onChange={(e) => handleFieldChange("aesthetics", "badgeTitle", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Floating Badge Subtitle
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.badgeSubtitle || ""}
                                        onChange={(e) => handleFieldChange("aesthetics", "badgeSubtitle", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 5: ACADEMY */}
                    {activeTab === "academy" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.heading || ""}
                                        onChange={(e) => handleFieldChange("academy", "heading", e.target.value)}
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
                                        onChange={(e) => handleFieldChange("academy", "headingHighlight", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Subtitle / Punchline
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.subtitle || ""}
                                        onChange={(e) => handleFieldChange("academy", "subtitle", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Button Text &amp; Link
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={currentData.btnText || ""}
                                            onChange={(e) => handleFieldChange("academy", "btnText", e.target.value)}
                                            placeholder="Explore Academy"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={currentData.btnLink || ""}
                                            onChange={(e) => handleFieldChange("academy", "btnLink", e.target.value)}
                                            placeholder="/academy"
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
                                    onChange={(e) => handleFieldChange("academy", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Course Tags (Comma-Separated)
                                </label>
                                <input
                                    type="text"
                                    value={(currentData.courses || []).join(", ")}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            "academy",
                                            "courses",
                                            e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                                        )
                                    }
                                    placeholder="Hair Course, Makeup Course, Beauty Course, ..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            <ImageUploader
                                label="Academy Showcase Photo"
                                value={currentData.image}
                                onChange={(url) => handleFieldChange("academy", "image", url)}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Floating Badge Title
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.badgeTitle || ""}
                                        onChange={(e) => handleFieldChange("academy", "badgeTitle", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Floating Badge Subtitle
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.badgeSubtitle || ""}
                                        onChange={(e) => handleFieldChange("academy", "badgeSubtitle", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 6: CELEBRITY */}
                    {activeTab === "celebrity" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Eyebrow
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.eyebrow || ""}
                                        onChange={(e) => handleFieldChange("celebrity", "eyebrow", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Tagline
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.tagline || ""}
                                        onChange={(e) => handleFieldChange("celebrity", "tagline", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Heading
                                </label>
                                <input
                                    type="text"
                                    value={currentData.heading || ""}
                                    onChange={(e) => handleFieldChange("celebrity", "heading", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={currentData.description || ""}
                                    onChange={(e) => handleFieldChange("celebrity", "description", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                />
                            </div>

                            {/* Celebrity Slides List */}
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                        Celebrity Lookbook Carousel Images ({currentData.slides?.length || 0})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...(currentData.slides || [])];
                                            updated.push("/assets/images/new/home/celebrity/celebrity-artist-01.webp");
                                            handleFieldChange("celebrity", "slides", updated);
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 text-xs font-semibold hover:bg-gold hover:text-white transition-all cursor-pointer"
                                    >
                                        + Add Photo
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(currentData.slides || []).map((slideUrl, idx) => (
                                        <div key={idx} className="p-3.5 rounded-2xl border border-border bg-secondary/15 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-bold text-gold-deep">
                                                    Slide #{idx + 1}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = currentData.slides.filter((_, i) => i !== idx);
                                                        handleFieldChange("celebrity", "slides", updated);
                                                    }}
                                                    className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px]"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <ImageUploader
                                                value={slideUrl}
                                                onChange={(url) => {
                                                    const updated = [...(currentData.slides || [])];
                                                    updated[idx] = url;
                                                    handleFieldChange("celebrity", "slides", updated);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 7: LOCATIONS */}
                    {activeTab === "locations" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.heading || ""}
                                        onChange={(e) => handleFieldChange("locations", "heading", e.target.value)}
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
                                        onChange={(e) => handleFieldChange("locations", "headingHighlight", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                    Salon Branches ({currentData.items?.length || 0})
                                </label>

                                <div className="space-y-4">
                                    {(currentData.items || []).map((loc, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-border bg-secondary/10 space-y-3">
                                            <span className="font-mono text-xs font-bold text-gold-deep">
                                                Branch #{idx + 1}
                                            </span>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Branch Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={loc.name || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], name: e.target.value };
                                                            handleFieldChange("locations", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={loc.phone || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], phone: e.target.value };
                                                            handleFieldChange("locations", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Address Details
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={loc.address || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], address: e.target.value };
                                                        handleFieldChange("locations", "items", updated);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Directions / Maps URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={loc.directionsUrl || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], directionsUrl: e.target.value };
                                                        handleFieldChange("locations", "items", updated);
                                                    }}
                                                    placeholder="https://maps.google.com/..."
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 8: PARALLAX BANNER */}
                    {activeTab === "banner" && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Quote Text
                                </label>
                                <input
                                    type="text"
                                    value={currentData.quote || ""}
                                    onChange={(e) => handleFieldChange("banner", "quote", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold font-serif italic text-sm"
                                />
                            </div>

                            <ImageUploader
                                label="Parallax Background Image"
                                value={currentData.image}
                                onChange={(url) => handleFieldChange("banner", "image", url)}
                            />
                        </div>
                    )}

                    {/* SECTION 9: REVIEWS */}
                    {activeTab === "reviews" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Eyebrow
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.eyebrow || ""}
                                        onChange={(e) => handleFieldChange("reviews", "eyebrow", e.target.value)}
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
                                            onChange={(e) => handleFieldChange("reviews", "heading", e.target.value)}
                                            placeholder="What our"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={currentData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("reviews", "headingHighlight", e.target.value)}
                                            placeholder="guests say"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                        Client Reviews ({currentData.items?.length || 0})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...(currentData.items || [])];
                                            updated.push({
                                                quote: "Wonderful salon experience with exceptional results.",
                                                author: "Client Name",
                                                service: "Luxury Hair Styling",
                                                rating: 5,
                                            });
                                            handleFieldChange("reviews", "items", updated);
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 text-xs font-semibold hover:bg-gold hover:text-white transition-all cursor-pointer"
                                    >
                                        + Add Review
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {(currentData.items || []).map((rev, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-border bg-secondary/10 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-bold text-gold-deep">
                                                    Review #{idx + 1}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = currentData.items.filter((_, i) => i !== idx);
                                                        handleFieldChange("reviews", "items", updated);
                                                    }}
                                                    className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px]"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Review Quote
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={rev.quote || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], quote: e.target.value };
                                                        handleFieldChange("reviews", "items", updated);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Author Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={rev.author || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], author: e.target.value };
                                                            handleFieldChange("reviews", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Service Tag
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={rev.service || ""}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], service: e.target.value };
                                                            handleFieldChange("reviews", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                        Star Rating (1 - 5)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        max={5}
                                                        value={rev.rating || 5}
                                                        onChange={(e) => {
                                                            const updated = [...(currentData.items || [])];
                                                            updated[idx] = { ...updated[idx], rating: Number(e.target.value) };
                                                            handleFieldChange("reviews", "items", updated);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 10: FAQ */}
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
                                            placeholder="Questions,"
                                            className="w-full px-3 py-2 rounded-xl border border-border text-xs bg-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={currentData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("faq", "headingHighlight", e.target.value)}
                                            placeholder="answered."
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

                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                        FAQ Accordion Items ({currentData.items?.length || 0})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...(currentData.items || [])];
                                            updated.push({
                                                q: "New frequently asked question?",
                                                a: "Detailed answer explaining the policy, booking, or salon service.",
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
                                                <div className="flex items-center gap-1.5">
                                                    {idx > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updated = [...(currentData.items || [])];
                                                                const temp = updated[idx - 1];
                                                                updated[idx - 1] = updated[idx];
                                                                updated[idx] = temp;
                                                                handleFieldChange("faq", "items", updated);
                                                            }}
                                                            className="px-2 py-0.5 rounded bg-white border border-border text-[10px]"
                                                        >
                                                            ↑ Up
                                                        </button>
                                                    )}
                                                    {idx < (currentData.items?.length || 0) - 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updated = [...(currentData.items || [])];
                                                                const temp = updated[idx + 1];
                                                                updated[idx + 1] = updated[idx];
                                                                updated[idx] = temp;
                                                                handleFieldChange("faq", "items", updated);
                                                            }}
                                                            className="px-2 py-0.5 rounded bg-white border border-border text-[10px]"
                                                        >
                                                            ↓ Down
                                                        </button>
                                                    )}
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
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    value={faqItem.q || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], q: e.target.value };
                                                        handleFieldChange("faq", "items", updated);
                                                    }}
                                                    placeholder="Question text..."
                                                    className="w-full px-3 py-2 rounded-lg border border-border text-xs font-semibold bg-white"
                                                />
                                            </div>
                                            <div>
                                                <textarea
                                                    rows={2}
                                                    value={faqItem.a || ""}
                                                    onChange={(e) => {
                                                        const updated = [...(currentData.items || [])];
                                                        updated[idx] = { ...updated[idx], a: e.target.value };
                                                        handleFieldChange("faq", "items", updated);
                                                    }}
                                                    placeholder="Answer text..."
                                                    className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 11: BOOKING CONCIERGE BANNER */}
                    {activeTab === "booking" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Eyebrow
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.eyebrow || ""}
                                        onChange={(e) => handleFieldChange("booking", "eyebrow", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.heading || ""}
                                        onChange={(e) => handleFieldChange("booking", "heading", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Timing Details
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.subtext || ""}
                                        onChange={(e) => handleFieldChange("booking", "subtext", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Locations Covered Text
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.locationsText || ""}
                                        onChange={(e) => handleFieldChange("booking", "locationsText", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-ink mb-1.5">
                                        Hotline Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={currentData.phone || ""}
                                        onChange={(e) => handleFieldChange("booking", "phone", e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink bg-secondary/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-ink">
                                    Booking Concierge Carousel Slides ({currentData.slideshow?.length || 0})
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(currentData.slideshow || []).map((slide, idx) => (
                                        <div key={idx} className="p-3.5 rounded-2xl border border-border bg-secondary/15 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-bold text-gold-deep">
                                                    Slide #{idx + 1}
                                                </span>
                                            </div>

                                            <ImageUploader
                                                value={slide.src || slide}
                                                onChange={(url) => {
                                                    const updated = [...(currentData.slideshow || [])];
                                                    updated[idx] = {
                                                        src: url,
                                                        alt: slide.alt || `KNK Look ${idx + 1}`,
                                                    };
                                                    handleFieldChange("booking", "slideshow", updated);
                                                }}
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
                        {activeTab === "hero" ? (
                            <button
                                type="button"
                                onClick={() => setHeroAddSignal((s) => s + 1)}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold text-white text-xs font-sans uppercase tracking-wider font-semibold shadow-sm hover:bg-gold-deep transition-all cursor-pointer"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                                <span>Add New Hero Banner</span>
                            </button>
                        ) : (
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
