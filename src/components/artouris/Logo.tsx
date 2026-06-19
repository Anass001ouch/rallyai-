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
  return (
    <Link
      href="/"
      aria-label="Artouris — home"
      className={cn(
        "group inline-flex items-center select-none transition-transform hover:scale-[1.02]",
        className
      )}
    >
      <img 
        src="/logo.png" 
        alt="Artouris Logo" 
        className={cn("object-contain", s.icon)} 
      />
    </Link>
  );
}
