"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ChatInterface } from "./ChatInterface";
import { PlannerSidebar } from "./PlannerSidebar";
import { FinalItinerary } from "./FinalItinerary";
import { useTravelPlannerStore } from "@/store/useTravelPlannerStore";

export function TravelPlannerLayout() {
  const currentStep = useTravelPlannerStore((s) => s.currentStep);

  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      {/* Sticky page header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-sand-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 hover:text-terracotta-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="hidden sm:flex items-center gap-2 ml-4">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-terracotta-500 to-gold-400 text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-base font-display font-black text-navy-900 tracking-tight">
              Artouris
            </span>
            <span className="text-xs font-bold text-navy-400 ml-1">AI Travel Agent</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-navy-400 hidden sm:block">
            Step
          </span>
          <span className="text-xs font-bold text-terracotta-700 bg-terracotta-50 border border-terracotta-100 px-3 py-1 rounded-full">
            {currentStep.replace(/_/g, ' ')}
          </span>
        </div>
      </header>

      {currentStep === 'FINAL_ITINERARY' || currentStep === 'PAYMENT_REVIEW' ? (
        <div className="flex-1 w-full bg-[#fdfbf7]">
          <FinalItinerary />
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 sm:p-6 max-w-[1400px] mx-auto w-full">
          <div 
            className={`w-full transition-all duration-500 ease-in-out ${
              ['SUGGEST_DESTINATION', 'CHOOSE_STAY', 'CHOOSE_ACTIVITIES', 'LOCAL_MARKETPLACE'].includes(currentStep) 
                ? 'lg:w-[35%]' 
                : 'lg:w-[58%]'
            } flex flex-col min-h-[640px] lg:h-[calc(100vh-160px)]`}
          >
            <ChatInterface />
          </div>
          <div 
            className={`w-full transition-all duration-500 ease-in-out ${
              ['SUGGEST_DESTINATION', 'CHOOSE_STAY', 'CHOOSE_ACTIVITIES', 'LOCAL_MARKETPLACE'].includes(currentStep) 
                ? 'lg:w-[65%]' 
                : 'lg:w-[42%]'
            } flex flex-col gap-4 min-h-[400px] lg:h-[calc(100vh-160px)]`}
          >
            <PlannerSidebar />
          </div>
        </div>
      )}
    </div>
  );
}