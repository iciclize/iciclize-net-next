"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    iframely?: {
      load: () => void;
    };
  }
}

export function IframelyScript() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let attempts = 0;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      if (window.iframely?.load) {
        window.iframely.load();
        if (attempts >= 3) {
          window.clearInterval(intervalId);
        }
      } else if (attempts >= 20) {
        window.clearInterval(intervalId);
      }
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [pathname]);

  return null;
}
