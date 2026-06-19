import { CheckCircle2, ShieldCheck } from "lucide-react";

interface PlannerProgressProps {
  tripState: string;
  isAuthenticMode: boolean;
  toggleAuthenticMode: () => void;
}

export function PlannerProgress({ tripState, isAuthenticMode, toggleAuthenticMode }: PlannerProgressProps) {
    const steps = [
      { id: "UNDERSTAND_REQUEST", label: "Understanding request" },
      { id: "ASK_DURATION", label: "Duration" },
      { id: "ASK_BUDGET", label: "Budget" },
      { id: "SUGGEST_DESTINATION", label: "Choosing region" },
      { id: "CHOOSE_STAY", label: "Choosing stay" },
      { id: "CHOOSE_ACTIVITIES", label: "Activities" },
      { id: "FINAL_ITINERARY", label: "Booking" }
    ];

    // Map intermediate steps to their closest visible step
    const mappedState = 
      tripState === 'ASK_PREFERENCES' ? 'ASK_BUDGET' : 
      tripState === 'LOCAL_MARKETPLACE' ? 'CHOOSE_ACTIVITIES' : 
      tripState === 'PAYMENT_REVIEW' ? 'FINAL_ITINERARY' : 
      tripState;

    const currentIndex = steps.findIndex(s => s.id === mappedState);

    return (
      <div className="bg-navy-900 border-b border-navy-800 p-4 shrink-0 transition-colors duration-500 rounded-t-3xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-terracotta-500/20 rounded-full blur-[60px]"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          
          {/* Progress Tracker */}
          <div className="flex items-center gap-1.5 flex-wrap flex-1 w-full sm:w-auto">
            {steps.map((step, index) => {
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide transition-all ${
                    isCurrent 
                      ? 'bg-terracotta-500 text-white shadow-md' 
                      : isCompleted 
                        ? 'bg-navy-800 text-terracotta-400' 
                        : 'bg-navy-800 text-navy-400 opacity-50'
                  }`}>
                    {isCompleted && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {step.label}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-3 h-[2px] mx-1 rounded-full ${isCompleted ? 'bg-terracotta-500/50' : 'bg-navy-800/50'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Authentic Mode Toggle */}
          <button 
            onClick={toggleAuthenticMode}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              isAuthenticMode 
                ? 'bg-tile-green/20 text-tile-green border border-tile-green/30 shadow-inner' 
                : 'bg-navy-800 text-navy-400 hover:text-white border border-transparent hover:border-navy-700'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${isAuthenticMode ? 'text-tile-green' : 'text-navy-500'}`} />
            Authentic Mode
          </button>
        </div>
    </div>
  );
}
