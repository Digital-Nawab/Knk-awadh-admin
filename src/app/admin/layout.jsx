import Sidebar from "../../components/backend/dashboardComponents/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 bg-secondary min-h-screen">{children}</main>
        </div>
    );
}