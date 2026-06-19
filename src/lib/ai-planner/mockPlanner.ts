import type {
  AIResponse,
  ActivitySuggestion,
  DestinationSuggestion,
  MapMarker,
  PlannerContext,
  ProductSuggestion,
  StaySuggestion,
} from './plannerTypes';
import { MOCK_DATA } from '@/components/travel-planner/mockData';

// Artificial delay so the typing indicator reads naturally.
const THINK_MS = 900;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// === Keyword / tag extraction ===
// Pure helper so swapping in an LLM later only changes the suggestion +
// state-machine logic, not the analysis of the user's intent.

export type ExtractedTags = {
  // Region / experience
  sahara: boolean;
  desert: boolean;
  dunes: boolean;
  camel: boolean;
  // Travel style
  romantic: boolean;
  luxury: boolean;
  adventure: boolean;
  culture: boolean;
  family: boolean;
  budget: boolean;
  // Food
  vegetarian: boolean;
  vegan: boolean;
  halal: boolean;
  // Stay preference cues
  quiet: boolean;
  private: boolean;
  // "crowds avoidance" refinement cue
  avoidCrowds: boolean;
};

export function extractTags(input: string): ExtractedTags {
  const p = input.toLowerCase();
  return {
    sahara: p.includes('sahara') || p.includes('saharian') || p.includes('saharan'),
    desert: p.includes('desert') || p.includes('dunes') || p.includes('sahara') || p.includes('saharian') || p.includes('saharan'),
    dunes: p.includes('dunes'),
    camel: p.includes('camel'),
    romantic: p.includes('romantic') || p.includes('couple') || p.includes('honeymoon'),
    luxury: p.includes('luxury') || p.includes('premium'),
    adventure: p.includes('adventure') || p.includes('active') || p.includes('thrill'),
    culture: p.includes('culture') || p.includes('local') || p.includes('authentic') || p.includes('nomad'),
    family: p.includes('family') || p.includes('kids') || p.includes('children'),
    budget: p.includes('cheap') || p.includes('budget') || p.includes('affordable'),
    vegetarian: p.includes('vegetarian') || p.includes('veggie'),
    vegan: p.includes('vegan'),
    halal: p.includes('halal'),
    quiet: p.includes('quiet') || p.includes('calm') || p.includes('peaceful'),
    private: p.includes('private') || p.includes('exclusive'),
    avoidCrowds: p.includes('avoid crowd') || p.includes('not crowded') || p.includes('less people'),
  };
}

// Helper to merge user-typed context tags with the flags already in the store.
function tagsFromContext(ctx: PlannerContext): ExtractedTags {
  const fromPrompt = extractTags(ctx.prompt);
  // The store flags are the source of truth for refinements made AFTER the
  // initial prompt. Mirror them on top of the prompt's tags.
  return {
    ...fromPrompt,
    romantic: fromPrompt.romantic || ctx.travelStyleTags.includes('romantic'),
    luxury: fromPrompt.luxury || ctx.travelStyleTags.includes('luxury'),
    adventure: fromPrompt.adventure || ctx.travelStyleTags.includes('adventure'),
    culture: fromPrompt.culture || ctx.travelStyleTags.includes('culture'),
    family: fromPrompt.family || ctx.travelStyleTags.includes('family'),
    budget: fromPrompt.budget || ctx.travelStyleTags.includes('budget'),
    vegetarian: fromPrompt.vegetarian || ctx.foodTags.includes('vegetarian') || ctx.foodTags.includes('vegan'),
    halal: fromPrompt.halal || ctx.foodTags.includes('halal'),
  };
}

// === Destination suggestions ===
// Mirrors the spec: Merzouga (sahara hero), Zagora (calm road trip),
// Agafay (luxury short escape near Marrakech). Match scores shift with tags.

