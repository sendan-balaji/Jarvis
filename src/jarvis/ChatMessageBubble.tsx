import React from "react";
import { cn } from "@/lib/utils";

export default function ChatMessageBubble({ role, text }: { role: "user" | "ai"; text: string }) {
  const isAI = role === "ai";
  return (
    <div className={cn("w-full flex animate-in fade-in-0 duration-200", isAI ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          "max-w-[85%] md:max-w-[70%] rounded-2xl border bg-background/70 backdrop-blur-md px-4 py-3 shadow",
          "ring-1 ring-primary/30",
          isAI ? "rounded-tl-md" : "rounded-tr-md",
        )}
      >
        <p className="text-sm text-foreground">{text}</p>
      </div>
    </div>
  );
}
