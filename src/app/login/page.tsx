"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { BackgroundWaves } from "@/components/visuals/BackgroundWaves";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const supabase = createClient();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Error al enviar el link. Inténtalo de nuevo.");
    } else {
      setMessage("¡Link mágico enviado! Revisa tu correo.");
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'google') => {
      const { error } = await supabase.auth.signInWithOAuth({
          provider,
           options: {
            redirectTo: `${location.origin}/auth/callback`,
          },
      });
      if (error) console.error("Error social login:", error);
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6">
      <BackgroundWaves />
      
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="glass w-full max-w-md p-8 rounded-3xl shadow-xl flex flex-col gap-6"
      >
        <div className="text-center space-y-2">
            <h1 className="font-heading font-bold text-3xl text-gray-800">Acceso OASIS</h1>
            <p className="text-sm text-gray-600">Ingresa a tu refugio digital</p>
        </div>

        <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="space-y-2">
                <input 
                    type="email" 
                    placeholder="tucorreo@ejemplo.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-aurora-cyan/50 backdrop-blur-sm transition-all"
                />
            </div>
            <Button 
                type="submit" 
                disabled={loading}
                className="w-full py-6 rounded-xl bg-black hover:bg-gray-800 text-white font-medium shadow-md"
            >
                {loading ? "Enviando..." : "Enviar Magic Link"}
            </Button>
        </form>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/80 px-2 text-gray-500 rounded-full backdrop-blur-md">O continúa con</span>
            </div>
        </div>

        <Button 
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            className="w-full py-6 rounded-xl border-gray-300 hover:bg-white/60 bg-white/40"
        >
            Google
        </Button>
        
        {message && (
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-aurora-cyan/20 text-center text-sm font-medium text-gray-800"
            >
                {message}
            </motion.div>
        )}
      </motion.div>
    </main>
  );
}
