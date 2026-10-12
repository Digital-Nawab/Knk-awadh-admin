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

export const metadata = {
  title: "KNK Awadh Bridal | Luxury Bridal Makeup & Aesthetics in Lucknow",
  description:
    "Premium beauty, hair, makeup, aesthetics and professional bridal services at KNK Awadh, Lucknow. HD & Airbrush bridal couture.",
  keywords: [
    "KNK Awadh",
    "Luxury salon Lucknow",
    "Best bridal makeup Lucknow",
    "Airbrush bridal Lucknow",
    "HD bridal makeup Lucknow",
    "Bridal studio Hazratganj",
    "Bridal studio Gomti Nagar",
    "Bridal studio Mahanagar",
  ],
  icons: {
    icon: "/landing-page/images/logo.png",
    apple: "/landing-page/images/logo.png",
  },
};

export default function MakeupLandingLayout({ children }) {
  return (
    <div
      className={`${cormorant.variable} ${plusJakarta.variable} ${playfair.variable} ${alexBrush.variable} scroll-smooth font-sans`}
    >
      {children}
    </div>
  );
}
