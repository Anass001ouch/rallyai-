export function findDuplicateImages(items: { name: string; image: string }[]) {
  const seen = new Map<string, string[]>();

  items.forEach((item) => {
    if (!seen.has(item.image)) {
      seen.set(item.image, []);
    }
    seen.get(item.image)?.push(item.name);
  });

  return Array.from(seen.entries())
    .filter(([, names]) => names.length > 1)
    .map(([image, names]) => ({ image, usedBy: names }));
}

export type TourismProviderType =
  | "stay"
  | "activity"
  | "transport"
  | "artisan"
  | "restaurant"
  | "guide";

export type TourismProvider = {
  id: string;
  name: string;
  type: TourismProviderType;
  region: string;
  city: string;
  address: string;
  coordinates: [number, number];
  shortDescription: string;
  longDescription: string;
  priceFrom: number;
  currency: "MAD";
  rating: number;
  reviewCount: number;
  images: string[];
  badges: string[];
  languages: string[];
  contact: {
    whatsapp: string;
    phone: string;
    email: string;
  };
  availability: "available" | "limited" | "unavailable";
  aiMatchTags: string[];
  fairVisibilityScore: number;
  localImpactScore: number;
};

export const tourismProviders: TourismProvider[] = [
  {
    id: "stay-merzouga-001",
    name: "Sahara Pearl Desert Camp",
    type: "stay",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Erg Chebbi Dunes, Merzouga",
    coordinates: [31.0964, -4.0103],
    shortDescription: "Family-owned desert camp with private tents and sunset views.",
    longDescription:
      "A peaceful desert camp located near the Erg Chebbi dunes, offering traditional Moroccan hospitality, private tents, local dinner, music around the fire, and sunrise views.",
    priceFrom: 450,
    currency: "MAD",
    rating: 4.8,
    reviewCount: 126,
    images: [
      "/images/sahara/stays/sahara-pearl-camp.png",
    ],
    badges: ["Local Provider", "Family-Owned", "Breakfast Included", "Desert View"],
    languages: ["Arabic", "French", "English", "Darija"],
    contact: {
      whatsapp: "+212600000001",
      phone: "+212600000001",
      email: "contact@saharapearl.demo"
    },
    availability: "available",
    aiMatchTags: ["desert", "romantic", "local", "sunset", "traditional", "medium-budget"],
    fairVisibilityScore: 91,
    localImpactScore: 94
  },
  {
    id: "stay-merzouga-002",
    name: "Amazigh Luxury Camp",
    type: "stay",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Near Erg Chebbi, Merzouga",
    coordinates: [31.1121, -4.0058],
    shortDescription: "Premium desert camp with luxury tents and private dinner setup.",
    longDescription:
      "A premium camp experience for travelers looking for comfort in the Sahara, with spacious tents, private bathrooms, traditional meals, and optional 4x4 transfer.",
    priceFrom: 850,
    currency: "MAD",
    rating: 4.9,
    reviewCount: 88,
    images: [
      "/images/sahara/stays/amazigh-luxury-camp.png",
    ],
    badges: ["Verified", "Luxury", "Private Bathroom", "Dinner Included"],
    languages: ["Arabic", "French", "English", "Spanish"],
    contact: {
      whatsapp: "+212600000002",
      phone: "+212600000002",
      email: "hello@amazighluxury.demo"
    },
    availability: "limited",
    aiMatchTags: ["luxury", "desert", "couple", "premium", "comfort", "photogenic"],
    fairVisibilityScore: 84,
    localImpactScore: 88
  },
  {
    id: "stay-merzouga-003",
    name: "Riad Dunes Nomad",
    type: "stay",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Merzouga Village Center",
    coordinates: [31.0809, -4.0132],
    shortDescription: "Affordable riad near the village with traditional breakfast.",
    longDescription:
      "A budget-friendly riad for travelers who want to stay close to the village while enjoying local food, simple rooms, and easy access to desert activities.",
    priceFrom: 280,
    currency: "MAD",
    rating: 4.6,
    reviewCount: 203,
    images: [
      "/images/sahara/stays/riad-dunes-nomad.png",
    ],
    badges: ["Budget Friendly", "Local Provider", "Traditional Breakfast", "Village Access"],
    languages: ["Arabic", "French", "Darija"],
    contact: {
      whatsapp: "+212600000003",
      phone: "+212600000003",
      email: "riadnomad@demo.com"
    },
    availability: "available",
    aiMatchTags: ["budget", "local", "traditional", "village", "solo-travel", "family"],
    fairVisibilityScore: 93,
    localImpactScore: 90
  },
  {
    id: "activity-merzouga-001",
    name: "Sunset Camel Trekking",
    type: "activity",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Erg Chebbi Dunes",
    coordinates: [31.1045, -4.0181],
    shortDescription: "Camel ride through the dunes during golden hour.",
    longDescription:
      "A guided camel trekking experience across the Erg Chebbi dunes with photo stops, tea break, and sunset viewpoint.",
    priceFrom: 180,
    currency: "MAD",
    rating: 4.9,
    reviewCount: 312,
    images: [
      "/images/sahara/activities/camel-trekking-sunset.png",
    ],
    badges: ["Local Guide", "Best Seller", "Sunset Experience"],
    languages: ["Arabic", "French", "English", "Darija"],
    contact: {
      whatsapp: "+212600000004",
      phone: "+212600000004",
      email: "camel@merzougaexperiences.demo"
    },
    availability: "available",
    aiMatchTags: ["camel", "sunset", "desert", "authentic", "photography", "family"],
    fairVisibilityScore: 89,
    localImpactScore: 96
  },
  {
    id: "activity-merzouga-002",
    name: "ATV Dunes Adventure",
    type: "activity",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Merzouga Activity Base",
    coordinates: [31.0887, -4.0178],
    shortDescription: "One-hour ATV ride across the Sahara dunes.",
    longDescription:
      "A guided ATV adventure for travelers who want an exciting desert experience. Includes safety briefing, helmet, and guide supervision.",
    priceFrom: 350,
    currency: "MAD",
    rating: 4.7,
    reviewCount: 147,
    images: [
      "/images/sahara/activities/atv-dunes.png",
    ],
    badges: ["Adventure", "Guide Included", "Safety Gear"],
    languages: ["Arabic", "French", "English"],
    contact: {
      whatsapp: "+212600000005",
      phone: "+212600000005",
      email: "atv@merzougaexperiences.demo"
    },
    availability: "limited",
    aiMatchTags: ["adventure", "atv", "dunes", "friends", "premium", "active"],
    fairVisibilityScore: 82,
    localImpactScore: 85
  },
  {
    id: "activity-merzouga-003",
    name: "Sandboarding Experience",
    type: "activity",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Erg Chebbi Dunes",
    coordinates: [31.0998, -4.0264],
    shortDescription: "Beginner-friendly sandboarding session in the dunes.",
    longDescription:
      "A fun sandboarding activity with local guides, perfect for friends, young travelers, and families looking for a light adventure.",
    priceFrom: 120,
    currency: "MAD",
    rating: 4.5,
    reviewCount: 74,
    images: [
      "/images/sahara/activities/sandboarding.png",
    ],
    badges: ["Budget Friendly", "Fun Activity", "Local Guide"],
    languages: ["Arabic", "French", "English", "Darija"],
    contact: {
      whatsapp: "+212600000006",
      phone: "+212600000006",
      email: "sandboard@demo.com"
    },
    availability: "available",
    aiMatchTags: ["sandboarding", "budget", "friends", "fun", "desert", "short-activity"],
    fairVisibilityScore: 87,
    localImpactScore: 89
  },
  {
    id: "transport-merzouga-001",
    name: "Errachidia Airport Desert Transfer",
    type: "transport",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Errachidia Airport to Merzouga",
    coordinates: [31.9314, -4.4244],
    shortDescription: "Private transfer from Errachidia Airport to Merzouga.",
    longDescription:
      "Comfortable private transfer service from Errachidia Airport to Merzouga with pickup, luggage support, and optional stops on the road.",
    priceFrom: 700,
    currency: "MAD",
    rating: 4.8,
    reviewCount: 64,
    images: [
      "/images/sahara/activities/desert-4x4-transfer.png"
    ],
    badges: ["Private Transfer", "Airport Pickup", "Local Driver"],
    languages: ["Arabic", "French", "English", "Darija"],
    contact: {
      whatsapp: "+212600000007",
      phone: "+212600000007",
      email: "transfer@merzouga.demo"
    },
    availability: "available",
    aiMatchTags: ["transport", "airport", "private", "comfort", "family", "merzouga"],
    fairVisibilityScore: 88,
    localImpactScore: 91
  },
  {
    id: "transport-merzouga-002",
    name: "4x4 Desert Camp Pickup",
    type: "transport",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Merzouga Village to Erg Chebbi Camps",
    coordinates: [31.0832, -4.0125],
    shortDescription: "4x4 transfer from Merzouga village to desert camps.",
    longDescription:
      "Local 4x4 pickup service connecting travelers from Merzouga village to desert camps inside or near the dunes.",
    priceFrom: 250,
    currency: "MAD",
    rating: 4.7,
    reviewCount: 91,
    images: [
      "/images/sahara/activities/desert-4x4-transfer.png"
    ],
    badges: ["4x4 Transfer", "Camp Pickup", "Local Driver"],
    languages: ["Arabic", "French", "Darija"],
    contact: {
      whatsapp: "+212600000008",
      phone: "+212600000008",
      email: "pickup@merzouga.demo"
    },
    availability: "available",
    aiMatchTags: ["4x4", "camp", "transfer", "desert", "local", "practical"],
    fairVisibilityScore: 90,
    localImpactScore: 92
  },
  {
    id: "guide-merzouga-001",
    name: "Hassan Desert Guide",
    type: "guide",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Merzouga Village",
    coordinates: [31.0815, -4.0119],
    shortDescription: "Local desert guide for cultural walks and nomad experiences.",
    longDescription:
      "A local guide offering cultural tours, nomad family visits, desert safety guidance, sunrise walks, and storytelling about Saharan life.",
    priceFrom: 300,
    currency: "MAD",
    rating: 4.9,
    reviewCount: 118,
    images: [
      "/images/sahara/activities/desert-4x4-transfer.png"
    ],
    badges: ["Local Guide", "Cultural Experience", "Verified"],
    languages: ["Arabic", "French", "English", "Darija"],
    contact: {
      whatsapp: "+212600000009",
      phone: "+212600000009",
      email: "hassan.guide@demo.com"
    },
    availability: "available",
    aiMatchTags: ["guide", "culture", "nomad", "authentic", "storytelling", "local"],
    fairVisibilityScore: 95,
    localImpactScore: 98
  },
  {
    id: "restaurant-merzouga-001",
    name: "Kasbah Tafilalet Kitchen",
    type: "restaurant",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Merzouga Center",
    coordinates: [31.0826, -4.0121],
    shortDescription: "Traditional Moroccan meals near the desert gate.",
    longDescription:
      "A small local restaurant serving tajine, couscous, harira, Moroccan salads, mint tea, and breakfast options for travelers.",
    priceFrom: 90,
    currency: "MAD",
    rating: 4.6,
    reviewCount: 185,
    images: [
      "/images/sahara/activities/desert-4x4-transfer.png"
    ],
    badges: ["Local Food", "Traditional", "Budget Friendly"],
    languages: ["Arabic", "French", "Darija"],
    contact: {
      whatsapp: "+212600000010",
      phone: "+212600000010",
      email: "kitchen@tafilalet.demo"
    },
    availability: "available",
    aiMatchTags: ["food", "traditional", "tajine", "budget", "local", "family"],
    fairVisibilityScore: 92,
    localImpactScore: 93
  },
  {
    id: "artisan-merzouga-001",
    name: "Nomad Scarf Atelier",
    type: "artisan",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Merzouga Artisan Market",
    coordinates: [31.0802, -4.0144],
    shortDescription: "Handmade desert scarves and traditional Saharan accessories.",
    longDescription:
      "A small artisan shop offering traditional desert scarves, locally inspired accessories, and handmade travel items connected to Saharan culture.",
    priceFrom: 120,
    currency: "MAD",
    rating: 4.8,
    reviewCount: 96,
    images: [
      "/images/sahara/shop/fossil-stone.jpg"
    ],
    badges: ["Artisan Made", "Fair Trade", "Local Seller"],
    languages: ["Arabic", "French", "English", "Darija"],
    contact: {
      whatsapp: "+212600000011",
      phone: "+212600000011",
      email: "nomadscarf@demo.com"
    },
    availability: "available",
    aiMatchTags: ["souvenir", "scarf", "artisan", "desert", "local-product", "gift"],
    fairVisibilityScore: 94,
    localImpactScore: 97
  },
  {
    id: "artisan-merzouga-002",
    name: "Amazigh Silver & Stone",
    type: "artisan",
    region: "Drâa-Tafilalet",
    city: "Merzouga",
    address: "Merzouga Artisan Market",
    coordinates: [31.0796, -4.0151],
    shortDescription: "Amazigh-inspired jewelry and fossil stone decorations.",
    longDescription:
      "A local artisan seller offering handmade jewelry, desert-inspired accessories, fossil stone pieces, and decorative items.",
    priceFrom: 180,
    currency: "MAD",
    rating: 4.7,
    reviewCount: 72,
    images: [
      "/images/sahara/shop/fossil-stone.jpg"
    ],
    badges: ["Handmade", "Local Artisan", "Gift Friendly"],
    languages: ["Arabic", "French", "Darija"],
    contact: {
      whatsapp: "+212600000012",
      phone: "+212600000012",
      email: "amazighsilver@demo.com"
    },
    availability: "available",
    aiMatchTags: ["souvenir", "jewelry", "artisan", "gift", "fossil", "local"],
    fairVisibilityScore: 90,
    localImpactScore: 95
  }
];

