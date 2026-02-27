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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden font-sans select-none">

      {/* ── PREMIUM LIGHT BACKGROUND ────────────────── */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] right-[-5%] w-[60%] h-[60%] rounded-full blur-[100px] bg-indigo-200"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-purple-200"
        />
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* ── NAVBAR ─────────────────────────────────── */}
      <nav className="relative z-20 flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-black text-base sm:text-lg text-slate-900">Chapelet</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 sm:gap-4"
        >
          <Link href="/support" className="text-[11px] sm:text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Support
          </Link>
          <Link href="/privacy" className="text-[11px] sm:text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Privé
          </Link>
        </motion.div>
      </nav>

      <main className="flex-1 flex flex-col z-10 max-w-6xl mx-auto w-full px-6 lg:px-8 py-4 lg:py-8">

        {/* ── HERO SECTION ─────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: Content */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-2"
              >
                Sublimez votre <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dhikr</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-indigo-600 text-xs sm:text-sm font-black uppercase tracking-[0.3em]"
              >
                Expérience spirituelle moderne
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-slate-600 leading-snug text-sm sm:text-base max-w-lg"
            >
              Une immersion épurée alliant technologie élégante et spiritualité. Pratiquez sans distractions.
            </motion.p>

            {/* ── CTAS ──────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="https://apps.apple.com/app/id6759517890"
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <Apple size={20} />
                <span>App Store</span>
              </Link>
              <Link
                href="/app"
                className="group flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold border-2 border-slate-200 transition-all hover:border-indigo-600 hover:bg-indigo-50 active:scale-95"
              >
                <Play size={18} fill="currentColor" />
                <span>Essayer</span>
              </Link>
            </motion.div>
          </motion.section>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px]"
          >
            {/* Animated bg glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl blur-2xl opacity-60" />

            {/* Icon card */}
            <div className="relative z-10 bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/icon.png" alt="Chapelet Digital" width={192} height={192} className="w-24 sm:w-32 md:w-48 h-24 sm:h-32 md:h-48 rounded-lg sm:rounded-2xl" />
              </motion.div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-6 right-6 sm:top-10 sm:right-10 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg border border-slate-100"
            >
              <p className="text-[10px] sm:text-[12px] font-black text-slate-900">Premium</p>
              <p className="text-[8px] sm:text-[10px] text-slate-500">Sans pub</p>
            </motion.div>

            <motion.div
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg border border-slate-100"
            >
              <p className="text-[10px] sm:text-[12px] font-black text-slate-900">Gratuit</p>
              <p className="text-[8px] sm:text-[10px] text-slate-500">100% libre</p>
            </motion.div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
