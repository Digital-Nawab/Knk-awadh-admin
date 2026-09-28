import CategoryManagement from "@/components/backend/dashboardComponents/services/Categories";

export const metadata = {
    title: "Service Categories CMS | KNK Awadh Admin",
    description: "Manage salon service categories, slugs and display order.",
};

export default function AdminCategoriesAliasPage() {
    return <CategoryManagement />;
}
