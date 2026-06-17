"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Map,
  Wallet,
  TrendingUp,
  Compass,
  CalendarRange,
  Store,
  ShieldCheck,
  Lock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { CTAButton } from "./CTAButton";
import { INTELLIGENCE_CARDS } from "@/lib/artouris/content";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Map,
  Wallet,
  TrendingUp,
  Compass,
  CalendarRange,
  Store,
};

export function IntelligenceSection() {
  return (
    <section
      id="intelligence"
      aria-labelledby="intelligence-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute inset-0 bg-grid-sand opacity-[0.08]" />
        <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-terracotta-500/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 h-[360px] w-[360px] rounded-full bg-tile-blue/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 backdrop-blur">
              <Compass className="h-3.5 w-3.5" /> Destination intelligence
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.85rem]">
              Tourism intelligence for{" "}
              <span className="bg-gradient-to-r from-terracotta-300 via-gold-300 to-tile-green/80 bg-clip-text text-transparent">
                smarter destinations.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 text-pretty sm:text-lg">
              Artouris transforms anonymized traveler demand into insights that help
              destinations understand what visitors want, where interest is growing,
              and where new opportunities are emerging.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5 text-tile-green/80" /> Privacy-conscious
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
                <Lock className="h-3.5 w-3.5 text-gold-300" /> Anonymized by design
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
                <Map className="h-3.5 w-3.5 text-terracotta-300" /> Built for territories
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Dashboard mockup */}
        <ScrollReveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
            {/* Dashboard top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-terracotta-500 to-gold-400 text-white">
                  <TrendingUp className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold">Artouris Intelligence</span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-tile-green/20 px-2 py-0.5 text-[10px] font-semibold text-tile-green">
                  <span className="h-1.5 w-1.5 rounded-full bg-tile-green" /> Live · pilot
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/60">
                <span className="rounded-md bg-white/5 px-2 py-1">Last 30 days</span>
                <span className="rounded-md bg-white/5 px-2 py-1">Morocco</span>
                <span className="rounded-md bg-white/5 px-2 py-1">All sources</span>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 border-b border-white/10 px-5 py-4 sm:grid-cols-4">
              {[
                { label: "Active itineraries", value: "Sample", trend: "Pilot phase" },
                { label: "Regions represented", value: "12", trend: "Of Morocco" },
                { label: "Avg. planning time", value: "Minutes", trend: "vs hours" },
                { label: "Local businesses", value: "Network", trend: "Growing" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-xl bg-white/[0.04] p-3">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">{kpi.label}</p>
                  <p className="mt-0.5 text-lg font-bold text-white">{kpi.value}</p>
                  <p className="text-[10px] text-tile-green/80">{kpi.trend}</p>
                </div>
              ))}
            </div>

            {/* Cards grid */}
            <StaggerGroup className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {INTELLIGENCE_CARDS.map((c) => {
                const Icon = iconMap[c.icon] ?? Compass;
                return (
                  <motion.div
                    key={c.title}
                    variants={itemVariants}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta-300/40 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-gold-300">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white/70">
                        {c.metric}
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-white">{c.title}</h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-white/65">{c.description}</p>
                    <div className="mt-3">
                      <MiniViz type={c.type} />
                    </div>
                  </motion.div>
                );
              })}
            </StaggerGroup>

            {/* Footer */}
            <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-5 py-4 sm:flex-row">
              <p className="text-xs text-white/60">
                <span className="font-semibold text-white/80">Privacy-conscious.</span> Anonymized. Built to support better tourism decisions.
              </p>
              <CTAButton
                href="#waitlist"
                size="sm"
                className="!bg-white !text-navy-800 hover:!bg-gold-300 hover:!text-navy-900"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Request a demo
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function MiniViz({ type }: { type: string }) {
  switch (type) {
    case "list":
      return (
        <div className="space-y-1.5">
          {[
            { label: "Desert & dunes", value: 80 },
            { label: "Medina & heritage", value: 65 },
            { label: "Local food", value: 52 },
            { label: "Coastal escape", value: 38 },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-2">
              <span className="w-24 text-[10px] text-white/60">{r.label}</span>
              <div className="relative h-1.5 flex-1 rounded-full bg-white/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-terracotta-400 to-gold-300"
                  style={{ width: `${r.value}%` }}
                />
              </div>
              <span className="w-6 text-right text-[10px] font-semibold text-white/80">{r.value}</span>
            </div>
          ))}
        </div>
      );
    case "bars":
      return (
        <div className="flex items-end gap-1.5 h-12">
          {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-terracotta-500/40 to-gold-300"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      );
    case "trend":
      return (
        <svg viewBox="0 0 200 50" className="h-12 w-full">
          <defs>
            <linearGradient id="trend-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#D4A958" stopOpacity="0.5" />
              <stop offset="1" stopColor="#D4A958" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 40 Q 30 30 50 32 T 100 22 T 150 14 T 200 8 L 200 50 L 0 50 Z"
            fill="url(#trend-g)"
          />
          <path
            d="M0 40 Q 30 30 50 32 T 100 22 T 150 14 T 200 8"
            stroke="#D4A958"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      );
    case "rings":
      return (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 40 40" className="h-12 w-12">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            <circle
              cx="20" cy="20" r="16" fill="none" stroke="#2F5D54" strokeWidth="4"
              strokeDasharray="32 100" strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
            <circle
              cx="20" cy="20" r="16" fill="none" stroke="#D2542A" strokeWidth="4"
              strokeDasharray="20 100" strokeDashoffset="-32" strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
          </svg>
          <div className="space-y-1 text-[10px]">
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-tile-green" /> <span className="text-white/70">Underexplored</span></div>
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-terracotta-500" /> <span className="text-white/70">Emerging</span></div>
          </div>
        </div>
      );
    case "calendar":
      return (
        <div className="grid grid-cols-12 gap-0.5">
          {Array.from({ length: 36 }).map((_, i) => {
            const intensity = (Math.sin(i * 0.7) + 1) / 2;
            return (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-sm",
                  intensity > 0.7
                    ? "bg-terracotta-400"
                    : intensity > 0.4
                    ? "bg-terracotta-500/40"
                    : "bg-white/10"
                )}
              />
            );
          })}
        </div>
      );
    case "grid":
      return (
        <div className="grid grid-cols-10 gap-0.5">
          {Array.from({ length: 50 }).map((_, i) => {
            const active = [3, 4, 5, 12, 13, 14, 15, 22, 23, 24, 32, 33, 41, 42].includes(i);
            return (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-sm",
                  active ? "bg-gold-300" : "bg-white/10"
                )}
              />
            );
          })}
        </div>
      );
    case "map":
    default:
      return (
        <svg viewBox="0 0 200 60" className="h-12 w-full">
          <path
            d="M10 50 Q 40 30 70 45 T 130 30 T 190 35"
            stroke="#D2542A"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
          />
          {[
            { x: 30, y: 42, c: "#D2542A" },
            { x: 80, y: 38, c: "#D4A958" },
            { x: 130, y: 30, c: "#2F5D54" },
            { x: 175, y: 35, c: "#D2542A" },
          ].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="white" stroke={p.c} strokeWidth="2" />
          ))}
        </svg>
      );
  }
}
