"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Apple, Play, Sparkles, Shield, Heart, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { HomeBeadScene } from "@/components/home/HomeBeadScene";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 flex flex-col relative overflow-hidden font-sans select-none selection:bg-blue-500/30">

      {/* ── BACKGROUND ORCHESTRATION ────────────────── */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(15,23,42,1)_0%,_rgba(2,4,10,1)_100%)]">
        {/* Animated Nebulas */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-900/20 blur-[130px]"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/15 blur-[110px]"
        />

        {/* Sparkling Stars Field */}
        <div className="absolute inset-0 z-0">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: Math.random() }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
              className="absolute w-[1px] h-[1px] bg-white rounded-full shadow-[0_0_3px_white]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* ── NAVIGATION ──────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-transparent backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg glass-premium flex items-center justify-center border border-white/10 shadow-lg shadow-blue-500/10">
            <Sparkles size={18} className="text-blue-400" />
          </div>
          <span className="font-extrabold text-lg tracking-tight">Chapelet <span className="text-blue-500">Digital</span></span>
        </motion.div>

        <div className="flex items-center gap-6">
          <Link href="/support" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Support</Link>
          <Link href="/app" className="px-5 py-2 rounded-full glass-premium-accent text-sm font-bold border border-white/20 hover:scale-105 transition-all">
            Essayer
          </Link>
        </div>
      </nav>

      <main className="relative z-10 pt-20">

        {/* ── HERO SECTION ──────────────────────────── */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 relative">

          <motion.div
            style={{ opacity, scale }}
            className="flex flex-col items-center text-center max-w-4xl z-20 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-4">
                Sublimez votre <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">Dhikr</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                Une immersion spirituelle d'exception. Redécouvrez le Tesbih à travers un design épuré et une technologie de pointe.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <Link
                href="https://apps.apple.com/app/id6759517890"
                className="group relative flex items-center justify-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
              >
                <Apple size={22} fill="currentColor" />
                <span>Télécharger</span>
              </Link>
              <Link
                href="/app"
                className="group flex items-center justify-center gap-2 glass-iridescent px-8 py-4 rounded-2xl font-bold text-lg border border-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <span>Démarrer</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* 3D Scene - Rosary */}
          <div className="absolute inset-0 w-full h-full -z-10 text-center">
            <HomeBeadScene cameraY={0.5} />
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
          >
            <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-slate-500 rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* ── FEATURES SECTION ──────────────────────── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="text-emerald-400" />}
              title="Confidentialité Totale"
              desc="Aucune donnée collectée. Vos invocations restent entre vous et Dieu."
            />
            <FeatureCard
              icon={<Zap className="text-indigo-400" />}
              title="Fluidité Absolue"
              desc="Optimisé pour chaque geste, avec retours haptiques d'une précision chirurgicale."
            />
            <FeatureCard
              icon={<Heart className="text-pink-400" />}
              title="Design Zen"
              desc="Une interface épurée pensée pour éliminer les distractions et favoriser la concentration."
            />
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────── */}
        <footer className="py-12 border-t border-white/5 bg-black/30 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-slate-100">Chapelet Digital</p>
              <p className="text-xs text-slate-500">© 2024 - Fait avec paix par Cheikh.</p>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Conditions</Link>
              <Link href="/support" className="hover:text-white transition-colors">Aide</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-premium p-8 rounded-3xl border border-white/5 space-y-4 hover:border-white/10 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        {desc}
      </p>
    </motion.div>
  );
}
