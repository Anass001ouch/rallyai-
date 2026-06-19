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

    return (
      <div className="relative w-full h-full">
        {/* Map Filter Chips */}
        <div className="absolute top-4 left-4 right-4 z-[1000] flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {mapFilters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-md transition-all ${
                activeFilter === f.id
                  ? "bg-navy-900 text-white scale-105"
                  : "bg-white text-navy-700 hover:bg-sand-50 border border-sand-200"
              }`}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        <MapContainer
          center={[31.0900, -4.0150]}
          zoom={13}
          className="w-full h-full z-0"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Highlight zones (dunes zone + village zone) */}
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
                <div style={{ width: 220 }}>
                  <img
                    src={marker.image}
                    alt={marker.label}
                    style={{ height: 96, width: '100%', borderRadius: 12, objectFit: 'cover', marginBottom: 8 }}
                  />
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 2 }}>{marker.label}</div>
                  <div style={{ fontSize: 13, color: '#d84f2a', fontWeight: 600, marginBottom: 8 }}>{marker.price}</div>
                  <div style={{
                    display: 'inline-block',
                    background: '#0f172a',
                    color: 'white',
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'center',
                  }}>
                    View details
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
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
    <MapContainer center={center} zoom={zoom} className="w-full h-full rounded-xl shadow-lg border border-border z-0 relative">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
        else if (marker.type === "activity") emoji = "🐪";
        else if (marker.type === "shop") emoji = "🧣";
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
