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
    "fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/85 backdrop-blur-2xl border-t border-slate-200/50 dark:border-white/5 pb-safe pt-2.5 select-none touch-none";

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
                            className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 active:scale-95 transition-transform duration-100"
                        >
                            <Icon
                                size={22}
                                strokeWidth={active ? 2.4 : 1.7}
                                className={active
                                    ? "text-indigo-600 dark:text-white fill-indigo-500/10 dark:fill-white/10"
                                    : "text-slate-400 dark:text-slate-500 fill-transparent"
                                }
                            />
                            <span
                                className={`text-[10px] font-medium leading-tight h-4 flex items-center ${active
                                    ? "text-indigo-600 dark:text-white"
                                    : "text-slate-400 dark:text-slate-500"
                                    }`}
                            >
                                {label}
                            </span>
                            {active && (
                                <div className="w-4 h-0.5 rounded-full bg-indigo-500 dark:bg-white mt-0.5" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
