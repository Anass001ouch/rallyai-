"use client";

import { motion } from "framer-motion";
import { Tent, Sparkles, CalendarRange, CreditCard, Users } from "lucide-react";

const ACTION_CHIPS = [
  { label: "Plan trip details", icon: CalendarRange },
  { label: "Find local stays", icon: Tent },
  { label: "Generate itinerary", icon: Sparkles },
  { label: "Book full trip", icon: CreditCard },
  { label: "Local experiences", icon: Users },
];

const CATEGORY_CHIPS = ["Stays", "Experiences", "Transport", "Souvenirs", "Local Guides"];

const CATEGORY_PROMPTS: Record<string, string> = {
  Stays: "I want to stay in a desert camp in Merzouga with traditional food.",
  Experiences: "I want camel trekking, ATV dunes, and stargazing in the Sahara.",
  Transport: "I need private airport transfer to Merzouga and 4x4 camp pickup.",
  Souvenirs: "I want authentic Moroccan souvenirs — desert cheche, Amazigh jewelry, dates gift box.",
  "Local Guides": "I want a local guide for a nomad cultural visit and artisan market.",
};

interface HeroChipsProps {
  onPromptPrefill: (text: string) => void;
}

export function HeroChips({ onPromptPrefill }: HeroChipsProps) {
  return (
    <div className="space-y-5 w-full max-w-3xl mx-auto">
      {/* Action chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-2.5"
      >
        {ACTION_CHIPS.map((chip) => (
          <button
            key={chip.label}
            onClick={() => onPromptPrefill(`${chip.label} in Morocco...`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white text-[13px] font-bold backdrop-blur-md transition-colors"
          >
            <chip.icon className="w-3.5 h-3.5" />
            {chip.label}
          </button>
        ))}
      </motion.div>

      {/* Category chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap justify-center items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-sand-200 mr-1">
          Browse by
        </span>
        {CATEGORY_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => onPromptPrefill(CATEGORY_PROMPTS[chip] ?? '')}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-terracotta-500 hover:text-white text-sand-100 text-[12px] font-bold border border-white/15 transition-colors"
          >
            {chip}
          </button>
        ))}
      </motion.div>
    </div>
  );
}