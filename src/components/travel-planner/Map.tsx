"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTravelPlannerStore } from "@/store/useTravelPlannerStore";
import { mapVisualMarkers, merzougaRoute, mapZones, mapFilters, type MapMarkerType } from "./mapVisualData";

// Fix Leaflet marker icons issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom emoji marker icon factory
function createMapIcon(type: string, emoji: string, isHovered: boolean = false) {
  const colorMap: Record<string, string> = {
    stay: "#d84f2a",
    activity: "#e0a84f",
    shop: "#8a5cf6",
    transport: "#2563eb",
    restaurant: "#16a34a",
    guide: "#0f172a",
  };
  const borderColor = colorMap[type] || "#0f172a";

  return L.divIcon({
    className: `custom-map-marker ${isHovered ? 'hovered-marker' : ''}`,
    html: `<div class="marker-bubble" style="border-color: ${borderColor}; transform: ${isHovered ? 'scale(1.25)' : 'scale(1)'}; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: ${isHovered ? '0 10px 25px -5px rgba(0,0,0,0.3)' : '0 4px 6px -1px rgba(0,0,0,0.1)'}"><span>${emoji}</span></div>`,
    iconSize: isHovered ? [52, 52] : [42, 42],
    iconAnchor: isHovered ? [26, 52] : [21, 42],
    popupAnchor: isHovered ? [0, -52] : [0, -42],
  });
}

// Price tag marker for booking page
function createPriceIcon(price: string, isActive: boolean = false) {
  return L.divIcon({
    className: "custom-price-marker",
    html: `<div class="price-bubble ${isActive ? 'active' : ''}">${price}</div>`,
    iconSize: [80, 32],
    iconAnchor: [40, 32],
    popupAnchor: [0, -32],
  });
}

const LocationUpdater = ({ 
  center, 
  zoom, 
  hoveredItemId, 
  markers 
}: { 
  center: [number, number], 
  zoom: number, 
  hoveredItemId?: string | null,
  markers?: any[]
}) => {
  const map = useMap();
  useEffect(() => {
    if (hoveredItemId && markers) {
      const hoveredMarker = markers.find(m => m.id === hoveredItemId);
      if (hoveredMarker && (hoveredMarker.coordinates || hoveredMarker.pos)) {
        const pos = hoveredMarker.coordinates ?? hoveredMarker.pos;
        // Fly slightly closer when hovered
        map.flyTo(pos, 14, { duration: 1.2 });
        return;
      }
    }
    // Default center behavior if nothing is hovered
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map, hoveredItemId, markers]);
  return null;
};

interface MapProps {
  markers?: any[];
  mode?: "planner" | "booking"; // planner = AI planner, booking = /book page
}

