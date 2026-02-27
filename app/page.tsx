"use client";

import { motion } from "framer-motion";
import { Apple, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-slate-50" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 text-slate-900 flex flex-col relative overflow-hidden font-sans select-none">

      {/* ── ANIMATED BACKGROUND ORBS ────────────────── */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 30, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl bg-indigo-300"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl bg-purple-300"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.2, 0.08]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-pink-200"
        />
      </div>

      {/* ── NAVBAR ─────────────────────────────────── */}
      <nav className="relative z-20 flex justify-between items-center px-6 py-4 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="font-black text-xl text-slate-900">Chapelet</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-6"
        >
          <Link href="/support" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Support
          </Link>
          <Link href="/privacy" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Privé
          </Link>
        </motion.div>
      </nav>

      <main className="flex-1 flex items-center justify-center z-10 px-3 xs:px-4 sm:px-6 py-4 xs:py-5 sm:py-6 lg:py-8">
        <div className="w-full max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-12 items-center">

            {/* ── LEFT: CONTENT ─────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 sm:gap-5 lg:gap-8"
            >
              {/* Hero Text */}
              <div className="space-y-2 sm:space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-[1.1] text-slate-900 mb-1 sm:mb-2">
                    Sublimez votre <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Dhikr</span>
                  </h1>
                  <p className="text-indigo-600 text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-widest">
                    ✦ Moderne ✦
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-slate-600 text-xs xs:text-sm sm:text-base leading-tight xs:leading-snug sm:leading-relaxed max-w-lg"
                >
                  Immersion épurée alliant technologie et spiritualité. Pratiquez sans distractions.
                </motion.p>
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-3"
              >
                <Link
                  href="https://apps.apple.com/app/id6759517890"
                  className="group relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <Apple size={18} className="hidden sm:block" />
                  <span className="relative">App Store</span>
                </Link>
                <Link
                  href="/app"
                  className="group relative overflow-hidden flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base border-2 border-slate-200 hover:border-indigo-400 transition-all hover:bg-indigo-50 active:scale-95"
                >
                  <div className="absolute inset-0 bg-indigo-400/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <Play size={16} className="hidden sm:block" fill="currentColor" />
                  <span className="relative">Essayer</span>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col gap-2 pt-2 sm:pt-3 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2 font-medium text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Premium sans pub</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>100% gratuit</span>
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: VISUAL ─────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/30 via-purple-200/20 to-pink-200/30 rounded-full blur-3xl" />

              {/* Main card */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 bg-white/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60"
              >
                <Image
                  src="/icon.png"
                  alt="Chapelet Digital"
                  width={240}
                  height={240}
                  className="w-40 sm:w-48 lg:w-60 h-40 sm:h-48 lg:h-60 rounded-xl sm:rounded-2xl shadow-xl"
                />
              </motion.div>

              {/* Floating badge 1 */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-gradient-to-br from-white to-slate-100 px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg border border-white/50"
              >
                <p className="text-[10px] sm:text-sm font-black text-indigo-600">Premium</p>
                <p className="text-[8px] sm:text-xs text-slate-600 leading-tight">Sans pub</p>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-gradient-to-br from-white to-slate-100 px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg border border-white/50"
              >
                <p className="text-[10px] sm:text-sm font-black text-purple-600">Gratuit</p>
                <p className="text-[8px] sm:text-xs text-slate-600 leading-tight">100% libre</p>
              </motion.div>

              {/* Sparkle effect */}
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-0 right-1/4 w-32 h-32 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full blur-2xl"
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
