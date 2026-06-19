// Centralized content for the Artouris landing page.
// Keeping copy in one place makes it easy to edit later.

export const NAV_LINKS = [
  { label: "Explore", href: "/explore" },
  { label: "Book", href: "/book" },
  { label: "AI Planner", href: "/ai-planner" },
  { label: "Shop", href: "/shop" },
  { label: "Providers", href: "/provider-preview" },
];

export const PROMPT_CHIPS = [
  "Desert adventure",
  "Food & culture",
  "Hidden gems",
  "Family trip",
  "Budget friendly",
  "Luxury riads",
  "Atlas Mountains",
  "Coastal escape",
];

export const EXAMPLE_PROMPTS = [
  {
    title: "Authentic 5-day immersion",
    prompt:
      "I want an authentic 5-day Morocco trip with desert, culture, and local food.",
    tag: "First-time visitor",
    accent: "terracotta",
  },
  {
    title: "Romantic Marrakech weekend",
    prompt:
      "Plan a romantic weekend in Marrakech with a riad, spa, rooftop dinner, and hidden gems.",
    tag: "Couples",
    accent: "gold",
  },
  {
    title: "Budget north loop",
    prompt:
      "I want a budget-friendly trip through Fes, Chefchaouen, and Tangier.",
    tag: "Backpacker",
    accent: "tile-green",
  },
  {
    title: "Family nature escape",
    prompt:
      "Create a family trip with safe activities, short travel times, and beautiful nature.",
    tag: "Family",
    accent: "tile-blue",
  },
] as const;

export const PAIN_POINTS = [
  {
    icon: "Layers",
    title: "Too much information",
    description:
      "Travelers waste hours switching between maps, blogs, booking platforms, social media, and reviews — only to end up more confused than when they started.",
  },
  {
    icon: "Sparkles",
    title: "Generic recommendations",
    description:
      "Most platforms push popular places, not necessarily the experiences that match the traveler's real intention, rhythm, or budget.",
  },
  {
    icon: "EyeOff",
    title: "Local actors stay invisible",
    description:
      "Many guides, artisans, riads, cooperatives, and local experiences struggle to reach the right visitors, hidden behind foreign platforms and SEO budgets.",
  },
] as const;

export const SOLUTION_STEPS = [
  {
    number: "01",
    title: "Tell Artouris what you want",
    description:
      "Write your trip idea naturally — destination, duration, budget, travel style, interests, and any constraints. No forms. No filters. Just your intention.",
    icon: "MessageSquareText",
  },
  {
    number: "02",
    title: "Get your itinerary",
    description:
      "Artouris AI builds a day-by-day plan with routes, timing, activities, local recommendations, and budget logic — structured, realistic, and editable.",
    icon: "Route",
  },
  {
    number: "03",
    title: "Refine your journey",
    description:
      "Ask for changes: make it cheaper, add more culture, avoid crowds, include nature, or reduce travel time. The plan adapts to you in conversation.",
    icon: "Wand2",
  },
] as const;

export const AI_FEATURES = [
  {
    icon: "Brain",
    title: "Intent understanding",
    description:
      "Extracts budget, duration, preferences, constraints, travel style, and interests from a single natural-language prompt — no checkboxes required.",
  },
  {
    icon: "CalendarRange",
    title: "Smart itinerary generation",
    description:
      "Creates structured day-by-day plans with activities, routes, timing, and a realistic flow that respects travel distances and energy levels.",
  },
  {
    icon: "Compass",
    title: "Local experience matching",
    description:
      "Matches travelers with relevant guides, artisans, stays, restaurants, and activities — not just popular places, but the right experiences.",
  },
  {
    icon: "MessagesSquare",
    title: "Conversational refinement",
    description:
      "Travelers can ask: make it cheaper, add nature, avoid crowds, include more culture, or reduce travel time — and the itinerary adapts instantly.",
  },
  {
    icon: "BarChart3",
    title: "Destination insights",
    description:
      "Transforms anonymized demand signals into insights for territories, regions, and tourism stakeholders — privacy-conscious by design.",
  },
  {
    icon: "Languages",
    title: "Multilingual assistance",
    description:
      "Designed for global visitors, with multilingual support that helps travelers discover and communicate with local providers more easily.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Describe your trip",
    description:
      "Write your intention in plain language — destination, duration, budget, travel style, interests, and constraints.",
  },
  {
    number: "02",
    title: "Get a structured plan",
    description:
      "Artouris AI builds a day-by-day itinerary with routes, timing, activities, local recommendations, and budget logic.",
  },
  {
    number: "03",
    title: "Refine in conversation",
    description:
      "Ask for changes like: make it cheaper, add culture, avoid crowds, include nature, or reduce travel time.",
  },
] as const;

