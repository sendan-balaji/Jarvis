import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Plus, Image as ImageIcon, Globe, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DevModePage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = React.useState("");

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
    navigate("/app", { state: { fromDevPrompt: prompt } });
  };

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
