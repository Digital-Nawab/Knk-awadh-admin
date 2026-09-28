"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        setLoading(false);

        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Login failed");
            return;
        }

        router.push("/admin/dashboard");
        router.refresh();
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-[1.15fr_1fr] bg-cream">
            {/* Left — editorial brand panel */}
            <div className="relative hidden lg:block overflow-hidden">
                <img
                    src="/assets/images/admin/login-bg.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />
                <svg
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full text-gold opacity-[0.06]"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <pattern id="loginJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                            <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#loginJaali)" />
                </svg>

                <div className="relative z-10 flex h-full flex-col justify-between px-14 py-16">
                    <div>
                        <span className="font-display italic text-2xl text-gold">KNK</span>
                        <span className="ml-2 font-sans text-[11px] tracking-[0.3em] uppercase text-cream/50">
                            Awadh · Salon &amp; Academy
                        </span>
                    </div>

                    <div className="max-w-[440px]">
                        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 font-sans text-[10px] tracking-[0.2em] uppercase text-gold">
                            15+ years of craft
                        </span>

                        <p className="mt-7 font-display italic text-[46px] leading-[1.1] text-cream">
                            Every detail,
                            <br />
                            looked after.
                        </p>
                        <span className="mt-6 block h-px w-14 bg-gold" />
                        <p className="mt-6 font-sans text-[13px] leading-relaxed text-cream/65 max-w-[380px]">
                            Sign in to manage services, bookings and the gallery across
                            Hazratganj, Gomti Nagar and Mahanagar.
                        </p>
                    </div>

                    <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-cream/30">
                        Admin Panel
                    </p>
                </div>
            </div>

            {/* Right — form panel */}
            <div className="relative flex items-center justify-center px-6 py-16">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]"
                />

                <div className="relative w-full max-w-[400px] px-10 py-14 sm:px-12">
                    <span aria-hidden="true" className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-gold" />
                    <span aria-hidden="true" className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-gold" />
                    <span aria-hidden="true" className="absolute left-0 bottom-0 h-7 w-7 border-l-2 border-b-2 border-gold" />
                    <span aria-hidden="true" className="absolute right-0 bottom-0 h-7 w-7 border-r-2 border-b-2 border-gold" />

                    <span className="lg:hidden font-display italic text-xl text-gold-deep">KNK Awadh</span>

                    <h1 className="mt-2 lg:mt-0 font-display text-[38px] italic text-ink leading-tight">
                        Welcome back
                    </h1>
                    <p className="mt-2 font-sans text-[13px] text-muted">
                        Sign in to your admin account.
                    </p>

                    {error && (
                        <p className="mt-4 font-sans text-[13px] text-red-600">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="mt-10 space-y-7">
                        <div>
                            <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="you@knksalon.in"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full bg-transparent border-b border-border pb-2.5 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="font-sans text-[11px] text-gold-deep hover:text-gold"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full bg-transparent border-b border-border pb-2.5 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 font-sans text-[12px] text-muted cursor-pointer">
                                <input type="checkbox" className="accent-gold h-3.5 w-3.5" />
                                Remember me
                            </label>
                            <a href="#" className="font-sans text-[12px] text-gold-deep hover:text-gold">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className="mt-8 font-sans text-[12px] text-muted text-center">
                        Trouble signing in? Contact your administrator.
                    </p>
                </div>
            </div>
        </div>
    );
}