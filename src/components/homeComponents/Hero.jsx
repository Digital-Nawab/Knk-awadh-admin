"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

function Hero({ initialHero = null }) {
  const today = new Date().toISOString().split("T")[0];
  const [formStartedAt] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hero, setHero] = useState(initialHero);
  const videoRef = useRef(null);

  useEffect(() => {
    if (initialHero) {
      setHero(initialHero);
      return;
    }
    let isMounted = true;
    async function loadActiveHero() {
      try {
        const res = await fetch("/api/hero?active=true");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.heroes && data.heroes.length > 0) {
            setHero(data.heroes[0]);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch active hero:", err);
      }
    }
    loadActiveHero();
    return () => {
      isMounted = false;
    };
  }, [initialHero]);

  useEffect(() => {
    // Gracefully defer heavy video loading until after initial critical paint/idle
    let idleId;
    let timerId;
    const loadVideo = () => {
      setVideoLoaded(true);
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(loadVideo, { timeout: 2000 });
      } else {
        timerId = setTimeout(loadVideo, 1500);
      }
    }
    return () => {
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const handleConciergeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    payload.form_type = "hero_concierge";

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage({ type: "success", text: data.message || "Your appointment request has been reserved!" });
        e.target.reset();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to submit booking. Please call us." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network issue. Please try again or reach out via WhatsApp." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="">
      {/* ============ HERO — PARALLAX VIDEO ============ */}
      <section
        id="top"
        className="relative h-[92vh] min-h-[34rem] overflow-hidden"
      >
        <div className="parallax-bg absolute inset-0 -top-24 h-[calc(100%+12rem)] will-change-transform">
          {hero?.media_type === "image" && hero.media_url ? (
            <Image
              src={hero.media_url}
              alt={hero.alt_text || "KNK Salon Awadh Luxury Beauty"}
              priority={true}
              fill
              sizes="100vw"
              quality={85}
              unoptimized={hero.media_url.startsWith("/admin-assets/")}
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <Image
                src="/assets/images/reel-1-IdXjgO27.webp"
                alt={hero?.alt_text || "KNK Salon Awadh Luxury Beauty"}
                priority={true}
                fill
                sizes="100vw"
                quality={85}
                className="h-full w-full object-cover"
              />
              {videoLoaded && (
                <video
                  ref={videoRef}
                  src={hero?.media_url || "/assets/media/reel-2.mp4"}
                  poster="/assets/images/reel-1-IdXjgO27.webp"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                />
              )}
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/35 to-primary/10" />
        {/* scroll cue */}
        <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 animate-bounce text-cream/60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>
      <section
        id="book"
        className="relative z-30 -mt-8  px-4 sm:-mt-10 sm:px-6 lg:-mt-14"
      >
        <div className="mx-auto max-w-[1280px] bg-white">
          <form
            id="conciergeBooking"
            onSubmit={handleConciergeSubmit}
            className="overflow-hidden rounded-[3px] border border-[#d9c7a8]/70 bg-[#fbfaf7] shadow-[0_18px_55px_rgba(40,31,24,0.16)]"
          >
            {/* Honeypot for spam bots */}
            <input
              type="text"
              name="hp_company_url"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <input type="hidden" name="form_started_at" value={formStartedAt} />

            {/* Gold top line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c69b55] to-transparent" />
            {/* =====================================================
              DESKTOP / TABLET CONTENT
          ====================================================== */}
            <div className="lg:grid lg:grid-cols-[320px_1fr]">
              {/* =================================================
                  LEFT CONCIERGE
              ================================================== */}
              <div className="border-b border-[#e2dbd2] bg-[#f5f0e7] px-6 py-6 lg:border-b-0 lg:border-r lg:px-7 lg:py-6">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    {/* Heading */}
                    <h2 className="font-['Cormorant_Garamond'] text-[32px] font-medium leading-[0.88] tracking-[-0.03em] text-[#29231f] sm:text-[35px]">
                      Reserve your
                      <br />
                      <span className="italic text-[#b58a52]">moment.</span>
                    </h2>
                    {statusMessage && (
                      <div
                        className={`mt-4 p-3 rounded text-xs leading-relaxed ${statusMessage.type === "success"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}
                      >
                        {statusMessage.text}
                      </div>
                    )}
                  </div>
                  {/* CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group mt-6 flex w-full items-center justify-between bg-[#29231f] px-4 py-3.5 font-['Inter'] text-[8px] font-semibold uppercase tracking-[0.18em] text-[#faf7f0] transition-all duration-300 hover:bg-[#b58a52] disabled:opacity-60"
                  >
                    <span>{loading ? "Reserving..." : "Book Appointment"}</span>
                    <span className="text-[15px] transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </button>
                </div>
              </div>
              {/* =================================================
                  RIGHT FORM AREA
              ================================================== */}
              <div className="px-5 py-6 sm:px-7 lg:px-7 xl:px-9">
                {/* Fields */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {/* SERVICE */}
                  <div>
                    <label
                      htmlFor="service"
                      className="mb-2 block font-['Inter'] text-[8px] font-medium uppercase tracking-[0.24em] text-[#9b8978]"
                    >
                      Service
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        required=""
                        className="h-9 w-full appearance-none border-0 border-b border-[#d8d0c6] bg-transparent px-0 pb-2 pr-5 font-['Inter'] text-[11px] text-[#3e3833] outline-none transition focus:border-[#b58a52]"
                      >
                        <option value="">Choose a service</option>
                        <option>Hair Cut &amp; Styling</option>
                        <option>Hair Colour</option>
                        <option>Bridal Makeup</option>
                        <option>Beauty &amp; Skin</option>
                        <option>Nail Art</option>
                        <option>Men's Grooming</option>
                      </select>
                      <span className="pointer-events-none absolute right-0 top-1 text-[10px] text-[#655950]">
                        ⌄
                      </span>
                    </div>
                  </div>
                  {/* LOCATION */}
                  <div>
                    <label
                      htmlFor="location"
                      className="mb-2 block font-['Inter'] text-[8px] font-medium uppercase tracking-[0.24em] text-[#9b8978]"
                    >
                      Location
                    </label>
                    <div className="relative">
                      <select
                        id="location"
                        name="location"
                        required=""
                        className="h-9 w-full appearance-none border-0 border-b border-[#d8d0c6] bg-transparent px-0 pb-2 pr-5 font-['Inter'] text-[11px] text-[#3e3833] outline-none transition focus:border-[#b58a52]"
                      >
                        <option value="">Choose location</option>
                        <option>Mahanagar</option>
                        <option>Gomti Nagar</option>
                        <option>Hazratganj</option>
                      </select>
                      <span className="pointer-events-none absolute right-0 top-1 text-[10px] text-[#655950]">
                        ⌄
                      </span>
                    </div>
                  </div>
                  {/* DATE */}
                  <div>
                    <label
                      htmlFor="booking_date"
                      className="mb-2 block font-['Inter'] text-[8px] font-medium uppercase tracking-[0.24em] text-[#9b8978]"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="booking_date"
                      name="booking_date"
                      min={today}
                      required=""
                      className="h-9 w-full border-0 border-b border-[#d8d0c6] bg-transparent px-0 pb-2 font-['Inter'] text-[11px] text-[#3e3833] outline-none transition focus:border-[#b58a52]"
                    />
                  </div>
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-['Inter'] text-[8px] font-medium uppercase tracking-[0.24em] text-[#9b8978]"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required=""
                      className="h-9 w-full border-0 border-b border-[#d8d0c6] bg-transparent px-0 pb-2 font-['Inter'] text-[11px] text-[#3e3833] placeholder-[#aaa19a] outline-none transition focus:border-[#b58a52]"
                    />
                  </div>
                  {/* PHONE */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block font-['Inter'] text-[8px] font-medium uppercase tracking-[0.24em] text-[#9b8978]"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Mobile number"
                      required=""
                      className="h-9 w-full border-0 border-b border-[#d8d0c6] bg-transparent px-0 pb-2 font-['Inter'] text-[11px] text-[#3e3833] placeholder-[#aaa19a] outline-none transition focus:border-[#b58a52]"
                    />
                  </div>
                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-['Inter'] text-[8px] font-medium uppercase tracking-[0.24em] text-[#9b8978]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email"
                      required=""
                      className="h-9 w-full border-0 border-b border-[#d8d0c6] bg-transparent px-0 pb-2 font-['Inter'] text-[11px] text-[#3e3833] placeholder-[#aaa19a] outline-none transition focus:border-[#b58a52]"
                    />
                  </div>
                </div>
                {/* =================================================
           BOTTOM MINI BAR
      ================================================== */}
                <div className="mt-5 flex flex-col gap-3 border-t border-[#eee8df] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* WhatsApp */}
                  <label className="flex cursor-pointer items-center gap-2 font-['Inter'] text-[9px] text-[#91877e]">
                    <input
                      type="checkbox"
                      name="whatsapp"
                      defaultValue={1}
                      className="peer sr-only"
                    />
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#cbbda9] transition-all peer-checked:border-[#b58a52] peer-checked:bg-[#b58a52]">
                      <svg
                        className="h-2.5 w-2.5 text-white opacity-0 peer-checked:opacity-100"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    </span>
                    Prefer WhatsApp?
                  </label>
                  {/* Confirmation */}
                  <div className="flex items-center gap-2 font-['Inter'] text-[8px] font-medium uppercase tracking-[0.17em] text-[#aaa098]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b58a52]" />
                    We'll confirm your appointment shortly
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
export default Hero;