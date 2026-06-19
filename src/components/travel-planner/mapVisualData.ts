import { tourismProviders } from "./mockData";

export type MapMarkerType = "stay" | "activity" | "shop" | "transport" | "restaurant" | "guide";

export interface MapVisualMarker {
  id: string;
  type: MapMarkerType;
  label: string;
  coordinates: [number, number];
  price: string;
  icon: string;
  image: string;
}

const typeIconMap: Record<string, string> = {
  stay: "🏕️",
  activity: "🐪",
  artisan: "🧣",
  transport: "🚐",
  restaurant: "🍽️",
  guide: "🧭",
};

// Auto-generate visual markers from the provider dataset
export const mapVisualMarkers: MapVisualMarker[] = tourismProviders.map((p) => ({
  id: `map-${p.id}`,
  type: (p.type === "artisan" ? "shop" : p.type) as MapMarkerType,
  label: p.name,
  coordinates: p.coordinates,
  price: p.type === "artisan" || p.type === "restaurant" ? `From ${p.priceFrom} MAD` : `${p.priceFrom} MAD`,
  icon: typeIconMap[p.type] || "📍",
  image: p.images[0],
}));

// Route polyline: Airport → Merzouga village → Desert camp → Camel trekking → Sandboarding
export const merzougaRoute: [number, number][] = [
  [31.9314, -4.4244], // Errachidia Airport
  [31.0802, -4.0133], // Merzouga village
  [31.0964, -4.0103], // Desert camp
  [31.1045, -4.0181], // Camel trekking
  [31.0998, -4.0264], // Sandboarding
];

// Highlight zones rendered as circles on the map
export const mapZones = [
  {
    id: "zone-erg-chebbi",
    name: "Erg Chebbi Dunes Zone",
    center: [31.105, -4.018] as [number, number],
    radius: 2500,
    label: "Main Sahara Experience Zone",
  },
  {
    id: "zone-merzouga-village",
    name: "Merzouga Village",
    center: [31.0802, -4.0133] as [number, number],
    radius: 900,
    label: "Stays, restaurants, shops",
  },
];

// Map filter categories
export const mapFilters = [
  { id: "all", label: "All", icon: "🗺️" },
  { id: "stay", label: "Stays", icon: "🏕️" },
  { id: "activity", label: "Activities", icon: "🐪" },
  { id: "shop", label: "Souvenirs", icon: "🧣" },
  { id: "transport", label: "Transport", icon: "🚐" },
  { id: "restaurant", label: "Food", icon: "🍽️" },
  { id: "guide", label: "Guides", icon: "🧭" },
];
