"use client";

import { Sidebar } from "@/frontend/components/dashboard/Sidebar";
import { BackgroundWaves } from "@/frontend/components/visuals/BackgroundWaves";
import { OASISChat } from "@/frontend/components/ai/OASISChat";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-gray-50/50 flex overflow-hidden">
        <BackgroundWaves />
        
        <Sidebar />

        <main className="flex-1 relative z-10 h-screen overflow-y-auto w-full p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </main>
        
        <OASISChat />
    </div>
  );
}
