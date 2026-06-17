"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Wand2,
  Globe2,
  Loader2,
} from "lucide-react";
import { CTAButton } from "./CTAButton";
import { MoroccanPattern } from "./MoroccanPattern";
import { ItineraryPreview, RouteMiniMap, DEFAULT_ITINERARY } from "./ItineraryPreview";
import { PROMPT_CHIPS } from "@/lib/artouris/content";
import { cn } from "@/lib/utils";

const PLACEHOLDER =
  "Try: I want a 5-day Morocco trip with desert, local food, culture, and a medium budget…";

interface HeroProps {
  onPromptSubmit?: (prompt: string) => void;
}

export function Hero({ onPromptSubmit }: HeroProps) {
  const [value, setValue] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const reduce = useReducedMotion();

  const submit = (prompt?: string) => {
    const finalPrompt = (prompt ?? value).trim();
    if (!finalPrompt) {
      inputRef.current?.focus();
      return;
    }
    if (prompt) setValue(prompt);
    setGenerating(true);
    setGenerated(false);
    onPromptSubmit?.(prompt ?? value);
    // Simulate AI generation
    window.setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1100);
  };

  const handleChip = (chip: string) => {
    setValue(`Plan a ${chip.toLowerCase()} trip in Morocco.`);
    submit(`Plan a ${chip.toLowerCase()} trip in Morocco.`);
  };

  // Auto-grow textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-sand-50 pt-24 sm:pt-28 lg:pt-32"
    >
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-50 to-sand-100/70" />
        <MoroccanPattern variant="rings" className="opacity-60" />
        <div className="absolute -top-32 -right-20 h-[420px] w-[420px] rounded-full bg-terracotta-200/40 blur-3xl" />
        <div className="absolute top-40 -left-24 h-[380px] w-[380px] rounded-full bg-gold-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[260px] w-[420px] rounded-full bg-tile-green/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Announcement pill */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-terracotta-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-terracotta-700 backdrop-blur-sm shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta-500" />
          </span>
          Launching first in Morocco · Built to scale worldwide
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-4xl text-center font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-800 text-balance sm:text-5xl lg:text-[4.2rem] lg:leading-[1.02]"
        >
          Plan your Moroccan trip{" "}
          <span className="gradient-text-sunset">with AI.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-navy-600 text-pretty sm:text-lg"
        >
          Describe the experience you want in one prompt. Artouris turns it into a
          personalized itinerary with authentic places, local experiences, and smart
          travel recommendations.
        </motion.p>

        {/* Prompt box */}
        <motion.div
          id="hero-prompt"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 w-full max-w-3xl"
        >
          <div className="relative rounded-[28px] bg-white/90 p-2.5 shadow-hero-glow ring-1 ring-sand-200 backdrop-blur">
            <div className="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-br from-terracotta-100/60 via-transparent to-gold-300/40 blur-xl" />
            <div className="flex flex-col gap-2.5 rounded-[22px] bg-white p-3.5 ring-1 ring-sand-100">
              <div className="flex items-start gap-3">
                <span className="mt-2.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-terracotta-500 to-gold-400 text-white shadow-sm">
                  <Sparkles className="h-4 w-4" />
                </span>
                <textarea
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  rows={2}
                  aria-label="Describe your trip"
                  placeholder={PLACEHOLDER}
                  className="min-h-[58px] flex-1 resize-none bg-transparent pt-2 text-[15px] leading-relaxed text-navy-800 placeholder:text-navy-400 focus:outline-none scrollbar-thin"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-sand-100 pt-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-sand-100 px-2 py-1 text-[11px] font-medium text-navy-600">
                    <Globe2 className="h-3 w-3" /> Morocco
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-sand-100 px-2 py-1 text-[11px] font-medium text-navy-600">
                    <Calendar className="h-3 w-3" /> 5 days
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-sand-100 px-2 py-1 text-[11px] font-medium text-navy-600">
                    <MapPin className="h-3 w-3" /> Desert + culture
                  </span>
                </div>
                <CTAButton
                  size="md"
                  onClick={() => submit()}
                  className="min-w-[150px]"
                  icon={
                    generating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="h-4 w-4" />
                    )
                  }
                  iconPosition="left"
                >
                  {generating ? "Generating…" : "Generate trip"}
                </CTAButton>
              </div>
            </div>
          </div>

          {/* Prompt chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-navy-500">Try:</span>
            {PROMPT_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChip(chip)}
                className="group inline-flex items-center gap-1.5 rounded-full border border-sand-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-navy-700 shadow-sm backdrop-blur transition hover:border-terracotta-300 hover:bg-terracotta-50 hover:text-terracotta-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta-400 transition group-hover:bg-terracotta-500" />
                {chip}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Secondary CTAs */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <CTAButton href="#hero-prompt" size="lg">
            Plan my trip
          </CTAButton>
          <CTAButton href="#demo" size="lg" variant="secondary" icon={null}>
            See example trip
          </CTAButton>
        </motion.div>

        <p className="mt-4 text-center text-xs text-navy-500">
          No complex filters. No endless tabs. Just describe the experience you want.
        </p>

        {/* Itinerary preview card */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-14 w-full max-w-6xl"
        >
          <PreviewCard generating={generating} generated={generated} prompt={value} />
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs text-navy-500"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-tile-green" />
            Privacy-conscious
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
            Anonymized insights
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Local-business-first
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-tile-blue" />
            Multilingual
          </span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none mt-16 h-px w-full bg-gradient-to-r from-transparent via-sand-200 to-transparent" />
    </section>
  );
}

