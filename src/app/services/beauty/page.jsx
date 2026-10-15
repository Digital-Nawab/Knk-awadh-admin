import Layout from "@/layout/Layout";
import DynamicCategoryPage from "@/components/serviceComponents/DynamicCategoryPage";
import { getDynamicMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
    return await getDynamicMetadata('/services/beauty', {
        title: "Beauty Services in Lucknow | KNK Salon Awadh",
        description: "Clean skin rituals, multi-step HydraFacials, oxygenating cleanups, waxing and wellness at KNK Salon Awadh.",
    });
}

export default function BeautyPage() {
    return (
        <Layout>
            <DynamicCategoryPage categorySlug="beauty" />
        </Layout>
    );
}