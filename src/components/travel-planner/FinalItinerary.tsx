"use client";

import { toast } from "sonner";
import { useTravelPlannerStore, type FinalItineraryPayload } from "@/store/useTravelPlannerStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarRange, MapPin, Sparkles, CheckCircle2, ShieldCheck,
  ArrowRight, CreditCard, Wallet, Pencil, Bookmark, Share2,
  Utensils, Car, Tent, Compass
} from "lucide-react";
import { MiniMap } from "./MiniMap";

export function FinalItinerary() {
  const store = useTravelPlannerStore();
  const itinerary: FinalItineraryPayload | null = store.itinerary;
  const days = itinerary?.days ?? fallbackDays(store.tripDuration ?? 3);
  const budget = itinerary?.budget;
  const localImpact = itinerary?.localImpact;
  
  // Calculate aggregate stats
  const activityCount = store.selectedActivities.length;
  const stayName = (store.selectedStay as any)?.title || (store.selectedStay as any)?.name;
  const stayImage = (store.selectedStay as any)?.image;
  
  const handleEdit = () => {
    store.setStep("ASK_PREFERENCES");
  };

  const handleBook = () => {
    store.approvePlan();
  };

  const showToast = (action: string) => {
    toast.success(`${action} feature coming soon!`);
  };

  return (
    <div className="bg-[#fdfbf7] min-h-[calc(100vh-80px)] w-full pb-20 animate-in fade-in duration-700 overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8 border-b border-sand-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-50 text-terracotta-700 font-bold text-xs uppercase tracking-wider border border-terracotta-100">
              <Sparkles className="w-3.5 h-3.5" /> Your Saharan Escape is Ready
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-navy-900 leading-tight">
              {itinerary?.title ?? `Your ${store.tripDuration ?? 3}-Day Trip`}
            </h1>
            <p className="text-lg text-navy-600 font-medium">
              A fully personalized Moroccan trip designed by Artouris based on your unique preferences.
            </p>
            
            {/* Summary Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sand-200 rounded-lg text-sm font-bold text-navy-800 shadow-sm">
                <MapPin className="w-4 h-4 text-terracotta-500" /> {itinerary?.destination ?? 'Morocco'}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sand-200 rounded-lg text-sm font-bold text-navy-800 shadow-sm">
                <CalendarRange className="w-4 h-4 text-terracotta-500" /> {itinerary?.durationLabel ?? `${store.tripDuration ?? 3} days`}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sand-200 rounded-lg text-sm font-bold text-navy-800 shadow-sm">
                <Compass className="w-4 h-4 text-terracotta-500" /> {activityCount} {activityCount === 1 ? 'Activity' : 'Activities'}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sand-200 rounded-lg text-sm font-bold text-navy-800 shadow-sm">
                <Wallet className="w-4 h-4 text-gold-500" /> {(budget?.total || store.totalBudget || 2910).toLocaleString()} MAD
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="lg" onClick={() => showToast("Save Trip")} className="rounded-full bg-white text-navy-700 border-sand-200 hover:bg-sand-50 font-bold shadow-sm h-12">
              <Bookmark className="w-4 h-4 mr-2" /> Save
            </Button>
            <Button variant="outline" size="lg" onClick={() => showToast("Share Plan")} className="rounded-full bg-white text-navy-700 border-sand-200 hover:bg-sand-50 font-bold shadow-sm h-12">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT COLUMN: Itinerary */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Trip Overview Card */}
            <Card className="p-6 sm:p-8 bg-white border-sand-200 shadow-card-soft rounded-3xl">
              <h3 className="text-xl font-black text-navy-900 mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-terracotta-500" /> Trip Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-navy-400 font-bold uppercase tracking-wider mb-1">Travel Style</p>
                  <p className="text-navy-800 font-medium">{store.luxuryFlag ? 'Luxury' : store.adventureFlag ? 'Adventure' : 'Authentic Explorer'}</p>
                </div>
                <div>
                  <p className="text-sm text-navy-400 font-bold uppercase tracking-wider mb-1">Food Preferences</p>
                  <p className="text-navy-800 font-medium">{itinerary?.foodPreferencesNote || "Standard Moroccan"}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-navy-400 font-bold uppercase tracking-wider mb-1">What's Included</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-sand-50 border border-sand-100 rounded-md text-sm text-navy-600 font-medium">Accommodation</span>
                    <span className="px-3 py-1 bg-sand-50 border border-sand-100 rounded-md text-sm text-navy-600 font-medium">Activities</span>
                    <span className="px-3 py-1 bg-sand-50 border border-sand-100 rounded-md text-sm text-navy-600 font-medium">Transport</span>
                    <span className="px-3 py-1 bg-sand-50 border border-sand-100 rounded-md text-sm text-navy-600 font-medium">Meals</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Day by Day Plan */}
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-black text-navy-900 flex items-center gap-2">
                <CalendarRange className="w-6 h-6 text-terracotta-500" /> Day by Day Plan
              </h3>
              
              <div className="relative pl-4 sm:pl-8 border-l-2 border-sand-200 space-y-10 py-4 ml-2">
                {days.map((day, idx) => (
                  <div key={day.day} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-10 h-10 rounded-full bg-white border-2 border-terracotta-200 flex items-center justify-center shadow-sm">
                      <span className="text-terracotta-700 font-black">{day.day}</span>
                    </div>
                    
                    <Card className="ml-6 sm:ml-8 p-6 bg-white border-sand-200 shadow-card-soft rounded-2xl hover:border-sand-300 transition-colors">
                      <h4 className="text-lg font-bold text-navy-900 mb-4">{day.title}</h4>
                      <ul className="space-y-4">
                        {day.transport && (
                          <li className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-sand-100 flex items-center justify-center shrink-0">
                              <Car className="w-4 h-4 text-navy-500" />
                            </div>
                            <span className="text-navy-700 font-medium mt-1">{day.transport}</span>
                          </li>
                        )}
                        {day.plan.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-sand-100 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-terracotta-500" />
                            </div>
                            <span className="text-navy-700 font-medium mt-1">{item}</span>
                          </li>
                        ))}
                        {day.accommodation && (
                          <li className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center shrink-0">
                              <Tent className="w-4 h-4 text-navy-600" />
                            </div>
                            <span className="text-navy-700 font-medium mt-1">Stay: {day.accommodation}</span>
                          </li>
                        )}
                      </ul>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Summary & Booking */}
          <div className="space-y-6">
            
            {/* Stay Details Card */}
            <Card className="overflow-hidden border-sand-200 shadow-card-soft rounded-3xl bg-white">
              {stayImage ? (
                <div className="h-40 w-full overflow-hidden relative">
                  <img src={stayImage} alt={stayName} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-navy-900">
                    Your Stay
                  </div>
                </div>
              ) : (
                <div className="h-20 bg-sand-100 flex items-center justify-center">
                  <Tent className="w-6 h-6 text-navy-300" />
                </div>
              )}
              <div className="p-6">
                <h4 className="font-black text-lg text-navy-900 mb-1">{stayName || 'Desert Camp'}</h4>
                <p className="text-sm text-navy-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {itinerary?.destination || 'Sahara Desert'}
                </p>
              </div>
            </Card>

            {/* Budget Breakdown */}
            <Card className="p-6 border-sand-200 shadow-card-soft rounded-3xl bg-navy-900 text-white">
              <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6">
                <Wallet className="w-5 h-5 text-gold-400" /> Budget Breakdown
              </h3>
              
              {budget && (
                <div className="space-y-4 text-sm font-medium text-sand-100">
                  <BudgetRow label="Stay" value={budget.stay} />
                  <BudgetRow label="Activities" value={budget.activities} />
                  <BudgetRow label="Transport" value={budget.transport} />
                  <BudgetRow label="Food" value={budget.food} />
                  <BudgetRow label="Souvenirs" value={budget.souvenirs} />
                  <div className="h-px bg-white/20 my-3" />
                  <BudgetRow label="Service Fee" value={budget.serviceFee} />
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-xs text-sand-300 font-bold uppercase tracking-wider mb-1">Total Estimate</p>
                <p className="text-3xl font-display font-black text-gold-400">
                  {(budget?.total || store.totalBudget || 2910).toLocaleString()} MAD
                </p>
              </div>
            </Card>

            {/* Local Impact */}
            <Card className="p-5 border-tile-green/20 shadow-card-soft bg-[#f0fdf4] rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-tile-green shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-tile-green text-sm uppercase tracking-wider mb-1">Local Impact</h4>
                <p className="text-sm text-navy-700 font-medium leading-relaxed">
                  {localImpact?.message || "This trip supports 5 Moroccan local providers: 1 desert camp, 1 driver, 1 activity provider, 1 guide, and 1 artisan seller."}
                </p>
              </div>
            </Card>

            {/* Sticky Booking Actions */}
            <div className="sticky top-24 pt-4 space-y-3">
              <Button onClick={handleBook} className="w-full bg-gold-400 hover:bg-gold-500 text-navy-900 font-black h-14 rounded-2xl text-lg shadow-lg shadow-gold-400/20 transition-transform hover:scale-[1.02]">
                Book Full Trip <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" onClick={() => showToast("Pay Deposit")} className="w-full bg-white hover:bg-sand-50 text-navy-800 border-sand-200 h-12 rounded-2xl font-bold shadow-sm">
                <CreditCard className="w-4 h-4 mr-2 text-navy-500" /> Pay Deposit (20%)
              </Button>
              <Button variant="ghost" onClick={handleEdit} className="w-full text-navy-600 hover:bg-sand-100 h-12 rounded-2xl font-bold">
                <Pencil className="w-4 h-4 mr-2" /> Edit Plan
              </Button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Full-Width Map Section */}
      <div className="max-w-[1400px] mx-auto px-6 mt-8 mb-12">
        <h3 className="text-2xl font-display font-black text-navy-900 mb-6 px-4">Trip Route & Destinations</h3>
        <div className="h-[450px] w-full rounded-3xl overflow-hidden border-2 border-sand-200 shadow-card-warm bg-white">
          <MiniMap markers={store.mapMarkers as never} mode="planner" />
        </div>
      </div>

    </div>
  );
}

function BudgetRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <span className="font-bold text-white">{value.toLocaleString()} MAD</span>
    </div>
  );
}

function fallbackDays(n: number) {
  return Array.from({ length: n }).map((_, i) => ({
    day: i + 1,
    title:
      i === 0
        ? 'Arrival & Desert Welcome'
        : i === n - 1
          ? 'Farewell & Departure'
          : 'Sahara Exploration',
    plan: [
      i === 0
        ? 'Private transfer from Errachidia Airport to Merzouga'
        : i === n - 1
          ? 'Sunrise walk in the dunes and return transfer'
          : 'Camel trekking, ATV adventure, and stargazing at the camp',
      'Traditional Moroccan dinner and music around the campfire',
    ],
    transport: i === 0 ? 'Errachidia Airport Desert Transfer' : i === n - 1 ? 'Return Transfer' : undefined,
    accommodation: i !== n - 1 ? 'Sahara Pearl Desert Camp' : null,
  }));
}