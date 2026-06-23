"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroNavbar } from "./HeroNavbar";
import { HeroChips } from "./HeroChips";

const PLACEHOLDER =
  "Describe your dream trip, e.g. '3 days in Merzouga with camel riding, desert camp, vegetarian food, and local souvenirs'";

export function Hero() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = prompt.trim();
    if (trimmed) {
      router.push(`/ai-planner?prompt=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/ai-planner");
    }
  };

  return (
    <section className="relative isolate w-full min-h-[760px] lg:min-h-screen flex flex-col overflow-hidden bg-navy-900">
      {/* Immersive background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/sahara/regions/merzouga-dunes.png"
          alt="Moroccan Sahara dunes"
          className="w-full h-full object-cover scale-105 opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/55 to-navy-900/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-500/20 rounded-full blur-[120px]" />
      </div>

      {/* Decorative Moroccan zellige accents in corners (Animated) */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 2 }}
        className="absolute top-20 left-6 z-[1] hidden lg:block"
      >
        <motion.svg animate={{ rotate: 360, y: [0, -10, 0] }} transition={{ rotate: { duration: 120, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }} viewBox="0 0 80 80" className="w-20 h-20 text-gold-300/60">
          <g fill="none" stroke="currentColor" strokeWidth="0.6">
            <path d="M40 6 L70 36 L40 66 L10 36 Z" />
            <path d="M40 18 L58 36 L40 54 L22 36 Z" />
            <circle cx="40" cy="36" r="3" fill="currentColor" />
          </g>
        </motion.svg>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-32 right-8 z-[1] hidden lg:block"
      >
        <motion.svg animate={{ rotate: -360, y: [0, 15, 0] }} transition={{ rotate: { duration: 150, repeat: Infinity, ease: "linear" }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }} viewBox="0 0 80 80" className="w-28 h-28 text-terracotta-300/60">
          <g fill="none" stroke="currentColor" strokeWidth="0.6">
            <path d="M40 6 L70 36 L40 66 L10 36 Z" />
            <path d="M40 18 L58 36 L40 54 L22 36 Z" />
            <path d="M40 28 L52 36 L40 44 L28 36 Z" />
            <circle cx="40" cy="36" r="2" fill="currentColor" />
          </g>
        </motion.svg>
      </motion.div>
      
      {/* Background drifting orbs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-terracotta-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Live pilot floating chip (bottom-left) */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute bottom-10 left-6 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sand-100"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tile-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-tile-green"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
          Morocco · Pilot launching
        </span>
      </motion.div>

      {/* Floating premium navbar */}
      <HeroNavbar />

      {/* Central content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-6 mt-10 pb-32 sm:pb-40">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sand-100 text-[11px] font-bold uppercase tracking-[0.18em] backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3 h-3 text-gold-300" /> AI travel agent · Morocco-first
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center font-display text-5xl sm:text-6xl lg:text-[76px] font-black text-white tracking-tight drop-shadow-2xl max-w-4xl leading-[1.05]"
        >
          Your AI Travel Agent For{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta-400 via-gold-400 to-terracotta-300">
            Morocco
          </span>
          .
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-2xl mx-auto text-center text-base sm:text-lg lg:text-xl text-sand-100 drop-shadow-md font-medium leading-relaxed"
        >
          Describe the experience you want to live. Artouris builds your route, stays,
          activities, transport, and budget — then lets you book everything in one place.
        </motion.p>

        {/* Glass prompt box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="w-full max-w-[920px] mx-auto mt-10 relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-terracotta-500/30 to-gold-400/30 rounded-[32px] blur-2xl opacity-50" />
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-2 sm:p-3 rounded-[28px] shadow-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 group focus-within:bg-white/15 transition-all"
          >
            <div className="flex-1 w-full pl-4 sm:pl-6 py-2 sm:py-3 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gold-300 shrink-0" />
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={PLACEHOLDER}
                className="w-full bg-transparent border-0 focus:outline-none text-white placeholder:text-white/70 text-base sm:text-lg font-medium resize-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-7 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-base sm:text-lg shadow-lg flex items-center justify-center shrink-0"
            >
              Plan my trip <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </motion.div>

        {/* Action + category chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10"
        >
          <HeroChips onPromptPrefill={setPrompt} />
        </motion.div>
      </div>

      {/* Bottom fade transition into the sand sections */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent via-[#f7f1e8]/70 to-[#f7f1e8] pointer-events-none z-20" />
    </section>
  );
}