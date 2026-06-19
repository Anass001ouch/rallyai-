interface RefinementChipsProps {
  onChipClick: (chip: string) => void;
  tripState: string;
}

export function RefinementChips({ onChipClick, tripState }: RefinementChipsProps) {
  const isStart = tripState.includes("Understanding") || tripState === "";

  const INITIAL_CHIPS = [
    "Calm mountain trip",
    "Romantic Sahara weekend",
    "Budget Fes trip",
    "Family coastal escape"
  ];

  const REFINEMENT_CHIPS = [
    "Make it cheaper",
    "More local",
    "More luxury",
    "Add adventure",
    "Family-friendly"
  ];

  const chipsToDisplay = isStart ? INITIAL_CHIPS : REFINEMENT_CHIPS;

  return (
    <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin no-scrollbar">
      {!isStart && (
        <span className="text-xs font-semibold text-navy-500 flex items-center shrink-0 pr-1">Refine:</span>
      )}
      {chipsToDisplay.map(chip => (
         <button 
           key={chip} 
           onClick={() => onChipClick(chip)}
           className="whitespace-nowrap px-4 py-1.5 bg-sand-50 hover:bg-terracotta-50 hover:text-terracotta-700 hover:border-terracotta-200 border border-sand-200 rounded-full text-[11px] font-bold text-navy-600 transition-colors shadow-sm"
         >
           {chip}
         </button>
      ))}
    </div>
  );
}
