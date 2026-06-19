import type { PlannerStep } from "@/store/useTravelPlannerStore";

// === Planner-side suggestion types ===
// These mirror the shapes already produced by /src/components/travel-planner/mockData.ts
// (MOCK_DATA.destinations / .hotels / .activities / .souvenirs) so the planner and the
// UI can stay in sync without a parallel type system.

export type DestinationSuggestion = {
  id: string;
  name: string;
  image: string;
  matchScore: number;
  budgetLevel: string;
  bestFor: string[];
  reason: string;
  coordinates: [number, number];
};

export type StaySuggestion = {
  id: string;
  title: string;
  desc: string;
  price: string;          // display string, e.g. "520 MAD/night"
  pricePerNight: number;  // numeric for budget math
  rating: number;
  reviews: number;
  coordinates: [number, number];
  image: string;
  fairScore: number;
  badges: string[];
  type: string;
  amenities?: string[];
};

export type ActivitySuggestion = {
  id: string;
  title: string;
  desc: string;
  price: string;          // display string
  duration?: string;
  rating: number;
  coordinates: [number, number];
  image: string;
  fairScore: number;
  badges: string[];
};

export type ProductSuggestion = {
  id: string;
  title: string;
  desc: string;
  price: string;          // display string
  rating: number;
  coordinates: [number, number];
  image: string;
  fairScore: number;
  badges: string[];
};

export type AnySuggestion =
  | DestinationSuggestion
  | StaySuggestion
  | ActivitySuggestion
  | ProductSuggestion;

export type MapMarkerKind =
  | "destination"
  | "stay"
  | "activity"
  | "shop"
  | "transport"
  | "route";

export type MapMarker = {
  id: string;
  type: MapMarkerKind;
  title: string;
  price?: string | number;
  coordinates: [number, number];
  item?: AnySuggestion;
  image?: string;
  desc?: string;
  duration?: string;
  rating?: number;
  badges?: string[];
};

// === AI response contract ===
// One single shape for every AI turn. Swapping the mock implementation for
// Gemini/OpenAI later is a drop-in replacement as long as this contract is kept.

export type AIResponse = {
  step: PlannerStep;
  message: string;
  suggestions?: AnySuggestion[];
  mapMarkers?: MapMarker[];
  nextQuestion?: string;
  // Optional metadata so the chat interface can decide whether to render
  // refinement chips, progress, or selection-driven advancement.
  showRefinements?: boolean;
};

// === Context passed into the AI planner ===
// Captures everything we know about the user so the planner can pick the
// right next question without re-parsing the full chat history.

export type TravelStyleTag =
  | "romantic"
  | "adventure"
  | "culture"
  | "luxury"
  | "family"
  | "budget"
  | "calm"
  | "photography";

export type FoodTag = "vegetarian" | "vegan" | "halal" | "no-pork" | "allergies";

export type ExperienceTag =
  | "sahara"
  | "desert"
  | "dunes"
  | "camel"
  | "atv"
  | "sandboarding"
  | "stargazing"
  | "nomad"
  | "artisan"
  | "dates"
  | "tea"
  | "leather"
  | "jewelry";

export interface PlannerContext {
  // The latest natural-language input. We concatenate refinements with the
  // initial prompt so keyword detection keeps working across turns.
  prompt: string;
  currentStep: PlannerStep;

  // Trip details
  destinationId?: string | null;
  duration?: number | null;
  budget?: number | null;
  travelers?: string;
  foodPreferences?: string;
  travelStyle?: string;

  // Refinement tags accumulated across the conversation
  travelStyleTags: TravelStyleTag[];
  foodTags: FoodTag[];
  experienceTags: ExperienceTag[];

  // Selection state — passed in so the mock can adapt rankings on the fly
  selectedStayId?: string | null;
  selectedActivityIds?: string[];
  selectedProductIds?: string[];

  // Map markers from the previous turn — used for refinement-aware re-zoom
  previousMarkers?: MapMarker[];
}