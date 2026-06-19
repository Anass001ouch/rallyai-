import { create } from 'zustand';
import { generateAIResponse } from "@/lib/ai-planner/mockPlanner";

// === State machine ===
// Drives the AI planner from a freeform prompt through destination, stay,
// activity, and souvenir selection, ending in a final itinerary + payment
// review screen.

export type PlannerStep =
  | 'UNDERSTAND_REQUEST'
  | 'ASK_DURATION'
  | 'ASK_BUDGET'
  | 'ASK_PREFERENCES'
  | 'SUGGEST_DESTINATION'
  | 'CHOOSE_STAY'
  | 'CHOOSE_ACTIVITIES'
  | 'LOCAL_MARKETPLACE'
  | 'FINAL_ITINERARY'
  | 'PAYMENT_REVIEW';

// What kind of suggestion list a SuggestionCard is rendering.
// Used by the UI to decide which store action to call on click.
export type AttachmentType = 'activities' | 'souvenirs';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  step?: PlannerStep;
  suggestions?: unknown[];
  mapMarkers?: unknown[];
}

// === Local impact payload ===
// Mirrors the spec's "This trip supports 5 Moroccan local providers..." copy.

export interface LocalImpactPayload {
  supportedProviders: number;
  providerTypes: string[];
  estimatedLocalImpact: number;
  currency: 'MAD';
  message: string;
}

// === Budget breakdown ===
// Mirrors the spec's example:
//   Stay 900 + Activities 650 + Transport 700 + Food 300 + Souvenirs 260
//   + Service fee 100 = Total 2,910 MAD

export interface BudgetBreakdown {
  stay: number;
  activities: number;
  transport: number;
  food: number;
  souvenirs: number;
  serviceFee: number;
  total: number;
  currency: 'MAD';
}

// === Itinerary ===

export interface ItineraryDay {
  day: number;
  title: string;
  plan: string[];
  transport?: string;
  accommodation?: string | null;
}

export interface FinalItineraryPayload {
  title: string;
  destination: string;
  durationLabel: string;
  days: ItineraryDay[];
  selectedStayName: string;
  selectedActivityNames: string[];
  selectedProductNames: string[];
  transportTitle: string;
  foodPreferencesNote: string;
  budget: BudgetBreakdown;
  localImpact: LocalImpactPayload;
}

interface TravelPlannerState {
  // State machine
  currentStep: PlannerStep;
  initialPrompt: string;
  chatHistory: ChatMessage[];

  // Trip details collected from the user
  tripDuration: number | null;
  budget: number | null;
  travelers: string;
  foodPreferences: string;
  travelStyle: string;

  // Selections
  selectedDestination: unknown | null;
  selectedStay: unknown | null;
  selectedActivities: unknown[];
  selectedProducts: unknown[];
  transportOption: unknown | null;

  // Refinement flags used by the mock planner to bias rankings
  romanticFlag: boolean;
  luxuryFlag: boolean;
  adventureFlag: boolean;
  cultureFlag: boolean;
  familyFlag: boolean;
  budgetFlag: boolean;
  vegetarianFlag: boolean;

  // Final plan
  itinerary: FinalItineraryPayload | null;
  totalBudget: number;
  localImpact: LocalImpactPayload | null;
  mapMarkers: unknown[];
  isLoading: boolean;
  hoveredItemId: string | null;

  // === Actions ===
  setInitialPrompt: (prompt: string) => void;
  addMessage: (msg: Omit<ChatMessage, 'id'>) => void;
  setStep: (step: PlannerStep) => void;
  setLoading: (loading: boolean) => void;

  // Data updates
  updateTripDetails: (
    details: Partial<
      Pick<
        TravelPlannerState,
        | 'tripDuration'
        | 'budget'
        | 'travelers'
        | 'foodPreferences'
        | 'travelStyle'
      >
    >,
  ) => void;

  selectDestination: (dest: unknown) => void;
  selectStay: (stay: unknown) => void;
  toggleActivity: (activity: unknown) => void;
  toggleProduct: (product: unknown) => void;
  setTransport: (transport: unknown) => void;

  // Step-aware actions used by the chat interface
  applyRefinement: (prompt: string) => void;
  answerQuestion: (answer: string) => void;

  generateFinalItinerary: () => void;
  approvePlan: () => void;
  resetPlanner: () => void;
  setMapMarkers: (markers: unknown[]) => void;
  
  // Selection Handlers
  handleSelection: (kind: 'destination' | 'stay' | 'activity' | 'product', item: any) => void;
  runPlannerForCurrentStep: () => Promise<void>;
  
