"use client";

import { Navbar } from "@/components/artouris/Navbar";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Eye, Sparkles, MapPin } from "lucide-react";

export default function ProviderPreview() {
  return (
    <div className="min-h-screen bg-sand-50">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-navy-900">Provider Dashboard</h1>
            <p className="text-navy-500 mt-1 flex items-center"><MapPin className="w-4 h-4 mr-1"/> Atlas Family Auberge, Imlil</p>
          </div>
          <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-xl shadow-md">
            Update Availability
          </Button>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-sm">
            <p className="text-sm font-semibold text-navy-500 mb-1 flex items-center"><Eye className="w-4 h-4 mr-2" /> AI Impressions</p>
            <p className="text-3xl font-bold text-navy-900">1,402</p>
            <p className="text-xs font-semibold text-tile-green mt-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +12% this week</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-sm">
            <p className="text-sm font-semibold text-navy-500 mb-1 flex items-center"><BarChart3 className="w-4 h-4 mr-2" /> Fair Visibility Score</p>
            <p className="text-3xl font-bold text-tile-green">94/100</p>
            <p className="text-xs text-navy-500 mt-2">Top 5% in Imlil Region</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-sm">
            <p className="text-sm font-semibold text-navy-500 mb-1 flex items-center"><Users className="w-4 h-4 mr-2" /> Leads via WhatsApp</p>
            <p className="text-3xl font-bold text-navy-900">28</p>
            <p className="text-xs text-navy-500 mt-2">Zero commission paid</p>
          </div>
          <div className="bg-gradient-to-br from-terracotta-500 to-gold-400 p-5 rounded-2xl text-white shadow-lg relative overflow-hidden">
             <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 text-white/20" />
             <p className="text-sm font-bold text-white/90 mb-1 flex items-center"><Sparkles className="w-4 h-4 mr-2" /> RallyIA AI Assistant</p>
             <p className="text-sm mt-3 leading-tight font-medium">Your description is ranking well for "Calm mountain trip". Click to optimize your listing for "Authentic local food".</p>
             <Button variant="secondary" size="sm" className="w-full mt-4 bg-white text-terracotta-600 font-bold hover:bg-white/90">Optimize Listing</Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart / Analytics Area */}
          <div className="col-span-2 bg-white rounded-2xl border border-sand-200 p-6 shadow-sm">
            <h3 className="font-bold text-navy-900 mb-4">Traveler Demand in Your Region</h3>
            <div className="h-64 flex items-end gap-2 border-b border-l border-sand-200 p-4">
              {/* Mock Bar Chart */}
              {[40, 60, 45, 80, 100, 75, 90].map((h, i) => (
                <div key={i} className="w-full bg-sand-100 rounded-t-sm relative group">
                  <div className="absolute bottom-0 left-0 right-0 bg-terracotta-400 rounded-t-sm transition-all group-hover:bg-terracotta-500" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-navy-400 font-semibold mt-2 px-4">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="bg-white rounded-2xl border border-sand-200 p-6 shadow-sm">
             <h3 className="font-bold text-navy-900 mb-4 flex items-center"><Sparkles className="w-4 h-4 mr-2 text-terracotta-500"/> Market Insights</h3>
             <div className="space-y-4">
               <div className="p-3 bg-sand-50 rounded-xl border border-sand-100">
                 <p className="text-xs font-bold text-navy-900 mb-1">Rising Trend</p>
                 <p className="text-xs text-navy-600">Searches for "Vegan food in Imlil" are up 34% this week. Consider adding vegan options to your tags.</p>
               </div>
               <div className="p-3 bg-tile-green/10 rounded-xl border border-tile-green/20">
                 <p className="text-xs font-bold text-tile-green mb-1">Badge Awarded</p>
                 <p className="text-xs text-navy-700">Your "Family-Owned" badge is boosting your Fair Visibility Score by 12 points.</p>
               </div>
               <div className="p-3 bg-gold-400/10 rounded-xl border border-gold-400/20">
                 <p className="text-xs font-bold text-gold-600 mb-1">Booking Window</p>
                 <p className="text-xs text-navy-700">Most travelers booking your auberge are planning trips 14-21 days in advance.</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
