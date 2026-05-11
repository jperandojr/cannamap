"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const difficulties = ["all", "beginner", "intermediate", "advanced"];
const categories = ["all", "Getting Started", "Training", "Grow Mediums", "Plant Health", "Harvest"];

const difficultyStyle: Record<string, string> = {
  all: "border-[var(--border)] text-[var(--muted)]",
  beginner: "border-green-500/40 text-green-700 bg-green-500/10",
  intermediate: "border-yellow-500/40 text-yellow-700 bg-yellow-500/10",
  advanced: "border-red-500/40 text-red-700 bg-red-500/10",
};

const difficultyActive: Record<string, string> = {
  all: "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-medium",
  beginner: "border-green-500 bg-green-500/20 text-green-700 font-medium",
  intermediate: "border-yellow-500 bg-yellow-500/20 text-yellow-700 font-medium",
  advanced: "border-red-500 bg-red-500/20 text-red-700 font-medium",
};

export function GrowingTipFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const activeDiff = params.get("difficulty") ?? "all";
  const activeCat = params.get("category") ?? "all";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete(key);
    else next.set(key, value);
    router.push(`/growing-tips?${next.toString()}`);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {difficulties.map((d) => (
          <button key={d} onClick={() => set("difficulty", d)}
            className={cn(
              "px-4 py-1.5 text-sm rounded-full border transition-colors capitalize",
              activeDiff === d ? difficultyActive[d] : `${difficultyStyle[d]} hover:border-[var(--primary)] hover:text-[var(--primary)]`
            )}>
            {d === "all" ? "All Levels" : d}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button key={cat} onClick={() => set("category", cat)}
            className={cn(
              "shrink-0 px-4 py-1.5 text-sm rounded-full border transition-colors whitespace-nowrap",
              activeCat === cat
                ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
            )}>
            {cat === "all" ? "All Topics" : cat}
          </button>
        ))}
      </div>
    </>
  );
}