export const souvenirProducts = [
  {
    id: "product-001",
    name: "Authentic Desert Cheche",
    category: "Textiles",
    region: "Merzouga",
    artisanName: "Nomad Scarf Atelier",
    price: 120,
    currency: "MAD",
    rating: 4.8,
    reviewCount: 96,
    image: "/images/sahara/shop/desert-cheche.jpg",
    badges: ["Artisan Made", "Fair Trade", "Local Seller"],
    description:
      "Traditional desert scarf inspired by Saharan travel culture. Lightweight, practical, and locally sourced.",
    stock: 24,
    canShip: true,
    aiMatchTags: ["desert", "souvenir", "gift", "textile", "merzouga"]
  },
  {
    id: "product-002",
    name: "Amazigh Silver Bracelet",
    category: "Jewelry",
    region: "Drâa-Tafilalet",
    artisanName: "Amazigh Silver & Stone",
    price: 220,
    currency: "MAD",
    rating: 4.7,
    reviewCount: 72,
    image: "/images/sahara/shop/amazigh-jewelry.png",
    badges: ["Handmade", "Local Artisan", "Gift Friendly"],
    description:
      "A handmade bracelet inspired by Amazigh patterns, created by a local artisan seller.",
    stock: 15,
    canShip: true,
    aiMatchTags: ["jewelry", "amazigh", "gift", "artisan", "local"]
  },
  {
    id: "product-003",
    name: "Fossil Stone Decoration",
    category: "Home Decor",
    region: "Erfoud",
    artisanName: "Amazigh Silver & Stone",
    price: 180,
    currency: "MAD",
    rating: 4.6,
    reviewCount: 48,
    image: "/images/sahara/shop/fossil-stone.jpg",
    badges: ["Local Craft", "Decor", "Unique Piece"],
    description:
      "A decorative fossil-inspired stone piece connected to the desert region’s natural heritage.",
    stock: 10,
    canShip: true,
    aiMatchTags: ["fossil", "decor", "desert", "gift", "home"]
  },
  {
    id: "product-004",
    name: "Handmade Leather Travel Pouch",
    category: "Leather Goods",
    region: "Rissani",
    artisanName: "Rissani Leather House",
    price: 160,
    currency: "MAD",
    rating: 4.5,
    reviewCount: 63,
    image: "/images/sahara/shop/leather-pouch.jpg",
    badges: ["Handmade", "Travel Friendly", "Local Product"],
    description:
      "A compact handmade leather pouch designed for travelers carrying small essentials.",
    stock: 18,
    canShip: true,
    aiMatchTags: ["leather", "travel", "souvenir", "gift", "rissani"]
  },
  {
    id: "product-005",
    name: "Moroccan Tea Set",
    category: "Kitchen & Tea",
    region: "Morocco",
    artisanName: "Atlas Tea Crafts",
    price: 320,
    currency: "MAD",
    rating: 4.9,
    reviewCount: 134,
    image: "/images/sahara/shop/moroccan-tea-set.jpg",
    badges: ["Traditional", "Gift Box", "Fair Trade"],
    description:
      "A traditional Moroccan tea set for travelers who want to bring the mint tea ritual home.",
    stock: 12,
    canShip: true,
    aiMatchTags: ["tea", "gift", "traditional", "moroccan", "home"]
  },
  {
    id: "product-006",
    name: "Premium Dates Gift Box",
    category: "Food Gifts",
    region: "Tafilalet",
    artisanName: "Tafilalet Dates Cooperative",
    price: 140,
    currency: "MAD",
    rating: 4.7,
    reviewCount: 89,
    image: "/images/sahara/shop/dates-gift-box.jpg",
    badges: ["Local Cooperative", "Gift Box", "Food Product"],
    description:
      "A curated box of Moroccan dates from the Tafilalet region, ideal as a local food gift.",
    stock: 30,
    canShip: true,
    aiMatchTags: ["dates", "food", "gift", "tafilalet", "local"]
  },
  {
    id: "product-007",
    name: "Moroccan Argan Oil",
    category: "Beauty & Wellness",
    region: "Souss-Massa",
    artisanName: "Argan Women's Cooperative",
    price: 250,
    currency: "MAD",
    rating: 4.9,
    reviewCount: 210,
    image: "/images/sahara/shop/moroccan-argan-oil.png",
    badges: ["Organic", "Women's Coop", "Fair Trade"],
    description:
      "Premium, cold-pressed 100% organic Argan oil. Perfect for skin and hair nourishment.",
    stock: 50,
    canShip: true,
    aiMatchTags: ["argan", "oil", "beauty", "gift", "organic"]
  },
  {
    id: "product-008",
    name: "Sahara Sand Bottle",
    category: "Decor & Memories",
    region: "Merzouga",
    artisanName: "Nomad Glassworks",
    price: 80,
    currency: "MAD",
    rating: 4.6,
    reviewCount: 115,
    image: "/images/sahara/shop/sahara-sand-bottle.png",
    badges: ["Authentic", "Travel Memory", "Handmade"],
    description:
      "A small decorative glass bottle filled with fine, vibrant orange sand from the Erg Chebbi dunes.",
    stock: 40,
    canShip: true,
    aiMatchTags: ["sand", "bottle", "decor", "memory", "merzouga"]
  },
  {
    id: "product-009",
    name: "Handwoven Amazigh Kilim Rug",
    category: "Home & Decor",
    region: "Atlas Mountains",
    artisanName: "Atlas Weavers Guild",
    price: 1500,
    currency: "MAD",
    rating: 5.0,
    reviewCount: 42,
    image: "/images/sahara/shop/amazigh-kilim-rug.png",
    badges: ["Handwoven", "Authentic", "Premium"],
    description:
      "A stunning, handwoven Kilim rug featuring traditional geometric Amazigh patterns in vibrant red.",
    stock: 5,
    canShip: true,
    aiMatchTags: ["rug", "kilim", "amazigh", "decor", "premium", "home"]
  }
];

