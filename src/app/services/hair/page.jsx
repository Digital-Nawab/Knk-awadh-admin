import Layout from "@/layout/Layout";
import DynamicCategoryPage from "@/components/serviceComponents/DynamicCategoryPage";

export const metadata = {
    title: "Hair Services in Lucknow | KNK Salon Awadh",
    description: "From bespoke designer cuts and rich global balayage to transformative Nanoplastia and restorative hair spa rituals.",
};

export default function HairPage() {
    return (
        <Layout>
            <DynamicCategoryPage categorySlug="hair" />
        </Layout>
    );
}