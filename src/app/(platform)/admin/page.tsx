import { AdminDashboardMetrics } from "@/components/admin/AdminMetrics";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="font-heading text-3xl font-bold text-gray-800">Panel de Control</h1>
             <p className="text-gray-600">Gestión de impacto global y eventos.</p>
            
             <AdminDashboardMetrics />
        </div>
    )
}