function PreviewCard({
  generating,
  generated,
  prompt,
}: {
  generating: boolean;
  generated: boolean;
  prompt: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-white shadow-hero-glow ring-1 ring-sand-200">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-sand-100 bg-sand-50/70 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-terracotta-500 to-gold-400 text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-semibold text-navy-800">Artouris AI · Itinerary preview</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-sand-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-sand-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-terracotta-300" />
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
        {/* Left: itinerary */}
        <div className="border-b border-sand-100 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-terracotta-600">
                Personalized itinerary
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-navy-800 sm:text-xl">
                5-day Morocco · Desert, culture, local food
              </h3>
            </div>
            <span className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-full bg-tile-green/10 px-2.5 py-1 text-[11px] font-semibold text-tile-green">
              Medium budget
            </span>
          </div>

          <div className="mt-5 min-h-[260px]">
            {generating ? (
              <GeneratingSkeleton />
            ) : (
              <ItineraryPreview animated={!reduce} />
            )}
          </div>
        </div>

        {/* Right: route + meta */}
        <div className="bg-gradient-to-br from-sand-50/70 to-white p-5 sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-500">
            Recommended route
          </p>
          <RouteMiniMap className="mt-3 aspect-[2/1]" />

          <div className="mt-5 grid grid-cols-2 gap-3">
            <MetaCard label="Estimated duration" value="7 days" sub="Adjustable" />
            <MetaCard label="Travel style" value="Culture + desert" sub="Authentic" />
            <MetaCard label="Budget level" value="Medium" sub="Per traveler" />
            <MetaCard label="Best for" value="First-time visitors" sub="Slow-paced" />
          </div>

          <div className="mt-5 rounded-2xl border border-sand-200 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-500">
              You asked
            </p>
            <p className="mt-1 text-sm italic leading-relaxed text-navy-700">
              {prompt?.trim()
                ? `“${prompt.trim()}”`
                : "“I want a 5-day authentic Morocco trip with desert, local food, culture, and a medium budget.”"}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-navy-500">
              <Sparkles className="h-3.5 w-3.5 text-terracotta-500" />
              {generating
                ? "Artouris is composing your trip…"
                : generated
                ? "Itinerary ready — refine in conversation"
                : "Sample preview — try your own prompt above"}
            </span>
            <CTAButton href="#demo" size="sm" variant="outline" icon={<ArrowRight className="h-3.5 w-3.5" />}>
              Open demo
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-sand-200 bg-white px-3 py-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-navy-400">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-navy-800">{value}</p>
      <p className="text-[11px] text-navy-500">{sub}</p>
    </div>
  );
}

function GeneratingSkeleton() {
  return (
    <ol className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex items-start gap-3.5">
          <div className="h-9 w-9 shrink-0 rounded-full bg-sand-100 ring-2 ring-white" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3 w-20 rounded-full bg-sand-100" />
            <div className="h-3.5 w-3/4 rounded-full bg-sand-100" />
            <div className="h-3 w-full rounded-full bg-sand-50" />
          </div>
        </li>
      ))}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-terracotta-700 shadow-sm ring-1 ring-terracotta-200 backdrop-blur">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Composing itinerary…
        </span>
      </div>
    </ol>
  );
}
