"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_KB = 2048; // 2MB
const RECOMMENDED_WIDTH = 1200;
const RECOMMENDED_HEIGHT = 1500;

const DEFAULT_CATEGORIES = [
    { name: "Nails", slug: "nails" },
    { name: "Hair", slug: "hair" },
    { name: "Makeup", slug: "makeup" },
    { name: "Beauty", slug: "beauty" },
    { name: "Men's Grooming", slug: "men-grooming" },
    { name: "Aesthetics", slug: "aesthetic" },
    { name: "Facial", slug: "facial" },
    { name: "Body", slug: "body" },
];

const COMMON_FILTER_TABS = {
    Nails: ["Art & French", "Gel & Acrylic", "Spa & Care"],
    Hair: ["Styling", "Colour", "Treatments", "Spa"],
    Beauty: ["Skin Radiance", "Waxing", "Threading", "Body Care"],
};

function slugify(name) {
    if (!name) return "";
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export default function ServiceCreate() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState(null);
    const [fileError, setFileError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [form, setForm] = useState({
        name: "",
        slug: "",
        title: "",
        categoryId: "",
        categoryName: "Nails",
        categorySlug: "nails",
        filterCategory: "",
        displayOrder: "1",
        shortDesc: "",
        description: "",
        image: null,
        isActive: "1",
    });
    const [tags, setTags] = useState(["Parisian Chic", "High Gloss", "Bespoke Apex"]);
    const [newTagInput, setNewTagInput] = useState("");
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");
    const fileInputRef = useRef(null);

    // Fetch active categories
    useEffect(() => {
        fetch("/api/services/categories")
            .then((r) => r.json())
            .then((d) => {
                if (d.categories && Array.isArray(d.categories) && d.categories.length > 0) {
                    setCategories(d.categories);
                    setForm((prev) => {
                        if (!prev.categoryId) {
                            return {
                                ...prev,
                                categoryId: d.categories[0].id,
                                categoryName: d.categories[0].name,
                                categorySlug: d.categories[0].slug,
                            };
                        }
                        return prev;
                    });
                }
            })
            .catch(() => { });
    }, []);

    const slug = form.slug || slugify(form.name || "");

    const processFile = (file) => {
        if (!file) return;
        setFileError("");

        if (!IMAGE_TYPES.includes(file.type)) {
            setFileError("Only JPG, JPEG, PNG or WEBP images are allowed.");
            return;
        }
        const sizeKB = file.size / 1024;
        if (sizeKB > MAX_IMAGE_KB) {
            setFileError(`File too large (${(sizeKB / 1024).toFixed(2)}MB). Max allowed is 2MB (${MAX_IMAGE_KB}KB).`);
            return;
        }

        setPreview(URL.createObjectURL(file));
        setForm((prev) => ({ ...prev, image: file }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        processFile(e.dataTransfer.files?.[0]);
    };

    const addTag = () => {
        const trimmed = newTagInput.trim();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
            setNewTagInput("");
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((t) => t !== tagToRemove));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!form.name.trim()) {
            setFormError("Service name/title is required.");
            return;
        }
        if (!form.categoryName.trim()) {
            setFormError("Service category is required.");
            return;
        }
        if (!form.image) {
            setFormError("Please upload a service image (recommended 4:5 ratio, max 2MB).");
            return;
        }

        setSaving(true);

        try {
            const payload = new FormData();
            payload.append("name", form.name.trim());
            if (form.categoryId) {
                payload.append("categoryId", String(form.categoryId));
            }
            payload.append("categoryName", form.categoryName.trim());
            payload.append("slug", form.slug ? slugify(form.slug) : slugify(form.name));
            payload.append("title", form.title.trim() || form.name.trim());
            payload.append("filterCategory", form.filterCategory.trim());
            payload.append("displayOrder", form.displayOrder || "1");
            payload.append("shortDesc", form.shortDesc.trim());
            payload.append("description", form.description.trim());
            payload.append("tags", JSON.stringify(tags));
            payload.append("image", form.image);
            payload.append("isActive", form.isActive === "1");

            const res = await fetch("/api/services", { method: "POST", body: payload });
            const data = await res.json();

            if (!res.ok) {
                setFormError(data.error || "Something went wrong.");
                setSaving(false);
                return;
            }

            router.push("/admin/services");
        } catch {
            setFormError("Network error. Please try again.");
            setSaving(false);
        }
    };

    const availableFilterSuggestions = COMMON_FILTER_TABS[form.categoryName] || [];

    return (
        <div className="max-w-5xl mx-auto pb-16">
            <div className="mb-8">
                <Link
                    href="/admin/services"
                    className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-[0.1em] uppercase text-muted hover:text-gold-deep transition-colors mb-3"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3 w-3">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Services CMS
                </Link>
                <h1 className="font-display text-4xl italic text-ink">Add New Service</h1>
                <p className="mt-2 font-sans text-[13px] text-muted">
                    Create a dynamic service with 4:5 luxury hero imagery, tags, and category assignment.
                </p>
            </div>

            <form onSubmit={handleCreate} className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
                {/* Left — fields */}
                <div className="bg-cream rounded-2xl p-7 space-y-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-border">
                    {/* Category & Name */}
                    <div className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2 font-semibold">
                                    Service Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={form.categoryId || form.categoryName}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const selected = categories.find((c) => String(c.id) === val || c.name === val);
                                        if (selected) {
                                            setForm((prev) => ({
                                                ...prev,
                                                categoryId: selected.id,
                                                categoryName: selected.name,
                                                categorySlug: selected.slug,
                                            }));
                                        } else {
                                            setForm((prev) => ({
                                                ...prev,
                                                categoryName: val,
                                                categorySlug: slugify(val),
                                            }));
                                        }
                                    }}
                                    className="w-full bg-white px-4 py-3.5 rounded-xl text-ink border border-border focus:outline-none focus:border-gold transition-colors font-medium text-sm cursor-pointer"
                                >
                                    {categories.length > 0 ? (
                                        categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))
                                    ) : (
                                        DEFAULT_CATEGORIES.map((cat) => (
                                            <option key={cat.slug} value={cat.name}>
                                                {cat.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2 font-semibold">
                                    Order / Number (#)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={form.displayOrder}
                                    onChange={(e) => setForm({ ...form, displayOrder: e.target.value })}
                                    placeholder="1"
                                    className="w-full bg-white px-4 py-3.5 rounded-xl text-ink border border-border focus:outline-none focus:border-gold transition-colors font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2 font-semibold">
                                Service Name / Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => {
                                    const newName = e.target.value;
                                    setForm((prev) => ({
                                        ...prev,
                                        name: newName,
                                        slug: prev.slug === slugify(prev.name) ? slugify(newName) : prev.slug,
                                    }));
                                }}
                                placeholder="e.g. Luxury Manicure or French Nail Art"
                                className="w-full bg-white px-4 py-3.5 rounded-xl text-ink border border-border focus:outline-none focus:border-gold transition-colors font-medium text-sm"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.15em] uppercase text-muted font-semibold">
                                    Slug (URL Path)
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setForm((prev) => ({ ...prev, slug: slugify(prev.name) }))}
                                    className="text-[10px] uppercase font-sans tracking-wider text-gold-deep hover:underline cursor-pointer"
                                >
                                    Auto from name
                                </button>
                            </div>
                            <div className="flex items-center gap-2 bg-white border border-border px-4 py-3 rounded-xl focus-within:border-gold transition-colors">
                                <span className="text-muted/60 text-xs font-mono shrink-0">
                                    /services/{slugify(form.categorySlug || form.categoryName)}/
                                </span>
                                <input
                                    type="text"
                                    value={form.slug || slugify(form.name || "")}
                                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                                    placeholder="luxury-manicure"
                                    className="w-full bg-transparent font-mono text-xs text-ink focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Filter Category & Display Headline */}
                    <div className="space-y-5">
                        <div>
                            <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2 font-semibold">
                                Filter Sub-Category (Optional tab grouping)
                            </label>
                            <input
                                type="text"
                                value={form.filterCategory}
                                onChange={(e) => setForm({ ...form, filterCategory: e.target.value })}
                                placeholder="e.g. Art & French, Gel & Acrylic, or Spa & Care"
                                className="w-full bg-white px-4 py-3 rounded-xl text-ink border border-border focus:outline-none focus:border-gold transition-colors text-xs"
                            />
                            {availableFilterSuggestions.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                                    <span className="text-[10px] text-muted">Suggestions:</span>
                                    {availableFilterSuggestions.map((sug) => (
                                        <button
                                            key={sug}
                                            type="button"
                                            onClick={() => setForm({ ...form, filterCategory: sug })}
                                            className="text-[10px] px-2.5 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold-deep hover:bg-gold hover:text-white transition-colors cursor-pointer"
                                        >
                                            + {sug}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2 font-semibold">
                                Display Headline / H1 Title (Detail Page)
                            </label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder={form.name ? `${form.name} in Lucknow | KNK Salon` : "e.g. Luxury Manicure Ritual"}
                                className="w-full bg-white px-4 py-3 rounded-xl text-ink border border-border focus:outline-none focus:border-gold transition-colors text-xs"
                            />
                        </div>

                        <div>
                            <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2 font-semibold">
                                Short Description (Card &amp; Preview) <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={2}
                                value={form.shortDesc}
                                onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                                placeholder="Brief overview of what this treatment includes and offers."
                                className="w-full bg-white px-4 py-3 rounded-xl text-ink border border-border focus:outline-none focus:border-gold transition-colors resize-none text-xs leading-relaxed"
                            />
                        </div>

                        <div>
                            <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2 font-semibold">
                                Detailed Description (Service Detail Page)
                            </label>
                            <textarea
                                rows={4}
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Complete description describing the sensory experience, skin/nail benefits, protocol, and products used."
                                className="w-full bg-white px-4 py-3 rounded-xl text-ink border border-border focus:outline-none focus:border-gold transition-colors resize-none text-xs leading-relaxed"
                            />
                        </div>

                        {/* Service Highlights / Tags */}
                        <div>
                            <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2 font-semibold">
                                Service Tags / Highlights
                            </label>
                            <div className="flex gap-2 mb-2.5">
                                <input
                                    type="text"
                                    value={newTagInput}
                                    onChange={(e) => setNewTagInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                                    placeholder="Add highlight (e.g. Cuticle Therapy)"
                                    className="flex-1 bg-white px-3.5 py-2.5 rounded-xl text-ink border border-border focus:outline-none focus:border-gold transition-colors text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="bg-gold text-cream px-4 py-2 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:bg-gold-deep transition-colors cursor-pointer"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1.5 bg-white border border-gold/40 text-gold-deep px-3 py-1 rounded-full text-xs"
                                    >
                                        ✦ {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="text-red-500 hover:text-red-700 ml-1 text-xs cursor-pointer font-bold"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    <div>
                        <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2 font-semibold">
                            Publish Status
                        </label>
                        <select
                            value={form.isActive}
                            onChange={(e) => setForm({ ...form, isActive: e.target.value })}
                            className="w-full bg-white px-4 py-3 rounded-xl text-ink border border-border focus:outline-none focus:border-gold transition-colors cursor-pointer text-xs"
                        >
                            <option value="1">Active (Published on live website)</option>
                            <option value="0">Inactive (Draft / Hidden)</option>
                        </select>
                    </div>

                    {formError && (
                        <p className="font-sans text-[12px] text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                            {formError}
                        </p>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => router.push("/admin/services")}
                            className="flex-1 border border-border text-ink font-sans text-[11px] tracking-[0.2em] uppercase py-4 rounded-full transition-colors hover:border-gold cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50 font-medium cursor-pointer"
                        >
                            {saving ? "Saving Service..." : "Create Service"}
                        </button>
                    </div>
                </div>

                {/* Right — image upload with 4:5 preview */}
                <div className="space-y-6 sticky top-24">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted font-semibold">
                                Service Hero Image <span className="text-red-500">*</span>
                            </label>
                            <span className="text-[10px] text-gold-deep font-sans uppercase tracking-wider font-semibold">
                                4:5 Aspect Ratio
                            </span>
                        </div>

                        <label
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            className={`relative block w-full aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer transition-colors shadow-md ${preview ? "bg-ink border border-gold/40" : isDragging ? "bg-gold/10 border-2 border-dashed border-gold" : "bg-cream border-2 border-dashed border-border hover:border-gold"
                                }`}
                        >
                            {preview ? (
                                <>
                                    <img src={preview} alt={form.name || "Preview"} className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

                                    {form.isActive === "0" && (
                                        <span className="absolute top-3 right-3 bg-red-600 text-white font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full font-semibold">
                                            Inactive
                                        </span>
                                    )}

                                    <div className="absolute inset-x-0 bottom-0 p-5">
                                        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-1">
                                            {form.categoryName} {form.filterCategory ? `· ${form.filterCategory}` : ""}
                                        </p>
                                        <p className="font-display italic text-xl text-cream leading-tight">
                                            {form.name || "Service Title"}
                                        </p>
                                        {form.shortDesc && (
                                            <p className="mt-1.5 font-sans text-[11px] text-cream/70 line-clamp-2">
                                                {form.shortDesc}
                                            </p>
                                        )}
                                    </div>

                                    <span className="absolute top-3 left-3 bg-white/90 hover:bg-white text-ink font-sans text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full font-medium shadow">
                                        Change image
                                    </span>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full gap-3 px-8 text-center">
                                    <span className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-6 w-6 text-gold-deep">
                                            <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
                                            <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                                        </svg>
                                    </span>
                                    <span className="font-sans text-[13px] text-ink font-medium">
                                        <span className="text-gold-deep">Click to upload</span> or drag and drop
                                    </span>
                                    <span className="font-sans text-[11px] text-muted">
                                        JPG, JPEG, PNG or WEBP · Max 2 MB
                                    </span>
                                    <span className="font-sans text-[10px] text-gold-deep font-semibold">
                                        Recommended: {RECOMMENDED_WIDTH} × {RECOMMENDED_HEIGHT} px (4:5)
                                    </span>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={(e) => processFile(e.target.files?.[0])}
                                className="hidden"
                            />
                        </label>

                        {fileError && <p className="mt-2 font-sans text-[11px] text-red-600">{fileError}</p>}
                    </div>

                    {/* Summary Info */}
                    <div className="bg-cream rounded-2xl p-5 border border-border space-y-3">
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-deep font-semibold block">
                            Live Frontend Preview Info
                        </span>
                        <div className="space-y-2 font-sans text-xs">
                            <div className="flex justify-between text-muted">
                                <span>Category:</span>
                                <span className="font-semibold text-ink">{form.categoryName}</span>
                            </div>
                            <div className="flex justify-between text-muted">
                                <span>Card Index:</span>
                                <span className="font-semibold text-ink">NO. {String(form.displayOrder || 1).padStart(2, "0")}</span>
                            </div>
                            <div className="flex justify-between text-muted">
                                <span>Live URL:</span>
                                <span className="font-mono text-[11px] text-gold-deep">
                                    /services/{slugify(form.categoryName)}/{slug || "service-slug"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}