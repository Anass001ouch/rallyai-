"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin, Compass, Sparkles } from "lucide-react";

interface City {
  id: string;
  name: string;
  keywords: string[];
  x: number;
  y: number;
  /** hex color for the active node ring */
  color?: string;
}

const CITIES: City[] = [
  { id: "tangier", name: "Tangier", keywords: ["tangier", "tanger", "north", "coast"], x: 30, y: 18, color: "#3A5778" },
  { id: "chefchaouen", name: "Chefchaouen", keywords: ["chefchaouen", "chauen", "blue", "rif"], x: 45, y: 25, color: "#5B779A" },
  { id: "rabat", name: "Rabat", keywords: ["rabat", "capital"], x: 55, y: 42, color: "#1F4E6E" },
  { id: "fes", name: "Fes", keywords: ["fes", "fez", "medina", "culture"], x: 90, y: 36, color: "#2F5D54" },
  { id: "casablanca", name: "Casablanca", keywords: ["casablanca", "casa", "ocean"], x: 40, y: 55, color: "#1F4E6E" },
  { id: "marrakech", name: "Marrakech", keywords: ["marrakech", "marrakesh", "medina", "atlas"], x: 70, y: 78, color: "#D2542A" },
  { id: "essaouira", name: "Essaouira", keywords: ["essaouira", "mogador", "coast", "surf"], x: 25, y: 78, color: "#3A5778" },
  { id: "agafay", name: "Agafay", keywords: ["agafay", "stone desert", "sunset"], x: 60, y: 84, color: "#B58A38" },
  { id: "zagora", name: "Zagora", keywords: ["zagora", "draa", "oasis"], x: 130, y: 86, color: "#B58A38" },
  { id: "merzouga", name: "Sahara · Merzouga", keywords: ["merzouga", "sahara", "desert", "dunes", "erg chebbi", "camp"], x: 155, y: 78, color: "#D4A958" },
  { id: "ouarzazate", name: "Ouarzazate", keywords: ["ouarzazate", "ait benhaddou", "kasbah"], x: 110, y: 70, color: "#B58A38" },
  { id: "atlas", name: "Atlas Mountains", keywords: ["atlas", "mountain", "hike", "imlil", "toubkal"], x: 88, y: 64, color: "#2F5D54" },
];

// More recognizable (but still stylized) Morocco outline traced on a 200×100 viewBox.
// Key control points: Tangier (top) → Mediterranean coast (right) → Atlas (center)
// → Souss (bottom-left) → Atlantic coast (left) → back to Tangier.
const MOROCCO_PATH = `
  M 22 12
  Q 18 18 22 24
  Q 28 32 38 30
  Q 55 30 75 30
  Q 110 28 140 32
  Q 160 36 168 44
  Q 170 52 160 58
  Q 150 66 145 70
  Q 150 80 165 84
  Q 160 90 145 88
  Q 130 92 110 90
  Q 88 94 65 90
  Q 42 92 28 86
  Q 16 78 12 64
  Q 8 48 14 32
  Q 18 20 22 12
  Z
`;

// Curved path through cities, sorted by latitude (top to bottom)
function buildCurvedPath(cities: City[]): string {
  if (cities.length < 2) return "";
  const sorted = [...cities].sort((a, b) => a.y - b.y);
  let d = `M ${sorted[0].x} ${sorted[0].y}`;
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    // Control point creates a smooth curve
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2 - 4;
    d += ` Q ${midX} ${midY} ${curr.x} ${curr.y}`;
  }
  return d;
}

