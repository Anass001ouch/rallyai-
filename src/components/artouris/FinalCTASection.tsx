"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight, Store, Compass, Landmark } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { CTAButton } from "./CTAButton";
import { MoroccanPattern } from "./MoroccanPattern";

export function FinalCTASection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sand-50 via-sand-100/40 to-terracotta-50/40" />
        <MoroccanPattern variant="zellige" className="opacity-50" />
        <div className="absolute top-0 right-1/4 h-[360px] w-[360px] rounded-full bg-terracotta-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[320px] w-[320px] rounded-full bg-gold-300/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[32px] border border-terracotta-200 bg-white/85 p-8 shadow-hero-glow backdrop-blur-xl sm:p-12 lg:p-16">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-terracotta-300/50 to-gold-300/30 blur-2xl"
            />
            <div
              aria-hidden
              className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-gradient-to-br from-tile-green/20 to-tile-blue/20 blur-2xl"
            />

            <div className="relative flex flex-col items-center text-center">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 8, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta-500 via-terracotta-400 to-gold-400 text-white shadow-lg ring-4 ring-white"
              >
                <Sparkles className="h-6 w-6" />
              </motion.span>

              <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-navy-800 text-balance sm:text-4xl lg:text-[2.85rem]">
                Your Moroccan journey starts with{" "}
                <span className="gradient-text-sunset">one prompt.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-600 text-pretty sm:text-lg">
                Tell Artouris what you want to experience. Let AI build the journey — and
                connect you with the local people who make it real.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                <CTAButton href="#hero-prompt" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                  Plan my trip
                </CTAButton>
                <CTAButton
                  href="#waitlist"
                  size="lg"
                  variant="secondary"
                  icon={<Store className="h-4 w-4" />}
                  iconPosition="left"
                >
                  List your business
                </CTAButton>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-navy-500">
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-1.5 font-semibold text-terracotta-700 underline-offset-4 transition hover:text-terracotta-600 hover:underline"
                >
                  <Landmark className="h-3.5 w-3.5" />
                  Request destination demo
                </a>
                <a
                  href="#explore"
                  className="inline-flex items-center gap-1.5 font-medium text-navy-600 transition hover:text-terracotta-600"
                >
                  <Compass className="h-3.5 w-3.5" />
                  Explore Morocco first
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