  setHoveredItem: (id: string | null) => void;
}

const DEFAULT_LOCAL_IMPACT: LocalImpactPayload = {
  supportedProviders: 5,
  providerTypes: [
    'desert camp',
    'local guide',
    'activity provider',
    'driver',
    'artisan seller',
  ],
  estimatedLocalImpact: 2400,
  currency: 'MAD',
  message:
    'This trip supports 5 Moroccan local providers: 1 desert camp, 1 local guide, 1 activity provider, 1 driver, and 1 artisan seller.',
};

// Parse a duration answer like "3 days", "5", "a week" into a number.
function parseDuration(answer: string): number | null {
  const a = answer.toLowerCase();
  const m = a.match(/(\d+)/);
  if (m) return parseInt(m[1], 10);
  if (a.includes('week')) return 7;
  if (a.includes('weekend')) return 2;
  return null;
}

// Parse a budget answer like "2500 MAD", "around 3000", "1500dh".
function parseBudget(answer: string): number | null {
  const a = answer.toLowerCase().replace(/\s+/g, '');
  const m = a.match(/(\d{2,5})/);
  if (m) return parseInt(m[1], 10);
  return null;
}

function detectTags(answer: string) {
  const a = answer.toLowerCase();
  return {
    romantic: a.includes('romantic') || a.includes('couple') || a.includes('honeymoon'),
    luxury: a.includes('luxury') || a.includes('premium'),
    adventure: a.includes('adventure') || a.includes('active'),
    culture: a.includes('culture') || a.includes('local') || a.includes('authentic'),
    family: a.includes('family') || a.includes('kids') || a.includes('children'),
    budget: a.includes('cheap') || a.includes('budget') || a.includes('affordable'),
    vegetarian: a.includes('vegetarian') || a.includes('vegan') || a.includes('veggie'),
  };
}

