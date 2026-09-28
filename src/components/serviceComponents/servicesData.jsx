export const categories = ["All", "Nails", "Hair", "Beauty", "Facial", "Body"];

export const services = [
    // Nails — from knksalon.in/services/nail-art
    { title: "French Nail Art", category: "Nails", price: "On request", desc: "Classic, precise Parisian-chic nail art shaped to your everyday look.", img: "/assets/images/services-catalog/french-nail-art.webp" },
    { title: "Nail Art", category: "Nails", price: "On request", desc: "Gel nails, acrylic nails, manicures and pedicures done in-house.", img: "/assets/images/services-catalog/nail-art.webp" },
    { title: "Gel Polish", category: "Nails", price: "On request", desc: "Chip-resistant colour with adaptable, long-lasting designs.", img: "/assets/images/services-catalog/gel-polish.webp" },
    { title: "Gel Nail Extension", category: "Nails", price: "On request", desc: "Durable, vivid gel extensions built with high-quality materials.", img: "/assets/images/services-catalog/gel-nail-extension.webp" },
    { title: "Acrylic Nail Extension", category: "Nails", price: "On request", desc: "Strong, glitzy acrylic extensions that hold up through daily wear.", img: "/assets/images/services-catalog/acrylic-nail-extension.webp" },
    // Hair — from knksalon.in/services/hair
    { title: "Hair Smoothening", category: "Hair", price: "On request", desc: "Turns dry, unmanageable hair into long-lasting, straight, smooth strands.", img: "/assets/images/services-catalog/hair-smoothening.webp" },
    { title: "Nanoplastia", category: "Hair", price: "On request", desc: "Deep nutrition and frizz-free shine with less daily styling time.", img: "/assets/images/services-catalog/nanoplastia.webp" },
    { title: "Hair Spa", category: "Hair", price: "On request", desc: "Personalised, revitalising spa therapy for tired or damaged hair.", img: "/assets/images/services-catalog/hair-spa.webp" },
    { title: "Keratin Treatment", category: "Hair", price: "On request", desc: "Smooth, frizz-free, radiant hair with a customised application.", img: "/assets/images/services-catalog/keratin-treatment.webp" },
    // Beauty — from knksalon.in/services/beauty
    { title: "Threading", category: "Beauty", price: "On request", desc: "Precise brow and facial threading for a refined, tidy shape.", img: "/assets/images/services-catalog/threading.webp" },
    { title: "Bleach & D-Tan", category: "Beauty", price: "On request", desc: "Lightens tan and pigmentation for an even, healthy glow.", img: "/assets/images/services-catalog/bleach-d-tan.webp" },
    { title: "Face Hair Removal & Waxing", category: "Beauty", price: "On request", desc: "Premium waxing for brows, upper lip, chin, hands and legs.", img: "/assets/images/services-catalog/face-hair-removal-waxing.webp" },
    { title: "Manicure", category: "Beauty", price: "On request", desc: "Shaping, gentle exfoliation, hand massage and a flawless polish.", img: "/assets/images/services-catalog/manicure.webp" },
    { title: "Pedicure", category: "Beauty", price: "On request", desc: "A relaxing soak, exfoliation and nourishing mask for tired feet.", img: "/assets/images/services-catalog/pedicure.webp" },
    // Facial — from knksalon.in/services/facial
    { title: "Premium Facial", category: "Facial", price: "On request", desc: "Customised skincare built around HydraFacial-level results.", img: "/assets/images/services-catalog/premium-facial.webp" },
    { title: "Face Cleanup", category: "Facial", price: "On request", desc: "Mild exfoliation and thorough cleansing for a brighter complexion.", img: "/assets/images/services-catalog/face-cleanup.webp" },
    { title: "Hydra Facial", category: "Facial", price: "On request", desc: "Multi-step cleanse, exfoliate, extract and moisturise treatment.", img: "/assets/images/services-catalog/hydra-facial.webp" },
    // Body — from knksalon.in/services/body
    { title: "Body Polishing", category: "Body", price: "On request", desc: "Gentle exfoliation and a nourishing massage for smooth, soft skin.", img: "/assets/images/services-catalog/body-polishing.webp" },
    { title: "Full Body Massage", category: "Body", price: "On request", desc: "A therapist-tailored massage that eases tension and restores calm.", img: "/assets/images/services-catalog/full-body-massage.webp" },
];

export const spotlight = [
    {
        eyebrow: "Beauty",
        title: "Your face.",
        accent: "Your canvas.",
        text: "Makeup should enhance what makes you uniquely beautiful. Our artists build refined, personalised looks for brides, celebrations and every occasion where you want to feel your absolute best.",
        bullets: ["Bridal & engagement makeup", "HD and airbrush finishes", "Party & editorial looks"],
        img: "/assets/images/services-catalog/spotlight-beauty.webp",
        reverse: false,
    },
    {
        eyebrow: "Hair",
        title: "Every strand.",
        accent: "Every story.",
        text: "From precision cuts to elaborate bridal updos, our stylists read your hair's texture and your day's occasion before a single strand is touched. Colour, treatments and styling — all under one roof.",
        bullets: ["Keratin & smoothening treatments", "Nanoplastia", "Scalp & hair spa therapies"],
        img: "/assets/images/services-catalog/spotlight-hair.webp",
        reverse: true,
    },
];

export const steps = [
    { n: "01", title: "Choose Your Service", text: "Browse the list below or tell us the occasion — we'll suggest what fits." },
    { n: "02", title: "Book a Slot", text: "Call, WhatsApp, or fill the form and pick a time that works for you." },
    { n: "03", title: "Meet Your Artist", text: "You're matched with the specialist best suited to what you need." },
    { n: "04", title: "Leave Glowing", text: "Walk out looking — and feeling — exactly the way you wanted to." },
];

export const PAGE_SIZE = 9;