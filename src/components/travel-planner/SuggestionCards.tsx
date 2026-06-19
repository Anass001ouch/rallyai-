"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import type { AttachmentType } from "@/store/useTravelPlannerStore";
import { useTravelPlannerStore } from "@/store/useTravelPlannerStore";

interface SuggestionCardsProps {
  type: AttachmentType | 'destinations' | 'hotels';
  items: any[];
  onSelect?: (item: any) => void;
}

export function SuggestionCards({ type, items, onSelect }: SuggestionCardsProps) {
  const store = useTravelPlannerStore();

  if (!items || items.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x mt-2 scrollbar-thin">
      {items.map((item, i) => (
        <motion.div
          key={item.id ?? i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="snap-start min-w-[280px] max-w-[280px] flex-shrink-0"
        >
          <Card 
            className="h-full flex flex-col hover:shadow-card-warm transition-all duration-300 border-sand-200 cursor-pointer group bg-white rounded-2xl overflow-hidden"
            onClick={() => store.setHoveredItem(item.id)}
          >
            <div className="h-36 bg-muted relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent z-10" />
              <img
                src={item.image || '/images/sahara/regions/merzouga-dunes.png'}
                alt={item.title ?? item.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              />

              {(item.fairScore || item.matchScore) && (
                <div className="absolute top-2 right-2 z-20 bg-tile-green text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  {item.fairScore ?? item.matchScore}/100
                </div>
              )}

              {item.matchScore && (
                <div className="absolute top-2 left-2 z-20 bg-terracotta-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  {item.matchScore}% match
                </div>
              )}

              <div className="absolute bottom-3 left-3 z-20 text-white text-sm font-bold tracking-wide">
                {item.price ?? item.budgetLevel}
              </div>
            </div>

            <CardHeader className="pb-2 flex-grow px-4 pt-4">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-base font-display text-navy-800 leading-tight">
                  {item.title ?? item.name}
                </CardTitle>
                {item.rating && (
                  <div className="flex items-center text-xs text-gold-500 font-bold shrink-0">
                    <Star className="w-3.5 h-3.5 mr-0.5 fill-current" />
                    {item.rating}
                  </div>
                )}
              </div>

              {item.badges && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.badges.slice(0, 3).map((badge: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[9px] font-semibold bg-sand-100 text-terracotta-700 px-1.5 py-0.5 rounded-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <CardDescription className="text-xs text-navy-600 mt-2 line-clamp-3 leading-relaxed">
                {item.desc ?? item.shortDescription}
              </CardDescription>

              {item.reason && (
                <div className="mt-3 bg-terracotta-50/50 p-2 rounded-lg border border-terracotta-100">
                  <p className="text-[10px] font-semibold text-terracotta-700 leading-tight">
                    <span className="opacity-70 uppercase tracking-wider block mb-0.5">
                      Why this matches
                    </span>
                    {item.reason}
                  </p>
                </div>
              )}
            </CardHeader>

            <CardFooter className="pt-2 px-4 pb-4 flex flex-col gap-2">
              {type === 'souvenirs' || type === 'activities' ? (
                <Button
                  size="sm"
                  variant={
                    (type === 'souvenirs'
                      ? store.selectedProducts.some((p) => (p as { id: string }).id === item.id)
                      : store.selectedActivities.some((a) => (a as { id: string }).id === item.id))
                      ? 'default'
                      : 'outline'
                  }
                  className={`w-full text-xs rounded-xl ${
                    (type === 'souvenirs'
                      ? store.selectedProducts.some((p) => (p as { id: string }).id === item.id)
                      : store.selectedActivities.some((a) => (a as { id: string }).id === item.id))
                      ? 'bg-terracotta-500 text-white'
                      : 'border-terracotta-500 text-terracotta-600 hover:bg-terracotta-50'
                  }`}
                  onClick={() => onSelect?.(item)}
                >
                  {type === 'souvenirs'
                    ? store.selectedProducts.some((p) => (p as { id: string }).id === item.id)
                      ? 'Added to trip'
                      : 'Add to trip'
                    : store.selectedActivities.some((a) => (a as { id: string }).id === item.id)
                      ? 'Added to itinerary'
                      : 'Add to itinerary'}
                </Button>
              ) : type === 'hotels' ? (
                <Button
                  size="sm"
                  className={`w-full text-xs rounded-xl ${
                    (store.selectedStay as { id?: string } | null)?.id === item.id
                      ? 'bg-terracotta-500 hover:bg-terracotta-600'
                      : 'bg-navy-800 hover:bg-terracotta-500'
                  }`}
                  onClick={() => onSelect?.(item)}
                >
                  {(store.selectedStay as { id?: string } | null)?.id === item.id
                    ? 'Selected stay'
                    : 'Select this stay'}
                </Button>
              ) : (
                <Button
                  size="sm"
                  className={`w-full text-xs rounded-xl ${
                    (store.selectedDestination as { id?: string } | null)?.id === item.id
                      ? 'bg-terracotta-500'
                      : 'bg-navy-800 hover:bg-terracotta-500'
                  }`}
                  onClick={() => onSelect?.(item)}
                >
                  {(store.selectedDestination as { id?: string } | null)?.id === item.id
                    ? 'Selected destination'
                    : 'Select destination'}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}