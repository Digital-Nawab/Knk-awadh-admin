"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const quickLinks = [
    {
        title: "Bookings & Leads",
        desc: "View and manage live inquiries from Hero Concierge, Luxury Studio, Makeup, and Academy.",
        href: "/admin/bookings",
        actionText: "View Leads",
    },
    {
        title: "Home Page CMS",
        desc: "Section-wise management of Home banners, services, academies, aesthetics, locations, FAQs, and reviews.",
        href: "/admin/home",
        actionText: "Manage Home Page",
    },
    {
        title: "About Us Page CMS",
        desc: "Customize hero video, brand story, founders, academy, and FAQ content on the About page.",
        href: "/admin/about",
        actionText: "Manage About Page",
    },
    {
        title: "Service Categories",
        desc: "Organize and prioritize service categories and departments across the salon.",
        href: "/admin/services/categories",
        actionText: "Manage Categories",
    },
    {
        title: "Services CMS",
        desc: "Add, edit, or reorder luxury services across Hair, Beauty, Nails, Facial, and Body.",
        href: "/admin/services",
        actionText: "Manage Services",
    },
    {
        title: "Makeup Page CMS",
        desc: "Manage bridal makeup hero, looks gallery, trend showcase, signature packages, and FAQs.",
        href: "/admin/makeup",
        actionText: "Manage Makeup Page",
    },
    {
        title: "Artistry Gallery Lookbook",
        desc: "Upload, view, and manage bridal transformations and salon lookbook photos.",
        href: "/admin/gallery",
        actionText: "Manage Gallery",
    },
    {
        title: "KNK Interior CMS",
        desc: "Manage luxury interior showcase, infrastructure features, and ambience imagery.",
        href: "/admin/interior",
        actionText: "Manage Interior",
    },
    {
        title: "The Journal (Blogs)",
        desc: "Publish and edit editorial stories, bridal guides, and haircare tips.",
        href: "/admin/blogs",
        actionText: "Manage Stories",
    },
    {
        title: "Master SEO Manager",
        desc: "Configure URL-specific meta titles, descriptions, keywords, and OpenGraph social images.",
        href: "/admin/seo",
        actionText: "Open SEO Suite",
    },
];

export default function Dashboard() {
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const [stats, setStats] = useState({
        today: 0,
        pending: 0,
        confirmed: 0,
        total: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/bookings");
                if (res.ok) {
                    const data = await res.json();
                    setStats({
                        today: data?.stats?.today ?? 0,
                        pending: data?.stats?.pending ?? 0,
                        confirmed: data?.stats?.confirmed ?? 0,
                        total: data?.stats?.total ?? 0,
                    });
                }
            } catch {
                // Keep default stats on error
            }
        }
        fetchStats();
    }, []);

    const metricCards = [
        { label: "Today's Leads", value: stats.today, link: "/admin/bookings" },
        { label: "Pending Inquiries", value: stats.pending, link: "/admin/bookings" },
        { label: "Confirmed Leads", value: stats.confirmed, link: "/admin/bookings" },
        { label: "Total Client Leads", value: stats.total, link: "/admin/bookings" },
    ];

    return (
        <div className="max-w-6xl space-y-10">
            {/* Header */}
            <div>
                <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-gold-deep mb-2 font-semibold">
                    {today}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl italic text-ink">Welcome back to KNK Awadh</h1>
                <p className="mt-2 font-sans text-xs sm:text-[13px] text-muted">
                    Your luxury salon management console: bookings, bridal leads, editorial journal, and search engine optimization.
                </p>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metricCards.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.link}
                        className="relative bg-white px-6 py-6 rounded-xl border border-border shadow-xs hover:border-gold hover:shadow-sm transition-all group block"
                    >
                        <span aria-hidden="true" className="absolute left-0 top-0 h-4 w-4 border-l border-t border-gold" />
                        <span aria-hidden="true" className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-gold" />
                        <p className="font-display text-4xl italic text-ink group-hover:text-gold-deep transition-colors">
                            {stat.value}
                        </p>
                        <p className="mt-2 font-sans text-[11px] tracking-[0.1em] uppercase text-muted font-medium">
                            {stat.label}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Quick links */}
            <div>
                <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-muted mb-4 font-semibold">
                    Quick Management Actions
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {quickLinks.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="group flex flex-col justify-between border-t-2 border-gold bg-white p-6 rounded-xl shadow-xs hover:shadow-luxe transition-all duration-300 border border-border/80"
                        >
                            <div>
                                <h3 className="font-display text-2xl italic text-ink group-hover:text-gold-deep transition-colors">
                                    {item.title}
                                </h3>
                                <p className="mt-2.5 font-sans text-xs leading-relaxed text-muted">
                                    {item.desc}
                                </p>
                            </div>
                            <span className="mt-6 inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-gold-deep font-semibold group-hover:translate-x-1 transition-transform">
                                {item.actionText}
                                <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}