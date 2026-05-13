"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

interface Props {
  action: () => Promise<void>;
  label?: string;
}

export function DeleteButton({ action, label = "item" }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Delete this ${label}? This cannot be undone.`)) return;
    startTransition(() => action());
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