export const saharanRegions = [
  {
    id: "region-merzouga",
    name: "Merzouga",
    region: "Drâa-Tafilalet",
    coordinates: [31.0802, -4.0133],
    image: "/images/sahara/activities/desert-4x4-transfer.png",
    shortDescription: "Best for iconic Sahara dunes, camel rides, and desert camps.",
    bestFor: ["Desert camps", "Camel trekking", "Sunset dunes", "Adventure"],
    averageBudget: "Medium",
    travelStyle: ["romantic", "adventure", "photography", "local culture"],
    matchScore: 96
  },
  {
    id: "region-zagora",
    name: "Zagora",
    region: "Drâa-Tafilalet",
    coordinates: [30.3324, -5.8384],
    image: "/images/sahara/stays/nomad-sky-luxury.png",
    shortDescription: "Best for calm desert gateways, kasbahs, and road-trip routes.",
    bestFor: ["Road trips", "Kasbahs", "Palm groves", "Quiet desert"],
    averageBudget: "Affordable",
    travelStyle: ["slow travel", "culture", "budget", "road trip"],
    matchScore: 88
  },
  {
    id: "region-agafay",
    name: "Agafay",
    region: "Marrakech-Safi",
    coordinates: [31.4569, -8.2267],
    image: "/images/sahara/activities/desert-4x4-transfer.png",
    shortDescription: "Best for a quick desert-like escape close to Marrakech.",
    bestFor: ["Short trips", "Luxury camps", "Dinner shows", "Marrakech escape"],
    averageBudget: "Medium to Premium",
    travelStyle: ["short stay", "couple", "luxury", "easy access"],
    matchScore: 82
  }
];

