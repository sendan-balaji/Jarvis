import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function LivePage() {
  React.useEffect(() => {
    document.title = "Jarvis Quantum AI — Live Mode";
    const el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute("content", "Fullscreen circular equalizer — Listening mode.");
    // canonical tag
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${location.origin}/live`);
  }, []);

  const navigate = useNavigate();

  const BAR_COUNT = 48;
  const [levels, setLevels] = React.useState<number[]>(
    Array.from({ length: BAR_COUNT }, () => Math.random())
  );

  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      setLevels((prev) => prev.map((v, i) => {
        const drift = (Math.sin(Date.now() / 350 + i) + 1) / 2;
        const noise = Math.random() * 0.25;
        const next = Math.max(0.05, Math.min(1, 0.6 * v + 0.4 * (drift + noise)));
        return next;
      }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-background">
      {/* Subtle neon glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 h-[120vmin] w-[120vmin] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <header className="fixed top-0 inset-x-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 h-12 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('/app')} aria-label="Back">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div className="text-sm text-muted-foreground">Live Mode</div>
          <div className="w-10" />
        </div>
      </header>

      <section className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6">
          <div className="relative size-[68vmin] max-w-[900px] max-h-[900px] min-w-[280px] min-h-[280px]">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border bg-background/50 backdrop-blur-md ring-2 ring-primary/40 shadow-2xl" />

            {/* Circular equalizer bars */}
            <div className="absolute inset-8">
              {levels.map((h, i) => {
                const angle = (i / BAR_COUNT) * 360;
                const barHeight = 30 + h * 120; // px
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateX(-50%)`,
                      transformOrigin: "center",
                    }}
                  >
                    <div
                      className="w-[6px] rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
                      style={{
                        height: `${barHeight}px`,
                        transform: "translateY(-50%)",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Inner core */}
            <div className="absolute inset-20 rounded-full border bg-background/60 backdrop-blur-lg ring-1 ring-primary/30 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Listening...
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold">Live Mode</h1>
                <p className="text-muted-foreground mt-1">Speak and see the waves dance</p>
              </div>
            </div>
          </div>

          {/* Bottom docked action bar */}
          <footer className="fixed inset-x-0 bottom-0 border-t bg-background/90 backdrop-blur">
            <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                AI Online
              </div>
              <Button size="sm" variant="destructive" onClick={() => navigate('/app')}>Stop</Button>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
