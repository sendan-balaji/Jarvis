import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Plus, Image as ImageIcon, Globe, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JarvisProvider } from "@/jarvis/JarvisProvider";
import ChatScreen from "@/jarvis/screens/ChatScreen";

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

export default function DevModePage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"chat" | "preview">("chat");
  const [showTabs, setShowTabs] = React.useState(false);

  React.useEffect(() => {
    document.title = "Dev Mode — Build with AI";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Build apps by chatting with AI. Try the Dev prompt and jump into chat + preview.");
    // Canonical tag for SEO
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);
  }, []);

  const handleSend = () => {
    setShowTabs(true);
  };

  if (showTabs) {
    return (
      <JarvisProvider>
        <div className="min-h-screen w-full bg-background">
          <header className="flex items-center justify-between px-4 py-3 border-b bg-background/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div aria-hidden className="h-5 w-5 rounded-md bg-gradient-to-br from-pink-500 to-orange-400" />
              <span className="text-sm font-semibold">Lovable</span>
            </div>
            <nav className="text-sm text-muted-foreground">
              <button onClick={() => navigate("/app")} className="hover:text-foreground transition-colors">Open App</button>
            </nav>
          </header>

          {/* Desktop Layout */}
          <div className="hidden md:block h-screen">
            <div className="grid grid-cols-2 gap-4 p-4 h-full">
              <div className="h-full">
                <ChatScreen />
              </div>
              <div className="h-full">
                <PreviewPanel />
              </div>
            </div>
          </div>

          {/* Mobile Layout with Bottom Tabs */}
          <div className="md:hidden h-screen flex flex-col">
            <div className="flex-1 overflow-hidden">
              {activeTab === "chat" ? <ChatScreen /> : <PreviewPanel />}
            </div>
            
            {/* Bottom Navigation */}
            <nav className="border-t bg-background/80 backdrop-blur-md p-4">
              <div className="flex justify-center gap-8">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                    activeTab === "chat" 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-sm font-medium">Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                    activeTab === "preview" 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-sm font-medium">Preview</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </JarvisProvider>
    );
  }

  return (
    <div className="min-h-screen w-full hero-gradient">
      <header className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-2">
          <div aria-hidden className="h-5 w-5 rounded-md bg-gradient-to-br from-pink-500 to-orange-400" />
          <span className="text-sm font-semibold">Lovable</span>
        </div>
        <nav className="text-sm text-muted-foreground">
          <button onClick={() => navigate("/app")} className="hover:text-foreground transition-colors">Open App</button>
        </nav>
      </header>

      <main className="px-4 md:px-8 pt-12 md:pt-24">
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Build something Lovable</h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">Create apps and websites by chatting with AI</p>

          {/* Prompt bar */}
          <article className="mt-6 md:mt-10 rounded-3xl border bg-background/80 backdrop-blur-md shadow-xl ring-1 ring-primary/20 p-3 md:p-4">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" aria-label="New" className="rounded-full h-10 w-10">
                <Plus className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Add media" className="rounded-full h-10 w-10">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Browse" className="rounded-full h-10 w-10">
                <Globe className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Boost" className="rounded-full h-10 w-10">
                <Zap className="h-5 w-5" />
              </Button>

              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Ask Lovable to create a blog about..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base"
                aria-label="Dev prompt"
              />

              <Button onClick={handleSend} size="icon" className="rounded-full h-11 w-11" aria-label="Send">
                <ArrowUp className="h-5 w-5" />
              </Button>
            </div>
          </article>
        </section>
      </main>

      <footer className="h-10" />
    </div>
  );
}
