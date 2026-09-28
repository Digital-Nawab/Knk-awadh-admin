import Layout from "@/layout/Layout";
import DynamicCategoryPage from "@/components/serviceComponents/DynamicCategoryPage";

export const metadata = {
    title: "Body Services in Lucknow | KNK Salon Awadh",
    description: "Restorative body care, exfoliating botanical scrubs, detan therapy, and therapeutic massages at KNK Salon Awadh.",
};

export default function BodyPage() {
    return (
        <Layout>
            <DynamicCategoryPage categorySlug="body" />
        </Layout>
    );
}