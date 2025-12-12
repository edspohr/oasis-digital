"use client";

import { BackgroundWaves } from "@/components/visuals/BackgroundWaves";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <BackgroundWaves />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass p-12 rounded-3xl max-w-2xl w-full text-center z-10 flex flex-col items-center gap-6"
      >
        <div className="space-y-2">
           <h1 className="font-heading font-bold text-5xl md:text-7xl tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600">
            OASIS
          </h1>
          <p className="font-heading font-medium text-xl uppercase tracking-widest text-gray-500">
            Digital Portal
          </p>
        </div>

        <p className="text-lg text-gray-600 max-w-lg font-sans leading-relaxed">
          Más que un dashboard, un refugio digital. <br/>
          Bienvenido a la experiencia inmersiva de bienestar.
        </p>

        <div className="flex gap-4 mt-4">
          <Link href="/login">
            <Button className="rounded-full px-8 py-6 text-lg bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all">
              Ingresar
            </Button>
          </Link>
          <Link href="/participant">
            <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-2 border-white/50 bg-white/30 hover:bg-white/50 text-gray-800 font-medium">
              Conocer más
            </Button>
          </Link>
        </div>
      </motion.div>
      
      <footer className="absolute bottom-6 text-gray-500 text-sm font-medium">
        © 2024 Fundación Summer - OASIS Digital
      </footer>
    </main>
  );
}
