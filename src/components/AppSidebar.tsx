import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";
import { Grid3X3, Search, Edit } from "lucide-react";
import { useJarvis } from "@/jarvis/JarvisProvider";
import { Link, useNavigate } from "react-router-dom";

const navigationItems = [
  { icon: Grid3X3, label: "Dev Mode", action: "devmode" },
];

export default function AppSidebar() {
  const { state, setState, startNewChat } = useJarvis();
  const navigate = useNavigate();

  const handleNavigation = (action: string) => {
    switch (action) {
      case "newChat":
        navigate("/dev");
        break;
      case "devmode":
        navigate("/dev");
        break;
      default:
        break;
    }
  };

  return (
    <Sidebar className="bg-background border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div 
            className="flex items-center gap-2 p-2 rounded-lg border bg-background hover:bg-muted/50 cursor-pointer w-full"
            onClick={() => navigate("/dev")}
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search</span>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="p-2"
            onClick={() => navigate("/dev")}
          >
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
        <Link
          to="/user"
          className="flex items-center gap-3 p-2 rounded-lg border bg-background hover:bg-muted/50 transition-colors"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">User</div>
            <div className="text-xs text-muted-foreground">Free Plan</div>
          </div>
          <ThemeToggle />
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
