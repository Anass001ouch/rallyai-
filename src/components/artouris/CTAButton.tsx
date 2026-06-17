"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

function MotionWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.span
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.span>
  );
}

type Variant = "primary" | "secondary" | "ghost" | "gold" | "dark" | "outline";
type Size = "sm" | "md" | "lg";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-terracotta-500 via-terracotta-500 to-terracotta-600 text-white shadow-[0_8px_22px_-6px_rgba(178,63,30,0.55)] hover:shadow-[0_14px_32px_-6px_rgba(178,63,30,0.65)] hover:-translate-y-0.5 ring-1 ring-terracotta-600/30",
  gold: "bg-gradient-to-br from-gold-400 to-gold-500 text-navy-900 shadow-[0_8px_22px_-6px_rgba(181,138,56,0.5)] hover:-translate-y-0.5 ring-1 ring-gold-500/40",
  secondary:
    "bg-white text-navy-800 ring-1 ring-sand-200 hover:ring-terracotta-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md",
  outline:
    "bg-transparent text-navy-800 ring-1 ring-navy-200 hover:ring-terracotta-300 hover:bg-white/60",
  ghost: "bg-navy-800/5 text-navy-800 hover:bg-navy-800/10",
  dark: "bg-navy-800 text-white hover:bg-navy-900 hover:-translate-y-0.5 shadow-[0_8px_22px_-8px_rgba(22,36,53,0.6)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-[0.95rem] px-5 py-2.5 gap-2",
  lg: "text-base px-7 py-3.5 gap-2.5",
};

export function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  icon,
  iconPosition = "right",
  type = "button",
  disabled,
  ariaLabel,
}: CTAButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 ease-out will-change-transform select-none disabled:opacity-60 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const inner = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
      {!icon && iconPosition === "right" && (
        <ArrowRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  // Framer micro-interaction (subtle scale on tap) is applied via <MotionWrapper> below.

  if (href) {
    return (
      <MotionWrapper>
        <Link
          href={href}
          className={classes}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {inner}
        </Link>
      </MotionWrapper>
    );
  }

  return (
    <MotionWrapper>
      <button
        type={type}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {inner}
      </button>
    </MotionWrapper>
  );
}
