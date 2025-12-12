"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Sparkles, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export function OASISChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"mentor" | "coach">("mentor");
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { mode },
  } as any) as any;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[380px] h-[600px] bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className={`p-4 flex items-center justify-between ${
                mode === 'mentor' ? 'bg-aurora-cyan/20' : 'bg-aurora-pink/20'
            }`}>
              <div className="flex items-center gap-3">
                 <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                     mode === 'mentor' ? 'bg-aurora-cyan text-white' : 'bg-aurora-pink text-white'
                 }`}>
                    {mode === 'mentor' ? <Sparkles className="h-5 w-5" /> : <Brain className="h-5 w-5" />}
                 </div>
                 <div>
                    <h3 className="font-heading font-bold text-gray-800">OASIS AI</h3>
                    <div className="flex gap-2 text-xs font-medium">
                        <button 
                            onClick={() => setMode("mentor")}
                            className={`px-2 py-0.5 rounded-full transition-colors ${
                                mode === 'mentor' ? 'bg-white text-aurora-cyan' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Mentor
                        </button>
                        <div className="w-px bg-gray-300 h-3 self-center" />
                        <button 
                             onClick={() => setMode("coach")}
                             className={`px-2 py-0.5 rounded-full transition-colors ${
                                mode === 'coach' ? 'bg-white text-aurora-pink' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Coach
                        </button>
                    </div>
                 </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white/50">
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                        {mode === 'mentor' ? (
                            <>
                                <Sparkles className="h-12 w-12 mb-3 opacity-50" />
                                <p>Hola, soy tu Mentor. Estoy aquí para escucharte y apoyarte. ¿Cómo te sientes hoy?</p>
                            </>
                        ) : (
                            <>
                                <Brain className="h-12 w-12 mb-3 opacity-50" />
                                <p>Hola, soy tu Coach. Transformemos intenciones en acciones. ¿Qué objetivo quieres atacar?</p>
                            </>
                        )}
                    </div>
                )}
                <div className="space-y-4">
                    {messages.map((m: any) => (
                        <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                m.role === 'user' 
                                    ? "bg-gray-900 text-white rounded-br-none" 
                                    : "bg-white border border-gray-100 shadow-sm rounded-bl-none text-gray-700"
                            )}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                             </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 bg-white/50 border-t border-white">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input 
                        value={input} 
                        onChange={handleInputChange} 
                        placeholder={mode === 'mentor' ? "Cuéntame..." : "Define tu meta..."}
                        className="rounded-full bg-white border-none shadow-sm focus-visible:ring-1 focus-visible:ring-aurora-cyan"
                    />
                    <Button type="submit" size="icon" className={cn(
                        "rounded-full shrink-0 transition-colors",
                         mode === 'mentor' ? 'bg-aurora-cyan hover:bg-aurora-cyan/80' : 'bg-aurora-pink hover:bg-aurora-pink/80'
                    )}>
                        <Send className="h-4 w-4 text-white" />
                    </Button>
                </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-16 w-16 rounded-full bg-black text-white shadow-xl flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-linear-to-tr from-aurora-cyan to-aurora-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <MessageCircle className="h-8 w-8 relative z-10" />
      </motion.button>
    </div>
  );
}
