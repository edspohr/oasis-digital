import { EventManager } from "@/components/admin/EventManager";

export default function AdminEventsPage() {
    return (
        <div className="space-y-6">
            <h1 className="font-heading text-3xl font-bold text-gray-800">Gestor de Eventos</h1>
             <p className="text-gray-600">Programa talleres y automatiza el seguimiento.</p>
            
             <EventManager />
        </div>
    )
}
