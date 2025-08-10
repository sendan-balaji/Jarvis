import React from "react";
import { DevFile } from "./types";
import { useDevStore } from "./store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Folder, FileCode, Plus, FolderPlus, Trash2, Pencil, ChevronRight, ChevronDown } from "lucide-react";

function TreeNode({ node, depth }: { node: DevFile; depth: number }) {
  const { setActiveFile, activeFileId, addFile, addFolder, rename, remove, reorder, files, setFiles } = useDevStore();
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(node.name);

  const isActive = activeFileId === node.id;

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dragId = e.dataTransfer.getData("text/plain");
    if (!dragId) return;
    reorder(dragId, node.id);
  };

  return (
    <li
      className={`group rounded-md px-2 py-1 flex items-center justify-between ${isActive ? "bg-muted/50" : "hover:bg-muted/40"}`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", node.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0" onClick={() => node.type === "file" ? setActiveFile(node.id) : setFiles(toggleExpanded(files, node.id))}>
        {node.type === "folder" ? (
          <span className="text-muted-foreground">
            {node.expanded ? <ChevronDown className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>}
          </span>
        ) : null}
        <span className="text-muted-foreground">
          {node.type === "folder" ? <Folder className="h-4 w-4"/> : <FileCode className="h-4 w-4"/>}
        </span>
        {editing ? (
          <Input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => { setEditing(false); if (name.trim()) rename(node.id, name.trim()); else setName(node.name); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { (e.currentTarget as HTMLInputElement).blur(); }}}
            className="h-7 text-sm bg-background/70"
          />
        ) : (
          <span className={`truncate ${isActive ? "text-foreground" : "text-foreground/80"}`}>{node.name}</span>
        )}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
        {node.type === "folder" && (
          <>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => addFile(node.id, {})} title="Add file">
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => addFolder(node.id)} title="Add folder">
              <FolderPlus className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditing(true)} title="Rename">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => remove(node.id)} title="Delete">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </li>
  );
}

function toggleExpanded(files: DevFile[], id: string) {
  const cloned = JSON.parse(JSON.stringify(files)) as DevFile[];
  const visit = (nodes: DevFile[]) => nodes.forEach((n) => {
    if (n.id === id) n.expanded = !n.expanded;
    if (n.children) visit(n.children);
  });
  visit(cloned);
  return cloned;
}

function RenderTree({ nodes, depth = 0 }: { nodes: DevFile[]; depth?: number }) {
  return (
    <ul className="space-y-0.5">
      {nodes.map((n) => (
        <React.Fragment key={n.id}>
          <TreeNode node={n} depth={depth} />
          {n.type === "folder" && n.expanded && n.children?.length ? (
            <div className="pl-4 border-l border-border/60 ml-2">
              <RenderTree nodes={n.children} depth={depth + 1} />
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </ul>
  );
}

export default function FileTree() {
  const { files, addFile, addFolder } = useDevStore();
  return (
    <aside className="h-full w-full flex flex-col bg-background/60 backdrop-blur-md border rounded-xl p-2">
      <div className="flex items-center justify-between px-1 py-1">
        <h2 className="text-sm font-medium">Files</h2>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => addFile(undefined, {})} title="Add file at root">
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => addFolder(undefined)} title="Add folder at root">
            <FolderPlus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto pr-1">
        <RenderTree nodes={files} />
      </div>
    </aside>
  );
}