export const merzougaFinalItinerary = {
  id: "itinerary-merzouga-3days",
  title: "3-Day Saharan Escape in Merzouga",
  destination: "Merzouga",
  duration: "3 days / 2 nights",
  selectedStay: "Sahara Pearl Desert Camp",
  selectedActivities: ["Sunset Camel Trekking", "ATV Dunes Adventure", "Sandboarding Experience"],
  selectedProducts: ["Authentic Desert Cheche", "Premium Dates Gift Box"],
  transport: {
    title: "Errachidia Airport Desert Transfer",
    price: 700,
    currency: "MAD"
  },
  days: [
    {
      day: 1,
      title: "Arrival & Desert Sunset",
      plan: [
        "Private transfer from Errachidia Airport to Merzouga",
        "Check-in at Sahara Pearl Desert Camp",
        "Mint tea welcome experience",
        "Sunset camel trekking across Erg Chebbi dunes",
        "Traditional dinner and music around the campfire"
      ]
    },
    {
      day: 2,
      title: "Adventure & Local Culture",
      plan: [
        "Breakfast at the desert camp",
        "ATV dunes adventure",
        "Lunch in Merzouga village",
        "Visit local artisan market",
        "Optional purchase of desert cheche and dates gift box",
        "Stargazing at the camp"
      ]
    },
    {
      day: 3,
      title: "Sunrise & Departure",
      plan: [
        "Early sunrise walk in the dunes",
        "Traditional breakfast",
        "Sandboarding session",
        "4x4 pickup from camp",
        "Return transfer"
      ]
    }
  ],
  budget: {
    stay: 900,
    activities: 650,
    transport: 700,
    souvenirs: 260,
    food: 300,
    total: 2810,
    currency: "MAD"
  },
  localImpact: {
    supportedProviders: 5,
    providerTypes: ["desert camp", "local guide", "activity provider", "driver", "artisan seller"],
    estimatedLocalImpact: 2400,
    currency: "MAD"
  }
};

