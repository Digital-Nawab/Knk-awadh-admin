import Layout from "@/layout/Layout";
import DynamicCategoryPage from "@/components/serviceComponents/DynamicCategoryPage";
import { getDynamicMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
    return await getDynamicMetadata('/services/nails', {
        title: "Nails Services in Lucknow | KNK Salon Awadh",
        description: "Gel, acrylic, extensions or a simple mani-pedi — every nail service handled by an artist trained for precision and finish.",
    });
}

export default function NailsPage() {
    return (
        <Layout>
            <DynamicCategoryPage categorySlug="nails" />
        </Layout>
    );
}