export default function Map({ markers, mode = "planner" }: MapProps) {
  const { mapMarkers } = useTravelPlannerStore();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // === BOOKING MODE: Rich visual map with zones, routes, custom icons ===
  if (mode === "booking") {
    const filteredMarkers = activeFilter === "all"
      ? mapVisualMarkers
      : mapVisualMarkers.filter(m => m.type === activeFilter);

    const activeFilterMeta = mapFilters.find(f => f.id === activeFilter);
    const totalCount = mapVisualMarkers.length;
    const filteredCount = filteredMarkers.length;

    return (
      <div className="relative w-full h-full">
        {/* Bottom floating dock for filters (macOS style) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] max-w-[90vw] transition-all duration-500 hover:-translate-y-1">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-3 py-2.5 rounded-[24px] bg-white/80 backdrop-blur-xl border border-white/60 shadow-card-elevated">
            {mapFilters.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[16px] text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeFilter === f.id
                    ? "bg-gradient-to-b from-navy-800 to-navy-900 text-white shadow-md transform scale-105 ring-1 ring-white/20"
                    : "bg-transparent text-navy-700 hover:bg-white/60"
                }`}
              >
                <span className={activeFilter === f.id ? "scale-110 transition-transform" : ""}>{f.icon}</span>
                <span>{f.label}</span>
                <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-black tracking-wider ${
                  activeFilter === f.id
                    ? "bg-white/20 text-white"
                    : "bg-black/5 text-navy-500"
                }`}>
                  {f.id === "all" ? totalCount : (mapVisualMarkers.filter(m => m.type === f.id).length)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Top-left legend */}
        <div className="absolute top-6 left-6 z-[1000] pointer-events-none max-w-[200px]">
          <div className="pointer-events-auto rounded-[20px] border border-white/50 bg-white/70 backdrop-blur-xl shadow-card-soft px-4 py-3.5 text-[10px] font-semibold text-navy-800">
            <p className="text-terracotta-500 font-bold uppercase tracking-[0.2em] text-[8px] mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-pulse" /> Live Feed
            </p>
            <div className="flex items-center gap-1.5 mb-2">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: activeFilterMeta?.color ?? "#0f172a" }}
              />
              <span className="font-bold">{activeFilterMeta?.label ?? "All"}</span>
              <span className="text-navy-500 font-normal">· {filteredCount}</span>
            </div>
            <div className="h-px bg-sand-200 my-1.5" />
            <p className="text-navy-500 uppercase tracking-wider text-[8px] mb-1">Legend</p>
            <ul className="space-y-0.5">
              {mapFilters.filter(f => f.id !== "all").slice(0, 6).map(f => (
                <li key={f.id} className="flex items-center gap-1.5 text-[10px]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: f.color }} />
                  <span className="text-navy-700">{f.icon} {f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Artouris watermark - top right */}
        <div className="absolute top-6 right-6 z-[500] pointer-events-none select-none">
          <div className="px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm text-[10px] font-bold text-navy-800 uppercase tracking-[0.2em] flex items-center gap-1.5">
            Artouris <span className="text-terracotta-500 font-black">Atlas</span>
          </div>
        </div>

        <MapContainer
          center={[31.0900, -4.0150]}
          zoom={13}
          className="w-full h-full z-0 brand-zoom"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Highlight zones (animated pulse) */}
          {mapZones.map(zone => (
            <Circle
              key={zone.id}
              center={zone.center}
              radius={zone.radius}
              pathOptions={{
                color: "#d84f2a",
                fillColor: "#d84f2a",
                fillOpacity: 0.08,
                weight: 2,
                dashArray: "6 4",
                className: "leaflet-pulse-zone",
              }}
            />
          ))}

          {/* Route polyline: Airport → Village → Camp → Activities */}
          <Polyline
            positions={merzougaRoute}
            pathOptions={{
              color: "#d84f2a",
              weight: 3,
              opacity: 0.7,
              dashArray: "8 10",
              className: "animate-route-dash",
            }}
          />

          {/* Visual markers with custom emoji icons + rich popups */}
          {filteredMarkers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.coordinates as [number, number]}
              icon={createMapIcon(marker.type, marker.icon)}
            >
              <Popup maxWidth={240} className="custom-popup">
                <div style={{ width: 220, fontFamily: 'inherit' }}>
                  <img
                    src={marker.image}
                    alt={marker.label}
                    style={{ height: 110, width: '100%', borderRadius: 12, objectFit: 'cover', marginBottom: 8 }}
                  />
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#0f172a', marginBottom: 2, lineHeight: 1.2 }}>
                    {marker.label}
                  </div>
                  <div style={{ fontSize: 11, color: '#6E4D29', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {marker.type} · Merzouga
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: '#d84f2a', fontWeight: 800 }}>{marker.price}</span>
                    <span style={{ fontSize: 10, color: '#16a34a', fontWeight: 700 }}>★ 4.8</span>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    color: 'white',
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'center',
                  }}>
                    View details →
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Subtle Moroccan overlay for visual depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[400] mix-blend-multiply opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(210, 84, 42, 0.6) 0%, transparent 35%), radial-gradient(circle at 70% 70%, rgba(47, 93, 84, 0.4) 0%, transparent 35%)",
          }}
        />
      </div>
    );
  }

  // === PLANNER MODE: Simple markers from the AI planner store ===
  const markersToUse = markers || (mapMarkers as any[] | undefined);

  let center: [number, number] = [31.7917, -7.0926];
  let zoom = 5;

  if (markersToUse && markersToUse.length > 0) {
    const first = markersToUse[0] as { pos?: [number, number]; coordinates?: [number, number] };
    center = (first.coordinates ?? first.pos ?? center) as [number, number];
    zoom = markersToUse.length === 1 ? 13 : 6;

    const title = (markersToUse[0] as { title?: string }).title ?? '';
    if (title.includes('Camp') || title.includes('Auberge') || title.includes('Riad')) {
      zoom = 12;
    }
  }

  const { handleSelection, hoveredItemId } = useTravelPlannerStore();

  return (
    <MapContainer center={center} zoom={zoom} className="w-full h-full rounded-xl shadow-lg border border-border z-0 relative brand-zoom">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <LocationUpdater center={center} zoom={zoom} hoveredItemId={hoveredItemId} markers={markersToUse} />
      {markersToUse.map((m, idx) => {
        const marker = m as { 
          id?: string; pos?: [number, number]; coordinates?: [number, number]; 
          title?: string; price?: string | number; desc?: string; type?: string;
          item?: any; image?: string; rating?: number; badges?: string[];
        };
        const position = (marker.coordinates ?? marker.pos) as [number, number];
        
        let emoji = "📍";
        if (marker.type === "stay" || marker.type === "hotel") emoji = "🏕️";
        else if (marker.type === "activity") {
          const title = marker.title?.toLowerCase() || "";
          if (title.includes("atv") || title.includes("buggy") || title.includes("4x4") || title.includes("quad")) emoji = "🏍️";
          else if (title.includes("sandboard") || title.includes("board")) emoji = "🏂";
          else if (title.includes("stargaz") || title.includes("star")) emoji = "🌌";
          else if (title.includes("dinner") || title.includes("food") || title.includes("tea") || title.includes("breakfast")) emoji = "🍽️";
          else if (title.includes("music") || title.includes("nomad") || title.includes("culture")) emoji = "🪘";
          else emoji = "🐪";
        }
        else if (marker.type === "shop") emoji = "🛍️";
        else if (marker.type === "transport") emoji = "🚐";
        else if (marker.title?.includes("Merzouga") || marker.title?.includes("Zagora") || marker.title?.includes("Agafay")) emoji = "🏜️";

        const isHovered = marker.id === hoveredItemId;

        return (
          <Marker 
            key={marker.id || idx} 
            position={position}
            icon={createMapIcon(marker.type || "destination", emoji, isHovered)}
            eventHandlers={{
              click: (e) => {
                e.target._map.flyTo(position, 12, { duration: 1.5 });
              }
            }}
          >
            <Popup maxWidth={260} className="custom-popup">
              <div style={{ width: 240 }} className="flex flex-col">
                {marker.image && (
                  <img
                    src={marker.image}
                    alt={marker.title}
                    style={{ height: 120, width: '100%', borderRadius: 8, objectFit: 'cover', marginBottom: 12 }}
                  />
                )}
                
                {marker.type === 'destination' && marker.item?.matchScore && (
                  <div style={{ fontSize: 12, color: '#d84f2a', fontWeight: 700, marginBottom: 4 }}>
                    {marker.item.matchScore}% Match
                  </div>
                )}
                
                <div style={{ fontWeight: 800, fontSize: 15, color: '#0f172a', marginBottom: 4, lineHeight: 1.2 }}>
                  {marker.title}
                </div>
                
                {marker.rating && (
                  <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>
                    ★ {marker.rating}
                  </div>
                )}
                
                {marker.price && (
                  <div style={{ fontSize: 14, color: '#d84f2a', fontWeight: 700, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{marker.price}</span>
                    {marker.type === 'activity' && <span style={{ color: '#64748b', fontSize: 12 }}>{marker.item?.duration || '2 hours'}</span>}
                  </div>
                )}
                
                {marker.desc && (
                  <div style={{ fontSize: 13, color: '#475569', marginBottom: 12, lineHeight: 1.4 }}>
                    {marker.desc}
                  </div>
                )}
                
                {marker.item && marker.type && (
                  <button 
                    onClick={() => handleSelection(marker.type as any, marker.item)}
                    style={{
                      background: '#0f172a',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: 9999,
                      fontWeight: 700,
                      fontSize: 13,
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      marginTop: 'auto'
                    }}
                  >
                    {marker.type === 'destination' ? 'Choose Destination' :
                     marker.type === 'stay' ? 'Select Stay' :
                     marker.type === 'activity' ? 'Add Activity' :
                     'Add to Trip'}
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
