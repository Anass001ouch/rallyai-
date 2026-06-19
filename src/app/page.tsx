"use client";

import { Hero } from "@/components/artouris/Hero";
import { Sparkles, Building2, TrendingUp, Users, Map, Heart, ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <div id="top" className="relative flex min-h-screen flex-col bg-sand-50">
      <main className="flex-1 flex flex-col">
        {/* Full Screen Hero */}
        <Hero />

        {/* How It Works Section */}
        <section className="py-24 px-6 bg-[#f7f1e8] w-full">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-black text-navy-900 mb-4">How it works</h2>
              <p className="text-lg font-medium text-navy-600 max-w-2xl mx-auto">Plan a fully personalized Moroccan trip in minutes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Describe your dream trip", desc: "Just tell our AI what kind of experience you want to live." },
                { step: "2", title: "AI asks smart questions", desc: "We refine your budget, travel style, and food preferences." },
                { step: "3", title: "Choose stay & activities", desc: "Select from curated authentic Moroccan providers." },
                { step: "4", title: "Book everything in one place", desc: "Approve your final itinerary and pay safely." },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-sand-100 text-terracotta-600 font-display font-black text-2xl flex items-center justify-center mx-auto mb-6 border border-sand-200">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{s.title}</h3>
                  <p className="text-navy-600 font-medium">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Choose How You Travel Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black text-navy-900 mb-4">Choose your way</h2>
            <p className="text-lg font-medium text-navy-600 max-w-2xl mx-auto">Artouris is a complete ecosystem. Let AI do the heavy lifting, or browse our marketplace directly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* AI Card */}
            <div className="bg-white p-10 rounded-[32px] border border-sand-200 shadow-xl shadow-sand-200/50 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-terracotta-50 flex items-center justify-center mb-8">
                <Sparkles className="w-8 h-8 text-terracotta-500" />
              </div>
              <h3 className="text-2xl font-display font-black text-navy-900 mb-4">Plan with AI</h3>
              <p className="text-navy-600 font-medium leading-relaxed mb-8">
                Describe your trip once. Artouris builds your full itinerary with stays, activities, transport, souvenirs, and a calculated budget in seconds.
              </p>
              <a href="/ai-planner" className="inline-flex items-center text-terracotta-600 font-bold hover:text-terracotta-700">
                Start Planning <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Manual Card */}
            <div className="bg-white p-10 rounded-[32px] border border-sand-200 shadow-xl shadow-sand-200/50 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mb-8">
                <Building2 className="w-8 h-8 text-navy-900" />
              </div>
              <h3 className="text-2xl font-display font-black text-navy-900 mb-4">Book manually</h3>
              <p className="text-navy-600 font-medium leading-relaxed mb-8">
                Browse authentic stays, guided experiences, local transport, and fair-trade souvenirs without using AI credits. Direct contact with providers.
              </p>
              <a href="/book" className="inline-flex items-center text-navy-900 font-bold hover:text-terracotta-600">
                Explore Marketplace <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </section>

        {/* Popular Experiences Section */}
        <section className="py-24 px-6 bg-white w-full border-t border-sand-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-display font-black text-navy-900 mb-10 text-center">Popular Experiences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Sahara Escape", img: "/images/sahara/regions/merzouga-dunes.png" },
                { title: "Marrakech Culture", img: "/images/sahara/regions/agafay-rocky-desert.png" },
                { title: "Chefchaouen Weekend", img: "/images/sahara/regions/zagora-desert-road.png" },
                { title: "Essaouira Surf Trip", img: "/images/sahara/stays/sahara-pearl-camp.png" }
              ].map((exp) => (
                <div key={exp.title} className="group relative h-64 rounded-[24px] overflow-hidden cursor-pointer">
                  <img src={exp.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 text-white font-bold text-xl">{exp.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Impact Section */}
        <section className="py-24 px-6 bg-navy-900 text-white w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400/10 rounded-full blur-[100px]" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-tile-green/20 text-tile-green font-bold text-sm mb-6 border border-tile-green/30">
                <Heart className="w-4 h-4 mr-2" /> Sovereign Tourism
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Every booking supports<br/>Moroccan tourism.</h2>
              <p className="text-lg font-medium text-navy-200 max-w-2xl mx-auto">
                Your trip directly supports local desert camps, mountain guides, female artisan cooperatives, drivers, and family-owned riads.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
              {[
                { number: "1,200+", label: "Local Providers", icon: Users },
                { number: "12", label: "Regions Covered", icon: Map },
                { number: "0", label: "Hidden Fees", icon: TrendingUp },
                { number: "100%", label: "Fair Visibility", icon: Sparkles }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-[24px] text-center hover:bg-white/10 transition-colors">
                  <stat.icon className="w-6 h-6 text-gold-400 mx-auto mb-4" />
                  <div className="text-3xl sm:text-4xl font-black font-display text-white mb-2">{stat.number}</div>
                  <div className="text-sm font-bold text-navy-300 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
