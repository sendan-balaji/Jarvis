import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useJarvis } from "../JarvisProvider";

export default function DevModeTab() {
  const { state, setState, updateConfig } = useJarvis();
  const [json, setJson] = React.useState(JSON.stringify(state.config, null, 2));

  return (
    <section className="p-3 md:p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Developer Tools</h1>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>State</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>isListening: <b>{String(state.isListening)}</b></div>
            <div>inputText: <b className="break-all">{state.inputText || ""}</b></div>
            <div>micOn: <b>{String(state.micOn)}</b></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Toggles</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Show Equalizer</span>
              <Switch checked={state.showEqualizer} onCheckedChange={(v) => setState((s) => ({ ...s, showEqualizer: v }))} />
            </div>
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <Switch checked={state.enableDarkMode} onCheckedChange={(v) => setState((s) => ({ ...s, enableDarkMode: v }))} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:row-span-2">
          <CardHeader><CardTitle>Console</CardTitle></CardHeader>
          <CardContent>
            <div className="h-48 overflow-auto rounded-md border bg-background/70 p-2 text-xs font-mono">
              {state.logs.length === 0 ? (
                <div className="text-muted-foreground">No logs yet.</div>
              ) : state.logs.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Config (JSON)</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              className="w-full h-48 rounded-md border bg-background/70 p-3 font-mono text-xs"
            />
            <Button onClick={() => {
              try { updateConfig(JSON.parse(json)); } catch {}
            }}>Apply</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
