/**
 * KNK Salon Central Services & Category Catalog
 * Complete source of truth for Hair, Makeup, Nails, Beauty, Men's Grooming, and Aesthetics.
 * Provides structured data for SEO metadata, JSON-LD schema, navigation, and page templates.
 */

export const SERVICE_CATEGORIES = [
    {
        id: "hair",
        slug: "hair",
        name: "Hair",
        navLabel: "Hair",
        url: "/services/hair",
        title: "Luxury Hair Styling, Colour & Treatments in Lucknow | KNK Salon",
        h1: "Hair Salon & Advanced Hair Treatments in Lucknow",
        eyebrow: "Artistry & Care",
        shortDesc: "From bespoke precision haircuts and radiant global balayage to transformative Nanoplastia and Keratin rituals.",
        longDesc: "At KNK Salon Awadh, hair styling is treated as an art form. Our master hair stylists combine European cutting methodologies with state-of-the-art cuticle rejuvenation therapies. Whether seeking a dramatic colour transformation, humidity-resistant smoothening, or scalp-renewing spa therapies, we use premium global formulations to ensure unmatched strand health and shine.",
        image: "/assets/images/new/service/hairservice.webp",
        badge: "Master Stylists",
        highlights: [
            "Formaldehyde-free smoothing & Nanoplastia therapies",
            "Custom balayage & ammoniac-free hair colouring",
            "Personalized trichology scalp & hair spa rituals",
            "Senior stylist cut & couture blow-dry"
        ],
        services: [
            {
                slug: "haircut",
                name: "Haircut & Styling",
                url: "/services/hair/haircut",
                shortDesc: "Face-framing designer cuts, layered bobs, texturizing, and high-fashion blow-dries tailored to your hair density."
            },
            {
                slug: "hair-colour",
                name: "Hair Colour & Highlights",
                url: "/services/hair/hair-colour",
                shortDesc: "Rich global colour, balayage, ombre, and babylights formulated with ammonia-free nourishing colorants."
            },
            {
                slug: "hair-spa",
                name: "Hair Spa Rituals",
                url: "/services/hair/hair-spa",
                shortDesc: "Deep-conditioning scalp therapies, anti-dandruff care, and keratin-infused moisture masks."
            },
            {
                slug: "keratin",
                name: "Keratin Treatment",
                url: "/services/hair/keratin",
                shortDesc: "Intensive protein infusion providing up to 4-6 months of humidity-proof frizz reduction and silkiness."
            },
            {
                slug: "smoothening",
                name: "Hair Smoothening",
                url: "/services/hair/smoothening",
                shortDesc: "Silky, manageable hair with long-lasting straight texture and radiant glass-like finish."
            },
            {
                slug: "nanoplastia",
                name: "Nanoplastia Therapy",
                url: "/services/hair/nanoplastia",
                shortDesc: "Organic amino-acid straightening that heals internal hair bonds without harsh chemicals."
            },
            {
                slug: "hair-styling",
                name: "Couture Hair Styling",
                url: "/services/hair/hair-styling",
                shortDesc: "Bridal updos, Hollywood waves, textured braids, and occasion blowouts that stay picture-perfect."
            }
        ],
        faqs: [
            {
                q: "What is the difference between Keratin and Nanoplastia at KNK Salon?",
                a: "Keratin deposits a protein barrier over the hair cuticle to eliminate frizz and smooth strands, lasting 3 to 5 months. Nanoplastia is an organic, formaldehyde-free formula that penetrates the deep cortex to straighten up to 80-90% of curls while infusing essential amino acids, offering results that last up to 8 months."
            },
            {
                q: "How do I choose the best hair colour for my skin undertone?",
                a: "Our master colourists conduct an in-depth consultation assessing your skin undertone (warm, cool, or neutral), eye colour, and lifestyle before custom-mixing your pigment formulation."
            },
            {
                q: "How frequently should I get a hair spa treatment?",
                a: "For chemically treated, coloured, or pollution-exposed hair, we recommend a restorative hair spa session every 3 to 4 weeks to maintain optimum scalp moisture balance and cuticle integrity."
            }
        ]
    },
    {
        id: "makeup",
        slug: "makeup",
        name: "Makeup Studio",
        navLabel: "Makeup",
        url: "/makeup",
        title: "Celebrity Bridal & HD Makeup Studio in Lucknow | KNK Salon Awadh",
        h1: "Makeup Studio in Lucknow",
        eyebrow: "Awadh Heritage & Modern Glamour",
        shortDesc: "Flawless bridal makeup, HD finishes, editorial glamour, and bespoke occasion looks crafted by senior artists.",
        longDesc: "KNK Makeup Studio Lucknow is recognized as one of the premier bridal and celebrity makeup destinations in Uttar Pradesh. Guided by over 15 years of beauty artistry, our makeup directors curate personalized looks that enhance each bride's natural grace. From traditional Awadhi regal aesthetics to contemporary ultra-dewy minimalism, every look is crafted to endure hours of ceremony and photography.",
        image: "/assets/images/new/makeup-bride.webp",
        badge: "Celebrity Artists",
        highlights: [
            "Luxury airbrush & ultra HD camera-ready finishes",
            "Specialized pre-bridal skin hydration & priming protocols",
            "Dedicated private bridal suites for maximum comfort",
            "Trusted by leading brides across Lucknow, Kanpur & outstation"
        ],
        services: [
            {
                slug: "bridal-makeup",
                name: "Bridal Makeup",
                url: "/makeup-services/bridal-makeup",
                shortDesc: "Royal, long-wearing wedding makeup tailored to your lehenga, jewellery, and personal aesthetic."
            },
            {
                slug: "hd-makeup",
                name: "HD Makeup",
                url: "/makeup-services/hd-makeup",
                shortDesc: "High-definition micro-pigment application that mimics flawless natural skin under camera lenses."
            },
            {
                slug: "airbrush-makeup",
                name: "Airbrush Makeup",
                url: "/makeup-services/airbrush-makeup",
                shortDesc: "Weightless, waterproof mist foundation providing a velvety, porcelain finish that lasts 18+ hours."
            },
            {
                slug: "engagement-makeup",
                name: "Engagement Makeup",
                url: "/makeup-services/engagement-makeup",
                shortDesc: "Luminous, romantic makeup designed for ring ceremonies and intimate celebration lighting."
            },
            {
                slug: "party-makeup",
                name: "Party Makeup",
                url: "/makeup-services/party-makeup",
                shortDesc: "Chic cocktail, sangeet, and evening glam featuring customized eye artistry and glossy lip sculpting."
            },
            {
                slug: "reception-makeup",
                name: "Reception Makeup",
                url: "/makeup-services/reception-makeup",
                shortDesc: "Sophisticated modern glamour balancing dazzling stage lighting with timeless portrait aesthetics."
            }
        ],
        faqs: [
            {
                q: "What sets KNK Bridal Makeup apart in Lucknow?",
                a: "Our bridal artistry focuses on skin that breathes rather than heavy cakey layers. We customize your base according to your skin type, lighting conditions, and attire, ensuring your makeup remains flawless through long ceremonies and high-definition photography."
            },
            {
                q: "Should I book HD or Airbrush makeup for my wedding?",
                a: "Both deliver camera-ready results. HD makeup uses fine light-diffusing formulas ideal for brides wanting customizable coverage and a radiant dewy finish. Airbrush uses a specialized compressor mist that is sweatproof, tear-resistant, and ideal for oily or humid skin."
            },
            {
                q: "Does KNK Salon offer bridal trials and venue bookings?",
                a: "Yes, we provide pre-bridal consultations and styling trials at our Lucknow studios, as well as on-venue and destination wedding artist teams upon advance reservation."
            }
        ]
    },
    {
        id: "nails",
        slug: "nails",
        name: "Nails",
        navLabel: "Nails",
        url: "/services/nails",
        title: "Luxury Nail Art, Gel & Acrylic Extensions in Lucknow | KNK Salon",
        h1: "Nail Studio & Nail Extensions in Lucknow",
        eyebrow: "Precision Nail Architecture",
        shortDesc: "Precision Russian manicures, Parisian French extensions, durable gel overlays, and bespoke creative nail art.",
        longDesc: "Elevate your hands with couture nail artistry at KNK Salon. Our certified nail technicians specialize in cuticle perfection, Russian manicures, chip-free gel overlays, and customized extensions. From understated chrome and timeless French ombre to intricate bridal Swarovski embellishments, our nail bar combines hygienic protocols with global brands.",
        image: "/assets/images/new/service/NAILS.webp",
        badge: "Nail Bar Excellence",
        highlights: [
            "Sterilized medical-grade tooling & gentle cuticle care",
            "Reinforced acrylic & builder gel extensions",
            "Handcrafted bridal, 3D, and chrome nail artwork",
            "Spa manicures and revitalizing herbal pedicures"
        ],
        services: [
            {
                slug: "nail-art",
                name: "Bespoke Nail Art",
                url: "/services/nails/nail-art",
                shortDesc: "Handcrafted intricate designs, minimalist fine-line art, chrome glaze, and bridal gemstone work."
            },
            {
                slug: "nail-extensions",
                name: "Nail Extensions",
                url: "/services/nails/nail-extensions",
                shortDesc: "Sculpted tips in coffin, almond, stiletto, and square shapes providing natural balance and strength."
            },
            {
                slug: "acrylic-nails",
                name: "Acrylic Nails",
                url: "/services/nails/acrylic-nails",
                shortDesc: "High-durability acrylic overlays and sculpts engineered for active daily wear with high-gloss topcoats."
            },
            {
                slug: "gel-nails",
                name: "Gel Nails & Overlays",
                url: "/services/nails/gel-nails",
                shortDesc: "Flexible, lightweight UV-cured gel polish that maintains high-shine, chip-proof colour for 3-4 weeks."
            },
            {
                slug: "manicure",
                name: "Luxury Manicure",
                url: "/services/nails/manicure",
                shortDesc: "Nail shaping, gentle exfoliation, thermal paraffin wraps, and relaxing hand pressure-point massage."
            },
            {
                slug: "pedicure",
                name: "Therapeutic Pedicure",
                url: "/services/nails/pedicure",
                shortDesc: "Aromatherapy foot soak, callus softening, exfoliating scrub, and nourishing hydration mask."
            }
        ],
        faqs: [
            {
                q: "How long do gel and acrylic nail extensions last?",
                a: "Gel and acrylic extensions typically last 3 to 4 weeks with proper care. We recommend an infill or maintenance appointment every 3 weeks as your natural nails grow."
            },
            {
                q: "Will nail extensions damage my natural nails?",
                a: "When applied and removed by certified professionals like our team at KNK Salon, extensions do not damage your natural nails. We never force peel enhancements and use gentle e-file techniques."
            },
            {
                q: "Can I bring my own nail design inspiration to my appointment?",
                a: "Absolutely! Our artists can recreate any reference image, Pinterest board, or custom motif to match your outfit and wedding jewelry."
            }
        ]
    },
    {
        id: "beauty",
        slug: "beauty",
        name: "Beauty & Skin",
        navLabel: "Beauty",
        url: "/services/beauty",
        title: "Beauty, Facials, Waxing & Skin Care in Lucknow | KNK Salon Awadh",
        h1: "Beauty, Facials & Skin Radiance in Lucknow",
        eyebrow: "Skin Health & Wellness",
        shortDesc: "Multi-step HydraFacials, oxygenating cleanups, gentle fruit waxing, threading, and body polishing rituals.",
        longDesc: "Rediscover clear, glowing skin with KNK Salon's personalized beauty rituals. Our estheticians provide thorough consultations to diagnose your unique skin needs—whether combating urban congestion, pigmentation, or pre-event dehydration. With medical-grade hygiene and botanically active formulations, we deliver luminous, calm, and deeply nourished skin.",
        image: "/assets/images/new/service/facialservice.webp",
        badge: "Clean Skin Rituals",
        highlights: [
            "Advanced HydraFacial & oxygen skin revitalization",
            "Soothing chocolate & peel-off strip-less waxing",
            "Pain-free thread sculpting for brows and upper lip",
            "Full body exfoliating polish and moisture wrapping"
        ],
        services: [
            {
                slug: "facial",
                name: "Signature Facials",
                url: "/services/beauty/facial",
                shortDesc: "Custom multi-step facials targeting anti-aging, pigmentation, deep hydration, and bridal radiance."
            },
            {
                slug: "cleanup",
                name: "Deep Face Clean-Up",
                url: "/services/beauty/cleanup",
                shortDesc: "Pore-clearing exfoliation, steam extraction, and soothing mask to refresh dull or congested skin."
            },
            {
                slug: "waxing",
                name: "Gentle Waxing Rituals",
                url: "/services/beauty/waxing",
                shortDesc: "Low-heat chocolate, rica, and peel-off waxes designed for sensitive skin and smooth hair-free results."
            },
            {
                slug: "threading",
                name: "Precision Threading",
                url: "/services/beauty/threading",
                shortDesc: "Precise eyebrow mapping, arch definition, and gentle facial hair removal with sanitized cotton thread."
            },
            {
                slug: "body-care",
                name: "Body Care & Polishing",
                url: "/services/beauty/body-care",
                shortDesc: "Exfoliating botanical scrubs, detan packs, and hydrating massages that restore full-body velvet smoothness."
            }
        ],
        faqs: [
            {
                q: "What is the difference between a Clean-Up and a Facial?",
                a: "A Clean-Up takes approximately 35-45 minutes and focuses on deep pore cleansing, steam, blackhead extraction, and a calming mask. A Facial is a comprehensive 60-90 minute ritual that includes targeted serums, lymphatic drainage massage, and intensive masks tailored to specific skin concerns."
            },
            {
                q: "How many days before my event should I schedule a facial?",
                a: "We recommend scheduling your facial 3 to 5 days prior to your big event. This allows your skin to fully absorb active nutrients and gives any minor redness time to subside, revealing peak luminosity on your celebration day."
            },
            {
                q: "Is Rica waxing suitable for sensitive skin?",
                a: "Yes, Rica wax is colophony-free and enriched with natural oils and zinc oxide, which adheres to hair rather than skin, significantly reducing redness and discomfort."
            }
        ]
    },
    {
        id: "men-grooming",
        slug: "men-grooming",
        name: "Men's Grooming",
        navLabel: "Men's Grooming",
        url: "/services/men-grooming",
        title: "Men's Grooming Salon & Barber Studio in Lucknow | KNK Salon",
        h1: "Men's Grooming Salon in Lucknow",
        eyebrow: "Contemporary Gentlemen's Grooming",
        shortDesc: "Precision fades, tailored beard architecture, straight-razor hot towel shaves, detox facials, and scalp therapy.",
        longDesc: "KNK Men's Grooming Studio brings timeless barbershop discipline together with modern executive wellness. Our dedicated male grooming experts provide precision haircuts, beard shaping, traditional hot towel straight-razor shaves, and skin-purifying facials. Designed for the discerning gentleman, our private grooming zone delivers crisp finishes, supreme comfort, and unmatched professionalism.",
        image: "/assets/images/new/home/MEN'S GROOMING.webp",
        badge: "Barber Craft",
        highlights: [
            "Tailored clipper fades, scissor tapers, and executive cuts",
            "Beard sculpting, oil hydration, and cheekline crisping",
            "Traditional hot towel wet shave with aftershave soothing",
            "Anti-pollution charcoal facial and stress-relief scalp massage"
        ],
        services: [
            {
                slug: "haircut",
                name: "Men's Haircut & Styling",
                url: "/men-grooming/haircut",
                shortDesc: "Precision fades, executive scissor cuts, textured crops, and personalized product styling."
            },
            {
                slug: "beard",
                name: "Beard Sculpting & Trim",
                url: "/men-grooming/beard",
                shortDesc: "Facial contouring, razor edging, length balance, and nourishing hot oil conditioning."
            },
            {
                slug: "shaving",
                name: "Hot Towel Shave",
                url: "/men-grooming/shaving",
                shortDesc: "Traditional single-blade shave with steaming essential-oil towels and cooling balm."
            },
            {
                slug: "facial",
                name: "Men's Detan & Glow Facial",
                url: "/men-grooming/facial",
                shortDesc: "Formulated for thicker male skin to combat sun damage, oiliness, and razor irritation."
            },
            {
                slug: "hair-spa",
                name: "Men's Hair Spa & Scalp Detox",
                url: "/men-grooming/hair-spa",
                shortDesc: "Deep cleansing scalp scrub, root nourishment, and 20-minute therapeutic head massage."
            }
        ],
        faqs: [
            {
                q: "What does the KNK Men's Grooming Experience include?",
                a: "Every men's haircut includes a detailed consultation on hair density and face structure, a precision cut, an invigorating hair wash, neck cleanup, and custom styling with premium pomade or matte paste."
            },
            {
                q: "Do you offer pre-groom wedding packages for men?",
                a: "Yes! We curate specialized Groom packages including haircuts, beard detailing, skin lightening facials, body polishing, and hand-foot grooming leading up to the wedding."
            },
            {
                q: "How often should I trim my beard to maintain clean lines?",
                a: "For sharp, well-defined beard architecture, a professional trim every 10 to 14 days is ideal to keep the neckline and cheeklines crisp."
            }
        ]
    },
    {
        id: "aesthetics",
        slug: "aesthetic",
        name: "Aesthetics",
        navLabel: "Aesthetics",
        url: "/aesthetic",
        title: "Advanced Aesthetic Treatments & Skin Rejuvenation in Lucknow | KNK Salon",
        h1: "Aesthetic Treatments in Lucknow",
        eyebrow: "Science-Backed Beauty",
        shortDesc: "Microblading, semi-permanent lip blush, laser skin rejuvenation, and customized clinical skin wellness.",
        longDesc: "KNK Aesthetics brings non-invasive, medically guided cosmetology rituals to Lucknow. Specializing in semi-permanent eyebrow microblading, lip blush pigmentation, gentle laser skin toning, and restorative skin rejuvenation, our certified specialists deliver subtle, confidence-boosting enhancements that preserve your natural facial harmony.",
        image: "/assets/images/new/aesthetics-adv.webp",
        badge: "Advanced Cosmetology",
        highlights: [
            "Certified semi-permanent micro-pigmentation artists",
            "Sterile disposable cartridges and US-FDA approved pigments",
            "Targeted laser therapies for pigmentation and hair reduction",
            "Comprehensive skin analysis and customized home-care guidance"
        ],
        services: [
            {
                slug: "microblading",
                name: "Eyebrow Microblading",
                url: "/microblading",
                shortDesc: "Featherlight hyper-realistic hair strokes filling sparse brows with natural, semi-permanent depth."
            },
            {
                slug: "lip-blush",
                name: "Lip Blush Treatment",
                url: "/aesthetic/lip-blush",
                shortDesc: "Subtle translucent pigment wash enhancing natural lip contour, symmetry, and youthful rosy tone."
            },
            {
                slug: "laser",
                name: "Laser Skin Treatments",
                url: "/laser-treatment",
                shortDesc: "Advanced non-ablative laser technology targeting dark spots, sun tanning, fine lines, and uneven tone."
            },
            {
                slug: "skin-treatments",
                name: "Advanced Skin Rejuvenation",
                url: "/aesthetic/skin-treatments",
                shortDesc: "Targeted clinical treatments for stubborn pigmentation, active acne scars, and open pores."
            }
        ],
        faqs: [
            {
                q: "Is eyebrow microblading painful, and how long does it last?",
                a: "A potent topical numbing cream is applied prior to and during the procedure, keeping discomfort to a minimum. Microblading results typically last 12 to 24 months, with an annual touch-up recommended to maintain crisp hair strokes."
            },
            {
                q: "What is Lip Blush, and does it replace lipstick?",
                a: "Lip blush is a semi-permanent cosmetic tattooing technique that infuses soft natural pigment into the lips. It enhances natural symmetry, restores pale or dark borders, and gives a healthy tinted balm look that lasts 2 to 3 years."
            },
            {
                q: "How many sessions are typically required for laser skin treatments?",
                a: "Depending on your skin concern (pigmentation, sun damage, or fine lines), a protocol of 3 to 6 sessions spaced 3-4 weeks apart yields the most sustained clarity and collagen stimulation."
            }
        ]
    }
];

