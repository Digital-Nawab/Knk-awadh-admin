/**
 * Wellness-page groupings, per the "WELLNESS" banner list in the source doc (p.29).
 * Items that already have a full description elsewhere in the PDF are pulled from
 * TREATMENT_BY_KEY by key rather than retyped — see docs/content note in the build brief.
 * Cold Plunge / Infrared Sauna have no PDF description and are flagged placeholders, not
 * invented copy. Wellness Spa has no individual items yet, but its intro `description` is
 * real client-supplied copy (from the Aug 2026 feedback round), not a placeholder.
 */

export type WellnessEntry =
  | { type: "key"; key: string; displayName?: string }
  | { type: "placeholder"; name: string; note: string }
  | { type: "link"; name: string; to: string; note: string };

export interface WellnessGroup {
  slug: string;
  title: string;
  entries: WellnessEntry[];
  /** No items exist in the source doc for this group yet — render as an intro-only section (see `description`). */
  pending?: boolean;
  /** Intro copy shown in place of items, for a `pending` group. */
  description?: string;
}

export const WELLNESS_GROUPS: WellnessGroup[] = [
  {
    slug: "iv-wellness",
    title: "IV Therapy",
    entries: [
      { type: "key", key: "iv-wellness-infusions__vitality-infusion" },
      { type: "key", key: "iv-wellness-infusions__immunity-infusion" },
      { type: "key", key: "iv-wellness-infusions__glow-infusion" },
      { type: "key", key: "iv-wellness-infusions__rejuvenation-infusion" },
    ],
  },
  {
    slug: "recovery-regeneration",
    title: "Recovery & Regeneration",
    entries: [
      {
        type: "key",
        key: "red-light-therapy__rlt-standalone-session",
        displayName: "Red Light Therapy",
      },
      {
        type: "placeholder",
        name: "Cold Plunge",
        note: "Details to be finalised by the client.",
      },
      {
        type: "placeholder",
        name: "Infrared Sauna",
        note: "Details to be finalised by the client.",
      },
      { type: "key", key: "body-contouring__lymphatic-drainage-therapy" },
      { type: "key", key: "body-contouring__pressotherapy" },
    ],
  },
  // {
  //   slug: "body-wellness",
  //   title: "Body Wellness",
  //   entries: [
  //     { type: "key", key: "weight-management__nutrition-lifestyle-guidance" },
  //     {
  //       type: "link",
  //       name: "Weight Management",
  //       to: "/treatments#weight-management",
  //       note: "See the full Weight Management programme on the Treatments page.",
  //     },
  //   ],
  // },
  {
    slug: "body-contouring",
    title: "Body Contouring",
    entries: [
      { type: "key", key: "body-contouring__body-sculpting" },
      { type: "key", key: "body-contouring__body-firming" },
      { type: "key", key: "body-contouring__loose-skin-treatment" },
      { type: "key", key: "body-contouring__inch-loss-therapy" },
      { type: "key", key: "body-contouring__fat-blast-therapy" },
      { type: "key", key: "body-contouring__knk-body-sculpt" },
      { type: "key", key: "body-contouring__mesolipolysis-treatment" },
    ],
  },
  {
    slug: "wellness-spa",
    title: "Wellness Spa",
    entries: [],
    pending: true,
    description:
      "A considered escape from the everyday with restorative treatments designed to relax the body, quiet the mind and bring you back to yourself.",
  },
];