export function VisualSuggestionMap({ prompt }: { prompt: string }) {
  const lowerPrompt = prompt.toLowerCase();

  const activeCities = CITIES.filter((city) =>
    city.keywords.some((kw) => lowerPrompt.includes(kw))
  );

  const routePath = buildCurvedPath(activeCities);
  const hasMultiple = activeCities.length > 1;

  return (
    <AnimatePresence>
      {prompt.trim().length > 5 && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden isometric-map-container"
        >
          <div className="relative overflow-hidden rounded-[24px] border border-sand-200/60 bg-gradient-to-br from-sand-50/80 to-white/60 backdrop-blur p-4 shadow-card-soft isometric-map">
            {/* Subtle zellige pattern overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, rgba(210, 84, 42, 0.5) 0%, transparent 35%), radial-gradient(circle at 70% 70%, rgba(47, 93, 84, 0.4) 0%, transparent 35%)",
              }}
            />

            {/* Header */}
            <div className="relative flex items-center justify-between mb-3" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-terracotta-500/10 flex items-center justify-center">
                  <Compass className="h-3.5 w-3.5 text-terracotta-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-500">
                    Visualizing your journey
                  </p>
                  <p className="text-[11px] font-semibold text-navy-700">
                    {activeCities.length > 0
                      ? `Trip to: ${activeCities.map((c) => c.name.split(" ")[0]).join(" · ")}`
                      : "Detecting destinations…"}
                  </p>
                </div>
              </div>
              {activeCities.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tile-green/15 text-tile-green text-[9px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-tile-green animate-pulse" />
                  {activeCities.length} stop{activeCities.length > 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Map container */}
            <div className="relative aspect-[2/1] w-full rounded-2xl bg-gradient-to-br from-white via-sand-50 to-sand-100 shadow-inner ring-1 ring-sand-200/60 overflow-hidden">
              <svg
                viewBox="0 0 200 100"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <pattern id="grid-pattern-v2" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#6E4D29" strokeOpacity="0.04" strokeWidth="0.4" />
                  </pattern>
                  <linearGradient id="morocco-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FAE2D6" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#F4BFA3" stopOpacity="0.55" />
                  </linearGradient>
                  <linearGradient id="route-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#D2542A" />
                    <stop offset="100%" stopColor="#D4A958" />
                  </linearGradient>
                </defs>

                {/* Grid */}
                <rect width="200" height="100" fill="url(#grid-pattern-v2)" />

                {/* Stylized Morocco outline */}
                <path
                  d={MOROCCO_PATH}
                  fill="url(#morocco-fill)"
                  stroke="#D2542A"
                  strokeOpacity="0.35"
                  strokeWidth="0.6"
                  strokeLinejoin="round"
                />

                {/* Secondary outline for depth */}
                <path
                  d={MOROCCO_PATH}
                  fill="none"
                  stroke="#B58A55"
                  strokeOpacity="0.18"
                  strokeWidth="1.2"
                  strokeDasharray="1 2"
                  transform="translate(1 1)"
                />

                {/* Curved route between active cities */}
                {hasMultiple && (
                  <>
                    {/* Soft glow under route */}
                    <path
                      d={routePath}
                      fill="none"
                      stroke="url(#route-gradient)"
                      strokeOpacity="0.18"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Main animated route */}
                    <path
                      d={routePath}
                      fill="none"
                      stroke="url(#route-gradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                      className="animate-route-dash"
                    />
                    {/* Traveling dot */}
                    <circle r="1.8" fill="#D2542A" stroke="white" strokeWidth="0.5">
                      <animateMotion dur="6s" repeatCount="indefinite" path={routePath} />
                    </circle>
                  </>
                )}

                {/* City nodes */}
                {CITIES.map((city) => {
                  const isActive = activeCities.some((c) => c.id === city.id);
                  const ringColor = city.color ?? "#D2542A";
                  return (
                    <g key={city.id}>
                      {/* Pulse ring for active */}
                      {isActive && (
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r="5"
                          fill={ringColor}
                          fillOpacity="0.18"
                          className="animate-pulse"
                        />
                      )}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={isActive ? "3" : "1.4"}
                        fill={isActive ? ringColor : "#B58A55"}
                        stroke={isActive ? "white" : "none"}
                        strokeWidth="0.5"
                        opacity={isActive ? 1 : 0.5}
                        style={{ transition: "all 0.3s ease" }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* HTML labels (positioned over SVG) */}
              <div className="absolute inset-0 pointer-events-none">
                {activeCities.map((city) => (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, y: 4, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-[140%]"
                    style={{ left: `${(city.x / 200) * 100}%`, top: `${(city.y / 100) * 100}%` }}
                  >
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-[9px] font-bold text-white shadow-md backdrop-blur whitespace-nowrap",
                        "ring-1 ring-white/30"
                      )}
                      style={{ background: city.color ?? "#D2542A" }}
                    >
                      {city.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer chips */}
            {activeCities.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mt-3 flex flex-wrap gap-1.5"
              >
                {activeCities.map((city) => (
                  <span
                    key={city.id}
                    className="inline-flex items-center gap-1 rounded-full bg-terracotta-50 px-2 py-0.5 text-[10px] font-bold text-terracotta-700 ring-1 ring-terracotta-200/60"
                  >
                    <MapPin className="w-2.5 h-2.5" />
                    {city.name}
                  </span>
                ))}
              </motion.div>
            ) : prompt.trim().length > 10 ? (
              <p className="relative mt-3 text-[11px] text-navy-500 italic flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-terracotta-400" />
                Type destinations like Marrakech, Fes, Chefchaouen, or Sahara to see them on the map...
              </p>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
