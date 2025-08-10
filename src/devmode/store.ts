import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DevFile, DevStore } from "./types";

const STORAGE_KEY = "jarvis_dev_files_v1";

const uid = () => Math.random().toString(36).slice(2);

const initialCode = `/* @jsxRuntime classic */\n/* @jsx React.createElement */\n// Jarvis Dev Preview — no imports required\nfunction Preview() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <div className=\"p-6 rounded-2xl border bg-background/60 backdrop-blur-md shadow-lg ring-1 ring-primary/30 text-foreground\">\n      <h2 className=\"text-xl font-semibold\">Jarvis Dev Preview</h2>\n      <p className=\"text-sm text-muted-foreground mt-2\">Edit the code and see live updates below.</p>\n      <button\n        className=\"mt-4 px-3 py-2 rounded-md border bg-primary/10 hover:bg-primary/20 transition\"\n        onClick={() => setCount((c) => c + 1)}\n      >\n        Count: {count}\n      </button>\n    </div>\n  );\n}`;

const defaultTree: DevFile[] = [
  {
    id: uid(),
    name: "src",
    type: "folder",
    expanded: true,
    children: [
      {
        id: uid(),
        name: "AppPreview.tsx",
        type: "file",
        language: "tsx",
        content: initialCode,
      },
    ],
  },
];

function walk(files: DevFile[], cb: (node: DevFile, parent: DevFile | null, index: number, arr: DevFile[]) => void) {
  const visit = (nodes: DevFile[], parent: DevFile | null) => {
    nodes.forEach((n, i, arr) => {
      cb(n, parent, i, arr);
      if (n.children) visit(n.children, n);
    });
  };
  visit(files, null);
}

function clone<T>(v: T): T { return JSON.parse(JSON.stringify(v)); }

export const useDevStore = create<DevStore>()(persist((set, get) => ({
  files: defaultTree,
  activeFileId: defaultTree[0].children?.[0]?.id,
  previewVisible: true,
  showAssistant: true,
  autoSave: true,
  darkMode: true,
  runNonce: 0,

  setFiles: (files) => set({ files }),
  setActiveFile: (id) => set({ activeFileId: id }),

  addFile: (parentId, file) => set((state) => {
    const files = clone(state.files);
    const newFile: DevFile = {
      id: uid(),
      name: file?.name || "NewFile.tsx",
      type: "file",
      language: file?.language || "tsx",
      content: file?.content || initialCode,
    };
    if (!parentId) {
      files.push(newFile);
    } else {
      walk(files, (node) => {
        if (node.id === parentId) {
          node.children = node.children || [];
          node.children.push(newFile);
          node.type = node.type === "folder" ? "folder" : "folder"; // ensure folder semantics
          (node as any).expanded = true;
        }
      });
    }
    return { files, activeFileId: newFile.id };
  }),

  addFolder: (parentId) => set((state) => {
    const files = clone(state.files);
    const folder: DevFile = { id: uid(), name: "NewFolder", type: "folder", expanded: true, children: [] };
    if (!parentId) files.push(folder); else {
      walk(files, (node) => {
        if (node.id === parentId) {
          node.children = node.children || [];
          node.children.push(folder);
          (node as any).expanded = true;
        }
      });
    }
    return { files };
  }),

  rename: (id, name) => set((state) => {
    const files = clone(state.files);
    walk(files, (node) => { if (node.id === id) node.name = name; });
    return { files };
  }),

  remove: (id) => set((state) => {
    const files = clone(state.files);
    walk(files, (_node, parent, index, arr) => {
      if (_node.id === id) arr.splice(index, 1);
    });
    let { activeFileId } = state;
    if (activeFileId === id) activeFileId = undefined;
    return { files, activeFileId };
  }),

  reorder: (dragId, dropId) => set((state) => {
    if (dragId === dropId) return {} as any;
    const files = clone(state.files);
    let dragParentArr: DevFile[] | null = null;
    let dragIndex = -1;
    let dragged: DevFile | null = null;
    let dropParentArr: DevFile[] | null = null;
    let dropIndex = -1;

    walk(files, (node, parent, index, arr) => {
      if (node.id === dragId) { dragParentArr = arr; dragIndex = index; dragged = node; }
      if (node.id === dropId) { dropParentArr = arr; dropIndex = index; }
    });
    if (!dragged || !dragParentArr || !dropParentArr) return { files } as any;

    // same-level reorder only for simplicity
    if (dragParentArr === dropParentArr) {
      dragParentArr.splice(dragIndex, 1);
      const insertIndex = dropIndex > dragIndex ? dropIndex - 1 : dropIndex;
      dragParentArr.splice(insertIndex, 0, dragged);
    }
    return { files };
  }),

  updateContent: (id, content) => set((state) => {
    const files = clone(state.files);
    walk(files, (node) => { if (node.id === id && node.type === "file") node.content = content; });
    return { files };
  }),

  togglePreview: () => set((s) => ({ previewVisible: !s.previewVisible })),
  triggerRun: () => set((s) => ({ runNonce: s.runNonce + 1 })),
  setAutoSave: (v) => set({ autoSave: v }),
  setShowAssistant: (v) => set({ showAssistant: v }),
  setDarkMode: (v) => set({ darkMode: v }),
}), { name: STORAGE_KEY }));

export function findFileById(files: DevFile[], id?: string): DevFile | undefined {
  let found: DevFile | undefined;
  walk(files, (node) => { if (node.id === id) found = node; });
  return found;
}
