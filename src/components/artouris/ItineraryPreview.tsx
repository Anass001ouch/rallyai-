"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Clock,
  Mountain,
  UtensilsCrossed,
  Tent,
  Landmark,
  Store,
  Sun,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ItineraryDay {
  day: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const DEFAULT_ITINERARY: ItineraryDay[] = [
  {
    day: "Day 1",
    title: "Marrakech arrival + Medina food walk",
    description: "Settle into your riad, then wander the souks and end the day with a street-food tour through Jemaa el-Fnaa.",
    icon: Landmark,
    accent: "terracotta",
  },
  {
    day: "Day 2",
    title: "Atlas Mountains village experience",
    description: "Drive into the High Atlas to Imlil, walk terraced trails, share tea with a Berber family, and lunch with valley views.",
    icon: Mountain,
    accent: "tile-green",
  },
  {
    day: "Day 3",
    title: "Aït Ben Haddou + desert route",
    description: "Cross the Tizi N'Tichka pass to the ksar of Aït Ben Haddou, then continue east toward the dunes of Merzouga.",
    icon: Sun,
    accent: "gold",
  },
  {
    day: "Day 4",
    title: "Sahara camp + local music",
    description: "Camel-trek into Erg Chebbi at sunset, dinner under the stars, and Gnawa rhythms around the fire at a Berber camp.",
    icon: Tent,
    accent: "terracotta",
  },
  {
    day: "Day 5",
    title: "Artisan market + return plan",
    description: "Sunrise over the dunes, breakfast in a local house, then a relaxed artisan-market stop before the return route.",
    icon: Store,
    accent: "tile-blue",
  },
];

const accentMap: Record<string, { bg: string; text: string; ring: string }> = {
  terracotta: {
    bg: "bg-terracotta-50",
    text: "text-terracotta-600",
    ring: "ring-terracotta-200",
  },
  gold: { bg: "bg-[#FBF1DE]", text: "text-gold-600", ring: "ring-gold-300/60" },
  "tile-green": { bg: "bg-[#E7F0EE]", text: "text-tile-green", ring: "ring-[#BFD8D2]" },
  "tile-blue": { bg: "bg-[#E6EEF5]", text: "text-tile-blue", ring: "ring-[#BFD2E2]" },
};

interface ItineraryPreviewProps {
  days?: ItineraryDay[];
  className?: string;
  compact?: boolean;
  animated?: boolean;
}

export function ItineraryPreview({
  days = DEFAULT_ITINERARY,
  className,
  compact = false,
  animated = true,
}: ItineraryPreviewProps) {
  return (
    <ol
      className={cn(
        "relative flex flex-col",
        compact ? "gap-2.5" : "gap-4",
        className
      )}
    >
      {/* vertical timeline line */}
      <span
        aria-hidden
        className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-terracotta-300 via-gold-300 to-tile-green/40"
      />
      {days.map((d, i) => {
        const a = accentMap[d.accent] ?? accentMap.terracotta;
        const Icon = d.icon;
        return (
          <motion.li
            key={d.day}
            className="relative flex items-start gap-3.5"
            initial={animated ? { opacity: 0, x: -8 } : false}
            animate={animated ? { opacity: 1, x: 0 } : undefined}
            transition={{
              delay: animated ? 0.15 + i * 0.12 : 0,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              className={cn(
                "relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-2 ring-white shadow-sm",
                a.bg,
                a.text
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("text-[11px] font-bold uppercase tracking-wider", a.text)}>
                  {d.day}
                </span>
                <span className="text-[11px] text-navy-400">·</span>
                <span className="text-[11px] text-navy-500 inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Full day
                </span>
              </div>
              <h4
                className={cn(
                  "font-display font-semibold text-navy-800 leading-snug mt-0.5",
                  compact ? "text-sm" : "text-[0.95rem]"
                )}
              >
                {d.title}
              </h4>
              {!compact && (
                <p className="mt-1 text-[13px] leading-relaxed text-navy-600 text-pretty">
                  {d.description}
                </p>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

/** Map-style route visual — used inside hero card and demo */
export function RouteMiniMap({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-sand-200 bg-gradient-to-br from-sand-50 to-sand-100",
        className
      )}
    >
      <svg
        viewBox="0 0 400 200"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="gridmap" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#6E4D29" strokeOpacity="0.08" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="route1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D2542A" />
            <stop offset="0.6" stopColor="#D4A958" />
            <stop offset="1" stopColor="#2F5D54" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#gridmap)" />
        {/* abstract landmasses */}
        <path
          d="M30 120 Q 80 80 140 110 T 260 100 Q 320 90 380 130 L 380 200 L 30 200 Z"
          fill="#EBE0CB"
          opacity="0.7"
        />
        <path
          d="M70 70 Q 110 50 160 70 T 250 65"
          fill="none"
          stroke="#C8A97A"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
        {/* animated route */}
        <path
          d="M70 150 Q 120 120 170 130 T 280 100 Q 320 90 350 70"
          fill="none"
          stroke="url(#route1)"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-route-dash"
        />
        {/* stops */}
        {[
          { x: 70, y: 150, c: "#D2542A", label: "Marrakech" },
          { x: 170, y: 130, c: "#D4A958", label: "Atlas" },
          { x: 230, y: 115, c: "#B58A55", label: "Aït Ben Haddou" },
          { x: 300, y: 95, c: "#E27048", label: "Merzouga" },
          { x: 350, y: 70, c: "#2F5D54", label: "Fes" },
        ].map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r="5" fill="white" stroke={s.c} strokeWidth="2.5" />
            <circle cx={s.x} cy={s.y} r="2" fill={s.c} />
          </g>
        ))}
      </svg>
      <div className="relative flex flex-wrap items-center gap-2 p-3">
        <MapPin className="h-3.5 w-3.5 text-terracotta-500" />
        <span className="text-[11px] font-semibold text-navy-700">
          Marrakech → Atlas → Aït Ben Haddou → Merzouga → Fes
        </span>
      </div>
    </div>
  );
}
