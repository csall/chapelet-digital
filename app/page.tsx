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
import { HomeBeadScene } from "@/components/home/HomeBeadScene";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { CanvasErrorBoundary } from "@/components/ui/CanvasErrorBoundary";

/* ─── Greeting Logic ──────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours();
  // Using text-white/40 for a consistent gray look as requested
  if (h >= 5 && h < 12)
    return { key: "morning", icon: <Sunrise size={18} className="text-white/40" />, accent: "#94a3b8", glow: "rgba(255,255,255,0.1)" };
  if (h >= 12 && h < 18)
    return { key: "afternoon", icon: <Sun size={18} className="text-white/40" />, accent: "#94a3b8", glow: "rgba(255,255,255,0.1)" };
  if (h >= 18 && h < 22)
    return { key: "evening", icon: <Sunset size={18} className="text-white/40" />, accent: "#94a3b8", glow: "rgba(255,255,255,0.1)" };
  return { key: "night", icon: <Moon size={18} className="text-white/40" />, accent: "#94a3b8", glow: "rgba(255,255,255,0.1)" };
}



export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { t, resolve, language } = useTranslation();
  const hasHydrated = useSessionStore((s) => s._hasHydrated);
  const preset = useSessionStore((s) => s.preset);
  const totalCount = useSessionStore((s) => s.totalCount);
  const isComplete = useSessionStore((s) => s.isComplete);
  const setFreeSession = useSessionStore((s) => s.setFreeSession);

  useEffect(() => { setMounted(true); }, []);

  const greeting = useMemo(() => getGreeting(), []);
  const dailyQuote = useMemo(() => getRandomQuote(), []);

  const hasActiveSession = mounted && hasHydrated && preset && totalCount > 0 && !isComplete;
  const progress = hasActiveSession && preset && preset.totalBeads > 0 ? (totalCount / preset.totalBeads) : 0;

  const handleStartFreeSession = () => {
    setFreeSession();
    router.push("/session");
  };

  if (!mounted || !hasHydrated) return <div className="min-h-screen bg-[#010208]" />;

  return (
    <div className="h-[100dvh] text-slate-100 flex flex-col relative overflow-hidden touch-none font-sans select-none">
      {/* Lightweight premium CSS background — no WebGL */}
      <div className="fixed inset-0 -z-10 bg-[#010208]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-[#010208] to-rose-950/30" />
        <div className="absolute top-[-15%] right-[-10%] w-[65%] h-[65%] bg-indigo-500/[0.07] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] left-[-15%] w-[55%] h-[55%] bg-rose-500/[0.05] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-violet-500/[0.04] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>

      <main className="flex-1 px-5 pt-[calc(env(safe-area-inset-top,24px)+0.75rem)] pb-[calc(env(safe-area-inset-bottom,20px)+5.5rem)] flex flex-col z-10 max-w-[420px] mx-auto w-full h-full items-center overflow-hidden">

        {/* ── HEADER ──────────────────────────────── */}
        <div className="w-full shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-[14px] glass-premium flex items-center justify-center border border-white/10"
                animate={{
                  boxShadow: [
                    `0 0 12px ${greeting.glow}`,
                    `0 0 24px ${greeting.glow}`,
                    `0 0 12px ${greeting.glow}`,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {greeting.icon}
              </motion.div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 leading-none mb-0.5">
                  {t.home[`greeting_${greeting.key}` as keyof typeof t.home]}
                </p>
                <p className="text-sm font-light text-white/75 tracking-wide">
                  {t.home[`sub_${greeting.key}` as keyof typeof t.home]}
                </p>
              </div>
            </div>

            {/* Language toggle */}
            <div className="flex items-center p-1 rounded-[14px] glass-premium border border-white/10" role="group" aria-label="Language selection">
              <button
                onClick={() => useSessionStore.getState().setLanguage('fr')}
                aria-label="Switch to French"
                aria-pressed={language === 'fr'}
                className={`px-2 py-1 rounded-[10px] text-[10px] font-black transition-all ${language === 'fr' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
              >
                FR
              </button>
              <button
                onClick={() => useSessionStore.getState().setLanguage('en')}
                aria-label="Switch to English"
                aria-pressed={language === 'en'}
                className={`px-2 py-1 rounded-[10px] text-[10px] font-black transition-all ${language === 'en' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
              >
                EN
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── CENTRAL QUOTE AREA ────────────────────── */}
        <div className="flex-1 w-full flex flex-col items-center justify-end pb-4 min-h-0 relative">
          {/* Soft ambient glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(99,102,241,0.1) 0%, transparent 65%)"
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 w-full text-center px-6 relative z-20"
          >
            <p className="text-[17px] sm:text-[19px] leading-[1.65] text-white/75 font-light italic">
              &ldquo;{resolve(dailyQuote.text)}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-px w-6 bg-gradient-to-r from-transparent to-white/15" />
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25">
                {resolve(dailyQuote.source)}
              </span>
              <div className="h-px w-6 bg-gradient-to-l from-transparent to-white/15" />
            </div>
          </motion.div>
        </div>

        {/* ── BLOC BAS : info + actions ────────────── */}
        <div className="w-full shrink-0 flex flex-col gap-2.5 pt-3 pb-4">

          {/* Carte progression */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[22px] p-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {hasActiveSession ? (
              <div className="flex items-center gap-4">
                {/* Circular progress */}
                <div className="relative w-14 h-14 shrink-0">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                    <motion.circle
                      cx="28" cy="28" r="24" fill="none"
                      stroke="url(#progressGrad)"
                      strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={`${progress * 150.8} 150.8`}
                      initial={{ strokeDasharray: "0 150.8" }}
                      animate={{ strokeDasharray: `${progress * 150.8} 150.8` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[13px] font-black text-white tabular-nums">
                    {Math.round(progress * 100)}%
                  </span>
                </div>

                {/* Info + CTA */}
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/25 mb-1">
                    {t.home.progression}
                  </p>
                  <p className="text-xs text-white/50 truncate mb-2.5 italic">
                    &laquo;{resolve(preset?.name)}&raquo;
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/session")}
                    aria-label={`Continue session — ${Math.round(progress * 100)}% complete`}
                    className="w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-center transition-all"
                    style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}
                  >
                    {t.common.continue} →
                  </motion.button>
                </div>
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/library")}
                aria-label="Explore dhikr library"
                className="w-full py-[10px] rounded-[14px] text-[10px] font-black uppercase tracking-[0.35em] text-center"
                style={{ background: "rgba(99,102,241,0.16)", border: "1px solid rgba(99,102,241,0.24)", color: "#a5b4fc" }}
              >
                ▶&nbsp;&nbsp;{t.home.explorer}
              </motion.button>
            )}
          </motion.div>

          {/* Boutons rapides */}
          <div className="w-full grid grid-cols-2 gap-3">
            <motion.button
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.94, y: 2 }}
              onClick={() => router.push("/library")}
              aria-label="Open dhikr library"
              className="flex flex-col items-center gap-2.5 py-4 glass-premium rounded-[24px] border border-white/[0.08] relative overflow-hidden shadow-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center" aria-hidden="true">
                <Library size={18} className="text-indigo-400" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{t.home.library}</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.94, y: 2 }}
              onClick={handleStartFreeSession}
              aria-label="Start a free dhikr session"
              className="flex flex-col items-center gap-2.5 py-4 glass-premium rounded-[24px] border border-white/[0.08] relative overflow-hidden shadow-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-400/20 flex items-center justify-center">
                <InfinityIcon size={20} className="text-rose-400" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{t.home.free}</span>
            </motion.button>
          </div>

        </div>

      </main>
    </div>
  );
}
