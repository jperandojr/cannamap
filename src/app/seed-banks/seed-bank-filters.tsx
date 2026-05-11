"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const countries = ["all", "Netherlands", "Spain", "United Kingdom", "United States", "Canada"];

export function SeedBankFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const set = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    router.push(`/seed-banks?${next.toString()}`);
  }, [params, router]);

  const activeCountry = params.get("country") ?? "all";
  const activeSort = params.get("sort") ?? "";
  const activeQ = params.get("q") ?? "";
  const hasFilters = activeCountry !== "all" || activeQ;

  return (
    <div className="sticky top-24 space-y-6">
      <form onSubmit={(e) => { e.preventDefault(); const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value.trim(); set("q", q || null); }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)] pointer-events-none" />
          <input name="q" type="search" defaultValue={activeQ} placeholder="Search seed banks..."
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-9 pr-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors" />
        </div>
      </form>

      {hasFilters && (
        <button onClick={() => router.push("/seed-banks")} className="flex items-center gap-1.5 text-xs text-[var(--primary)] hover:underline">
          <X className="h-3 w-3" /> Clear filters
        </button>
      )}

      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Country</h3>
        <div className="space-y-1.5">
          {countries.map((c) => (
            <button key={c} onClick={() => set("country", c)}
              className={cn("w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors",
                activeCountry === c
                  ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                  : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              )}>
              {c === "all" ? "All Countries" : c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={params.get("verified") === "1"}
            onChange={(e) => set("verified", e.target.checked ? "1" : null)}
            className="rounded border-[var(--border)] accent-[var(--primary)]" />
          <span className="text-sm text-[var(--muted)]">Verified only</span>
        </label>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Sort By</h3>
        <select value={activeSort} onChange={(e) => set("sort", e.target.value || null)}
          className="w-full text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--primary)]">
          <option value="">Highest Rated</option>
          <option value="strains">Most Strains</option>
          <option value="reviews">Most Reviews</option>
        </select>
      </div>
    </div>
  );
}
