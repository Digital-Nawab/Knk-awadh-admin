"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_KB = 2048;

function slugify(name) {
    if (!name) return "";
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export default function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [modalSaving, setModalSaving] = useState(false);
    const [modalError, setModalError] = useState("");

    // Form state
    const [form, setForm] = useState({
        name: "",
        slug: "",
        title: "",
        shortDesc: "",
        displayOrder: "1",
        isActive: true,
        image: null,
    });
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    // Deleting state
    const [deletingId, setDeletingId] = useState(null);
    const [confirmId, setConfirmId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);

    const loadCategories = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/services/categories?all=true");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load categories.");
            setCategories(data.categories || []);
        } catch (err) {
            setError(err.message || "Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    const openAddModal = () => {
        setEditingCategory(null);
        setForm({
            name: "",
            slug: "",
            title: "",
            shortDesc: "",
            displayOrder: String((categories.length + 1) || 1),
            isActive: true,
            image: null,
        });
        setPreview(null);
        setModalError("");
        setIsModalOpen(true);
    };

    const openEditModal = (cat) => {
        setEditingCategory(cat);
        setForm({
            name: cat.name || "",
            slug: cat.slug || "",
            title: cat.title || "",
            shortDesc: cat.short_desc || "",
            displayOrder: String(cat.display_order || 1),
            isActive: Boolean(cat.is_active),
            image: null,
        });
        setPreview(cat.image || null);
        setModalError("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setModalError("");
        setPreview(null);
    };

    const handleFileChange = (file) => {
        if (!file) return;
        if (!IMAGE_TYPES.includes(file.type)) {
            setModalError("Only JPG, JPEG, PNG or WEBP images are allowed.");
            return;
        }
        if (file.size / 1024 > MAX_IMAGE_KB) {
            setModalError("Image file exceeds 2MB limit.");
            return;
        }
        setModalError("");
        setPreview(URL.createObjectURL(file));
        setForm((prev) => ({ ...prev, image: file }));
    };

    const handleSaveCategory = async (e) => {
        e.preventDefault();
        setModalError("");

        if (!form.name.trim()) {
            setModalError("Category name is required.");
            return;
        }

        const finalSlug = form.slug ? slugify(form.slug) : slugify(form.name);
        if (!finalSlug) {
            setModalError("Category slug is required.");
            return;
        }

        setModalSaving(true);
        try {
            const formData = new FormData();
            formData.append("name", form.name.trim());
            formData.append("slug", finalSlug);
            formData.append("title", form.title.trim() || `${form.name.trim()}, done right.`);
            formData.append("shortDesc", form.shortDesc.trim() || `Luxury ${form.name.trim().toLowerCase()} treatments handcrafted by certified artists.`);
            formData.append("displayOrder", form.displayOrder || "1");
            formData.append("isActive", form.isActive ? "1" : "0");

            if (form.image) {
                formData.append("image", form.image);
            } else if (editingCategory?.image) {
                formData.append("existingImage", editingCategory.image);
            }

            const url = editingCategory
                ? `/api/services/categories/${editingCategory.id}`
                : "/api/services/categories";
            const method = editingCategory ? "PATCH" : "POST";

            const res = await fetch(url, { method, body: formData });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to save category.");
            }

            setSuccessMsg(editingCategory ? "Category updated successfully!" : "Category created successfully!");
            setTimeout(() => setSuccessMsg(""), 3500);

            closeModal();
            loadCategories();
        } catch (err) {
            setModalError(err.message || "Failed to save category.");
        } finally {
            setModalSaving(false);
        }
    };

    const handleToggleStatus = async (cat) => {
        setTogglingId(cat.id);
        try {
            const newStatus = !cat.is_active;
            const res = await fetch(`/api/services/categories/${cat.id}?action=status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: newStatus }),
            });
            if (res.ok) {
                setCategories((prev) =>
                    prev.map((c) => (c.id === cat.id ? { ...c, is_active: newStatus ? 1 : 0 } : c))
                );
            }
        } catch (err) {
            console.error("Failed to toggle category status", err);
        } finally {
            setTogglingId(null);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/services/categories/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            setCategories((prev) => prev.filter((c) => c.id !== id));
            setSuccessMsg("Category removed.");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch {
            setError("Couldn't delete this category. Please try again.");
        } finally {
            setDeletingId(null);
            setConfirmId(null);
        }
    };

    const activeCount = categories.filter((c) => c.is_active).length;

    return (
        <div className="max-w-7xl mx-auto pb-16">
            {/* Breadcrumb & Navigation */}
            <div className="flex items-center gap-2 mb-6">
                <Link
                    href="/admin/services"
                    className="font-sans text-[11px] tracking-[0.1em] uppercase text-muted hover:text-gold-deep transition-colors"
                >
                    Services CMS
                </Link>
                <span className="text-muted/40">/</span>
                <span className="font-sans text-[11px] tracking-[0.1em] uppercase text-ink font-semibold">
                    Service Categories
                </span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-display text-4xl italic text-ink">Service Categories</h1>
                    <p className="mt-1.5 font-sans text-[13px] text-muted">
                        {loading
                            ? "Loading categories..."
                            : `${categories.length} categories registered · ${activeCount} active in frontend menu`}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/services"
                        className="inline-flex items-center gap-1.5 border border-border bg-white text-ink px-4 py-2.5 rounded-full text-xs font-sans tracking-wide hover:border-gold hover:text-gold-deep transition-colors"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Services
                    </Link>
                    <button
                        type="button"
                        onClick={openAddModal}
                        className="inline-flex items-center gap-2 bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 rounded-full shadow-luxe transition-transform duration-300 hover:scale-[1.02] cursor-pointer font-medium"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add Category
                    </button>
                </div>
            </div>

            {successMsg && (
                <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-emerald-600">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {successMsg}
                </div>
            )}

            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl">
                    {error}
                </div>
            )}

            {/* Categories Table / Card List */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-20 bg-cream rounded-2xl animate-pulse border border-border" />
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center bg-cream rounded-2xl py-16 px-6 border border-border">
                    <p className="font-display text-2xl italic text-ink mb-2">No Categories Found</p>
                    <p className="text-xs text-muted mb-6">Create your first service category to organize treatments.</p>
                    <button
                        onClick={openAddModal}
                        className="bg-gold text-cream px-6 py-3 rounded-full text-xs uppercase tracking-widest font-sans"
                    >
                        Add Category
                    </button>
                </div>
            ) : (
                <div className="bg-cream rounded-2xl border border-border overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border bg-ink/[0.02] text-[10px] tracking-[0.15em] uppercase text-muted font-sans font-semibold">
                                    <th className="py-4 px-6 w-16">#</th>
                                    <th className="py-4 px-6">Category</th>
                                    <th className="py-4 px-6">Frontend URL Slug</th>
                                    <th className="py-4 px-6 text-center">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border text-xs text-ink font-sans">
                                {categories.map((cat, idx) => {
                                    const isActive = Boolean(cat.is_active);
                                    return (
                                        <tr key={cat.id} className="hover:bg-white/50 transition-colors">
                                            <td className="py-4 px-6 font-mono text-muted text-xs">
                                                {String(cat.display_order || idx + 1).padStart(2, "0")}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-11 w-11 rounded-lg overflow-hidden bg-white border border-border shrink-0">
                                                        <img
                                                            src={cat.image || "/assets/images/new/service/NAILS.webp"}
                                                            alt={cat.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-display text-base font-medium text-ink">
                                                            {cat.name}
                                                        </p>
                                                        <p className="text-[11px] text-muted line-clamp-1 max-w-sm">
                                                            {cat.title || cat.short_desc || "No subtitle"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-mono text-xs">
                                                <a
                                                    href={`/services/${cat.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-gold-deep hover:underline"
                                                >
                                                    /services/{cat.slug}
                                                    <span className="text-[10px]">↗</span>
                                                </a>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button
                                                    type="button"
                                                    disabled={togglingId === cat.id}
                                                    onClick={() => handleToggleStatus(cat)}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans tracking-wider uppercase font-semibold transition-all cursor-pointer ${isActive
                                                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                                            : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                                                        }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-neutral-400"
                                                            }`}
                                                    />
                                                    {isActive ? "Active" : "Inactive"}
                                                </button>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(cat)}
                                                        className="p-2 rounded-lg text-muted hover:text-gold-deep hover:bg-gold/10 transition-colors"
                                                        title="Edit category"
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                                                            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                        </svg>
                                                    </button>

                                                    {confirmId === cat.id ? (
                                                        <div className="inline-flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-1 rounded-lg">
                                                            <span className="text-[10px] text-red-600 font-medium">Delete?</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(cat.id)}
                                                                className="text-[10px] text-white bg-red-600 px-2 py-0.5 rounded font-semibold hover:bg-red-700"
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setConfirmId(null)}
                                                                className="text-[10px] text-muted hover:text-ink px-1"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            disabled={deletingId === cat.id}
                                                            onClick={() => setConfirmId(cat.id)}
                                                            className="p-2 rounded-lg text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                                                            title="Delete category"
                                                        >
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                                                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal for Add / Edit Category */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-cream border border-border rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                            <div>
                                <h2 className="font-display text-2xl italic text-ink">
                                    {editingCategory ? "Edit Category" : "Add New Category"}
                                </h2>
                                <p className="text-xs text-muted mt-0.5">
                                    {editingCategory
                                        ? "Update category title, slug, and status."
                                        : "Create a dynamic category with URL slug and image."}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-ink hover:border-gold transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {modalError && (
                            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2.5 rounded-xl">
                                {modalError}
                            </div>
                        )}

                        <form onSubmit={handleSaveCategory} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                                        Category Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => {
                                            const newName = e.target.value;
                                            setForm((prev) => ({
                                                ...prev,
                                                name: newName,
                                                slug: prev.slug === slugify(prev.name) ? slugify(newName) : prev.slug,
                                            }));
                                        }}
                                        placeholder="e.g. Skin Care"
                                        className="w-full bg-white px-4 py-3 rounded-xl border border-border text-ink text-sm focus:outline-none focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                                        Display Order (#)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.displayOrder}
                                        onChange={(e) => setForm({ ...form, displayOrder: e.target.value })}
                                        className="w-full bg-white px-4 py-3 rounded-xl border border-border text-ink text-sm font-mono focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-[11px] font-sans uppercase tracking-wider text-muted font-semibold">
                                        URL Slug <span className="text-red-500">*</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setForm((prev) => ({ ...prev, slug: slugify(prev.name) }))}
                                        className="text-[10px] uppercase font-sans text-gold-deep hover:underline cursor-pointer"
                                    >
                                        Auto from name
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl focus-within:border-gold">
                                    <span className="text-muted/60 text-xs font-mono shrink-0">/services/</span>
                                    <input
                                        type="text"
                                        required
                                        value={form.slug || slugify(form.name)}
                                        onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                                        placeholder="skin-care"
                                        className="w-full bg-transparent font-mono text-xs text-ink focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                                    Category Headline / Title
                                </label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. Skin care rituals & clinical wellness."
                                    className="w-full bg-white px-4 py-3 rounded-xl border border-border text-ink text-sm focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                                    Short Description
                                </label>
                                <textarea
                                    rows={2}
                                    value={form.shortDesc}
                                    onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                                    placeholder="Brief introduction for the hero section..."
                                    className="w-full bg-white px-4 py-3 rounded-xl border border-border text-ink text-xs focus:outline-none focus:border-gold resize-none"
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-[11px] font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                                    Hero Image (Optional, 4:5 luxury portrait)
                                </label>
                                <div className="flex items-center gap-4">
                                    {preview && (
                                        <div className="h-16 w-14 rounded-lg overflow-hidden bg-white border border-border shrink-0">
                                            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(e) => handleFileChange(e.target.files?.[0])}
                                        className="text-xs text-muted file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[11px] file:uppercase file:font-semibold file:bg-gold/15 file:text-gold-deep hover:file:bg-gold/25 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-3 pt-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isActive}
                                        onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                                </label>
                                <span className="text-xs font-sans text-ink font-medium">
                                    Active (Show in services menu & website)
                                </span>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-5 py-2.5 rounded-full border border-border text-xs uppercase font-sans text-muted hover:text-ink transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={modalSaving}
                                    className="px-6 py-2.5 rounded-full bg-gold text-cream text-xs uppercase tracking-widest font-sans font-semibold shadow-luxe hover:scale-[1.02] transition-transform disabled:opacity-50"
                                >
                                    {modalSaving ? "Saving..." : (editingCategory ? "Update Category" : "Create Category")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
