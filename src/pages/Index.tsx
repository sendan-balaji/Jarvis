
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { MessageSquareText, Eye, Zap } from "lucide-react";
import { JarvisProvider } from "@/jarvis/JarvisProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import EdgeSwipeListener from "@/components/EdgeSwipeListener";

export default function Index() {
  React.useEffect(() => {
    document.title = "AI Builder — Create apps with AI";
    const el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute("content", "AI-powered web application builder. Chat with AI to create amazing apps.");
  }, []);

  return (
    <JarvisProvider>
      <SidebarProvider>
        <EdgeSwipeListener />
        <div className="min-h-screen w-full bg-background flex">
          <AppSidebar />
          <main className="flex-1 bg-gradient-to-br from-background via-background to-background/80">
            <header className="flex items-center justify-between px-6 py-4 border-b bg-background/80 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow" aria-hidden>
                  <span className="text-primary-foreground font-bold text-sm">A</span>
                </div>
                <span className="font-semibold text-lg">AI Builder</span>
              </div>
              <nav className="flex items-center gap-4">
                <Link to="/live" className="text-sm text-muted-foreground hover:text-foreground">Live</Link>
                <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
                <Link 
                  to="/app" 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </Link>
                <ThemeToggle />
              </nav>
            </header>

            <section className="relative">
              {/* Soft radial gradients using design tokens */}
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-10 h-[38rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
                <div className="absolute left-1/3 top-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
              </div>

              <div className="container mx-auto px-6 py-20 text-center max-w-4xl">
                <div className="mb-8">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-6">
                    Build something Lovable
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Create apps and websites by chatting with AI. No coding required.
                  </p>
                </div>

                <div className="mb-12">
                  <Link
                    to="/app"
                    className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl text-lg font-medium hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                  >
                    Start Building
                  </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                  <div className="p-6 rounded-2xl border bg-card/50">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                      <MessageSquareText className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Chat with AI</h3>
                    <p className="text-sm text-muted-foreground">Describe your app idea and watch it come to life</p>
                  </div>
                  <div className="p-6 rounded-2xl border bg-card/50">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Live Preview</h3>
                    <p className="text-sm text-muted-foreground">See changes instantly as you build</p>
                  </div>
                  <div className="p-6 rounded-2xl border bg-card/50">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Deploy Fast</h3>
                    <p className="text-sm text-muted-foreground">Launch your app with a single click</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </SidebarProvider>
    </JarvisProvider>
  );
}

