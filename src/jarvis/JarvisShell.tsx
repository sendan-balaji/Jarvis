import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuItem, SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Home, Code2, Camera, Radio, PlusCircle, MessageSquareText } from "lucide-react";
import { useJarvis } from "./JarvisProvider";
import ChatScreen from "./screens/ChatScreen";
import DevModeTab from "./tabs/DevModeTab";
import VisualModeTab from "./tabs/VisualModeTab";
import HomeTab from "./tabs/HomeTab";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

function JarvisSidebarInner() {
  const { state, setState, startNewChat } = useJarvis();
  const navigate = useNavigate();

  const tabs = [
    { key: "home", label: "Home", icon: Home },
    { key: "chat", label: "Chat", icon: MessageSquareText },
    { key: "dev", label: "Dev Mode", icon: Code2 },
    { key: "visual", label: "Visual Mode", icon: Camera },
    { key: "live", label: "Live Mode", icon: Radio },
  ] as const;

  return (
    <Sidebar className="bg-background/70 backdrop-blur-md border-r">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
          <Avatar>
            <AvatarFallback>JQ</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold truncate">Jarvis Quantum AI</div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
              AI Online
            </div>
          </div>
        </div>
        <SidebarInput placeholder="Search chats" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tabs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map((t) => (
                <SidebarMenuItem key={t.key}>
                  <Button
                    variant={state.selectedTab === t.key ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      if (t.key === "live") {
                        navigate("/live");
                      } else {
                        setState((s) => ({ ...s, selectedTab: t.key as any }));
                      }
                    }}
                  >
                    <t.icon className="h-4 w-4 mr-2" />
                    {t.label}
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            Past Chats
            <Button size="sm" variant="ghost" onClick={startNewChat}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-1">
              {state.pastChats.map((c) => (
                <Button key={c.id} variant={state.currentChatId === c.id ? "secondary" : "ghost"} className="w-full justify-start"
                  onClick={() => setState((s) => ({ ...s, currentChatId: c.id, selectedTab: "chat" }))}
                >
                  <MessageSquareText className="h-4 w-4 mr-2" />
                  <div className="flex-1 text-left truncate">
                    <div className="truncate">{c.title || "Untitled"}</div>
                    <div className="text-xs text-muted-foreground truncate">{c.lastMessage || "No messages yet"}</div>
                  </div>
                  <Badge variant="secondary" className="ml-2">{new Date(c.lastUpdatedAt).toLocaleTimeString()}</Badge>
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between px-2 py-2">
          <div className="text-xs text-muted-foreground">Profile • Connected</div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function EdgeSwipeListener() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();
  const startX = React.useRef<number | null>(null);
  const direction = React.useRef<"open" | "close" | null>(null);

  React.useEffect(() => {
    const onStart = (e: TouchEvent) => {
      if (!isMobile) return;
      const x = e.touches[0]?.clientX ?? 0;
      if (x <= 25) {
        startX.current = x;
        direction.current = "open";
      } else if (openMobile) {
        startX.current = x;
        direction.current = "close";
      } else {
        startX.current = null;
        direction.current = null;
      }
    };
    const onMove = (e: TouchEvent) => {
      if (!isMobile) return;
      if (startX.current == null || !direction.current) return;
      const x = e.touches[0]?.clientX ?? 0;
      const delta = x - startX.current;
      if (direction.current === "open" && delta > 40) {
        setOpenMobile(true);
        startX.current = null;
        direction.current = null;
      }
      if (direction.current === "close" && delta < -40) {
        setOpenMobile(false);
        startX.current = null;
        direction.current = null;
      }
    };
    const onEnd = () => { startX.current = null; direction.current = null; };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isMobile, openMobile, setOpenMobile]);

  return null;
}

export default function JarvisShell() {
  const { state } = useJarvis();
  React.useEffect(() => {
    document.title = "Jarvis Quantum AI — Assistant";
    const el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute("content", "Futuristic neon-glass AI assistant chat interface.");
  }, []);
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <EdgeSwipeListener />
        <div className="flex w-full min-h-screen">
          <JarvisSidebarInner />
          <main className="flex-1 relative">
            {state.selectedTab === "dev" ? (
              <DevModeTab />
            ) : state.selectedTab === "visual" ? (
              <VisualModeTab />
            ) : state.selectedTab === "home" ? (
              <HomeTab />
            ) : (
              <ChatScreen />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