// Extended booking listings for the /book marketplace (Airbnb + Booking.com style)
export const bookingListings = [
  {
    id: "stay-merzouga-004",
    name: "Erg Chebbi Golden Camp",
    type: "Desert Camp",
    destination: "Merzouga",
    region: "Drâa-Tafilalet",
    coordinates: [31.1032, -4.0214] as [number, number],
    pricePerNight: 520,
    totalPrice: 1040,
    currency: "MAD",
    rating: 4.8,
    reviews: 142,
    image: "/images/sahara/activities/desert-4x4-transfer.png",
    badges: ["Local Provider", "Dinner Included", "Camel Ride Available", "Desert View"],
    amenities: ["Private Tent", "Breakfast", "Dinner", "Wi-Fi", "Campfire", "Parking"],
    cancellation: "Free cancellation before 48h",
    availability: "available" as const,
    host: "Mohamed & Family",
    shortDescription: "Traditional desert camp with sunset views over Erg Chebbi dunes.",
    aiMatchTags: ["desert", "camp", "sunset", "local", "medium-budget"]
  },
  {
    id: "stay-merzouga-005",
    name: "Nomad Sky Luxury Tents",
    type: "Luxury Camp",
    destination: "Merzouga",
    region: "Drâa-Tafilalet",
    coordinates: [31.1168, -4.0069] as [number, number],
    pricePerNight: 980,
    totalPrice: 1960,
    currency: "MAD",
    rating: 4.9,
    reviews: 96,
    image: "/images/sahara/stays/nomad-sky-luxury.png",
    badges: ["Luxury", "Private Bathroom", "Romantic", "Dinner Included"],
    amenities: ["Private Bathroom", "King Bed", "Dinner", "Breakfast", "4x4 Transfer", "Stargazing"],
    cancellation: "Partial refund before 72h",
    availability: "limited" as const,
    host: "Amazigh Hospitality Group",
    shortDescription: "Premium desert tents for couples and travelers looking for comfort.",
    aiMatchTags: ["luxury", "couple", "premium", "desert", "photogenic"]
  },
  {
    id: "stay-merzouga-006",
    name: "Riad Tafilalet Dunes",
    type: "Riad",
    destination: "Merzouga",
    region: "Drâa-Tafilalet",
    coordinates: [31.0837, -4.0128] as [number, number],
    pricePerNight: 320,
    totalPrice: 640,
    currency: "MAD",
    rating: 4.6,
    reviews: 218,
    image: "/images/sahara/stays/riad-tafilalet.png",
    badges: ["Budget Friendly", "Village Center", "Traditional Breakfast", "Family-Owned"],
    amenities: ["Breakfast", "Air Conditioning", "Wi-Fi", "Restaurant", "Terrace"],
    cancellation: "Free cancellation before 24h",
    availability: "available" as const,
    host: "Tafilalet Family Stay",
    shortDescription: "Affordable riad close to Merzouga village and desert activity points.",
    aiMatchTags: ["budget", "riad", "family", "traditional", "local"]
  },
  {
    id: "stay-merzouga-007",
    name: "Sahara Oasis Guesthouse",
    type: "Guesthouse",
    destination: "Merzouga",
    region: "Drâa-Tafilalet",
    coordinates: [31.0754, -4.0182] as [number, number],
    pricePerNight: 260,
    totalPrice: 520,
    currency: "MAD",
    rating: 4.5,
    reviews: 131,
    image: "/images/sahara/stays/sahara-oasis-guesthouse.png",
    badges: ["Affordable", "Local Provider", "Breakfast Included", "WhatsApp Booking"],
    amenities: ["Breakfast", "Shared Lounge", "Parking", "Wi-Fi", "Local Dinner"],
    cancellation: "Free cancellation before 24h",
    availability: "available" as const,
    host: "Youssef Local Host",
    shortDescription: "Simple and warm guesthouse for budget travelers near the dunes.",
    aiMatchTags: ["budget", "solo", "backpacker", "local", "guesthouse"]
  },
  {
    id: "stay-merzouga-008",
    name: "Desert Rose Eco Lodge",
    type: "Eco-Lodge",
    destination: "Merzouga",
    region: "Drâa-Tafilalet",
    coordinates: [31.0894, -4.0317] as [number, number],
    pricePerNight: 610,
    totalPrice: 1220,
    currency: "MAD",
    rating: 4.7,
    reviews: 104,
    image: "/images/sahara/stays/desert-rose-eco-lodge.png",
    badges: ["Eco-Friendly", "Local Food", "Quiet Area", "Family-Owned"],
    amenities: ["Breakfast", "Solar Energy", "Garden", "Restaurant", "Terrace", "Parking"],
    cancellation: "Free cancellation before 48h",
    availability: "available" as const,
    host: "Desert Rose Cooperative",
    shortDescription: "Eco-lodge focused on quiet stays, local meals, and sustainable tourism.",
    aiMatchTags: ["eco", "quiet", "family", "nature", "local-food"]
  },
  {
    id: "stay-merzouga-009",
    name: "Kasbah Erg Chebbi View",
    type: "Kasbah Hotel",
    destination: "Merzouga",
    region: "Drâa-Tafilalet",
    coordinates: [31.0921, -4.0066] as [number, number],
    pricePerNight: 430,
    totalPrice: 860,
    currency: "MAD",
    rating: 4.6,
    reviews: 176,
    image: "/images/sahara/stays/kasbah-erg-chebbi.png",
    badges: ["Dune View", "Restaurant", "Pool", "Local Provider"],
    amenities: ["Pool", "Breakfast", "Restaurant", "Air Conditioning", "Parking", "Wi-Fi"],
    cancellation: "Free cancellation before 48h",
    availability: "limited" as const,
    host: "Kasbah Erg Chebbi Team",
    shortDescription: "Kasbah-style hotel with views of the dunes and easy activity access.",
    aiMatchTags: ["kasbah", "pool", "family", "dune-view", "medium-budget"]
  },
  {
    id: "stay-zagora-001",
    name: "Zagora Palm Grove Lodge",
    type: "Eco-Lodge",
    destination: "Zagora",
    region: "Drâa-Tafilalet",
    coordinates: [30.3351, -5.8392] as [number, number],
    pricePerNight: 390,
    totalPrice: 780,
    currency: "MAD",
    rating: 4.6,
    reviews: 119,
    image: "/images/sahara/stays/desert-rose-eco-lodge.png",
    badges: ["Palm Grove", "Eco-Friendly", "Local Provider", "Quiet Stay"],
    amenities: ["Breakfast", "Garden", "Restaurant", "Parking", "Terrace"],
    cancellation: "Free cancellation before 48h",
    availability: "available" as const,
    host: "Zagora Local Lodge",
    shortDescription: "Peaceful lodge near palm groves for calm desert road trips.",
    aiMatchTags: ["zagora", "quiet", "eco", "palm-grove", "road-trip"]
  },
  {
    id: "stay-agafay-001",
    name: "Agafay Stone Desert Camp",
    type: "Luxury Camp",
    destination: "Agafay",
    region: "Marrakech-Safi",
    coordinates: [31.4584, -8.2302] as [number, number],
    pricePerNight: 890,
    totalPrice: 1780,
    currency: "MAD",
    rating: 4.8,
    reviews: 203,
    image: "/images/sahara/stays/erg-chebbi-golden-camp.png",
    badges: ["Near Marrakech", "Luxury", "Dinner Show", "Pool"],
    amenities: ["Pool", "Dinner", "Breakfast", "Private Tent", "Transfer Available"],
    cancellation: "Partial refund before 72h",
    availability: "available" as const,
    host: "Agafay Desert Hosts",
    shortDescription: "Luxury desert-style camp close to Marrakech for short escapes.",
    aiMatchTags: ["agafay", "luxury", "short-trip", "couple", "marrakech"]
  }
];

