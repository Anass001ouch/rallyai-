"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ScrollReveal, StaggerGroup, itemVariants } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { CTAButton } from "./CTAButton";
import { DESTINATIONS } from "@/lib/artouris/content";
import { cn } from "@/lib/utils";

// Per-destination SVG "emblem" — abstract, premium, no clichés
function DestinationEmblem({ pattern }: { pattern: string }) {
  const common = "absolute inset-0 h-full w-full";
  switch (pattern) {
    case "souk":
      return (
        <svg className={common} viewBox="0 0 200 200" aria-hidden preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="p-souk" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="rgba(0,0,0,0)" />
              <path d="M0 10 L10 0 L20 10 L10 20 Z" fill="rgba(255,255,255,0.18)" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#p-souk)" />
          <circle cx="160" cy="40" r="40" fill="rgba(255,255,255,0.18)" />
          <path d="M-10 170 Q 60 130 110 160 T 220 150 L 220 200 L -10 200 Z" fill="rgba(0,0,0,0.18)" />
        </svg>
      );
    case "tile":
      return (
        <svg className={common} viewBox="0 0 200 200" aria-hidden preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="p-tile" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M16 0 L32 16 L16 32 L0 16 Z" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
              <path d="M16 8 L24 16 L16 24 L8 16 Z" fill="rgba(255,255,255,0.16)" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#p-tile)" />
        </svg>
      );
    case "diamond":
      return (
        <svg className={common} viewBox="0 0 200 200" aria-hidden preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 5 }).map((_, i) => (
            <rect
              key={i}
              x={100 - 12 - i * 14}
              y={100 - 18 - i * 14}
              width={24 + i * 28}
              height={36 + i * 28}
              rx="4"
              transform="rotate(15 100 100)"
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.2"
            />
          ))}
        </svg>
      );
    case "dunes":
      return (
        <svg className={common} viewBox="0 0 200 200" aria-hidden preserveAspectRatio="xMidYMid slice">
          <circle cx="160" cy="40" r="28" fill="rgba(255,255,255,0.4)" />
          <path d="M-10 140 Q 40 100 90 140 T 200 130 L 200 200 L -10 200 Z" fill="rgba(0,0,0,0.18)" />
          <path d="M-10 165 Q 50 130 110 165 T 200 155 L 200 200 L -10 200 Z" fill="rgba(0,0,0,0.28)" />
          <path d="M-10 185 Q 60 160 130 185 T 200 180 L 200 200 L -10 200 Z" fill="rgba(0,0,0,0.4)" />
        </svg>
      );
    case "mountains":
      return (
        <svg className={common} viewBox="0 0 200 200" aria-hidden preserveAspectRatio="xMidYMid slice">
          <path d="M-10 200 L 40 80 L 80 140 L 120 60 L 160 130 L 200 90 L 210 200 Z" fill="rgba(255,255,255,0.22)" />
          <path d="M-10 200 L 50 120 L 100 170 L 150 110 L 210 200 Z" fill="rgba(0,0,0,0.28)" />
          <path d="M40 80 L 50 95 L 30 95 Z" fill="rgba(255,255,255,0.5)" />
          <path d="M120 60 L 130 75 L 110 75 Z" fill="rgba(255,255,255,0.5)" />
        </svg>
      );
    case "wave":
      return (
        <svg className={common} viewBox="0 0 200 200" aria-hidden preserveAspectRatio="xMidYMid slice">
          <path d="M-10 100 Q 50 80 100 100 T 210 100 L 210 200 L -10 200 Z" fill="rgba(255,255,255,0.18)" />
          <path d="M-10 130 Q 50 110 100 130 T 210 130 L 210 200 L -10 200 Z" fill="rgba(255,255,255,0.24)" />
          <path d="M-10 160 Q 50 140 100 160 T 210 160 L 210 200 L -10 200 Z" fill="rgba(0,0,0,0.25)" />
        </svg>
      );
    case "harbor":
      return (
        <svg className={common} viewBox="0 0 200 200" aria-hidden preserveAspectRatio="xMidYMid slice">
          <rect x="20" y="60" width="14" height="80" fill="rgba(255,255,255,0.4)" />
          <rect x="40" y="80" width="12" height="60" fill="rgba(255,255,255,0.3)" />
          <rect x="160" y="70" width="14" height="70" fill="rgba(255,255,255,0.4)" />
          <path d="M-10 140 Q 50 130 100 140 T 210 135 L 210 200 L -10 200 Z" fill="rgba(0,0,0,0.25)" />
        </svg>
      );
    case "stone":
      return (
        <svg className={common} viewBox="0 0 200 200" aria-hidden preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 18 }).map((_, i) => {
            const x = (i % 6) * 36 + 6;
            const y = Math.floor(i / 6) * 60 + 20;
            const w = 22 + (i % 3) * 6;
            const h = 14 + (i % 2) * 4;
            return (
              <ellipse
                key={i}
                cx={x + w / 2}
                cy={y + h / 2}
                rx={w / 2}
                ry={h / 2}
                fill="rgba(255,255,255,0.18)"
                stroke="rgba(0,0,0,0.18)"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      );
    default:
      return null;
  }
}

export function DestinationsSection() {
  return (
    <section
      id="explore"
      aria-labelledby="explore-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 to-sand-100/40" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Explore Morocco"
            eyebrowIcon={<MapPin className="h-3.5 w-3.5" />}
            title={
              <>
                Discover Morocco beyond{" "}
                <span className="gradient-text-sunset">generic recommendations.</span>
              </>
            }
            subtitle="Eight destinations, each with its own rhythm. Artouris helps you build a trip around any of them — or combine several."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {DESTINATIONS.map((d) => (
            <motion.article
              key={d.name}
              variants={itemVariants}
              className={cn(
                "group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-card-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-warm"
              )}
            >
              {/* gradient bg */}
              <div className={cn("absolute inset-0 bg-gradient-to-br", d.gradient)} />
              {/* pattern */}
              <DestinationEmblem pattern={d.pattern} />
              {/* darken for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent" />
              <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
                <MapPin className="h-2.5 w-2.5" /> Morocco
              </div>
              <div className="relative">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {d.bestFor.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold leading-tight">
                  {d.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-white/85">{d.tagline}</p>
                <p className="mt-2 text-[11px] leading-snug text-white/75 line-clamp-2 text-pretty">
                  {d.summary}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const ev = new CustomEvent("artouris:use-prompt", {
                      detail: `Plan a trip around ${d.name} — ${d.tagline}.`,
                    });
                    window.dispatchEvent(ev);
                    const el = document.getElementById("demo");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur transition-all duration-200 hover:bg-white hover:text-navy-800"
                >
                  Plan around this
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </StaggerGroup>

        <ScrollReveal delay={0.05} className="mt-10 flex justify-center">
          <CTAButton href="#hero-prompt" size="lg">
            Plan my Morocco trip
          </CTAButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
