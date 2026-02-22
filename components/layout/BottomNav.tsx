"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, BookOpen, Settings, MoreHorizontal } from "lucide-react";
import { useState, useEffect, useCallback, memo, useRef } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { hapticLight } from "@/lib/utils/haptics";

// ─── Nav item type ─────────────────────────────────────────
type NavItem = {
    href: string;
    labelKey: "home" | "session" | "library" | "preferences" | "infos";
    icon: typeof LayoutDashboard;
};

// Static config — no translation dependency at definition time
const NAV_ITEMS: NavItem[] = [
    { href: "/", labelKey: "home", icon: LayoutDashboard },
    { href: "/session", labelKey: "session", icon: Sparkles },
    { href: "/library", labelKey: "library", icon: BookOpen },
    { href: "/preferences", labelKey: "preferences", icon: Settings },
    { href: "/infos", labelKey: "infos", icon: MoreHorizontal },
];

// Hardcoded French labels for SSR — must match the Zustand default language ('fr')
const SSR_LABELS: Record<NavItem["labelKey"], string> = {
    home: "Accueil",
    session: "Session",
    library: "Biblio",
    preferences: "Préférences",
    infos: "Infos",
};

// ─── Shared nav bar classes (content + SSR must be identical) ──
const NAV_CLASSES =
    "fixed bottom-0 left-0 right-0 z-50 bg-white/75 dark:bg-slate-950/80 backdrop-blur-2xl border-t border-slate-200/50 dark:border-white/5 pb-[env(safe-area-inset-bottom,20px)] pt-3 touch-none overscroll-none select-none";

// ─── Resolve active path (handles trailing slash) ──────────
function isPathActive(pathname: string, href: string): boolean {
    const normalized = pathname.replace(/\/$/, "") || "/";
    if (href === "/") return normalized === "/";
    return normalized.startsWith(href);
}

// ─── Single nav item (memoized — only re-renders if props change) ──
const NavItemLink = memo(function NavItemLink({
    href,
    label,
    Icon,
    isActive,
    onTap,
}: {
    href: string;
    label: string;
    Icon: typeof LayoutDashboard;
    isActive: boolean;
    onTap: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onTap}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            className="relative flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 group touch-manipulation active:scale-95 transition-transform duration-150"
        >
            <div
                className={`relative z-10 transition-colors duration-200 ${isActive
                        ? "text-indigo-600 dark:text-white"
                        : "text-slate-500 dark:text-slate-500"
                    }`}
            >
                <Icon
                    size={24}
                    strokeWidth={isActive ? 2.4 : 1.8}
                    className={
                        isActive
                            ? "fill-indigo-500/10 dark:fill-white/10"
                            : "fill-transparent"
                    }
                />
            </div>

            <span
                className={`text-[10px] font-medium leading-none transition-colors duration-200 ${isActive
                        ? "text-indigo-600 dark:text-white"
                        : "text-slate-500 dark:text-slate-500"
                    }`}
            >
                {label}
            </span>

            <div
                aria-hidden="true"
                className={`w-4 h-0.5 rounded-full transition-all duration-200 ${isActive
                        ? "bg-indigo-500 dark:bg-white opacity-100"
                        : "bg-transparent opacity-0"
                    }`}
            />
        </Link>
    );
});

// ─── Main component (NO Suspense needed — no useSearchParams) ──
export function BottomNav() {
    const pathname = usePathname();
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const mountedRef = useRef(false);

    useEffect(() => {
        // Use ref to avoid double-render in StrictMode
        if (!mountedRef.current) {
            mountedRef.current = true;
            setMounted(true);
        }
    }, []);

    const handleTap = useCallback(() => {
        hapticLight();
    }, []);

    return (
        <nav aria-label="Navigation principale" className={NAV_CLASSES}>
            <div className="max-w-md mx-auto flex items-center justify-around px-4">
                {NAV_ITEMS.map((item) => (
                    <NavItemLink
                        key={item.href}
                        href={item.href}
                        label={mounted ? t.nav[item.labelKey] : SSR_LABELS[item.labelKey]}
                        Icon={item.icon}
                        isActive={mounted ? isPathActive(pathname, item.href) : false}
                        onTap={handleTap}
                    />
                ))}
            </div>
        </nav>
    );
}
