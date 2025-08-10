import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: number;
};

export type PastChat = {
  id: string;
  title: string;
  createdAt: number;
  lastUpdatedAt: number;
  lastMessage?: string;
};

type JarvisState = {
  currentChatId: string;
  messages: Record<string, ChatMessage[]>;
  pastChats: PastChat[];
  inputText: string;
  micOn: boolean;
  isListening: boolean;
  selectedTab: "home" | "chat" | "dev" | "visual";
  showEqualizer: boolean;
  enableDarkMode: boolean;
  logs: string[];
  config: Record<string, any>;
};

const initialState: JarvisState = {
  currentChatId: "default",
  messages: { default: [] },
  pastChats: [{ id: "default", title: "New Chat", createdAt: Date.now(), lastUpdatedAt: Date.now() }],
  inputText: "",
  micOn: false,
  isListening: false,
  selectedTab: "chat",
  showEqualizer: true,
  enableDarkMode: true,
  logs: [],
  config: { theme: "neon-dark", language: "en" },
};

const STORAGE_KEY = "jarvis_state_v1";

function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState] as const;
}

const JarvisContext = createContext<{
  state: JarvisState;
  setState: React.Dispatch<React.SetStateAction<JarvisState>>;
  sendMessage: (text?: string) => void;
  startNewChat: () => void;
  addLog: (line: string) => void;
  updateConfig: (obj: Record<string, any>) => void;
} | null>(null);

export const useJarvis = () => {
  const ctx = useContext(JarvisContext);
  if (!ctx) throw new Error("useJarvis must be used within JarvisProvider");
  return ctx;
};

export const JarvisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useLocalStorageState<JarvisState>(STORAGE_KEY, initialState);
  const addLog = useCallback((line: string) => {
    setState((s) => ({ ...s, logs: [...s.logs.slice(-199), `[${new Date().toLocaleTimeString()}] ${line}`] }));
  }, [setState]);

  const startNewChat = useCallback(() => {
    const id = Math.random().toString(36).slice(2);
    const chat: PastChat = { id, title: "New Chat", createdAt: Date.now(), lastUpdatedAt: Date.now() };
    setState((s) => ({
      ...s,
      currentChatId: id,
      pastChats: [chat, ...s.pastChats],
      messages: { ...s.messages, [id]: [] },
      inputText: "",
      selectedTab: "chat",
    }));
    addLog("Started new chat");
  }, [setState, addLog]);

  const sendMessage = useCallback((overrideText?: string) => {
    setState((s) => {
      const text = (overrideText ?? s.inputText).trim();
      if (!text) return s;
      const id = s.currentChatId;
      const userMsg: ChatMessage = { id: Math.random().toString(36).slice(2), role: "user", text, timestamp: Date.now() };
      const aiMsg: ChatMessage = { id: Math.random().toString(36).slice(2), role: "ai", text: "Processing…", timestamp: Date.now() };
      const msgs = [...(s.messages[id] || []), userMsg, aiMsg];
      const pastChats = s.pastChats.map((c) => c.id === id ? { ...c, lastUpdatedAt: Date.now(), lastMessage: text } : c);
      return { ...s, messages: { ...s.messages, [id]: msgs }, inputText: "", pastChats };
    });
    addLog("Sent message");
  }, [setState, addLog]);

  const updateConfig = useCallback((obj: Record<string, any>) => {
    setState((s) => ({ ...s, config: { ...s.config, ...obj } }));
  }, [setState]);

  const value = useMemo(() => ({ state, setState, sendMessage, startNewChat, addLog, updateConfig }), [state, sendMessage, startNewChat, addLog, updateConfig]);

  return <JarvisContext.Provider value={value}>{children}</JarvisContext.Provider>;
};