export const DESTINATIONS = [
  {
    name: "Marrakech",
    tagline: "Medinas, souks, and rooftop dinners",
    bestFor: ["Culture", "Food", "Heritage"],
    gradient: "from-[#E27048] via-[#D2542A] to-[#8C2F16]",
    pattern: "souk",
    summary:
      "The Red City wakes up in its souks, palaces, and gardens, and ends on rooftop terraces with the call to prayer.",
  },
  {
    name: "Fes",
    tagline: "The world's oldest living medina",
    bestFor: ["History", "Crafts", "Culture"],
    gradient: "from-[#2F5D54] via-[#1F4E6E] to-[#162435]",
    pattern: "tile",
    summary:
      "A labyrinth of tanneries, madrasas, and artisan workshops where medieval craft still runs the city's rhythm.",
  },
  {
    name: "Chefchaouen",
    tagline: "The blue pearl of the Rif",
    bestFor: ["Photography", "Walks", "Calm"],
    gradient: "from-[#5B779A] via-[#3A5778] to-[#1F3149]",
    pattern: "diamond",
    summary:
      "Indigo-washed alleys, mountain air, and a slow pace built for wandering without an agenda.",
  },
  {
    name: "Sahara Desert",
    tagline: "Dunes, silence, and stars",
    bestFor: ["Adventure", "Desert", "Stars"],
    gradient: "from-[#D4A958] via-[#B58A38] to-[#6E4D29]",
    pattern: "dunes",
    summary:
      "Camel-trek into Erg Chebbi, sleep in a Berber camp, and watch the sky turn on above the dunes.",
  },
  {
    name: "Atlas Mountains",
    tagline: "Berber villages and high passes",
    bestFor: ["Nature", "Hiking", "Local life"],
    gradient: "from-[#2F5D54] via-[#4E371D] to-[#322515]",
    pattern: "mountains",
    summary:
      "Terraced valleys, traditional houses, and trails that connect Imlil, Ouirgane, and the Tizi N'Tichka pass.",
  },
  {
    name: "Essaouira",
    tagline: "Atlantic wind and ramparts",
    bestFor: ["Coast", "Kitesurf", "Seafood"],
    gradient: "from-[#1F4E6E] via-[#2A4160] to-[#0E1825]",
    pattern: "wave",
    summary:
      "A whitewashed port city with ramparts, fresh catch, and the steady Atlantic breeze Mogador is known for.",
  },
  {
    name: "Tangier",
    tagline: "Where two continents meet",
    bestFor: ["History", "Cafés", "Coast"],
    gradient: "from-[#3A5778] via-[#5B779A] to-[#8AA0BC]",
    pattern: "harbor",
    summary:
      "International, layered, and literary — the strait, the kasbah, and the cafés that drew writers for a century.",
  },
  {
    name: "Agafay",
    tagline: "Stone desert near Marrakech",
    bestFor: ["Sunset", "Day trip", "Camps"],
    gradient: "from-[#C8A97A] via-[#B58A55] to-[#6E4D29]",
    pattern: "stone",
    summary:
      "A pale stone desert 40 minutes from Marrakech — sunset dinners, lantern-lit camps, and quiet skies.",
  },
] as const;

