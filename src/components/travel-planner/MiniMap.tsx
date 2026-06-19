"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the map to disable SSR
const MapComponent = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full rounded-xl" />,
});

export function MiniMap({ markers, className, mode }: { markers?: any[], className?: string, mode?: "planner" | "booking" }) {
  return (
    <div className={className || "w-full h-full min-h-[300px] lg:min-h-full"}>
      <MapComponent markers={markers} mode={mode} />
    </div>
  );
}

