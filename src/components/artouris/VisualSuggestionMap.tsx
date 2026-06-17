"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface City {
  id: string;
  name: string;
  keywords: string[];
  x: number;
  y: number;
}

const CITIES: City[] = [
  { id: "tangier", name: "Tangier", keywords: ["tangier", "north", "coast", "tanger"], x: 100, y: 15 },
  { id: "chefchaouen", name: "Chefchaouen", keywords: ["chefchaouen", "blue", "north", "chauen"], x: 120, y: 25 },
  { id: "fes", name: "Fes", keywords: ["fes", "fez", "culture", "medina"], x: 135, y: 40 },
  { id: "casablanca", name: "Casablanca", keywords: ["casablanca", "casa", "ocean"], x: 75, y: 50 },
  { id: "marrakech", name: "Marrakech", keywords: ["marrakech", "marrakesh", "medina", "atlas"], x: 85, y: 70 },
  { id: "agadir", name: "Agadir", keywords: ["agadir", "beach", "surf", "ocean"], x: 50, y: 80 },
  { id: "merzouga", name: "Sahara Desert", keywords: ["merzouga", "sahara", "desert", "dunes", "camp"], x: 160, y: 80 },
];

export function VisualSuggestionMap({ prompt }: { prompt: string }) {
  const lowerPrompt = prompt.toLowerCase();
  
  const activeCities = CITIES.filter(city => 
    city.keywords.some(kw => lowerPrompt.includes(kw))
  );

  return (
    <AnimatePresence>
      {prompt.trim().length > 5 && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          className="overflow-hidden"
        >
          <div className="relative overflow-hidden rounded-[20px] border border-sand-100 bg-sand-50/50 p-4 shadow-inner">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-3.5 w-3.5 text-terracotta-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Visualizing your journey
              </p>
            </div>
            
            <div className="relative aspect-[2/1] w-full rounded-xl bg-white shadow-sm ring-1 ring-sand-100 overflow-hidden">
              <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#6E4D29" strokeOpacity="0.05" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="200" height="100" fill="url(#grid-pattern)" />
                
                {/* Abstract Morocco outline */}
                <path 
                  d="M 100 10 Q 130 15 150 40 T 170 90 L 50 90 Q 40 70 60 40 T 100 10 Z" 
                  fill="#F5EEE2" 
                  stroke="#EBE0CB"
                  strokeWidth="1"
                  opacity="0.8" 
                />
                
                {/* Routes connecting active cities */}
                {activeCities.length > 1 && (
                  <path
                    d={`M ${activeCities[0].x} ${activeCities[0].y} ` + activeCities.slice(1).map(c => `L ${c.x} ${c.y}`).join(" ")}
                    fill="none"
                    stroke="#D2542A"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="animate-route-dash"
                  />
                )}
                
                {/* City nodes */}
                {CITIES.map(city => {
                  const isActive = activeCities.some(c => c.id === city.id);
                  return (
                    <g key={city.id} className="transition-all duration-500">
                      <circle 
                        cx={city.x} 
                        cy={city.y} 
                        r={isActive ? "3.5" : "1.5"} 
                        fill={isActive ? "#D2542A" : "#B58A55"} 
                        opacity={isActive ? 1 : 0.4}
                        className="transition-all duration-300"
                      />
                      {isActive && (
                        <circle 
                          cx={city.x} 
                          cy={city.y} 
                          r="7" 
                          fill="none"
                          stroke="#D2542A" 
                          strokeWidth="1"
                          className="animate-ping opacity-75"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
              
              {/* City Labels */}
              <div className="absolute inset-0">
                {CITIES.map(city => {
                  const isActive = activeCities.some(c => c.id === city.id);
                  if (!isActive) return null;
                  return (
                    <motion.div
                      key={city.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute flex flex-col items-center gap-1 -translate-x-1/2"
                      style={{ left: `${(city.x / 200) * 100}%`, top: `${(city.y / 100) * 100}%`, transform: 'translate(-50%, -120%)' }}
                    >
                      <span className="rounded-md bg-white/95 px-1.5 py-0.5 text-[9px] font-bold text-navy-800 shadow-sm ring-1 ring-sand-200 backdrop-blur whitespace-nowrap">
                        {city.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {activeCities.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 flex flex-wrap gap-1.5"
              >
                {activeCities.map(city => (
                  <span key={city.id} className="inline-flex items-center rounded-full bg-terracotta-50 px-2 py-0.5 text-[10px] font-semibold text-terracotta-700 ring-1 ring-terracotta-200/50">
                    {city.name}
                  </span>
                ))}
              </motion.div>
            )}
            {activeCities.length === 0 && prompt.trim().length > 10 && (
              <p className="mt-3 text-[11px] text-navy-500 italic">
                Type destinations like Marrakech, Fes, Chefchaouen, or Sahara to see them on the map...
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
