"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowUp } from "lucide-react";
import { CTAButton } from "./CTAButton";

/**
 * Mobile sticky CTA bar.
 * Shows after the hero is scrolled out, hidden when the waitlist section is in view.
 */
export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const heroEnd = (window.innerHeight || 800) * 0.85;
      // Show after scrolling past 70% of hero
      setVisible(y > heroEnd);
      // Hide when within 1.2x viewport of the bottom (footer / waitlist visible)
      const distanceFromBottom =
        document.documentElement.scrollHeight - (y + window.innerHeight);
      setAtBottom(distanceFromBottom < 220);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const show = visible && !atBottom;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          style={{
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          <div className="mx-3 mb-3 flex items-center gap-2 rounded-2xl border border-sand-200 bg-white/95 p-2 shadow-[0_8px_30px_-8px_rgba(22,36,53,0.25)] backdrop-blur-xl">
            <CTAButton
              href="#hero-prompt"
              size="sm"
              className="flex-1"
              icon={<Sparkles className="h-4 w-4" />}
              iconPosition="left"
            >
              Plan my trip
            </CTAButton>
            <a
              href="#waitlist"
              aria-label="Join the pilot"
              className="inline-flex h-10 items-center justify-center rounded-full border border-sand-200 bg-white px-4 text-xs font-semibold text-navy-700 shadow-sm transition hover:bg-sand-50"
            >
              Join pilot
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 bg-white text-navy-700 shadow-sm transition hover:bg-sand-50"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
