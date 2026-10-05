export const MEN_GROOMING_SECTION_METADATA = [
    { key: "hero", label: "Hero Section", icon: "✂" },
    { key: "disciplines", label: "Core Disciplines", icon: "💈" },
    { key: "packages", label: "Combos & Packages", icon: "👑" },
    { key: "protocol", label: "4-Step Protocol", icon: "📋" },
    { key: "menu", label: "Treatment Menu", icon: "📜" },
    { key: "reviews", label: "Patron Reviews", icon: "⭐" },
    { key: "faq", label: "Inquiries (FAQ)", icon: "❓" },
    { key: "cta", label: "VIP Booking CTA", icon: "📞" },
];

export const DEFAULT_MEN_GROOMING_SECTIONS = {
    hero: {
        badge: "Awadh Gentleman's Atelier · Lucknow",
        titlePrefix: "The Art of",
        titleHighlight: "Gentleman’s Grooming",
        description:
            "Where classic barbershop discipline meets executive wellness. Precision clipper fades, bespoke beard architecture, eucalyptus hot towel wet shaves, and purifying charcoal detan therapies — executed in private comfort.",
        trustBadges: [
            { stat: "100%", label: "Single-Use Blades" },
            { stat: "10+ Yrs", label: "Master Barbers" },
            { stat: "Private", label: "Grooming Chairs" },
            { stat: "4.9 ★", label: "Guest Rating" },
        ],
        primaryBtnText: "Book Barber Chair",
        phone: "+919559321711",
        phoneText: "Call +91 95593 21711",
        showcaseImage: "/assets/images/new/home/MEN'S GROOMING.webp",
        showcaseBadge: "Private Barber Suite",
        showcaseTitle: "Awadh Heritage Finish",
        showcaseStatus: "Open Today",
        floatCardIcon: "✂",
        floatCardTitle: "Bespoke Fade & Beard",
        floatCardDesc: "Precision Single-Blade Craft",
    },

    disciplines: {
        eyebrow: "The Five Core Disciplines",
        heading: "Executive Grooming",
        headingHighlight: "Stations",
        description:
            "Select any discipline below to view the craft process, inclusions, and reserve your chair.",
        items: [
            {
                id: "haircut",
                number: "01",
                title: "Hair Cut & Styling",
                subtitle: "Cranial Calibration & Precision Fades",
                duration: "45 MINS",
                badge: "Most Requested",
                image: "/assets/images/new/home/services/haircut.webp",
                shortDesc:
                    "Tailored skin fades, low/mid tapers, textured crops, and corporate scissor cuts engineered to match your head shape and hair whorl.",
                inclusions: [
                    "Consultation calibrated to facial symmetry",
                    "Invigorating wash with cooling scalp massage",
                    "Straight-razor neck cleanup with hot lather",
                    "Custom blow-dry with matte clay or pomade",
                ],
                idealFor:
                    "Men wanting a crisp, long-lasting cut that stays sharp for 3+ weeks.",
            },
            {
                id: "beard",
                number: "02",
                title: "Beard Sculpting & Trim",
                subtitle: "Jawline Contouring & Razor Detailing",
                duration: "30 MINS",
                badge: "Barber Signature",
                image: "/assets/images/new/home/MEN'S GROOMING.webp",
                shortDesc:
                    "Architectural beard contouring to sharpen your jawline, balance symmetry, eliminate patchiness, and condition coarse facial hair.",
                inclusions: [
                    "Beard density & cheekline mapping",
                    "Steamed towel wrap to soften bristles",
                    "Straight-razor cheekline & neckline crisping",
                    "Cold-pressed cedarwood & argan oil treatment",
                ],
                idealFor:
                    "Stubble, corporate beards, full beards, and wedding groom prep.",
            },
            {
                id: "shaving",
                number: "03",
                title: "Hot Towel Shave",
                subtitle: "Traditional Single-Blade Ritual",
                duration: "35 MINS",
                badge: "The Classic Ritual",
                image: "/assets/images/new/home/services/mensgrooming.webp",
                shortDesc:
                    "Experience the lost luxury of traditional barbershop wet shaving. Steaming eucalyptus towels, rich badger-brush lather, and zero razor burn.",
                inclusions: [
                    "Pre-shave essential oil skin barrier prep",
                    "Steaming eucalyptus & lavender towel wrap",
                    "Warm badger-brush whipped lather application",
                    "Single-pass sanitized straight-razor glide",
                    "Icy closing compress & soothing witch-hazel balm",
                ],
                idealFor:
                    "Gentlemen seeking baby-smooth skin free of redness or stubble shadows.",
            },
            {
                id: "facial",
                number: "04",
                title: "Facial & Detan Clean Up",
                subtitle: "Charcoal Detox & Sun Tan Defense",
                duration: "50 MINS",
                badge: "Skin Rejuvenation",
                image: "/assets/images/new/home/services/facial.webp",
                shortDesc:
                    "Formulated specifically for thicker male skin. Clears congested pores, extracts stubborn blackheads, and removes deep urban sun tanning.",
                inclusions: [
                    "Ultrasonic deep-pore exfoliation",
                    "Activated charcoal impurity detox mask",
                    "Instant sun-tan removal lightening pack",
                    "Cooling aloe vera & peptide hydration massage",
                ],
                idealFor:
                    "Combating dullness, outdoor sun damage, oiliness, and razor irritation.",
            },
            {
                id: "hair-spa",
                number: "05",
                title: "Hair Spa & Scalp Detox",
                subtitle: "Root Nourishment & Acupressure Therapy",
                duration: "45 MINS",
                badge: "Stress Relief",
                image: "/assets/images/new/home/services/hairspa.webp",
                shortDesc:
                    "Revitalize fatigued hair roots and banish dandruff. Combines deep cleansing scalp scrub, ozone steam, and a 20-minute therapeutic head massage.",
                inclusions: [
                    "Anti-dandruff micro-exfoliating scalp scrub",
                    "Ozone steam infusion to open follicle roots",
                    "20-Minute acupressure head, neck & shoulder massage",
                    "Cold-water cuticle close & hair-strengthening tonic",
                ],
                idealFor:
                    "Relieving executive stress, dry itchy scalp, hair fall, and fatigue.",
            },
        ],
    },

    packages: {
        eyebrow: "Curated Combinations",
        heading: "Signature Grooming",
        headingHighlight: "Combos",
        description:
            "Comprehensive multi-discipline rituals curated for regular upkeep, business presentations, and wedding grooms.",
        items: [
            {
                id: "exec-refresh",
                title: "The Executive Refresh",
                tag: "Weekly Maintenance",
                duration: "1 Hr 15 Mins",
                desc: "The essential grooming combination to keep your hair sharp and beard impeccably maintained.",
                features: [
                    "Precision Haircut & Custom Fade",
                    "Beard Sculpting & Razor Cheekline",
                    "Refreshing Shampoo & Scalp Rinse",
                    "Matte Clay Styling Finish",
                ],
                highlight: false,
            },
            {
                id: "royal-shave-detan",
                title: "The Royal Awadh Experience",
                tag: "Signature Master Ritual",
                duration: "1 Hr 45 Mins",
                desc: "An indulgent full-body relaxation session combining classic barbershop discipline and clinical skin detan.",
                features: [
                    "Precision Haircut / Restyle",
                    "Traditional Eucalyptus Hot Towel Shave",
                    "Activated Charcoal Detan Clean Up",
                    "20-Min Therapeutic Head Massage",
                    "Post-Groom Herbal Tea Service",
                ],
                highlight: true,
            },
            {
                id: "imperial-groom",
                title: "The Imperial Wedding Groom",
                tag: "Special Occasion / Groom",
                duration: "2 Hrs 30 Mins",
                desc: "Comprehensive royal preparation for weddings, engagement ceremonies, and stage spotlight moments.",
                features: [
                    "Bespoke Haircut & Profile Calibration",
                    "Royal Hot Oil Beard Detailing & Shape",
                    "O3+ Men's Power Radiance Facial",
                    "Scalp Detox Spa & Acupressure Therapy",
                    "Hand & Foot Executive Grooming",
                ],
                highlight: false,
            },
        ],
    },

    protocol: {
        eyebrow: "The Gentleman's Standard",
        heading: "The Grooming",
        headingHighlight: "Protocol",
        items: [
            {
                number: "01",
                title: "Cranial & Hair Mapping",
                desc: "Detailed consultation analyzing your head profile, crown pattern, hair whorls, and facial hair growth vectors.",
            },
            {
                number: "02",
                title: "Steamed Prep Softening",
                desc: "Steaming essential-oil hot towels relax dermal pores and soften coarse bristles for effortlessly smooth cutting.",
            },
            {
                number: "03",
                title: "Single-Blade Precision",
                desc: "100% single-use disposable blades for razor detailing. No dual-use, zero cross-contamination risk.",
            },
            {
                number: "04",
                title: "Ice Compress & Style",
                desc: "Cold towel compress seals pores and soothes skin, followed by customized matte clay or natural pomade hold.",
            },
        ],
    },

    menu: {
        eyebrow: "Transparent Craft",
        heading: "The Barbershop",
        headingHighlight: "Menu",
        categories: {
            all: "Full Menu",
            hair: "Hair & Fades",
            beard: "Beard & Shave",
            skin: "Face & Detan",
            spa: "Scalp & Massage",
        },
        items: [
            {
                cat: "hair",
                name: "Executive Precision Haircut",
                duration: "35 min",
                desc: "Consultation, precision scissor/clipper cut, shampoo wash & blow-dry style",
            },
            {
                cat: "hair",
                name: "Skin Fade & Disconnected Undercut",
                duration: "45 min",
                desc: "Razor-clean low, mid, or drop fade with tailored top blending",
            },
            {
                cat: "hair",
                name: "Textured French Crop Cut",
                duration: "40 min",
                desc: "Blunt textured fringe with tapered temple and nape",
            },
            {
                cat: "hair",
                name: "Natural Gray Blending (Hair)",
                duration: "30 min",
                desc: "Ammonia-free subtle color blending that conceals grays naturally",
            },

            {
                cat: "beard",
                name: "Beard Sculpting & Jawline Shape-Up",
                duration: "30 min",
                desc: "Length de-bulking, neckline contouring, razor edging, and argan oil",
            },
            {
                cat: "beard",
                name: "Traditional Eucalyptus Hot Towel Shave",
                duration: "35 min",
                desc: "Pre-shave essential oils, warm lather, single blade pass, cold compress",
            },
            {
                cat: "beard",
                name: "Quick Stubble Cleanup & Lineup",
                duration: "20 min",
                desc: "Straight-razor cheek and neck cleanup to maintain crisp lines",
            },
            {
                cat: "beard",
                name: "Beard Gray Blending / Darkening",
                duration: "25 min",
                desc: "Targeted non-staining beard color for a fuller, uniform look",
            },

            {
                cat: "skin",
                name: "Men's Activated Charcoal Detox Facial",
                duration: "45 min",
                desc: "Deep pore unclogging, blackhead removal, and anti-pollution defense",
            },
            {
                cat: "skin",
                name: "Sun-Tan Removal & De-Tan Therapy",
                duration: "35 min",
                desc: "Instant active brightening pack reversing harsh bike/outdoor UV tan",
            },
            {
                cat: "skin",
                name: "O3+ Men's Radiance Skin Treatment",
                duration: "60 min",
                desc: "Clinical oxygenating facial for peak luminosity before big events",
            },
            {
                cat: "skin",
                name: "Under-Eye Anti-Fatigue Session",
                duration: "25 min",
                desc: "Targeted lymphatic drainage and cooling patches for dark circles",
            },

            {
                cat: "spa",
                name: "Restorative Hair Spa & Scalp Detox",
                duration: "45 min",
                desc: "Micro-exfoliating scalp scrub, ozone steam, root serum & conditioning",
            },
            {
                cat: "spa",
                name: "Therapeutic Acupressure Head Massage",
                duration: "25 min",
                desc: "Warm almond or Brahmi herbal oil massage targeting cranial pressure points",
            },
            {
                cat: "spa",
                name: "Anti-Dandruff Intensive Scalp Treatment",
                duration: "40 min",
                desc: "Salicylic scalp peel and tea tree steam mask to banish stubborn flakes",
            },
        ],
    },

    reviews: {
        eyebrow: "Gentlemen's Verdict",
        heading: "Words from Our",
        headingHighlight: "Patrons",
        items: [
            {
                rating: 5,
                quote:
                    '"Hands down the cleanest fade in Lucknow. The barber actually measured my skull whorl before touching the clippers. The hot towel shave afterwards felt genuinely royal."',
                name: "Vikramaditya S.",
                location: "Managing Director, Gomti Nagar",
            },
            {
                rating: 5,
                quote:
                    '"I came in before my wedding for the Imperial Groom package. Beard contouring and the charcoal detan cleared my skin completely. My photos turned out phenomenal."',
                name: "Aditya Rawat",
                location: "Wedding Groom, Hazratganj",
            },
            {
                rating: 5,
                quote:
                    '"Private chairs, no chaotic noise, and single-use fresh blades unpacked right in front of you. That level of hygiene and discipline is hard to find elsewhere."',
                name: "Sameer Kapoor",
                location: "Executive Guest, Aliganj",
            },
        ],
    },

    faq: {
        eyebrow: "Clarifications",
        heading: "Grooming",
        headingHighlight: "Inquiries",
        items: [
            {
                q: "How often should I get my haircut & beard maintained?",
                a: "For tight skin fades and clean beard cheeklines, visiting every 10 to 14 days keeps your lines razor-crisp. For classic scissor cuts, an appointment every 3 to 4 weeks ensures graceful grow-out.",
            },
            {
                q: "I have sensitive skin prone to razor burn. Is the hot towel shave safe for me?",
                a: "Absolutely. The ritual uses pre-shave essential oils to create a protective barrier, warm eucalyptus steaming to soften hair shafts, single-pass sanitized blades, and an ice-cold compress with witch-hazel balm to eliminate razor bumps and irritation.",
            },
            {
                q: "Do you offer pre-wedding groom packages?",
                a: "Yes. We curate bespoke Imperial Groom packages including haircuts, beard detailing, skin lightening facials, scalp detox spas, and hand-foot grooming scheduled in the days leading up to your wedding ceremonies.",
            },
        ],
    },

    cta: {
        eyebrow: "Reserve Your Master Appointment",
        heading: "Experience Royal Barbershop Craft at KNK Awadh",
        description:
            "Step into executive confidence. Private chairs, unhurried attention, and master barbers dedicated to your appearance.",
        primaryBtnText: "Reserve Your Chair Online",
        phone: "+919559321711",
        phoneText: "Direct Line: +91 95593 21711",
    },
};
