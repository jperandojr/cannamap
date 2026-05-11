"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export function StatusTabs() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("status") ?? "all";

  return (
    <div className="flex gap-1 mb-6 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-1 w-fit">
      {tabs.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => {
            const next = new URLSearchParams(params.toString());
            if (value === "all") next.delete("status");
            else next.set("status", value);
            router.push(`/admin/submissions?${next.toString()}`);
          }}
          className={cn(
            "px-4 py-1.5 text-sm rounded-md transition-colors",
            active === value
              ? "bg-[var(--primary)] text-white font-medium"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
