"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = ["all", "Policy", "Science", "Lifestyle", "Business", "Health", "Growing"];

export function NewsCategoryTabs() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("category") ?? "all";

  const set = (cat: string) => {
    const next = new URLSearchParams(params.toString());
    if (cat === "all") next.delete("category");
    else next.set("category", cat);
    router.push(`/news?${next.toString()}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
      {categories.map((cat) => (
        <button key={cat} onClick={() => set(cat)}
          className={cn(
            "shrink-0 px-4 py-1.5 text-sm rounded-full border transition-colors whitespace-nowrap",
            active === cat
              ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
              : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
          )}>
          {cat === "all" ? "All" : cat}
        </button>
      ))}
    </div>
  );
}
