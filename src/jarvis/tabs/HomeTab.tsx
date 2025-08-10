import React from "react";

export default function HomeTab() {
  return (
    <section className="p-3 md:p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Welcome to Jarvis Quantum AI</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          AI Online
        </div>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { k: "Neural Nets", v: "128" },
          { k: "Processing", v: "8.4 TFLOPS" },
          { k: "Analyzed", v: "3.2M docs" },
          { k: "Latency", v: "~120ms" },
        ].map((it) => (
          <div key={it.k} className="rounded-2xl border bg-background/70 backdrop-blur-md p-4 shadow">
            <div className="text-xs text-muted-foreground">{it.k}</div>
            <div className="text-2xl font-semibold">{it.v}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-background/70 backdrop-blur-md p-4">
        <p className="text-sm text-muted-foreground">Start a conversation from the Chat tab or jump into Live Mode for voice-first interactions.</p>
      </div>
    </section>
  );
}
