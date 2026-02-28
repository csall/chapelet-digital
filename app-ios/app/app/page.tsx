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
  ChevronRight,
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
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * f)},${Math.round(g * f)},${Math.round(b * f)})`;
}

/**
 * Teardrop curve — bout (pendant) en HAUT, boucle de perles en bas.
 * t=0 / t=1 → sommet (jonction avec l'imame)
 * t=0.5     → bas de la boucle (point le plus bas)
 * Forme naturelle : plus étroit en haut, plus large et arrondi en bas.
 */
function teardropPt(t: number, cx: number, junctionY: number, rW: number, rH: number) {
  const a = t * Math.PI * 2;
  const rx = rW * (1 + 0.3 * Math.sin(a / 2));
  const ry = rH * (0.8 + 0.4 * Math.sin(a / 2));
  return {
    x: cx + Math.sin(a) * rx,
    y: junctionY + (1 - Math.cos(a)) * ry,
  };
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
  // Canvas
  const W = 280, H = 350;
  const cx = 140;

  // Imame (pendant) en haut
  const lr = 12;             // rayon imame
  const imaY = 62;           // centre imame
  const junctionY = imaY + lr + 2; // jonction corde = bas imame

  // Forme teardrop — ovale (plus haut que large)
  const rW = 50, rH = 110;

  const colorDark = useMemo(() => darkenHex(color), [color]);

  // Positions des perles le long de la courbe
  const beads = useMemo(() => {
    return Array.from({ length: total }, (_, i) => {
      const t = (i + 0.5) / total; // décalage pour éviter la jonction exacte
      const pt = teardropPt(t, cx, junctionY, rW, rH);
      const isMarker =
        total === 33
          ? i === 10 || i === 21
          : total > 9 && (
            i === Math.floor(total / 3) - 1 ||
            i === Math.floor((2 * total) / 3) - 1
          );
      return { ...pt, isMarker, done: i < count, key: `${i}` };
    });
  }, [total, count, junctionY]);

  // Polyline de la corde (boucle teardrop)
  const cordPoints = useMemo(() => {
    return Array.from({ length: 101 }, (_, i) => {
      const pt = teardropPt(i / 100, cx, junctionY, rW, rH);
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    }).join(" ");
  }, [junctionY]);

  // Centre du glow ambiant (milieu de la boucle)
  const glowCY = junctionY + rH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="sc-done" cx="36%" cy="27%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.65" />
          <stop offset="22%" stopColor={color} />
          <stop offset="100%" stopColor={colorDark} />
        </radialGradient>
        <radialGradient id="sc-idle" cx="36%" cy="27%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.18" />
          <stop offset="38%" stopColor="#18243e" />
          <stop offset="100%" stopColor="#060c18" />
        </radialGradient>
        <radialGradient id="sc-mark" cx="36%" cy="27%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.75" />
          <stop offset="28%" stopColor="#7b8fae" />
          <stop offset="100%" stopColor="#1a2236" />
        </radialGradient>
        <radialGradient id="sc-lead" cx="36%" cy="27%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="28%" stopColor="#2c3d62" />
          <stop offset="100%" stopColor="#080e1e" />
        </radialGradient>
        <filter id="sc-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="black" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* ── Glow ambiant (quand il y a de la progression) ── */}
      {count > 0 && (
        <ellipse
          cx={cx} cy={glowCY}
          rx={rW + 18} ry={rH + 12}
          fill="none" stroke={color} strokeWidth="34" opacity="0.05"
        />
      )}

      {/* ── Cordon (boucle teardrop) ── */}
      <polyline
        points={cordPoints}
        fill="none"
        stroke={color} strokeOpacity="0.35"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* ── Cordon : tige entre imame et jonction ── */}
      <line
        x1={cx} y1={imaY + lr}
        x2={cx} y2={junctionY}
        stroke={color} strokeOpacity="0.6"
        strokeWidth="1.8"
      />

      {/* ── Cordon : tige au-dessus de l'imame ── */}
      <line
        x1={cx} y1={imaY - lr}
        x2={cx} y2={imaY - lr - 10}
        stroke={color} strokeOpacity="0.6"
        strokeWidth="1.8"
      />

      {/* ── Anneau de retenue ── */}
      <circle
        cx={cx} cy={imaY - lr - 14}
        r={5}
        fill="none"
        stroke={color} strokeOpacity="0.55"
        strokeWidth="1.8"
      />

      {/* ── Touffe (vers le haut, au-dessus de l'anneau) ── */}
      {([[-9, -18], [-3, -21], [3, -20], [9, -17]] as const).map(([dx, dy]) => (
        <line
          key={dx}
          x1={cx + dx * 0.3} y1={imaY - lr - 14}
          x2={cx + dx} y2={imaY - lr - 14 + dy}
          stroke={color} strokeOpacity="0.4"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ))}

      {/* ── Imame (perle principale, en haut) ── */}
      <ellipse
        cx={cx + 2} cy={imaY + lr * 0.5 + 2}
        rx={lr} ry={lr * 0.5}
        fill="black" opacity="0.32"
      />
      <circle cx={cx} cy={imaY} r={lr} fill="url(#sc-done)" filter="url(#sc-shadow)" />
      <circle cx={cx - lr * 0.32} cy={imaY - lr * 0.36} r={lr * 0.28} fill="white" opacity="0.48" />
      <circle cx={cx - lr * 0.58} cy={imaY - lr * 0.55} r={lr * 0.1} fill="white" opacity="0.72" />

      {/* ── Perles ── */}
      {beads.map((b) => {
        const r = b.isMarker ? 9.5 : 7;
        let gradId: string;
        if (b.isMarker) gradId = "sc-mark";
        else if (b.done) gradId = "sc-done";
        else gradId = "sc-idle";

        let specularOpacity: number;
        if (b.done) specularOpacity = 0.52;
        else if (b.isMarker) specularOpacity = 0.58;
        else specularOpacity = 0.2;

        let sparkOpacity: number;
        if (b.done) sparkOpacity = 0.88;
        else if (b.isMarker) sparkOpacity = 0.82;
        else sparkOpacity = 0.32;

        return (
          <g key={b.key}>
            {/* Halo de progression */}
            {b.done && !b.isMarker && (
              <circle cx={b.x} cy={b.y} r={r + 5} fill={color} opacity={0.18} />
            )}
            {/* Ombre portée */}
            <ellipse
              cx={b.x + 1.5} cy={b.y + 2.5}
              rx={r} ry={r * 0.5}
              fill="black" opacity={b.done ? 0.45 : 0.25}
            />
            {/* Corps de la perle */}
            <circle
              cx={b.x} cy={b.y} r={r}
              fill={`url(#${gradId})`}
              opacity={b.done || b.isMarker ? 1 : 0.8}
            />
            {/* Reflet principal */}
            <circle
              cx={b.x - r * 0.3} cy={b.y - r * 0.35} r={r * 0.28}
              fill="white"
              opacity={specularOpacity}
            />
            {/* Micro-éclat */}
            <circle
              cx={b.x - r * 0.56} cy={b.y - r * 0.54} r={r * 0.1}
              fill="white"
              opacity={sparkOpacity}
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

  const handleStartFreeSession = () => {
    setFreeSession();
    router.push("/session");
  };

  if (!mounted || !hasHydrated) return <div className="min-h-screen bg-[#010208]" />;

  return (
    <div className="h-[100dvh] text-slate-100 flex flex-col relative overflow-hidden touch-none font-sans select-none">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent dark:from-indigo-950/30 dark:via-[#010208] dark:to-[#010208]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[45%] rounded-full blur-[120px] opacity-20 dark:opacity-100"
          style={{ background: `${beadColor}0a` }} />
      </div>

      <main className="flex-1 flex flex-col z-10 max-w-[390px] mx-auto w-full overflow-hidden
        pt-[calc(env(safe-area-inset-top,24px)+0.5rem)]
        pb-[calc(env(safe-area-inset-bottom,20px)+6.5rem)]
        px-5 gap-3 scroll-container select-none">

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
              <p className="text-[8px] font-black uppercase tracking-[0.5em] text-foreground/30 dark:text-white/20 leading-none mb-0.5">
                {t.home[`greeting_${greeting.key}` as keyof typeof t.home]}
              </p>
              <p className="text-xs font-light text-foreground/60 dark:text-white/60 tracking-wide">
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
                className={`px-2 py-1 rounded-[8px] text-[10px] font-black transition-all ${language === lang ? "bg-foreground/10 dark:bg-white/10 text-foreground dark:text-white" : "text-foreground/30 dark:text-white/30 hover:text-foreground/60 dark:hover:text-white/60"
                  }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </fieldset>
        </motion.div>

        {/* ── QUOTE ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="shrink-0 text-center px-3 py-4"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-400/30 dark:via-white/20 to-transparent" />
            <span className="text-slate-400 dark:text-white/30 text-xs">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-400/30 dark:via-white/20 to-transparent" />
          </div>
          <p className="text-[15px] leading-[1.9] text-foreground/85 dark:text-white/85 font-light italic px-2" style={{ letterSpacing: "0.3px" }}>
            &ldquo;{resolve(dailyQuote.text)}&rdquo;
          </p>
          <p className="text-[7px] font-black uppercase tracking-[0.5em] text-foreground/40 dark:text-white/45 mt-4 ml-1">
            — {resolve(dailyQuote.source)}
          </p>
        </motion.div>

        {/* ── CHAPELET HERO ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 min-h-0 flex items-center justify-center pb-6"
        >
          <div className="w-full max-w-[240px] aspect-square">
            <StaticChapelet
              total={20}
              count={Math.round(progress * 20)}
              color={beadColor}
            />
          </div>
        </motion.div>

        {/* ── PROGRESSION / START ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 rounded-[22px] overflow-hidden"
          style={{
            background: hasActiveSession ? `${beadColor}12` : "rgba(255,255,255,0.04)",
            border: hasActiveSession ? `1px solid ${beadColor}35` : "1px solid rgba(255,255,255,0.09)",
          }}
        >
          {hasActiveSession ? (
            <button
              onClick={() => router.push("/session")}
              className="w-full flex items-center gap-4 p-4 active:opacity-70 transition-opacity"
            >
              {/* Arc progress */}
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                  <circle
                    cx="28" cy="28" r="22" fill="none"
                    stroke={beadColor}
                    strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${progress * 138.2} 138.2`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[12px] font-black text-white tabular-nums">
                  {Math.round(progress * 100)}%
                </span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] mb-1" style={{ color: beadColor, opacity: 0.8 }}>
                  {t.home.progression}
                </p>
                <p className="text-sm text-foreground/90 dark:text-white/90 truncate font-semibold">
                  {resolve(preset?.name)}
                </p>
                <p className="text-[10px] text-foreground/45 dark:text-white/45 mt-0.5 tabular-nums">
                  {totalCount} / {preset?.totalBeads}
                </p>
              </div>
              <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${beadColor}25`, color: beadColor }}>›</div>
            </button>
          ) : (
            <button
              onClick={() => router.push("/library")}
              className="w-full py-4 text-[10px] font-black uppercase tracking-[0.35em] text-center active:opacity-70 transition-opacity"
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
          className="shrink-0 flex flex-col gap-2.5"
        >
          <button
            onClick={() => router.push("/library")}
            className="flex items-center gap-3.5 px-4 py-3.5 glass-premium rounded-[18px] active:opacity-70 transition-opacity"
          >
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{ background: `${beadColor}18`, border: `1px solid ${beadColor}35` }}>
              <Library size={18} style={{ color: beadColor }} />
            </div>
            <span className="flex-1 text-[13px] font-semibold text-foreground/80 dark:text-white/80 text-left">
              {t.home.library}
            </span>
            <ChevronRight size={16} className="text-foreground/20 dark:text-white/20 shrink-0" />
          </button>

          <button
            onClick={handleStartFreeSession}
            className="flex items-center gap-3.5 px-4 py-3.5 glass-premium rounded-[18px] active:opacity-70 transition-opacity"
          >
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{ background: `${beadColor}18`, border: `1px solid ${beadColor}35` }}>
              <InfinityIcon size={18} style={{ color: beadColor }} />
            </div>
            <span className="flex-1 text-[13px] font-semibold text-foreground/80 dark:text-white/80 text-left">
              {t.home.free}
            </span>
            <ChevronRight size={16} className="text-foreground/20 dark:text-white/20 shrink-0" />
          </button>
        </motion.div>

      </main>
    </div>
  );
}
