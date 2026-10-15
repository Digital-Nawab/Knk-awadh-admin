import { Cormorant_Garamond, Plus_Jakarta_Sans, Playfair_Display, Alex_Brush } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const dynamicMeta = await getDynamicMetadata('/salon-services-lucknow', {
    title: "KNK Salon Awadh | Luxury Hair, Skin, Nails & Beauty Studio in Lucknow",
    description:
      "KNK Salon Awadh Lucknow — luxury haircuts, French balayage, Nanoplastia, Keratin, HydraFacials, and nail art across Mahanagar, Gomti Nagar & Hazratganj.",
    keywords:
      "KNK Awadh Salon, Luxury salon Lucknow, Best hair salon Lucknow, Nanoplastia Lucknow, Keratin treatment Lucknow, HydraFacial Lucknow, Nail extensions Lucknow",
    ogImage: "/salon-landing-page/images/salon/salon-about.webp",
  });
  return {
    ...dynamicMeta,
    icons: {
      icon: "/salon-landing-page/images/logo.png",
      apple: "/salon-landing-page/images/logo.png",
    },
  };
}

export default function SalonLandingLayout({ children }) {
  return (
    <div
      className={`${cormorant.variable} ${plusJakarta.variable} ${playfair.variable} ${alexBrush.variable} scroll-smooth font-sans min-h-screen bg-[#FAF8F5] text-[#191715] selection:bg-[#C5A265] selection:text-white antialiased overflow-x-hidden`}
    >
      {children}
    </div>
  );
}
