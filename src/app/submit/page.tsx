import type { Metadata } from "next";
import { Building2, Clock, Shield, Star } from "lucide-react";
import { SubmitForm } from "./submit-form";

export const metadata: Metadata = {
  title: "Submit a Listing",
  description: "Submit your dispensary or seed bank to be listed on GrowingWeed.com.",
};

const benefits = [
  { icon: Star, text: "Reach thousands of cannabis consumers daily" },
  { icon: Shield, text: "Verified badge for trusted businesses" },
  { icon: Clock, text: "Quick review — usually within 2–3 business days" },
  { icon: Building2, text: "Free to list, no hidden fees" },
];

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Submit a Listing</h1>
          <p className="text-[var(--muted)]">
            Add your dispensary or seed bank to the GrowingWeed.com directory. Our team reviews every submission.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
              <Icon className="h-4 w-4 text-[var(--primary)] shrink-0 mt-0.5" />
              <span className="text-xs text-[var(--muted)]">{text}</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <SubmitForm />
        </div>
      </div>
    </div>
  );
}