// Booking packages for Booking.com-style room/package selection
export const bookingPackages = [
  {
    id: "package-merzouga-basic",
    stayId: "stay-merzouga-004",
    title: "Standard Desert Tent",
    price: 520,
    currency: "MAD",
    capacity: 2,
    includes: ["Breakfast", "Dinner", "Campfire", "Shared Bathroom"],
    availableRooms: 6
  },
  {
    id: "package-merzouga-private",
    stayId: "stay-merzouga-004",
    title: "Private Tent + Camel Ride",
    price: 740,
    currency: "MAD",
    capacity: 2,
    includes: ["Breakfast", "Dinner", "Sunset Camel Ride", "Private Tent"],
    availableRooms: 3
  },
  {
    id: "package-merzouga-luxury",
    stayId: "stay-merzouga-005",
    title: "Luxury Tent with Private Bathroom",
    price: 980,
    currency: "MAD",
    capacity: 2,
    includes: ["Private Bathroom", "Dinner", "Breakfast", "4x4 Pickup"],
    availableRooms: 2
  },
  {
    id: "package-family",
    stayId: "stay-merzouga-009",
    title: "Family Room",
    price: 680,
    currency: "MAD",
    capacity: 4,
    includes: ["Breakfast", "Pool Access", "Free Parking"],
    availableRooms: 4
  }
];

