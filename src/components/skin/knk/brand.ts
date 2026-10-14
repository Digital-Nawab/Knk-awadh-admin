/** Lockup with white SKKIN wordmark — use over dark backgrounds. */
export const LOGO_ON_DARK = "/skin/assets/knk-skkin-logo-dark.png";
/** Lockup with black SKKIN wordmark — use over light backgrounds. */
export const LOGO_ON_LIGHT = "/skin/assets/knk-skkin-logo-light.png";

export const CONTACT = {
  address:
    "Ground Floor, 11 B, Tilak Marg (Opposite Ganna Sansthaan), Dalibagh Colony, Hazratganj",
  city: "Lucknow",
  phonePlaceholder: "+91 88810 00529",
  emailPlaceholder: "info@knksalonawadh.com",
  instagramUrl: "https://www.instagram.com/knk_awadh/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "KNK SKKIN, Ground Floor, 11 B, Tilak Marg, Dalibagh Colony, Hazratganj, Lucknow",
    ),
};

export type NavLink =
  | { label: string; kind: "route"; to: string }
  | { label: string; kind: "anchor"; hash: string }
  | {
      label: string;
      kind: "dropdown";
      items: { label: string; to: string }[];
    };

/** Header nav, in order. "Book a Consultation" is deliberately not in this list — it's rendered as the separate CTA slot. */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", kind: "route", to: "/" },
  { label: "About", kind: "anchor", hash: "#our-vision" },
  { label: "Treatments", kind: "route", to: "/skin-aesthetics/treatments" },
  { label: "Wellness", kind: "route", to: "/skin-aesthetics/wellness" },
  {
    label: "Aesthetics",
    kind: "dropdown",
    items: [
      { label: "Aesthetics", to: "/skin-aesthetics/aesthetic" },
      { label: "Microblading", to: "/skin-aesthetics/microblading" },
      { label: "Laser", to: "/skin-aesthetics/laser-treatment" },
    ],
  },
];

export const BOOK_CONSULTATION_HASH = "#book-consultation";
