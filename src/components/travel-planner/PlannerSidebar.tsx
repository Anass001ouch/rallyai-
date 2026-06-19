"use client";

import { useTravelPlannerStore } from "@/store/useTravelPlannerStore";
import { MiniMap } from "./MiniMap";
import {
  Tent,
  MapPin,
  Sparkles,
  CalendarRange,
  Wallet,
  Heart,
  ShieldCheck,
} from "lucide-react";

export function PlannerSidebar() {
  const store = useTravelPlannerStore();

  const dest = store.selectedDestination as { name?: string; image?: string } | null;
  const stay = store.selectedStay as
    | { title?: string; name?: string; pricePerNight?: number; image?: string; fairScore?: number }
    | null;

  const activities = store.selectedActivities as Array<{ title?: string; price?: string }>;
  const products = store.selectedProducts as Array<{ title?: string; price?: string }>;

  const days = store.tripDuration ?? 3;
  const nights = Math.max(1, days - 1);
  const stayTotal = (stay?.pricePerNight ?? 0) * nights;
  const activitiesTotal = activities.reduce(
    (acc, a) => acc + (parseInt(a.price as string) || 0),
    0,
  );
  const productsTotal = products.reduce(
    (acc, p) => acc + (parseInt(p.price as string) || 0),
    0,
  );
  const runningTotal = stayTotal + activitiesTotal + productsTotal + 300 + 700 + 100; // food + transport + fee

  return (
    <div className="flex flex-col h-full gap-4 relative">
      {/* Map */}
      <div className="flex-1 min-h-[320px] rounded-3xl overflow-hidden border border-sand-200 shadow-card-soft bg-white relative">
        <MiniMap markers={store.mapMarkers as never} mode="planner" />
        
        {/* Floating Summary */}
        <div className="absolute top-4 left-4 right-4 z-[400] pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md border border-sand-200 shadow-xl rounded-2xl p-4 pointer-events-auto flex gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex flex-col min-w-[120px]">
              <span className="text-[10px] uppercase tracking-wider text-navy-400 font-bold mb-1">Destination</span>
              <span className="text-sm font-bold text-navy-900 truncate">{dest?.name ?? 'Not chosen'}</span>
            </div>
            <div className="w-px bg-sand-200 shrink-0" />
            <div className="flex flex-col min-w-[120px]">
              <span className="text-[10px] uppercase tracking-wider text-navy-400 font-bold mb-1">Stay</span>
              <span className="text-sm font-bold text-navy-900 truncate">{stay?.title ?? stay?.name ?? 'Not chosen'}</span>
            </div>
            <div className="w-px bg-sand-200 shrink-0" />
            <div className="flex flex-col min-w-[80px]">
              <span className="text-[10px] uppercase tracking-wider text-navy-400 font-bold mb-1">Duration</span>
              <span className="text-sm font-bold text-navy-900">{days} days</span>
            </div>
            <div className="w-px bg-sand-200 shrink-0" />
            <div className="flex flex-col min-w-[80px]">
              <span className="text-[10px] uppercase tracking-wider text-navy-400 font-bold mb-1">Budget</span>
              <span className="text-sm font-bold text-navy-900">{store.budget ? `${store.budget} MAD` : 'Pending'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
  image,
  footer,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  image?: string;
  footer?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-sand-100 last:border-0">
      <div className="w-12 h-12 rounded-xl bg-sand-100 overflow-hidden flex items-center justify-center shrink-0">
        {image ? (
          <img src={image} alt={value} className="w-full h-full object-cover" />
        ) : (
          icon
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-navy-400 font-bold">{label}</p>
        <p className="text-sm font-bold text-navy-900 truncate">{value}</p>
        {footer && <p className="text-[11px] text-navy-500 mt-0.5">{footer}</p>}
      </div>
    </div>
  );
}