// Complete detailed database for all 33 individual services
export const INDIVIDUAL_SERVICES = {
    // ==========================================
    // HAIR SERVICES (7)
    // ==========================================
    "haircut": {
        slug: "haircut",
        categorySlug: "hair",
        categoryName: "Hair",
        url: "/services/hair/haircut",
        parentUrl: "/services/hair",
        title: "Designer Haircut & Styling in Lucknow | KNK Salon",
        h1: "Designer Haircut & Hair Styling in Lucknow",
        eyebrow: "Hair Artistry",
        shortDesc: "Precision cuts, face-framing layers, bob transformations, and couture blowouts tailored to your bone structure.",
        longDesc: "A great haircut is transformative. At KNK Salon Lucknow, our senior stylists read your facial symmetry, lifestyle, and hair texture before snipping a single strand. We specialize in precision bobs, French butterfly layers, curtain bangs, and customized texturizing that grows out gracefully.",
        image: "/assets/images/new/home/HAIRCUT.webp",
        suitableFor: "All hair lengths, straight to curly textures, and anyone seeking fresh movement, split-end removal, or a total makeover.",
        whatIncluded: [
            "Detailed consultation assessing face shape and hair density",
            "Cleansing wash with sulfate-free salon shampoo & conditioning mask",
            "Precision structural cut using professional Japanese steel shears",
            "Custom texturizing for weight balance and movement",
            "Signature blowout with thermal heat protection & styling shine mist"
        ],
        benefits: [
            { title: "Flattering Face Framing", desc: "Highlights cheekbones, jawline, and eyes with custom layered architecture." },
            { title: "Effortless Daily Styling", desc: "Cuts engineered to fall naturally into place with minimal morning effort." },
            { title: "Split-End Elimination", desc: "Removes brittle, broken ends to promote healthier, faster hair growth." },
            { title: "Fullness & Volume", desc: "Texturizing techniques that build body into fine strands or soften bulky hair." }
        ],
        stylesOrProcess: [
            { title: "Layered Butterfly Cut", desc: "Voluminous short and long layers creating airy movement and cascading bounce." },
            { title: "Precision French Bob", desc: "Sharp, elegant chin-length cut with subtle beveling for timeless European chic." },
            { title: "Curtain Bangs & Soft Framing", desc: "Delicate contouring around the face that pairs beautifully with ponytails and updos." },
            { title: "Textured Lob (Long Bob)", desc: "Versatile collarbone-grazing length that transitions effortlessly from day to night." }
        ],
        whyChooseKnk: [
            "Senior master stylists trained in international cutting systems",
            "Complimentary strand health assessment and styling advice",
            "Premium styling products that protect hair integrity",
            "Relaxing salon ambience across Lucknow's premier localities"
        ],
        relatedServices: [
            { title: "Hair Colour & Highlights", url: "/services/hair/hair-colour" },
            { title: "Keratin Treatment", url: "/services/hair/keratin" },
            { title: "Hair Spa Rituals", url: "/services/hair/hair-spa" }
        ],
        faqs: [
            { q: "How often should I get my hair trimmed?", a: "To maintain shape and prevent split ends, we recommend trimming every 6 to 8 weeks for short cuts and 8 to 10 weeks for longer lengths." },
            { q: "Can I bring photo references for my haircut?", a: "Yes, we encourage you to bring reference images. Our stylist will analyze how to adapt that look to your unique hair density and face profile." },
            { q: "Is a wash and blowout included with the haircut?", a: "Yes, every haircut at KNK includes an invigorating shampoo wash, conditioning ritual, and a professional blowout." }
        ]
    },

    "hair-colour": {
        slug: "hair-colour",
        categorySlug: "hair",
        categoryName: "Hair",
        url: "/services/hair/hair-colour",
        parentUrl: "/services/hair",
        title: "Balayage, Global Hair Colour & Highlights in Lucknow | KNK Salon",
        h1: "Hair Colour, Balayage & Highlights in Lucknow",
        eyebrow: "Chromatic Artistry",
        shortDesc: "Rich global colour, sun-kissed balayage, dimensional babylights, and root touch-ups using ammonia-free salon formulations.",
        longDesc: "Transform your appearance with dimensional hair colour at KNK Salon. From rich caramel balayage and mocha brunettes to soft honey babylights and vibrant fashion hues, our master colourists combine bond-protecting plex technology with ammonia-free colorants to ensure luminous colour that feels as healthy as it looks.",
        image: "/assets/images/new/home/HAIRCOLOR.webp",
        suitableFor: "Those looking to cover grays, brighten dull strands, introduce multidimensional depth, or undertake a bold chromatic change.",
        whatIncluded: [
            "Skin undertone analysis and colour shade mapping",
            "Bond-strengthening plex pre-treatment to protect hair structure",
            "Precision sectioning and freehand or foil pigment application",
            "Color-lock gloss toner to neutralize brassiness and amplify shine",
            "Post-colour nourishing mask and thermal blowout"
        ],
        benefits: [
            { title: "Multidimensional Depth", desc: "Creates the illusion of thicker, fuller hair with interplay of light and shadow." },
            { title: "Ammonia-Free Formulations", desc: "Protects delicate hair cuticles and prevents scalp stinging or dryness." },
            { title: "Custom Shade Matching", desc: "Bespoke formula tailored to flatter your personal skin tone and eye colour." },
            { title: "Long-Lasting Gloss", desc: "Seals cuticles with luminous reflection that lasts through weeks of washing." }
        ],
        stylesOrProcess: [
            { title: "French Balayage", desc: "Hand-painted natural graduation of lightness towards the ends without harsh lines." },
            { title: "Global Gloss Colour", desc: "Uniform rich saturation from root to tip in chocolate, espresso, or mahogany." },
            { title: "Babylights & Face Framing", desc: "Micro-fine highlights around the hairline that softly illuminate your complexion." },
            { title: "Ombre & Melt", desc: "Seamless transition from darker roots to radiant caramel or blonde tips." }
        ],
        whyChooseKnk: [
            "Master colourists certified in global European colouring academies",
            "Bond-building technologies included to prevent strand breakage",
            "Zero brassiness guarantee with customized gloss toners",
            "Personalized post-colour home maintenance recommendations"
        ],
        relatedServices: [
            { title: "Hair Spa Rituals", url: "/services/hair/hair-spa" },
            { title: "Keratin Treatment", url: "/services/hair/keratin" },
            { title: "Designer Haircut", url: "/services/hair/haircut" }
        ],
        faqs: [
            { q: "Will colouring my hair make it dry or damaged?", a: "Not at KNK Salon. We use ammonia-free formulas infused with protective bond builders that maintain your strand's elasticity and hydration throughout the process." },
            { q: "How long does a balayage appointment take?", a: "A full balayage session with toning, mask, and blowout typically takes between 2.5 to 4 hours depending on your hair length and density." },
            { q: "How do I maintain my colour at home?", a: "We recommend using a color-safe, sulfate-free shampoo, washing with lukewarm water, and applying a leave-in UV thermal protectant." }
        ]
    },

    "hair-spa": {
        slug: "hair-spa",
        categorySlug: "hair",
        categoryName: "Hair",
        url: "/services/hair/hair-spa",
        parentUrl: "/services/hair",
        title: "Luxury Hair Spa Rituals & Scalp Therapy in Lucknow | KNK Salon",
        h1: "Hair Spa Rituals & Scalp Therapy in Lucknow",
        eyebrow: "Trichology & Relaxation",
        shortDesc: "Restorative deep-conditioning hair spa, anti-dandruff scalp detox, and moisture-infusing masks paired with pressure-point massage.",
        longDesc: "Revitalize exhausted, dry, or chemically treated strands with KNK Salon's signature hair spa rituals. Blending trichology science with indulgent relaxation, our rituals combine micro-mist ozone steaming, scalp exfoliation, intensive botanical hair masks, and an invigorating 20-minute shoulder and head acupressure massage.",
        image: "/assets/images/new/home/HAIRSPA.webp",
        suitableFor: "Dry, frizzy, heat-damaged, chemically straightened, or coloured hair, as well as those dealing with scalp irritation or stress.",
        whatIncluded: [
            "Digital scalp and strand porosity diagnosis",
            "Gentle scalp scrub to remove product buildup and pollutants",
            "Deep restorative masque enriched with argan oil, keratin, and ceramides",
            "Warm ozone micro-mist infusion to open cuticles for deep absorption",
            "Relaxing acupressure head, neck, and shoulder massage followed by cold rinse & blow-dry"
        ],
        benefits: [
            { title: "Restores Moisture Balance", desc: "Transforms straw-like, brittle hair into touchably soft, flexible strands." },
            { title: "Purifies Scalp Follicles", desc: "Clears sebum and residue to foster healthier, stronger root growth." },
            { title: "Reduces Hair Fall & Breakage", desc: "Fortifies weak cuticles against everyday friction and environmental stress." },
            { title: "Stress Relief & Relaxation", desc: "Acupressure massage dissolves tension and promotes healthy scalp micro-circulation." }
        ],
        stylesOrProcess: [
            { title: "Deep Nourishment Spa", desc: "Formulated for dry, rough hair needing intense moisture and silkiness." },
            { title: "Keratin Repair Spa", desc: "Infuses protein into chemically processed or heat-weakened hair shafts." },
            { title: "Scalp Clarifying Detox", desc: "Combats flakes, excess oil, and itchiness with tea tree and purifying clays." },
            { title: "Color Radiance Spa", desc: "Seals cuticles to preserve vibrant pigment and deliver a mirror-like shine." }
        ],
        whyChooseKnk: [
            "Advanced ozone micro-mist steamers for deeper nutrient penetration",
            "Custom-blended masques according to your scalp and hair needs",
            "Certified trichology experts who diagnose underlying hair issues",
            "Peaceful, serene salon sanctuary that relieves daily fatigue"
        ],
        relatedServices: [
            { title: "Hair Smoothening", url: "/services/hair/smoothening" },
            { title: "Haircut & Styling", url: "/services/hair/haircut" },
            { title: "Hair Colour", url: "/services/hair/hair-colour" }
        ],
        faqs: [
            { q: "How often should I take a hair spa?", a: "For best results, once every 3 to 4 weeks is ideal to sustain moisture levels and protect your scalp from environmental pollution." },
            { q: "Does a hair spa help reduce hair fall?", a: "Yes, regular scalp cleansing combined with stimulating acupressure massage strengthens hair follicles and reduces stress-related breakage." },
            { q: "Can I get a hair spa after colouring my hair?", a: "Yes, our specialized Color Radiance Spa is designed specifically to lock in colour pigment while replenishing moisture." }
        ]
    },

    "keratin": {
        slug: "keratin",
        categorySlug: "hair",
        categoryName: "Hair",
        url: "/services/hair/keratin",
        parentUrl: "/services/hair",
        title: "Keratin Treatment in Lucknow | Frizz-Free Smooth Hair | KNK Salon",
        h1: "Keratin Treatment in Lucknow",
        eyebrow: "Protein Restoration",
        shortDesc: "Intensive keratin protein therapy delivering up to 4-5 months of humidity-proof frizz reduction and manageable gloss.",
        longDesc: "Tired of unmanageable frizz in Lucknow's humid summers and rainy seasons? KNK Salon's Keratin Treatment infuses active hydrolyzed keratin deep into porous hair cuticles, sealing strands with a protective smoothing shield. It dramatically slashes blow-dry time in half while retaining your hair's natural bounce and movement.",
        image: "/assets/images/new/service/hairservice.webp",
        suitableFor: "Frizzy, unruly, porous, bleach-damaged, or wavy hair that puffs up in humidity and resists daily styling.",
        whatIncluded: [
            "Clarifying wash to strip away silicone and oil barrier layers",
            "Section-by-section application of premium hydrolyzed keratin complex",
            "Optimal dwell time allowing micro-proteins to penetrate the cuticle",
            "Blow-dry and titanium iron thermal sealing at controlled temperatures",
            "Post-treatment home care consultation and sulfate-free product guidance"
        ],
        benefits: [
            { title: "100% Humidity Resistant", desc: "No more puffiness or frizz even on the most humid summer days." },
            { title: "50% Faster Blow-Drying", desc: "Cuts down daily morning styling time dramatically." },
            { title: "Repairs Damaged Cuticles", desc: "Fills in porous gaps caused by heat tools, bleach, and pollution." },
            { title: "Retains Natural Movement", desc: "Unlike harsh relaxers, keratin smooths frizz without leaving hair pin-flat." }
        ],
        stylesOrProcess: [
            { title: "Consultation & Prep", desc: "Clarifying deep wash to prepare hair fibers for maximum protein uptake." },
            { title: "Infusion & Blowout", desc: "Even distribution of keratin formula followed by smooth blow-drying." },
            { title: "Thermal Sealing", desc: "Precision flat-ironing that locks keratin into the internal hair architecture." },
            { title: "The Finish", desc: "Silky, mirror-reflective hair that feels featherlight and completely frizz-free." }
        ],
        whyChooseKnk: [
            "Formaldehyde-compliant, safe global formulations",
            "Trained smoothing specialists who adjust heat to your hair texture",
            "Maintains hair health without burning or thinning hair ends",
            "Guaranteed longevity with recommended post-care regimens"
        ],
        relatedServices: [
            { title: "Nanoplastia Therapy", url: "/services/hair/nanoplastia" },
            { title: "Hair Smoothening", url: "/services/hair/smoothening" },
            { title: "Hair Spa Rituals", url: "/services/hair/hair-spa" }
        ],
        faqs: [
            { q: "How long does a Keratin treatment last?", a: "Typically between 3 to 5 months, depending on how frequently you wash your hair and whether you use sulfate-free shampoo." },
            { q: "Will Keratin make my hair pin-straight?", a: "Keratin is primarily a de-frizzing and smoothing treatment. It relaxes natural curl patterns by 50-70% while keeping natural body. If you desire pin-straight hair, ask our stylist about Nanoplastia or Smoothening." },
            { q: "When can I wash my hair after the treatment?", a: "We advise waiting 48 to 72 hours before washing your hair or tying it with hair elastics to let the protein bond set perfectly." }
        ]
    },

    "smoothening": {
        slug: "smoothening",
        categorySlug: "hair",
        categoryName: "Hair",
        url: "/services/hair/smoothening",
        parentUrl: "/services/hair",
        title: "Hair Smoothening in Lucknow | Silky Straight Hair | KNK Salon",
        h1: "Hair Smoothening in Lucknow",
        eyebrow: "Sleek Perfection",
        shortDesc: "Transform coarse, unmanageable curls into sleek, soft, and straight strands with long-lasting silkiness.",
        longDesc: "Hair smoothening at KNK Salon re-engineers rough, wavy, or tightly curled hair into smooth, silky perfection. Using gentle restructuring agents paired with nourishing natural oils, our smoothening therapy straightens strands while preventing the stiff, artificial look of old-fashioned rebonding.",
        image: "/assets/images/new/service/hairservice.webp",
        suitableFor: "Thick, coarse, wavy, or rebellious curly hair seeking a sleek, polished, and straight appearance.",
        whatIncluded: [
            "Hair elasticity and texture assessment",
            "Application of professional softening cream to reshape internal bonds",
            "Precision warm water rinsing and moisture treatment",
            "Tension blow-dry and micro-temperature flat ironing",
            "Neutralizing conditioning cream to lock in the silky straight alignment"
        ],
        benefits: [
            { title: "Long-Lasting Straightness", desc: "Maintains smooth, straight hair that lasts 6 to 9 months as roots grow out." },
            { title: "Glass-Like Reflective Shine", desc: "Closes the cuticle so light bounces evenly across the surface." },
            { title: "Effortless Detangling", desc: "No more painful knots or snagging during daily combing." },
            { title: "Natural Soft Touch", desc: "Leaves hair fluid, touchable, and soft rather than rigid." }
        ],
        stylesOrProcess: [
            { title: "Classic Smoothening", desc: "Ideal for natural waves seeking soft, polished straightness." },
            { title: "Rebonding + Smoothening Fusion", desc: "For coarse, tight curls requiring maximum straightening power with softness." },
            { title: "Gloss Smoothening", desc: "Combines straightening with high-gloss colour sealing for illuminated locks." }
        ],
        whyChooseKnk: [
            "Advanced chemical balancing to avoid chemical burns or over-processing",
            "Senior technicians with 10+ years of texture transformation experience",
            "Post-service deep conditioning mask included in the procedure",
            "Transparent consultations regarding maintenance and regrowth care"
        ],
        relatedServices: [
            { title: "Nanoplastia Therapy", url: "/services/hair/nanoplastia" },
            { title: "Keratin Treatment", url: "/services/hair/keratin" },
            { title: "Haircut & Styling", url: "/services/hair/haircut" }
        ],
        faqs: [
            { q: "What is the difference between smoothening and rebonding?", a: "Rebonding uses stronger chemicals that break and reform bonds into a flat-iron pin-straight look. Smoothening uses milder solutions that retain natural flexibility and soft movement while eliminating all frizz." },
            { q: "Can I colour my hair after smoothening?", a: "We recommend waiting at least 2 to 3 weeks after your smoothening session before applying global colour or highlights." },
            { q: "How do I take care of newly smoothened hair?", a: "Use professional sulfate-free and paraben-free shampoo, apply a deep nourishing hair mask weekly, and avoid tying hair tightly for the first 3 days." }
        ]
    },

    "nanoplastia": {
        slug: "nanoplastia",
        categorySlug: "hair",
        categoryName: "Hair",
        url: "/services/hair/nanoplastia",
        parentUrl: "/services/hair",
        title: "Nanoplastia Hair Treatment in Lucknow | Organic Hair Straightening | KNK Salon",
        h1: "Nanoplastia Hair Treatment in Lucknow",
        eyebrow: "Organic Bio-Straightening",
        shortDesc: "100% formaldehyde-free organic amino acid therapy that straightens, restores hair bonds, and delivers mirror-like gloss.",
        longDesc: "Nanoplastia is the cutting-edge revolution in hair straightening and restorative care. Unlike conventional keratin or chemical straighteners, Nanoplastia uses plant-based organic amino acids, collagen, and nourishing essential oils that penetrate straight to the cellular hair cortex. It delivers 80-90% straightening and radiant mirror shine without toxic fumes or eye burning.",
        image: "/assets/images/new/service/hairservice.webp",
        suitableFor: "Anyone seeking maximum straightening and frizz control who prefers clean, non-toxic, formaldehyde-free organic formulations.",
        whatIncluded: [
            "In-depth hair porosity test and strand diagnostics",
            "Deep cleansing with amino-prep shampoo",
            "Sectioned infusion of organic Nanoplastia amino acid complex",
            "40-60 minute dwell under infrared processing",
            "Specialized nano-titanium heat alignment locking in organic nutrients",
            "Rinse and collagen-sealing mask blowout"
        ],
        benefits: [
            { title: "Zero Toxic Fumes", desc: "No formaldehyde, no pungent smell, no watering eyes or scalp irritation." },
            { title: "Up to 8-10 Months Longevity", desc: "Significantly outlasts standard keratin treatments." },
            { title: "Internal Bond Repair", desc: "Heals structural porosity from within rather than just coating the exterior." },
            { title: "Superior Mirror Gloss", desc: "Reflects light like liquid silk with natural bounce and softness." }
        ],
        stylesOrProcess: [
            { title: "Diagnosis & Cleansing", desc: "Prepares hair cuticles without stripping natural scalp lipids." },
            { title: "Bio-Complex Saturation", desc: "Organic plant acids and silk proteins penetrate into the hair shaft." },
            { title: "Heat Crystallization", desc: "Nano-titanium sealing aligns the amino acids into a straight matrix." },
            { title: "Hydration Rinse", desc: "No waiting days to wash—rinse occurs in the same session!" }
        ],
        whyChooseKnk: [
            "Certified organic Nanoplastia specialists in Lucknow",
            "Safe for chemically treated, coloured, and sensitive clients",
            "Same-day wash: you walk out with the final, washed result",
            "Lasting results backed by hundreds of satisfied clients across Awadh"
        ],
        relatedServices: [
            { title: "Keratin Treatment", url: "/services/hair/keratin" },
            { title: "Hair Spa Rituals", url: "/services/hair/hair-spa" },
            { title: "Hair Colour", url: "/services/hair/hair-colour" }
        ],
        faqs: [
            { q: "Is Nanoplastia safe for coloured or bleached hair?", a: "Yes, Nanoplastia is formulated with gentle organic acids. It actually replenishes lost proteins in bleached or heat-weakened hair." },
            { q: "Do I have to wait 3 days to wash my hair?", a: "No! One of the major advantages of Nanoplastia is that your hair is washed and dried in the salon during the same appointment. You see the true, final result before leaving." },
            { q: "How long does Nanoplastia last?", a: "Nanoplastia results last between 6 to 9 months with proper sulfate-free aftercare." }
        ]
    },

    "hair-styling": {
        slug: "hair-styling",
        categorySlug: "hair",
        categoryName: "Hair",
        url: "/services/hair/hair-styling",
        parentUrl: "/services/hair",
        title: "Occasion & Bridal Hair Styling in Lucknow | KNK Salon",
        h1: "Occasion & Bridal Hair Styling in Lucknow",
        eyebrow: "Couture Styling",
        shortDesc: "Bridal buns, Hollywood glamour waves, textured braids, high ponytails, and voluminous blowout styling.",
        longDesc: "Complete your celebration look with bespoke hair styling at KNK Salon. From grand bridal floral updos and royal traditional braids to red-carpet Hollywood waves and textured messy buns, our stylists engineer hairstyles that remain secure, weightless, and picture-perfect throughout your event.",
        image: "/assets/images/new/home/bridal/4.webp",
        suitableFor: "Brides, bridesmaids, cocktail parties, reception galas, editorial shoots, and festive celebrations.",
        whatIncluded: [
            "Style consultation based on neckline, outfit, and jewellery",
            "Texturizing prep with thermal protectant and root-lifting sprays",
            "Architectural styling (pinning, braiding, curling, or wave sculpting)",
            "Dupatta setting, hair accessory placement, and floral adornment",
            "Long-hold humidity-resistant finishing mist"
        ],
        benefits: [
            { title: "Holds for 12+ Hours", desc: "Engineered to withstand dance floors, ceremonies, and humidity without drooping." },
            { title: "Customized to Your Attire", desc: "Designed to complement high necklines, deep backs, or heavy jewellery pieces." },
            { title: "Weightless Comfort", desc: "Securely pinned without painful tension or scalp pulling." },
            { title: "Flawless in 360°", desc: "Looks stunning from front, profile, and back angles for video and photography." }
        ],
        stylesOrProcess: [
            { title: "Royal Bridal Bun", desc: "Classic architectural bun adorned with fresh gajras, roses, or kundan pins." },
            { title: "Hollywood Vintage Waves", desc: "Smooth, glossy, sculptural S-waves that cascade over the shoulder." },
            { title: "Messy Textured Updo", desc: "Soft, romantic tendrils and twists perfect for receptions and cocktail evenings." },
            { title: "Boho Floral Braid", desc: "Voluminous Dutch or fishtail braid interwoven with baby's breath and pearls." }
        ],
        whyChooseKnk: [
            "Master bridal stylists with extensive wedding fashion portfolios",
            "Seamless dupatta pinning and heavy matha patti balancing",
            "Premium heat tools that shape curls without singeing or dulling hair",
            "Calm, attentive service that ensures zero wedding-day anxiety"
        ],
        relatedServices: [
            { title: "Bridal Makeup", url: "/makeup-services/bridal-makeup" },
            { title: "Haircut & Styling", url: "/services/hair/haircut" },
            { title: "Hair Colour", url: "/services/hair/hair-colour" }
        ],
        faqs: [
            { q: "Should my hair be freshly washed on the styling day?", a: "We recommend washing your hair the night before with a clarifying shampoo (no heavy conditioner or oils). Slightly day-old hair holds curls and updos much better than silky freshly washed hair." },
            { q: "Can you incorporate real flowers or my own hair accessories?", a: "Yes, our stylists will gladly weave your fresh flowers, gajras, pearls, or custom jewellery into your hairstyle." },
            { q: "Do you provide hair extensions for added volume?", a: "Yes, we can prepare, colour-blend, and securely clip in 100% human hair extensions to add thickness and length to your style." }
        ]
    },

    // ==========================================
    // MAKEUP STUDIO SERVICES (6)
    // ==========================================
    "bridal-makeup": {
        slug: "bridal-makeup",
        categorySlug: "makeup",
        categoryName: "Makeup Studio",
        url: "/makeup-services/bridal-makeup",
        parentUrl: "/makeup",
        title: "Best Bridal Makeup Artist in Lucknow | KNK Salon & Academy",
        h1: "Bridal Makeup in Lucknow",
        eyebrow: "The Signature Awadhi Bride",
        shortDesc: "Flawless bridal makeup, HD and airbrush artistry, customized bridal preps, and private bridal suites in Lucknow.",
        longDesc: "Your wedding day is a once-in-a-lifetime milestone, and your bridal look should reflect your most radiant, timeless self. At KNK Salon Lucknow, our master makeup artists craft bespoke bridal looks that blend the royal heritage of Awadh with contemporary high-definition skin finishes. Using premium international brands (Dior, MAC, Charlotte Tilbury, Estée Lauder, NARS, Huda Beauty), we ensure your makeup remains breathtaking in person and under high-resolution 4K cameras.",
        image: "/assets/images/new/makeup-bride.webp",
        suitableFor: "Brides seeking flawless, long-lasting wedding makeup that harmonizes with their lehenga, jewellery, and personal personality.",
        whatIncluded: [
            "In-depth pre-bridal styling consultation and skin analysis",
            "Hydrating skin prep, pore priming, and customized pigment base matching",
            "Choice of Luxury HD or Airbrush base formulation",
            "Bespoke eye artistry: smokey, cut-crease, or soft glitter shimmer",
            "Mink/silk false lash application and brow architecture",
            "Bridal hair styling, dupatta draping, and jewellery setting"
        ],
        benefits: [
            { title: "18+ Hour Durability", desc: "Tear-proof, sweat-resistant formulas that hold up through pheras and long receptions." },
            { title: "Second-Skin Glow", desc: "Luminous, non-cakey finish that feels weightless and lets your natural skin breathe." },
            { title: "4K Camera Perfect", desc: "Engineered specifically to avoid flashback or chalky white casts under studio flashes." },
            { title: "All-Inclusive Styling", desc: "Hairdo, dupatta draping, lens fitting, and jewellery pinning included." }
        ],
        stylesOrProcess: [
            { title: "The Royal Awadhi Bridal Look", desc: "Defined kohl eyes with warm gold/bronze shimmer, paired with a rich royal red or rose-gold lip." },
            { title: "The Modern No-Makeup Bride", desc: "Glass skin base, soft feather brows, natural blush, and nude pink lips for pastel lehengas." },
            { title: "The Classic Traditional Look", desc: "Bold winged liner, heavy kajal, sculpted contouring, and deep crimson pout." },
            { title: "The Dewy Peach Bridal Look", desc: "Soft peach shimmer, warm blush, and glossy nude lips suited for morning or outdoor pheras." }
        ],
        whyChooseKnk: [
            "Over 15 years of trusted bridal excellence in Lucknow",
            "Luxury private bridal vanity suites for serene preparation",
            "Strict sanitation: sterilized brushes, disposable wands, and high-end brands",
            "On-venue and destination wedding artist teams available upon request"
        ],
        relatedServices: [
            { title: "HD Makeup", url: "/makeup-services/hd-makeup" },
            { title: "Airbrush Makeup", url: "/makeup-services/airbrush-makeup" },
            { title: "Engagement Makeup", url: "/makeup-services/engagement-makeup" },
            { title: "Reception Makeup", url: "/makeup-services/reception-makeup" }
        ],
        faqs: [
            { q: "How far in advance should I book my bridal makeup?", a: "Wedding dates in Lucknow book out rapidly during the wedding season (October to March). We recommend booking 2 to 4 months in advance to secure your preferred artist slot." },
            { q: "What brands of cosmetics do you use for bridal makeup?", a: "We exclusively use prestige international cosmetics including Charlotte Tilbury, Dior, MAC, Estée Lauder, NARS, Huda Beauty, Bobbi Brown, and Make Up For Ever." },
            { q: "Does the bridal package include hair styling and draping?", a: "Yes, all our bridal makeup packages include couture hair styling, dupatta draping, jewelry setting, and false eyelash application." },
            { q: "Do you offer makeup services at the wedding venue?", a: "Yes, we have dedicated senior artist travel teams that travel to your wedding venue or hotel anywhere in Lucknow, Kanpur, or destination locations." }
        ]
    },

    "hd-makeup": {
        slug: "hd-makeup",
        categorySlug: "makeup",
        categoryName: "Makeup Studio",
        url: "/makeup-services/hd-makeup",
        parentUrl: "/makeup",
        title: "HD Makeup in Lucknow | High Definition Artistry | KNK Salon",
        h1: "HD Makeup in Lucknow",
        eyebrow: "Camera-Ready Perfection",
        shortDesc: "High-definition micro-pigment makeup that creates a seamless, natural second-skin under photography lights.",
        longDesc: "HD Makeup (High Definition Makeup) is specifically engineered to diffuse light and mimic flawless natural skin under sharp 4K and 8K camera lenses. At KNK Makeup Studio, our artists apply ultra-fine micro-particles that conceal uneven tone, dark circles, and blemishes without forming a thick or cakey texture.",
        image: "/assets/images/new/home/services/makeup.webp",
        suitableFor: "Brides, bridesmaids, photography shoots, television appearances, and engagement celebrations.",
        whatIncluded: [
            "Pre-makeup skin hydration with hyaluronic serums and primer",
            "Color correction for under-eye darkness and redness",
            "Micro-blend HD liquid/cream foundation with custom undertone matching",
            "Soft facial contouring and luminous cream highlight",
            "Lash enhancement, lip sculpting, and setting mist"
        ],
        benefits: [
            { title: "No White Flashback", desc: "Formulated without heavy titanium dioxide that reflects flash photography." },
            { title: "Seamless Blending", desc: "Micro-pigments melt into skin pores for an invisible, air-brushed appearance." },
            { title: "Comfortable Weight", desc: "Feels light on skin even in warm celebration halls." },
            { title: "Buildable Coverage", desc: "Provides high coverage where needed while keeping skin glowing and alive." }
        ],
        stylesOrProcess: [
            { title: "Skin Prep & Priming", desc: "Quenches skin thirst to prevent foundation from settling into fine lines." },
            { title: "Chromatic Correction", desc: "Cancels out pigmentation, blemishes, and under-eye shadows." },
            { title: "HD Base Architecture", desc: "Buffed seamlessly with professional density brushes and damp beauty sponges." },
            { title: "Soft Focus Setting", desc: "Translucent micro-fine setting powder that locks moisture and locks down makeup." }
        ],
        whyChooseKnk: [
            "Certified HD makeup specialists trained in lens optics",
            "100% genuine prestige cosmetic brands",
            "Personalized shade matching in dedicated vanity lighting",
            "Includes hair styling and saree/lehenga draping"
        ],
        relatedServices: [
            { title: "Bridal Makeup", url: "/makeup-services/bridal-makeup" },
            { title: "Airbrush Makeup", url: "/makeup-services/airbrush-makeup" },
            { title: "Engagement Makeup", url: "/makeup-services/engagement-makeup" }
        ],
        faqs: [
            { q: "How does HD makeup differ from regular makeup?", a: "Regular makeup uses larger pigment particles that can appear heavy, chalky, or textured under modern high-resolution cameras. HD makeup uses micro-milled pigments that diffuse light evenly, giving a velvety smooth appearance both in person and on camera." },
            { q: "Is HD makeup suitable for oily skin?", a: "Yes, our artists prep oily skin with mattifying primers and oil-free setting sprays so your HD finish stays shine-free throughout the day." },
            { q: "How long does HD makeup take to apply?", a: "A complete HD makeup session, including hair styling and draping, takes approximately 2 to 2.5 hours." }
        ]
    },

    "airbrush-makeup": {
        slug: "airbrush-makeup",
        categorySlug: "makeup",
        categoryName: "Makeup Studio",
        url: "/makeup-services/airbrush-makeup",
        parentUrl: "/makeup",
        title: "Airbrush Makeup in Lucknow | Waterproof Bridal Makeup | KNK Salon",
        h1: "Airbrush Makeup in Lucknow",
        eyebrow: "Weightless Precision",
        shortDesc: "Silicone-based micro-mist foundation delivering a 100% waterproof, sweatproof, and porcelain finish.",
        longDesc: "Experience the pinnacle of bridal makeup durability with Airbrush Makeup at KNK Salon. Utilizing an ultra-fine stylus compressor, foundation is diffused as microscopic droplets across the face, forming an unbroken, weightless veil. It is completely sweatproof, water-resistant, and transfers-proof, making it the premier choice for summer and monsoon weddings.",
        image: "/assets/images/new/makeup-artist.webp",
        suitableFor: "Brides getting married in hot or humid conditions, those with sensitive skin, or anyone wanting maximum durability.",
        whatIncluded: [
            "Silicone-shield skin prep and hydration",
            "Precision compressor airbrush base application",
            "Handcrafted eye makeup and soft brow sculpting",
            "Airbrushed blush and subtle glow highlighter",
            "Waterproof mascara, luxury eyelashes, and lip lock stain"
        ],
        benefits: [
            { title: "100% Waterproof & Sweatproof", desc: "Withstands tears of joy, humidity, and long dancing hours without creasing." },
            { title: "Ultra-Hygienic Application", desc: "The airbrush stylus never directly touches the skin, ensuring supreme sanitation." },
            { title: "Featherlight Sensation", desc: "Clients often forget they are wearing full bridal makeup because it feels so light." },
            { title: "Porcelain Texture", desc: "Fills in fine pores and texture evenly, delivering a smooth satin canvas." }
        ],
        stylesOrProcess: [
            { title: "Pore Refining Priming", desc: "Creates a velvety barrier ensuring the micro-mist sits evenly." },
            { title: "Airbrush Mist Application", desc: "Fine droplets atomized through precision needle stylus at gentle PSI." },
            { title: "Layered Contouring", desc: "Sculpts cheekbones and jawlines with customized darker airbrush pigments." },
            { title: "Lock & Seal", desc: "Sets instantly upon contact with skin for all-day transfer resistance." }
        ],
        whyChooseKnk: [
            "Temptu-certified airbrush artists with international training",
            "Clean medical-grade compressors and sanitized airbrush guns",
            "Custom foundation shade mixing for exact undertone perfection",
            "Proven performance on hundreds of Awadhi brides"
        ],
        relatedServices: [
            { title: "Bridal Makeup", url: "/makeup-services/bridal-makeup" },
            { title: "HD Makeup", url: "/makeup-services/hd-makeup" },
            { title: "Reception Makeup", url: "/makeup-services/reception-makeup" }
        ],
        faqs: [
            { q: "Is airbrush makeup safe for acne-prone skin?", a: "Yes! Airbrush makeup is non-comedogenic and hypoallergenic. Furthermore, because no brushes or sponges touch the active skin, it is one of the most hygienic makeup methods available." },
            { q: "Will airbrush makeup rub off on my lehenga or collar?", a: "No, silicone-based airbrush foundation dries to a smudge-resistant, transfer-proof finish that does not rub off on clothes." },
            { q: "How do I remove airbrush makeup at the end of the night?", a: "An oil-based cleanser, cleansing balm, or micellar water formulated for waterproof makeup easily melts the airbrush layer away." }
        ]
    },

    "engagement-makeup": {
        slug: "engagement-makeup",
        categorySlug: "makeup",
        categoryName: "Makeup Studio",
        url: "/makeup-services/engagement-makeup",
        parentUrl: "/makeup",
        title: "Engagement & Ring Ceremony Makeup in Lucknow | KNK Salon",
        h1: "Engagement & Ring Ceremony Makeup in Lucknow",
        eyebrow: "Romantic Radiance",
        shortDesc: "Luminous, romantic makeup designed for ring ceremonies, pastel lehengas, and intimate celebration lighting.",
        longDesc: "Your engagement ceremony sets the stage for your wedding journey. At KNK Makeup Studio, our engagement makeup strikes the ideal balance between everyday elegance and bridal grandeur. Featuring soft smokey eyes, fluttery lashes, glowing cheeks, and romantic lip tones, our looks complement pastel gowns, shararas, and silk sarees.",
        image: "/assets/images/new/home/bridal/8.webp",
        suitableFor: "Brides-to-be for their ring ceremony, roka, sagai, or pre-wedding sangeet celebrations.",
        whatIncluded: [
            "Personalized look matching based on your outfit colour palette",
            "Radiant dewy skin prep and illuminating primer",
            "Soft-glam eye makeup with champagne or rose-gold shimmer",
            "Natural wispy eyelashes and sculpted eyebrows",
            "Engagement hairdo (curls, half-updo, or braided twist) and saree/dupatta draping"
        ],
        benefits: [
            { title: "Fresh & Youthful", desc: "Avoids heavy bridal weight, highlighting your youthful, radiant self." },
            { title: "Flattering in Candlelight & LED", desc: "Formulated to look stunning in both daylight and moody evening ambient lighting." },
            { title: "Long-Wear Performance", desc: "Remains fresh through ring exchanges, greetings, and photo sessions." },
            { title: "Complete Look Coordination", desc: "Hairstyle and jewellery setting harmonized with your outfit's neckline." }
        ],
        stylesOrProcess: [
            { title: "Rose Gold Shimmer Look", desc: "Warm champagne lids, winged liner, and a dusty mauve or berry lip." },
            { title: "The Pastel Glow", desc: "Dewy skin with peach blush, illuminated high points, and nude gloss." },
            { title: "Smokey Glamour", desc: "Soft bronze smokey eye for evening celebrations with glamorous Hollywood waves." }
        ],
        whyChooseKnk: [
            "Specialized in modern Indian fusion and pastel styling",
            "Experienced with ring ceremony photography lighting setups",
            "Fast, punctual turnaround that ensures you arrive on time",
            "Relaxing, joyful pampering in our luxury salon suites"
        ],
        relatedServices: [
            { title: "Bridal Makeup", url: "/makeup-services/bridal-makeup" },
            { title: "Party Makeup", url: "/makeup-services/party-makeup" },
            { title: "Nail Extensions", url: "/services/nails/nail-extensions" }
        ],
        faqs: [
            { q: "How is engagement makeup different from wedding bridal makeup?", a: "Engagement makeup is slightly lighter and softer than wedding makeup. It emphasizes natural glow, romantic soft-shimmer eyes, and pastel tones, saving the dramatic royal intensity for the wedding day." },
            { q: "Can I choose my own hairstyle for my engagement?", a: "Of course! Our hairstylist will review your gown back design and jewelry to suggest half-updos, loose waves, or floral braids that suit you best." },
            { q: "Do you offer makeup packages for both engagement and wedding?", a: "Yes, we offer comprehensive bridal combo packages covering Roka, Engagement, Mehndi, Haldi, Wedding, and Reception at attractive bundle savings." }
        ]
    },

    "party-makeup": {
        slug: "party-makeup",
        categorySlug: "makeup",
        categoryName: "Makeup Studio",
        url: "/makeup-services/party-makeup",
        parentUrl: "/makeup",
        title: "Party & Cocktail Makeup in Lucknow | KNK Salon Awadh",
        h1: "Party & Cocktail Makeup in Lucknow",
        eyebrow: "Evening Glamour",
        shortDesc: "Glamorous party makeup for sangeets, cocktail soirees, family weddings, and festive celebrations.",
        longDesc: "Step into the spotlight with bespoke Party Makeup at KNK Salon. Whether attending a glamorous Bollywood-themed sangeet, an upscale black-tie cocktail gala, or your best friend's wedding, our artists curate a chic, statement look that accentuates your finest features and turns heads all evening.",
        image: "/assets/images/new/home/bridal/5.webp",
        suitableFor: "Bridesmaids, mothers of the bride, cocktail attendees, party guests, and festive celebration attendees.",
        whatIncluded: [
            "Quick skin cleansing and hydrating prep",
            "Flawless medium-to-full coverage base matching your skin tone",
            "Party eye artistry (smokey, winged cat-eye, or metallic sparkle)",
            "False eyelash application for dramatic camera definition",
            "Occasion hair styling (curls, sleek blowout, or updo) and draping"
        ],
        benefits: [
            { title: "Photogenic Finish", desc: "Looks stunning in selfies, portraits, and dynamic party video reels." },
            { title: "Sweat-Resistant on Dance Floors", desc: "Locked in with setting powders and sprays that resist heat and movement." },
            { title: "Customizable Glamour Level", desc: "From understated minimalist elegance to high-octane red carpet glamour." },
            { title: "Quick & Efficient", desc: "Finished in 60 to 75 minutes so you never miss party timings." }
        ],
        stylesOrProcess: [
            { title: "Smokey Eye & Nude Lip", desc: "Timeless sultry charcoal or bronze eye paired with a matte nude lip." },
            { title: "Glossy Editorial Glam", desc: "Dewy glass skin, brushed-up fluffy brows, and juicy tinted lips." },
            { title: "Classic Red Lip & Wing", desc: "Old-Hollywood glamour with sharp eyeliner and velvet scarlet lipstick." }
        ],
        whyChooseKnk: [
            "Senior makeup artists with years of runway and party glam experience",
            "Fast group booking slots for families and bridesmaids",
            "Premium branded cosmetics ensuring zero skin irritation",
            "Prime convenient locations across Lucknow"
        ],
        relatedServices: [
            { title: "Reception Makeup", url: "/makeup-services/reception-makeup" },
            { title: "Engagement Makeup", url: "/makeup-services/engagement-makeup" },
            { title: "Couture Hair Styling", url: "/services/hair/hair-styling" }
        ],
        faqs: [
            { q: "How long does party makeup take?", a: "A party makeup session takes roughly 60 to 90 minutes including basic hair styling." },
            { q: "Are false eyelashes included in party makeup?", a: "Yes, standard high-quality false lashes are included to complete your eye definition." },
            { q: "Can KNK handle makeup for 5-10 family members together?", a: "Yes, with our large team of certified artists, we frequently accommodate group bridesmaid and family bookings smoothly without delays." }
        ]
    },

    "reception-makeup": {
        slug: "reception-makeup",
        categorySlug: "makeup",
        categoryName: "Makeup Studio",
        url: "/makeup-services/reception-makeup",
        parentUrl: "/makeup",
        title: "Reception Makeup in Lucknow | Post-Wedding Glamour | KNK Salon",
        h1: "Reception Makeup in Lucknow",
        eyebrow: "Contemporary Splendor",
        shortDesc: "High-fashion reception makeup balancing dramatic stage lighting with sophisticated post-wedding elegance.",
        longDesc: "The wedding reception is your moment to showcase modern sophistication. Moving away from traditional wedding reds, reception styling embraces western gowns, designer sarees, and contemporary lehengas. At KNK Salon Lucknow, our reception makeup combines sculpted cheekbones, sultry eyes, and luminous bases engineered for high-intensity stage lighting.",
        image: "/assets/images/new/home/bridal/12.webp",
        suitableFor: "Newlyweds hosting their wedding reception, dinner gala, or walima celebrations.",
        whatIncluded: [
            "Detailed skin re-hydration and post-wedding fatigue soothing",
            "HD or Airbrush base calibrated for bright stage chandeliers and photography",
            "Dimensional contouring that defines cheekbones and jawline under lighting",
            "High-fashion eye makeup: glitter cut crease or modern smokey bronze",
            "Hollywood curls, sleek buns, or voluminous textured updos with gown draping"
        ],
        benefits: [
            { title: "Stage Lighting Resistant", desc: "Formulated so bright stage spotlights do not wash out your facial features." },
            { title: "Revitalizes Tired Skin", desc: "Cooling serums restore skin vitality after exhausting wedding rituals." },
            { title: "Modern High-Fashion Aesthetic", desc: "The perfect match for trails, capes, western silhouettes, and cocktail couture." },
            { title: "Seamless Dupatta or Gown Draping", desc: "Expert handling of heavy trains, dupattas, and gown corsets." }
        ],
        stylesOrProcess: [
            { title: "The Royal Walima Look", desc: "Soft pastel bases with champagne eyes and rosy berry lips for regal charm." },
            { title: "Gown & Cocktail Glam", desc: "Sultry smokey eyes with sculpted bronze contours and slicked Hollywood waves." },
            { title: "Luminous Glass Finish", desc: "Intense dewy highlight reflecting light like diamonds across high cheekbones." }
        ],
        whyChooseKnk: [
            "Extensive experience with luxury banquet hall lighting conditions",
            "Fast recovery preps that erase dark circles and wedding exhaustion",
            "Trusted by leading brides across Lucknow for reception perfection",
            "Spacious luxury suites for private relaxation before the grand entry"
        ],
        relatedServices: [
            { title: "Bridal Makeup", url: "/makeup-services/bridal-makeup" },
            { title: "HD Makeup", url: "/makeup-services/hd-makeup" },
            { title: "Bespoke Nail Art", url: "/services/nails/nail-art" }
        ],
        faqs: [
            { q: "How is reception makeup different from wedding bridal makeup?", a: "Reception makeup is usually more modern, glamorous, and editorial. While wedding makeup honors cultural tradition and red tones, reception looks often feature metallic pigments, bold eyes, nude or berry lips, and Hollywood-inspired hair to suit designer gowns." },
            { q: "My skin feels exhausted after the wedding. Can reception makeup hide fatigue?", a: "Yes! We begin reception sessions with cooling cryo-rollers, collagen eye masks, and deep moisture infusions to awaken tired skin before applying light-reflecting primers." },
            { q: "Do you help with gown zip-ins and heavy dupatta pinning?", a: "Yes, our draping specialists are on hand to assist with gown corsetry, can-can skirts, and intricate veil or cape attachments." }
        ]
    },

    // ==========================================
    // NAILS SERVICES (6)
    // ==========================================
    "nail-art": {
        slug: "nail-art",
        categorySlug: "nails",
        categoryName: "Nails",
        url: "/services/nails/nail-art",
        parentUrl: "/services/nails",
        title: "Bespoke Nail Art in Lucknow | Creative & Bridal Designs | KNK Salon",
        h1: "Bespoke Nail Art in Lucknow",
        eyebrow: "Nail Studio",
        shortDesc: "Intricate hand-painted nail designs, minimalist line art, chrome glazed donuts, and bridal Swarovski crystals.",
        longDesc: "Your hands are in constant focus, and your nails deserve bespoke artistic expression. At KNK Salon's Nail Bar, our certified nail artists handcraft custom designs ranging from timeless Parisian French tips and ombré chrome to intricate 3D bridal motifs, encapsulated glitter, and floral foil art.",
        image: "/assets/images/new/service/NAILS.webp",
        suitableFor: "Brides, fashion lovers, vacation prep, and anyone wanting statement nails that reflect their personal aesthetic.",
        whatIncluded: [
            "Gentle nail shaping, buffing, and cuticle clean-up",
            "Bonding base coat to protect the natural nail bed",
            "Handcrafted nail art application (chrome, foil, stones, or hand-painted art)",
            "High-gloss UV gel top coat curing for long-lasting seal",
            "Nourishing cuticle oil massage"
        ],
        benefits: [
            { title: "Long-Wearing Brilliance", desc: "UV-cured topcoats guarantee 3 to 4 weeks of chip-free shine." },
            { title: "Personalized Creativity", desc: "Bring your favorite Pinterest inspirations or let our artists design a custom set." },
            { title: "Non-Damaging Removal", desc: "Gentle removal protocols that safeguard your natural nail strength." },
            { title: "Bridal Matchmaking", desc: "Colors and accents coordinated to complement your lehenga and rings." }
        ],
        stylesOrProcess: [
            { title: "Chrome Glaze", desc: "Iridescent metallic powder buffed over neutral base for an ethereal glazed finish." },
            { title: "French Ombré", desc: "Seamless baby-boomer gradient blending natural pink into soft white tips." },
            { title: "Bridal Crystal Embellishment", desc: "Swarovski crystals, micro-pearls, and gold caviar beads secured with builder gel." },
            { title: "Encapsulated Art", desc: "Dried flowers, gold leaf, and foil preserved beneath clear crystal gel." }
        ],
        whyChooseKnk: [
            "Sterilized medical-grade tooling and single-use buffers",
            "Extensive collection of over 200+ luxury gel polish shades",
            "Experienced nail technicians with steady hand precision",
            "Hygienic, comfortable dedicated nail bar stations"
        ],
        relatedServices: [
            { title: "Nail Extensions", url: "/services/nails/nail-extensions" },
            { title: "Gel Nails", url: "/services/nails/gel-nails" },
            { title: "Luxury Manicure", url: "/services/nails/manicure" }
        ],
        faqs: [
            { q: "How long does custom nail art take to complete?", a: "Depending on complexity, nail art takes roughly 45 to 90 minutes." },
            { q: "Can nail art be done on natural nails or only extensions?", a: "Nail art can be applied on both natural nails and extensions! If your natural nails are strong, a simple gel overlay provides the perfect canvas." },
            { q: "How do I make my nail art last longer?", a: "Avoid using your nails as tools to open cans or boxes, wear gloves when cleaning with chemicals, and apply cuticle oil daily." }
        ]
    },

    "nail-extensions": {
        slug: "nail-extensions",
        categorySlug: "nails",
        categoryName: "Nails",
        url: "/services/nails/nail-extensions",
        parentUrl: "/services/nails",
        title: "Nail Extensions in Lucknow | Gel & Acrylic Tips | KNK Salon",
        h1: "Nail Extensions in Lucknow",
        eyebrow: "Nail Architecture",
        shortDesc: "Sculpted tips in almond, coffin, stiletto, and square shapes providing natural length, balance, and durability.",
        longDesc: "Short or brittle nails? Instantly achieve elegant, elongated hands with professional Nail Extensions at KNK Salon. Our certified technicians expertly sculpt gel or acrylic extensions tailored to your natural nail plate, offering unmatched strength, structural apex balance, and a natural, lightweight feel.",
        image: "/assets/images/new/service/NAILS.webp",
        suitableFor: "Anyone with short, bitten, or brittle nails who wants instant length, uniform shape, and long-lasting durability.",
        whatIncluded: [
            "Cuticle prep and gentle dehydrating nail primer",
            "Tip sizing or sculpting form placement",
            "Precision application of builder gel or acrylic compound",
            "Architectural filing: perfecting shape, sidewalls, and apex curve",
            "Gel polish color application, topcoat curing, and cuticle massage"
        ],
        benefits: [
            { title: "Instant Length & Shape", desc: "Transform short or broken nails into uniform, elegant shapes in one visit." },
            { title: "Exceptional Durability", desc: "Engineered to withstand typing, household tasks, and active lifestyles." },
            { title: "Protects Natural Nails", desc: "Shields your natural nail bed underneath, allowing it to grow without snapping." },
            { title: "Customizable Shapes", desc: "Choose from almond, coffin, ballerina, square, or oval shapes." }
        ],
        stylesOrProcess: [
            { title: "Almond Shape", desc: "Tapered sides with a rounded tip that elongates fingers and offers maximum elegance." },
            { title: "Coffin / Ballerina", desc: "Tapered with a straight flat edge for a bold, high-fashion statement." },
            { title: "Classic Square / Squoval", desc: "Clean straight edges with softly rounded corners for daily practicality." }
        ],
        whyChooseKnk: [
            "Certified nail technicians with rigorous training in nail anatomy",
            "Gentle e-file cuticle techniques that protect natural nail health",
            "High-grade European gel and acrylic formulas with zero lifting",
            "Safe, damage-free removal and refill services available"
        ],
        relatedServices: [
            { title: "Acrylic Nails", url: "/services/nails/acrylic-nails" },
            { title: "Gel Nails", url: "/services/nails/gel-nails" },
            { title: "Bespoke Nail Art", url: "/services/nails/nail-art" }
        ],
        faqs: [
            { q: "How long do nail extensions last before needing a refill?", a: "Extensions usually last 3 to 4 weeks. We recommend an infill service around week 3 to fill in the growth gap near your cuticles." },
            { q: "Can I type and work normally with nail extensions?", a: "Yes! If you type frequently, an active medium-length almond or squoval shape is very comfortable and easy to manage." },
            { q: "How are nail extensions safely removed?", a: "We gently soak them off using specialized conditioning removers and professional e-files. Never try to pry or rip off extensions yourself, as that damages the natural nail bed." }
        ]
    },

    "acrylic-nails": {
        slug: "acrylic-nails",
        categorySlug: "nails",
        categoryName: "Nails",
        url: "/services/nails/acrylic-nails",
        parentUrl: "/services/nails",
        title: "Acrylic Nails in Lucknow | Strong Durable Enhancements | KNK Salon",
        h1: "Acrylic Nails in Lucknow",
        eyebrow: "Strength & Structure",
        shortDesc: "High-strength acrylic enhancements sculpted for maximum durability, chip-resistance, and long-wear stability.",
        longDesc: "Acrylic Nails remain the gold standard for clients demanding maximum durability and structural strength. At KNK Salon, we mix premium liquid monomer and refined polymer powder to sculpt resilient, perfectly balanced nail enhancements that hold up under vigorous daily activity.",
        image: "/assets/images/new/service/NAILS.webp",
        suitableFor: "Clients who use their hands extensively, nail biters, or those seeking dramatic length and unbreakable strength.",
        whatIncluded: [
            "Natural nail bed sanitization and light buffing",
            "Non-acid primer application to ensure strong bond",
            "Monomer and polymer sculpting with precision brushwork",
            "E-file contouring for a smooth, natural-looking apex",
            "Gel polish or colored acrylic overlay with high-gloss finish"
        ],
        benefits: [
            { title: "Unmatched Structural Strength", desc: "The most durable nail enhancement technology available." },
            { title: "Long-Wearing Stability", desc: "Resists snapping, cracking, or bending even under heavy hand usage." },
            { title: "Ideal for Nail Biters", desc: "Creates a hard barrier that discourages biting and allows natural nails to heal." },
            { title: "Endless Style Options", desc: "Easily paired with bright neon colors, French designs, and 3D gems." }
        ],
        stylesOrProcess: [
            { title: "Full Set Sculpting", desc: "New set constructed from scratch with tip extensions or sculpting forms." },
            { title: "Acrylic Overlay", desc: "Applied directly over natural nails to add strength without adding length." },
            { title: "Acrylic Refill (Infill)", desc: "Replenishes the cuticle gap every 3 weeks to re-balance the apex." }
        ],
        whyChooseKnk: [
            "Low-odor, MMA-free premium monomer formulas",
            "Careful cuticle sealing that eliminates early lifting",
            "Expert shaping that prevents thick or bulky fake-looking edges",
            "Comprehensive aftercare instruction and quick repair support"
        ],
        relatedServices: [
            { title: "Gel Nails", url: "/services/nails/gel-nails" },
            { title: "Bespoke Nail Art", url: "/services/nails/nail-art" },
            { title: "Luxury Manicure", url: "/services/nails/manicure" }
        ],
        faqs: [
            { q: "Is acrylic worse for nails than gel?", a: "Neither damages the natural nail when properly applied and professionally removed. Acrylic is firmer and slightly heavier, making it best for high durability, whereas gel is more flexible." },
            { q: "How often do acrylics need to be filled?", a: "We recommend an infill every 3 weeks as your natural nail pushes the acrylic outward." },
            { q: "Can I apply normal nail polish over acrylics?", a: "Yes, you can apply regular polish over acrylics and remove it with acetone-free nail polish remover without affecting the underlying acrylic." }
        ]
    },

    "gel-nails": {
        slug: "gel-nails",
        categorySlug: "nails",
        categoryName: "Nails",
        url: "/services/nails/gel-nails",
        parentUrl: "/services/nails",
        title: "Gel Nails & Polish in Lucknow | Chip-Free High Gloss | KNK Salon",
        h1: "Gel Nails & Gel Polish in Lucknow",
        eyebrow: "Flexible Radiance",
        shortDesc: "Flexible, lightweight UV/LED-cured gel polish providing 3+ weeks of mirror-like shine and zero chip downtime.",
        longDesc: "Say goodbye to smudged wet polish and chipped edges. KNK Salon's Gel Polish services cure instantly beneath state-of-the-art LED lamps, leaving your nails dry the very second you leave the station. With flexible shock-absorbing polymers, our gel manicures maintain a fresh, glossy look for weeks.",
        image: "/assets/images/new/service/NAILS.webp",
        suitableFor: "Anyone seeking a quick-dry, chip-free, mirror-shiny manicure that lasts through work, travel, and household routines.",
        whatIncluded: [
            "Russian-style dry manicure and gentle cuticle removal",
            "Nail plate dehydration and bonding base coat",
            "Two coats of highly pigmented European gel colour",
            "LED 60-second curing between every layer",
            "No-wipe mirror shine topcoat and cuticle nourishment"
        ],
        benefits: [
            { title: "Instantly Dry", desc: "Walk out immediately with zero worry of smudging in your purse or car keys." },
            { title: "Zero Chipping for 21+ Days", desc: "Maintains pristine edges through everyday hand washing and typing." },
            { title: "Natural Flexibility", desc: "Bends with your natural nail rather than cracking." },
            { title: "Mirror High Gloss", desc: "Maintains intense glass reflection without dulling over time." }
        ],
        stylesOrProcess: [
            { title: "Classic Nude & Pastels", desc: "Elegant clean tones perfect for corporate environments and minimalist aesthetics." },
            { title: "Bold & Dark Elegance", desc: "Deep wines, emerald greens, and rich black curations with intense opacity." },
            { title: "Shimmer & Cat-Eye Gel", desc: "Magnetic pigments shifted with magnets to create hypnotic velvet light effects." }
        ],
        whyChooseKnk: [
            "Leading international gel brands (OPI, Gelish, Bluesky)",
            "Safety-certified low-heat LED curing lamps",
            "Meticulous cuticle care for seamless line precision",
            "Complimentary gentle soak-off with every fresh set"
        ],
        relatedServices: [
            { title: "Bespoke Nail Art", url: "/services/nails/nail-art" },
            { title: "Nail Extensions", url: "/services/nails/nail-extensions" },
            { title: "Therapeutic Pedicure", url: "/services/nails/pedicure" }
        ],
        faqs: [
            { q: "How long does gel polish take to dry?", a: "Gel polish cures completely under our LED lamps in 60 seconds per layer. There is zero drying time afterward." },
            { q: "Can gel polish be applied to toenails?", a: "Yes! Gel pedicures are hugely popular because they stay perfect for over a month and resist shoe friction." },
            { q: "How should I remove gel polish at home?", a: "We advise visiting the salon for gentle professional removal. If removing at home, gently buff the top shine, soak cotton balls in acetone, wrap in foil for 12 minutes, and slide the softened gel off." }
        ]
    },

    "manicure": {
        slug: "manicure",
        categorySlug: "nails",
        categoryName: "Nails",
        url: "/services/nails/manicure",
        parentUrl: "/services/nails",
        title: "Luxury Spa Manicure in Lucknow | Hand Wellness | KNK Salon",
        h1: "Luxury Spa Manicure in Lucknow",
        eyebrow: "Hand Rejuvenation",
        shortDesc: "Aromatic hand soak, botanical exfoliation, cuticle softening, thermal wrap, and relaxing acupressure massage.",
        longDesc: "Give your hands the luxurious restorative therapy they deserve. KNK Salon's Spa Manicure combines essential cuticle maintenance with intensive skin hydration. Utilizing exfoliating fruit scrubs, thermal warm wraps, and soothing hand and forearm massages, our manicures relieve digital strain and leave hands supple and soft.",
        image: "/assets/images/new/service/NAILS.webp",
        suitableFor: "Dry, sun-damaged hands, ragged cuticles, desk fatigue, or pre-event hand preparation.",
        whatIncluded: [
            "Warm aromatherapy cleansing soak infused with essential oils",
            "Nail trimming, shaping, and cuticle conditioning",
            "Gentle sugar or walnut exfoliating scrub",
            "Hydrating hand mask with warm thermal mitt infusion",
            "15-minute hand and forearm acupressure massage followed by polish"
        ],
        benefits: [
            { title: "Reverses Hand Aging & Sun Damage", desc: "Exfoliates dead skin cells and lightens uneven sun tan." },
            { title: "Softens Ragged Cuticles", desc: "Eliminates painful hangnails and fosters healthy nail matrix growth." },
            { title: "Improves Blood Circulation", desc: "Acupressure massage dissolves joint stiffness and keyboard fatigue." },
            { title: "Deep Velvet Moisture", desc: "Thermal wraps infuse botanical butters deep into dry skin layers." }
        ],
        stylesOrProcess: [
            { title: "Express Manicure", desc: "Quick shaping, cuticle cleanup, buffing, and regular polish." },
            { title: "Luxury Spa Manicure", desc: "Comprehensive soak, scrub, mask, extended massage, and polish." },
            { title: "Paraffin Wax Manicure", desc: "Warm therapeutic paraffin dip that locks in moisture and softens arthritis stiffness." }
        ],
        whyChooseKnk: [
            "Strictly sterilized medical autoclaved tools for 100% hygiene",
            "Organic, skin-friendly exfoliants free of harsh parabens",
            "Ergonomic luxury pedicure-manicure lounge chairs",
            "Comprehensive selection of both standard and gel polish finishes"
        ],
        relatedServices: [
            { title: "Therapeutic Pedicure", url: "/services/nails/pedicure" },
            { title: "Gel Nails", url: "/services/nails/gel-nails" },
            { title: "Bespoke Nail Art", url: "/services/nails/nail-art" }
        ],
        faqs: [
            { q: "How long does a luxury spa manicure take?", a: "A full luxury spa manicure takes approximately 45 to 60 minutes." },
            { q: "What is the benefit of a paraffin treatment?", a: "Warm paraffin wax creates a gentle thermal seal that drives moisturizing lotions deep into skin crevices, smoothing cracked hands and easing joint stiffness." },
            { q: "How frequently should I get a manicure?", a: "Every 2 to 3 weeks helps maintain healthy cuticles, neat nail edges, and smooth hand texture." }
        ]
    },

    "pedicure": {
        slug: "pedicure",
        categorySlug: "nails",
        categoryName: "Nails",
        url: "/services/nails/pedicure",
        parentUrl: "/services/nails",
        title: "Therapeutic Spa Pedicure in Lucknow | Foot Care | KNK Salon",
        h1: "Therapeutic Spa Pedicure in Lucknow",
        eyebrow: "Sole Revival",
        shortDesc: "Whirlpool foot bath, callus softening, sea salt exfoliation, nourishing clay mask, and pressure-point foot massage.",
        longDesc: "Step into pure tranquility with KNK Salon's Therapeutic Pedicure. Our foot rituals eliminate cracked heels, soften stubborn calluses, and relieve tired leg muscles. Nestled in ergonomic massage thrones with pipeless whirlpool basins, our pedicures prioritize absolute hygiene and deep, tranquil restoration.",
        image: "/assets/images/new/service/NAILS.webp",
        suitableFor: "Tired, cracked, callused feet, high-heel fatigue, post-travel exhaustion, or routine foot hygiene.",
        whatIncluded: [
            "Whirlpool foot soak with Epsom salts and calming tea tree oils",
            "Nail trimming, filing, and gentle e-file cuticle care",
            "Callus smoothing with gentle pumice rasping",
            "Invigorating foot and calf sea salt scrub",
            "Detoxifying clay foot mask and 15-minute reflexology massage"
        ],
        benefits: [
            { title: "Eliminates Cracked Heels", desc: "Smooths dry fissures and rough skin on heels and balls of the feet." },
            { title: "Prevents Ingrown Toenails", desc: "Professional trimming prevents painful corner ingrowth." },
            { title: "Relieves Foot & Leg Tension", desc: "Targeted reflexology points stimulate relaxation throughout the entire body." },
            { title: "De-Tans & Brightens", desc: "Exfoliates dead, sun-exposed skin to restore smooth, even complexion." }
        ],
        stylesOrProcess: [
            { title: "Classic Spa Pedicure", desc: "Essential soak, scrub, callus rasp, mask, and nail polish." },
            { title: "Ice Cream / Chocolate Pedicure", desc: "Antioxidant-rich cocoa butter and vanilla foot wraps for extreme hydration." },
            { title: "Eucalyptus Detox Pedicure", desc: "Cooling mint and tea tree foot bath that soothes tired, swollen feet." }
        ],
        whyChooseKnk: [
            "Single-use disposable basin liners and sterilized pedicure sets",
            "Pipeless whirlpool jet basins ensuring zero bacteria stagnation",
            "Trained foot reflexology specialists",
            "Long-lasting gel and regular polish options"
        ],
        relatedServices: [
            { title: "Luxury Manicure", url: "/services/nails/manicure" },
            { title: "Gel Nails", url: "/services/nails/gel-nails" },
            { title: "Body Care & Polishing", url: "/services/beauty/body-care" }
        ],
        faqs: [
            { q: "Is your pedicure equipment sanitized between clients?", a: "Yes! Hygiene is paramount at KNK Salon. All metal instruments undergo hospital-grade ultrasonic and autoclave sterilization, and buffers and foot rasps are single-use." },
            { q: "Can a pedicure fix deep cracked heels?", a: "Yes, our intensive callus softening protocols combined with paraffin or rich butter wraps dramatically repair cracked heels within a single session." },
            { q: "How often should I get a pedicure?", a: "Once every 3 to 4 weeks is optimal to maintain soft soles and prevent calluses." }
        ]
    },

    // ==========================================
    // BEAUTY & SKIN SERVICES (5)
    // ==========================================
    "facial": {
        slug: "facial",
        categorySlug: "beauty",
        categoryName: "Beauty & Skin",
        url: "/services/beauty/facial",
        parentUrl: "/services/beauty",
        title: "Luxury Facials & HydraFacial in Lucknow | KNK Salon Awadh",
        h1: "Signature Facials & Skin Radiance in Lucknow",
        eyebrow: "Dermal Artistry",
        shortDesc: "Custom multi-step facials, HydraFacials, and anti-pigmentation rituals formulated for glass skin.",
        longDesc: "Attain healthy, radiant, and youthful skin with customized Signature Facials at KNK Salon. Guided by professional skin diagnostic assessments, our estheticians blend clinical actives (hyaluronic acid, vitamin C, peptides) with European facial massage techniques. Whether seeking deep pore cleansing, pigmentation reduction, or bridal glow, our facials leave skin visibly lifted and glowing.",
        image: "/assets/images/new/service/facialservice.webp",
        suitableFor: "Dull, dehydrated, sun-tanned, congested, aging, or acne-prone skin, as well as brides preparing for their wedding.",
        whatIncluded: [
            "Skin type and moisture barrier diagnostic assessment",
            "Double cleanse and gentle enzymatic or glycolic peel exfoliation",
            "Warm ozone steam and ultrasonic blackhead extraction",
            "Facial lymphatic drainage massage with botanical active oils",
            "Custom rubberized peel-off mask, eye treatment, and sunscreen"
        ],
        benefits: [
            { title: "Instant Luminosity", desc: "Revives tired, dull complexions with immediate dewy glass skin." },
            { title: "Deep Pore Unclogging", desc: "Extracts impurities, whiteheads, and blackheads without skin tearing." },
            { title: "Boosts Collagen & Firmness", desc: "Lymphatic facial massage stimulates micro-circulation and muscle tone." },
            { title: "Fades Pigmentation & Sun Tan", desc: "Targeted brightening serums even out skin tone and dark spots." }
        ],
        stylesOrProcess: [
            { title: "Hydra-Glow Facial", desc: "Multi-step vortex suction cleansing, chemical peel, extraction, and serum hydration." },
            { title: "Gold & Saffron Bridal Facial", desc: "Ayurvedic and modern fusion delivering regal, long-lasting wedding radiance." },
            { title: "Anti-Aging Peptide Facial", desc: "Infuses collagen peptides and firming extracts that smooth fine expression lines." },
            { title: "Clarifying Acne Facial", desc: "Calms active breakouts, regulates sebum, and shrinks enlarged pores with tea tree." }
        ],
        whyChooseKnk: [
            "Certified clinical estheticians with deep dermatology knowledge",
            "Premium international skincare lines (O3+, Cheryl's, Casmara)",
            "Strict sanitation protocols with disposable sponges and gloves",
            "Custom home maintenance routines prescribed after every facial"
        ],
        relatedServices: [
            { title: "Deep Face Clean-Up", url: "/services/beauty/cleanup" },
            { title: "Body Care & Polishing", url: "/services/beauty/body-care" },
            { title: "Bridal Makeup", url: "/makeup-services/bridal-makeup" }
        ],
        faqs: [
            { q: "How often should I get a facial?", a: "Since the skin’s natural cellular renewal cycle is approximately 28 days, a facial every 3 to 4 weeks is recommended for ongoing skin health." },
            { q: "Will I break out after a facial?", a: "Mild purging can occasionally happen if skin was heavily congested, but our soothing masks and antibacterial high-frequency treatments ensure minimal irritation." },
            { q: "How many days before an event should I schedule a facial?", a: "We recommend scheduling your facial 3 to 5 days prior to your wedding or function so your skin is at peak radiance on the event day." }
        ]
    },

    "cleanup": {
        slug: "cleanup",
        categorySlug: "beauty",
        categoryName: "Beauty & Skin",
        url: "/services/beauty/cleanup",
        parentUrl: "/services/beauty",
        title: "Deep Face Clean-Up in Lucknow | Pore Cleansing | KNK Salon",
        h1: "Deep Face Clean-Up in Lucknow",
        eyebrow: "Pore Purification",
        shortDesc: "Pore-clearing exfoliation, steam extraction, and soothing mask to refresh dull or congested skin.",
        longDesc: "When your schedule is packed but your skin feels congested, KNK Salon's Deep Face Clean-Up provides the perfect quick revitalization. Focused on removing dead skin buildup, extracting blackheads, and rebalancing surface moisture, a cleanup clears your pores and restores a fresh, vibrant glow in under 45 minutes.",
        image: "/assets/images/new/service/facialservice.webp",
        suitableFor: "Young skin, busy professionals, oily and acne-prone skin, or maintenance between monthly facial sessions.",
        whatIncluded: [
            "Deep gel cleansing to remove makeup, oil, and atmospheric dust",
            "Gentle scrub exfoliation targeting the T-zone and chin",
            "Ozone steam treatment to soften pore debris",
            "Hygienic comedone extraction of blackheads and whiteheads",
            "Pore-tightening toner and cooling soothing face pack"
        ],
        benefits: [
            { title: "Clears Clogged Pores", desc: "Stops blackheads and trapped sebum from turning into painful blemishes." },
            { title: "Quick & Efficient", desc: "Complete skin revival accomplished in just 35-45 minutes." },
            { title: "Refines Skin Texture", desc: "Smooths away rough dry patches so skincare and makeup glide on seamlessly." },
            { title: "Controls Excess Shine", desc: "Balances oil production without over-stripping natural moisture." }
        ],
        stylesOrProcess: [
            { title: "Detan Clean-Up", desc: "Formulated with brightening fruit enzymes to lift stubborn sun tan." },
            { title: "Anti-Acne Purifying Clean-Up", desc: "Tea tree and neem formulas that reduce inflammation and calm breakouts." },
            { title: "Hydrating Rose Clean-Up", desc: "Delicate rosewater and aloe vera blend suited for sensitive, dry skin." }
        ],
        whyChooseKnk: [
            "Pain-free, gentle extraction techniques that do not leave red marks",
            "Sterilized extraction tools and single-use cotton pads",
            "Affordable everyday luxury for consistent monthly skincare",
            "Convenient walk-in and booked appointments available"
        ],
        relatedServices: [
            { title: "Signature Facials", url: "/services/beauty/facial" },
            { title: "Precision Threading", url: "/services/beauty/threading" },
            { title: "Gentle Waxing Rituals", url: "/services/beauty/waxing" }
        ],
        faqs: [
            { q: "What is the difference between a Clean-Up and a Facial?", a: "A Clean-Up focuses strictly on cleansing, exfoliation, steam, extraction, and a mask (35-45 mins). A Facial includes specialized lymphatic massage, targeted active serums, and intensive treatment masks (60-75 mins)." },
            { q: "Can I wear makeup immediately after a clean-up?", a: "We advise letting your pores breathe for at least 4 to 6 hours after extraction before applying foundation." },
            { q: "How often should I get a face clean-up?", a: "Every 2 to 3 weeks is ideal, especially if you spend time outdoors or in traffic." }
        ]
    },

    "waxing": {
        slug: "waxing",
        categorySlug: "beauty",
        categoryName: "Beauty & Skin",
        url: "/services/beauty/waxing",
        parentUrl: "/services/beauty",
        title: "Gentle Waxing Services in Lucknow | Rica & Chocolate Wax | KNK Salon",
        h1: "Gentle Waxing Rituals in Lucknow",
        eyebrow: "Velvet Smooth Skin",
        shortDesc: "Low-heat chocolate, Rica, and stripless peel-off waxing designed for sensitive skin and hair-free silkiness.",
        longDesc: "Experience virtually painless hair removal with KNK Salon's premium waxing rituals. We discard cheap, burning waxes in favor of premium Rica liposoluble and Italian chocolate formulations. Operating at low, skin-comfortable temperatures, our waxes grip hair firmly at the root without pulling on delicate skin layers, minimizing redness and preventing ingrown hair.",
        image: "/assets/images/new/service/beautyservice.webp",
        suitableFor: "Full body, arms, legs, underarms, bikini/Brazilian, and facial waxing for sensitive skin types.",
        whatIncluded: [
            "Skin sanitization and pre-wax soothing talc/lotion application",
            "Temperature-controlled wax warming for maximum comfort",
            "Quick, gentle hair removal along the natural grain",
            "Post-wax soothing oil that cleans residue and calms hair follicles",
            "Application of cooling aloe vera gel to eliminate redness"
        ],
        benefits: [
            { title: "Significantly Less Pain", desc: "Colophony-free liposoluble wax adheres to hair instead of pulling skin." },
            { title: "Finer, Slower Regrowth", desc: "Pulls from the root, meaning hair grows back softer and thinner over time." },
            { title: "Removes Dead Skin & Tan", desc: "Gently exfoliates the top dull layer, leaving skin brighter." },
            { title: "Smooth for 3-4 Weeks", desc: "Longer-lasting smoothness compared to razor shaving or depilatory creams." }
        ],
        stylesOrProcess: [
            { title: "Rica Liposoluble Wax", desc: "Premium Italian wax enriched with vegetable oils for sensitive skin." },
            { title: "Dark Chocolate Wax", desc: "Aromatic cocoa butter formulation that hydrates while removing coarse hair." },
            { title: "Peel-Off Stripless Wax", desc: "Gentle hard wax for delicate zones like underarms, face, and bikini." },
            { title: "Full Body Wax Package", desc: "Full arms, full legs, underarms, and back for comprehensive smoothness." }
        ],
        whyChooseKnk: [
            "Strict zero double-dipping policy for absolute hygiene",
            "Private, clean, air-conditioned treatment suites",
            "Fast, experienced estheticians who minimize discomfort",
            "Disposable bed sheets, spatulas, and sanitized gloves"
        ],
        relatedServices: [
            { title: "Precision Threading", url: "/services/beauty/threading" },
            { title: "Body Care & Polishing", url: "/services/beauty/body-care" },
            { title: "Signature Facials", url: "/services/beauty/facial" }
        ],
        faqs: [
            { q: "Why is Rica wax better than normal honey wax?", a: "Honey wax uses sugar and resin that can stick to live skin, causing stinging and redness. Rica wax is resin-free and contains nourishing vegetable oils, adhering only to the hair shaft for a much less painful experience." },
            { q: "How long should my hair be before waxing?", a: "Hair should ideally be about 1/4 inch long (roughly 2-3 weeks of growth after shaving) so the wax can grip the root cleanly." },
            { q: "Can I shower after waxing?", a: "Yes, but avoid hot showers, saunas, and harsh body scrubs for 24 hours to let open follicles calm down." }
        ]
    },

    "threading": {
        slug: "threading",
        categorySlug: "beauty",
        categoryName: "Beauty & Skin",
        url: "/services/beauty/threading",
        parentUrl: "/services/beauty",
        title: "Eyebrow Threading & Facial Hair Removal in Lucknow | KNK Salon",
        h1: "Precision Threading & Brow Shaping in Lucknow",
        eyebrow: "Facial Architecture",
        shortDesc: "Precise eyebrow mapping, arch definition, upper lip, chin, and facial hair removal using sanitized cotton thread.",
        longDesc: "Eyebrows frame your face, and precision is everything. KNK Salon's threading artists specialize in facial mapping and arch architecture. Using high-tensile sanitized anti-bacterial cotton thread, we remove unwanted hairs right from the follicle, crafting clean, sharp, symmetrical brows that flatter your eye shape.",
        image: "/assets/images/new/service/beautyservice.webp",
        suitableFor: "Eyebrow shaping, upper lip, chin, forehead, sideburns, and full-face hair removal.",
        whatIncluded: [
            "Consultation on desired brow thickness and natural arch line",
            "Pre-threading skin sanitization and soothing powder",
            "Precision thread twisting for clean, straight line definition",
            "Fine scissor trimming of long unruly hairs",
            "Cooling aloe vera or astringent gentle massage"
        ],
        benefits: [
            { title: "Ultra-Sharp Line Precision", desc: "Far more accurate and clean than tweezing or waxing for eyebrows." },
            { title: "Chemical-Free & Natural", desc: "No hot waxes, acids, or chemicals—ideal for sensitive and retinoid-treated skin." },
            { title: "Pulls Fine Peach Fuzz", desc: "Removes even the tiniest invisible hairs for super-smooth makeup application." },
            { title: "Gentle on Delicate Skin", desc: "Does not peel or stretch the sensitive eyelid skin." }
        ],
        stylesOrProcess: [
            { title: "Eyebrow Arch Sculpting", desc: "Customized soft arch, high arch, or straight Korean brow alignment." },
            { title: "Upper Lip & Chin", desc: "Swift, smooth removal of dark or coarse facial hair." },
            { title: "Full Face Threading", desc: "Comprehensive threading of forehead, sides, upper lip, and chin." }
        ],
        whyChooseKnk: [
            "Light-handed senior estheticians who minimize discomfort",
            "100% sanitized antimicrobial thread used fresh for each client",
            "Consistent symmetrical results every single visit",
            "Quick walk-in service with zero fuss"
        ],
        relatedServices: [
            { title: "Deep Face Clean-Up", url: "/services/beauty/cleanup" },
            { title: "Gentle Waxing Rituals", url: "/services/beauty/waxing" },
            { title: "Eyebrow Microblading", url: "/aesthetic/microblading" }
        ],
        faqs: [
            { q: "How often should I get my eyebrows threaded?", a: "Most clients maintain clean lines by visiting every 2 to 3 weeks." },
            { q: "Is threading better than waxing for eyebrows?", a: "Yes! Threading gives far more pinpoint control hair-by-hair and does not pull or burn the thin, delicate skin surrounding your eyelids." },
            { q: "How do I avoid little red bumps after threading?", a: "We apply soothing aloe vera immediately after threading. Avoid touching your fresh brows with unwashed hands for a few hours to prevent bacteria from entering follicles." }
        ]
    },

    "body-care": {
        slug: "body-care",
        categorySlug: "beauty",
        categoryName: "Beauty & Skin",
        url: "/services/beauty/body-care",
        parentUrl: "/services/beauty",
        title: "Body Polishing & Spa Rituals in Lucknow | KNK Salon Awadh",
        h1: "Body Polishing & Spa Therapies in Lucknow",
        eyebrow: "Full-Body Rejuvenation",
        shortDesc: "Exfoliating botanical body scrubs, detan packs, thermal wraps, and hydrating full-body massages.",
        longDesc: "Treat your entire body to the same care you give your face. KNK Salon's Body Polishing and Spa rituals exfoliate dry, dead cellular buildup, stimulate lymphatic drainage, and drench skin in antioxidant-rich botanical oils. Perfect as a pre-bridal body ritual or post-travel recovery, it leaves skin velvety, radiant, and deeply tranquil.",
        image: "/assets/images/new/service/bodyservice.webp",
        suitableFor: "Brides-to-be, sun-tanned or dry skin, back acne marks, and anyone seeking full-body stress relief.",
        whatIncluded: [
            "Aromatherapy inhalation and warm towel cleansing",
            "Full body exfoliation using Himalayan salts or brown sugar scrubs",
            "Targeted detan pack applied to back, shoulders, and legs",
            "Warm shower rinse in private shower suite",
            "Full body nourishing oil massage that seals moisture into skin"
        ],
        benefits: [
            { title: "Head-to-Toe Velvet Glow", desc: "Reveals fresh, supple skin with an even tone across your entire body." },
            { title: "Eradicates Sun Tan & Dark Patches", desc: "Lightens stubborn discoloration on elbows, knees, back, and neck." },
            { title: "Deep Stress Relief", desc: "Full-body rhythmic massage eases muscular knots and fatigue." },
            { title: "Essential Bridal Prep", desc: "Ensures your skin looks flawless in low-back blouses and wedding lehengas." }
        ],
        stylesOrProcess: [
            { title: "Royal Awadhi Body Polish", desc: "Infused with saffron, sandalwood, and almond oils for quintessential bridal luxury." },
            { title: "Coffee & Cocoa Cellulite Scrub", desc: "Caffeine-charged scrub that tones skin, stimulates blood flow, and tightens pores." },
            { title: "Detox Aromatherapy Massage", desc: "Essential oil blends customized to calm insomnia, anxiety, and muscular fatigue." }
        ],
        whyChooseKnk: [
            "Private luxury therapy suites with attached warm showers",
            "Female therapists trained in professional European spa etiquette",
            "Pure, cold-pressed botanical oils free of mineral oils or chemicals",
            "Popular bridal pre-wedding packages curated for maximum glow"
        ],
        relatedServices: [
            { title: "Signature Facials", url: "/services/beauty/facial" },
            { title: "Gentle Waxing Rituals", url: "/services/beauty/waxing" },
            { title: "Therapeutic Pedicure", url: "/services/nails/pedicure" }
        ],
        faqs: [
            { q: "How long does a full body polishing session take?", a: "A complete session with scrub, detan mask, warm shower, and full-body massage takes between 90 to 120 minutes." },
            { q: "How many sessions of body polishing are recommended before a wedding?", a: "For brides, we recommend 2 to 3 sessions spaced 10 days apart, with the final session 3 to 4 days prior to the wedding." },
            { q: "Is body polishing safe for sensitive skin?", a: "Yes, our therapists adjust the scrub grit and pressure to match your skin sensitivity, ensuring a gentle, restorative experience." }
        ]
    },

    // ==========================================
    // MEN'S GROOMING SERVICES (5)
    // ==========================================
    "haircut-men": {
        slug: "haircut",
        categorySlug: "men-grooming",
        categoryName: "Men's Grooming",
        url: "/men-grooming/haircut",
        parentUrl: "/services/men-grooming",
        title: "Men's Haircut & Styling in Lucknow | KNK Barber Lounge",
        h1: "Men's Haircut & Hair Styling in Lucknow",
        eyebrow: "Gentlemen's Barbershop",
        shortDesc: "Precision clipper fades, textured crops, scissor tapers, and executive styling tailored to your face structure.",
        longDesc: "Step into executive confidence with KNK Men's Grooming. Our barbers specialize in modern precision clipper fades (skin, low, mid, drop), textured crops, and timeless corporate scissor tapers. We inspect hair whorls, density, and head shape to deliver a crisp cut that stays sharp for weeks.",
        image: "/assets/images/new/home/HAIRCUT.webp",
        suitableFor: "Men seeking professional haircuts, crisp fades, modern textured styles, or classic executive grooming.",
        whatIncluded: [
            "Personalized consultation on hair density, crown pattern, and styling goals",
            "Invigorating shampoo wash with cooling scalp massage",
            "Precision clipper fade and tailored scissor work",
            "Straight-razor neck cleanup and hot lather edge detailing",
            "Rinse, blow-dry, and styling with premium matte clay or pomade"
        ],
        benefits: [
            { title: "Custom Head Shape Calibration", desc: "Fade lines positioned precisely to complement your skull shape." },
            { title: "Grows Out Gracefully", desc: "Clean taper work that looks sharp even 3 to 4 weeks after your cut." },
            { title: "Razor-Clean Edges", desc: "Crisp straight-razor detailing on the neckline and sideburns." },
            { title: "Effortless Daily Maintenance", desc: "Cuts engineered to fall into place with minimal morning styling." }
        ],
        stylesOrProcess: [
            { title: "Low / Mid Skin Fade", desc: "Seamless transition from bare skin to textured top for a clean, sharp look." },
            { title: "Executive Scissor Cut", desc: "Classic side-parted corporate taper with natural weight and flow." },
            { title: "Textured French Crop", desc: "Blunt fringe with textured top, low fade, and effortless styling." },
            { title: "Pompadour & Quiff", desc: "High-volume front brushed back with natural shine and strong hold." }
        ],
        whyChooseKnk: [
            "Dedicated men's grooming zone with private barber chairs",
            "Senior barbers with mastery in straight razors and high-end fades",
            "Complimentary hair wash and styling product consultation",
            "Premium men's grooming products (pomades, clays, tonics)"
        ],
        relatedServices: [
            { title: "Beard Sculpting & Trim", url: "/men-grooming/beard" },
            { title: "Hot Towel Shave", url: "/men-grooming/shaving" },
            { title: "Men's Detan & Glow Facial", url: "/men-grooming/facial" }
        ],
        faqs: [
            { q: "How often should men get a haircut?", a: "To maintain a sharp fade, every 2 to 3 weeks is recommended. For classic scissor cuts, every 4 to 5 weeks is ideal." },
            { q: "Is a hair wash included with the men's haircut?", a: "Yes, every haircut at KNK Men's Grooming includes a refreshing wash, conditioning, and custom product styling." },
            { q: "Can the barber recommend a hairstyle for my face shape?", a: "Absolutely. Our barbers assess whether your face is round, oval, square, or diamond-shaped to suggest the most flattering cut." }
        ]
    },

    "beard": {
        slug: "beard",
        categorySlug: "men-grooming",
        categoryName: "Men's Grooming",
        url: "/men-grooming/beard",
        parentUrl: "/services/men-grooming",
        title: "Beard Sculpting, Trim & Styling in Lucknow | KNK Salon",
        h1: "Beard Sculpting & Beard Grooming in Lucknow",
        eyebrow: "Facial Architecture",
        shortDesc: "Precision beard shaping, razor cheekline crisping, length balancing, and hot beard oil conditioning.",
        longDesc: "A well-groomed beard defines masculine character. At KNK Salon Lucknow, our beard masters sculpt facial hair to sharpen your jawline, balance symmetry, and eliminate patchy unevenness. Completed with hot straight-razor detailing and cedarwood beard oil conditioning, your beard will look impeccable.",
        image: "/assets/images/new/home/MEN'S GROOMING.webp",
        suitableFor: "Stubble, medium corporate beards, full lumberjack beards, and groom pre-wedding beard detailing.",
        whatIncluded: [
            "Beard density analysis and jawline contour mapping",
            "Clipper and scissor length balancing and de-bulking",
            "Hot towel steam to open pores and soften coarse beard bristles",
            "Straight-razor cheekline and neckline crisping with clear gel",
            "Application of nourishing botanical beard oil and soothing balm"
        ],
        benefits: [
            { title: "Sharpens Jawline & Profile", desc: "Contouring creates the visual illusion of a stronger, more chiseled jaw." },
            { title: "Eliminates Patchiness", desc: "Strategic length blending makes thinner areas look full and uniform." },
            { title: "Softens Prickly Stubble", desc: "Hot towel conditioning softens coarse bristles so they don't scratch." },
            { title: "Prevents Beard Dandruff & Itch", desc: "Exfoliates underlying skin and restores moisture balance." }
        ],
        stylesOrProcess: [
            { title: "The Stubble Fade", desc: "Short, sharp 3-day stubble fading up cleanly into the sideburns." },
            { title: "The Corporate Beard", desc: "Medium neat length with sharp straight-razor cheeklines and neckline." },
            { title: "The Full Sculpted Beard", desc: "Substantial length with tapered sides and structured mustache alignment." }
        ],
        whyChooseKnk: [
            "Master barbers with steady hands and razor precision",
            "Hygienic single-use disposable razor blades for every client",
            "Premium beard balms and cold-pressed argan oils",
            "Specialized groom styling for royal wedding photographs"
        ],
        relatedServices: [
            { title: "Men's Haircut & Styling", url: "/men-grooming/haircut" },
            { title: "Hot Towel Shave", url: "/men-grooming/shaving" },
            { title: "Men's Hair Spa & Scalp Detox", url: "/men-grooming/hair-spa" }
        ],
        faqs: [
            { q: "How often should I trim my beard?", a: "For sharp, well-defined cheek and neck lines, a professional trim every 10 to 14 days keeps your beard looking crisp." },
            { q: "My beard gets itchy and dry. Can KNK help?", a: "Yes, our hot towel beard spa infuses argan and jojoba oils straight into the skin beneath your beard, banishing dry itch and flaking." },
            { q: "Do you offer beard colouring or gray coverage?", a: "Yes, we offer natural ammonia-free beard colour that blends grays without staining the skin." }
        ]
    },

    "shaving": {
        slug: "shaving",
        categorySlug: "men-grooming",
        categoryName: "Men's Grooming",
        url: "/men-grooming/shaving",
        parentUrl: "/services/men-grooming",
        title: "Traditional Hot Towel Wet Shave in Lucknow | KNK Salon",
        h1: "Traditional Hot Towel Shave in Lucknow",
        eyebrow: "The Gentleman's Ritual",
        shortDesc: "Traditional straight-razor wet shave with steaming essential-oil towels, warm rich lather, and cooling balm.",
        longDesc: "Rediscover the lost luxury of traditional barbershop shaving at KNK Salon. More than simple hair removal, our hot towel shave is an indulgent sensory ritual. Combining steaming eucalyptus towels, rich badger-brush warm lather, a single-blade straight razor glide, and ice-cold finishing towels, it delivers the closest, smoothest shave of your life.",
        image: "/assets/images/new/home/MEN'S GROOMING.webp",
        suitableFor: "Clean-shaven gentlemen, wedding grooming, and men wanting baby-smooth skin free of razor burn or stubble shadows.",
        whatIncluded: [
            "Pre-shave essential oil application to protect sensitive skin",
            "Steaming hot towel wrap infused with eucalyptus and lavender",
            "Warm thick lather whipped and applied with a classic shaving brush",
            "Gentle, close straight-razor pass with sanitized disposable blade",
            "Second hot towel wrap followed by cold closing compress and soothing balm"
        ],
        benefits: [
            { title: "The Closest Possible Shave", desc: "Single blade cut right at the skin surface without multi-blade tugging." },
            { title: "Zero Razor Burn or Bumps", desc: "Pre-shave oils and hot steam create an effortless gliding barrier." },
            { title: "Natural Skin Exfoliation", desc: "Sloughs off dead skin cells, leaving the face noticeably smoother." },
            { title: "Pure Tranquility", desc: "Warm and cold towels provide deep psychological and physical relaxation." }
        ],
        stylesOrProcess: [
            { title: "Single Pass Clean Shave", desc: "Ideal for everyday smooth comfort and sensitive skin." },
            { title: "The Royal Two-Pass Shave", desc: "With the grain followed by gentle cross-grain for absolute porcelain smoothness." },
            { title: "Beard Line Detailing Shave", desc: "Hot towel treatment focused strictly on sharpening cheek and neck contours." }
        ],
        whyChooseKnk: [
            "Strict single-use razor blade policy: brand-new blade opened in front of you",
            "Authentic warm lather machines and luxury shaving soaps",
            "Reclining leather barber chairs for total comfort",
            "Cooling alum block and soothing alcohol-free balms"
        ],
        relatedServices: [
            { title: "Men's Haircut & Styling", url: "/men-grooming/haircut" },
            { title: "Beard Sculpting & Trim", url: "/men-grooming/beard" },
            { title: "Men's Detan & Glow Facial", url: "/men-grooming/facial" }
        ],
        faqs: [
            { q: "Is a straight razor shave safe?", a: "Yes, our barbers are extensively trained in traditional straight-razor technique. We use fresh disposable surgical steel blades for every single shave." },
            { q: "I always get razor bumps. Will this shave prevent that?", a: "Yes! Multi-blade commercial cartridge razors tug hairs and cut them beneath the skin, causing ingrown bumps. Our single-blade technique cuts clean at the skin line without causing irritation." },
            { q: "How long does a hot towel shave session take?", a: "A complete luxury shave takes approximately 30 to 40 minutes." }
        ]
    },

    "facial-men": {
        slug: "facial",
        categorySlug: "men-grooming",
        categoryName: "Men's Grooming",
        url: "/men-grooming/facial",
        parentUrl: "/services/men-grooming",
        title: "Men's Facial & Detan Skin Treatment in Lucknow | KNK Salon",
        h1: "Men's Facial & Detan Skin Care in Lucknow",
        eyebrow: "Men's Dermal Health",
        shortDesc: "Formulated for thicker male skin to combat deep sun tan, excess oiliness, blackheads, and razor irritation.",
        longDesc: "Male skin is 25% thicker than female skin and produces twice as much sebum, requiring targeted clinical formulations. KNK Men's Facials and Detan rituals utilize activated charcoal, tea tree, and AHA fruit acids to dissolve stubborn blackheads, lighten sun damage from outdoor commutes, and soothe razor burn.",
        image: "/assets/images/new/service/facialservice.webp",
        suitableFor: "Men dealing with dull skin, sun tanning, oily T-zones, enlarged pores, or preparing for their wedding day.",
        whatIncluded: [
            "Deep pore gel cleanse cutting through grease and pollution",
            "Volcanic ash or walnut scrub exfoliating dead skin and ingrown hairs",
            "Warm steam and ultrasonic blackhead extraction",
            "Targeted detan brightening mask or cooling charcoal pack",
            "15-minute head, neck, and shoulder pressure-point massage"
        ],
        benefits: [
            { title: "Removes Stubborn Outdoor Sun Tan", desc: "Restores even skin tone after bike commutes or outdoor sports." },
            { title: "Controls Oil & Prevents Breakouts", desc: "Regulates sebum production without leaving skin tight or dry." },
            { title: "Clears Stubborn Blackheads", desc: "Deep cleans congested pores on the nose and forehead." },
            { title: "Soothes Razor Irritation", desc: "Anti-inflammatory botanical masks calm red, irritated beard zones." }
        ],
        stylesOrProcess: [
            { title: "Men's Charcoal Detox Facial", desc: "Pulls out atmospheric toxins and heavy metals from city pollution." },
            { title: "Men's Insta-Glow Detan", desc: "High-potency fruit enzymes that lift persistent sun tan in one sitting." },
            { title: "The Royal Groom Facial", desc: "Comprehensive multi-step treatment delivering bridal-ready skin radiance." }
        ],
        whyChooseKnk: [
            "Skincare protocols specially tailored to male skin biology",
            "Zero oily residue—leaves skin feeling fresh, matte, and energized",
            "Includes relaxing shoulder, neck, and scalp tension relief",
            "Private, comfortable grooming suites"
        ],
        relatedServices: [
            { title: "Men's Haircut & Styling", url: "/men-grooming/haircut" },
            { title: "Men's Hair Spa & Scalp Detox", url: "/men-grooming/hair-spa" },
            { title: "Hot Towel Shave", url: "/men-grooming/shaving" }
        ],
        faqs: [
            { q: "Can I get a facial if I have a beard?", a: "Yes! Our estheticians work around your beard, cleansing the visible upper cheeks, nose, forehead, and under-eye zones while conditioning your beard with nourishing oils." },
            { q: "How often should men get a facial?", a: "Once a month is ideal to keep pores clear and undo the effects of daily pollution and sun exposure." },
            { q: "Will my face look oily or shiny after the facial?", a: "No, our men's products are formulated to dry to a clean, matte, hydrated finish." }
        ]
    },

    "hair-spa-men": {
        slug: "hair-spa",
        categorySlug: "men-grooming",
        categoryName: "Men's Grooming",
        url: "/men-grooming/hair-spa",
        parentUrl: "/services/men-grooming",
        title: "Men's Hair Spa & Anti-Dandruff Scalp Detox in Lucknow | KNK Salon",
        h1: "Men's Hair Spa & Scalp Detox in Lucknow",
        eyebrow: "Follicle Revival",
        shortDesc: "Deep cleansing scalp scrub, root nourishment, ozone steam, and a 20-minute therapeutic head massage.",
        longDesc: "Combat hair thinning, chronic dandruff, and desk fatigue with KNK Salon's Men's Hair Spa. Designed to restore scalp micro-circulation and purge follicle buildup, our rituals combine tea tree and ginger scalp peels with warm ozone micro-mist steam and a vigorous 20-minute acupressure head massage.",
        image: "/assets/images/new/home/HAIRSPA.webp",
        suitableFor: "Men with dandruff, itchy scalp, early hair thinning, excess oiliness, or mental stress and fatigue.",
        whatIncluded: [
            "Digital scalp and root density assessment",
            "Exfoliating scalp peel dissolving hardened sebum and flaking",
            "Deep conditioning hair mask enriched with keratin and mint",
            "Ozone micro-steam opening pores for root nutrient uptake",
            "20-minute deep tissue head, neck, and upper back massage followed by wash"
        ],
        benefits: [
            { title: "Banish Dandruff & Flakes", desc: "Anti-fungal tea tree formulas stop itchy flakes from returning." },
            { title: "Stimulates Root Blood Flow", desc: "Acupressure massage boosts blood circulation to dormant follicles." },
            { title: "Relieves Stress & Migraines", desc: "Releases built-up tension in the neck, temples, and shoulders." },
            { title: "Strengthens Thinning Strands", desc: "Hydrolyzed proteins coat hair shafts to make hair look fuller." }
        ],
        stylesOrProcess: [
            { title: "Anti-Dandruff Scalp Scrub", desc: "Clarifies flakes, product buildup, and stubborn scalp oiliness." },
            { title: "Root Energizing Spa", desc: "Infused with caffeine and biotin to stimulate thinning hair follicles." },
            { title: "Stress Buster Oil Massage", desc: "Traditional warm herbal oil infusion paired with deep neck massage." }
        ],
        whyChooseKnk: [
            "Targeted solutions for male hair loss and dandruff concerns",
            "Trained therapists skilled in deep acupressure points",
            "Advanced ozone steamers that kill scalp bacteria",
            "Calm sanctuary offering genuine mental relaxation"
        ],
        relatedServices: [
            { title: "Men's Haircut & Styling", url: "/men-grooming/haircut" },
            { title: "Beard Sculpting & Trim", url: "/men-grooming/beard" },
            { title: "Men's Detan & Glow Facial", url: "/men-grooming/facial" }
        ],
        faqs: [
            { q: "Does a hair spa stop male pattern baldness?", a: "While a hair spa cannot rewrite genetics, it deep-cleanses DHT sebum buildup around follicles and boosts micro-circulation, dramatically slowing premature shedding." },
            { q: "How often should men take a hair spa?", a: "Every 3 to 4 weeks delivers continuous scalp health and prevents dandruff flare-ups." },
            { q: "Is a hair wash included in the session?", a: "Yes, the hair spa finishes with a purifying shampoo wash and cold water cuticle close." }
        ]
    },

    // ==========================================
    // AESTHETICS SERVICES (4)
    // ==========================================
    "microblading": {
        slug: "microblading",
        categorySlug: "aesthetic",
        categoryName: "Aesthetics",
        url: "/microblading",
        parentUrl: "/aesthetic",
        title: "Eyebrow Microblading in Lucknow | Semi-Permanent Brows | KNK Salon",
        h1: "Eyebrow Microblading in Lucknow",
        eyebrow: "Semi-Permanent Brow Artistry",
        shortDesc: "Featherlight hyper-realistic hair strokes filling sparse brows with natural, semi-permanent depth.",
        longDesc: "Wake up every morning with perfectly shaped, fuller eyebrows. Eyebrow Microblading at KNK Aesthetics is a semi-permanent cosmetic tattooing procedure that mimics individual brow hairs. Utilizing a manual handheld micro-blade, our certified brow artists deposit hypoallergenic medical-grade pigments into the upper dermis, restoring sparse, over-plucked, or asymmetrical eyebrows.",
        image: "/assets/images/new/aesthetics-adv.webp",
        suitableFor: "Anyone with thin, over-plucked, patchy, or asymmetrical brows, as well as those wanting effortless daily definition.",
        whatIncluded: [
            "Golden-ratio facial measurement and customized brow mapping",
            "Topical lidocaine numbing cream application for 25-30 minutes",
            "Hypoallergenic organic pigment color matching your natural brow hairs",
            "Precise manual hair-stroke micro-pigmentation",
            "Post-care soothing balm and detailed home healing protocol"
        ],
        benefits: [
            { title: "Hyper-Realistic Hair Strokes", desc: "Indistinguishable from natural brow hairs even upon close inspection." },
            { title: "12 to 24 Months Longevity", desc: "No need for pencils, powders, or pomades every single morning." },
            { title: "Waterproof & Sweatproof", desc: "Won't smudge at the gym, in the pool, or on humid summer days." },
            { title: "Customized Brow Mapping", desc: "Every brow is architected specifically to flatter your eye and bone structure." }
        ],
        stylesOrProcess: [
            { title: "Feather Microblading", desc: "Delicate individual hair strokes that blend seamlessly with sparse natural brows." },
            { title: "Microshading / Combo Brows", desc: "Combines hair strokes with soft powdered shading for fuller, bolder definition." },
            { title: "Touch-Up & Color Boost", desc: "Scheduled 4-6 weeks after the initial session to lock in healed pigment depth." }
        ],
        whyChooseKnk: [
            "Certified semi-permanent makeup artists with international accreditation",
            "100% disposable sterilized micro-blade cartridges opened before you",
            "US-FDA certified organic pigments that will not turn blue or orange over time",
            "Gentle topical numbing protocols ensuring virtually painless procedure"
        ],
        relatedServices: [
            { title: "Lip Blush Treatment", url: "/aesthetic/lip-blush" },
            { title: "Laser Skin Treatments", url: "/aesthetic/laser" },
            { title: "Precision Threading", url: "/services/beauty/threading" }
        ],
        faqs: [
            { q: "Does microblading hurt?", a: "We apply a strong medical-grade topical anesthetic cream for 30 minutes before starting, and reapply during the process. Most clients feel only a light scratching sensation rather than pain." },
            { q: "How long does microblading last?", a: "Results typically last 12 to 24 months depending on your skin type (dry skin holds pigment longer than oily skin). An annual touch-up keeps the strokes crisp." },
            { q: "How long does the healing process take?", a: "Surface healing takes about 7 to 10 days. The color will appear slightly darker for the first 3 days, soften as light flaking occurs, and reveal the true natural tone by week 4." }
        ]
    },

    "lip-blush": {
        slug: "lip-blush",
        categorySlug: "aesthetic",
        categoryName: "Aesthetics",
        url: "/aesthetic/lip-blush",
        parentUrl: "/aesthetic",
        title: "Semi-Permanent Lip Blush in Lucknow | Natural Tinted Lips | KNK Salon",
        h1: "Lip Blush Treatment in Lucknow",
        eyebrow: "Lip Micro-Pigmentation",
        shortDesc: "Subtle translucent pigment wash enhancing natural lip contour, symmetry, and youthful rosy tone.",
        longDesc: "Restore youthful color, definition, and symmetry to your lips with Lip Blush at KNK Aesthetics. Unlike harsh old-fashioned lip tattoos, modern lip blush deposits a sheer, watercolor-like pixelated wash of organic pigment into the lip tissue. It corrects hyperpigmentation, defines fading borders, and leaves lips looking naturally flushed, plump, and tinted.",
        image: "/assets/images/new/aesthetics-adv.webp",
        suitableFor: "Pale, dark, or smoker-hyperpigmented lips, uneven lip borders, or anyone wanting tinted balm-like lips 24/7.",
        whatIncluded: [
            "Lip shape contour analysis and shade selection (peach, rose, nude, cherry)",
            "Topical anesthetic cream application to ensure comfortable treatment",
            "Gentle pixelated micro-pigmentation using a motorized cosmetic pen",
            "Cooling soothing compress to minimize initial swelling",
            "Nourishing healing lip balm and aftercare kit"
        ],
        benefits: [
            { title: "Corrects Lip Hyperpigmentation", desc: "Neutralizes dark purplish tones with warm corrective peach pigments." },
            { title: "Enhanced Lip Contour & Symmetry", desc: "Creates the optical illusion of fuller, symmetrical lips without dermal fillers." },
            { title: "2 to 3 Years Longevity", desc: "Enjoy wake-up-ready lips that never smudge on cups, masks, or napkins." },
            { title: "Natural Watercolor Finish", desc: "Subtle tinted balm appearance rather than an artificial lipstick look." }
        ],
        stylesOrProcess: [
            { title: "Dark Lip Neutralization", desc: "Specialized warm pigment wash designed to lighten melanin-rich lips." },
            { title: "Soft Rose Watercolor Blush", desc: "Subtle natural pink wash that gives an everyday fresh, youthful tint." },
            { title: "Defined Velvet Tint", desc: "Denser saturation for clients desiring bolder color visibility." }
        ],
        whyChooseKnk: [
            "Certified semi-permanent lip pigmentation specialists",
            "High-grade vegan organic pigments that age gracefully",
            "Hygienic single-use needle cartridges",
            "Proven track record in successful dark lip neutralization"
        ],
        relatedServices: [
            { title: "Eyebrow Microblading", url: "/aesthetic/microblading" },
            { title: "Laser Skin Treatments", url: "/aesthetic/laser" },
            { title: "Signature Facials", url: "/services/beauty/facial" }
        ],
        faqs: [
            { q: "Is lip blush the same as a lip tattoo?", a: "No. Old lip tattoos used heavy synthetic inks deep in the skin that turned blue or violet. Lip blush uses organic pigments deposited lightly into the upper dermis, creating a soft, translucent watercolor blush that fades naturally over 2-3 years." },
            { q: "Can lip blush fix dark or uneven lips?", a: "Yes! Dark lip neutralization is one of our most popular aesthetic treatments. We use corrective warm orange and peach tones to neutralize melanin before adding your desired pink or nude tint." },
            { q: "How long is the recovery time?", a: "Mild swelling lasts 24 to 48 hours. Light chapping occurs around days 3 to 5. By day 7, lips are completely healed, revealing a beautiful, subtle tint." }
        ]
    },

    "laser": {
        slug: "laser",
        categorySlug: "aesthetic",
        categoryName: "Aesthetics",
        url: "/laser-treatment",
        parentUrl: "/aesthetic",
        title: "Laser Skin Rejuvenation & Treatments in Lucknow | KNK Salon",
        h1: "Laser Skin Treatments in Lucknow",
        eyebrow: "Advanced Phototherapy",
        shortDesc: "Advanced non-ablative laser technology targeting dark spots, sun tanning, fine lines, and uneven tone.",
        longDesc: "Reveal clear, rejuvenated skin with state-of-the-art Laser Skin Treatments at KNK Aesthetics. Utilizing non-ablative laser wavelengths and Q-switched phototherapy, our clinical treatments target melanin clusters, sun-induced pigmentation, enlarged pores, and active acne marks without damaging the surrounding skin tissue.",
        image: "/assets/images/new/aesthetics.webp",
        suitableFor: "Stubborn sun spots, melasma, post-acne marks, rough skin texture, fine lines, and uneven skin tone.",
        whatIncluded: [
            "Clinical skin phototype analysis and sensitivity patch test",
            "Double cleanse and protective eyewear placement",
            "Laser energy calibration to your specific skin depth and pigment level",
            "Gentle pulse treatment across targeted zones",
            "Post-laser cooling mask, restorative serum, and broad-spectrum SPF 50"
        ],
        benefits: [
            { title: "Destroys Deep Melanin Clusters", desc: "Shatters stubborn pigmentation into micro-particles that your body clears naturally." },
            { title: "Stimulates Deep Collagen", desc: "Gentle thermal energy awakens collagen production for firmer, smoother skin." },
            { title: "Zero Downtime", desc: "Non-ablative treatments allow you to resume work and daily routine immediately." },
            { title: "Refines Enlarged Pores", desc: "Shrinks open pores and tightens skin texture for a glass-like finish." }
        ],
        stylesOrProcess: [
            { title: "Carbon Laser Peel (Hollywood Peel)", desc: "Liquid carbon lotion zapped with laser to deeply clear pores and instantly brighten skin." },
            { title: "Laser Toning for Pigmentation", desc: "Targeted pulses that progressively dissolve sun spots, freckles, and melasma." },
            { title: "Laser Skin Rejuvenation", desc: "Diffused laser passes that stimulate fibroblasts to smooth fine lines." }
        ],
        whyChooseKnk: [
            "US-FDA approved laser technology calibrated for Indian skin tones",
            "Certified laser technicians with clinical supervision",
            "Strict eye safety protocols and sanitized handpieces",
            "Visible, progressive improvements without harsh skin peeling"
        ],
        relatedServices: [
            { title: "Advanced Skin Rejuvenation", url: "/aesthetic/skin-treatments" },
            { title: "Eyebrow Microblading", url: "/aesthetic/microblading" },
            { title: "Signature Facials", url: "/services/beauty/facial" }
        ],
        faqs: [
            { q: "Is laser treatment safe for brown or Indian skin tones?", a: "Yes. We use specialized Nd:YAG laser wavelengths specifically calibrated for Indian skin types, ensuring safe pigment breakdown without risk of post-inflammatory hyperpigmentation." },
            { q: "Does the laser treatment hurt?", a: "Most clients feel only a mild warm tingling sensation similar to the snap of a tiny rubber band. No numbing cream is typically required." },
            { q: "How many sessions will I need?", a: "For noticeable, lasting results with pigmentation or skin toning, a series of 3 to 6 sessions spaced 3-4 weeks apart is generally recommended." }
        ]
    },

    "skin-treatments": {
        slug: "skin-treatments",
        categorySlug: "aesthetic",
        categoryName: "Aesthetics",
        url: "/aesthetic/skin-treatments",
        parentUrl: "/aesthetic",
        title: "Clinical Skin Treatments & Rejuvenation in Lucknow | KNK Salon",
        h1: "Advanced Skin Rejuvenation in Lucknow",
        eyebrow: "Dermatological Wellness",
        shortDesc: "Targeted clinical treatments for stubborn pigmentation, active acne scars, open pores, and dull complexion.",
        longDesc: "When everyday salon facials are not enough, KNK Advanced Skin Treatments provide clinical-grade solutions. Incorporating mild chemical peels, micro-needling collagen induction, peptide infusions, and cryo-therapy, our estheticians design comprehensive treatment programs that repair deep sun damage, smooth acne scars, and restore your skin barrier.",
        image: "/assets/images/new/aesthetics.webp",
        suitableFor: "Acne scarring, textural roughness, melasma, persistent dullness, and early signs of skin aging.",
        whatIncluded: [
            "Digital skin analysis evaluating sebum, hydration, and UV damage",
            "Clinical preparation and gentle medical-grade degreasing wash",
            "Application of targeted treatment (dermal peel, microneedling, or serum infusion)",
            "Cryo-cooling calming mask and peptide barrier repair cream",
            "Detailed home care instruction and customized sun protection regimen"
        ],
        benefits: [
            { title: "Accelerates Cellular Turnover", desc: "Sweeps away damaged surface cells to reveal radiant, brand-new skin." },
            { title: "Smoothes Textural Irregularities", desc: "Stimulates collagen to fill shallow acne scarring and shrink open pores." },
            { title: "Strengthens Skin Barrier", desc: "Infuses ceramides and antioxidants that shield against future damage." },
            { title: "Tailored to Your Biology", desc: "No one-size-fits-all treatments—every protocol is custom-calibrated." }
        ],
        stylesOrProcess: [
            { title: "Clinical Chemical Peels", desc: "Glycolic, salicylic, and lactic peels calibrated to exfoliate with zero harsh flaking." },
            { title: "Micro-Needling Collagen Induction", desc: "Creates micro-channels that stimulate natural elastin and collagen synthesis." },
            { title: "O2 Oxygen Infusion Therapy", desc: "Pressurized hyperbaric oxygen drives hyaluronic acid deep into the dermis." }
        ],
        whyChooseKnk: [
            "Trained clinical cosmetologists adhering to medical sanitation protocols",
            "High-grade dermatological formulations with proven clinical efficacy",
            "Non-invasive protocols that avoid prolonged redness or social downtime",
            "Personalized pre-treatment and post-care follow-up support"
        ],
        relatedServices: [
            { title: "Laser Skin Treatments", url: "/aesthetic/laser" },
            { title: "Signature Facials", url: "/services/beauty/facial" },
            { title: "Lip Blush Treatment", url: "/aesthetic/lip-blush" }
        ],
        faqs: [
            { q: "Will chemical peels cause visible sheets of skin to peel off?", a: "No! We use advanced progressive superficial to medium peels that exfoliate microscopically without the scary peeling or redness of outdated formulas." },
            { q: "Is microneedling safe?", a: "Yes, microneedling is performed using sterile single-use cartridge needles and topical numbing cream. It triggers your body's natural wound-healing response to naturally generate collagen." },
            { q: "When will I see results from skin rejuvenation treatments?", a: "Clients notice a brighter, smoother complexion within 5 to 7 days, with cumulative collagen improvements continuing to build over the following 3 to 6 months." }
        ]
    }
};