// Legacy MOCK_DATA mapping to ensure backward compatibility across the app
// Combines tourism providers (3 stays) + booking listings (8 stays) = 11 total
const allStayListings = [
  ...tourismProviders.filter(p => p.type === 'stay').map(p => ({
    id: p.id,
    title: p.name,
    desc: p.shortDescription,
    price: `${p.priceFrom} ${p.currency}/night`,
    pricePerNight: p.priceFrom,
    rating: p.rating,
    reviews: p.reviewCount,
    coordinates: p.coordinates,
    image: p.images[0],
    fairScore: p.fairVisibilityScore,
    badges: p.badges,
    type: "Desert Camp",
    amenities: [] as string[],
    cancellation: "Free cancellation before 48h",
    availability: p.availability,
    host: "Local Family"
  })),
  ...bookingListings.map(l => ({
    id: l.id,
    title: l.name,
    desc: l.shortDescription,
    price: `${l.pricePerNight} ${l.currency}/night`,
    pricePerNight: l.pricePerNight,
    rating: l.rating,
    reviews: l.reviews,
    coordinates: l.coordinates,
    image: l.image,
    fairScore: 80 + (l.reviews % 15),
    badges: l.badges,
    type: l.type,
    amenities: l.amenities,
    cancellation: l.cancellation,
    availability: l.availability,
    host: l.host
  }))
];

