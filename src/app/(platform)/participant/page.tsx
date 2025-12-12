import { Timeline } from "@/components/participant/Timeline";

export default function ParticipantHome() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                 <div>
                    <h1 className="font-heading text-3xl font-bold text-gray-800">Mi Viaje OASIS</h1>
                    <p className="text-gray-600">Bienvenido a tu refugio digital. Aquí comienza tu camino.</p>
                 </div>
                 <div className="bg-white/50 px-4 py-2 rounded-full border border-white text-sm font-medium text-aurora-cyan">
                    Nivel: Explorador Empático
                 </div>
            </div>
            
            <Timeline />
        </div>
    )
}
