import { PieChart } from "lucide-react";

interface BudgetSummaryProps {
  budget: {
    stay: string;
    food: string;
    activities: string;
    total: string;
  };
}

export function BudgetSummary({ budget }: BudgetSummaryProps) {
  return (
    <div className="bg-sand-50 p-3 rounded-xl border border-sand-100">
      <p className="text-[10px] font-bold uppercase text-navy-400 mb-2 flex items-center"><PieChart className="w-3 h-3 mr-1"/> Est. Budget</p>
      <div className="space-y-1 text-xs text-navy-700">
        <div className="flex justify-between"><span>Stay:</span> <strong>{budget.stay}</strong></div>
        <div className="flex justify-between"><span>Food:</span> <strong>{budget.food}</strong></div>
        <div className="flex justify-between"><span>Activities:</span> <strong>{budget.activities}</strong></div>
      </div>
      <div className="mt-2 pt-2 border-t border-sand-200 flex justify-between text-sm font-bold text-navy-900">
        <span>Total:</span> <span>{budget.total}</span>
      </div>
    </div>
  );
}