// Helper lookup functions
export function getCategoryBySlug(slug) {
    if (!slug) return null;
    const clean = slug.toLowerCase().trim();
    if (clean === "nails" || clean === "nail-art") {
        return SERVICE_CATEGORIES.find(c => c.slug === "nails");
    }
    if (clean === "men-grooming" || clean === "men") {
        return SERVICE_CATEGORIES.find(c => c.slug === "men-grooming");
    }
    if (clean === "aesthetic" || clean === "aesthetics") {
        return SERVICE_CATEGORIES.find(c => c.slug === "aesthetic");
    }
    return SERVICE_CATEGORIES.find(c => c.slug === clean) || null;
}

export function getServiceBySlug(slug, categorySlug = null) {
    if (!slug) return null;
    const clean = slug.toLowerCase().trim();

    // Direct match
    if (INDIVIDUAL_SERVICES[clean]) {
        // If categorySlug provided, verify match or check category-specific overrides
        if (categorySlug) {
            const catClean = categorySlug.toLowerCase().trim();
            if (catClean === "men-grooming" && INDIVIDUAL_SERVICES[`${clean}-men`]) {
                return INDIVIDUAL_SERVICES[`${clean}-men`];
            }
        }
        return INDIVIDUAL_SERVICES[clean];
    }

    // Check with category suffix if men-grooming (e.g., haircut-men, facial-men, hair-spa-men)
    if (categorySlug === "men-grooming" && INDIVIDUAL_SERVICES[`${clean}-men`]) {
        return INDIVIDUAL_SERVICES[`${clean}-men`];
    }

    // Try finding by slug property across all services
    const values = Object.values(INDIVIDUAL_SERVICES);
    const match = values.find(s => s.slug === clean && (!categorySlug || s.categorySlug === categorySlug));
    if (match) return match;

    return null;
}
