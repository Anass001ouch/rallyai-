"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { EXAMPLE_PROMPTS } from "@/lib/artouris/content";
import { cn } from "@/lib/utils";

const accentClasses: Record<string, { ring: string; bg: string; text: string; dot: string }> = {
  terracotta: {
    ring: "hover:border-terracotta-300",
    bg: "from-terracotta-50 to-white",
    text: "text-terracotta-600",
    dot: "bg-terracotta-500",
  },
  gold: {
    ring: "hover:border-gold-400",
    bg: "from-[#FBF1DE] to-white",
    text: "text-gold-600",
    dot: "bg-gold-500",
  },
  "tile-green": {
    ring: "hover:border-[#9CC4BC]",
    bg: "from-[#E7F0EE] to-white",
    text: "text-tile-green",
    dot: "bg-tile-green",
  },
  "tile-blue": {
    ring: "hover:border-[#9CBDD3]",
    bg: "from-[#E6EEF5] to-white",
    text: "text-tile-blue",
    dot: "bg-tile-blue",
  },
};

interface Props {
  onUsePrompt?: (prompt: string) => void;
}

export function ExamplePromptsSection({ onUsePrompt }: Props) {
  return (
    <section
      id="examples"
      aria-labelledby="examples-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-100/40 to-sand-50" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Example prompts"
            eyebrowIcon={<Quote className="h-3.5 w-3.5" />}
            title={
              <>
                Start with{" "}
                <span className="gradient-text-sunset">what you mean.</span>
              </>
            }
            subtitle="No filters. No endless tabs. Just describe your travel intention and let Artouris do the rest."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {EXAMPLE_PROMPTS.map((p) => {
            const a = accentClasses[p.accent] ?? accentClasses.terracotta;
            return (
              <motion.article
                key={p.title}
                variants={itemVariants}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-gradient-to-br p-6 shadow-card-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-warm",
                  a.bg,
                  a.ring
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold ring-1 ring-sand-200",
                      a.text
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", a.dot)} />
                    {p.tag}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4 opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      a.text
                    )}
                  />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-navy-800">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm italic leading-relaxed text-navy-700 text-pretty">
                  &ldquo;{p.prompt}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => onUsePrompt?.(p.prompt)}
                  className={cn(
                    "mt-5 inline-flex items-center justify-center gap-1.5 rounded-full border border-sand-200 bg-white px-3 py-2 text-xs font-semibold text-navy-800 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
                    "hover:border-current"
                  )}
                >
                  Try this prompt
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </motion.article>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
