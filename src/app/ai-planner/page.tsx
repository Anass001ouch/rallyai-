import { TravelPlannerLayout } from "@/components/travel-planner/TravelPlannerLayout";
import { Suspense } from "react";

export default function AIPlannerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="flex justify-center">
        <Suspense fallback={<div className="p-10">Loading AI Planner...</div>}>
          <TravelPlannerLayout />
        </Suspense>
      </main>
    </div>
  );
}
