import Sidebar from "../../components/backend/dashboardComponents/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-secondary">
            <Sidebar />
            <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 bg-secondary min-h-screen overflow-x-hidden">{children}</main>
        </div>
    );
}