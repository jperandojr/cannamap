"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

const strainTypes = ["all", "indica", "sativa", "hybrid"];
const effectsList = ["Relaxed", "Euphoric", "Happy", "Creative", "Energetic", "Sleepy", "Focused", "Uplifted"];
const thcRanges = [
  { label: "Under 10%", value: "under10" },
  { label: "10–15%", value: "10-15" },
  { label: "15–20%", value: "15-20" },
  { label: "20–25%", value: "20-25" },
  { label: "25%+", value: "25plus" },
];

export function StrainFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const set = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === "" || value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    next.delete("page");
    router.push(`/strains?${next.toString()}`);
  }, [params, router]);

  const activeType = params.get("type") ?? "all";
  const activeEffect = params.get("effect") ?? "";
  const activeThc = params.get("thc") ?? "";
  const activeSort = params.get("sort") ?? "";
  const activeQ = params.get("q") ?? "";

  const hasFilters = activeType !== "all" || activeEffect || activeThc || activeQ;

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
              placeholder="Search strains..."
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-9 pr-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={() => router.push("/strains")}
          className="flex items-center gap-1.5 text-xs text-[var(--primary)] hover:underline"
        >
          <X className="h-3 w-3" /> Clear all filters
        </button>
      )}

      {/* Strain Type */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
          <Filter className="h-3.5 w-3.5" /> Strain Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {strainTypes.map((type) => (
            <button
              key={type}
              onClick={() => set("type", type)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-lg border transition-colors capitalize",
                activeType === type
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              )}
            >
              {type === "all" ? "All" : type}
            </button>
          ))}
        </div>
      </div>

      {/* Effects */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Effect</h3>
        <div className="flex flex-wrap gap-2">
          {effectsList.map((effect) => (
            <button
              key={effect}
              onClick={() => set("effect", activeEffect === effect ? null : effect)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-full border transition-colors",
                activeEffect === effect
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              )}
            >
              {effect}
            </button>
          ))}
        </div>
      </div>

      {/* THC Range */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">THC Content</h3>
        <div className="space-y-2">
          {thcRanges.map((range) => (
            <label key={range.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeThc === range.value}
                onChange={() => set("thc", activeThc === range.value ? null : range.value)}
                className="rounded border-[var(--border)] accent-[var(--primary)]"
              />
              <span className="text-sm text-[var(--muted)]">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Sort By</h3>
        <select
          value={activeSort}
          onChange={(e) => set("sort", e.target.value || null)}
          className="w-full text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
        >
          <option value="">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="thc">Highest THC</option>
        </select>
      </div>
    </div>
  );
}
