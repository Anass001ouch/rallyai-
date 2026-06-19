import { Leaf } from "lucide-react";

interface LocalImpactCardProps {
  impact: {
    businesses: number;
    guides: number;
    auberges: number;
    totalImpact: string;
  };
}

export function LocalImpactCard({ impact }: LocalImpactCardProps) {
  return (
    <div className="bg-tile-green/5 p-3 rounded-xl border border-tile-green/20">
      <p className="text-[10px] font-bold uppercase text-tile-green mb-2 flex items-center"><Leaf className="w-3 h-3 mr-1"/> Local Impact</p>
      <div className="space-y-1 text-[11px] text-navy-700 font-medium">
         <p>Supports {impact.businesses} local businesses</p>
         <p>Supports {impact.guides} local guide</p>
         <p>Supports {impact.auberges} family auberge</p>
      </div>
      <div className="mt-2 pt-2 border-t border-tile-green/20 text-xs font-bold text-tile-green">
        Direct Impact: {impact.totalImpact}
      </div>
    </div>
  );
}
