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
            hideTab: false, // Permitimos ver las pestañas que configuraste en Superset
            filters: { visible: false, expanded: false }
        },
      });
    }
  }, [dashboardId]);

  return (
    <div 
      ref={divRef} 
      /* Eliminamos 'glass', 'rounded-3xl', 'border' y 'shadow-2xl' 
         para que el iframe sea invisible y solo se vean los datos 
         sobre las ondas de fondo de la app.
      */
      className="w-full min-h-[700px] overflow-hidden [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0 [&>iframe]:bg-transparent" 
      style={{ height: 'calc(100vh - 200px)' }} 
    />
  );
}