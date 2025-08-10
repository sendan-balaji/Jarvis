import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/ThemeToggle";
import { useNavigate, Link } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  React.useEffect(() => {
    document.title = "Clonable — Sign in";
    const el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute("content", "Authenticate to access Clonable app builder.");
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-4 py-3 border-b bg-background/60 backdrop-blur-md">
        <Link to="/" className="font-semibold">Clonable</Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      <section className="container mx-auto max-w-md px-4 py-12">
        <div className="rounded-2xl border bg-background/70 backdrop-blur-md ring-2 ring-primary/30 p-6 shadow">
          <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-6">Sign in to continue</p>
          <div className="space-y-4">
            <div>
              <label className="text-sm">Email</label>
              <Input type="email" placeholder="you@example.com" className="mt-1" />
            </div>
            <div>
              <label className="text-sm">Password</label>
              <Input type="password" placeholder="••••••••" className="mt-1" />
            </div>
            <Button className="w-full" onClick={() => navigate("/app")}>Continue</Button>
          </div>
          <div className="mt-6 text-xs text-muted-foreground">Demo only — no server required</div>
        </div>
      </section>
    </main>
  );
}
