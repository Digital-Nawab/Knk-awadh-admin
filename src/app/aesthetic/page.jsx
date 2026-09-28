import React from "react";
import CategoryTemplate from "@/components/services/CategoryTemplate";
import { getCategoryBySlug } from "@/data/servicesCatalog";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
    const category = getCategoryBySlug("aesthetic");
    return await getDynamicMetadata('/aesthetic', {
        title: category?.title || "Aesthetic Treatments in Lucknow | Microblading & Skin Rejuvenation | KNK",
        description: category?.shortDesc || "Advanced aesthetic treatments in Lucknow: semi-permanent eyebrow microblading, lip blush, laser skin toning, and non-invasive clinical facial rejuvenation.",
        image: category?.image || "/assets/images/new/aesthetics-adv.webp"
    });
}

export default function AestheticsPage() {
    const category = getCategoryBySlug("aesthetic");

    const featuredService = {
        title: "Featherstroke Microblading & Lip Tint",
        desc: "Wake up every day with perfect brow architecture and natural rosy lip definition. Semi-permanent, waterproof, and personalized to your facial symmetry.",
        image: "/assets/images/new/aesthetics-adv.webp",
        url: "/microblading",
        bullets: [
            "US-FDA certified organic medical pigments",
            "Topical gentle numbing ensures comfortable procedure",
            "Lasts 12 to 24 months with natural fading"
        ]
    };

    const testimonials = [
        {
            name: "Dr. Pallavi Singh",
            role: "Microblading Client",
            text: "Was hesitant about microblading, but the team at KNK mapped my brow architecture so naturally. The strokes look just like my real brow hairs."
        },
        {
            name: "Radhika Kapoor",
            role: "Lip Blush Client",
            text: "Had dark lip neutralization and blush done here. The color healed into the most gorgeous natural berry tint. Truly life-changing!"
        },
        {
            name: "Sonia Tandon",
            role: "Laser Skin Client",
            text: "After three sessions of laser toning, my persistent post-acne dark spots have faded significantly and my skin texture is much smoother."
        }
    ];

    return (
        <CategoryTemplate
            category={category}
            featuredService={featuredService}
            testimonials={testimonials}
        />
    );
}
