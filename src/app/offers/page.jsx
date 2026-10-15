import Layout from "@/layout/Layout";
import OffersPageClient from "@/components/offers/OffersPageClient";
import OfferModel from "@/models/OfferModel";
import { getDynamicMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
    return await getDynamicMetadata("/offers", {
        title: "Exclusive Salon & Aesthetic Offers in Lucknow | KNK Salon Awadh",
        description: "Explore limited-time salon packages, hair spa deals, bridal transformations, and men's grooming combos at KNK Salon Awadh Lucknow.",
    });
}

export default async function OffersPage() {
    let offers = [];
    try {
        offers = await OfferModel.getActive();
    } catch (error) {
        console.error("Failed to fetch offers on server:", error);
        offers = [];
    }

    return (
        <Layout>
            <OffersPageClient initialOffers={offers} />
        </Layout>
    );
}
