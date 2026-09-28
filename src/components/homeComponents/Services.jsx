import React from 'react';
import Link from 'next/link';

function Services() {
    return (
        <>
            {/* ============ SERVICES ============ */}
            <section className="bg-[#f8f6f1] px-5 py-16 md:px-10 lg:px-[9%] lg:py-24">
                {/* ================= HEADER ================= */}
                <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_300px]">
                    <div>
                        <h2 className="font-['Cormorant_Garamond'] text-[56px] font-medium leading-[0.82] tracking-[-0.04em] text-[#272523] sm:text-[72px] md:text-[88px] lg:text-[96px] xl:text-[100px]">
                            Everything you need
                            <br />
                            to feel{' '}
                            <span className="italic text-[#c49a4d]">extraordinary.</span>
                        </h2>
                    </div>

                    <div className="pb-1 lg:pb-2">
                        <p className="max-w-[290px] font-['Inter'] text-[13px] font-normal leading-[1.75] text-[#5e5a55]">
                            Beauty, hair and makeup services designed around the person you
                            are — and the one you're becoming.
                        </p>
                    </div>
                </div>
                {/* ================= SERVICES ROW ================= */}
                <div className="flex flex-col gap-3 md:flex-row">
                    {/* SALON SERVICES */}
                    <Link
                        href="/services"
                        className="group relative h-[530px] overflow-hidden md:flex-1"
                    >
                        <img
                            src="/assets/images/new/home/services/salon-service.webp"
                            alt="Beauty facial service"
                            width={400}
                            height={530}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 text-white">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h3 className="font-['Cormorant_Garamond'] text-[32px] leading-none">
                                        Hair & Salon Services
                                    </h3>
                                    <div className="mt-2 flex items-center gap-3">
                                        <span className="font-['Inter'] text-[10px]">
                                            Haircuts, colour, styling, keratin, smoothening & hair care
                                        </span>
                                    </div>
                                </div>
                                <span className="mb-1 text-[25px] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                    ↗
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* AESTHETICS */}
                    <Link
                        href="/#aesthetics"
                        className="group relative h-[530px] overflow-hidden md:flex-1"
                    >
                        <img
                            src="/assets/images/new/home/services/aesthetics.webp"
                            alt="Aesthetics service"
                            width={400}
                            height={530}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 text-white">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h3 className="font-['Cormorant_Garamond'] text-[32px] leading-none">
                                        Skin & Aesthetic Treatments
                                    </h3>
                                    <div className="mt-2 flex items-center gap-3">
                                        <span className="font-['Inter'] text-[10px]">
                                            Facials, skin treatments & personalised aesthetic care
                                        </span>
                                    </div>
                                </div>
                                <span className="mb-1 text-[25px] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                    ↗
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Makeup */}
                    <Link
                        href="/makeup"
                        className="group relative h-[530px] overflow-hidden md:flex-1"
                    >
                        <img
                            src="/assets/images/new/home/services/makeup.webp"
                            alt="Makeup service"
                            width={400}
                            height={530}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 text-white">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h3 className="font-['Cormorant_Garamond'] text-[32px] leading-none md:text-[34px]">
                                        Makeup Services in Lucknow
                                    </h3>
                                    <div className="mt-2 flex items-center gap-3">

                                        <span className="font-['Inter'] text-[10px] font-medium">
                                            Bridal, HD, airbrush, engagement & party makeup

                                        </span>
                                    </div>
                                </div>
                                <span className="mb-1 text-[25px] leading-none transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                    ↗
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Academy */}
                    <Link
                        href="/academy"
                        className="group relative h-[530px] overflow-hidden md:flex-1"
                    >
                        <img
                            src="/assets/images/new/home/services/academy.webp"
                            alt="Academy service"
                            width={400}
                            height={530}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 text-white">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h3 className="font-['Cormorant_Garamond'] text-[32px] leading-none">
                                        Makeup & Beauty Academy
                                    </h3>
                                    <div className="mt-2 flex items-center gap-3">

                                        <span className="font-['Inter'] text-[10px]">
                                            Professional makeup, hair, beauty & nail courses
                                        </span>
                                    </div>
                                </div>
                                <span className="mb-1 text-[25px] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                    ↗
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </>
    );
}
export default Services;