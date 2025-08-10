
import React from "react";
import { JarvisProvider } from "@/jarvis/JarvisProvider";
import ChatScreen from "@/jarvis/screens/ChatScreen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import EdgeSwipeListener from "@/components/EdgeSwipeListener";

function PreviewPanel() {
  return (
    <section className="h-full w-full rounded-lg border bg-background shadow-sm overflow-hidden">
      <header className="px-4 py-2 border-b text-sm text-muted-foreground bg-background">
        Preview
      </header>
      <div className="p-4">
        <div className="h-[calc(100vh-12rem)] w-full rounded-lg border-2 border-dashed border-border bg-muted/20 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <div className="text-lg font-medium mb-2">Preview</div>
            <div className="text-sm">Your app will appear here</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MainApp() {
  React.useEffect(() => {
    document.title = "AI Builder";
    const el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute("content", "AI-powered web app builder with chat and preview.");
  }, []);

  return (
    <JarvisProvider>
      <SidebarProvider>
        <EdgeSwipeListener />
        <div className="min-h-screen w-full bg-background flex">
          <AppSidebar />
          <main className="flex-1 relative">
            <header className="sticky top-0 z-10 flex items-center justify-between px-3 md:px-4 py-2 border-b bg-background/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <span className="text-sm font-medium">AI Builder</span>
              </div>
            </header>
            <div className="h-screen grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div className="h-full">
                <ChatScreen />
              </div>
              <div className="h-full hidden md:block">
                <PreviewPanel />
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </JarvisProvider>
  );
}
