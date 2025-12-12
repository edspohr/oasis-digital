"use client";

import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  date?: string;
}

const steps: Step[] = [
  {
    id: "1",
    title: "Encuesta Inicial",
    description: "Conociendo tu estado actual",
    status: "completed",
    date: "10 Oct",
  },
  {
    id: "2",
    title: "Taller OASIS",
    description: "Jornada presencial de inmersión",
    status: "current",
    date: "12 Oct",
  },
  {
    id: "3",
    title: "Seguimiento 3 Meses",
    description: "Evaluando el impacto",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Seguimiento 6 Meses",
    description: "Consolidando hábitos",
    status: "upcoming",
  },
];

export function Timeline() {
  return (
    <div className="relative space-y-8 p-4">
      <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200" />
      
      {steps.map((step) => (
        <div key={step.id} className="relative flex items-start gap-4 group">
           <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
            {step.status === "completed" ? (
              <CheckCircle2 className="h-6 w-6 text-aurora-cyan" />
            ) : step.status === "current" ? (
               <div className="h-4 w-4 rounded-full bg-aurora-pink animate-pulse" />
            ) : (
              <Circle className="h-4 w-4 text-gray-300" />
            )}
          </div>
          
          <div className={cn(
              "flex-1 rounded-2xl p-4 transition-all duration-300",
              step.status === "current" 
                ? "bg-white/80 shadow-md ring-1 ring-aurora-pink/50 scale-[1.02]" 
                : "bg-white/40 hover:bg-white/60"
          )}>
            <div className="flex justify-between items-start">
                <div>
                     <h3 className={cn(
                        "font-heading font-semibold text-lg",
                        step.status === "current" ? "text-gray-900" : "text-gray-600"
                     )}>
                        {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                </div>
                {step.date && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {step.date}
                    </span>
                )}
            </div>
            
            {step.status === "current" && (
                <div className="mt-4">
                    <button className="flex items-center gap-2 text-sm font-medium text-aurora-pink hover:text-aurora-pink/80 transition-colors">
                        Ver detalles del evento <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
