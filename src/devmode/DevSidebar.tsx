import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquareText, PlusCircle, User } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useJarvis } from "@/jarvis/JarvisProvider";
import { Link } from "react-router-dom";
export default function DevSidebar() {
  const { state, setState, startNewChat } = useJarvis();

  return (
    <Sidebar className="bg-background/70 backdrop-blur-md border-r">
      <SidebarHeader>
        <Link to="/user" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/40 transition-colors">
          <Avatar>
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold truncate">Clonable Dev</div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
              Ready
            </div>
          </div>
        </Link>
        <SidebarInput placeholder="Search chats" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            Past Chats
            <Button size="sm" variant="ghost" onClick={startNewChat} aria-label="Start new chat">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-1">
              {state.pastChats.map((c) => (
                <Button
                  key={c.id}
                  variant={state.currentChatId === c.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setState((s) => ({ ...s, currentChatId: c.id }))}
                >
                  <MessageSquareText className="h-4 w-4 mr-2" />
                  <div className="flex-1 text-left truncate">
                    <div className="truncate">{c.title || "Untitled"}</div>
                    <div className="text-xs text-muted-foreground truncate">{c.lastMessage || "No messages yet"}</div>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {new Date(c.lastUpdatedAt).toLocaleTimeString()}
                  </Badge>
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 py-2 rounded-md border bg-muted/20">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <div className="text-sm font-medium">Profile</div>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <Avatar className="h-6 w-6">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="truncate">Guest</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
