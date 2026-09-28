import Layout from "@/layout/Layout";
import DynamicCategoryPage from "@/components/serviceComponents/DynamicCategoryPage";

export const metadata = {
    title: "Nails Services in Lucknow | KNK Salon Awadh",
    description: "Gel, acrylic, extensions or a simple mani-pedi — every nail service handled by an artist trained for precision and finish.",
};

export default function NailsPage() {
    return (
        <Layout>
            <DynamicCategoryPage categorySlug="nails" />
        </Layout>
    );
}
