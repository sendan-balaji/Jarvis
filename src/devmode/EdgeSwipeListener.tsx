import * as React from "react";
import { useSidebar } from "@/components/ui/sidebar";

export default function EdgeSwipeListener() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();
  const startX = React.useRef<number | null>(null);
  const direction = React.useRef<"open" | "close" | null>(null);

  React.useEffect(() => {
    const onStart = (e: TouchEvent) => {
      if (!isMobile) return;
      const x = e.touches[0]?.clientX ?? 0;
      const vw = window.innerWidth;
      // Detect from very left edge to open
      if (x <= 25) {
        startX.current = x;
        direction.current = "open";
      }
      // Allow closing from anywhere with right-to-left swipe when open
      else if (openMobile) {
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

    const onEnd = () => {
      startX.current = null;
      direction.current = null;
    };

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
