"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CircleCheck, RefreshCw, BookOpen } from "lucide-react";
import { useEffect, useRef, useId } from "react";
import confetti from "canvas-confetti";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { hapticGravity, hapticLight } from "@/lib/utils/haptics";

interface CompletionViewProps {
    readonly onReset: () => void;
    readonly onOpenLibrary: () => void;
    readonly presetName: string;
    readonly beadColor: string;
    readonly isIntermediary?: boolean;
    readonly onNext?: () => void;
}

export function CompletionView({ onReset, onOpenLibrary, presetName, beadColor, isIntermediary, onNext }: CompletionViewProps) {
    const { t } = useTranslation();
    const shouldReduceMotion = useReducedMotion();
    const titleId = useId();
    const confettiLaunched = useRef(false);

    useEffect(() => {
        if (shouldReduceMotion || confettiLaunched.current) return;
        confettiLaunched.current = true;

        // Une seule salve (pas de setInterval) : zéro frame loop
        const particleCount = isIntermediary ? 40 : 70;
        const defaults = { startVelocity: 28, spread: 320, ticks: 50, zIndex: 0, colors: [beadColor, '#ffffff'] };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: 0.1 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: 0.1 } });
    }, [beadColor, isIntermediary, shouldReduceMotion]);

    useEffect(() => {
        // Trigger Gravity haptic for the central "jewel" reveal
        const hapticTimer = setTimeout(() => {
            hapticGravity();
        }, 300);

        // 3 subtle haptic pings then stop
        let pingCount = 0;
        const sparkleInterval = setInterval(() => {
            hapticLight();
            pingCount++;
            if (pingCount >= 3) clearInterval(sparkleInterval);
        }, 2000);

        return () => {
            clearTimeout(hapticTimer);
            clearInterval(sparkleInterval);
        };
    }, []);

    // Isolated event handlers to prevent propagation
    const stopAllBubbles = (e: React.UIEvent) => {
        e.stopPropagation();
        if ('nativeEvent' in e) {
            (e.nativeEvent as any).stopImmediatePropagation?.();
        }
    };

    return (
        <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex flex-col items-center justify-center p-4 sm:p-6 text-center text-white relative pointer-events-auto w-full max-w-sm mx-auto z-[80] transition-all"
            onPointerDown={stopAllBubbles}
            onPointerUp={stopAllBubbles}
            onMouseDown={stopAllBubbles}
            onMouseUp={stopAllBubbles}
            onTouchStart={stopAllBubbles}
            onTouchEnd={stopAllBubbles}
        >
            <div className="relative w-full overflow-hidden bg-slate-900/95 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
                {/* Ambient glow — taille et blur réduits pour limiter le compositing */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div
                        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[24px] opacity-[0.12]"
                        style={{ backgroundColor: beadColor }}
                    />
                    <div
                        className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[24px] opacity-[0.08]"
                        style={{ backgroundColor: beadColor }}
                    />
                </div>

                {/* Success Icon Group — décoratif */}
                <div className="relative mb-8 flex justify-center" aria-hidden="true">
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1
                        }}
                        className="relative z-20 w-24 h-24 flex items-center justify-center"
                    >
                        {/* Static rings — plus de rotation infinie */}
                        <div
                            className="absolute inset-0 rounded-[1.8rem] border-2 border-dashed"
                            style={{ borderColor: `${beadColor}4d` }}
                        />
                        <div className="absolute inset-2 rounded-[1.5rem] border border-white/10" />

                        {/* Inner Jewel */}
                        <div
                            className="absolute inset-3 rounded-full flex items-center justify-center overflow-hidden"
                            style={{
                                backgroundColor: beadColor,
                                boxShadow: `0 0 40px ${beadColor}60`
                            }}
                        >
                            <CircleCheck size={36} className="text-slate-950 stroke-[2]" />
                            <motion.div
                                animate={shouldReduceMotion ? {} : {
                                    x: ['-200%', '200%'],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 2, repeat: 2, repeatDelay: 1 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                            />
                        </div>
                    </motion.div>

                </div>

                <div className="space-y-2 mb-8 relative z-10 transition-all">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span
                            className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70"
                            style={{ color: beadColor }}
                        >
                            {isIntermediary ? t.session.stepComplete : t.session.completion.sessionComplete}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                            delay: 0.4
                        }}
                        id={titleId}
                        className="text-4xl font-black text-white tracking-tight"
                    >
                        {isIntermediary ? t.session.completion.success : t.session.completion.congratulations}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/60 text-sm font-medium px-4 leading-relaxed mt-2"
                    >
                        {t.session.completion.sessionComplete} <span className="text-white font-bold">{presetName}</span>.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 gap-2 w-full relative z-10">
                    {isIntermediary ? (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                            onClick={(e) => { stopAllBubbles(e); onNext?.(); }}
                            className="group flex items-center justify-center gap-3 rounded-2xl bg-white text-slate-950 px-6 py-3.5 hover:bg-white/90 active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                        >
                            <span className="font-black text-xs uppercase tracking-wider">{t.common.continue}</span>
                        </motion.button>
                    ) : (
                        <>
                            <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                                onClick={(e) => { stopAllBubbles(e); onReset(); }}
                                className="group flex items-center justify-center gap-3 rounded-2xl bg-white text-slate-950 px-6 py-3.5 hover:bg-white/90 active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                            >
                                <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
                                <span className="font-black text-[10px] uppercase tracking-wider">{t.session.completion.startAgain}</span>
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                onClick={(e) => { stopAllBubbles(e); onOpenLibrary(); }}
                                className="group flex items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-6 py-3.5 text-white hover:bg-white/10 active:scale-[0.98] transition-all duration-300"
                            >
                                <BookOpen size={14} style={{ color: beadColor }} />
                                <span className="font-black text-[10px] uppercase tracking-wider">{t.library.title}</span>
                            </motion.button>
                        </>
                    )}
                </div>
            </div>

            {/* Hint at bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.2 }}
                className="mt-8 text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium"
            >
                {t.home.sub_evening}
            </motion.div>
        </div>
    );
}
