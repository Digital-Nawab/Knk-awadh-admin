/**
 * Full Treatments-page catalogue, transcribed verbatim from the client-approved
 * "KNK SKKIN WEBSITE.pdf" (Services page content, pp.12-27). Do not shorten or
 * rewrite this copy — it is already approved.
 */

export interface TreatmentItem {
  /** Globally unique, stable id: `${categorySlug}__${kebab-name}`. */
  key: string;
  name: string;
  description: string;
  /** Set on the one signature item worth calling out (currently only the KNK Glow Facial). */
  highlight?: string;
}

export interface TreatmentCategory {
  slug: string;
  title: string;
  /** Pinterest mood-reference link from the source doc — for internal reference only, never rendered as a live link. */
  pinRef?: string;
  /** Freeform note shown under the category heading (currently only used by Pre-Bridal). */
  note?: string;
  items: TreatmentItem[];
}

const category = (
  slug: string,
  title: string,
  pinRef: string | undefined,
  items: Omit<TreatmentItem, "key">[],
  note?: string,
): TreatmentCategory => ({
  slug,
  title,
  pinRef,
  note,
  items: items.map((item) => ({
    ...item,
    key: `${slug}__${item.name
      .toLowerCase()
      .replace(/[()]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}`,
  })),
});

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  category("skin-rejuvenation", "Skin Rejuvenation", "https://pin.it/2rakw8c7T", [
    {
      name: "Photofacial",
      description:
        "A light-based treatment designed to refresh dull, uneven-looking skin and improve overall radiance. Leaves the skin looking clearer, brighter and more even.",
    },
    {
      name: "Hollywood Treatment",
      description:
        "A quick resurfacing treatment designed to refine texture and revive tired-looking skin. Ideal when you want a smoother, fresher-looking complexion with minimal downtime.",
    },
    {
      name: "Derma Facial",
      description:
        "A customised facial focused on deep cleansing, exfoliation and skin renewal. Helps leave the skin smoother, cleaner and visibly refreshed.",
    },
    {
      name: "Skin Brightening Facial",
      description:
        "Designed to improve the appearance of dull, uneven skin and restore luminosity. Leaves the complexion looking fresher and more radiant.",
    },
    {
      name: "Bridal Radiance Facial",
      description:
        "A pre-event treatment designed to enhance skin clarity, hydration and radiance. Ideal for creating a fresh, polished complexion before your special occasion.",
    },
    {
      name: "Korean Glass Skin Facial",
      description:
        "A multi-step facial focused on hydration, refinement and luminous-looking skin. Leaves the complexion smooth, dewy and visibly refreshed.",
    },
    {
      name: "KNK Glow Facial",
      highlight: "Highly Recommended",
      description:
        "A signature skin-refining treatment designed to revive dull, tired skin. The result is a naturally fresh, hydrated glow without looking overdone.",
    },
    {
      name: "Deep Cleansing Facial",
      description:
        "A thorough treatment designed to cleanse pores, remove buildup and refresh the skin. Ideal for congested or tired-looking skin.",
    },
    {
      name: "Radiance Boost Treatment",
      description:
        "A targeted treatment designed to restore brightness and improve the overall appearance of the skin. Leaves the complexion looking refreshed, smooth and luminous.",
    },
  ]),

  category("peels", "Peels", "https://pin.it/4DR8FKjve", [
    {
      name: "Glow Peel",
      description:
        "A gentle resurfacing treatment designed to brighten dull skin and refine its appearance. Leaves the complexion looking smoother, clearer and more radiant.",
    },
    {
      name: "Herbal Peel",
      description:
        "A skin-renewing peel designed to improve texture and revive a tired complexion. Helps reveal fresher-looking skin with a more even appearance.",
    },
    {
      name: "Acne Peel",
      description:
        "A targeted peel designed for acne-prone and congested skin. Helps refine pores, manage breakouts and improve overall skin clarity.",
    },
    {
      name: "Anti-Ageing Peel",
      description:
        "Designed to improve the appearance of fine lines, uneven texture and dullness. Leaves skin looking smoother, fresher and more youthful.",
    },
  ]),

  category("acne-scar-management", "Acne & Scar Management", "https://pin.it/47oz1Wiyn", [
    {
      name: "Acne Management Program",
      description:
        "A dermatologist-led, personalised approach to managing acne based on your skin and concerns. The treatment plan evolves according to your skin's response and goals.",
    },
    {
      name: "Subcision — Acne Scars",
      description:
        "A targeted procedure designed to release the fibrous bands beneath depressed acne scars. Helps improve uneven texture and create a smoother-looking skin surface.",
    },
    {
      name: "Acne Peel — Salicylic Acid",
      description:
        "A targeted peel for acne-prone and congested skin. Helps reduce buildup, refine pores and improve the appearance of active breakouts.",
    },
    {
      name: "Cryotherapy",
      description:
        "A targeted procedure that uses controlled cold to treat selected skin lesions. Performed after following assessment to determine whether the treatment is appropriate.",
    },
    {
      name: "Microneedling — Acne Scars",
      description:
        "Uses controlled micro-injuries to support the skin's natural renewal process. Designed to gradually improve the appearance of acne scars and uneven texture.",
    },
    {
      name: "PRP + Microneedling — Acne Scars",
      description:
        "Combines microneedling with PRP to support skin renewal and collagen production. Designed to improve the appearance and texture of acne scars over a course of treatments.",
    },
    {
      name: "MNRF — Acne Scars",
      description:
        "A precision treatment combining microneedling with radiofrequency energy. Designed to stimulate collagen and improve deeper textural irregularities.",
    },
    {
      name: "MNRF + PRP",
      description:
        "Combines radiofrequency microneedling with PRP for a more comprehensive scar-renewal approach. Designed to support collagen formation and improve skin texture.",
    },
  ]),

  category("pigmentation", "Pigmentation", "https://pin.it/3amqezIS1", [
    {
      name: "Pigmentation Correction — Peel",
      description:
        "A targeted peel designed to improve the appearance of uneven pigmentation and dullness. Helps reveal a more even and brighter-looking complexion.",
    },
    {
      name: "Pigmentation Correction — Laser",
      description:
        "A targeted laser treatment designed to address selected forms of pigmentation. Treatment is personalised according to the type, depth and cause of pigmentation.",
    },
    {
      name: "Melasma Management Protocol",
      description:
        "A dermatologist-guided approach to managing melasma with a personalised treatment plan. Designed around your skin type, pigmentation pattern and long-term maintenance needs.",
    },
  ]),

  category("advanced-skkin-treatments", "Advanced SKKIN Treatments", "https://pin.it/1XpYFLnNH", [
    {
      name: "Bio Plasma Prime PRP",
      description:
        "An advanced PRP treatment using your own platelet-rich plasma to support skin renewal. Designed to improve overall skin quality, texture and radiance.",
    },
    {
      name: "Bio Gen Plasma PRP",
      description:
        "A more advanced PRP approach designed to support collagen stimulation and skin regeneration. Ideal for addressing multiple signs of skin ageing and textural change.",
    },
    {
      name: "PRP + Microneedling — Classic",
      description:
        "Combines microneedling with PRP to support the skin's natural repair process. Helps improve texture, radiance and the appearance of fine lines and scars.",
    },
    {
      name: "Vampire Facial",
      description:
        "A PRP-based skin rejuvenation treatment designed to stimulate natural skin renewal. Helps improve the appearance of texture, fine lines and overall skin quality.",
    },
    {
      name: "Advanced Exosome Therapy — Face",
      description:
        "A regenerative-focused treatment using exosome-based technology to support skin renewal. Designed to improve the appearance of texture, tone and overall skin quality.",
    },
    {
      name: "Salmon DNA (PDRN) Therapy",
      description:
        "A regenerative skin treatment using PDRN technology to support skin repair and renewal. Designed to improve hydration, texture and overall skin appearance.",
    },
    {
      name: "Skin Boosters",
      description:
        "Injectable treatments designed to improve skin hydration and quality from within. Ideal for creating smoother, fresher and more supple-looking skin.",
    },
    {
      name: "Carbon Peel Laser",
      description:
        "A laser-based treatment that combines a carbon mask with controlled laser energy. Helps refine the appearance of pores, texture and excess oil while refreshing the complexion.",
    },
    {
      name: "Active Microneedling",
      description:
        "A customised microneedling treatment designed to stimulate the skin's natural renewal process. Helps improve texture, pores, fine lines and overall skin quality.",
    },
  ]),

  category("anti-ageing", "Anti-Ageing", "https://pin.it/gpCey6RnG", [
    {
      name: "HIFU Face",
      description:
        "A non-surgical treatment using focused ultrasound energy to support skin tightening and collagen production. Designed to improve facial definition and the appearance of mild skin laxity.",
    },
    {
      name: "HIFU Neck",
      description:
        "Focused ultrasound treatment designed to improve the appearance of loose or lax skin around the neck. Supports gradual collagen renewal for a firmer-looking profile.",
    },
    {
      name: "Non-Surgical Face Lift",
      description:
        "A customised combination approach designed to improve facial definition without surgery. Treatment is tailored to address laxity, contours and individual ageing concerns.",
    },
    {
      name: "Dermal Fillers",
      description:
        "Injectable treatments designed to restore or enhance facial volume and definition. Used selectively to create balanced, natural-looking results.",
    },
    {
      name: "Thread Lift",
      description:
        "A minimally invasive treatment using dissolvable threads to provide support and lift to selected areas. Designed to enhance facial contours while supporting collagen formation.",
    },
    {
      name: "Botox",
      description:
        "A targeted injectable treatment that temporarily relaxes specific muscles responsible for dynamic lines. Used to soften the appearance of wrinkles while maintaining natural facial movement.",
    },
    {
      name: "Age Defence Treatment",
      description:
        "A personalised treatment designed to address early signs of ageing and maintain skin quality. Focuses on prevention, refinement and long-term skin health.",
    },
    {
      name: "Fine Lines & Wrinkles Treatment",
      description:
        "A targeted approach to soften the appearance of fine lines and wrinkles. Treatment is selected according to the area, skin condition and underlying cause.",
    },
    {
      name: "KNK Collagen Lift",
      description:
        "A collagen-focused treatment designed to improve firmness, texture and overall skin quality. Helps create a naturally refreshed and more lifted appearance.",
    },
    {
      name: "Jaw Sculpt & Lift",
      description:
        "A targeted treatment designed to enhance jawline definition and improve the appearance of lower-face laxity. Creates a more refined, structured facial contour.",
    },
  ]),

  category("hydra-bar", "Hydra Bar", "https://pin.it/1qsfpJBtn", [
    {
      name: "KNK Signature HydraFacial",
      description:
        "Our signature multi-step facial combines cleansing, exfoliation, extraction and hydration. Leaves skin visibly fresher, smoother and more luminous.",
    },
    {
      name: "Classic HydraFacial",
      description:
        "A gentle, non-invasive facial designed to cleanse, exfoliate and hydrate. Ideal for maintaining clearer, smoother and healthier-looking skin.",
    },
    {
      name: "Pro HydraFacial",
      description:
        "An enhanced HydraFacial experience with targeted steps selected according to your skin concerns. Designed to deliver deeper cleansing, hydration and visible refinement.",
    },
    {
      name: "Hydra Lift",
      description:
        "A hydration-focused treatment designed to refresh and plump the appearance of tired skin. Leaves the complexion smoother, dewier and more lifted-looking.",
    },
  ]),

  category("minor-procedures", "Minor Procedures", "https://pin.it/d7eOJ8DYQ", [
    {
      name: "Mole Removal",
      description:
        "A targeted procedure for the removal of selected moles following clinical assessment. The appropriate technique is determined by the doctor based on the lesion.",
    },
    {
      name: "Skin Tag Removal",
      description:
        "A quick, targeted procedure for removing selected skin tags. Treatment is performed following an assessment to determine suitability.",
    },
    {
      name: "Wart Removal",
      description:
        "A targeted procedure designed to remove selected warts safely and appropriately. Treatment method depends on the type and location of the wart.",
    },
  ]),

  category("stretch-marks", "Stretch Marks Management", "https://pin.it/5ei2Fhwcs", [
    {
      name: "Stretch Marks Management Protocol",
      description:
        "A personalised dermatologist-led approach designed around the age, appearance and depth of your stretch marks. Treatment focuses on gradually improving their texture and visibility.",
    },
    {
      name: "Microneedling",
      description:
        "Uses controlled micro-injuries to stimulate the skin's natural repair and collagen response. Designed to gradually soften the appearance of stretch marks.",
    },
    {
      name: "Microneedling + PRP",
      description:
        "Combines microneedling with PRP to support collagen formation and skin renewal. Designed to improve the texture and appearance of stretch marks over time.",
    },
    {
      name: "MNRF",
      description:
        "Radiofrequency microneedling delivers controlled energy beneath the skin to support collagen remodelling. Designed for deeper textural improvement in stretch marks.",
    },
    {
      name: "MNRF + PRP",
      description:
        "Combines radiofrequency microneedling with PRP for enhanced skin-renewal support. Designed to improve texture and gradually soften the appearance of stretch marks.",
    },
  ]),

  // category("weight-management", "Weight Management", "https://pin.it/7rPkKPn6c", [
  //   {
  //     name: "Nutrition & Lifestyle Guidance",
  //     description:
  //       "Personalised guidance focused on nutrition, movement and sustainable lifestyle habits. Designed to support healthier routines and long-term weight-management goals.",
  //   },
  // ]),

  category("body-contouring", "Body Contouring", "https://pin.it/587xa5OUy", [
    {
      name: "Body Sculpting",
      description:
        "A non-surgical body contouring approach designed to refine selected areas of the body. Treatment is tailored to your goals, body composition and areas of concern.",
    },
    {
      name: "Body Firming",
      description:
        "Designed to improve the appearance of skin firmness and elasticity in targeted areas. Helps create a smoother, more toned-looking contour.",
    },
    {
      name: "Loose Skin Treatment",
      description:
        "A targeted approach for areas affected by skin laxity. Treatment is selected according to the degree of laxity, skin quality and desired outcome.",
    },
    {
      name: "Inch Loss Therapy",
      description:
        "A non-surgical approach designed to support body contouring in targeted areas. Focuses on improving body definition rather than overall weight loss.",
    },
    {
      name: "Fat Blast Therapy",
      description:
        "Designed to target localised areas of stubborn fat as part of a personalised contouring plan. Suitable treatment options are determined following an assessment.",
    },
    {
      name: "KNK Body Sculpt",
      description:
        "Our advanced body-contouring approach combines targeted technologies to address definition and firmness. Designed around your individual body goals and treatment areas.",
    },
    {
      name: "Mesolipolysis Treatment",
      description:
        "A targeted body-contouring treatment designed to address localised fat deposits. Treatment suitability is assessed individually before proceeding.",
    },
    {
      name: "Lymphatic Drainage Therapy",
      description:
        "A gentle treatment designed to support lymphatic circulation and reduce the feeling of fluid retention. Leaves the body feeling lighter, less congested and refreshed.",
    },
    {
      name: "Pressotherapy",
      description:
        "Uses controlled compression to support circulation and lymphatic drainage. A relaxing treatment that can help reduce the sensation of heaviness and fluid retention.",
    },
  ]),

  category("iv-wellness-infusions", "IV Wellness Infusions", "https://pin.it/2QzGmgiIq", [
    {
      name: "Vitality Infusion",
      description:
        "Designed to support hydration, energy and overall well-being through intravenous nutrient delivery. Formulation is selected according to individual needs and medical assessment.",
    },
    {
      name: "Immunity Infusion",
      description:
        "A nutrient-based IV infusion designed to support general wellness and hydration. Administered following appropriate medical assessment.",
    },
    {
      name: "Glow Infusion",
      description:
        "Designed to support hydration and overall skin wellness from within. A personalised infusion approach focused on maintaining a refreshed, healthy-looking appearance.",
    },
    {
      name: "Rejuvenation Infusion",
      description:
        "A wellness-focused IV infusion designed to support hydration, recovery and overall well-being. Formulation is personalised based on individual requirements.",
    },
  ]),

  category("hair", "Hair", "https://pin.it/LkqynycPJ", [
    {
      name: "Hair Fall Management Protocol",
      description:
        "A dermatologist-led approach to understanding and managing hair fall at its source. Your treatment plan is personalised according to your hair, scalp and underlying concerns.",
    },
    {
      name: "Hair Regrowth Therapy",
      description:
        "A targeted treatment approach designed to support healthier hair growth. Treatment is selected according to the cause and pattern of hair loss.",
    },
    {
      name: "Hair Density Therapy",
      description:
        "Designed to support the appearance of fuller, denser-looking hair. Your protocol is personalised according to your scalp and degree of thinning.",
    },
    {
      name: "Scalp Rejuvenation",
      description:
        "A targeted treatment designed to improve scalp health and create a better environment for hair growth. Helps refresh, nourish and rebalance the scalp.",
    },
    {
      name: "Scalp Microneedling",
      description:
        "Uses controlled micro-injuries to stimulate the scalp's natural repair response. Designed to support scalp health and hair-growth protocols.",
    },
    {
      name: "PRP Hair Restoration",
      description:
        "Uses platelet-rich plasma derived from your own blood to support hair follicles. Designed to improve hair density and support healthier-looking growth.",
    },
    {
      name: "PRP + Microneedling",
      description:
        "Combines PRP with controlled scalp microneedling to support follicular stimulation. Designed as part of a personalised hair-restoration plan.",
    },
    {
      name: "GFC Hair Therapy",
      description:
        "A growth-factor based treatment designed to support hair follicle health and regeneration. Used as part of a personalised protocol for thinning and hair loss.",
    },
    {
      name: "Advanced Hair Regeneration",
      description:
        "An advanced, personalised approach combining selected hair-restoration technologies. Designed to address thinning, density and overall scalp health.",
    },
    {
      name: "Hair Strengthening Therapy",
      description:
        "Designed to improve the condition and resilience of existing hair. Helps support stronger, healthier-looking hair as part of a broader hair-care protocol.",
    },
    {
      name: "Advanced Exosome Therapy — Scalp",
      description:
        "An advanced regenerative-focused treatment designed to support scalp and follicular health. Used selectively as part of a personalised hair-restoration plan.",
    },
    {
      name: "Thinning Hair Treatment",
      description:
        "A targeted approach for hair that has become finer or less dense. Treatment is guided by the underlying cause, scalp condition and individual hair goals.",
    },
    {
      name: "Postpartum Hair Restoration",
      description:
        "A personalised approach to hair changes following pregnancy and childbirth. Designed to support recovery of hair density while addressing the underlying factors contributing to hair fall.",
    },
    {
      name: "KNK Hair Revival",
      description:
        "Our advanced hair-restoration approach combines selected therapies to address hair fall, thinning and reduced density. Designed around your individual scalp and hair needs.",
    },
  ]),

  category("laser-hair-reduction", "Laser Hair Reduction", "https://pin.it/32xm1vCHY", [
    {
      name: "Hair Removal Protocol",
      description:
        "A dermatologist-guided laser hair reduction plan personalised to your hair type, skin type and treatment areas. Designed for progressive reduction in unwanted hair over multiple sessions.",
    },
    {
      name: "LHR — Face",
      description:
        "Laser hair reduction for unwanted facial hair using a protocol selected according to your skin and hair characteristics. Designed for gradual, long-term reduction.",
    },
    {
      name: "LHR — Face + Neck",
      description:
        "A combined facial and neck laser hair reduction protocol. Treatment is customised to your skin type, hair density and individual response.",
    },
    {
      name: "LHR — Arms",
      description:
        "Laser hair reduction designed to progressively reduce unwanted hair on the arms. Sessions are tailored according to hair growth and skin characteristics.",
    },
    {
      name: "LHR — Legs",
      description:
        "A targeted laser hair reduction treatment for the legs. Designed for progressive reduction in hair growth over a planned course of sessions.",
    },
    {
      name: "LHR — Bikini Region",
      description:
        "A targeted laser hair reduction protocol for the bikini area. Treatment is performed with attention to skin sensitivity and individual comfort.",
    },
    {
      name: "LHR — Whole Body",
      description:
        "A comprehensive laser hair reduction plan covering multiple body areas. Your protocol is customised according to skin type, hair density and treatment response.",
    },
  ]),

  category("laser", "Laser", "https://pin.it/3gfGKN1wi", [
    {
      name: "Laser Skin Rejuvenation",
      description:
        "A laser-based treatment designed to improve the appearance of skin texture, tone and overall radiance. Helps create a smoother, more refreshed complexion.",
    },
    {
      name: "Laser Toning",
      description:
        "A gentle laser approach designed to improve the appearance of uneven pigmentation and dullness. Supports a more even and refined-looking complexion.",
    },
    {
      name: "Laser Spot Correction",
      description:
        "A targeted laser treatment for selected pigmentation and dark spots. Treatment is customised according to the type and depth of pigmentation.",
    },
    {
      name: "Laser Skin Resurfacing",
      description:
        "Designed to improve skin texture and surface irregularities through controlled laser energy. Helps reveal smoother, more refined-looking skin.",
    },
    {
      name: "Laser Glow Treatment",
      description:
        "A targeted laser treatment designed to refresh dull skin and enhance overall radiance. Leaves the complexion looking clearer, smoother and more luminous.",
    },
  ]),

  category("lip-hyperpigmentation", "Lip Hyperpigmentation", "https://pin.it/3zznoPHdQ", [
    {
      name: "Chemical Peel",
      description:
        "A targeted peel designed to improve the appearance of pigmentation and uneven tone on the lips. Treatment is customised according to the cause and sensitivity of the area.",
    },
    {
      name: "Laser",
      description:
        "A targeted laser approach for selected cases of lip pigmentation. Treatment is planned according to your lip condition and pigmentation pattern.",
    },
  ]),

  category("under-eye-pigmentation", "Under-Eye Pigmentation", "https://pin.it/7K7W3Hvnh", [
    {
      name: "Chemical Peel",
      description:
        "A carefully selected peel designed to address pigmentation around the under-eye area. Treatment is tailored to the delicate nature of the skin.",
    },
    {
      name: "Laser",
      description:
        "A targeted laser treatment for suitable cases of under-eye pigmentation. The approach is personalised according to skin type and pigmentation pattern.",
    },
  ]),

  category("red-light-therapy", "Red Light Therapy", "https://pin.it/4j06fWcSJ", [
    {
      name: "RLT — Standalone Session",
      description:
        "A non-invasive light-based treatment designed to support skin recovery, calmness and overall skin quality. A relaxing session for those looking to incorporate red light therapy into their wellness routine.",
    },
    {
      name: "RLT — Post-Procedure Add-On",
      description:
        "A shorter red light therapy session designed to complement selected aesthetic procedures. Helps support the skin's recovery and calming process.",
    },
    {
      name: "RLT — Six-Session Programme",
      description:
        "A structured course designed to incorporate red light therapy consistently into your skin or wellness routine. The programme can be tailored according to your individual goals.",
    },
  ]),

  category(
    "pre-bridal",
    "Pre-Bridal",
    undefined,
    [
      {
        name: "Bridal Glow Package",
        description:
          "A three-session personalised programme designed to prepare your skin for your wedding. Treatments are selected to support clarity, hydration and a naturally radiant complexion.",
      },
      {
        name: "Bridal Radiance Package",
        description:
          "A five-session pre-bridal programme designed around your skin type and wedding timeline. A sequenced approach to achieving smoother, clearer and more luminous-looking skin.",
      },
      {
        name: "Pre-Event Express Glow",
        description:
          "A single-session treatment designed to refresh and brighten the skin before an important occasion. Ideal when you want a polished, rested and naturally radiant look.",
      },
    ],
    "Bridal programmes are personalised after consultation based on skin type, concerns, timeline and desired outcome.",
  ),

  category("targeted-injections", "Targeted Injections", "https://pin.it/56lG1TkSz", [
    {
      name: "Acne Injections",
      description:
        "Targeted injections used in selected cases to help calm individual acne lesions. Performed by a qualified medical professional following assessment.",
    },
    {
      name: "Keloid Injections",
      description:
        "Targeted injections used to help flatten and soften selected keloid scars. Treatment is planned according to the size, location and characteristics of the scar.",
    },
  ]),
];

/** Flat lookup so other pages (e.g. Wellness) can reuse an item's copy by key instead of retyping it. */
export const TREATMENT_BY_KEY: Record<string, TreatmentItem> = TREATMENT_CATEGORIES.reduce(
  (acc, cat) => {
    cat.items.forEach((item) => {
      acc[item.key] = item;
    });
    return acc;
  },
  {} as Record<string, TreatmentItem>,
);
