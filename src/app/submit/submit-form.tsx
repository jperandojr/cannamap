"use client";

import { useActionState } from "react";
import { Building2, Sprout, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { submitListing, type SubmitState } from "./actions";
import { cn } from "@/lib/utils";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming","Washington D.C.",
];

const COUNTRIES = [
  "Netherlands","Spain","United Kingdom","United States","Canada","Australia",
  "Germany","France","Portugal","Czech Republic","Austria","Belgium","Other",
];

const fieldClass = "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors";
const labelClass = "block text-sm font-medium text-[var(--foreground)] mb-1.5";

export function SubmitForm() {
  const [type, setType] = useState<"dispensary" | "seed_bank" | null>(null);
  const [state, action, pending] = useActionState<SubmitState, FormData>(
    submitListing,
    {}
  );

  if (state.success) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)]/10 mb-4">
          <CheckCircle2 className="h-8 w-8 text-[var(--primary)]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Submission Received!</h2>
        <p className="text-[var(--muted)] max-w-md mx-auto">
          Thanks for submitting your listing. Our team will review it and reach out to you within 2–3 business days.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-8">
      {/* Type selector */}
      <div>
        <p className={labelClass}>What type of listing? <span className="text-red-500">*</span></p>
        <div className="grid grid-cols-2 gap-4">
          {([
            { value: "dispensary", label: "Dispensary", icon: Building2, desc: "Retail cannabis store or delivery service" },
            { value: "seed_bank", label: "Seed Bank", icon: Sprout, desc: "Cannabis seed retailer or breeder" },
          ] as const).map(({ value, label, icon: Icon, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => setType(value)}
              className={cn(
                "flex flex-col items-center gap-2 p-5 rounded-xl border-2 text-center transition-colors",
                type === value
                  ? "border-[var(--primary)] bg-[var(--primary)]/10"
                  : "border-[var(--border)] hover:border-[var(--primary)]/50"
              )}
            >
              <Icon className={cn("h-6 w-6", type === value ? "text-[var(--primary)]" : "text-[var(--muted)]")} />
              <span className={cn("font-semibold text-sm", type === value ? "text-[var(--primary)]" : "text-[var(--foreground)]")}>{label}</span>
              <span className="text-xs text-[var(--muted)]">{desc}</span>
            </button>
          ))}
        </div>
        <input type="hidden" name="type" value={type ?? ""} />
      </div>

      {type && (
        <>
          {/* Common fields */}
          <div className="space-y-5">
            <div>
              <label className={labelClass}>
                {type === "dispensary" ? "Dispensary" : "Seed Bank"} Name <span className="text-red-500">*</span>
              </label>
              <input name="name" required placeholder={`e.g. ${type === "dispensary" ? "Green Leaf Dispensary" : "Royal Queen Seeds"}`} className={fieldClass} />
            </div>

            <div>
              <label className={labelClass}>Description <span className="text-red-500">*</span></label>
              <textarea name="description" required rows={4}
                placeholder="Describe your business, what makes it unique, products or services offered..."
                className={cn(fieldClass, "resize-none")} />
            </div>

            <div>
              <label className={labelClass}>Website URL</label>
              <input name="website" type="url" placeholder="https://example.com" className={fieldClass} />
            </div>
          </div>

          {/* Dispensary-specific */}
          {type === "dispensary" && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] pb-2 border-b border-[var(--border)]">Location</h3>
              <div>
                <label className={labelClass}>Street Address <span className="text-red-500">*</span></label>
                <input name="address" required placeholder="123 Main St" className={fieldClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City <span className="text-red-500">*</span></label>
                  <input name="city" required placeholder="Denver" className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass}>State <span className="text-red-500">*</span></label>
                  <select name="state" required defaultValue="" className={fieldClass}>
                    <option value="" disabled>Select state</option>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Seed bank-specific */}
          {type === "seed_bank" && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] pb-2 border-b border-[var(--border)]">Location</h3>
              <div>
                <label className={labelClass}>Country <span className="text-red-500">*</span></label>
                <select name="country" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>Select country</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Contact & notes */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] pb-2 border-b border-[var(--border)]">Contact</h3>
            <div>
              <label className={labelClass}>Contact Email <span className="text-red-500">*</span></label>
              <input name="contact_email" type="email" required placeholder="you@example.com" className={fieldClass} />
              <p className="text-xs text-[var(--muted)] mt-1">We'll reach out when your listing is reviewed.</p>
            </div>
            <div>
              <label className={labelClass}>Additional Notes</label>
              <textarea name="notes" rows={3}
                placeholder="Anything else you'd like us to know..."
                className={cn(fieldClass, "resize-none")} />
            </div>
          </div>

          {state.error && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] disabled:opacity-60 transition-colors"
          >
            {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : "Submit Listing"}
          </button>
        </>
      )}
    </form>
  );
}
