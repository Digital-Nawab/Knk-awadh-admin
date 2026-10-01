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
    { value: "12", label: "Specialised Courses", detail: "Beginner to Master Diploma" },
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
    // ---------- Makeup Course ----------
    {
        title: "Pro Makeup Course",
        category: "Makeup Course",
        duration: "1 Month",
        points: [
            "Product knowledge", "Colour wheel", "3 party makeup looks",
            "3 trending bridal makeup looks", "Men/groom makeup",
            "Airbrush makeup", "High end fashion MU", "Haldi/Mehndi MU",
        ],
    },
    {
        title: "Pro Makeup Courses",
        category: "Makeup Course",
        duration: "3 Months",
        points: [
            "Product knowledge", "Free makeup kit", "Basic to advanced makeup",
            "Basic to advanced hairstyling", "Men/groom makeup", "Airbrush makeup",
            "Ramp/model makeup", "High end fashion", "Social media marketing",
            "Professional draping",
        ],
    },
    {
        title: "Fast Track Makeup Course",
        category: "Makeup Course",
        duration: "1 Month",
        points: [
            "Skin care and hygiene theory", "Product knowledge", "Brush theory and maintenance",
            "Day makeup look", "Party makeup look", "Engagement makeup look",
            "Contemporary bride makeup", "Traditional bridal makeup", "Glam cocktail makeup",
            "Examination", "Portfolio shoot", "Certification",
        ],
    },
    {
        title: "Professional Makeup Artist Course",
        category: "Makeup Course",
        duration: "3 Months",
        featured: true,
        sections: [
            {
                title: "Fundamentals",
                items: [
                    "Introduction to becoming a professional makeup artist",
                    "Kit distribution & product knowledge", "Theory of skin",
                    "History of makeup", "Colour theory for makeup artists",
                ],
            },
            {
                title: "Demo & Practice",
                items: [
                    "Basic to advanced makeups", "Basic to advanced hairdos",
                    "Groom/male model makeup", "Airbrush theory and practical",
                    "Basic to advanced professional draping",
                ],
            },
            {
                title: "Career Prep",
                items: ["Social media marketing", "Portfolio building with Ishitta Chowdhary"],
            },
        ],
    },
    {
        title: "Pro Course — Industry Based",
        category: "Makeup Course",
        duration: "4 Months",
        sections: [
            {
                title: "Basic to Advance Bridal Makeup",
                items: [
                    "Skin care & hygiene theory", "Colour wheel theory", "Day self makeup",
                    "Base theory", "Base application", "Evening party look", "Brush theory",
                    "Face chart", "Engagement look", "Face, eyebrow, lip shapes", "Face contour",
                    "Types of eyeliners", "Traditional bride look", "Contemporary bride look",
                    "Arabic bride look", "Airbrush theory", "Airbrush makeup",
                ],
            },
            {
                title: "Fashion & Creative Makeup",
                items: [
                    "Introduction to the fashion industry", "Industry etiquette", "History of makeup",
                    "Types of fashion & creative makeup", "Working backstage for international fashion weeks",
                    "Understanding catwalk, makeup trends & backstage etiquette", "Graphic eyeliners",
                    "Makeup for prints", "Decade makeup", "Trending fashion makeup looks",
                    "Runway & catwalk makeup", "Makeup for photoshoot", "Portfolio shoots", "Assessment",
                ],
            },
            {
                title: "Basic to Advance Hair Styling",
                items: [
                    "Detangling & sectioning", "Theory of hair volumizing", "Types of blow dryer",
                    "Types of hairstyles", "Advance engagement hairdo", "Advance bridal hairdo",
                    "Pakistani bridal hairdo", "Different fronts according to face shapes",
                    "Hair extensions/hair accessories application",
                ],
            },
            {
                title: "Professional Draping",
                items: ["Casual saree draping", "Different styles of draping"],
            },
        ],
    },

    // ---------- Self Grooming Course ----------
    {
        title: "Self Grooming Course",
        category: "Self Grooming Course",
        duration: "15 Days",
        points: [
            "Guidelines on health, safety and hygiene", "Skin primers", "Skin theory and skincare",
            "Foundations and concealer application", "Highlighting and contouring", "Eyelash application",
            "Eyebrow definition and grooming", "Strip eyelash application", "Blusher techniques",
            "Eyeliners & mascara application", "Day makeup look", "Evening party makeup look",
            "Smokey eyes makeup",
        ],
    },

    // ---------- Diploma ----------
    {
        title: "Diploma in Skin Cosmetology",
        category: "Diploma",
        duration: "6 Months",
        points: [
            "Skin texture & function", "Latest product knowledge", "Clean up & facial techniques",
            "Use of different bleach & D-tan", "Manicures", "Pedicures", "Wax — face/body/B-wax",
            "Homecare & recommendations", "Complete professional makeup course",
            "Nail extension course & more",
        ],
    },
    {
        title: "Diploma Course",
        category: "Diploma",
        duration: "6 Months",
        sections: [
            {
                title: "Course Includes",
                items: [
                    "4 month industry based course", "Nail technician course",
                    "Advanced cosmetology course", "2 months internship provided",
                ],
            },
            {
                title: "After Care Program",
                items: [
                    "Internship", "Portfolio building", "Client interaction & dealing",
                    "Workshops", "Model shoots", "Celebrity shoots",
                ],
            },
            {
                title: "Student Work",
                items: [
                    "Glam party makeup looks", "Bridal makeup looks",
                    "Fashion makeup looks", "Creative makeup looks",
                ],
            },
            {
                title: "Milestones",
                items: ["Examination", "Graduation day", "Internship", "Jobs"],
            },
        ],
    },

    // ---------- Fashion & Photography Course ----------
    {
        title: "Fashion & Photography Course",
        category: "Fashion & Photography Course",
        duration: "10 Days",
        points: [
            "Editorial makeup & shoot", "Haute couture & shoot", "Working with models",
            "Clothing shoot", "Jewellery shoot", "Bridal & party makeup shoots",
        ],
    },

    // ---------- Airbrush Makeup Course ----------
    {
        title: "Airbrush Makeup Course",
        category: "Airbrush Makeup Course",
        duration: "1 Week",
        points: [
            "Difference between airbrush & normal makeup", "Airbrush machine & its operation",
            "Base with airbrush", "Blusher & contour with airbrush", "How to set airbrush MU",
            "Cleaning & maintaining of AB gun",
        ],
    },

    // ---------- Hair Technician Course ----------
    {
        title: "Hair Technician Course",
        category: "Hair Technician Course",
        duration: "3 Months",
        sections: [
            {
                title: "Core Curriculum",
                items: [
                    "Detangling & sectioning", "Introduction of tools", "Theory of hair volumizing",
                    "Types of blow dryer", "Ironing", "Crimping", "Types of braids", "Types of ponys",
                    "Types of buns", "Advance engagement hairdo", "Advance bridal hairdo",
                    "Pakistani bridal hairdo", "Hair extensions/hair accessories application",
                    "Different fronts according to face shapes", "Professional dryer & ironing",
                    "Complimentary hair kit", "Portfolio building",
                ],
            },
            {
                title: "Other Crucial Skills",
                items: [
                    "Client counselling", "Jewelry setting", "Flower setting",
                    "Hair accessories application", "Hair extension application",
                ],
            },
        ],
    },

    // ---------- Nail Extension Course ----------
    {
        title: "Nail Extension Course",
        category: "Nail Extension Course",
        duration: "15 Days",
        points: [
            "Nail structure, function & hygiene", "Gel extensions", "Acrylic extensions", "Refill",
            "Overlay", "French nails", "Nail art — 10 types", "Use of drill machine",
            "Different nail shapes", "3D nail art",
        ],
    },
    {
        title: "Nail Technician Course",
        category: "Nail Extension Course",
        duration: "1 Month",
        sections: [
            {
                title: "Core Curriculum",
                items: [
                    "Nail theory & hygiene", "Product knowledge", "Nail cleaning & correction",
                    "Types of nail shapes", "Gel polish application", "Temporary nail tip application",
                    "Gel tip extension", "Over layer gel application", "Acrylic gel extension",
                    "Gel removal", "2D nail art", "3D nail art", "Nail accessories application",
                    "Refill", "Use of drill machine",
                ],
            },
            {
                title: "Types of Nail Art",
                items: ["Ombre nail art", "Chrome nail art", "Marble nail art", "French nail art", "Cat eye nail art"],
            },
        ],
    },

    // ---------- Self Drapping Course ----------
    {
        title: "Self Drapping Course",
        category: "Self Drapping Course",
        duration: "1 Week",
        points: [
            "Casual saree draping", "Nivi draping/sidha palla", "Gujrati draping/ulta palla",
            "Indo-western dupatta draping", "Sabhyasachi dupatta draping",
        ],
    },
    {
        title: "Self Hairstyling Course",
        category: "Self Drapping Course",
        duration: "10 Days",
        points: [
            "Detangling & sectioning", "Introduction of tools", "Hair volumizing", "Ironing",
            "Soft curls", "Crimping", "Waterfall", "French braid", "Dutch braid",
            "Simple bun", "Messy bun",
        ],
    },

    // ---------- Professional Drapping Course ----------
    {
        title: "Professional Drapping",
        category: "Professional Drapping Course",
        duration: "10 Days",
        points: [
            "Casual saree draping", "Nivi draping/siddha palla", "Gujrati draping/ulta palla",
            "Bengali draping", "Marathi draping/Navsaree draping", "Indo-western draping",
            "Lehenga draping", "Bridal draping", "Sabhyasachi draping", "Ragini draping", "Mughal draping",
        ],
    },

    // ---------- Professional Henna Art ----------
    {
        title: "Professional Henna Art Course",
        category: "Professional Henna Art",
        duration: "15 Days",
        sections: [
            {
                title: "Basics",
                items: ["How to make mehendi paste", "How to make mehendi cone", "Introduction to mehendi basics"],
            },
            {
                title: "Design Practice",
                items: [
                    "Indian", "Gulf", "Arabic", "Jewelry mehndi designs",
                    "Designers mehendi designs", "Bridal mehendi designs", "Leg mehendi designs",
                ],
            },
        ],
    },

    // ---------- Beautician Course ----------
    {
        title: "Basic Beautician Course",
        category: "Beautician Course",
        duration: "1 Month",
        points: [
            "Knowledge of beauty products", "Skin knowledge", "CTM knowledge", "Threading",
            "Cleanup", "Manicure", "Pedicure", "Facial", "Normal wax", "Face D-tan",
            "Face bleach", "Body polishing", "Assessment", "Examination", "Certification",
        ],
    },
    {
        title: "Advance Beautician Course",
        category: "Beautician Course",
        duration: "2 Months",
        points: [
            "Skin knowledge & theory", "Threading", "Knowledge of beauty", "Knowledge of CTM",
            "Cleanup", "Sugar wax", "Rica wax", "Manicure", "Pedicure", "Essential facial",
            "Advance facial", "Face de-tan", "Face bleach", "Body de-tan", "Body bleach",
            "Body wax", "Body polishing", "Body spa", "Body massage",
            "Complimentary skin kit & skin tools",
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
    "Self Grooming Course",
    "Diploma",
    "Fashion & Photography Course",
    "Airbrush Makeup Course",
    "Hair Technician Course",
    "Nail Extension Course",
    "Self Drapping Course",
    "Professional Drapping Course",
    "Professional Henna Art",
    "Beautician Course",
];