import React from "react";
import ReactDOM from "react-dom/client";
import { useDevStore, findFileById } from "./store";
import * as Sucrase from "sucrase";

function compileToComponent(source: string) {
  // strip imports/exports for sandbox simplicity
  const stripped = source
    .replace(/^\s*import\s+[^;]+;?/gm, "")
    .replace(/export\s+default\s+function\s+/g, "function __PreviewComponent ")
    .replace(/export\s+default\s*\(/g, "const __PreviewComponent = (")
    .replace(/export\s+default\s+([A-Za-z_][\w]*)\s*;/g, "const __PreviewComponent = $1;");

  const transformed = Sucrase.transform(stripped, { transforms: ["jsx", "typescript"], jsxPragma: "React.createElement" }).code;
  // eslint-disable-next-line no-new-func
  const factory = new Function(
    "React",
    `${transformed}\n;return (typeof __PreviewComponent !== 'undefined' ? __PreviewComponent : (typeof Preview !== 'undefined' ? Preview : null));`
  );
  try {
    return factory(React);
  } catch (e) {
    console.error(e);
    return () => React.createElement("pre", { className: "text-destructive" }, String(e));
  }
}

export default function PreviewPane() {
  const { files, activeFileId, runNonce } = useDevStore();
  const file = findFileById(files, activeFileId);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const rootRef = React.useRef<ReactDOM.Root | null>(null);

  const render = React.useCallback(() => {
    if (!containerRef.current) return;
    if (!rootRef.current) rootRef.current = ReactDOM.createRoot(containerRef.current);
    if (!file || file.type !== "file" || !file.content) {
      rootRef.current.render(React.createElement("div", { className: "text-muted-foreground" }, "No file selected"));
      return;
    }
    const Comp = compileToComponent(file.content);
    rootRef.current.render(React.createElement("div", { className: "p-3" }, React.createElement(Comp as any)));
  }, [file]);

  React.useEffect(() => { render(); }, [render, runNonce]);

  return (
    <section className="h-full w-full rounded-xl border bg-background/40 backdrop-blur-md ring-1 ring-primary/20 overflow-hidden">
      <header className="px-3 py-2 text-xs text-muted-foreground border-b">Live Preview</header>
      <div ref={containerRef} className="h-[calc(100%-2rem)] w-full overflow-auto" />
    </section>
  );
}