export const TRAVELER_BENEFITS = [
  {
    icon: "Zap",
    title: "Plan a complete trip in minutes",
    description:
      "From one prompt to a full day-by-day itinerary — no tabs, no spreadsheets, no jumping between blogs and bookings.",
  },
  {
    icon: "Compass",
    title: "Discover authentic experiences",
    description:
      "Artouris surfaces the experiences that match your intention, not just what ranks highest on generic platforms.",
  },
  {
    icon: "Wallet",
    title: "Match the trip to your budget",
    description:
      "Tell Artouris your range and style. The plan respects your budget logic — and adapts when you change it.",
  },
  {
    icon: "Brain",
    title: "Avoid decision fatigue",
    description:
      "No more 40 open tabs. One conversation, one structured plan, and room to refine without starting over.",
  },
  {
    icon: "MapPin",
    title: "Find local gems beyond mainstream",
    description:
      "Cooperatives, artisans, family-run riads, and neighborhood tables that don't make it onto the usual lists.",
  },
  {
    icon: "MessagesSquare",
    title: "Refine by conversation",
    description:
      "Make it cheaper, slower, more nature, less driving. Edit in plain language and watch the plan update.",
  },
  {
    icon: "HeartHandshake",
    title: "Recommendations that feel personal",
    description:
      "Built around your rhythm, interests, and constraints — not a template applied to every traveler.",
  },
] as const;

export const BUSINESS_CATEGORIES = [
  { icon: "BedDouble", label: "Riads & guesthouses" },
  { icon: "UserRound", label: "Local guides" },
  { icon: "Hammer", label: "Artisans" },
  { icon: "Users", label: "Cooperatives" },
  { icon: "UtensilsCrossed", label: "Restaurants" },
  { icon: "Drama", label: "Cultural experiences" },
  { icon: "Tent", label: "Desert camps" },
  { icon: "Plane", label: "Local agencies" },
] as const;

export const BUSINESS_BENEFITS = [
  {
    icon: "FileText",
    title: "Create a local business profile",
    description:
      "A clean, AI-assisted profile that describes what makes your experience authentic, in multiple languages.",
  },
  {
    icon: "Sparkles",
    title: "Appear in relevant AI recommendations",
    description:
      "Artouris matches you with travelers whose intention fits your offer — not by ad budget, but by relevance.",
  },
  {
    icon: "Target",
    title: "Reach travelers looking for you",
    description:
      "Connect with visitors actively searching for the exact kind of experience you provide.",
  },
  {
    icon: "Globe",
    title: "Reduce dependence on foreign platforms",
    description:
      "Build visibility on a platform designed to empower local ecosystems, not extract from them.",
  },
  {
    icon: "Languages",
    title: "AI-assisted descriptions & translations",
    description:
      "Reach international travelers with descriptions translated and polished by AI.",
  },
  {
    icon: "TrendingUp",
    title: "Receive qualified interest",
    description:
      "Less noise, more signal. Travelers arrive already aligned with what you offer.",
  },
] as const;

export const INTELLIGENCE_CARDS = [
  {
    icon: "Flame",
    title: "Top searched experiences",
    metric: "Real-time",
    description:
      "Track which experience categories travelers are actively searching for, week over week.",
    type: "list",
  },
  {
    icon: "Map",
    title: "Demand by region",
    metric: "12 regions",
    description:
      "See where interest is concentrated, and which regions are growing or cooling down.",
    type: "map",
  },
  {
    icon: "Wallet",
    title: "Traveler budget segments",
    metric: "5 segments",
    description:
      "Understand how budget distribution shifts across seasons, origins, and destinations.",
    type: "bars",
  },
  {
    icon: "TrendingUp",
    title: "Emerging destinations",
    metric: "+18% MoM",
    description:
      "Identify rising destinations early, before they show up in mainstream travel lists.",
    type: "trend",
  },
  {
    icon: "Compass",
    title: "Underexplored areas",
    metric: "Under the radar",
    description:
      "Spot territories with strong potential but low current visibility — opportunities for development.",
    type: "rings",
  },
  {
    icon: "CalendarRange",
    title: "Seasonal demand trends",
    metric: "Year-round view",
    description:
      "Anticipate high and low seasons, shoulder windows, and shifting traveler preferences.",
    type: "calendar",
  },
  {
    icon: "Store",
    title: "Local business visibility map",
    metric: "Live",
    description:
      "See where local businesses are listed, where coverage is thin, and where to recruit new providers.",
    type: "grid",
  },
] as const;

