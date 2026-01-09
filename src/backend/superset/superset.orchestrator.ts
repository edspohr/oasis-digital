// src/backend/superset/superset.orchestrator.ts

export class SupersetOrchestrator {
    static async getGuestToken(dashboardId: string) {
      const domain = process.env.SUPERSET_DOMAIN;
      const username = process.env.SUPERSET_ADMIN_USERNAME;
      const password = process.env.SUPERSET_ADMIN_PASSWORD;
  
      try {
        // 1. Obtener Access Token de la API de Superset
        const loginRes = await fetch(`${domain}/api/v1/security/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, provider: 'db' }),
        });
        const loginData = await loginRes.json();
        const accessToken = loginData.access_token;
  
        // 2. Solicitar Guest Token para el dashboardId específico
        const guestRes = await fetch(`${domain}/api/v1/security/guest_token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            user: { username: "guest_user", first_name: "Guest", last_name: "User" },
            resources: [{ type: "dashboard", id: dashboardId }],
            rls: [], // Puedes añadir filtros de seguridad aquí
          }),
        });
  
        const guestData = await guestRes.json();
        return { token: guestData.token, error: null };
      } catch (error) {
        console.error("Superset Auth Error:", error);
        return { token: null, error: "Error de autenticación con Superset" };
      }
    }
  }