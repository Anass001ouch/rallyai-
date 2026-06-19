"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: "h-6 w-auto", text: "text-lg" },
  md: { icon: "h-8 w-auto", text: "text-2xl" },
  lg: { icon: "h-11 w-auto", text: "text-3xl" },
};

export function Logo({ className, showWordmark = true, size = "md" }: LogoProps) {
  const s = sizeMap[size];
  // The exact colors from the uploaded logo:
  // Tent and Text: #F2EAE0 (Cream)
  return (
    <Link
      href="/"
      aria-label="Artouris — home"
      className={cn(
        "group inline-flex items-center gap-3 select-none",
        className
      )}
    >
      <div className="relative flex items-center justify-center transition-transform group-hover:scale-[1.03]">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("text-[#9D5225]", s.icon)} 
          aria-hidden="true"
        >
          {/* We color the tent with a specific dark terracotta to match the vibe if placed on light backgrounds, 
              but since the user's logo was white on brown, let's use the brown color for the tent symbol. */}
          <path
            d="M 10 90 L 50 10 L 90 90 L 78 90 L 50 34 L 22 90 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showWordmark && (
        <span
          className={cn(
            "font-display font-bold tracking-[-0.04em] text-[#9D5225] flex items-center",
            s.text
          )}
        >
          <svg viewBox="0 0 24 24" className="h-[0.75em] w-auto mr-[0.03em] translate-y-[-0.05em]" fill="currentColor">
            <polygon points="2,22 5.5,22 11.5,4 8,4" className="text-[#C58356]" fill="currentColor" />
            <polygon points="12.5,4 16,4 22,22 18.5,22" />
          </svg>
          rtouris
        </span>
      )}
    </Link>
  );
}
