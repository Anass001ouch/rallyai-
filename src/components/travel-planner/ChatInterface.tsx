"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTravelPlannerStore } from "@/store/useTravelPlannerStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, ArrowRight } from "lucide-react";
import { SuggestionCards } from "./SuggestionCards";
import { generateAIResponse } from "@/lib/ai-planner/mockPlanner";

import { RefinementChips } from "./RefinementChips";
import { PlannerProgress } from "./PlannerProgress";
import type {
  DestinationSuggestion,
  StaySuggestion,
  ActivitySuggestion,
  ProductSuggestion,
  MapMarker,
  PlannerContext,
} from "@/lib/ai-planner/plannerTypes";

export function ChatInterface() {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const store = useTravelPlannerStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [store.chatHistory, store.isLoading, store.currentStep]);

  // First mount: seed the chat from the URL prompt (if any) or greet the user.
  useEffect(() => {
    if (hasInitialized.current) return;
    const urlPrompt = searchParams.get('prompt');
    if (urlPrompt) {
      void handleSend(urlPrompt, true);
    } else {
      store.addMessage({
        role: 'assistant',
        content:
          "Salam! I'm your Artouris AI travel agent. Describe the Moroccan experience you want to live, and I will plan it step by step.",
      });
    }
    hasInitialized.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = inputValue.trim();
    if (!message) return;

    setInputValue("");
    void handleSend(message, false);
  };

  const handleSend = async (textOverride?: string, isInitial = false) => {
    const textToProcess = (textOverride ?? inputValue).trim();
    if (!textToProcess) return;

    store.addMessage({ role: 'user', content: textToProcess });
    store.applyRefinement(textToProcess);
    store.setLoading(true);

    // Build the planner context from the current store state.
    const ctx: PlannerContext = {
      prompt: (store.initialPrompt + ' ' + textToProcess).trim(),
      currentStep: store.currentStep,
      destinationId: (store.selectedDestination as { id?: string } | null)?.id ?? null,
      duration: store.tripDuration,
      budget: store.budget,
      travelers: store.travelers,
      foodPreferences: store.foodPreferences,
      travelStyle: store.travelStyle,
      travelStyleTags: [
        ...(store.romanticFlag ? ['romantic' as const] : []),
        ...(store.luxuryFlag ? ['luxury' as const] : []),
        ...(store.adventureFlag ? ['adventure' as const] : []),
        ...(store.cultureFlag ? ['culture' as const] : []),
        ...(store.familyFlag ? ['family' as const] : []),
        ...(store.budgetFlag ? ['budget' as const] : []),
      ],
      foodTags: store.vegetarianFlag ? ['vegetarian' as const] : [],
      experienceTags: ['sahara' as const, 'desert' as const],
      selectedStayId: (store.selectedStay as { id?: string } | null)?.id ?? null,
      selectedActivityIds: (store.selectedActivities as Array<{ id: string }>).map((a) => a.id),
      selectedProductIds: (store.selectedProducts as Array<{ id: string }>).map((p) => p.id),
      previousMarkers: store.mapMarkers as MapMarker[],
    };

    const response = await generateAIResponse(ctx);

    store.setLoading(false);

    // If we just left UNDERSTAND_REQUEST we already have a prompt -> the
    // store flags "ASK_DURATION" as the next step. Mirror that here so the
    // chat header updates immediately.
    store.setStep(response.step);

    if (response.mapMarkers) {
      store.setMapMarkers(response.mapMarkers);
    }

    store.addMessage({
      role: 'assistant',
      content: response.message,
      step: response.step,
      suggestions: response.suggestions,
    });
  };

  const handleAnswerQuestion = async (answer: string) => {
    store.addMessage({ role: 'user', content: answer });
    setInputValue("");
    store.applyRefinement(answer);
    store.setLoading(true);

    // askDuration / askBudget / askPreferences are answered through the store
    // state machine. We trigger that here so the chat header + planner step
    // both move forward consistently.
    store.answerQuestion(answer);

    const ctx: PlannerContext = {
      prompt: (store.initialPrompt + ' ' + answer).trim(),
      currentStep: useTravelPlannerStore.getState().currentStep,
      duration: store.tripDuration,
      budget: store.budget,
      foodPreferences: store.foodPreferences,
      travelStyle: store.travelStyle,
      travelStyleTags: [],
      foodTags: [],
      experienceTags: [],
    };

    const response = await generateAIResponse(ctx);
    store.setLoading(false);
    store.setStep(response.step);
    if (response.mapMarkers) store.setMapMarkers(response.mapMarkers);

    store.addMessage({
      role: 'assistant',
      content: response.message,
      step: response.step,
      suggestions: response.suggestions,
    });
  };



  const handleGenerateItinerary = () => {
    store.generateFinalItinerary();
  };

  const showRefinements =
    !store.isLoading &&
    (store.currentStep === 'ASK_PREFERENCES' ||
      store.currentStep === 'CHOOSE_STAY' ||
      store.currentStep === 'CHOOSE_ACTIVITIES' ||
      store.currentStep === 'LOCAL_MARKETPLACE');

  const inAskPhase =
    store.currentStep === 'UNDERSTAND_REQUEST' ||
    store.currentStep === 'ASK_DURATION' ||
    store.currentStep === 'ASK_BUDGET' ||
    store.currentStep === 'ASK_PREFERENCES';

  return (
    <div className="flex flex-col h-full rounded-3xl shadow-card-warm border border-sand-200 bg-white overflow-hidden">
      <PlannerProgress
        tripState={store.currentStep}
        isAuthenticMode={store.cultureFlag}
        toggleAuthenticMode={() =>
          useTravelPlannerStore.setState((s) => ({ cultureFlag: !s.cultureFlag }))
        }
      />

      {/* Header */}
      <div className="bg-white border-b border-sand-100 p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-navy-900 text-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-terracotta-500" /> AI Travel Agent
          </h2>
          <p className="text-xs text-navy-500 font-medium">
            {store.tripDuration
              ? `${store.tripDuration}-day trip · ${store.totalBudget ? `${store.totalBudget.toLocaleString()} MAD` : (store.budget ? `${store.budget} MAD (est)` : 'Budget pending')}`
              : 'Describe the experience you want to live.'}
          </p>
        </div>
        <button
          onClick={() => {
            store.resetPlanner();
            hasInitialized.current = false;
          }}
          className="text-[11px] font-bold text-navy-500 hover:text-terracotta-600"
        >
          Reset
        </button>
      </div>

      {/* Chat */}
      <div
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[url('/images/sahara/regions/merzouga-dunes.png')] bg-cover bg-center bg-fixed bg-blend-soft-light bg-white/95"
        ref={scrollRef}
      >
        {store.chatHistory.length <= 1 && store.currentStep === 'UNDERSTAND_REQUEST' && (
          <div className="mx-auto max-w-[85%] bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-card-warm border border-sand-200 mt-8 mb-4">
            <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center"><Sparkles className="w-4 h-4 text-terracotta-500 mr-2" /> Next steps</h3>
            <ol className="text-sm text-navy-600 space-y-2">
              <li className="flex items-center"><div className="w-5 h-5 rounded-full bg-sand-100 text-navy-900 flex items-center justify-center text-xs font-bold mr-3">1</div> Choose duration</li>
              <li className="flex items-center"><div className="w-5 h-5 rounded-full bg-sand-100 text-navy-900 flex items-center justify-center text-xs font-bold mr-3">2</div> Set budget</li>
              <li className="flex items-center"><div className="w-5 h-5 rounded-full bg-sand-100 text-navy-900 flex items-center justify-center text-xs font-bold mr-3">3</div> Pick Sahara destination</li>
              <li className="flex items-center"><div className="w-5 h-5 rounded-full bg-sand-100 text-navy-900 flex items-center justify-center text-xs font-bold mr-3">4</div> Choose stay & activities</li>
              <li className="flex items-center"><div className="w-5 h-5 rounded-full bg-sand-100 text-navy-900 flex items-center justify-center text-xs font-bold mr-3">5</div> Book full trip</li>
            </ol>
          </div>
        )}

        {store.chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="flex items-center gap-2 mb-2 ml-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-terracotta-400 to-terracotta-600 flex items-center justify-center shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[11px] font-bold text-navy-500 uppercase tracking-wider">Artouris Agent</span>
              </div>
            )}
            <div
              className={`max-w-[90%] sm:max-w-[85%] rounded-[24px] px-5 py-4 shadow-card-soft ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white rounded-br-sm'
                  : 'glass-strong text-navy-800 border border-white/60 rounded-tl-sm'
              }`}
            >
              {msg.role === 'assistant' && msg.step === 'ASK_DURATION' && (
                <div className="bg-sand-50/80 rounded-xl p-3 mb-3 border border-sand-200">
                  <span className="text-xs font-bold text-navy-900 block mb-1">AI understood:</span>
                  <ul className="text-xs text-navy-600 space-y-1">
                    <li>• Sahara / desert trip</li>
                    <li>• Likely destinations: Merzouga, Zagora, Agafay</li>
                    <li>• Needs: duration + budget</li>
                  </ul>
                </div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</div>
            </div>

            {/* Inline suggestion carousels */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className="w-full mt-4 flex flex-col items-start pl-2">
                {msg.step === 'SUGGEST_DESTINATION' && (
                  <SuggestionCards
                    step={msg.step}
                    suggestions={msg.suggestions}
                    onSelect={store.handleSelection}
                  />
                )}
                {msg.step === 'CHOOSE_STAY' && (
                  <SuggestionCards
                    step={msg.step}
                    suggestions={msg.suggestions}
                    onSelect={store.handleSelection}
                  />
                )}
                {msg.step === 'CHOOSE_ACTIVITIES' && (
                  <SuggestionCards
                    step={msg.step}
                    suggestions={msg.suggestions}
                    onSelect={store.handleSelection}
                  />
                )}
                {msg.step === 'LOCAL_MARKETPLACE' && (
                  <SuggestionCards
                    step={msg.step}
                    suggestions={msg.suggestions}
                    onSelect={store.handleSelection}
                  />
                )}
              </div>
            )}
          </div>
        ))}

        {store.isLoading && (
          <div className="flex justify-start">
            <div className="glass-strong text-navy-800 rounded-2xl rounded-bl-sm px-5 py-4 shadow-card-soft flex items-center gap-1.5">
              <span className="w-2 h-2 bg-terracotta-400 rounded-full animate-bounce" />
              <span
                className="w-2 h-2 bg-terracotta-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
              <span
                className="w-2 h-2 bg-terracotta-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.4s' }}
              />
            </div>
          </div>
        )}

        {/* Inline "continue" CTA at the end of activities */}
        {store.currentStep === 'CHOOSE_ACTIVITIES' && !store.isLoading && (
          <div className="flex justify-center pt-2">
            <Button
              onClick={() => {
                store.setStep('LOCAL_MARKETPLACE');
                store.runPlannerForCurrentStep();
              }}
              className="bg-navy-900 hover:bg-navy-800 text-white rounded-full px-8 h-12 font-bold shadow-lg"
            >
              Continue to Local Marketplace <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Inline "generate itinerary" CTA at the end of marketplace */}
        {store.currentStep === 'LOCAL_MARKETPLACE' && !store.isLoading && (
          <div className="flex justify-center pt-2">
            <Button
              onClick={handleGenerateItinerary}
              className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white rounded-full px-8 h-12 font-bold shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2" /> Generate my itinerary
            </Button>
          </div>
        )}


      </div>

      {/* Input */}
      {store.currentStep !== 'FINAL_ITINERARY' &&
        store.currentStep !== 'PAYMENT_REVIEW' && (
          <div className="p-4 bg-white border-t border-sand-100 rounded-b-3xl space-y-3 sticky bottom-0 z-10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
            {showRefinements && (
              <RefinementChips
                onChipClick={(chip) => handleAnswerQuestion(chip)}
                tripState={stepLabel(store.currentStep)}
              />
            )}

            {store.currentStep === 'ASK_DURATION' && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {['2 days', '3 days', '5 days', '7 days', 'Weekend trip'].map(chip => (
                  <button key={chip} onClick={() => handleAnswerQuestion(chip)} className="shrink-0 px-4 py-2 bg-sand-50 hover:bg-sand-100 text-navy-700 text-sm font-bold rounded-full border border-sand-200 transition-colors">{chip}</button>
                ))}
              </div>
            )}
            
            {store.currentStep === 'ASK_BUDGET' && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {['1500 MAD', '2500 MAD', '4000 MAD', 'Luxury', 'Flexible'].map(chip => (
                  <button key={chip} onClick={() => handleAnswerQuestion(chip)} className="shrink-0 px-4 py-2 bg-sand-50 hover:bg-sand-100 text-navy-700 text-sm font-bold rounded-full border border-sand-200 transition-colors">{chip}</button>
                ))}
              </div>
            )}

            {inAskPhase ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleAnswerQuestion(inputValue);
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    store.currentStep === 'ASK_DURATION'
                      ? 'How many days? e.g. 3 days'
                      : store.currentStep === 'ASK_BUDGET'
                        ? 'What is your budget? e.g. 2500 MAD'
                        : 'Any preferences? e.g. vegetarian, romantic, adventure'
                  }
                  className="flex-1 rounded-2xl px-5 py-6 text-[15px] shadow-inner bg-sand-50/50 border-sand-200 focus-visible:ring-terracotta-400 font-medium text-navy-800 placeholder:text-navy-300"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-2xl w-12 h-12 shrink-0 bg-navy-900 hover:bg-navy-800 text-white shadow-md"
                >
                  <Send className="w-5 h-5 ml-1" />
                </Button>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Refine your trip… e.g. Make it more romantic and not too expensive."
                  className="flex-1 rounded-2xl px-5 py-6 text-[15px] shadow-inner bg-sand-50/50 border-sand-200 focus-visible:ring-terracotta-400 font-medium text-navy-800 placeholder:text-navy-300"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-2xl w-12 h-12 shrink-0 bg-navy-900 hover:bg-navy-800 text-white shadow-md"
                >
                  <Send className="w-5 h-5 ml-1" />
                </Button>
              </form>
            )}
          </div>
        )}
    </div>
  );
}

function stepLabel(step: string): string {
  switch (step) {
    case 'UNDERSTAND_REQUEST':
      return 'Understanding your request';
    case 'ASK_DURATION':
      return 'Trip duration';
    case 'ASK_BUDGET':
      return 'Trip budget';
    case 'ASK_PREFERENCES':
      return 'Trip preferences';
    case 'SUGGEST_DESTINATION':
      return 'Choosing region';
    case 'CHOOSE_STAY':
      return 'Choosing stay';
    case 'CHOOSE_ACTIVITIES':
      return 'Choosing activities';
    case 'LOCAL_MARKETPLACE':
      return 'Local Marketplace';
    case 'FINAL_ITINERARY':
      return 'Final itinerary';
    case 'PAYMENT_REVIEW':
      return 'Booking';
    default:
      return step;
  }
}