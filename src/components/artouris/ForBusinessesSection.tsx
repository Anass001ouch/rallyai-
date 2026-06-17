"use client";

import { motion } from "framer-motion";
import {
  BedDouble,
  UserRound,
  Hammer,
  Users,
  UtensilsCrossed,
  Drama,
  Tent,
  Plane,
  FileText,
  Sparkles,
  Target,
  Globe,
  Languages,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { CTAButton } from "./CTAButton";
import { BUSINESS_CATEGORIES, BUSINESS_BENEFITS } from "@/lib/artouris/content";

const categoryIcon: Record<string, LucideIcon> = {
  BedDouble,
  UserRound,
  Hammer,
  Users,
  UtensilsCrossed,
  Drama,
  Tent,
  Plane,
};

const benefitIcon: Record<string, LucideIcon> = {
  FileText,
  Sparkles,
  Target,
  Globe,
  Languages,
  TrendingUp,
};

export function ForBusinessesSection() {
  return (
    <section
      id="for-businesses"
      aria-labelledby="for-businesses-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sand-50 via-tile-green/5 to-sand-50" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-tile-green/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="For local businesses"
            eyebrowIcon={<Store />}
            title={
              <>
                Help the right travelers{" "}
                <span className="gradient-text-warm">find you.</span>
              </>
            }
            subtitle="Artouris helps local tourism actors become discoverable through AI-powered matching — not only through advertising budgets or generic search rankings."
          />
        </ScrollReveal>

        {/* Category pills */}
        <ScrollReveal delay={0.05}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
            {BUSINESS_CATEGORIES.map((c) => {
              const Icon = categoryIcon[c.icon] ?? Store;
              return (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sand-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-700 shadow-sm transition-colors hover:border-terracotta-200 hover:bg-terracotta-50/60 hover:text-terracotta-700"
                >
                  <Icon className="h-3.5 w-3.5 text-terracotta-500" />
                  {c.label}
                </span>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Benefits */}
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_BENEFITS.map((b) => {
            const Icon = benefitIcon[b.icon] ?? Sparkles;
            return (
              <motion.article
                key={b.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-sand-200 bg-white p-6 shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:border-tile-green/40 hover:shadow-card-warm"
              >
                <div
                  aria-hidden
                  className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-tile-green/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-tile-green/15 to-sand-100 text-tile-green ring-1 ring-tile-green/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-navy-800">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600 text-pretty">
                    {b.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </StaggerGroup>

        {/* CTA */}
        <ScrollReveal delay={0.1} className="mt-12">
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-tile-green/20 bg-gradient-to-br from-tile-green/8 via-white to-sand-50 p-7 text-center shadow-card-soft sm:p-9">
            <p className="max-w-2xl text-balance font-display text-xl font-bold text-navy-800 sm:text-2xl">
              Join a network built for local ecosystems — not extracted from them.
            </p>
            <p className="max-w-xl text-sm text-navy-600">
              Create your profile, get matched with travelers whose intention fits your offer, and reduce dependence on foreign platforms.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <CTAButton href="#waitlist" size="lg" variant="dark">
                List your business
              </CTAButton>
              <CTAButton href="#waitlist" size="lg" variant="secondary" icon={null}>
                Join the local network
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Inline icon (avoid extra import churn)
function Store(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
    </svg>
  );
}
