"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { IMPACT_METRICS } from "@/lib/artouris/content";
import { cn } from "@/lib/utils";

export function ImpactSection() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="py-24 bg-[#1F3F49] text-white relative overflow-hidden z-0"
    >
      {/* The Background Code: Glowing radial gradient in the center */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent -z-10"></div>
      
      {/* The Background Code: A glowing blob behind an image or feature on the right side */}
      <div className="absolute -top-10 -right-10 w-[500px] aspect-square rounded-full bg-white/5 blur-3xl -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Pilot phase"
            eyebrowIcon={<BarChart3 className="h-3.5 w-3.5" />}
            title={
              <>
                Designed for{" "}
                <span className="gradient-text-warm">measurable impact.</span>
              </>
            }
            subtitle="During the pilot phase, Artouris will measure impact through planning time saved, local business visibility, traveler satisfaction, and destination-level insights."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {IMPACT_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              variants={itemVariants}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card-warm",
                i === 0 && "lg:col-span-2 lg:row-span-1"
              )}
            >
              <div className="flex items-baseline gap-2">
                <CounterLabel value={m.value} />
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                  {m.suffix}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-white leading-snug text-pretty">
                {m.label}
              </p>
              <span className="pointer-events-none absolute -right-2 -top-2 text-[60px] font-bold leading-none text-white/5 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </StaggerGroup>

        <ScrollReveal delay={0.1} className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-terracotta-500 to-gold-400 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <p className="text-sm text-white/80">
              <span className="font-semibold text-white">No fake numbers.</span> Every metric above
              is a placeholder — Artouris will publish real pilot data once the program launches.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CounterLabel({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="font-display text-2xl font-extrabold text-white sm:text-3xl"
    >
      {inView ? value : "—"}
    </motion.span>
  );
}
