"use client";

import { Dialog, DialogContent, DialogTitle } from "@/frontend/components/ui/dialog";
import { Widget } from "@typeform/embed-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void; // <--- NUEVA PROPIEDAD
  formId: string;
  userId?: string;
}

export function SurveyModal({ isOpen, onClose, onComplete, formId, userId }: SurveyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl h-[85vh] p-0 overflow-hidden bg-white rounded-3xl border-none shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Encuesta de Bienestar</DialogTitle>
        </VisuallyHidden>

        <div className="w-full h-full relative">
          <Widget
            id={formId}
            style={{ width: "100%", height: "100%" }}
            className="w-full h-full"
            onSubmit={() => {
              console.log("Encuesta completada");
              onComplete(); // <--- AVISAMOS AL PADRE QUE SE COMPLETÓ
              setTimeout(() => onClose(), 2000); // Cerramos tras 2 segundos
            }}
            hidden={{
              user_id: userId || "anonimo",
              source: "portal_timeline",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}