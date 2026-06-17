"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { CTAButton } from "./CTAButton";
import { COMPARISON_ROWS } from "@/lib/artouris/content";

export function ComparisonSection() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-100/50 to-sand-50" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Why Artouris"
            eyebrowIcon={<Sparkles className="h-3.5 w-3.5" />}
            title={
              <>
                Not just another{" "}
                <span className="gradient-text-sunset">travel planner.</span>
              </>
            }
            subtitle="Traditional platforms were built for search. Artouris was built for intention — and for the local ecosystems behind every destination."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-card-soft">
            {/* Header row */}
            <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-px bg-sand-100 sm:grid-cols-[1.4fr_1fr_1fr]">
              <div className="bg-white p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-navy-500">
                  Dimension
                </span>
              </div>
              <div className="bg-sand-50/80 p-5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sand-200 text-navy-600">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-bold text-navy-700">
                    Traditional platforms
                  </span>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-terracotta-50 to-gold-300/20 p-5 ring-1 ring-terracotta-200">
                <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-terracotta-500 via-terracotta-400 to-gold-400" />
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-terracotta-500 to-gold-400 text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-bold text-terracotta-700">Artouris</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <StaggerGroup>
              {COMPARISON_ROWS.map((r) => (
                <motion.div
                  key={r.dimension}
                  variants={itemVariants}
                  className="grid grid-cols-[1.1fr_1fr_1fr] gap-px border-t border-sand-100 bg-sand-100 sm:grid-cols-[1.4fr_1fr_1fr]"
                >
                  <div className="bg-white p-4 sm:p-5">
                    <p className="text-sm font-semibold text-navy-800">{r.dimension}</p>
                  </div>
                  <div className="bg-sand-50/40 p-4 sm:p-5">
                    <div className="flex items-start gap-2">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                      <p className="text-[13px] leading-snug text-navy-600">{r.traditional}</p>
                    </div>
                  </div>
                  <div className="relative bg-gradient-to-br from-terracotta-50/50 to-white p-4 sm:p-5">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-terracotta-500 to-gold-400 text-white">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <p className="text-[13px] font-medium leading-snug text-navy-800">{r.artouris}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10">
          <div className="mx-auto max-w-3xl rounded-3xl border border-terracotta-200 bg-gradient-to-br from-terracotta-50 via-white to-gold-300/15 p-7 text-center shadow-card-soft">
            <p className="text-balance font-display text-lg font-bold text-navy-800 sm:text-xl">
              Artouris combines{" "}
              <span className="text-terracotta-600">B2C travel planning</span>,{" "}
              <span className="text-tile-green">B2B local visibility</span>, and{" "}
              <span className="text-tile-blue">destination-level intelligence</span>{" "}
              in one platform.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <CTAButton href="#hero-prompt" size="md">
                Try the trip planner
              </CTAButton>
              <CTAButton href="#waitlist" size="md" variant="secondary" icon={null}>
                Request a demo
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
