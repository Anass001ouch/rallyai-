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
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-100/30 to-sand-50" />
      </div>

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
                "relative overflow-hidden rounded-2xl border border-sand-200 bg-white p-5 shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:border-terracotta-200 hover:shadow-card-warm",
                i === 0 && "lg:col-span-2 lg:row-span-1"
              )}
            >
              <div className="flex items-baseline gap-2">
                <CounterLabel value={m.value} />
                <span className="text-[10px] font-medium uppercase tracking-wider text-navy-500">
                  {m.suffix}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-navy-800 leading-snug text-pretty">
                {m.label}
              </p>
              <span className="pointer-events-none absolute -right-2 -top-2 text-[60px] font-bold leading-none text-sand-100/80 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </StaggerGroup>

        <ScrollReveal delay={0.1} className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-terracotta-200 bg-gradient-to-br from-terracotta-50 to-white p-5 text-center">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-terracotta-500 to-gold-400 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <p className="text-sm text-navy-700">
              <span className="font-semibold">No fake numbers.</span> Every metric above
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
      className="font-display text-2xl font-extrabold text-navy-800 sm:text-3xl"
    >
      {inView ? value : "—"}
    </motion.span>
  );
}
