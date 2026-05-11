"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const states = [
  { label: "All States", value: "all" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Oregon", value: "OR" },
  { label: "Washington", value: "WA" },
  { label: "Nevada", value: "NV" },
  { label: "Arizona", value: "AZ" },
  { label: "Michigan", value: "MI" },
  { label: "Illinois", value: "IL" },
  { label: "Massachusetts", value: "MA" },
  { label: "New York", value: "NY" },
];

export function DispensaryFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const set = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === "" || value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    router.push(`/dispensaries?${next.toString()}`);
  }, [params, router]);

  const activeState = params.get("state") ?? "all";
  const activeSort = params.get("sort") ?? "";
  const activeQ = params.get("q") ?? "";

  const hasFilters = activeState !== "all" || activeQ;

  return (
    <div className="sticky top-24 space-y-6">
      {/* Search */}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value.trim();
            set("q", q || null);
          }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)] pointer-events-none" />
            <input
              name="q"
              type="search"
              defaultValue={activeQ}
              placeholder="Search dispensaries..."
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-9 pr-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={() => router.push("/dispensaries")}
          className="flex items-center gap-1.5 text-xs text-[var(--primary)] hover:underline"
        >
          <X className="h-3 w-3" /> Clear all filters
        </button>
      )}

      {/* State */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">State</h3>
        <select
          value={activeState}
          onChange={(e) => set("state", e.target.value)}
          className="w-full text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
        >
          {states.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Sort By</h3>
        <select
          value={activeSort}
          onChange={(e) => set("sort", e.target.value || null)}
          className="w-full text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
        >
          <option value="">Most Reviews</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Verified only */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Verified</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={params.get("verified") === "1"}
            onChange={(e) => set("verified", e.target.checked ? "1" : null)}
            className="rounded border-[var(--border)] accent-[var(--primary)]"
          />
          <span className="text-sm text-[var(--muted)]">Verified only</span>
        </label>
      </div>
    </div>
  );
}
