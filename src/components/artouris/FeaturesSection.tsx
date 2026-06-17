"use client";

import { motion } from "framer-motion";
import {
  Brain,
  CalendarRange,
  Compass,
  MessagesSquare,
  BarChart3,
  Languages,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { AI_FEATURES } from "@/lib/artouris/content";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  CalendarRange,
  Compass,
  MessagesSquare,
  BarChart3,
  Languages,
};

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Capabilities"
            eyebrowIcon={<Brain className="h-3.5 w-3.5" />}
            title={
              <>
                What Artouris AI{" "}
                <span className="gradient-text-warm">does.</span>
              </>
            }
            subtitle="Six capabilities that turn a single travel intention into an intelligent, locally connected journey."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AI_FEATURES.map((f) => {
            const Icon = iconMap[f.icon] ?? Brain;
            return (
              <motion.article
                key={f.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-sand-200 bg-white p-6 shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:border-terracotta-200 hover:shadow-card-warm"
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-terracotta-100/60 to-gold-300/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sand-100 to-terracotta-50 text-terracotta-600 ring-1 ring-terracotta-200/50">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-bold text-navy-800">
                      {f.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600 text-pretty">
                    {f.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
