"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Explore", href: "/explore" },
  { label: "AI Planner", href: "/ai-planner" },
  { label: "Book", href: "/book" },
  { label: "Shop", href: "/shop" },
  { label: "Providers", href: "/provider-preview" },
];

export function HeroNavbar() {
  return (
    <div className="relative z-50 pt-6 px-4 sm:px-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center border border-white/20 shadow-2xl"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-terracotta-500 to-gold-400 text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-lg sm:text-xl font-display font-black text-white tracking-tight">
            Artouris
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 ml-0.5 px-1.5 py-0.5 rounded-full bg-tile-green/25 border border-tile-green/40 text-[9px] font-bold text-tile-green uppercase tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tile-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-tile-green"></span>
            </span>
            Live
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative px-3 py-1.5 rounded-full text-[13px] font-bold text-sand-100 hover:text-white transition-colors flex items-center gap-1"
            >
              {l.label === "AI Planner" && <Sparkles className="w-3 h-3" />}
              {l.label}
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <HeroLanguagePill />
          <Link
            href="/login"
            className="hidden sm:inline-flex h-9 items-center px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/20 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/ai-planner"
            className="hidden sm:inline-flex h-9 items-center px-4 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-bold shadow-md transition-colors"
          >
            Plan my trip
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function HeroLanguagePill() {
  const [active, setActive] = useState<'EN' | 'FR' | 'AR'>('EN');
  const options: Array<'EN' | 'FR' | 'AR'> = ['EN', 'FR', 'AR'];
  return (
    <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold rounded-full bg-white/5 border border-white/10 px-2 py-1.5">
      {options.map((opt, i) => (
        <button
          key={opt}
          onClick={() => setActive(opt)}
          className={`px-1.5 transition-colors ${
            active === opt
              ? 'text-white'
              : 'text-sand-300 hover:text-white'
          }`}
          aria-label={`Switch language to ${opt}`}
        >
          {opt}
          {i < options.length - 1 && <span className="opacity-50 ml-1.5">/</span>}
        </button>
      ))}
    </div>
  );
}