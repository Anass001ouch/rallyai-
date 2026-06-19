import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ManualBookingSearch() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <Card className="shadow-xl bg-card border-border">
        <CardContent className="p-2 sm:p-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input placeholder="Where are you going?" className="pl-10 py-6 text-lg border-none focus-visible:ring-0 shadow-none bg-muted/50 rounded-lg" />
            </div>
            
            <div className="w-px h-10 bg-border hidden sm:block" />
            
            <div className="relative flex-1 w-full">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input placeholder="Check in - Check out" className="pl-10 py-6 text-lg border-none focus-visible:ring-0 shadow-none bg-muted/50 rounded-lg" />
            </div>

            <div className="w-px h-10 bg-border hidden sm:block" />
            
            <div className="relative flex-1 w-full">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input placeholder="Guests" className="pl-10 py-6 text-lg border-none focus-visible:ring-0 shadow-none bg-muted/50 rounded-lg" />
            </div>

            <Button size="lg" className="w-full sm:w-auto py-6 px-8 rounded-lg text-lg font-semibold">Search</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Placeholder results */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-xl overflow-hidden shadow-sm border border-border group cursor-pointer">
              <div className="h-48 bg-muted group-hover:opacity-90 transition-opacity flex items-center justify-center text-muted-foreground">
                [Image Placeholder]
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Marrakech, Morocco</h3>
                <p className="text-muted-foreground">Traditional Riad - from $80/night</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
