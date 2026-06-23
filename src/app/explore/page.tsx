"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Compass, Users, Mountain, Waves, Tent, UtensilsCrossed, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/artouris/Navbar";
import { Footer } from "@/components/artouris/Footer";
import { MoroccanPattern } from "@/components/artouris/MoroccanPattern";
import { SectionHeader } from "@/components/artouris/SectionHeader";
import { Eyebrow } from "@/components/artouris/SectionHeader";
import { CTAButton } from "@/components/artouris/CTAButton";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the map to avoid SSR issues with Leaflet
const MoroccoMap = dynamic(
  () => import("@/components/artouris/explore/MoroccoMap").then((m) => m.MoroccoMap),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-full rounded-none" />,
  }
);

const QUICK_STATS = [
  { icon: MapPin, label: "Regions", value: "8" },
  { icon: Mountain, label: "Atlas peaks", value: "4 167m" },
  { icon: Waves, label: "Atlantic coast", value: "2 500 km" },
  { icon: Tent, label: "Desert camps", value: "120+" },
];

const TOP_PICKS = [
  {
    title: "Marrakech → Sahara → Fes",
    duration: "8 days",
    price: "From 12 800 MAD",
    description: "The classic loop. Imperial cities, Atlas passes, and a night under the stars.",
    tag: "Most loved",
    image: "/images/sahara/regions/merzouga-dunes.png",
  },
  {
    title: "Chefchaouen + Tangier",
    duration: "4 days",
    price: "From 5 400 MAD",
    description: "Blue alleys, Mediterranean light, and Atlantic seafood.",
    tag: "Photography",
    image: "/images/sahara/regions/merzouga-dunes.png",
  },
  {
    title: "Agafay sunset escape",
    duration: "1 day",
    price: "From 1 800 MAD",
    description: "Stone desert 40 min from Marrakech. Dinner under lantern light.",
    tag: "Day trip",
    image: "/images/sahara/regions/agafay-rocky-desert.png",
  },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-sand-50 flex flex-col">
      <Navbar />

      {/* Full-bleed interactive map */}
      <section className="relative h-[calc(100vh-72px)] w-full overflow-hidden">
        {/* Subtle pattern overlay for premium feel */}
        <div aria-hidden className="absolute inset-0 z-[450] pointer-events-none opacity-30">
          <MoroccanPattern variant="zellige" />
        </div>

        <MoroccoMap />

        {/* Floating intro overlay (top-left) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-6 left-6 z-[1000] max-w-[320px] pointer-events-auto"
        >
          <div className="rounded-3xl border border-white/40 bg-white/90 backdrop-blur-xl shadow-card-elevated p-5">
            <Eyebrow icon={<Compass className="h-3 w-3" />}>Explore Morocco</Eyebrow>
            <h1 className="mt-3 font-display text-2xl font-black text-navy-800 leading-tight">
              Pick a region.
              <br />
              <span className="gradient-text-morocco">Build a journey.</span>
            </h1>
            <p className="mt-2 text-xs text-navy-600 leading-relaxed">
              Tap any region to see its top stays, activities, and local impact. Or
              hand the prompt to our AI.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {QUICK_STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sand-100 border border-sand-200"
                >
                  <s.icon className="w-3 h-3 text-terracotta-500" />
                  <span className="text-[10px] font-bold text-navy-700">
                    {s.value} <span className="text-navy-500 font-medium">{s.label}</span>
                  </span>
                </div>
              ))}
            </div>
            <a href="#top-picks" className="mt-4 inline-flex items-center text-[11px] font-bold text-terracotta-600 hover:text-terracotta-700">
              See curated itineraries below
              <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Top picks below the map */}
      <section id="top-picks" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-100/40 to-sand-50" />
          <MoroccanPattern variant="topo" className="opacity-30" />
        </div>
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Curated itineraries"
            eyebrowIcon={<Sparkles className="h-3.5 w-3.5" />}
            title={
              <>
                Top picks to{" "}
                <span className="gradient-text-sunset">start with.</span>
              </>
            }
            subtitle="Tested routes that combine the icons of Morocco with the corners most travelers miss."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOP_PICKS.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-white border border-sand-200 shadow-card-soft hover:-translate-y-1.5 hover:shadow-card-warm transition-all"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold text-terracotta-700">
                    <Sparkles className="w-3 h-3" /> {p.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-navy-900/80 backdrop-blur text-[10px] font-bold text-white">
                    {p.duration}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-navy-900 leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-navy-600 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-sand-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-navy-900">{p.price}</span>
                    <CTAButton href="/ai-planner" size="sm" icon={<ArrowRight className="h-3.5 w-3.5" />}>
                      Plan
                    </CTAButton>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Why explore with Artouris */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-sand-100">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Why this map"
            eyebrowIcon={<Compass className="h-3.5 w-3.5" />}
            title={
              <>
                More than a map.{" "}
                <span className="gradient-text-sunset">A local atlas.</span>
              </>
            }
            subtitle="Every region is a network of stays, guides, artisans, and food — surfaced by relevance, not by ad spend."
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "1 200+ local providers",
                description: "Family-run riads, Berber guides, artisan cooperatives, drivers.",
                color: "from-[#D2542A] to-[#8C2F16]",
              },
              {
                icon: MapPin,
                title: "12 regions, one prompt",
                description: "From Tangier to the Sahara, all in a single AI itinerary.",
                color: "from-[#D4A958] to-[#6E4D29]",
              },
              {
                icon: UtensilsCrossed,
                title: "Authentic by design",
                description: "Tanneries, souks, hidden rooftops — recommended by people who live there.",
                color: "from-[#2F5D54] to-[#1F4E6E]",
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-sand-200 bg-sand-50/50 p-6 hover:bg-white hover:shadow-card-soft transition-all"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}
                >
                  <c.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy-900 mb-1.5">
                  {c.title}
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed text-pretty">
                  {c.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
