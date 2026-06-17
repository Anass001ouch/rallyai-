"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Compass,
  Wallet,
  Brain,
  MapPin,
  MessagesSquare,
  HeartHandshake,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { CTAButton } from "./CTAButton";
import { TRAVELER_BENEFITS } from "@/lib/artouris/content";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Compass,
  Wallet,
  Brain,
  MapPin,
  MessagesSquare,
  HeartHandshake,
};

export function ForTravelersSection() {
  return (
    <section
      id="for-travelers"
      aria-labelledby="for-travelers-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta-50/60 via-sand-50 to-sand-50" />
        <div className="absolute top-10 right-0 h-[360px] w-[360px] rounded-full bg-terracotta-200/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-14">
          {/* Left: header + CTA */}
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                align="left"
                eyebrow="For travelers"
                eyebrowIcon={<Compass className="h-3.5 w-3.5" />}
                title={
                  <>
                    Designed for travelers who want{" "}
                    <span className="gradient-text-sunset">more than a generic trip.</span>
                  </>
                }
                subtitle="Artouris turns your intention into a structured plan and connects you with experiences that match — not just the places that rank highest."
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <CTAButton href="#hero-prompt" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                  Plan my Morocco trip
                </CTAButton>
                <CTAButton href="#demo" size="lg" variant="secondary" icon={null}>
                  See example trip
                </CTAButton>
              </div>
              <p className="mt-4 text-xs text-navy-500 max-w-sm">
                No complex filters. No endless tabs. Just describe the experience you want.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: benefits grid */}
          <StaggerGroup className="grid gap-4 sm:grid-cols-2">
            {TRAVELER_BENEFITS.map((b) => {
              const Icon = iconMap[b.icon] ?? Compass;
              return (
                <motion.div
                  key={b.title}
                  variants={itemVariants}
                  className="group rounded-2xl border border-sand-200 bg-white p-5 shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:border-terracotta-200 hover:shadow-card-warm"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-terracotta-100 to-sand-100 text-terracotta-600 ring-1 ring-terracotta-200/50">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-navy-800">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-600 text-pretty">
                    {b.description}
                  </p>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
