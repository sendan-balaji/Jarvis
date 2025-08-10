import React from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Play, Settings, Download } from "lucide-react";
import { useDevStore, findFileById } from "./store";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Topbar() {
  const { triggerRun, togglePreview, previewVisible, files, activeFileId } = useDevStore();
  const file = findFileById(files, activeFileId);

  const onExport = () => {
    if (!file || file.type !== "file") return;
    const blob = new Blob([file.content || ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed left-4 top-4 z-40 flex items-center gap-2 rounded-full border bg-background/60 backdrop-blur-md shadow-lg ring-1 ring-primary/30 px-2 py-1">
      <SidebarTrigger className="hover:bg-primary/10" />
      <Button size="sm" variant="ghost" onClick={triggerRun} className="hover:bg-primary/10">
        <Play className="h-4 w-4 mr-1" /> Run
      </Button>
      <Button size="sm" variant="ghost" onClick={onExport} className="hover:bg-primary/10">
        <Download className="h-4 w-4 mr-1" /> Export
      </Button>
      <Button size="sm" variant="ghost" onClick={togglePreview} className="hover:bg-primary/10">
        <Monitor className="h-4 w-4 mr-1" /> {previewVisible ? "Hide" : "Preview"}
      </Button>
      <SettingsPanelTrigger />
    </div>
  );
}

function SettingsPanelTrigger() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => setOpen(true)} className="hover:bg-primary/10">
        <Settings className="h-4 w-4 mr-1" /> Settings
      </Button>
      {open ? <SettingsPanel onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function SettingsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/40 backdrop-blur-sm">
      <div className="w-[90vw] max-w-lg rounded-2xl border bg-background/80 p-4 shadow-xl ring-1 ring-primary/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Settings</h3>
          <Button size="sm" variant="ghost" onClick={onClose}>Close</Button>
        </div>
        <div className="text-sm text-muted-foreground">More settings coming soon.</div>
      </div>
    </div>
  );
}
