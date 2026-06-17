"use client";

import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/artouris/Navbar";
import { Hero } from "@/components/artouris/Hero";
import { ProblemSection } from "@/components/artouris/ProblemSection";
import { HowItWorksSection } from "@/components/artouris/HowItWorksSection";
import { FeaturesSection } from "@/components/artouris/FeaturesSection";
import { ExamplePromptsSection } from "@/components/artouris/ExamplePromptsSection";
import { DemoMockupSection } from "@/components/artouris/DemoMockupSection";
import { DestinationsSection } from "@/components/artouris/DestinationsSection";
import { ForTravelersSection } from "@/components/artouris/ForTravelersSection";
import { ForBusinessesSection } from "@/components/artouris/ForBusinessesSection";
import { IntelligenceSection } from "@/components/artouris/IntelligenceSection";
import { ComparisonSection } from "@/components/artouris/ComparisonSection";
import { MoroccanTouchSection } from "@/components/artouris/MoroccanTouchSection";
import { ImpactSection } from "@/components/artouris/ImpactSection";
import { WaitlistSection } from "@/components/artouris/WaitlistSection";
import { FinalCTASection } from "@/components/artouris/FinalCTASection";
import { Footer } from "@/components/artouris/Footer";
import { MobileStickyCTA } from "@/components/artouris/MobileStickyCTA";

/**
 * Top-level page. Coordinates prompt-flow between Hero, Example cards,
 * Destination cards, and the Demo section via a single shared state.
 */
export default function Page() {
  const [sharedPrompt, setSharedPrompt] = useState<string | null>(null);

  // Allow any component (e.g. DestinationsSection) to dispatch a prompt via CustomEvent
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string") setSharedPrompt(detail);
    };
    window.addEventListener("artouris:use-prompt", handler as EventListener);
    return () => window.removeEventListener("artouris:use-prompt", handler as EventListener);
  }, []);

  const sendToDemo = useCallback((prompt: string) => {
    setSharedPrompt(prompt);
    const el = document.getElementById("demo");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div id="top" className="relative flex min-h-screen flex-col bg-sand-50">
      <Navbar />

      <main className="flex-1">
        <Hero onPromptSubmit={sendToDemo} />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ExamplePromptsSection onUsePrompt={sendToDemo} />
        <DemoMockupSection
          externalPrompt={sharedPrompt}
          onExternalPromptConsumed={() => setSharedPrompt(null)}
        />
        <DestinationsSection />
        <ForTravelersSection />
        <ForBusinessesSection />
        <IntelligenceSection />
        <ComparisonSection />
        <MoroccanTouchSection />
        <ImpactSection />
        <WaitlistSection />
        <FinalCTASection />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
