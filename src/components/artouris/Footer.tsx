"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Instagram, Linkedin, Mail, MapPin, ArrowRight, Send } from "lucide-react";
import { Logo } from "./Logo";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "AI Trip Planner", href: "#hero-prompt" },
      { label: "Local Marketplace", href: "#for-businesses" },
      { label: "Destination Intelligence", href: "#intelligence" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "Audiences",
    links: [
      { label: "Travelers", href: "#for-travelers" },
      { label: "Local Businesses", href: "#for-businesses" },
      { label: "Tourism Institutions", href: "#intelligence" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#why" },
      { label: "Contact", href: "#waitlist" },
      { label: "Pilot Program", href: "#waitlist" },
      { label: "Morocco launch", href: "#morocco" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

function TikTok(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.84a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.27z" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    toast.success("You're on the waitlist!", {
      description: "Watch your inbox — the Artouris team will be in touch.",
    });
    setEmail("");
  };

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-sand-200 bg-navy-900 text-white">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-32 left-1/4 h-[400px] w-[400px] rounded-full bg-terracotta-500/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-[380px] w-[380px] rounded-full bg-gold-500/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        {/* Newsletter / Waitlist banner */}
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12 lg:p-9">
          <div>
            <h3 className="font-display text-xl font-bold text-balance sm:text-2xl">
              Join the Artouris pilot.
            </h3>
            <p className="mt-2 text-sm text-white/70 max-w-md">
              Be among the first to plan smarter, more authentic trips in Morocco —
              and to help shape a platform built for local ecosystems.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-terracotta-300" /> Starting in Morocco
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-gold-300" /> Pilot launching soon
              </span>
            </div>
          </div>
          <form onSubmit={onSubscribe} className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] py-3 pl-9 pr-3 text-sm text-white placeholder:text-white/40 transition focus:border-terracotta-300/60 focus:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-terracotta-400/30"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 px-5 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-terracotta-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Join waitlist
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand */}
          <div>
            <Logo size="md" className="[&_span]:text-white" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              AI-powered travel planning for authentic Moroccan experiences — built to
              scale for authentic destinations worldwide.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <SocialLink href="#" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="TikTok">
                <TikTok className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="mailto:hello@artouris.com" label="Email">
                <Mail className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/75 transition-colors hover:text-terracotta-300"
                    >
                      <span className="h-px w-0 bg-terracotta-300 transition-all duration-200 group-hover:w-3" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/55">
            © {new Date().getFullYear()} Artouris. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/55">
            <Link href="#" className="transition-colors hover:text-white/80">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-white/80">Terms</Link>
            <Link href="#waitlist" className="transition-colors hover:text-white/80">Contact</Link>
            <span className="inline-flex items-center gap-1 text-white/40">
              <MapPin className="h-3 w-3" /> Morocco · Worldwide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-terracotta-300/40 hover:bg-terracotta-500/15 hover:text-white"
    >
      {children}
    </a>
  );
}
