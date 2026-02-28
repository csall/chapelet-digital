"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, BookOpen, Settings, MoreHorizontal, type LucideIcon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { hapticLight } from "@/lib/utils/haptics";
import { useSessionStore } from "@/lib/store/sessionStore";

// ─── Static config ─────────────────────────────────────────
const NAV_ITEMS: { href: string; labelKey: string; icon: LucideIcon }[] = [
    { href: "/app", labelKey: "home", icon: LayoutDashboard },
    { href: "/session", labelKey: "session", icon: Sparkles },
    { href: "/library", labelKey: "library", icon: BookOpen },
    { href: "/preferences", labelKey: "preferences", icon: Settings },
    { href: "/about", labelKey: "infos", icon: MoreHorizontal },
];

// ─── Shared nav classes ────────────────────────────────────
const NAV_CLS =
    "fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0a0d1a]/92 backdrop-blur-2xl border-t border-slate-200/40 dark:border-white/[0.06] pb-safe pt-2 select-none touch-none";

// ─── Active path check (handles trailing slash) ────────────
function matchPath(pathname: string, href: string): boolean {
    const p = pathname.replace(/\/$/, "") || "/";
    if (href === "/") return p === "/";
    return p === href || p.startsWith(href + "/");
}

// ─── Component ─────────────────────────────────────────────
export function BottomNav() {
    const pathname = usePathname();
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);
    const hasHydrated = useSessionStore(state => state._hasHydrated);
    const beadColor = useSessionStore(state => state.beadColor);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onTap = useCallback(() => {
        hapticLight();
    }, []);

    const isReady = isMounted && hasHydrated;

    if (!isMounted) return null;
    // Do not show bottom nav on specifically excluded pages if any
    if (pathname?.startsWith("/info")) return null;

    return (
        <nav
            aria-label="Navigation principale"
            className={NAV_CLS}
        >
            <div className="max-w-md mx-auto flex items-center justify-around px-2">
                {NAV_ITEMS.map((item) => {
                    const active = matchPath(pathname, item.href);
                    const Icon = item.icon;
                    const label = isReady
                        ? ((t.nav as Record<string, string>)[item.labelKey] ?? item.labelKey)
                        : ""; // Empty label during hydration to prevent mismatch

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onTap}
                            aria-label={label}
                            aria-current={active ? "page" : undefined}
                            className="relative flex flex-col items-center justify-center gap-1 min-w-[56px] py-2 active:scale-95 transition-transform duration-100"
                        >
                            {/* Pill indicator behind active icon */}
                            {active && (
                                <div
                                    className="absolute top-1 inset-x-2 h-[30px] rounded-2xl opacity-[0.13]"
                                    style={{ backgroundColor: beadColor }}
                                />
                            )}
                            <Icon
                                size={22}
                                strokeWidth={active ? 2.2 : 1.6}
                                className={active ? "relative z-10" : "text-slate-400 dark:text-slate-500"}
                                style={active ? { color: beadColor } : undefined}
                            />
                            <span
                                className={`text-[10px] font-medium leading-tight h-4 flex items-center relative z-10 ${active ? "" : "text-slate-400 dark:text-slate-500"}`}
                                style={active ? { color: beadColor } : undefined}
                            >
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
