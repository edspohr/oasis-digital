"use client";
import { useEffect, useRef } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

export function SupersetChart({ dashboardId }: { dashboardId: string }) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGuestToken = async () => {
      const response = await fetch(`/api/superset/token?id=${dashboardId}`);
      const data = await response.json();
      return data.token;
    };

    if (divRef.current) {
      embedDashboard({
        id: dashboardId,
        supersetDomain: process.env.NEXT_PUBLIC_SUPERSET_DOMAIN || "",
        mountPoint: divRef.current,
        fetchGuestToken,
        dashboardUiConfig: { 
            hideTitle: true, 
            hideChartControls: true,
            hideTab: true,
            filters: { visible: false, expanded: false }
        },
      });
    }
  }, [dashboardId]);

  return (
    <div 
      ref={divRef} 
      // Se agregaron los selectores [&>iframe] para forzar el tamaño del dashboard
      className="glass w-full min-h-[700px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0" 
      style={{ height: 'calc(100vh - 250px)' }} 
    />
  );
}