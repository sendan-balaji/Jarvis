import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

function applyTheme(t: "light" | "dark") {
  const root = document.documentElement;
  if (t === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  localStorage.setItem("theme", t);
}

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    const saved = (localStorage.getItem("theme") as "light" | "dark" | null) ?? "dark";
    return saved;
  });

  React.useEffect(() => {
    // ensure default dark on mount
    applyTheme(theme);
  }, [theme]);

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      className="shrink-0"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
