"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/artouris/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Filter, Star, ShieldCheck, Heart, Calendar, Users, Building2, Map as MapIcon, CheckCircle2, MessageCircle, Tent, Home, Trees, Waves, Mountain, Sparkles, X, Castle } from "lucide-react";
import { MOCK_DATA, bookingPackages } from "@/components/travel-planner/mockData";
import { MiniMap } from "@/components/travel-planner/MiniMap";

// Category-to-type mapping for filtering
const categoryTypeMap: Record<string, string[]> = {
  "All": [],
  "Hotels": ["Kasbah Hotel"],
  "Riads": ["Riad"],
  "Auberges": ["Guesthouse"],
  "Desert Camps": ["Desert Camp"],
  "Luxury Camps": ["Luxury Camp"],
  "Eco-Lodges": ["Eco-Lodge"],
  "Guesthouses": ["Guesthouse"],
};

export default function BookPageContent() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "merzouga";
  
  const allHotels = MOCK_DATA.hotels;
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { name: "All", icon: <MapIcon className="w-5 h-5" /> },
    { name: "Desert Camps", icon: <Tent className="w-5 h-5" /> },
    { name: "Luxury Camps", icon: <Sparkles className="w-5 h-5" /> },
    { name: "Hotels", icon: <Building2 className="w-5 h-5" /> },
    { name: "Riads", icon: <Home className="w-5 h-5" /> },
    { name: "Eco-Lodges", icon: <Trees className="w-5 h-5" /> },
    { name: "Auberges", icon: <Castle className="w-5 h-5" /> },
  ];

  // Filter hotels by category
  const filteredHotels = useMemo(() => {
    if (activeCategory === "All") return allHotels;
    const allowedTypes = categoryTypeMap[activeCategory] || [];
    return allHotels.filter((h: any) => allowedTypes.includes(h.type));
  }, [activeCategory, allHotels]);

  // Get packages for selected hotel
  const hotelPackages = useMemo(() => {
    if (!selectedHotel) return [];
    return bookingPackages.filter(p => p.stayId === selectedHotel.id);
  }, [selectedHotel]);

  const destDisplay = destination.charAt(0).toUpperCase() + destination.slice(1);

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col">
      <Navbar />
      
      {/* 1. HERO SEARCH SECTION (Booking.com style) */}
      <div className="relative pt-24 pb-12 px-6 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-navy-900/40" />
        <div className="absolute inset-0 bg-zellige opacity-20 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <h1 className="text-4xl lg:text-5xl font-display font-black text-white mb-3 text-center">
            Book authentic stays across Morocco.
          </h1>
          <p className="text-sand-100 font-medium text-center mb-8 max-w-2xl">
            Find riads, desert camps, auberges, eco-lodges, and boutique stays from trusted local providers.
          </p>
          
          {/* Booking.com Style Search Bar */}
          <div className="w-full max-w-5xl bg-white p-2 rounded-[20px] shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center bg-sand-50 rounded-[12px] px-4 py-3 border border-sand-200">
              <MapPin className="text-navy-400 w-5 h-5 mr-3" />
              <Input 
                defaultValue={destDisplay}
                placeholder="Where do you want to go?" 
                className="border-0 bg-transparent focus-visible:ring-0 px-0 text-navy-900 font-bold text-base placeholder:text-navy-300 placeholder:font-medium" 
              />
            </div>
            <div className="flex-1 flex items-center bg-sand-50 rounded-[12px] px-4 py-3 border border-sand-200">
              <Calendar className="text-navy-400 w-5 h-5 mr-3" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-navy-400 uppercase tracking-wider">Check-in - Check-out</span>
                <span className="text-sm font-bold text-navy-900">Jun 22 — Jun 24</span>
              </div>
            </div>
            <div className="flex-1 flex items-center bg-sand-50 rounded-[12px] px-4 py-3 border border-sand-200">
              <Users className="text-navy-400 w-5 h-5 mr-3" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-navy-400 uppercase tracking-wider">Guests</span>
                <span className="text-sm font-bold text-navy-900">2 adults · 1 room</span>
              </div>
            </div>
            <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-[12px] h-auto py-4 px-8 font-bold text-lg shadow-md transition-transform shrink-0 md:w-auto w-full">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS (Airbnb style) */}
      <div className="bg-white border-b border-sand-200 sticky top-[72px] z-40 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-8 py-4">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex flex-col items-center gap-2 min-w-max pb-3 border-b-2 transition-all ${
                  activeCategory === cat.name 
                    ? "border-navy-900 text-navy-900" 
                    : "border-transparent text-navy-400 hover:text-navy-900 hover:border-navy-300"
                }`}
              >
                {cat.icon}
                <span className="text-[13px] font-bold">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SPLIT LAYOUT: LISTINGS + MAP */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Side: Listings & Filters */}
        <div className="w-full lg:w-[55%] flex flex-col h-full overflow-y-auto">
          <div className="p-6">
            
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-display font-black text-navy-900">
                  {filteredHotels.length} stays in {destDisplay}
                </h2>
                <div className="flex gap-2 mt-2">
                   <span className="text-xs font-bold bg-tile-green/10 text-tile-green px-2 py-1 rounded-md border border-tile-green/20">Verified local providers</span>
                   <span className="text-xs font-bold bg-navy-50 text-navy-600 px-2 py-1 rounded-md border border-sand-200">Zero hidden fees</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="hidden sm:flex rounded-full border-sand-200 text-navy-900 font-bold"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
            </div>

            {/* Inline Filters Bar */}
            {showFilters && (
              <div className="mb-6 p-4 bg-white border border-sand-200 rounded-2xl shadow-sm flex flex-wrap gap-2">
                {["Free Cancellation", "Breakfast Included", "Local Provider", "WhatsApp Booking", "Pool", "Eco-Friendly"].map(f => (
                  <button key={f} className="px-3 py-1.5 rounded-full text-xs font-bold border border-sand-200 text-navy-700 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-colors">
                    {f}
                  </button>
                ))}
              </div>
            )}

            {/* 4. STAY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-20">
              {filteredHotels.map((hotel: any) => (
                <div key={hotel.id} className="group cursor-pointer" onClick={() => setSelectedHotel(hotel)}>
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                    <img src={hotel.image} alt={hotel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white backdrop-blur-md rounded-full transition-colors group/heart" onClick={(e) => e.stopPropagation()}>
                      <Heart className="w-5 h-5 text-white group-hover/heart:text-terracotta-500 transition-colors" />
                    </button>
                    {hotel.fairScore && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-navy-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-tile-green mr-1" /> {hotel.fairScore}/100
                      </div>
                    )}
                    {hotel.availability === "limited" && (
                      <div className="absolute bottom-3 left-3 bg-terracotta-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Limited availability
                      </div>
                    )}
                    {/* Dots indicator mock */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1 mr-2">
                      <h3 className="font-bold text-navy-900 text-[15px]">{hotel.title}</h3>
                      <p className="text-sm text-navy-500 mt-0.5 line-clamp-1">{hotel.desc}</p>
                      
                      {/* Type + Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {hotel.type && (
                          <span className="text-[10px] font-bold bg-navy-900 text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider">{hotel.type}</span>
                        )}
                        {hotel.badges.slice(0, 2).map((b: string) => (
                          <span key={b} className="text-[10px] font-bold bg-sand-100 text-terracotta-700 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">{b}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <div className="flex items-center text-sm font-bold text-navy-900">
                        <Star className="w-3.5 h-3.5 fill-current text-gold-400 mr-1" /> {hotel.rating}
                      </div>
                      {hotel.reviews && (
                        <span className="text-[10px] text-navy-400 mt-0.5">{hotel.reviews} reviews</span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-3 pt-3 border-t border-sand-100 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-navy-900">{hotel.price}</span>
                        <div className="text-xs text-navy-500 mt-0.5">Total: {parseInt(hotel.price) * 2} MAD for 2 nights</div>
                        {hotel.cancellation && (
                          <span className="text-[10px] text-tile-green font-semibold mt-1 flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Free cancellation
                          </span>
                        )}
                      </div>
                      <Button size="sm" className="bg-navy-900 hover:bg-terracotta-500 text-white rounded-lg px-4 h-8 text-xs font-bold">
                        Book Now
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-[11px] font-bold border-tile-green text-tile-green hover:bg-tile-green hover:text-white rounded-lg h-8">
                        <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> WhatsApp
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-[11px] font-bold border-terracotta-500 text-terracotta-600 hover:bg-terracotta-50 rounded-lg h-8">
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Add to AI Trip
                      </Button>
                    </div>
                  </div>

                  {/* Host */}
                  {hotel.host && (
                    <p className="text-[11px] text-navy-400 mt-1.5">Hosted by <span className="font-semibold text-navy-600">{hotel.host}</span></p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Rich Visual Map */}
        <div className="hidden lg:block w-[45%] sticky top-[140px] h-[calc(100vh-140px)]">
          <MiniMap 
            mode="booking"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      {/* 6. DETAILS MODAL (Super-App View) */}
      {selectedHotel && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl min-h-[80vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col relative my-auto">
            {/* Close button */}
            <button 
              onClick={() => setSelectedHotel(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Wrapper */}
            <div className="flex-1 overflow-y-auto">
              {/* Hero Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 h-[300px] sm:h-[450px] w-full relative">
                <div className="sm:col-span-3 h-full relative group overflow-hidden">
                  <img src={selectedHotel.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedHotel.type && (
                        <span className="text-xs font-bold bg-terracotta-500/90 backdrop-blur-md px-2.5 py-1 rounded-md uppercase tracking-wider">{selectedHotel.type}</span>
                      )}
                      {selectedHotel.badges?.slice(0, 3).map((b: string) => (
                        <span key={b} className="text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md uppercase tracking-wider">{b}</span>
                      ))}
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-display font-black mb-2">{selectedHotel.title}</h1>
                    <p className="text-sand-100 flex items-center"><MapPin className="w-4 h-4 mr-1" /> {destDisplay}, Morocco</p>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col gap-2 h-full">
                  <div className="flex-1 overflow-hidden group">
                    <img src={selectedHotel.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75 hover:brightness-100" />
                  </div>
                  <div className="flex-1 overflow-hidden group">
                    <img src="/images/sahara/regions/merzouga-dunes.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75 hover:brightness-100" />
                  </div>
                </div>
              </div>

              {/* Layout split */}
              <div className="flex flex-col lg:flex-row p-6 lg:p-10 gap-10">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between border-b border-sand-200 pb-6 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-navy-900 mb-1">
                        {selectedHotel.host ? `Hosted by ${selectedHotel.host}` : "Hosted by a Local Family"}
                      </h2>
                      <p className="text-navy-600">4 guests · 1 bedroom · 1 bed · 1 private bath</p>
                    </div>
                    <div className="w-14 h-14 bg-sand-200 rounded-full flex items-center justify-center text-xl overflow-hidden shrink-0">
                      <img src="/images/sahara/stays/sahara-pearl-camp.png" />
                    </div>
                  </div>

                  <div className="prose prose-navy max-w-none mb-8">
                    <p className="text-lg text-navy-700 leading-relaxed">{selectedHotel.desc}</p>
                  </div>

                  {/* Amenities Grid */}
                  {selectedHotel.amenities && selectedHotel.amenities.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-navy-900 mb-4">What this place offers</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedHotel.amenities.map((a: string) => (
                          <div key={a} className="flex items-center gap-2 text-sm text-navy-700">
                            <CheckCircle2 className="w-4 h-4 text-tile-green shrink-0" />
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Booking Packages (Booking.com-style) */}
                  {hotelPackages.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-navy-900 mb-4">Choose your package</h3>
                      <div className="space-y-3">
                        {hotelPackages.map(pkg => (
                          <div key={pkg.id} className="flex items-center justify-between p-4 border border-sand-200 rounded-xl hover:border-terracotta-400 hover:shadow-sm transition-all cursor-pointer">
                            <div>
                              <p className="font-bold text-navy-900">{pkg.title}</p>
                              <p className="text-xs text-navy-500 mt-1">{pkg.includes.join(" · ")}</p>
                              <p className="text-[10px] text-navy-400 mt-0.5">{pkg.capacity} guests · {pkg.availableRooms} rooms left</p>
                            </div>
                            <div className="text-right shrink-0 ml-4">
                              <p className="font-black text-navy-900 text-lg">{pkg.price} MAD</p>
                              <p className="text-[10px] text-navy-400">per night</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Map Location Placeholder */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-navy-900 mb-4">Where you'll be</h3>
                    <div className="w-full h-[200px] sm:h-[300px] bg-sand-100 rounded-[24px] overflow-hidden relative border border-sand-200">
                       <img src="/images/sahara/regions/merzouga-dunes.png" className="w-full h-full object-cover filter blur-[2px] opacity-70" />
                       <div className="absolute inset-0 flex items-center justify-center">
                         <div className="bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3">
                           <div className="w-10 h-10 bg-terracotta-100 rounded-full flex items-center justify-center text-terracotta-600">
                             <MapPin className="w-5 h-5" />
                           </div>
                           <div>
                             <p className="font-bold text-navy-900">{destDisplay}</p>
                             <p className="text-xs text-navy-500">Exact location provided after booking</p>
                           </div>
                         </div>
                       </div>
                    </div>
                  </div>

                  {/* SUPER-APP SECTION */}
                  <div className="bg-sand-50 rounded-[24px] p-6 sm:p-8 border border-sand-200 mb-6">
                    <h3 className="text-xl font-display font-black text-navy-900 mb-6">Complete your trip</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-navy-900 flex items-center mb-3"><Mountain className="w-4 h-4 mr-2 text-terracotta-500" /> Nearby Experiences</h4>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {MOCK_DATA.activities.map(act => (
                            <div key={act.id} className="min-w-[200px] bg-white border border-sand-200 rounded-xl p-3 flex gap-3 cursor-pointer hover:shadow-md transition-shadow">
                              <img src={act.image} className="w-12 h-12 rounded-lg object-cover" />
                              <div>
                                <p className="text-xs font-bold text-navy-900 line-clamp-1">{act.title}</p>
                                <p className="text-[10px] text-navy-500">{act.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-navy-900 flex items-center mb-3"><Heart className="w-4 h-4 mr-2 text-gold-400" /> Local Marketplace</h4>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {MOCK_DATA.souvenirs.map(souv => (
                            <div key={souv.id} className="min-w-[200px] bg-white border border-sand-200 rounded-xl p-3 flex gap-3 cursor-pointer hover:shadow-md transition-shadow">
                              <img src={souv.image} className="w-12 h-12 rounded-lg object-cover" />
                              <div>
                                <p className="text-xs font-bold text-navy-900 line-clamp-1">{souv.title}</p>
                                <p className="text-[10px] text-navy-500">{souv.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Sidebar Booking Card */}
                <div className="w-full lg:w-[350px] shrink-0">
                  <div className="sticky top-6 bg-white border border-sand-200 rounded-[24px] p-6 shadow-xl shadow-sand-200/50">
                    <div className="flex items-end justify-between mb-6">
                      <div>
                        <span className="text-3xl font-black text-navy-900">{selectedHotel.price.split(' ')[0]}</span>
                        <span className="text-navy-500 font-medium"> MAD / night</span>
                      </div>
                      <div className="flex items-center text-sm font-bold text-navy-900">
                        <Star className="w-4 h-4 fill-current text-gold-400 mr-1" /> {selectedHotel.rating}
                        {selectedHotel.reviews && (
                          <span className="text-xs text-navy-400 font-normal ml-1">({selectedHotel.reviews})</span>
                        )}
                      </div>
                    </div>

                    <div className="border border-sand-200 rounded-xl mb-4 overflow-hidden">
                      <div className="flex border-b border-sand-200">
                        <div className="flex-1 p-3 border-r border-sand-200">
                          <span className="block text-[10px] font-bold uppercase text-navy-500">Check-in</span>
                          <span className="text-sm text-navy-900 font-medium">Jun 22</span>
                        </div>
                        <div className="flex-1 p-3">
                          <span className="block text-[10px] font-bold uppercase text-navy-500">Check-out</span>
                          <span className="text-sm text-navy-900 font-medium">Jun 24</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <span className="block text-[10px] font-bold uppercase text-navy-500">Guests</span>
                        <span className="text-sm text-navy-900 font-medium">2 guests</span>
                      </div>
                    </div>

                    {selectedHotel.cancellation && (
                      <p className="text-xs text-tile-green font-semibold mb-4 flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {selectedHotel.cancellation}
                      </p>
                    )}

                    <Button className="w-full bg-navy-900 hover:bg-terracotta-500 text-white rounded-xl h-12 text-base font-bold mb-3 shadow-md">
                      Reserve Now
                    </Button>
                    <Button variant="outline" className="w-full border-tile-green text-tile-green hover:bg-tile-green hover:text-white rounded-xl h-12 text-sm font-bold mb-6">
                      <MessageCircle className="w-4 h-4 mr-2" /> Contact via WhatsApp
                    </Button>

                    <div className="border-t border-sand-100 pt-6">
                      <p className="text-sm text-navy-500 text-center mb-3">Want a complete itinerary instead?</p>
                      <Button onClick={() => window.open('/ai-planner', '_blank')} className="w-full bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white rounded-xl h-12 text-sm font-bold shadow-lg hover:scale-[1.02] transition-transform">
                        <Sparkles className="w-4 h-4 mr-2" /> Add to AI Trip Planner
                      </Button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
