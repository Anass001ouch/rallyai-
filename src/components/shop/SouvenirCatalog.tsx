"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const SOUVENIRS = [
  { id: 1, name: "Pure Argan Oil", desc: "Organic, cold-pressed 500ml", price: "$40.00", category: "Beauty" },
  { id: 2, name: "Berber Rug", desc: "Handwoven wool rug (1m x 1.5m)", price: "$150.00", category: "Home" },
  { id: 3, name: "Tuareg Desert Scarf", desc: "Traditional Indigo Cotton", price: "$15.00", category: "Clothing" },
  { id: 4, name: "Safi Pottery Bowl", desc: "Hand-painted ceramic", price: "$25.00", category: "Home" },
  { id: 5, name: "Leather Pouf", desc: "Genuine tanned leather, unstuffed", price: "$65.00", category: "Home" },
  { id: 6, name: "Moroccan Mint Tea Set", desc: "Teapot & 6 glasses", price: "$45.00", category: "Kitchen" },
];

export function SouvenirCatalog() {
  return (
    <div className="max-w-6xl mx-auto w-full py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Authentic Souvenirs</h1>
          <p className="text-muted-foreground mt-2">Support local cooperatives and get authentic Moroccan goods delivered to your home.</p>
        </div>
        <Button variant="outline"><ShoppingCart className="w-4 h-4 mr-2" /> Cart (0)</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOUVENIRS.map((item, idx) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <Card className="overflow-hidden group flex flex-col h-full border-border hover:border-primary transition-colors">
              <div className="aspect-square bg-muted flex items-center justify-center relative">
                <span className="text-muted-foreground">[Image]</span>
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardHeader>
              <CardFooter className="mt-auto pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">{item.price}</span>
                <Button>Add to Cart</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
