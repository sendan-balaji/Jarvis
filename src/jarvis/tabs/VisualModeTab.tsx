import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Box, Image as ImageIcon, Cpu } from "lucide-react";

export default function VisualModeTab() {
  const items = [
    { icon: Camera, label: "Real-time" },
    { icon: ImageIcon, label: "Recognition" },
    { icon: Box, label: "Object Detect" },
    { icon: Cpu, label: "Neural Proc" },
  ];
  return (
    <section className="p-3 md:p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Visual Recognition</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          Ready
        </div>
      </header>

      <Card>
        <CardHeader><CardTitle>Camera Preview</CardTitle></CardHeader>
        <CardContent>
          <div className="aspect-video w-full rounded-xl border bg-background/70 backdrop-blur-md grid place-items-center text-muted-foreground">
            <Camera className="h-10 w-10" />
            <span className="sr-only">Camera preview placeholder</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it) => (
          <Card key={it.label} className="border bg-background/70 backdrop-blur-md">
            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
              <it.icon className="h-6 w-6" />
              <div className="text-sm">{it.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary">Tap to Scan</Button>
        <Button variant="outline">Toggle Live</Button>
      </div>
    </section>
  );
}
