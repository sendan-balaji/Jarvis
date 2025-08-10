export type DevFile = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: DevFile[];
  content?: string;
  language?: "tsx" | "jsx" | "ts" | "js" | "html";
  expanded?: boolean;
};

export type DevStoreState = {
  files: DevFile[];
  activeFileId?: string;
  previewVisible: boolean;
  showAssistant: boolean;
  autoSave: boolean;
  darkMode: boolean;
  runNonce: number;
};

export type DevStoreActions = {
  setFiles: (files: DevFile[]) => void;
  setActiveFile: (id?: string) => void;
  addFile: (parentId?: string, file?: Partial<DevFile>) => void;
  addFolder: (parentId?: string) => void;
  rename: (id: string, name: string) => void;
  remove: (id: string) => void;
  reorder: (dragId: string, dropId: string) => void;
  updateContent: (id: string, content: string) => void;
  togglePreview: () => void;
  triggerRun: () => void;
  setAutoSave: (v: boolean) => void;
  setShowAssistant: (v: boolean) => void;
  setDarkMode: (v: boolean) => void;
};

export type DevStore = DevStoreState & DevStoreActions;
