"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { SeedBank } from "@/lib/types";

interface Props {
  action: (_: unknown, formData: FormData) => Promise<{ error: string } | undefined>;
  initialData?: SeedBank;
}

export function SeedBankForm({ action, initialData }: Props) {
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
            placeholder="e.g. Barney's Farm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Description</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={d?.description}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] resize-none"
            placeholder="Describe this seed bank…"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Country</label>
          <input
            name="country"
            defaultValue={d?.country}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="Netherlands"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Website</label>
          <input
            name="website"
            type="url"
            defaultValue={d?.website}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Logo URL</label>
          <input
            name="logo_url"
            type="url"
            defaultValue={d?.logo_url}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Strain Count</label>
          <input
            name="strain_count"
            type="number"
            min={0}
            defaultValue={d?.strain_count ?? 0}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Ships to <span className="text-xs font-normal text-[var(--muted)]">(comma-separated countries)</span>
          </label>
          <input
            name="shipping_countries"
            defaultValue={d?.shipping_countries?.join(", ")}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="e.g. US, Canada, UK, Germany"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              name="verified"
              type="checkbox"
              defaultChecked={d?.verified}
              className="h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <span className="text-sm font-medium text-[var(--foreground)]">Verified seed bank</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-[var(--border)]">
        <Link
          href="/admin/seed-banks"
          className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[var(--primary)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-60"
        >
          {isPending ? "Saving…" : d ? "Update Seed Bank" : "Create Seed Bank"}
        </button>
      </div>
    </form>
  );
}
