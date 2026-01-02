"use client";

import { Avatar, AvatarFallback } from "@/frontend/components/ui/avatar";
import { Button } from "@/frontend/components/ui/button";
import { Textarea } from "@/frontend/components/ui/textarea";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { useState } from "react";

const posts = [
  {
    id: 1,
    author: "María G.",
    role: "Participante",
    content: "Hoy apliqué la técnica de 'Escucha Activa' con mi equipo. ¡La diferencia fue increíble! Se sintieron mucho más validados.",
    likes: 12,
    comments: 4,
    time: "2h",
    initial: "MG"
  },
  {
    id: 2,
    author: "Admin OASIS",
    role: "Mentor",
    content: "Recordatorio: Mañana tenemos sesión de seguimiento. Traigan sus dudas sobre el módulo de Empatía.",
    likes: 24,
    comments: 0,
    time: "5h",
    initial: "AO"
  }
];

export function CommunityFeed() {
    const [newPost, setNewPost] = useState("");

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="glass p-4 rounded-2xl space-y-3">
                <Textarea 
                    placeholder="Comparte tu experiencia o haz una pregunta..." 
                    value={newPost}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPost(e.target.value)}
                    className="min-h-[100px] border-none bg-white/50 focus:ring-0 resize-none font-medium"
                />
                <div className="flex justify-end">
                    <Button disabled={!newPost.trim()} className="bg-aurora-pink hover:bg-aurora-pink/80 rounded-full px-6">
                        Publicar
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex gap-3">
                            <Avatar>
                                <AvatarFallback className="bg-aurora-cyan/30 text-aurora-cyan font-bold">{post.initial}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-bold text-gray-800">{post.author}</h4>
                                <span className="text-xs text-aurora-pink font-medium px-2 py-0.5 bg-aurora-pink/10 rounded-full">
                                    {post.role}
                                </span>
                            </div>
                            <span className="ml-auto text-xs text-gray-400">{post.time}</span>
                        </div>
                        
                        <p className="mt-3 text-gray-600 leading-relaxed">
                            {post.content}
                        </p>

                        <div className="mt-4 flex gap-6 text-gray-400 text-sm">
                            <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                                <Heart className="h-4 w-4" /> {post.likes}
                            </button>
                            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                                <MessageSquare className="h-4 w-4" /> {post.comments}
                            </button>
                            <button className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                                <Share2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
