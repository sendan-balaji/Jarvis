import React from "react";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AssistantBubble() {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 24, y: 24 });
  const bubbleRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = bubbleRef.current;
    if (!el) return;
    let dragging = false; let sx = 0; let sy = 0;
    const onDown = (e: PointerEvent) => { dragging = true; sx = e.clientX - pos.x; sy = e.clientY - pos.y; (e.target as HTMLElement).setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => { if (!dragging) return; setPos({ x: e.clientX - sx, y: e.clientY - sy }); };
    const onUp = () => { dragging = false; };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => { el.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
  }, [pos.x, pos.y]);

  return (
    <div style={{ position: 'fixed', right: pos.x, bottom: pos.y, zIndex: 50 }}>
      {open && (
        <div className="mb-3 w-72 rounded-2xl border bg-background/80 backdrop-blur-md shadow-xl ring-1 ring-primary/30 p-3">
          <div className="text-sm font-medium mb-2">Assistant</div>
          <div className="h-32 overflow-auto text-sm text-muted-foreground border rounded-md p-2 bg-background/60">Hi! Ask me anything about your code.</div>
          <div className="mt-2 flex items-center gap-2">
            <input className="flex-1 h-9 rounded-md border bg-background/70 px-2 text-sm" placeholder="Type a message" />
            <Button size="icon" variant="secondary" className="h-9 w-9"><Send className="h-4 w-4"/></Button>
          </div>
        </div>
      )}
      <div ref={bubbleRef}>
        <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 shadow-lg ring-1 ring-primary/40" onClick={() => setOpen((v) => !v)}>
          <Bot className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
