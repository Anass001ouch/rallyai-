"use client";

import { Navbar } from "@/components/artouris/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, ShieldCheck, MapPin } from "lucide-react";
import { MOCK_DATA } from "@/components/travel-planner/mockData";

export default function ShopPage() {
  const products = MOCK_DATA.souvenirs;

  return (
    <div className="min-h-screen bg-sand-50">
      <Navbar />
      
      {/* Premium Shop Header */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-navy-900 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gold-400/20 rounded-full blur-[100px] animate-float-slow" />
          <div className="absolute inset-0 bg-zellige opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/10 via-navy-900/60 to-sand-50" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold text-white mb-6 uppercase tracking-widest shadow-sm">
            <ShoppingBag className="w-3.5 h-3.5 text-gold-400" />
            Fair Trade Marketplace
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-4 text-center drop-shadow-lg">
            Authentic Moroccan Souvenirs.
          </h1>
          <p className="text-lg text-sand-100 font-medium text-center mb-10 max-w-2xl drop-shadow-md">
            Buy directly from local artisans, cooperatives, and families. Zero middleman fees. We ship globally.
          </p>
          
          {/* Glassmorphic Search Bar */}
          <div className="w-full max-w-3xl p-2 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/30 shadow-2xl">
            <div className="flex gap-2 bg-white p-2 rounded-[24px]">
              <div className="flex-1 flex items-center bg-sand-50/50 rounded-[16px] px-5 py-3 border border-sand-100">
                <Search className="text-terracotta-500 w-5 h-5 mr-3 shrink-0" />
                <Input 
                  placeholder="Search rugs, pottery, argan oil..." 
                  className="border-0 bg-transparent focus-visible:ring-0 px-0 text-navy-900 font-semibold text-lg placeholder:text-navy-300" 
                />
              </div>
              <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-[16px] h-auto py-4 px-10 font-bold text-lg shadow-md shrink-0">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-navy-900">Featured Artisans</h2>
          <span className="text-sm font-semibold text-navy-500 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-tile-green" /> All items certified Authentic</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sand-200 hover:shadow-card-warm transition-all group flex flex-col">
              <div className="h-56 relative overflow-hidden bg-sand-100">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.title} />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-navy-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-terracotta-500" /> Sourced from Region
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-lg text-navy-900 leading-tight mb-2">{product.title}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.badges.map((badge: string) => (
                    <span key={badge} className="text-[10px] font-semibold bg-tile-green/10 text-tile-green px-2 py-1 rounded-md">{badge}</span>
                  ))}
                </div>
                <p className="text-sm text-navy-600 line-clamp-3 mb-6 flex-1 leading-relaxed">{product.desc}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-black text-xl text-navy-900">{product.price}</span>
                  <Button className="bg-navy-900 hover:bg-terracotta-500 text-white rounded-xl text-xs px-4">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
