"use client";

import { useState } from "react";

export default function MenuTabsEditor({ tabs = [], onChange }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [newItemText, setNewItemText] = useState("");
    const [isAddingTab, setIsAddingTab] = useState(false);
    const [newTabName, setNewTabName] = useState("");
    const [editingTabName, setEditingTabName] = useState(false);
    const [tabNameInput, setTabNameInput] = useState("");
    const [bulkText, setBulkText] = useState("");
    const [showBulk, setShowBulk] = useState(false);
    const [mode, setMode] = useState("visual"); // "visual" | "json"
    const [jsonError, setJsonError] = useState("");
    const [rawJson, setRawJson] = useState(() => JSON.stringify(tabs, null, 2));

    const currentTab = tabs[activeTabIndex] || tabs[0] || null;

    // Handle adding single item
    const handleAddItem = (e) => {
        if (e) e.preventDefault();
        const text = newItemText.trim();
        if (!text || !currentTab) return;

        const updatedTabs = tabs.map((tab, idx) => {
            if (idx === activeTabIndex) {
                return {
                    ...tab,
                    items: [...(tab.items || []), text],
                };
            }
            return tab;
        });

        onChange(updatedTabs);
        setNewItemText("");
    };

    // Handle bulk paste items
    const handleBulkAdd = () => {
        if (!bulkText.trim() || !currentTab) return;
        const newLines = bulkText
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l.length > 0);

        if (newLines.length === 0) return;

        const updatedTabs = tabs.map((tab, idx) => {
            if (idx === activeTabIndex) {
                return {
                    ...tab,
                    items: [...(tab.items || []), ...newLines],
                };
            }
            return tab;
        });

        onChange(updatedTabs);
        setBulkText("");
        setShowBulk(false);
    };

    // Handle item deletion
    const handleDeleteItem = (itemIndex) => {
        if (!currentTab) return;
        const updatedTabs = tabs.map((tab, idx) => {
            if (idx === activeTabIndex) {
                return {
                    ...tab,
                    items: tab.items.filter((_, i) => i !== itemIndex),
                };
            }
            return tab;
        });
        onChange(updatedTabs);
    };

    // Move item up / down
    const handleMoveItem = (fromIdx, toIdx) => {
        if (!currentTab || toIdx < 0 || toIdx >= currentTab.items.length) return;
        const newItems = [...currentTab.items];
        const [moved] = newItems.splice(fromIdx, 1);
        newItems.splice(toIdx, 0, moved);

        const updatedTabs = tabs.map((tab, idx) => {
            if (idx === activeTabIndex) {
                return { ...tab, items: newItems };
            }
            return tab;
        });
        onChange(updatedTabs);
    };

    // Add new Tab
    const handleAddTab = (e) => {
        if (e) e.preventDefault();
        const name = newTabName.trim();
        if (!name) return;

        const updatedTabs = [...tabs, { category: name, items: [] }];
        onChange(updatedTabs);
        setNewTabName("");
        setIsAddingTab(false);
        setActiveTabIndex(updatedTabs.length - 1);
    };

    // Delete Tab
    const handleDeleteTab = (tabIndex, e) => {
        if (e) e.stopPropagation();
        if (tabs.length <= 1) {
            alert("At least one menu category tab is required.");
            return;
        }
        if (!confirm(`Delete tab "${tabs[tabIndex].category}" and its ${tabs[tabIndex].items?.length || 0} items?`)) {
            return;
        }

        const updatedTabs = tabs.filter((_, idx) => idx !== tabIndex);
        onChange(updatedTabs);
        setActiveTabIndex((prev) => (prev >= updatedTabs.length ? Math.max(0, updatedTabs.length - 1) : prev));
    };

    // Rename Tab
    const handleSaveTabRename = () => {
        const name = tabNameInput.trim();
        if (!name) return;
        const updatedTabs = tabs.map((tab, idx) => {
            if (idx === activeTabIndex) {
                return { ...tab, category: name };
            }
            return tab;
        });
        onChange(updatedTabs);
        setEditingTabName(false);
    };

    // JSON edit mode
    const handleApplyJson = () => {
        setJsonError("");
        try {
            const parsed = JSON.parse(rawJson);
            if (!Array.isArray(parsed)) {
                throw new Error("Menu data must be an array of category tabs.");
            }
            onChange(parsed);
            setMode("visual");
        } catch (err) {
            setJsonError(err.message || "Invalid JSON syntax.");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                    <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-ink font-semibold">
                        The Full Menu / Treatments Builder
                    </label>
                    <p className="font-sans text-[11px] text-muted">
                        Configure the tabs (e.g. Nail Extensions, Mani/Pedi) and treatment items shown on the frontend.
                    </p>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-border p-1 rounded-lg text-[10px] uppercase font-sans tracking-wider">
                    <button
                        type="button"
                        onClick={() => {
                            setMode("visual");
                        }}
                        className={`px-2.5 py-1 rounded-md transition-colors ${mode === "visual" ? "bg-gold text-cream font-medium" : "text-muted hover:text-ink"
                            }`}
                    >
                        Visual Builder
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setRawJson(JSON.stringify(tabs, null, 2));
                            setMode("json");
                        }}
                        className={`px-2.5 py-1 rounded-md transition-colors ${mode === "json" ? "bg-gold text-cream font-medium" : "text-muted hover:text-ink"
                            }`}
                    >
                        Raw JSON
                    </button>
                </div>
            </div>

            {mode === "json" ? (
                <div className="space-y-3 bg-white p-4 rounded-xl border border-border">
                    <p className="font-sans text-[11px] text-muted">
                        Format: Array of objects with <code className="text-gold-deep">category</code> (string) and <code className="text-gold-deep">items</code> (array of strings).
                    </p>
                    <textarea
                        rows={12}
                        value={rawJson}
                        onChange={(e) => setRawJson(e.target.value)}
                        className="w-full font-mono text-[12px] bg-slate-900 text-emerald-400 p-3.5 rounded-lg focus:outline-none"
                    />
                    {jsonError && <p className="font-sans text-[11px] text-red-500">{jsonError}</p>}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setMode("visual")}
                            className="px-4 py-2 border border-border rounded-lg text-xs font-sans text-muted hover:text-ink"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleApplyJson}
                            className="px-5 py-2 bg-gold text-cream rounded-lg text-xs font-sans uppercase tracking-wider font-medium hover:bg-gold-deep"
                        >
                            Apply JSON
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-border p-5 space-y-6">
                    {/* Category Tabs Header */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted font-medium">
                                Menu Category Tabs ({tabs.length})
                            </span>
                            {!isAddingTab && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAddingTab(true);
                                        setNewTabName("");
                                    }}
                                    className="inline-flex items-center gap-1 font-sans text-[10px] tracking-[0.1em] uppercase text-gold-deep hover:text-gold font-semibold"
                                >
                                    + Add Category Tab
                                </button>
                            )}
                        </div>

                        {/* Tabs List */}
                        <div className="flex flex-wrap items-center gap-2">
                            {tabs.map((tab, idx) => {
                                const isActive = idx === activeTabIndex;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            setActiveTabIndex(idx);
                                            setEditingTabName(false);
                                        }}
                                        className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-[11px] font-sans tracking-[0.1em] uppercase cursor-pointer transition-all ${isActive
                                                ? "bg-gold text-cream border-gold shadow-sm font-medium"
                                                : "bg-[#fbf9f5] border-border text-muted hover:border-gold/60 hover:text-ink"
                                            }`}
                                    >
                                        <span>{tab.category}</span>
                                        <span
                                            className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${isActive ? "bg-cream/20 text-cream" : "bg-border text-muted"
                                                }`}
                                        >
                                            {tab.items?.length || 0}
                                        </span>
                                        <button
                                            type="button"
                                            title="Delete Tab"
                                            onClick={(e) => handleDeleteTab(idx, e)}
                                            className={`opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:scale-110 ${isActive ? "text-cream hover:text-red-200" : "text-muted hover:text-red-600"
                                                }`}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                );
                            })}

                            {/* Add Tab Form Inline */}
                            {isAddingTab && (
                                <div className="inline-flex items-center gap-2 bg-gold/5 border border-gold px-3 py-1.5 rounded-full">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={newTabName}
                                        onChange={(e) => setNewTabName(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleAddTab(e)}
                                        placeholder="Tab Name (e.g. Mani / Pedi)"
                                        className="bg-transparent text-xs font-sans text-ink focus:outline-none w-36"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTab}
                                        className="text-[10px] uppercase font-sans tracking-wider bg-gold text-cream px-2 py-0.5 rounded-full font-medium"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingTab(false)}
                                        className="text-[10px] text-muted hover:text-ink"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Tab Details & Treatments */}
                    {currentTab ? (
                        <div className="space-y-4 pt-4 border-t border-border">
                            {/* Tab Title Editor */}
                            <div className="flex items-center justify-between bg-[#fbf9f5] p-3 rounded-xl border border-border">
                                {editingTabName ? (
                                    <div className="flex items-center gap-2 flex-1">
                                        <input
                                            type="text"
                                            autoFocus
                                            value={tabNameInput}
                                            onChange={(e) => setTabNameInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSaveTabRename()}
                                            className="bg-white border border-gold px-3 py-1.5 rounded-lg text-xs font-sans text-ink focus:outline-none flex-1"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSaveTabRename}
                                            className="bg-gold text-cream text-xs px-3 py-1.5 rounded-lg font-sans font-medium"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditingTabName(false)}
                                            className="text-xs text-muted px-2"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <span className="font-display italic text-lg text-ink font-medium">
                                                {currentTab.category}
                                            </span>
                                            <span className="font-sans text-[11px] text-muted">
                                                ({currentTab.items?.length || 0} treatments)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setTabNameInput(currentTab.category);
                                                    setEditingTabName(true);
                                                }}
                                                className="text-[11px] font-sans tracking-wide text-gold-deep hover:underline"
                                            >
                                                Rename Tab
                                            </button>
                                            <span className="text-border">|</span>
                                            <button
                                                type="button"
                                                onClick={() => setShowBulk((prev) => !prev)}
                                                className="text-[11px] font-sans tracking-wide text-gold-deep hover:underline"
                                            >
                                                {showBulk ? "Hide Bulk Paste" : "+ Bulk Add Items"}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Bulk Paste Box */}
                            {showBulk && (
                                <div className="bg-gold/5 border border-gold/30 p-4 rounded-xl space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-sans text-[10px] tracking-wider uppercase text-gold-deep font-semibold">
                                            Paste multiple service items (one per line)
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setShowBulk(false)}
                                            className="text-xs text-muted hover:text-ink"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <textarea
                                        rows={4}
                                        value={bulkText}
                                        onChange={(e) => setBulkText(e.target.value)}
                                        placeholder={"Nail Cut\nNail Filing\nNail Paint Application\nGel Extensions"}
                                        className="w-full bg-white p-3 rounded-lg border border-border text-xs font-sans text-ink focus:outline-none focus:border-gold resize-none"
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={handleBulkAdd}
                                            disabled={!bulkText.trim()}
                                            className="bg-gold text-cream px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-medium hover:bg-gold-deep transition-colors disabled:opacity-50"
                                        >
                                            Add All Lines
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Single Item Add Input */}
                            <form onSubmit={handleAddItem} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newItemText}
                                    onChange={(e) => setNewItemText(e.target.value)}
                                    placeholder={`Add treatment to "${currentTab.category}" (e.g. Gel Polish)`}
                                    className="flex-1 bg-[#fbf9f5] px-4 py-3 rounded-xl text-xs font-sans text-ink border border-border focus:outline-none focus:border-gold transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!newItemText.trim()}
                                    className="bg-ink hover:bg-gold-deep text-cream px-5 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-colors disabled:opacity-40"
                                >
                                    + Add Item
                                </button>
                            </form>

                            {/* Items List */}
                            <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                                {currentTab.items && currentTab.items.length > 0 ? (
                                    currentTab.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="group flex items-center justify-between bg-[#fbf9f5] hover:bg-gold/5 border border-border hover:border-gold/40 px-3.5 py-2.5 rounded-xl transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="font-display italic text-xs text-gold-deep font-semibold">
                                                    {String(idx + 1).padStart(2, "0")}
                                                </span>
                                                <span className="font-sans text-xs text-ink font-medium">
                                                    {item}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                                {/* Reorder Up */}
                                                <button
                                                    type="button"
                                                    title="Move Up"
                                                    disabled={idx === 0}
                                                    onClick={() => handleMoveItem(idx, idx - 1)}
                                                    className="p-1 hover:text-gold text-muted disabled:opacity-20 cursor-pointer"
                                                >
                                                    ↑
                                                </button>
                                                {/* Reorder Down */}
                                                <button
                                                    type="button"
                                                    title="Move Down"
                                                    disabled={idx === currentTab.items.length - 1}
                                                    onClick={() => handleMoveItem(idx, idx + 1)}
                                                    className="p-1 hover:text-gold text-muted disabled:opacity-20 cursor-pointer"
                                                >
                                                    ↓
                                                </button>
                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    title="Delete Item"
                                                    onClick={() => handleDeleteItem(idx)}
                                                    className="p-1 hover:text-red-600 text-muted hover:scale-110 cursor-pointer transition-transform"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-xs font-sans text-muted bg-[#fbf9f5] rounded-xl border border-dashed border-border">
                                        No treatment items in this tab yet. Type above to add your first item.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-xs font-sans text-muted">
                            No category tabs created. Click "+ Add Category Tab" above to begin.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
