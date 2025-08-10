
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
import { 
  MessageSquareText, 
  PlusCircle, 
  User, 
  Library, 
  Search,
  Edit,
  Grid3X3
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useJarvis } from "@/jarvis/JarvisProvider";
import { Link } from "react-router-dom";

const navigationItems = [
  { icon: MessageSquareText, label: "New chat", action: "newChat" },
  { icon: Library, label: "Library", action: "library" },
  { icon: Grid3X3, label: "GPTs", action: "gpts" },
  { icon: MessageSquareText, label: "Chats", action: "chats" },
];

export default function AppSidebar() {
  const { state, setState, startNewChat } = useJarvis();

  const handleNavigation = (action: string) => {
    switch (action) {
      case "newChat":
        startNewChat();
        break;
      default:
        // Handle other navigation actions
        break;
    }
  };

  return (
    <Sidebar className="bg-background border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2 p-2 rounded-lg border bg-background hover:bg-muted/50 cursor-pointer w-full">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search</span>
          </div>
          <Button size="sm" variant="ghost" className="p-2">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-1">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-10"
              onClick={() => handleNavigation(item.action)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="space-y-1 px-4">
              {state.pastChats.map((c) => (
                <Button
                  key={c.id}
                  variant={state.currentChatId === c.id ? "secondary" : "ghost"}
                  className="w-full justify-start h-auto p-2 text-left"
                  onClick={() => setState((s) => ({ ...s, currentChatId: c.id }))}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {c.title || "Untitled Chat"}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {c.lastMessage || "No messages yet"}
                    </div>
                  </div>
                  {state.currentChatId === c.id && (
                    <div className="w-2 h-2 rounded-full bg-primary ml-2" />
                  )}
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
-        <div className="flex items-center gap-3 p-2 rounded-lg border bg-background hover:bg-muted/50 cursor-pointer">
-          <Avatar className="h-8 w-8">
-            <AvatarFallback>U</AvatarFallback>
-          </Avatar>
-          <div className="flex-1 min-w-0">
-            <div className="text-sm font-medium">User</div>
-            <div className="text-xs text-muted-foreground">Free Plan</div>
-          </div>
-          <ThemeToggle />
-        </div>
+        <Link to="/user" className="flex items-center gap-3 p-2 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
+          <Avatar className="h-8 w-8">
+            <AvatarFallback>U</AvatarFallback>
+          </Avatar>
+          <div className="flex-1 min-w-0">
+            <div className="text-sm font-medium">User</div>
+            <div className="text-xs text-muted-foreground">Free Plan</div>
+          </div>
+          <ThemeToggle />
+        </Link>
       </SidebarFooter>
    </Sidebar>
  );
}