export const useTravelPlannerStore = create<TravelPlannerState>((set, get) => ({
  currentStep: 'UNDERSTAND_REQUEST',
  initialPrompt: '',
  chatHistory: [],

  tripDuration: null,
  budget: null,
  travelers: '',
  foodPreferences: '',
  travelStyle: '',

  selectedDestination: null,
  selectedStay: null,
  selectedActivities: [],
  selectedProducts: [],
  transportOption: null,

  romanticFlag: false,
  luxuryFlag: false,
  adventureFlag: false,
  cultureFlag: false,
  familyFlag: false,
  budgetFlag: false,
  vegetarianFlag: false,

  itinerary: null,
  totalBudget: 0,
  localImpact: null,
  mapMarkers: [],
  isLoading: false,
  hoveredItemId: null,

  setInitialPrompt: (prompt) => set({ initialPrompt: prompt }),

  addMessage: (msg) =>
    set((state) => ({
      chatHistory: [
        ...state.chatHistory,
        { ...msg, id: Date.now().toString() + Math.random().toString(36).slice(2, 6) },
      ],
    })),

  setStep: (step) => set({ currentStep: step }),
  setLoading: (loading) => set({ isLoading: loading }),

  updateTripDetails: (details) => set((state) => ({ ...state, ...details })),

  selectDestination: (dest) => set({ selectedDestination: dest }),
  selectStay: (stay) => set({ selectedStay: stay }),
  toggleActivity: (activity) =>
    set((state) => {
      const a = activity as { id: string };
      const exists = state.selectedActivities.some((x) => (x as { id: string }).id === a.id);
      return {
        selectedActivities: exists
          ? state.selectedActivities.filter((x) => (x as { id: string }).id !== a.id)
          : [...state.selectedActivities, activity],
      };
    }),
  toggleProduct: (product) =>
    set((state) => {
      const p = product as { id: string };
      const exists = state.selectedProducts.some((x) => (x as { id: string }).id === p.id);
      return {
        selectedProducts: exists
          ? state.selectedProducts.filter((x) => (x as { id: string }).id !== p.id)
          : [...state.selectedProducts, product],
      };
    }),
  setTransport: (transport) => set({ transportOption: transport }),

  // === Free-form refinement used by the chat input ===
  applyRefinement: (prompt) => {
    const tags = detectTags(prompt);
    set((state) => ({
      initialPrompt: (state.initialPrompt + ' ' + prompt).trim(),
      romanticFlag: state.romanticFlag || tags.romantic,
      luxuryFlag: state.luxuryFlag || tags.luxury,
      adventureFlag: state.adventureFlag || tags.adventure,
      cultureFlag: state.cultureFlag || tags.culture,
      familyFlag: state.familyFlag || tags.family,
      budgetFlag: state.budgetFlag || tags.budget,
      vegetarianFlag: state.vegetarianFlag || tags.vegetarian,
    }));
  },

  // === Step-aware answer used by the chat input ===
  answerQuestion: (answer) => {
    const state = get();
    switch (state.currentStep) {
      case 'UNDERSTAND_REQUEST':
      case 'ASK_DURATION': {
        const d = parseDuration(answer);
        if (d) {
          set({ tripDuration: d });
        }
        return;
      }
      case 'ASK_BUDGET': {
        const b = parseBudget(answer);
        if (b) {
          set({ budget: b });
        }
        return;
      }
      case 'ASK_PREFERENCES': {
        const tags = detectTags(answer);
        set({
          foodPreferences: answer,
          travelStyle: answer,
          romanticFlag: tags.romantic,
          luxuryFlag: tags.luxury,
          adventureFlag: tags.adventure,
          cultureFlag: tags.culture,
          familyFlag: tags.family,
          budgetFlag: tags.budget,
          vegetarianFlag: tags.vegetarian,
        });
        return;
      }
      default:
        return;
    }
  },

  // === Final itinerary ===
  // Reuses the spec's exact example numbers when the user has selected
  // Merzouga with the romantic+vegetarian combo. Falls back to the
  // raw selected item prices otherwise.
  generateFinalItinerary: () => {
    const state = get();
    const stay = state.selectedStay as
      | { title?: string; pricePerNight?: number; name?: string }
      | null;
    const tripDays = state.tripDuration ?? 3;
    const nights = Math.max(1, tripDays - 1);

    const activitiesPrice = state.selectedActivities.reduce<number>(
      (acc, act) => acc + (parseInt((act as { price?: string }).price as string) || 0),
      0,
    );
    const productsPrice = state.selectedProducts.reduce<number>(
      (acc, p) => acc + (parseInt((p as { price?: string }).price as string) || 0),
      0,
    );
    const transportPrice =
      (state.transportOption as { price?: number } | null)?.price ?? 700;
    const stayPrice = (stay?.pricePerNight ?? 300) * nights;

    const budget: BudgetBreakdown = {
      stay: stayPrice,
      activities: activitiesPrice || 650,
      transport: transportPrice,
      food: 300,
      souvenirs: productsPrice || 260,
      serviceFee: 100,
      total: stayPrice + (activitiesPrice || 650) + transportPrice + 300 + (productsPrice || 260) + 100,
      currency: 'MAD',
    };

    const destinationName =
      (state.selectedDestination as { name?: string } | null)?.name ?? 'Merzouga';

    const itinerary: FinalItineraryPayload = {
      title: `Your ${tripDays}-Day Saharan Escape in ${destinationName}`,
      destination: destinationName,
      durationLabel: `${tripDays} days / ${Math.max(1, tripDays - 1)} nights`,
      days: [
        {
          day: 1,
          title: 'Arrival & Desert Welcome',
          plan: [
            'Private transfer from Errachidia Airport to Merzouga',
            'Check-in at your desert camp and mint tea welcome',
            'Sunset camel trekking across Erg Chebbi dunes',
            'Traditional Moroccan dinner and music around the campfire',
          ],
          transport: 'Errachidia Airport Desert Transfer',
          accommodation: stay?.title ?? stay?.name ?? 'Sahara Pearl Desert Camp',
        },
        {
          day: 2,
          title: 'Adventure & Local Culture',
          plan: [
            'Breakfast at the desert camp',
            'ATV dunes adventure and sandboarding session',
            'Lunch in Merzouga village',
            'Visit local artisan market',
            'Stargazing at the camp',
          ],
          accommodation: stay?.title ?? stay?.name ?? 'Sahara Pearl Desert Camp',
        },
        {
          day: 3,
          title: 'Sunrise & Departure',
          plan: [
            'Early sunrise walk in the dunes',
            'Traditional Moroccan breakfast',
            '4x4 pickup from the camp',
            'Return transfer',
          ],
          transport: 'Return Transfer',
        },
      ],
      selectedStayName: stay?.title ?? stay?.name ?? 'Sahara Pearl Desert Camp',
      selectedActivityNames: state.selectedActivities.map(
        (a) => (a as { title: string }).title,
      ),
      selectedProductNames: state.selectedProducts.map(
        (p) => (p as { title: string }).title,
      ),
      transportTitle: 'Errachidia Airport Desert Transfer',
      foodPreferencesNote: state.foodPreferences || 'No specific preferences',
      budget,
      localImpact: DEFAULT_LOCAL_IMPACT,
    };

    const finalMarkers: any[] = [];
    if (state.selectedDestination) {
      finalMarkers.push({ ...(state.selectedDestination as any), type: 'destination' });
    }
    if (state.selectedStay) {
      finalMarkers.push({ ...(state.selectedStay as any), type: 'stay' });
    }
    state.selectedActivities.forEach((a) => {
      finalMarkers.push({ ...(a as any), type: 'activity' });
    });
    state.selectedProducts.forEach((p) => {
      finalMarkers.push({ ...(p as any), type: 'shop' });
    });
    if (state.transportOption) {
      finalMarkers.push({ ...(state.transportOption as any), type: 'transport' });
    }

    set({
      currentStep: 'FINAL_ITINERARY',
      totalBudget: budget.total,
      itinerary,
      localImpact: DEFAULT_LOCAL_IMPACT,
      mapMarkers: finalMarkers,
    });
  },

  handleSelection: (kind, item) => {
    const state = get();
    const label = item.title ?? item.name ?? 'selection';
    state.addMessage({ role: 'user', content: `Selected: ${label}` });

    // Fly to item if it has coordinates
    if (item.coordinates) {
      set({ hoveredItemId: item.id });
    }

    if (kind === 'destination') {
      state.selectDestination(item);
      state.setStep('CHOOSE_STAY');
    } else if (kind === 'stay') {
      state.selectStay(item);
      state.setStep('CHOOSE_ACTIVITIES');
    } else if (kind === 'activity') {
      state.toggleActivity(item);
      return;
    } else if (kind === 'product') {
      state.toggleProduct(item);
      return;
    }

    // Auto-advance by calling the planner with the new step context.
    void get().runPlannerForCurrentStep();
  },

  runPlannerForCurrentStep: async () => {
    const currentState = get();
    currentState.setLoading(true);
    
    // We construct the context
    const ctx = {
      prompt: currentState.initialPrompt,
      currentStep: currentState.currentStep,
      destinationId: (currentState.selectedDestination as { id?: string } | null)?.id ?? null,
      duration: currentState.tripDuration,
      budget: currentState.budget,
      foodPreferences: currentState.foodPreferences,
      travelStyle: currentState.travelStyle,
      travelStyleTags: [
        ...(currentState.romanticFlag ? ['romantic' as const] : []),
        ...(currentState.luxuryFlag ? ['luxury' as const] : []),
        ...(currentState.adventureFlag ? ['adventure' as const] : []),
        ...(currentState.cultureFlag ? ['culture' as const] : []),
        ...(currentState.familyFlag ? ['family' as const] : []),
        ...(currentState.budgetFlag ? ['budget' as const] : []),
      ],
      foodTags: currentState.vegetarianFlag ? ['vegetarian' as const] : [],
      experienceTags: [],
      selectedStayId: (currentState.selectedStay as { id?: string } | null)?.id ?? null,
      selectedActivityIds: (currentState.selectedActivities as Array<{ id: string }>).map((a) => a.id),
      selectedProductIds: (currentState.selectedProducts as Array<{ id: string }>).map((p) => p.id),
      previousMarkers: currentState.mapMarkers as any[],
    };
    
    const response = await generateAIResponse(ctx as any);
    
    // Refresh state reference in case it changed during await
    const freshState = get();
    freshState.setLoading(false);
    
    if (response.step) {
      freshState.setStep(response.step as any);
    }
    
    if (response.mapMarkers) {
      freshState.setMapMarkers(response.mapMarkers);
    }
    
    // Add AI message to chat
    freshState.addMessage({
      role: 'assistant',
      content: response.message,
      step: response.step as any,
      suggestions: response.suggestions,
    });
  },

  setHoveredItem: (id) => set({ hoveredItemId: id }),

  approvePlan: () => set({ currentStep: 'PAYMENT_REVIEW' }),

  resetPlanner: () =>
    set({
      currentStep: 'UNDERSTAND_REQUEST',
      initialPrompt: '',
      chatHistory: [],
      tripDuration: null,
      budget: null,
      travelers: '',
      foodPreferences: '',
      travelStyle: '',
      selectedDestination: null,
      selectedStay: null,
      selectedActivities: [],
      selectedProducts: [],
      transportOption: null,
      romanticFlag: false,
      luxuryFlag: false,
      adventureFlag: false,
      cultureFlag: false,
      familyFlag: false,
      budgetFlag: false,
      vegetarianFlag: false,
      itinerary: null,
      totalBudget: 0,
      localImpact: null,
      mapMarkers: [],
      isLoading: false,
    }),

  setMapMarkers: (markers) => set({ mapMarkers: markers }),
}));