import type { Metadata } from "next";
import ClientProviders from "@/components/skin/ClientProviders";
import "@/styles/skin.css";

export const metadata: Metadata = {
  title: "KNK SKKIN — Skin, Understood | Advanced Aesthetics & Well-being",
  description:
    "KNK SKKIN is an advanced aesthetics and well-being studio in Lucknow — medifacials, laser, injectables, red light therapy, cold plunge and IV therapy, led by licensed skin doctors.",
  authors: [{ name: "KNK SKKIN" }],
  icons: {
    icon: "/skin/favicon.png",
  },
  openGraph: {
    title: "KNK SKKIN — Skin, Understood",
    description: "A more considered approach to skin, aesthetics, recovery and well-being.",
    type: "website",
  },
};

export default function SkinLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="skin-theme">
      <ClientProviders>{children}</ClientProviders>
    </div>
  );
}
