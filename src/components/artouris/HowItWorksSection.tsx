"use client";

import { motion } from "framer-motion";
import {
  MessageSquareText,
  Route,
  Wand2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { CTAButton } from "./CTAButton";
import { MoroccanPattern } from "./MoroccanPattern";
import { SOLUTION_STEPS } from "@/lib/artouris/content";

const iconMap: Record<string, LucideIcon> = {
  MessageSquareText,
  Route,
  Wand2,
};

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sand-100/50 via-sand-50 to-sand-100/50" />
        <MoroccanPattern variant="dots" className="opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="How it works"
            eyebrowIcon={<Route className="h-3.5 w-3.5" />}
            title={
              <>
                One prompt.{" "}
                <span className="gradient-text-warm">One intelligent journey.</span>
              </>
            }
            subtitle="From a sentence in your own words to a structured day-by-day plan, then refined in conversation."
          />
        </ScrollReveal>

        <div className="relative mt-14">
          {/* Connecting line on desktop */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[64px] hidden lg:block"
          >
            <svg
              viewBox="0 0 1000 20"
              className="w-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#D2542A" />
                  <stop offset="0.5" stopColor="#D4A958" />
                  <stop offset="1" stopColor="#2F5D54" />
                </linearGradient>
              </defs>
              <path
                d="M 80 10 Q 350 10 500 10 T 920 10"
                stroke="url(#line-grad)"
                strokeWidth="2"
                strokeDasharray="6 8"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <StaggerGroup className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {SOLUTION_STEPS.map((step) => {
              const Icon = iconMap[step.icon] ?? MessageSquareText;
              return (
                <motion.article
                  key={step.number}
                  variants={itemVariants}
                  className="group relative flex flex-col items-start rounded-3xl border border-sand-200 bg-white p-7 shadow-card-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-warm"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta-500 via-terracotta-400 to-gold-400 text-white shadow-md ring-4 ring-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-5xl font-extrabold leading-none text-sand-200 transition-colors group-hover:text-terracotta-200">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-navy-800">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600 text-pretty">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </StaggerGroup>
        </div>

        <ScrollReveal delay={0.1} className="mt-12 flex justify-center">
          <CTAButton href="#hero-prompt" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Try the trip planner
          </CTAButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
