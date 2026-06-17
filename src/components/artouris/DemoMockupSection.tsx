"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Send,
  Wand2,
  Loader2,
  MapPin,
  Star,
  Compass,
  BedDouble,
  UtensilsCrossed,
  Tent,
  UserRound,
  Hammer,
  Check,
  ChevronRight,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { CTAButton } from "./CTAButton";
import { RouteMiniMap } from "./ItineraryPreview";
import { cn } from "@/lib/utils";

interface DemoProps {
  externalPrompt?: string | null;
  onExternalPromptConsumed?: () => void;
}

interface ItineraryVariant {
  key: string;
  prompt: string;
  routeSummary: string;
  duration: string;
  style: string;
  budget: string;
  bestFor: string;
  days: { day: string; title: string; description: string }[];
  recommendations: { icon: typeof MapPin; label: string; sub: string; tag: string }[];
}

const VARIANTS: ItineraryVariant[] = [
  {
    key: "desert",
    prompt:
      "I'm visiting Morocco for 7 days. I want a mix of Marrakech, desert, local food, and authentic villages. Medium budget.",
    routeSummary: "Marrakech → Atlas → Aït Ben Haddou → Merzouga → Fes",
    duration: "7 days",
    style: "Culture + desert + local",
    budget: "Medium",
    bestFor: "First-time Morocco visitors",
    days: [
      { day: "Day 1", title: "Marrakech arrival", description: "Riad check-in, rooftop dinner, evening at Jemaa el-Fnaa." },
      { day: "Day 2", title: "Medina, souks & food tour", description: "Guided medina walk, spice and textile souks, street-food dinner." },
      { day: "Day 3", title: "Atlas Mountains", description: "Imlil village, terraced trails, Berber tea, valley lunch." },
      { day: "Day 4", title: "Aït Ben Haddou", description: "Tizi N'Tichka pass, the ksar, and continue toward the desert." },
      { day: "Day 5", title: "Sahara desert", description: "Camel trek into Erg Chebbi, sunset dunes, Berber camp, Gnawa music." },
      { day: "Day 6", title: "Fes old city", description: "Transfer to Fes, medina, tanneries, ceramic workshops." },
      { day: "Day 7", title: "Departure", description: "Slow morning, artisan market, airport transfer." },
    ],
    recommendations: [
      { icon: UserRound, label: "Local guide", sub: "Marrakech medina", tag: "Verified" },
      { icon: BedDouble, label: "Traditional riad", sub: "Medina, hidden gem", tag: "9.2 rating" },
      { icon: Hammer, label: "Artisan workshop", sub: "Pottery & zellige", tag: "Hands-on" },
      { icon: UtensilsCrossed, label: "Moroccan cooking class", sub: "Family home", tag: "Small group" },
      { icon: Tent, label: "Desert camp experience", sub: "Erg Chebbi", tag: "Authentic" },
    ],
  },
  {
    key: "food",
    prompt:
      "Plan a 4-day food-focused trip through Marrakech and Essaouira with local tables, markets, and a cooking class.",
    routeSummary: "Marrakech → Essaouira",
    duration: "4 days",
    style: "Food + coast",
    budget: "Medium",
    bestFor: "Food lovers",
    days: [
      { day: "Day 1", title: "Marrakech medina food tour", description: "Souk tastings, mechoui, freshly squeezed juice, Jemaa el-Fnaa stalls." },
      { day: "Day 2", title: "Cooking class + spice market", description: "Hands-on tagine and pastilla class, then a guided spice market walk." },
      { day: "Day 3", title: "Drive to Essaouira", description: "Argan cooperative stop, coastal arrival, port-side grilled fish lunch." },
      { day: "Day 4", title: "Seafood & ramparts", description: "Morning fish market, ramparts walk, slow afternoon in the medina." },
    ],
    recommendations: [
      { icon: UtensilsCrossed, label: "Cooking class", sub: "Family home", tag: "Hands-on" },
      { icon: UserRound, label: "Food guide", sub: "Marrakech", tag: "Local expert" },
      { icon: BedDouble, label: "Riad with rooftop", sub: "Medina, Marrakech", tag: "9.0 rating" },
      { icon: UtensilsCrossed, label: "Port-side grill", sub: "Essaouira", tag: "Fresh catch" },
      { icon: Hammer, label: "Argan cooperative", sub: "Women-led", tag: "Authentic" },
    ],
  },
  {
    key: "family",
    prompt:
      "Create a family trip with safe activities, short travel times, and beautiful nature — 6 days in Morocco.",
    routeSummary: "Marrakech → Agafay → Essaouira → Marrakech",
    duration: "6 days",
    style: "Family + nature",
    budget: "Medium-high",
    bestFor: "Families with kids",
    days: [
      { day: "Day 1", title: "Marrakech arrival", description: "Family-friendly riad, gardens, easy evening at the square." },
      { day: "Day 2", title: "Majorelle & camel ride", description: "Majorelle Garden, camel ride at Agafay, lantern-lit dinner." },
      { day: "Day 3", title: "Atlas day trip", description: "Short transfer to Imlil, easy walk, mule ride for kids, lunch with view." },
      { day: "Day 4", title: "Drive to Essaouira", description: "Easy coastal drive, beach afternoon, ramparts at sunset." },
      { day: "Day 5", title: "Essaouira beach day", description: "Kite-flying, sandcastles, port, Medina treasure hunt." },
      { day: "Day 6", title: "Return to Marrakech", description: "Slow morning, return drive, farewell dinner, airport transfer." },
    ],
    recommendations: [
      { icon: BedDouble, label: "Family riad", sub: "Pool, family suite", tag: "Family-run" },
      { icon: UserRound, label: "Family guide", sub: "Marrakech & Atlas", tag: "Kid-friendly" },
      { icon: Compass, label: "Agafay camel ride", sub: "Sunset, 40 min away", tag: "Easy" },
      { icon: UtensilsCrossed, label: "Cooking class for kids", sub: "Tagine & cookies", tag: "Hands-on" },
      { icon: BedDouble, label: "Coastal guesthouse", sub: "Essaouira", tag: "9.1 rating" },
    ],
  },
  {
    key: "budget",
    prompt:
      "I want a budget-friendly trip through Fes, Chefchaouen, and Tangier — 5 days, public transport where possible.",
    routeSummary: "Fes → Chefchaouen → Tangier",
    duration: "5 days",
    style: "Budget + culture",
    budget: "Low",
    bestFor: "Backpackers & students",
    days: [
      { day: "Day 1", title: "Fes medina deep dive", description: "Tanneries, Bou Inania madrasa, affordable medina lunch." },
      { day: "Day 2", title: "Fes to Chefchaouen", description: "Shared transfer to the blue city, sunset on the Spanish Mosque." },
      { day: "Day 3", title: "Chefchaouen wandering", description: "Blue alleys, local markets, talassemtane viewpoint." },
      { day: "Day 4", title: "Chefchaouen to Tangier", description: "Bus to Tangier, kasbah, Café Hafa, strait views." },
      { day: "Day 5", title: "Tangier & departure", description: "Medina, literary cafés, ferry or airport." },
    ],
    recommendations: [
      { icon: BedDouble, label: "Budget guesthouse", sub: "Chefchaouen medina", tag: "8.8 rating" },
      { icon: UserRound, label: "Local student-guide", sub: "Fes medina", tag: "Authentic" },
      { icon: UtensilsCrossed, label: "Local table", sub: "Tangier medina", tag: "Cheap eats" },
      { icon: Compass, label: "Shared transfer", sub: "Fes → Chefchaouen", tag: "Affordable" },
      { icon: Hammer, label: "Weaver cooperative", sub: "Chefchaouen", tag: "Direct buy" },
    ],
  },
  {
    key: "luxury",
    prompt:
      "Plan a romantic weekend in Marrakech with a luxury riad, spa, rooftop dinner, and hidden gems.",
    routeSummary: "Marrakech (luxury base)",
    duration: "3 days",
    style: "Luxury + romantic",
    budget: "High",
    bestFor: "Couples",
    days: [
      { day: "Day 1", title: "Arrival & spa", description: "Private transfer, luxury riad check-in, hammam & massage, rooftop dinner." },
      { day: "Day 2", title: "Private medina & hidden gems", description: "Private guide, secret gardens, designer ateliers, sunset cocktails." },
      { day: "Day 3", title: "Agafay desert dinner", description: "Private transfer, sunset in the stone desert, lantern-lit dinner, return." },
    ],
    recommendations: [
      { icon: BedDouble, label: "5-star riad", sub: "Suite with plunge pool", tag: "Concierge" },
      { icon: Star, label: "Hammam & spa", sub: "Private session", tag: "Couples" },
      { icon: UtensilsCrossed, label: "Rooftop dinner", sub: "Chef's table", tag: "Reserved" },
      { icon: UserRound, label: "Private guide", sub: "Hidden gems route", tag: "Tailored" },
      { icon: Tent, label: "Agafay luxury camp", sub: "Private dinner", tag: "Exclusive" },
    ],
  },
];

