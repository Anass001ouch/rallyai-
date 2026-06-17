"use client";

import { motion } from "framer-motion";
import {
  Landmark,
  Mountain,
  Trees,
  UtensilsCrossed,
  Hammer,
  Waves,
  House,
  HeartHandshake,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { MoroccanPattern } from "./MoroccanPattern";
import { MOROCCAN_TOUCH } from "@/lib/artouris/content";

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Mountain,
  Trees,
  UtensilsCrossed,
  Hammer,
  Waves,
  House,
  HeartHandshake,
};

export function MoroccanTouchSection() {
  return (
    <section
      id="morocco"
      aria-labelledby="morocco-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-100/40 to-sand-50" />
        <MoroccanPattern variant="zellige" className="opacity-40" />
        <div className="absolute top-10 right-10 h-[320px] w-[320px] rounded-full bg-terracotta-200/30 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-[280px] w-[280px] rounded-full bg-gold-300/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Morocco launch market"
            eyebrowIcon={<Globe2 className="h-3.5 w-3.5" />}
            title={
              <>
                Built for authentic{" "}
                <span className="gradient-text-sunset">Morocco.</span>
              </>
            }
            subtitle="Morocco is our first launch market because it combines cultural diversity, strong tourism potential, local entrepreneurship, and a growing need for intelligent digital tourism infrastructure."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {MOROCCAN_TOUCH.map((c) => {
            const Icon = iconMap[c.icon] ?? Landmark;
            return (
              <motion.div
                key={c.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-sand-200 bg-white p-5 shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:border-terracotta-200 hover:shadow-card-warm"
              >
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-terracotta-100/60 to-gold-300/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-terracotta-100 to-sand-100 text-terracotta-600 ring-1 ring-terracotta-200/50">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-display text-sm font-bold text-navy-800">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-navy-600 text-pretty">
                    {c.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>

        <ScrollReveal delay={0.1} className="mt-12">
          <div className="mx-auto max-w-4xl rounded-3xl border border-sand-200 bg-white/80 p-7 text-center shadow-card-soft backdrop-blur sm:p-9">
            <p className="text-balance font-display text-lg font-bold text-navy-800 sm:text-xl">
              The same model can later support other destinations that want to connect
              visitors with{" "}
              <span className="text-terracotta-600">authentic local experiences</span>{" "}
              while understanding tourism demand.
            </p>
            <p className="mt-3 text-sm text-navy-600">
              Starting in Morocco. Built to scale for authentic destinations worldwide.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
