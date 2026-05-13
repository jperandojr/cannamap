"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Strain } from "@/lib/types";

interface Props {
  action: (_: unknown, formData: FormData) => Promise<{ error: string } | undefined>;
  initialData?: Strain;
}

const STRAIN_TYPES = ["indica", "sativa", "hybrid"] as const;

export function StrainForm({ action, initialData }: Props) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const d = initialData;

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            required
            defaultValue={d?.name}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="e.g. Blue Dream"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            required
            defaultValue={d?.type ?? "hybrid"}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          >
            {STRAIN_TYPES.map((t) => (
              <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Image URL
          </label>
          <input
            name="image_url"
            type="url"
            defaultValue={d?.image_url}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="https://..."
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            defaultValue={d?.description}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] resize-none"
            placeholder="Describe this strain…"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">THC Min (%)</label>
          <input
            name="thc_min"
            type="number"
            min={0}
            max={100}
            step={0.1}
            defaultValue={d?.thc_min ?? 0}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">THC Max (%)</label>
          <input
            name="thc_max"
            type="number"
            min={0}
            max={100}
            step={0.1}
            defaultValue={d?.thc_max ?? 0}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">CBD Min (%)</label>
          <input
            name="cbd_min"
            type="number"
            min={0}
            max={100}
            step={0.1}
            defaultValue={d?.cbd_min ?? 0}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">CBD Max (%)</label>
          <input
            name="cbd_max"
            type="number"
            min={0}
            max={100}
            step={0.1}
            defaultValue={d?.cbd_max ?? 0}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Effects <span className="text-xs font-normal text-[var(--muted)]">(comma-separated)</span>
          </label>
          <input
            name="effects"
            defaultValue={d?.effects?.join(", ")}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="e.g. Happy, Relaxed, Creative"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Flavors <span className="text-xs font-normal text-[var(--muted)]">(comma-separated)</span>
          </label>
          <input
            name="flavors"
            defaultValue={d?.flavors?.join(", ")}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="e.g. Berry, Sweet, Earthy"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Medical Uses <span className="text-xs font-normal text-[var(--muted)]">(comma-separated)</span>
          </label>
          <input
            name="medical_uses"
            defaultValue={d?.medical_uses?.join(", ")}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="e.g. Depression, Anxiety, Pain"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-[var(--border)]">
        <Link
          href="/admin/strains"
          className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[var(--primary)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-60"
        >
          {isPending ? "Saving…" : d ? "Update Strain" : "Create Strain"}
        </button>
      </div>
    </form>
  );
}
