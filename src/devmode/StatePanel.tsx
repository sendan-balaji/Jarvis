import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useDevStore, findFileById } from "./store";
import { useJarvis } from "@/jarvis/JarvisProvider";

export default function StatePanel() {
  const { pathname } = useLocation();
  const { state, updateConfig } = useJarvis();
  const { files, activeFileId, autoSave, setAutoSave, showAssistant, setShowAssistant, darkMode, setDarkMode } = useDevStore();
  const active = findFileById(files, activeFileId);
  const [open, setOpen] = React.useState(false);
  const [json, setJson] = React.useState(JSON.stringify(state.config, null, 2));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="fixed left-4 top-4 z-40">State</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90vw] sm:max-w-md bg-background/80 backdrop-blur-md border-l ring-1 ring-primary/20">
        <SheetHeader>
          <SheetTitle>State & Config</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3 text-sm">
          <div className="rounded-lg border p-3 bg-background/60">
            <div>isListening: <b>{String(state.isListening)}</b></div>
            <div>micOn: <b>{String(state.micOn)}</b></div>
            <div>activeFile: <b>{active?.name || "—"}</b></div>
            <div>currentRoute: <b>{pathname}</b></div>
          </div>
          <div className="rounded-lg border p-3 bg-background/60 space-y-2">
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div className="flex items-center justify-between">
              <span>Show Assistant</span>
              <Switch checked={showAssistant} onCheckedChange={setShowAssistant} />
            </div>
            <div className="flex items-center justify-between">
              <span>Auto Save</span>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Config (JSON)</div>
            <textarea className="w-full h-48 rounded-md border bg-background/60 p-2 font-mono text-xs" value={json} onChange={(e) => setJson(e.target.value)} />
            <Button size="sm" onClick={() => { try { updateConfig(JSON.parse(json)); } catch {} }}>Apply</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
