/* ---------- Shared style tokens ---------- */

export const INK = "#29231f";
export const MUTED = "#71665c";
export const GOLD = "#b58a52";
export const GOLD_DEEP = "#a17b5a";
export const LINE = "#d0bda4";
export const CREAM_DEEP = "#f4eee1";
export const DARK = "#241d18";

/* ---------- Data (real content/images from knksalon.in academy pages) ---------- */

export const whyAcademyImage = "/assets/images/academy/about1.webp";
export const reelVideo = "/assets/videos/reel-content.webm";
export const mentorsImage = "/assets/images/about/experts.webp";
export const academyTrainingImage = "/assets/images/about/academy-training.webp";
export const bridalArtImage = "/assets/images/about/bridal-makeup.webp";
export const hairStylingImage = "/assets/images/about/hair-styling.webp";

export const whyAcademyPoints = [
    "Globally trained experts with experience across the US, UK, Russia and more",
    "A curriculum that goes beyond makeup application — built on the belief that great skincare is the foundation of glowing beauty",
    "Backstage access to work with leading brands, celebrities, models and photographers",
    "A one-month internship with the academy's expert team, working alongside professional makeup artists",
    "Salon management training to build your business acumen and start-up skills",
    "IAF-certified training, recognised globally across the beauty industry",
];

export const stats = [
    { value: "15+", label: "Years of Legacy", detail: "Shaping India's finest artists" },
    { value: "1000+", label: "Students Trained", detail: "Placed in salons & bridal studios" },
    { value: "10", label: "Specialised Courses", detail: "Beginner to Master Diploma" },
    { value: "IAF", label: "Certified Academy", detail: "Global recognition in 80+ nations" },
];

export const mentors = [
    {
        name: "Poonam Ranjan Chowdhary",
        role: "Founder & Lead Mentor",
        title: "Master Cosmetologist & Bridal Icon",
        credentials: "20+ Years Artistry • International Certifications",
        bio: "An internationally certified bridal makeup expert and cosmetologist, Poonam has spent years shaping Lucknow's makeup and hairstyling trends and personally mentors every batch at KNK Academy.",
    },
    {
        name: "Ishitta Chowdhary",
        role: "Co-Founder & Creative Director",
        title: "Runway & Backstage MUA",
        credentials: "Milan & Paris Fashion Week Backstage Experience",
        bio: "A bridal MUA and backstage artist with international fashion-week experience, Ishitta leads the academy's creative and fashion makeup modules, bringing runway-level technique into the classroom.",
    },
];

export const enrollSteps = [
    {
        title: "Book a Consultation",
        text: "Call, WhatsApp or fill the form below and our academy counsellor will help you shortlist the right course.",
    },
    {
        title: "Visit & Choose Your Course",
        text: "Tour the studio, meet the mentors and lock in your course, batch timing and kit.",
    },
    {
        title: "Start Learning",
        text: "Attend hands-on classes covering theory, live demos and guided practice from day one.",
    },
    {
        title: "Get Certified & Placed",
        text: "Finish with a portfolio shoot, IAF certification and support finding your first opportunities.",
    },
];

export const curriculum = [
    {
        title: "Essential Basics",
        items: [
            "Skin care and hygiene",
            "Brush types and uses",
            "Tools and accessories",
            "Product knowledge and setting up",
            "Prepping your artist / client / model",
            "Basic facial anatomy",
            "Intro to creative journal keeping",
            "Intro to the world of beauty",
        ],
    },
    {
        title: "Getting Technical",
        items: [
            "Corrective makeup",
            "Natural / neutral makeup",
            "False lash application",
            "Photography and film makeup",
            "Tanning effects",
            "Male grooming",
            "Product mixing techniques",
            "Eyebrow proportions",
        ],
    },
    {
        title: "Art Into Makeup",
        items: [
            "Working with face charts",
            "Glamour / beauty makeup",
            "Catwalk / theatre makeup",
            "Fashion / editorial makeup",
            "Period makeup",
            "Bridal makeup design — traditional to contemporary",
        ],
    },
];

