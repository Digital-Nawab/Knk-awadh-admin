import Layout from "@/layout/Layout";
import DynamicCategoryPage from "@/components/serviceComponents/DynamicCategoryPage";

export const metadata = {
    title: "Facial Services in Lucknow | KNK Salon Awadh",
    description: "Signature cellular skin nutrition, HydraFacials, and brightening rituals at KNK Salon Awadh Lucknow.",
};

export default function FacialPage() {
    return (
        <Layout>
            <DynamicCategoryPage categorySlug="facial" />
        </Layout>
    );
}