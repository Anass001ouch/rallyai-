"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers, Sparkles, EyeOff, type LucideIcon } from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { CTAButton } from "./CTAButton";
import { PAIN_POINTS } from "@/lib/artouris/content";

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Sparkles,
  EyeOff,
};

export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      className="relative py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="The status quo"
            eyebrowIcon={<EyeOff className="h-3.5 w-3.5" />}
            title={
              <>
                Travel planning is{" "}
                <span className="text-terracotta-600">broken.</span>
              </>
            }
            subtitle="Most travelers don't lack information — they drown in it. And the people who could give them a better experience stay invisible."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PAIN_POINTS.map((p) => {
            const Icon = iconMap[p.icon] ?? Layers;
            return (
              <motion.div
                key={p.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-sand-200 bg-white p-6 shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:border-terracotta-200 hover:shadow-card-warm"
              >
                <div
                  aria-hidden
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-terracotta-50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-terracotta-100 to-sand-100 text-terracotta-600 ring-1 ring-terracotta-200/50">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-800">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600 text-pretty">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>

        {/* Transition line */}
        <ScrollReveal delay={0.1} className="mt-14">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-3xl border border-terracotta-200 bg-gradient-to-br from-terracotta-50 via-white to-gold-300/20 p-7 text-center shadow-card-soft sm:p-9">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-terracotta-500 to-gold-400 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </span>
            <p className="text-balance font-display text-xl font-bold text-navy-800 sm:text-2xl">
              Artouris brings travelers, local businesses, and destination intelligence
              into one{" "}
              <span className="gradient-text-sunset">AI-powered experience.</span>
            </p>
            <CTAButton href="#how-it-works" variant="secondary" size="md" icon={<ArrowRight className="h-4 w-4" />}>
              See how it works
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