/* Every course now carries a `category` — this is what groups them
   under the sidebar tabs in the Courses section (Makeup Course,
   Self Grooming Course, Diploma, etc). Category names match courseOptions. */
export const courses = [
    // 1. 1 Month Makeup Artist Course
    {
        title: "1 Month Makeup Artist Course",
        category: "Makeup Course",
        duration: "1 Month",
        originalPrice: "₹1,20,000",
        offerPrice: "₹89,999",
        kit: null,
        points: [
            "Skin care and hygiene theory",
            "Product knowledge and vanity setup",
            "Color wheel and tone matching theory",
            "3 party and occasion makeup looks",
            "Trending bridal makeup looks",
            "Men and groom makeup techniques",
            "Airbrush makeup demo and fundamentals",
            "Live evaluation, portfolio shoot and IAF certification",
        ],
    },

    // 2. 2 Month Pro Makeup Artist Course
    {
        title: "2 Month Pro Makeup Artist Course",
        category: "Makeup Course",
        duration: "2 Months",
        originalPrice: "₹1,70,000",
        offerPrice: "₹1,30,000",
        kit: "Makeup Kit Included",
        points: [
            "Advanced color correction and base blending",
            "5+ bridal signatures (Awadhi, Contemporary, Royal)",
            "Reception, cocktail and red carpet glam looks",
            "High-definition (HD) and camera-ready makeup",
            "Airbrush theory, operation and practicals",
            "Complimentary Professional Makeup Kit",
            "Haldi, Mehndi and groom grooming",
            "Client consultation, vanity setup and IAF certification",
        ],
    },

    // 3. 3 Months Complete Makeup Artistry Course
    {
        title: "3 Months Complete Makeup Artistry Course",
        category: "Makeup Course",
        duration: "3 Months",
        originalPrice: "₹2,00,000",
        offerPrice: "₹1,50,000",
        kit: "Makeup & Hair Kit Included",
        featured: true,
        sections: [
            {
                title: "Advanced Bridal & Airbrush",
                items: [
                    "Complete basic to high-fashion bridal makeup",
                    "Airbrush machine mastering and flawless HD base",
                    "High end fashion, runway and creative editorial looks",
                    "Groom grooming and multi-cultural bridal styles",
                ],
            },
            {
                title: "Hairstyling & Draping",
                items: [
                    "Basic to advanced bridal and engagement hairdos",
                    "Hair volumizing, crimping and thermal styling",
                    "Professional saree and dupatta draping (Sabyasachi, Nivi, Gujarati)",
                    "Hair extension, jewelry and flower placement",
                ],
            },
            {
                title: "Kits & Career Growth",
                items: [
                    "Complimentary Professional Makeup & Hair Kit",
                    "Social media marketing and bridal booking strategy",
                    "Portfolio building and live shoot with Ishitta Chowdhary",
                    "IAF globally recognized certification and placement support",
                ],
            },
        ],
    },

    // 4. Pro Diploma Salon Owner Course
    {
        title: "Pro Diploma Salon Owner Course",
        category: "Diploma",
        duration: "8 Months",
        originalPrice: "₹3,50,000",
        offerPrice: "₹3,00,000",
        kit: "Makeup, Hair, Skin & Nail Kit Included",
        featured: true,
        sections: [
            {
                title: "All 4-Discipline Artistry",
                items: [
                    "Complete professional makeup and airbrush masterclass",
                    "Advanced hair designing, cutting, coloring and chemical treatments",
                    "Clinical and aesthetic cosmetology and skin therapies",
                    "Full nail extension and 3D nail artistry diploma",
                ],
            },
            {
                title: "Salon Entrepreneurship & Business",
                items: [
                    "Salon startup blueprint: licensing, equipment and vendor sourcing",
                    "Team recruitment, staff training and commission structures",
                    "Client consultation psychology and premium pricing strategy",
                    "Digital marketing, local SEO and bridal booking funnels",
                ],
            },
            {
                title: "Kits & Guaranteed Internship",
                items: [
                    "All 4 Kits Included (Makeup, Hair, Skin & Nail Kit)",
                    "Guaranteed 1-month hands-on internship at KNK Luxury Salon",
                    "Celebrity and runway bridal portfolio building",
                    "IAF Master Diploma with global accreditation in 80+ nations",
                ],
            },
        ],
    },

    // 5. Diploma in Cosmetology
    {
        title: "Diploma in Cosmetology",
        category: "Diploma",
        duration: "6 Months",
        originalPrice: "₹3,00,000",
        offerPrice: "₹2,50,000",
        kit: "Makeup, Hair, Skin & Nail Kit Included",
        sections: [
            {
                title: "Aesthetic Skin & Cosmetology",
                items: [
                    "Skin anatomy, physiology and diagnostic analysis",
                    "Electrotherapy facials (Galvanic, High Frequency, Ultrasonic)",
                    "Chemical peels, pigmentation and anti-aging treatments",
                    "Body polishing, spa therapies and hygiene protocols",
                ],
            },
            {
                title: "Hair & Nail Architecture",
                items: [
                    "Hair cutting, thermal styling and blow drying techniques",
                    "Hair chemical treatments: Keratin, Smoothening and Botoplex",
                    "Nail structure, gel extensions and acrylic overlays",
                    "Professional nail art, shaping and refills",
                ],
            },
            {
                title: "Makeup Artistry & Inclusions",
                items: [
                    "Complete professional makeup and bridal looks",
                    "All 4 Kits Included (Makeup, Hair, Skin & Nail Kit)",
                    "Live client consultations and practical evaluations",
                    "IAF recognized cosmetology diploma and placement support",
                ],
            },
        ],
    },

    // 6. Advance Nail Technician Course
    {
        title: "Advance Nail Technician Course",
        category: "Nail Extension Course",
        duration: "1 Month",
        originalPrice: "₹50,000",
        offerPrice: "₹35,000",
        kit: "Nail Kit Included",
        points: [
            "Nail anatomy, nail health and sanitization protocols",
            "Gel extensions with tip and form applications",
            "Acrylic nail extensions with liquid and powder bead control",
            "Overlay, refill and safe nail removal procedures",
            "Trending nail art: Ombre, Chrome, Marble and French tips",
            "3D nail art, foil, glitters and stone embellishments",
            "Electric drill machine techniques and cuticle maintenance",
            "Complimentary Professional Nail Kit and IAF certification",
        ],
    },

    // 7. 1 Month Professional Hair Technician Course
    {
        title: "1 Month Professional Hair Technician Course",
        category: "Hair Technician Course",
        duration: "1 Month",
        originalPrice: "₹1,00,000",
        offerPrice: "₹75,000",
        kit: null,
        points: [
            "Hair science, scalp diagnosis and trichology basics",
            "Professional detangling, sectioning and shampooing",
            "Thermal styling: Blow-dry types, flat ironing and crimping",
            "Classic haircutting techniques and perimeter styling",
            "Hair spa, deep conditioning and scalp treatments",
            "Basic hair coloring, root touchups and grey coverage",
            "Tool maintenance, safety and salon ergonomics",
            "Live model practicals, examination and IAF certification",
        ],
    },

    // 8. Pro Advance Hair Technician Course
    {
        title: "Pro Advance Hair Technician Course",
        category: "Hair Technician Course",
        duration: "2 Months",
        originalPrice: "₹1,30,000",
        offerPrice: "₹99,000",
        kit: "Hairtech Kit Included",
        points: [
            "Advanced hair chemicals: Keratin, Botoplex and Nanoplastia",
            "Permanent hair straightening, rebonding and smoothening",
            "Creative hair coloring: Balayage, Ombre, Highlights and Global colour",
            "Precision advanced haircutting, layers and texture sculpting",
            "Bridal updos, Pakistani bridal hairdos and textured buns",
            "Hair extension fixing, flower setting and accessories styling",
            "Complimentary Professional Hairtech Kit",
            "Live client simulation, portfolio shoot and IAF certification",
        ],
    },

    // 9. 1 Month Beautician Course
    {
        title: "1 Month Beautician Course",
        category: "Beautician Course",
        duration: "1 Month",
        originalPrice: "₹75,000",
        offerPrice: "₹50,000",
        kit: "Skin Kit Included",
        points: [
            "Skin types, CTM routine and skin preparation",
            "Eyebrow shaping, threading and facial waxing",
            "Face clean-ups, de-tan treatments and bleaching methods",
            "Classic and fruit facials with facial massage strokes",
            "Manicure and pedicure procedures and hygiene",
            "Basic body waxing (honey wax, Rica wax) and polishing",
            "Complimentary Professional Skin Kit",
            "Client handling, salon hygiene and IAF certification",
        ],
    },

    // 10. Advance Cosmetology Course
    {
        title: "Advance Cosmetology Course",
        category: "Cosmetology & Skin",
        duration: "55 Days",
        originalPrice: "₹1,00,000",
        offerPrice: "₹75,000",
        kit: "Skin Kit Included",
        points: [
            "Clinical skin analysis and common dermatological conditions",
            "Aesthetic electrotherapy: High Frequency, Galvanic & Ultrasonic",
            "Hydra facial treatment procedures and vacuum suction",
            "Cosmeceutical chemical peels for acne and pigmentation",
            "Anti-aging lifting treatments and collagen stimulation",
            "Advanced de-tan, organic peelings and brightening therapies",
            "Complimentary Professional Skin Kit",
            "Live client clinical cases, exam and IAF certification",
        ],
    },
];

