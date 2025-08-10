import React, { useMemo, useState } from "react";
import { Paperclip, Camera, Image as ImageIcon, Send, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

export type FabAction = "attach" | "camera" | "gallery" | "send" | "live";

export default function FloatingActionButton({ onAction, canSend }: { onAction: (a: FabAction) => void; canSend: boolean }) {
  const [open, setOpen] = useState(false);
  const actions = useMemo(() => (
    canSend
      ? ([{ key: "send", icon: Send, label: "Send" }] as const)
      : ([
          { key: "attach", icon: Paperclip, label: "Attach" },
          { key: "camera", icon: Camera, label: "Camera" },
          { key: "gallery", icon: ImageIcon, label: "Gallery" },
        ] as const)
  ), [canSend]);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 md:hidden">
      <div className="relative">
        {/* Glowing rings */}
        <div className="absolute inset-0 rounded-full ring-2 ring-primary/40 animate-pulse" />
        <div className="absolute -inset-2 rounded-full ring-2 ring-primary/20 blur" />

        

        {open && (
          <div className="absolute -top-2 -left-2 -translate-y-full grid grid-cols-2 gap-2 p-2 rounded-2xl border bg-background/80 backdrop-blur-md shadow-lg">
            {actions.map((a) => (
              <Button key={a.key} variant="outline" className="justify-start" onClick={() => { onAction(a.key as FabAction); setOpen(false); }}>
                <a.icon className="h-4 w-4" />
                <span className="ml-2">{a.label}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
