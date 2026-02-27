"use client";

import { motion } from "framer-motion";
import { Apple, Zap, Languages, Play, Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
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
      <nav className="relative z-20 flex justify-between items-center px-6 py-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-black text-lg text-slate-900">Chapelet</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <Link href="/support" className="text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Support
          </Link>
          <Link href="/privacy" className="text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Confidentialité
          </Link>
        </motion.div>
      </nav>

      <main className="flex-1 flex flex-col z-10 max-w-6xl mx-auto w-full px-6 lg:px-8 py-8 lg:py-16">

        {/* ── HERO SECTION ─────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* Left: Content */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-3"
              >
                Sublimez votre <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dhikr</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-indigo-600 text-sm font-black uppercase tracking-[0.3em]"
              >
                Expérience spirituelle moderne
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-slate-600 leading-relaxed text-lg max-w-lg"
            >
              Une immersion épurée alliant technologie élégante et spiritualité profonde. Pratiquez votre dhikr dans une expérience sans distractions, où chaque instant compte.
            </motion.p>

            {/* ── QUICK STATS ────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex gap-6 py-6 border-t border-b border-slate-200"
            >
              <div>
                <p className="text-2xl font-black text-slate-900">33+</p>
                <p className="text-[13px] text-slate-500 font-medium">Chaplets</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">2</p>
                <p className="text-[13px] text-slate-500 font-medium">Langues</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">∞</p>
                <p className="text-[13px] text-slate-500 font-medium">Sessions</p>
              </div>
            </motion.div>

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
            className="relative hidden lg:flex items-center justify-center h-[500px]"
          >
            {/* Animated bg glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl blur-2xl opacity-60" />

            {/* Icon card */}
            <div className="relative z-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/icon.png" alt="Chapelet Digital" className="w-48 h-48 rounded-2xl" />
              </motion.div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 right-10 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100"
            >
              <p className="text-[12px] font-black text-slate-900">Premium</p>
              <p className="text-[10px] text-slate-500">Sans pub</p>
            </motion.div>

            <motion.div
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-10 left-10 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100"
            >
              <p className="text-[12px] font-black text-slate-900">Gratuit</p>
              <p className="text-[10px] text-slate-500">100% libre</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── FEATURES ───────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
              Tout ce qu'il faut
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Une expérience pensée pour votre pratique spirituelle quotidienne.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Ultra fluide", desc: "Rendu 3D optimisé" },
              { icon: Heart, title: "Spirituel", desc: "Designs authentiques" },
              { icon: Languages, title: "Bilingue", desc: "FR & EN natif" },
              { icon: Sparkles, title: "Sans distraction", desc: "Expérience zen" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all hover:border-indigo-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-indigo-600" />
                </div>
                <h3 className="font-black text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-[13px] text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── CTA FOOTER ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-black mb-4">Prêt à commencer ?</h2>
          <p className="text-white/90 mb-8 max-w-lg mx-auto">
            Rejoignez une communauté de pratiquants qui subliment leur dhikr chaque jour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://apps.apple.com/app/id6759517890"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-black hover:bg-indigo-50 transition-colors"
            >
              Télécharger sur iOS
            </Link>
            <Link
              href="/app"
              className="bg-white/20 text-white px-8 py-4 rounded-xl font-black border border-white/30 hover:bg-white/30 transition-colors"
            >
              Essayer en ligne
            </Link>
          </div>
        </motion.div>

      </main>

      {/* ── FOOTER ────────────────────────────── */}
      <footer className="relative z-10 border-t border-slate-200 bg-slate-50/50 backdrop-blur-sm py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-600" />
              <span className="font-black text-slate-900">Chapelet Digital</span>
            </div>
            <div className="flex gap-6 text-[13px] text-slate-600">
              <Link href="/about" className="hover:text-slate-900 transition-colors">À propos</Link>
              <Link href="/support" className="hover:text-slate-900 transition-colors">Support</Link>
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">Confidentialité</Link>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">Conditions</Link>
            </div>
            <p className="text-[12px] text-slate-500">
              © 2024 Chapelet Digital. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
