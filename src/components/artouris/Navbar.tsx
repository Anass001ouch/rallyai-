"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { CTAButton } from "./CTAButton";
import { NAV_LINKS } from "@/lib/artouris/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong border-b border-sand-200/70 shadow-[0_4px_24px_-12px_rgba(22,36,53,0.18)]" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 sm:h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo size="md" />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-navy-700 transition-colors hover:text-terracotta-600 hover:bg-terracotta-50/60"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            href="#waitlist"
            className="text-sm font-medium text-navy-700 hover:text-terracotta-600 transition-colors px-3 py-2"
          >
            Join waitlist
          </Link>
          <CTAButton href="#hero-prompt" size="sm" icon={<Sparkles className="h-4 w-4" />} iconPosition="left">
            Plan my trip
          </CTAButton>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sand-200 bg-white/70 text-navy-800 shadow-sm backdrop-blur transition hover:bg-white"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden glass-strong border-b border-sand-200 shadow-xl"
          >
            <nav
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-navy-800 transition-colors hover:bg-terracotta-50 hover:text-terracotta-700"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="#waitlist"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-navy-700 transition-colors hover:bg-terracotta-50 hover:text-terracotta-700"
              >
                Join waitlist
              </Link>
              <div className="mt-2">
                <CTAButton
                  href="#hero-prompt"
                  size="md"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Plan my trip
                </CTAButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
