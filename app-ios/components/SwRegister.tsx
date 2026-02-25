"use client";

import { useEffect } from "react";

export function SwRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    // Skip service worker in Capacitor — not supported in WKWebView
    if ((window as any).Capacitor) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(() => {/* silencieux en dev */ });
  }, []);

  return null;
}
