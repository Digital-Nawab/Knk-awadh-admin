import Edit from "../../../../../components/backend/dashboardComponents/services/Edit";

export default async function ServiceEditPage({ params }) {
    const { id } = await params;
    return <Edit serviceId={id} />;
}