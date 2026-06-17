import { cn } from "@/lib/utils";

interface MoroccanPatternProps {
  variant?: "zellige" | "grid" | "dots" | "rings" | "route" | "topo";
  className?: string;
}

/**
 * Subtle Moroccan-inspired SVG patterns used as section backgrounds.
 * All patterns are very low opacity so they don't compete with content.
 */
export function MoroccanPattern({
  variant = "zellige",
  className,
}: MoroccanPatternProps) {
  if (variant === "grid") {
    return <div className={cn("absolute inset-0 bg-grid-sand pointer-events-none", className)} />;
  }
  if (variant === "dots") {
    return <div className={cn("absolute inset-0 bg-dots-sand pointer-events-none", className)} />;
  }
  if (variant === "rings") {
    return (
      <svg
        className={cn("absolute inset-0 h-full w-full pointer-events-none opacity-[0.35]", className)}
        aria-hidden="true"
      >
        <defs>
          <pattern id="rings" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="30" fill="none" stroke="#B58A55" strokeOpacity="0.18" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="18" fill="none" stroke="#D2542A" strokeOpacity="0.18" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="6" fill="none" stroke="#2F5D54" strokeOpacity="0.22" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rings)" />
      </svg>
    );
  }
  if (variant === "route") {
    return (
      <svg
        className={cn("absolute inset-0 h-full w-full pointer-events-none opacity-[0.5]", className)}
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
      >
        <defs>
          <linearGradient id="routegrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#D2542A" stopOpacity="0" />
            <stop offset="0.4" stopColor="#D2542A" stopOpacity="0.55" />
            <stop offset="0.7" stopColor="#D4A958" stopOpacity="0.55" />
            <stop offset="1" stopColor="#2F5D54" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-20 320 C 200 220, 360 360, 540 280 S 880 200, 1060 260 S 1240 220, 1280 200"
          fill="none"
          stroke="url(#routegrad)"
          strokeWidth="2.4"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
        <path
          d="M-20 360 C 220 280, 420 400, 620 320 S 920 240, 1280 280"
          fill="none"
          stroke="url(#routegrad)"
          strokeWidth="1.4"
          strokeDasharray="4 10"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    );
  }
  if (variant === "topo") {
    return (
      <svg
        className={cn("absolute inset-0 h-full w-full pointer-events-none opacity-[0.4]", className)}
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        <defs>
          <radialGradient id="topograd" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D2542A" stopOpacity="0.16" />
            <stop offset="60%" stopColor="#D4A958" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#D4A958" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g fill="none" stroke="#B58A55" strokeOpacity="0.18" strokeWidth="0.7">
          {Array.from({ length: 9 }).map((_, i) => (
            <ellipse
              key={i}
              cx="400"
              cy="300"
              rx={70 + i * 38}
              ry={45 + i * 26}
              transform={`rotate(${i * 8} 400 300)`}
            />
          ))}
        </g>
        <rect width="100%" height="100%" fill="url(#topograd)" />
      </svg>
    );
  }

  // zellige default
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full pointer-events-none opacity-[0.45]", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern id="zellige" width="56" height="56" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#B58A55" strokeOpacity="0.22" strokeWidth="0.8">
            <path d="M28 4 L52 28 L28 52 L4 28 Z" />
            <path d="M28 14 L42 28 L28 42 L14 28 Z" stroke="#D2542A" strokeOpacity="0.18" />
            <circle cx="28" cy="28" r="3" fill="#2F5D54" fillOpacity="0.18" stroke="none" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#zellige)" />
    </svg>
  );
}
