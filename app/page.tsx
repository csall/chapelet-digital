"use client";

import { motion } from "framer-motion";
import { Apple, Zap, Library, Languages, ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-slate-50" />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden font-sans select-none">

      {/* ── PREMIUM LIGHT BACKGROUND ────────────────── */}
      <div className="fixed inset-0 -z-10 bg-[#f8fafc] overflow-hidden">
        {/* Soft Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[100px] bg-indigo-100"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-purple-100"
        />

        {/* Subtle Grain */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <main className="flex-1 flex flex-col z-10 max-w-[500px] mx-auto w-full px-6 pt-10 pb-16 gap-6">

        {/* ── HERO SECTION ───────────────────────── */}
        <section className="flex flex-col items-center text-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.8
            }}
            className="w-24 h-24 rounded-[28px] bg-white flex items-center justify-center relative shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden mb-1"
          >
            <img src="/icon.png" alt="Chapelet Digital Icon" className="w-full h-full object-cover relative z-10" />
            <motion.div
              animate={{ x: ['-200%', '200%'], opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-20"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Chapelet Digital
            </h1>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.5em]">
              Sublimez votre dhikr
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-slate-500 leading-relaxed font-medium text-pretty text-[13px] max-w-xs"
          >
            Une immersion spirituelle moderne. Alliant esthétique raffinée et sérénité algorithmique pour une pratique quotidienne épurée.
          </motion.p>
        </section>

        {/* ── CTAS ─────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* PRIMARY CTA - APP STORE */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-[28px] opacity-50" />

            <Link
              href="https://apps.apple.com/app/id6759517890"
              className="relative flex items-center justify-between gap-5 bg-emerald-600 text-white p-5 rounded-[28px] transition-all hover:scale-[1.02] active:scale-[0.97] shadow-[0_20px_40px_rgba(16,185,129,0.25)] overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-lg">
                  <Apple size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-bold text-emerald-100 uppercase tracking-widest leading-none mb-1">Télécharger pour iOS</p>
                  <p className="text-lg font-black leading-none tracking-tight">App Store</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pr-1">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <ChevronRight size={16} className="text-white" />
                </div>
              </div>

              {/* Button Shine Sweep */}
              <motion.div
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
              />
            </Link>
          </motion.div>

          {/* SECONDARY CTA - ANDROID (COMING SOON) */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.5, type: "spring" }}
          >
            <div
              className="group relative flex items-center justify-between gap-5 bg-slate-100 text-slate-400 p-5 rounded-[28px] border border-slate-200 cursor-not-allowed opacity-80"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center">
                  <Play size={22} className="opacity-40" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Android & Play Store</p>
                  <p className="text-lg font-black leading-none tracking-tight">Prochainement</p>
                </div>
              </div>
              <div className="pr-1">
                <div className="px-3 py-1 rounded-full bg-slate-200 text-[9px] font-black uppercase tracking-tighter">
                  Soon
                </div>
              </div>
            </div>
          </motion.div>

          {/* TERTIARY CTA - WEB APP */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
          >
            <Link
              href="/app"
              className="flex items-center justify-between gap-5 bg-white text-slate-900 p-5 rounded-[28px] transition-all hover:scale-[1.02] active:scale-[0.97] border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Play size={20} fill="currentColor" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Version Web</p>
                  <p className="text-lg font-black leading-none tracking-tight">Ouvrir l'App</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pr-1">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ── FEATURES GRID ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-cols-2 gap-3"
        >
          <FeatureCardSmall
            icon={<Zap size={14} className="text-amber-500" />}
            title="Réactif"
            desc="Moteur 3D fluide"
          />
          <FeatureCardSmall
            icon={<Library size={14} className="text-indigo-500" />}
            title="Complet"
            desc="Large collection"
          />
          <FeatureCardSmall
            icon={<Languages size={14} className="text-emerald-500" />}
            title="Bilingue"
            desc="FR / EN natif"
          />
          <FeatureCardSmall
            icon={<div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
            title="Zen"
            desc="Anti-distraction"
          />
        </motion.div>

        {/* ── SECONDARY TEXT ───────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="text-[9px] text-center uppercase tracking-[0.3em] font-bold text-slate-400 max-w-[240px] mx-auto leading-relaxed"
        >
          Expérience premium sans publicité ni abonnement.
        </motion.p>

      </main>

      {/* Bottom spacer */}
      <div className="h-10" />
    </div>
  );
}

function FeatureCardSmall({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-4 rounded-[22px] flex flex-col items-center text-center gap-1.5 border border-slate-100 shadow-sm">
      <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="space-y-0.5">
        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{title}</h3>
        <p className="text-[8px] text-slate-500 font-semibold truncate">{desc}</p>
      </div>
    </div>
  );
}