export const MOCK_DATA = {
  destinations: saharanRegions.map(r => ({
    id: r.id,
    title: r.name,
    desc: r.shortDescription,
    price: r.averageBudget,
    rating: 4.8,
    coordinates: r.coordinates,
    image: r.image,
    reason: `Recommended because you asked for: ${r.bestFor.join(", ")}.`
  })),
  hotels: allStayListings,
  activities: tourismProviders.filter(p => p.type === 'activity').map(p => ({
    id: p.id,
    title: p.name,
    desc: p.shortDescription,
    price: `${p.priceFrom} ${p.currency}`,
    rating: p.rating,
    coordinates: p.coordinates,
    image: p.images[0],
    fairScore: p.fairVisibilityScore,
    badges: p.badges
  })),
  souvenirs: souvenirProducts.map((p, idx) => {
    // Generate a slight jitter so markers don't overlap perfectly
    // We use a predefined pattern to make it look like a marketplace
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const latOffset = (row * 0.004) - 0.006;
    const lngOffset = (col * 0.005) - 0.005;

    return {
      id: p.id,
      title: p.name,
      desc: p.description,
      price: `${p.price} ${p.currency}`,
      rating: p.rating,
      coordinates: [31.0802 + latOffset, -4.0144 + lngOffset], 
      image: p.image,
      fairScore: 98,
      badges: p.badges
    };
  }),
  itinerary: {
    title: merzougaFinalItinerary.title,
    budget: {
      stay: `${merzougaFinalItinerary.budget.stay} ${merzougaFinalItinerary.budget.currency}`,
      food: `${merzougaFinalItinerary.budget.food} ${merzougaFinalItinerary.budget.currency}`,
      activities: `${merzougaFinalItinerary.budget.activities} ${merzougaFinalItinerary.budget.currency}`,
      transport: `${merzougaFinalItinerary.budget.transport} ${merzougaFinalItinerary.budget.currency}`,
      souvenirs: `${merzougaFinalItinerary.budget.souvenirs} ${merzougaFinalItinerary.budget.currency}`,
      total: `${merzougaFinalItinerary.budget.total} ${merzougaFinalItinerary.budget.currency}`,
      match: "96%"
    },
    impact: {
      businesses: merzougaFinalItinerary.localImpact.supportedProviders,
      guides: 1,
      auberges: 1,
      artisans: 1,
      totalImpact: `${merzougaFinalItinerary.localImpact.estimatedLocalImpact} ${merzougaFinalItinerary.localImpact.currency}`
    },
    days: merzougaFinalItinerary.days.map(d => ({
      day: d.day,
      title: d.title,
      transport: d.day === 1 ? merzougaFinalItinerary.transport.title : (d.day === 3 ? "Return Transfer" : undefined),
      accommodation: d.day !== 3 ? merzougaFinalItinerary.selectedStay : null
    }))
  }
};
