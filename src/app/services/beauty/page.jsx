import Layout from "@/layout/Layout";
import DynamicCategoryPage from "@/components/serviceComponents/DynamicCategoryPage";

export const metadata = {
    title: "Beauty Services in Lucknow | KNK Salon Awadh",
    description: "Clean skin rituals, multi-step HydraFacials, oxygenating cleanups, waxing and wellness at KNK Salon Awadh.",
};

export default function BeautyPage() {
    return (
        <Layout>
            <DynamicCategoryPage categorySlug="beauty" />
        </Layout>
    );
}