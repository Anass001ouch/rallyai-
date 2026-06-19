"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { box: "h-7 w-7", text: "text-lg" },
  md: { box: "h-9 w-9", text: "text-xl" },
  lg: { box: "h-11 w-11", text: "text-2xl" },
};

export function Logo({ className, showWordmark = true, size = "md" }: LogoProps) {
  const s = sizeMap[size];
  return (
    <Link
      href="/"
      aria-label="Artouris — home"
      className={cn(
        "group inline-flex items-center gap-2.5 select-none",
        className
      )}
    >
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-terracotta-500 via-terracotta-400 to-gold-400 shadow-sm ring-1 ring-terracotta-600/20 transition-transform group-hover:scale-[1.03]",
          s.box
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[58%] w-[58%]"
          aria-hidden="true"
        >
          <path
            d="M5 24 L5 8 L9 8 L9 18 L18 8 L23 8 L13 18 L23 24 L17 24 L10 17 L9 19 L9 24 Z"
            fill="#FBF7F0"
          />
          <circle cx="25" cy="11" r="2.6" fill="#2F5D54" />
        </svg>
      </span>
      {showWordmark && (
        <span
          className={cn(
            "font-display font-extrabold tracking-tight text-navy-800",
            s.text
          )}
        >
          Artouris
        </span>
      )}
    </Link>
  );
}
