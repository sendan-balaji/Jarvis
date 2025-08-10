import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  Sparkles,
  Settings2,
  Database,
  Mic2,
  ShieldCheck,
  Info,
  LogOut,
  ArrowLeft,
} from "lucide-react";

export default function UserSettings() {
  React.useEffect(() => {
    document.title = "User Settings — AI Builder";
    const el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute("content", "Manage your profile, security, and preferences.");
    // canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, []);

  const Item = ({ icon: Icon, title, to, tone }: { icon: any; title: string; to?: string; tone?: "danger" }) => {
    const Cmp = to ? Link : ("div" as any);
    return (
      <Cmp
        to={to as any}
        className={`flex items-center gap-3 px-3 py-3 rounded-md border bg-card hover:bg-muted/40 transition-colors ${
          tone === "danger" ? "text-destructive" : ""
        }`}
      >
        <Icon className={`h-5 w-5 ${tone === "danger" ? "text-destructive" : "text-muted-foreground"}`} />
        <span className="text-sm font-medium">{title}</span>
      </Cmp>
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Link to="/app" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
        <h1 className="text-base font-semibold">Settings</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      <section className="container mx-auto max-w-lg px-4 py-6 space-y-4">
        <article className="rounded-xl border bg-background/70 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10"><AvatarFallback>U</AvatarFallback></Avatar>
            <div className="min-w-0">
              <div className="font-semibold">User</div>
              <div className="text-xs text-muted-foreground">Free Plan</div>
            </div>
          </div>
        </article>

        <nav className="space-y-2" aria-label="Settings navigation">
          <Item icon={Mail} title="Email" />
          <Item icon={Sparkles} title="Upgrade to Plus" />
          <Item icon={Settings2} title="Personalization" />
          <Item icon={Database} title="Data Controls" />
          <Item icon={Mic2} title="Voice" />
          <Item icon={ShieldCheck} title="Security" />
          <Item icon={Info} title="About" />
          <Item icon={LogOut} title="Sign out" tone="danger" />
        </nav>
      </section>

      {/* Structured data for SEO */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "User",
          url: window.location.origin + "/user",
        })}
      </script>
    </main>
  );
}
