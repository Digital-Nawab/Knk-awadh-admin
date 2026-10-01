"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
    {
        label: "Overview",
        href: "/admin/dashboard",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="3" width="7" height="9" rx="1" />
                <rect x="14" y="3" width="7" height="5" rx="1" />
                <rect x="14" y="12" width="7" height="9" rx="1" />
                <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
        ),
    },
    {
        label: "Bookings & Leads",
        href: "/admin/bookings",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
        ),
    },
    {
        label: "The Journal (Blogs)",
        href: "/admin/blogs",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10M6 10h10M6 14h6" />
            </svg>
        ),
    },
    {
        label: "Master SEO",
        href: "/admin/seo",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
            </svg>
        ),
    },
    {
        label: "Hero Banners",
        href: "/admin/hero",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 3c-4 2-6 5-6 9a6 6 0 0 0 12 0c0-4-2-7-6-9Z" />
            </svg>
        ),
    },
    {
        label: "Artistry Gallery",
        href: "/admin/gallery",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
            </svg>
        ),
    },
    {
        label: "About Page CMS",
        href: "/admin/about",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
            </svg>
        ),
    },
    {
        label: "Services CMS",
        href: "/admin/services",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
        ),
    },
    {
        label: "Service Categories",
        href: "/admin/services/categories",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 6h16M4 12h16M4 18h7" />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    };

    return (
        <aside className="w-64 h-screen sticky top-0 flex flex-col bg-ink text-cream shrink-0 border-r border-white/5">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
                <img src="/assets/images/new/logo.png" alt="KNK Awadh" className="h-9 w-auto" />
                <div className="leading-tight">
                    <p className="font-display italic text-lg text-gold">KNK Awadh</p>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/40">
                        Admin Suite
                    </p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-sans text-xs tracking-wide transition-all duration-200 ${
                                isActive
                                    ? "bg-gold/15 text-gold font-semibold"
                                    : "text-cream/60 hover:bg-white/5 hover:text-cream"
                            }`}
                        >
                            {isActive && (
                                <span
                                    aria-hidden="true"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-gold"
                                />
                            )}
                            <span className="h-[18px] w-[18px] shrink-0">{link.icon}</span>
                            {link.label}
                        </Link>
                    );
                })}

                <div className="pt-4 mt-4 border-t border-white/10">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-cream/50 hover:text-gold text-xs font-sans transition-colors"
                    >
                        <span>Visit Website</span>
                        <span>↗</span>
                    </Link>
                </div>
            </nav>

            {/* User + Logout */}
            <div className="px-4 py-5 border-t border-white/10">
                <div className="flex items-center gap-3 px-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-gold/15 flex items-center justify-center font-display italic text-gold text-sm font-bold">
                        K
                    </div>
                    <div className="leading-tight">
                        <p className="font-sans text-xs text-cream font-medium">KNK Admin</p>
                        <p className="font-sans text-[10px] text-cream/40">admin@knksalon.in</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl font-sans text-xs text-cream/60 hover:bg-white/5 hover:text-rose-300 transition-colors"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-4 w-4">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <path d="M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    Logout
                </button>
            </div>
        </aside>
    );
}