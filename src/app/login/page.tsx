"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { BackgroundWaves } from "@/components/visuals/BackgroundWaves";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const supabase = createClient();
  const router = useRouter();

  const handleEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (isSignUp) {
      // Sign Up
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage({ text: error.message, type: "error" });
      } else {
        setMessage({ text: "¡Revisa tu correo para confirmar tu cuenta!", type: "success" });
      }
    } else {
      // Sign In
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage({ text: "Credenciales incorrectas. Verifica e intenta de nuevo.", type: "error" });
      } else {
        router.push("/participant");
      }
    }
    setLoading(false);
  };

  const handleMagicLink = async () => {
    if (!email) {
      setMessage({ text: "Ingresa tu correo primero.", type: "error" });
      return;
    }
    setLoading(true);
    setMessage({ text: "", type: "" });

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ text: "Error al enviar el link. Inténtalo de nuevo.", type: "error" });
    } else {
      setMessage({ text: "¡Link mágico enviado! Revisa tu correo.", type: "success" });
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage({ text: "Error al conectar con Google.", type: "error" });
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6">
      <BackgroundWaves />
      
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="glass w-full max-w-md p-8 rounded-3xl shadow-xl flex flex-col gap-6"
      >
        <div className="text-center space-y-2">
            <h1 className="font-heading font-bold text-3xl text-gray-800">
              {isSignUp ? "Crear Cuenta" : "Acceso OASIS"}
            </h1>
            <p className="text-sm text-gray-600">
              {isSignUp ? "Únete a tu refugio digital" : "Ingresa a tu refugio digital"}
            </p>
        </div>

        <form onSubmit={handleEmailPassword} className="space-y-4">
            <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input 
                      type="email" 
                      placeholder="tucorreo@ejemplo.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-aurora-cyan/50 backdrop-blur-sm transition-all"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input 
                      type="password" 
                      placeholder="Contraseña" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-aurora-cyan/50 backdrop-blur-sm transition-all"
                  />
                </div>
            </div>
            <Button 
                type="submit" 
                disabled={loading}
                className="w-full py-6 rounded-xl bg-black hover:bg-gray-800 text-white font-medium shadow-md"
            >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  isSignUp ? "Crear Cuenta" : "Iniciar Sesión"
                )}
            </Button>
        </form>

        <div className="flex justify-between items-center text-sm">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-aurora-cyan hover:underline font-medium"
          >
            {isSignUp ? "Ya tengo cuenta" : "Crear cuenta nueva"}
          </button>
          <button 
            type="button"
            onClick={handleMagicLink}
            className="text-gray-500 hover:text-gray-700"
          >
            Usar Magic Link
          </button>
        </div>

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
            onClick={handleGoogleLogin}
            className="w-full py-6 rounded-xl border-gray-300 hover:bg-white/60 bg-white/40 flex items-center justify-center gap-3"
        >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
        </Button>
        
        {message.text && (
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg text-center text-sm font-medium ${
                  message.type === 'error' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-aurora-cyan/20 text-gray-800'
                }`}
            >
                {message.text}
            </motion.div>
        )}
      </motion.div>
    </main>
  );
}
