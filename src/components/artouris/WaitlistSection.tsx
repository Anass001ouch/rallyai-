"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Compass,
  Store,
  Landmark,
  CheckCircle2,
  Mail,
  User,
  MapPin,
  Briefcase,
  MessageSquare,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { CTAButton } from "./CTAButton";
import { MoroccanPattern } from "./MoroccanPattern";
import {
  TRAVELER_TRAVEL_STYLES,
  BUSINESS_CATEGORIES_SELECT,
  MOROCCO_REGIONS,
} from "@/lib/artouris/content";
import { cn } from "@/lib/utils";

type TabKey = "traveler" | "business" | "institution";

const TABS: { key: TabKey; label: string; icon: LucideIcon; description: string }[] = [
  {
    key: "traveler",
    label: "I'm a traveler",
    icon: Compass,
    description: "Be among the first to plan an authentic Morocco trip with AI.",
  },
  {
    key: "business",
    label: "I'm a local business",
    icon: Store,
    description: "Get listed and appear in relevant AI recommendations.",
  },
  {
    key: "institution",
    label: "I'm an institution",
    icon: Landmark,
    description: "Request a demo of destination intelligence for your region.",
  },
];

export function WaitlistSection() {
  const [tab, setTab] = useState<TabKey>("traveler");

  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <MoroccanPattern variant="rings" className="opacity-20" />
        <div className="absolute top-1/3 -left-20 h-[400px] w-[400px] rounded-full bg-terracotta-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-[380px] w-[380px] rounded-full bg-gold-500/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Join the pilot
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.85rem]">
              Be among the first to{" "}
              <span className="bg-gradient-to-r from-terracotta-300 via-gold-300 to-tile-green/80 bg-clip-text text-transparent">
                try Artouris.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 text-pretty sm:text-lg">
              Join the pilot and start planning smarter, more authentic trips in Morocco —
              or get listed as a local business, or request a destination intelligence demo.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.05}>
          <div
            role="tablist"
            aria-label="Choose your role"
            className="mt-10 grid gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur sm:grid-cols-3"
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${t.key}`}
                  id={`tab-${t.key}`}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200",
                    active
                      ? "bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white shadow-lg"
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      active ? "bg-white/20" : "bg-white/[0.06]"
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold leading-tight">{t.label}</span>
                    <span
                      className={cn(
                        "mt-0.5 block text-[11px] leading-snug",
                        active ? "text-white/85" : "text-white/55"
                      )}
                    >
                      {t.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Panel */}
        <ScrollReveal delay={0.1} className="mt-5">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {tab === "traveler" && <TravelerForm />}
                {tab === "business" && <BusinessForm />}
                {tab === "institution" && <InstitutionForm />}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Footer microcopy */}
        <ScrollReveal delay={0.15}>
          <p className="mt-5 text-center text-xs text-white/55">
            By joining, you agree to be contacted by the Artouris team. We respect your
            privacy and will never share your data.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ----------------------------- Shared field ----------------------------- */

function Field({
  label,
  icon: Icon,
  children,
  required,
  htmlFor,
}: {
  label: string;
  icon: LucideIcon;
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/70">
        <Icon className="h-3.5 w-3.5" />
        {label}
        {required && <span className="text-terracotta-300">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 transition-all focus:border-terracotta-300/60 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-terracotta-400/30";

const selectClass = cn(inputClass, "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-9");
const chevronSvg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff80' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

function SuccessState({ message }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-tile-green/30 bg-tile-green/10 p-8 text-center"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-tile-green to-tile-green/70 text-white shadow-lg">
        <CheckCircle2 className="h-7 w-7" />
      </span>
      <h4 className="font-display text-lg font-bold text-white">
        {message ?? "Thank you. The Artouris team will contact you soon."}
      </h4>
      <p className="max-w-md text-sm text-white/70">
        We're onboarding pilot members in waves. Watch your inbox — and feel free to
        tell a friend who'd love this.
      </p>
      <CTAButton href="#top" size="sm" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
        Back to top
      </CTAButton>
    </motion.div>
  );
}

function useFormSubmit() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only — simulate async submit
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
    toast.success("You're on the list!", {
      description: "The Artouris team will be in touch soon.",
    });
  };
  return { submitted, onSubmit };
}

/* ----------------------------- Traveler ----------------------------- */

function TravelerForm() {
  const { submitted, onSubmit } = useFormSubmit();
  if (submitted) return <SuccessState />;

  return (
    <form
      id="panel-traveler"
      role="tabpanel"
      aria-labelledby="tab-traveler"
      onSubmit={onSubmit}
      className="grid gap-4 sm:grid-cols-2"
    >
      <Field label="Name" icon={User} htmlFor="t-name" required>
        <input id="t-name" name="name" required className={inputClass} placeholder="Your full name" autoComplete="name" />
      </Field>
      <Field label="Email" icon={Mail} htmlFor="t-email" required>
        <input id="t-email" name="email" type="email" required className={inputClass} placeholder="you@example.com" autoComplete="email" />
      </Field>
      <Field label="Country" icon={MapPin} htmlFor="t-country">
        <input id="t-country" name="country" className={inputClass} placeholder="Where are you traveling from?" autoComplete="country-name" />
      </Field>
      <Field label="Travel interest" icon={Compass} htmlFor="t-interest">
        <select
          id="t-interest"
          name="interest"
          className={selectClass}
          style={{ backgroundImage: chevronSvg }}
          defaultValue=""
        >
          <option value="" disabled className="bg-navy-800">Choose a style…</option>
          {TRAVELER_TRAVEL_STYLES.map((s) => (
            <option key={s} value={s} className="bg-navy-800">
              {s}
            </option>
          ))}
        </select>
      </Field>
      <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-white/55">
          We'll send you early access and a personal invitation to try the planner.
        </p>
        <CTAButton type="submit" size="md" icon={<Sparkles className="h-4 w-4" />} iconPosition="left">
          Join the pilot
        </CTAButton>
      </div>
    </form>
  );
}

/* ----------------------------- Business ----------------------------- */

function BusinessForm() {
  const { submitted, onSubmit } = useFormSubmit();
  if (submitted) return <SuccessState />;

  return (
    <form
      id="panel-business"
      role="tabpanel"
      aria-labelledby="tab-business"
      onSubmit={onSubmit}
      className="grid gap-4 sm:grid-cols-2"
    >
      <Field label="Business name" icon={Store} htmlFor="b-name" required>
        <input id="b-name" name="business" required className={inputClass} placeholder="e.g. Riad Anbar" />
      </Field>
      <Field label="Category" icon={Briefcase} htmlFor="b-category" required>
        <select
          id="b-category"
          name="category"
          required
          className={selectClass}
          style={{ backgroundImage: chevronSvg }}
          defaultValue=""
        >
          <option value="" disabled className="bg-navy-800">Choose a category…</option>
          {BUSINESS_CATEGORIES_SELECT.map((c) => (
            <option key={c} value={c} className="bg-navy-800">
              {c}
            </option>
          ))}
        </select>
      </Field>
      <Field label="City / region" icon={MapPin} htmlFor="b-region" required>
        <select
          id="b-region"
          name="region"
          required
          className={selectClass}
          style={{ backgroundImage: chevronSvg }}
          defaultValue=""
        >
          <option value="" disabled className="bg-navy-800">Choose a region…</option>
          {MOROCCO_REGIONS.map((r) => (
            <option key={r} value={r} className="bg-navy-800">
              {r}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Contact email" icon={Mail} htmlFor="b-email" required>
        <input id="b-email" name="email" type="email" required className={inputClass} placeholder="contact@yourbusiness.ma" autoComplete="email" />
      </Field>
      <Field label="Short description" icon={MessageSquare} htmlFor="b-desc">
        <textarea
          id="b-desc"
          name="description"
          rows={3}
          className={cn(inputClass, "resize-none scrollbar-thin")}
          placeholder="What makes your experience authentic? (1–2 sentences)"
        />
      </Field>
      <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-white/55">
          Get matched with travelers whose intention fits your offer.
        </p>
        <CTAButton type="submit" size="md" icon={<Store className="h-4 w-4" />} iconPosition="left">
          List your business
        </CTAButton>
      </div>
    </form>
  );
}

/* ----------------------------- Institution ----------------------------- */

function InstitutionForm() {
  const { submitted, onSubmit } = useFormSubmit();
  if (submitted) return <SuccessState />;

  return (
    <form
      id="panel-institution"
      role="tabpanel"
      aria-labelledby="tab-institution"
      onSubmit={onSubmit}
      className="grid gap-4 sm:grid-cols-2"
    >
      <Field label="Organization name" icon={Landmark} htmlFor="i-org" required>
        <input id="i-org" name="organization" required className={inputClass} placeholder="e.g. Regional Tourism Council" />
      </Field>
      <Field label="Your role" icon={Briefcase} htmlFor="i-role" required>
        <input id="i-role" name="role" required className={inputClass} placeholder="e.g. Destination Manager" />
      </Field>
      <Field label="Email" icon={Mail} htmlFor="i-email" required>
        <input id="i-email" name="email" type="email" required className={inputClass} placeholder="you@organization.ma" autoComplete="email" />
      </Field>
      <Field label="Region / destination" icon={MapPin} htmlFor="i-region" required>
        <select
          id="i-region"
          name="region"
          required
          className={selectClass}
          style={{ backgroundImage: chevronSvg }}
          defaultValue=""
        >
          <option value="" disabled className="bg-navy-800">Choose a region…</option>
          {MOROCCO_REGIONS.map((r) => (
            <option key={r} value={r} className="bg-navy-800">
              {r}
            </option>
          ))}
          <option value="national" className="bg-navy-800">National (multiple regions)</option>
        </select>
      </Field>
      <Field label="Message" icon={MessageSquare} htmlFor="i-message">
        <textarea
          id="i-message"
          name="message"
          rows={3}
          className={cn(inputClass, "resize-none scrollbar-thin sm:col-span-2")}
          placeholder="What would you like to understand about tourism demand in your territory?"
        />
      </Field>
      <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-white/55">
          We'll set up a personalized walkthrough of the intelligence dashboard.
        </p>
        <CTAButton type="submit" size="md" icon={<Landmark className="h-4 w-4" />} iconPosition="left">
          Request a demo
        </CTAButton>
      </div>
    </form>
  );
}