const SUGGESTED_PROMPTS = [
  { label: "Desert adventure", variant: "desert" },
  { label: "Food & culture", variant: "food" },
  { label: "Family trip", variant: "family" },
  { label: "Budget friendly", variant: "budget" },
  { label: "Luxury riads", variant: "luxury" },
];

export function DemoMockupSection({ externalPrompt, onExternalPromptConsumed }: DemoProps) {
  const [activeKey, setActiveKey] = useState<string>("desert");
  const [prompt, setPrompt] = useState<string>(VARIANTS[0].prompt);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Tell me what you'd like to experience, and I'll build the journey." },
  ]);
  const [generating, setGenerating] = useState(false);
  const reduce = useReducedMotion();
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, generating]);

  const active = VARIANTS.find((v) => v.key === activeKey) ?? VARIANTS[0];

  const runVariant = (variant: ItineraryVariant, customPrompt?: string) => {
    setPrompt(customPrompt ?? variant.prompt);
    setActiveKey(variant.key);
    setGenerating(true);
    setMessages((m) => [
      ...m,
      { role: "user", text: customPrompt ?? variant.prompt },
    ]);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: `Here's a ${variant.duration.toLowerCase()} plan: ${variant.routeSummary}. I've matched local experiences below — ask me to make it cheaper, add nature, or reduce travel time.`,
        },
      ]);
      setGenerating(false);
    }, 1300);
  };

  // React to external prompt from Hero or Example cards
  useEffect(() => {
    if (!externalPrompt) return;
    // Match the external prompt to the closest variant by keyword
    const p = externalPrompt.toLowerCase();
    let match: ItineraryVariant = VARIANTS[0];
    if (/romantic|luxury|riad|spa/.test(p)) match = VARIANTS.find((v) => v.key === "luxury")!;
    else if (/family|kid/.test(p)) match = VARIANTS.find((v) => v.key === "family")!;
    else if (/food|cooking|gastronom/.test(p)) match = VARIANTS.find((v) => v.key === "food")!;
    else if (/budget|cheap|backpack/.test(p)) match = VARIANTS.find((v) => v.key === "budget")!;
    else if (/desert|sahara|dune/.test(p)) match = VARIANTS.find((v) => v.key === "desert")!;

    // Defer state updates to a macrotask so we don't trigger cascading renders
    // synchronously inside this effect body.
    const t = window.setTimeout(() => {
      runVariant(match, externalPrompt);
      onExternalPromptConsumed?.();
      const el = document.getElementById("demo");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => window.clearTimeout(t);
  }, [externalPrompt]);

  const handleSubmit = () => {
    runVariant(active, prompt);
  };

  return (
    <section
      id="demo"
      aria-labelledby="demo-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-100/40 to-sand-50" />
        <div className="absolute top-20 right-10 h-[400px] w-[400px] rounded-full bg-terracotta-200/30 blur-3xl" />
        <div className="absolute bottom-20 left-10 h-[320px] w-[320px] rounded-full bg-tile-green/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Interactive demo"
            eyebrowIcon={<Sparkles className="h-3.5 w-3.5" />}
            title={
              <>
                See how a trip{" "}
                <span className="gradient-text-sunset">starts.</span>
              </>
            }
            subtitle="Pick a prompt below or write your own — watch Artouris compose a structured plan with local recommendations."
          />
        </ScrollReveal>

        {/* Prompt chips */}
        <ScrollReveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {SUGGESTED_PROMPTS.map((s) => (
              <button
                key={s.variant}
                type="button"
                onClick={() => runVariant(VARIANTS.find((v) => v.key === s.variant)!)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeKey === s.variant
                    ? "border-terracotta-300 bg-terracotta-50 text-terracotta-700 shadow-sm ring-warm"
                    : "border-sand-200 bg-white/80 text-navy-700 hover:border-terracotta-200 hover:bg-terracotta-50/60 hover:text-terracotta-700"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    activeKey === s.variant ? "bg-terracotta-500" : "bg-sand-400"
                  )}
                />
                {s.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 overflow-hidden rounded-[28px] border border-sand-200 bg-white shadow-hero-glow">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 border-b border-sand-100 bg-sand-50/80 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-terracotta-500 to-gold-400 text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold text-navy-800">Artouris AI Planner</span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-tile-green/10 px-2 py-0.5 text-[10px] font-semibold text-tile-green">
                  <span className="h-1.5 w-1.5 rounded-full bg-tile-green" /> Live preview
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sand-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-sand-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-terracotta-300" />
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              {/* Left: chat panel */}
              <div className="flex flex-col border-b border-sand-100 lg:border-b-0 lg:border-r">
                <div
                  ref={chatScrollRef}
                  className="scrollbar-thin flex max-h-[340px] min-h-[280px] flex-col gap-3 overflow-y-auto bg-gradient-to-br from-sand-50/60 to-white p-5"
                  aria-live="polite"
                >
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={cn(
                        "flex items-start gap-2.5",
                        m.role === "user" ? "flex-row-reverse" : ""
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white shadow-sm",
                          m.role === "user"
                            ? "bg-navy-700"
                            : "bg-gradient-to-br from-terracotta-500 to-gold-400"
                        )}
                      >
                        {m.role === "user" ? (
                          <span className="text-[10px] font-bold">You</span>
                        ) : (
                          <Sparkles className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm",
                          m.role === "user"
                            ? "bg-navy-800 text-white rounded-tr-sm"
                            : "bg-white text-navy-700 ring-1 ring-sand-200 rounded-tl-sm"
                        )}
                      >
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                  <AnimatePresence>
                    {generating && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2.5"
                      >
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-terracotta-500 to-gold-400 text-white">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        </span>
                        <div className="flex items-center gap-1 rounded-2xl bg-white px-3.5 py-2.5 ring-1 ring-sand-200">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-terracotta-400 [animation-delay:-0.2s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-terracotta-400 [animation-delay:-0.1s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-terracotta-400" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Composer */}
                <div className="border-t border-sand-100 bg-white p-3">
                  <div className="flex items-end gap-2 rounded-2xl border border-sand-200 bg-sand-50/60 p-2">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                      rows={2}
                      aria-label="Write your trip prompt"
                      className="min-h-[42px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm leading-relaxed text-navy-800 placeholder:text-navy-400 focus:outline-none scrollbar-thin"
                      placeholder="Describe the trip you want…"
                    />
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={generating}
                      aria-label="Send prompt"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white shadow-sm transition hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      {generating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1.5 px-1 text-[11px] text-navy-500">
                    Press <kbd className="rounded bg-sand-100 px-1 py-0.5 text-[10px] font-semibold text-navy-700">Enter</kbd> to send · Shift+Enter for new line
                  </p>
                </div>
              </div>

              {/* Right: itinerary output */}
              <div className="bg-gradient-to-br from-white to-sand-50/60 p-5 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.key}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Summary chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-terracotta-50 px-2 py-1 text-[11px] font-semibold text-terracotta-700">
                        <MapPin className="h-3 w-3" /> {active.routeSummary}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-sand-100 px-2 py-1 text-[11px] font-medium text-navy-700">
                        {active.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-sand-100 px-2 py-1 text-[11px] font-medium text-navy-700">
                        {active.style}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-tile-green/10 px-2 py-1 text-[11px] font-semibold text-tile-green">
                        {active.budget} budget
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] text-navy-500">
                      Best for: <span className="font-semibold text-navy-700">{active.bestFor}</span>
                    </p>

                    {/* Mini map */}
                    <RouteMiniMap className="mt-3 aspect-[2.4/1]" />

                    {/* Itinerary list */}
                    <div className="mt-4 space-y-2 max-h-[260px] overflow-y-auto scrollbar-thin pr-1">
                      {active.days.map((d, i) => (
                        <motion.div
                          key={d.day}
                          initial={reduce ? false : { opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                          className="flex items-start gap-3 rounded-xl border border-sand-200 bg-white p-2.5"
                        >
                          <span className="mt-0.5 inline-flex h-7 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-terracotta-100 to-gold-300/40 text-[10px] font-bold text-terracotta-700">
                            {d.day.replace("Day ", "D")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-navy-800 leading-snug">{d.title}</p>
                            <p className="text-[12px] text-navy-600 leading-relaxed">{d.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Recommendations */}
                    <div className="mt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-500">
                        Local recommendations
                      </p>
                      <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {active.recommendations.map((r, i) => {
                          const Icon = r.icon;
                          return (
                            <motion.div
                              key={i}
                              initial={reduce ? false : { opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + i * 0.06, duration: 0.35 }}
                              className="flex items-center gap-2 rounded-lg border border-sand-200 bg-white p-2"
                            >
                              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sand-100 text-terracotta-600">
                                <Icon className="h-3.5 w-3.5" />
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="text-[12px] font-semibold text-navy-800 leading-tight truncate">{r.label}</p>
                                <p className="text-[10px] text-navy-500 truncate">{r.sub}</p>
                              </div>
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-tile-green/10 px-1.5 py-0.5 text-[9px] font-semibold text-tile-green">
                                <Check className="h-2.5 w-2.5" /> {r.tag}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="flex flex-col items-center justify-between gap-3 border-t border-sand-100 bg-sand-50/70 px-5 py-4 sm:flex-row">
              <p className="text-xs text-navy-600">
                <span className="font-semibold text-navy-800">Try your own prompt.</span>{" "}
                Ask Artouris to make it cheaper, add nature, or reduce travel time.
              </p>
              <CTAButton href="#waitlist" size="sm" variant="dark" icon={<ChevronRight className="h-4 w-4" />}>
                Start with your own prompt
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
