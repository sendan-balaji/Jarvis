import React from "react";
import Editor from "@monaco-editor/react";
import { useDevStore, findFileById } from "./store";

export default function CodeEditor() {
  const { files, activeFileId, updateContent, autoSave, triggerRun } = useDevStore();
  const file = findFileById(files, activeFileId);
  const value = (file && file.type === "file" ? file.content : "") || "";
  const language = (file && file.type === "file" ? file.language : "tsx") || "tsx";

  const handleChange = (v?: string) => {
    if (!file || file.type !== "file") return;
    updateContent(file.id, v ?? "");
    if (autoSave) triggerRun();
  };

  return (
    <div className="h-full w-full rounded-xl border bg-background/60 backdrop-blur-md ring-1 ring-primary/20 overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={value}
        theme="vs-dark"
        options={{
          fontLigatures: true,
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: "on",
          smoothScrolling: true,
          cursorBlinking: "expand",
          automaticLayout: true,
        }}
        onChange={handleChange}
      />
    </div>
  );
}
