"use client";

import { useSessionStore } from "@/lib/store/sessionStore";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  Moon,
  Sun,
  Sunrise,
  Sunset,
  Infinity as InfinityIcon,
  Library,
} from "lucide-react";
import { getRandomQuote } from "@/lib/data/quotes";
import { useTranslation } from "@/lib/hooks/useTranslation";

/* ─── Greeting ─────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12)
    return { key: "morning", icon: <Sunrise size={16} className="text-white/40" /> };
  if (h >= 12 && h < 18)
    return { key: "afternoon", icon: <Sun size={16} className="text-white/40" /> };
  if (h >= 18 && h < 22)
    return { key: "evening", icon: <Sunset size={16} className="text-white/40" /> };
  return { key: "night", icon: <Moon size={16} className="text-white/40" /> };
}

/* ─── Helpers ───────────────────────────────────────── */
function darkenHex(hex: string, f = 0.38): string {
  if (!hex.startsWith("#") || hex.length < 7) return "#0a0f20";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * f)},${Math.round(g * f)},${Math.round(b * f)})`;
}

/* ─── Static Chapelet SVG ───────────────────────────── */
function StaticChapelet({
  total = 33,
  count = 0,
  color = "#6366f1",
}: {
  readonly total?: number;
  readonly count?: number;
  readonly color?: string;
}) {
  const W = 300, H = 310;
  const cx = 150, cy = 136;
  const rx = 114, ry = 100;

  const colorDark = useMemo(() => darkenHex(color), [color]);

  const beads = useMemo(() => {
    return Array.from({ length: total }, (_, i) => {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const isMarker =
        total === 33
          ? i === 10 || i === 21
          : total > 9 && (
              i === Math.floor(total / 3) - 1 ||
              i === Math.floor((2 * total) / 3) - 1
            );
      return {
        x: cx + rx * Math.cos(angle),
        y: cy + ry * Math.sin(angle),
        isMarker,
        done: i < count,
        key: `${i}`,
      };
    });
  }, [total, count]);

  const stemY = cy + ry;
  const leaderY = stemY + 26;
  const lr = 12; // leader bead radius

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" aria-hidden="true">
      <defs>
        {/* Active/done bead — lit from top-left */}
        <radialGradient id="sc-done" cx="36%" cy="27%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.65" />
          <stop offset="22%" stopColor={color} />
          <stop offset="100%" stopColor={colorDark} />
        </radialGradient>

        {/* Inactive bead */}
        <radialGradient id="sc-idle" cx="36%" cy="27%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.18" />
          <stop offset="38%" stopColor="#18243e" />
          <stop offset="100%" stopColor="#060c18" />
        </radialGradient>

        {/* Marker bead — silver */}
        <radialGradient id="sc-mark" cx="36%" cy="27%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.75" />
          <stop offset="28%" stopColor="#7b8fae" />
          <stop offset="100%" stopColor="#1a2236" />
        </radialGradient>

        {/* Leader/tête bead */}
        <radialGradient id="sc-lead" cx="36%" cy="27%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.45" />
          <stop offset="30%" stopColor="#2c3d60" />
          <stop offset="100%" stopColor="#080e1e" />
        </radialGradient>

        {/* Soft drop-shadow filter */}
        <filter id="sc-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="black" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* ── Ambient glow when there's progress ── */}
      {count > 0 && (
        <ellipse
          cx={cx} cy={cy} rx={rx + 20} ry={ry + 20}
          fill="none" stroke={color} strokeWidth="32" opacity="0.05"
        />
      )}

      {/* ── Cord ── */}
      <ellipse
        cx={cx} cy={cy} rx={rx} ry={ry}
        fill="none"
        stroke="rgba(180,160,120,0.18)"
        strokeWidth="2"
      />

      {/* ── Pendant stem ── */}
      <line
        x1={cx} y1={stemY}
        x2={cx} y2={leaderY - lr}
        stroke="rgba(180,160,120,0.18)"
        strokeWidth="2"
      />

      {/* ── Leader bead ── */}
      <ellipse cx={cx + 2} cy={leaderY + 4} rx={lr} ry={lr * 0.5} fill="black" opacity="0.35" />
      <circle cx={cx} cy={leaderY} r={lr} fill="url(#sc-lead)" filter="url(#sc-shadow)" />
      {/* Main specular */}
      <circle cx={cx - lr * 0.32} cy={leaderY - lr * 0.35} r={lr * 0.28} fill="white" opacity="0.45" />
      {/* Micro sparkle */}
      <circle cx={cx - lr * 0.58} cy={leaderY - lr * 0.55} r={lr * 0.1} fill="white" opacity="0.7" />

      {/* ── Tassel ── */}
      {([[-9, 18], [-3, 21], [3, 20], [9, 17]] as const).map(([dx, dy]) => (
        <line
          key={dx}
          x1={cx + dx * 0.4} y1={leaderY + lr}
          x2={cx + dx} y2={leaderY + lr + dy}
          stroke="rgba(200,180,140,0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}

      {/* ── Beads ── */}
      {beads.map((b) => {
        const r = b.isMarker ? 9.5 : 7;
        const gradId = b.isMarker ? "sc-mark" : b.done ? "sc-done" : "sc-idle";
        const glowOpacity = b.done && !b.isMarker ? 0.2 : 0;

        return (
          <g key={b.key}>
            {/* Done glow halo */}
            {glowOpacity > 0 && (
              <circle cx={b.x} cy={b.y} r={r + 5} fill={color} opacity={glowOpacity} />
            )}

            {/* Drop shadow */}
            <ellipse
              cx={b.x + 1.5} cy={b.y + 2.5}
              rx={r} ry={r * 0.5}
              fill="black" opacity={b.done ? 0.45 : 0.28}
            />

            {/* Bead body */}
            <circle
              cx={b.x} cy={b.y} r={r}
              fill={`url(#${gradId})`}
              opacity={b.done || b.isMarker ? 1 : 0.82}
            />

            {/* Main specular */}
            <circle
              cx={b.x - r * 0.3}
              cy={b.y - r * 0.35}
              r={r * 0.28}
              fill="white"
              opacity={b.done ? 0.5 : b.isMarker ? 0.55 : 0.22}
            />

            {/* Micro sparkle */}
            <circle
              cx={b.x - r * 0.56}
              cy={b.y - r * 0.54}
              r={r * 0.1}
              fill="white"
              opacity={b.done ? 0.85 : b.isMarker ? 0.8 : 0.35}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Page ──────────────────────────────────────────── */
export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { t, resolve, language } = useTranslation();
  const hasHydrated = useSessionStore((s) => s._hasHydrated);
  const preset = useSessionStore((s) => s.preset);
  const totalCount = useSessionStore((s) => s.totalCount);
  const isComplete = useSessionStore((s) => s.isComplete);
  const beadColor = useSessionStore((s) => s.beadColor);
  const setFreeSession = useSessionStore((s) => s.setFreeSession);

  useEffect(() => { setMounted(true); }, []);

  const greeting = useMemo(() => getGreeting(), []);
  const dailyQuote = useMemo(() => getRandomQuote(), []);

  const hasActiveSession = mounted && hasHydrated && preset && totalCount > 0 && !isComplete;
  const progress = hasActiveSession && preset && preset.totalBeads > 0
    ? (totalCount / preset.totalBeads)
    : 0;

  const chapeletTotal = preset?.totalBeads ?? 33;
  const chapeletCount = hasActiveSession ? totalCount : 0;

  const handleStartFreeSession = () => {
    setFreeSession();
    router.push("/session");
  };

  if (!mounted || !hasHydrated) return <div className="min-h-screen bg-[#010208]" />;

  return (
    <div className="h-[100dvh] text-slate-100 flex flex-col relative overflow-hidden touch-none font-sans select-none">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[#010208]">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-[#010208] to-[#010208]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[45%] rounded-full blur-[120px]"
          style={{ background: `${beadColor}0a` }} />
      </div>

      <main className="flex-1 flex flex-col z-10 max-w-[390px] mx-auto w-full overflow-hidden
        pt-[calc(env(safe-area-inset-top,24px)+0.5rem)]
        pb-[calc(env(safe-area-inset-bottom,20px)+5.5rem)]
        px-5 gap-3">

        {/* ── HEADER ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] glass-premium flex items-center justify-center">
              {greeting.icon}
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20 leading-none mb-0.5">
                {t.home[`greeting_${greeting.key}` as keyof typeof t.home]}
              </p>
              <p className="text-xs font-light text-white/60 tracking-wide">
                {t.home[`sub_${greeting.key}` as keyof typeof t.home]}
              </p>
            </div>
          </div>

          <fieldset className="flex items-center p-1 rounded-[12px] glass-premium">
            <legend className="sr-only">Language</legend>
            {(["fr", "en"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => useSessionStore.getState().setLanguage(lang)}
                aria-label={`Switch to ${lang.toUpperCase()}`}
                aria-pressed={language === lang}
                className={`px-2 py-1 rounded-[8px] text-[10px] font-black transition-all ${
                  language === lang ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </fieldset>
        </motion.div>

        {/* ── CHAPELET HERO ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 min-h-0 flex items-center justify-center"
        >
          <div className="w-full max-w-[300px] aspect-square">
            <StaticChapelet
              total={chapeletTotal}
              count={chapeletCount}
              color={beadColor}
            />
          </div>
        </motion.div>

        {/* ── QUOTE ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="shrink-0 text-center px-3"
        >
          <p className="text-[13px] leading-[1.65] text-white/50 font-light italic">
            &ldquo;{resolve(dailyQuote.text)}&rdquo;
          </p>
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mt-2">
            {resolve(dailyQuote.source)}
          </p>
        </motion.div>

        {/* ── PROGRESSION / START ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 rounded-[22px] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {hasActiveSession ? (
            <button
              onClick={() => router.push("/session")}
              className="w-full flex items-center gap-4 p-4 active:opacity-80 transition-opacity"
            >
              {/* Arc progress */}
              <div className="relative w-14 h-14 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="23" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <circle
                    cx="28" cy="28" r="23" fill="none"
                    stroke={beadColor}
                    strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${progress * 144.5} 144.5`}
                    opacity="0.8"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-white tabular-nums">
                  {Math.round(progress * 100)}%
                </span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/25 mb-1">
                  {t.home.progression}
                </p>
                <p className="text-sm text-white/70 truncate font-medium">
                  {resolve(preset?.name)}
                </p>
                <p className="text-[9px] text-white/30 mt-0.5">
                  {totalCount} / {preset?.totalBeads}
                </p>
              </div>
              <div className="text-white/20 text-lg pr-1">›</div>
            </button>
          ) : (
            <button
              onClick={() => router.push("/library")}
              className="w-full py-4 text-[10px] font-black uppercase tracking-[0.35em] text-center active:opacity-80 transition-opacity"
              style={{ color: "#a5b4fc" }}
            >
              ▶&nbsp;&nbsp;{t.home.explorer}
            </button>
          )}
        </motion.div>

        {/* ── QUICK ACTIONS ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => router.push("/library")}
            className="flex flex-col items-center gap-2 py-4 glass-premium rounded-[20px] active:scale-[0.96] transition-transform"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center">
              <Library size={16} className="text-indigo-400" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/35">
              {t.home.library}
            </span>
          </button>

          <button
            onClick={handleStartFreeSession}
            className="flex flex-col items-center gap-2 py-4 glass-premium rounded-[20px] active:scale-[0.96] transition-transform"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-400/20 flex items-center justify-center">
              <InfinityIcon size={18} className="text-rose-400" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/35">
              {t.home.free}
            </span>
          </button>
        </motion.div>

      </main>
    </div>
  );
}
