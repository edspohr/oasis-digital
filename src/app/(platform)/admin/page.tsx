

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="font-heading text-3xl font-bold text-gray-800">Panel de Control</h1>
             <p className="text-gray-600">Gestión de impacto global y eventos.</p>
            
             <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                <iframe 
                    src="https://lookerstudio.google.com/embed/reporting/8852cf04-42c3-4884-9706-e6265b72edae" 
                    allowFullScreen 
                    className="w-full h-full border-0"
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                ></iframe>
             </div>
        </div>
    )
}
