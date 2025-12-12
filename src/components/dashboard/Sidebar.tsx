"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    FileText, 
    Settings,
    LogOut,
    Home,
    BookOpen
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    
    // In a real app, we would get the role from context/user profile
    // For now we can infer or show generic links. 
    // Ideally, we fetch the profile in the LayoutServer and pass it down, or use a context.
    // For this prototype, I'll list all common links but visually grouped.

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const links = [
        { href: "/participant", label: "Mi Viaje", icon: Home },
        { href: "/participant/resources", label: "Recursos", icon: FileText },
        { href: "/participant/community", label: "Comunidad", icon: Users },
        // Admin links (Hidden in real logic if not admin)
        { href: "/admin", label: "Admin Dashboard", icon: LayoutDashboard },
        { href: "/admin/events", label: "Eventos", icon: Calendar },
        { href: "/admin/participants", label: "Participantes", icon: Users },
        { href: "/admin/cms", label: "Contenidos", icon: BookOpen },
        // Collaborator
        { href: "/collaborator", label: "Impacto", icon: Settings },
    ];

    return (
        <aside className="w-20 md:w-64 flex flex-col justify-between py-8 px-4 h-full relative z-20">
            <div className="space-y-8">
                <div className="flex items-center justify-center md:justify-start gap-2 px-2">
                    <img src="/favicon.png" alt="OASIS" className="h-8 w-8 rounded-full shadow-sm" />
                    <span className="font-heading font-bold text-xl hidden md:block text-gray-800 tracking-tight">OASIS</span>
                </div>

                <nav className="space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link key={link.href} href={link.href}>
                                <div className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                    isActive 
                                        ? "bg-black/80 text-white shadow-lg shadow-black/10 scale-105" 
                                        : "text-gray-600 hover:bg-white/40 hover:text-black hover:scale-105"
                                )}>
                                    <Icon className="h-5 w-5" />
                                    <span className="hidden md:block font-medium">{link.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="space-y-4">
                 <Button 
                    variant="ghost" 
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 px-4"
                >
                    <LogOut className="h-5 w-5" />
                   <span className="hidden md:block font-medium">Salir</span>
                </Button>
            </div>
        </aside>
    );
}
