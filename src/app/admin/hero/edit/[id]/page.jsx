import Edit from "../../../../../components/backend/dashboardComponents/hero/Edit";

export default async function HeroEditPage({ params }) {
    const { id } = await params;
    return <Edit heroId={id} />;
}