export const galleryImages = [
    "/assets/images/academy/gallery-1.webp",
    "/assets/images/academy/gallery-2.webp",
    "/assets/images/academy/gallery-3.webp",
    "/assets/images/academy/gallery-4.webp",
    "/assets/images/academy/gallery-5.webp",
    "/assets/images/academy/gallery-6.webp",
];

export const wallOfFameImages = [
    "/assets/images/academy/wall-of-fame-1.webp",
    "/assets/images/academy/wall-of-fame-2.webp",
    "/assets/images/academy/wall-of-fame-3.webp",
    "/assets/images/academy/wall-of-fame-4.webp",
    "/assets/images/academy/wall-of-fame-5.webp",
    "/assets/images/academy/wall-of-fame-6.webp",
];

// Sample placeholders — swap in real graduate reviews when available.
export const testimonials = [
    { name: "Academy Graduate", course: "Pro Makeup Course, 3 Months", text: "The hands-on classes and one-on-one attention gave me the confidence to start taking bridal clients right after certification." },
    { name: "Academy Graduate", course: "Airbrush Makeup Course", text: "Learning directly from Poonam and Ishitta ma'am on airbrush technique made all the difference — I now use it for every bridal booking." },
    { name: "Academy Graduate", course: "Professional Draping Course", text: "The draping module alone was worth the course — I get booked for saree draping at weddings every season now." },
];

export const faqs = [
    {
        q: "Do I need prior makeup experience to enroll?",
        a: "No. Our Essential Basics module is designed for complete beginners, so most courses start from the ground up before moving into technical and advanced work.",
    },
    {
        q: "Is a makeup kit included in the course fee?",
        a: "Select courses like the Pro Makeup Course (3 Months) include a complimentary makeup kit. Ask your counsellor which courses include kits when you enquire.",
    },
    {
        q: "Will I get a certificate after completing the course?",
        a: "Yes, graduates receive an IAF-recognised certification, along with a portfolio shoot to showcase your work.",
    },
    {
        q: "Do you help with placements or internships?",
        a: "Students can take up a one-month internship with our expert team, and we support portfolio building and industry connections after graduation.",
    },
];

export const courseOptions = [
    "Makeup Course",
    "Diploma",
    "Hair Technician Course",
    "Nail Extension Course",
    "Beautician Course",
    "Cosmetology & Skin",
];