export const COMPARISON_ROWS = [
  {
    dimension: "Planning interface",
    traditional: "Filter-based search across dozens of tabs",
    artouris: "One natural-language prompt",
  },
  {
    dimension: "Recommendations",
    traditional: "Popularity-driven, generic results",
    artouris: "Personalized to intent, budget, and rhythm",
  },
  {
    dimension: "Itinerary",
    traditional: "Fragmented — built manually, piece by piece",
    artouris: "Generated end-to-end, day by day, in seconds",
  },
  {
    dimension: "Local visibility",
    traditional: "Local actors buried under foreign platforms",
    artouris: "Local businesses matched by relevance, not budget",
  },
  {
    dimension: "Refinement",
    traditional: "Start over every time you change your mind",
    artouris: "Conversational edits — the plan adapts in place",
  },
  {
    dimension: "Destination insight",
    traditional: "Data captured and held externally",
    artouris: "Anonymized intelligence shared with destinations",
  },
] as const;

export const MOROCCAN_TOUCH = [
  { icon: "Landmark", title: "Medinas & heritage", description: "Living historic cores where craft, trade, and daily life still meet." },
  { icon: "Mountain", title: "Desert & adventure", description: "Erg dunes, stone deserts, and overnight camps under the stars." },
  { icon: "Trees", title: "Atlas Mountains", description: "Berber villages, terraced valleys, and high passes above the plains." },
  { icon: "UtensilsCrossed", title: "Moroccan food", description: "Tagines, couscous, pastilla, and street food worth a trip on its own." },
  { icon: "Hammer", title: "Artisan workshops", description: "Tanneries, weaving, zellige, pottery — craft that runs in families." },
  { icon: "Waves", title: "Coastal escapes", description: "Atlantic ports, ramparts, and breezy seaside towns." },
  { icon: "House", title: "Rural experiences", description: "Off-the-grid stays, cooperatives, and routes through quieter regions." },
  { icon: "HeartHandshake", title: "Local hospitality", description: "The Moroccan art of welcoming guests — at the heart of every trip." },
] as const;

export const IMPACT_METRICS = [
  { label: "Time saved in trip planning", value: "Hours", suffix: "→ minutes", type: "qualitative" },
  { label: "Itineraries generated", value: "Pilot", suffix: "in progress", type: "qualitative" },
  { label: "Local businesses discovered", value: "Network", suffix: "growing", type: "qualitative" },
  { label: "Traveler-to-local connections", value: "Qualified", suffix: "matching", type: "qualitative" },
  { label: "Regions represented", value: "12", suffix: "regions of Morocco", type: "numeric" },
  { label: "Destination insights generated", value: "Anonymized", suffix: "and growing", type: "qualitative" },
  { label: "User satisfaction", value: "Measured", suffix: "during pilot", type: "qualitative" },
] as const;

export const TRAVELER_TRAVEL_STYLES = [
  "Culture & heritage",
  "Food & gastronomy",
  "Desert & adventure",
  "Nature & mountains",
  "Coast & relaxation",
  "Family-friendly",
  "Luxury & riads",
  "Budget-friendly",
] as const;

export const BUSINESS_CATEGORIES_SELECT = [
  "Riad / guesthouse",
  "Local guide",
  "Artisan",
  "Cooperative",
  "Restaurant",
  "Cultural experience",
  "Desert camp",
  "Local agency",
  "Activity provider",
  "Other",
] as const;

export const MOROCCO_REGIONS = [
  "Marrakech-Safi",
  "Fès-Meknès",
  "Rabat-Salé-Kénitra",
  "Casablanca-Settat",
  "Tangier-Tetouan-Al Hoceima",
  "Béni Mellal-Khénifra",
  "Drâa-Tafilalet",
  "Souss-Massa",
  "Oriental",
  "Guelmim-Oued Noun",
  "Laâyoune-Sakia El Hamra",
  "Dakhla-Oued Ed-Dahab",
] as const;