function destinationSuggestions(tags: ExtractedTags): DestinationSuggestion[] {
  const all = [
    {
      id: 'region-merzouga',
      name: 'Merzouga',
      image: '/images/sahara/regions/merzouga-dunes.png',
      baseScore: 96,
      budgetLevel: 'Medium',
      bestFor: ['Iconic Dunes', 'Camel Trekking', 'Desert Camps', 'Stargazing'],
      reason:
        'Iconic Erg Chebbi dunes with sunset camel trekking, overnight desert camps, and local nomad culture.',
      coordinates: [31.0969, -4.0125] as [number, number],
    },
    {
      id: 'region-zagora',
      name: 'Zagora',
      image: '/images/sahara/regions/zagora-desert-road.png',
      baseScore: 88,
      budgetLevel: 'Affordable',
      bestFor: ['Road Trips', 'Palm Groves', 'Kasbahs', 'Quiet Desert'],
      reason:
        'A calmer desert gateway with palm groves and historic kasbahs, perfect for slow road trips.',
      coordinates: [30.3312, -5.8365] as [number, number],
    },
    {
      id: 'region-agafay',
      name: 'Agafay',
      image: '/images/sahara/regions/agafay-rocky-desert.png',
      baseScore: 82,
      budgetLevel: 'Premium',
      bestFor: ['Luxury Escapes', 'Short Trips', 'Stone Desert', 'Marrakech Escape'],
      reason:
        'Stone desert 40 minutes from Marrakech — sunset dinners and lantern-lit luxury camps.',
      coordinates: [31.4284, -8.1466] as [number, number],
    },
  ];

  return all
    .map((d) => {
      let score = d.baseScore;
      if (tags.sahara || tags.dunes || tags.camel) {
        if (d.id === 'region-merzouga') score += 2;
        if (d.id === 'region-agafay') score -= 6;
      }
      if (tags.luxury && d.id === 'region-agafay') score += 6;
      if (tags.budget && d.id === 'region-zagora') score += 4;
      if (tags.avoidCrowds && d.id === 'region-zagora') score += 3;
      return { ...d, matchScore: Math.min(99, Math.max(70, score)) };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

function destinationMarkers(items: DestinationSuggestion[]): MapMarker[] {
  return items.map((d) => ({
    id: d.id,
    type: 'destination' as const,
    title: d.name,
    price: d.budgetLevel,
    coordinates: d.coordinates,
    item: d,
    image: d.image,
    desc: d.reason,
    badges: d.bestFor,
  }));
}

// === Stay suggestions ===
// Filter and re-rank the existing MOCK_DATA.hotels based on the user's tags.

function staySuggestions(tags: ExtractedTags): StaySuggestion[] {
  let stays: StaySuggestion[] = MOCK_DATA.hotels.map<StaySuggestion>((h) => ({
    id: h.id,
    title: h.title,
    desc: h.desc,
    price: h.price,
    pricePerNight: h.pricePerNight ?? parseInt(h.price as string) ?? 300,
    rating: h.rating,
    reviews: h.reviews,
    coordinates: h.coordinates,
    image: h.image,
    fairScore: h.fairScore ?? 80,
    badges: h.badges ?? [],
    type: h.type,
    amenities: h.amenities ?? [],
  }));

  if (tags.luxury) {
    stays = stays.filter(
      (s) => s.pricePerNight >= 800 || s.type === 'Luxury Camp',
    );
  }
  if (tags.budget) {
    stays = stays.filter((s) => s.pricePerNight <= 600);
  }
  if (tags.family) {
    stays = stays.filter(
      (s) => s.badges.some((b) => /family|pool|kasbah/i.test(b)) || s.type === 'Kasbah Hotel',
    );
  }
  if (tags.romantic) {
    stays = stays.filter(
      (s) => s.badges.some((b) => /romantic|couple|private/i.test(b)) || s.type === 'Luxury Camp',
    );
  }

  // If we filtered everything out, fall back to the full list.
  if (stays.length === 0) {
    stays = MOCK_DATA.hotels.map<StaySuggestion>((h) => ({
      id: h.id,
      title: h.title,
      desc: h.desc,
      price: h.price,
      pricePerNight: h.pricePerNight ?? parseInt(h.price as string) ?? 300,
      rating: h.rating,
      reviews: h.reviews,
      coordinates: h.coordinates,
      image: h.image,
      fairScore: h.fairScore ?? 80,
      badges: h.badges ?? [],
      type: h.type,
      amenities: h.amenities ?? [],
    }));
  }

  // Boost by stayId when known
  const romanticPicks = ['stay-merzouga-005', 'stay-merzouga-002'];
  const familyPicks = ['stay-merzouga-009', 'stay-merzouga-008'];
  stays = stays
    .map((s) => {
      let boost = 0;
      if (tags.romantic && romanticPicks.includes(s.id)) boost += 5;
      if (tags.family && familyPicks.includes(s.id)) boost += 4;
      if (tags.culture && s.badges.some((b) => /local|family/i.test(b))) boost += 2;
      return { ...s, fairScore: s.fairScore + boost };
    })
    .sort((a, b) => b.fairScore - a.fairScore)
    .slice(0, 4);

  return stays;
}

function stayMarkers(items: StaySuggestion[]): MapMarker[] {
  return items.map((s) => ({
    id: s.id,
    type: 'stay' as const,
    title: s.title,
    price: s.price,
    coordinates: s.coordinates,
    item: s,
    image: s.image,
    desc: s.desc,
    rating: s.rating,
    badges: s.badges,
  }));
}

// === Activity suggestions ===
// Bias toward camel/ATV/sandboarding/stargazing/nomad/artisan based on tags.

function activitySuggestions(tags: ExtractedTags): ActivitySuggestion[] {
  let activities = MOCK_DATA.activities.map((a) => ({
    id: a.id,
    title: a.title,
    desc: a.desc,
    price: a.price,
    rating: a.rating,
    coordinates: a.coordinates,
    image: a.image,
    fairScore: a.fairScore ?? 80,
    badges: a.badges ?? [],
  }));

  const camelBoost = tags.camel || tags.sahara ? 5 : 0;
  const adventureBoost = tags.adventure ? 5 : 0;
  const cultureBoost = tags.culture ? 5 : 0;
  const romanticBoost = tags.romantic ? 3 : 0;

  activities = activities
    .map((a) => {
      let score = a.fairScore;
      if (/camel/i.test(a.title)) score += camelBoost + romanticBoost;
      if (/atv|sandboard/i.test(a.title)) score += adventureBoost;
      if (/nomad|artisan/i.test(a.title)) score += cultureBoost;
      return { ...a, fairScore: score };
    })
    .sort((a, b) => b.fairScore - a.fairScore);

  return activities;
}

function activityMarkers(items: ActivitySuggestion[]): MapMarker[] {
  return items.map((a) => ({
    id: a.id,
    type: 'activity' as const,
    title: a.title,
    price: a.price,
    coordinates: a.coordinates,
    item: a,
    image: a.image,
    desc: a.desc,
    duration: '2 hours',
    rating: a.rating,
    badges: a.badges,
  }));
}

// === Souvenir suggestions ===

function productSuggestions(): ProductSuggestion[] {
  return MOCK_DATA.souvenirs.map((p) => ({
    id: p.id,
    title: p.title,
    desc: p.desc,
    price: p.price,
    rating: p.rating,
    coordinates: p.coordinates as [number, number],
    image: p.image,
    fairScore: p.fairScore ?? 95,
    badges: p.badges ?? [],
  }));
}

function productMarkers(items: ProductSuggestion[]): MapMarker[] {
  return items.map((p) => ({
    id: p.id,
    type: 'shop' as const,
    title: p.title,
    price: p.price,
    coordinates: p.coordinates,
    item: p,
    image: p.image,
    desc: p.desc,
    rating: p.rating,
    badges: p.badges,
  }));
}

// === Main entrypoint ===
// Drives the state machine step-by-step exactly as the spec describes.

export async function generateAIResponse(context: PlannerContext): Promise<AIResponse> {
  await sleep(THINK_MS);
  const tags = tagsFromContext(context);

  switch (context.currentStep) {
    case 'UNDERSTAND_REQUEST': {
      const earlyItems = tags.sahara || tags.desert || tags.dunes ? destinationSuggestions(tags) : [];
      return {
        step: 'ASK_DURATION',
        message:
          'That sounds like a wonderful trip. To shape the perfect itinerary, how many days are you planning to stay?',
        showRefinements: false,
        mapMarkers: earlyItems.length > 0 ? destinationMarkers(earlyItems) : undefined,
      };
    }

    case 'ASK_DURATION': {
      const earlyItems = tags.sahara || tags.desert || tags.dunes ? destinationSuggestions(tags) : [];
      return {
        step: 'ASK_BUDGET',
        message: 'Got it. What is your approximate budget for the trip (in MAD)?',
        showRefinements: false,
        mapMarkers: earlyItems.length > 0 ? destinationMarkers(earlyItems) : undefined,
      };
    }

    case 'ASK_BUDGET': {
      const earlyItems = tags.sahara || tags.desert || tags.dunes ? destinationSuggestions(tags) : [];
      return {
        step: 'ASK_PREFERENCES',
        message:
          'Perfect. Before I suggest destinations, do you have any food preferences (vegetarian, halal) or a travel style (adventure, romance, culture, family, luxury, budget)?',
        showRefinements: true,
        mapMarkers: earlyItems.length > 0 ? destinationMarkers(earlyItems) : undefined,
      };
    }

    case 'ASK_PREFERENCES':
    case 'SUGGEST_DESTINATION': {
      const items = destinationSuggestions(tags);
      const leadName = items[0].name;
      const foodNote = tags.vegetarian
        ? " I've also noted your vegetarian preference so I can adapt restaurant picks."
        : '';
      return {
        step: 'SUGGEST_DESTINATION',
        message: `Based on what you described, here are the destinations that match. I'd start with ${leadName}.${foodNote}`,
        suggestions: items,
        mapMarkers: destinationMarkers(items),
        nextQuestion: 'Which destination would you like to choose?',
        showRefinements: true,
      };
    }

    case 'CHOOSE_STAY': {
      const items = staySuggestions(tags);
      const isMerzouga = context.destinationId === 'region-merzouga';
      const destName = isMerzouga ? 'Merzouga' : context.destinationId === 'region-zagora' ? 'Zagora' : 'Agafay';
      const prefix = context.destinationId ? `Great choice. ${destName} is perfect for ${isMerzouga ? 'dunes, camel rides, and desert camps' : 'your desert adventure'}. Now let’s choose where you’ll stay.\n\n` : '';

      const intro = tags.romantic
        ? 'I have picked stays with private settings and sunset views that work well for couples.'
        : tags.budget
          ? 'These stays match a more affordable budget without losing the local feel.'
          : 'These are highly-rated local stays with great hosts in your area.';
      return {
        step: 'CHOOSE_STAY',
        message: `${prefix}${intro} Pick the one that feels right — or ask me to adjust.`,
        suggestions: items,
        mapMarkers: stayMarkers(items),
        nextQuestion: 'Which stay would you like to lock in?',
        showRefinements: true,
      };
    }

    case 'CHOOSE_ACTIVITIES': {
      const items = activitySuggestions(tags);
      const food = tags.vegetarian
        ? ' Your vegetarian preference will carry over into meal planning.'
        : '';
      const prefix = context.selectedStayId ? 'Nice choice. I’ll now suggest activities around your stay.\n\n' : 'Your stay is locked in. Now let\'s add some unforgettable experiences. ';
      return {
        step: 'CHOOSE_ACTIVITIES',
        message: `${prefix}Pick the activities you'd like to include.${food}`,
        suggestions: items,
        mapMarkers: activityMarkers(items),
        nextQuestion: 'Ready to look at local artisan products next?',
        showRefinements: true,
      };
    }

    case 'LOCAL_MARKETPLACE': {
      const items = productSuggestions();
      return {
        step: 'LOCAL_MARKETPLACE',
        message:
          'Finally, would you like to reserve any authentic local souvenirs? Buying through Artouris sends the money directly to the artisan.',
        suggestions: items,
        mapMarkers: productMarkers(items),
        nextQuestion: 'When you are ready, I will generate your final itinerary.',
        showRefinements: true,
      };
    }

    case 'FINAL_ITINERARY':
    case 'PAYMENT_REVIEW':
      return {
        step: context.currentStep,
        message:
          'Your itinerary is ready. Approve the plan and book the full trip from one place.',
        showRefinements: false,
      };

    default:
      return {
        step: 'UNDERSTAND_REQUEST',
        message:
          'Tell me what kind of Moroccan trip you want to live, and I will build it step by step.',
        showRefinements: false,
      };
  }
}