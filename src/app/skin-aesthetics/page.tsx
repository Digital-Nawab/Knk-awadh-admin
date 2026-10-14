"use client";

import Hero from "@/components/knk/Hero";
import Trust from "@/components/knk/Trust";
import Treatments from "@/components/knk/Treatments";
import SkkinSignatures from "@/components/knk/SkkinSignatures";
import Transformations from "@/components/knk/Transformations";
import Testimonials from "@/components/knk/Testimonials";
import Vision from "@/components/knk/Vision";
import FAQ from "@/components/knk/FAQ";
import Consultation from "@/components/knk/Consultation";
import Footer from "@/components/knk/Footer";
import { usePageMeta } from "@/hooks/use-page-meta";
import AboutIntro from "@/components/knk/AboutIntro";

export const dynamic = "force-dynamic";

const SkinAestheticsPage = () => {
  usePageMeta(
    "KNK SKKIN | Advanced Aesthetics & Wellness — Hazratganj, Lucknow",
    "Skin, hair, injectables and longevity, all under one roof — advanced dermatology and wellness in Hazratganj, Lucknow, guided by specialist skin doctors.",
  );

  return (
    <>
      <main>
        <Hero />
        <Trust />
        <AboutIntro />
        <Treatments />
        <SkkinSignatures />
        <Transformations />
        <Testimonials />
        <Vision />
        <FAQ />
        <Consultation />
      </main>
      <Footer />
    </>
  );
};

export default SkinAestheticsPage;
