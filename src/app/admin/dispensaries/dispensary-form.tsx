"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Dispensary } from "@/lib/types";

interface Props {
  action: (_: unknown, formData: FormData) => Promise<{ error: string } | undefined>;
  initialData?: Dispensary;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export function DispensaryForm({ action, initialData }: Props) {
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
            placeholder="e.g. Green Leaf Dispensary"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Description</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={d?.description}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] resize-none"
            placeholder="Describe this dispensary…"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Address</label>
          <input
            name="address"
            defaultValue={d?.address}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="123 Main St"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">City</label>
          <input
            name="city"
            defaultValue={d?.city}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="Denver"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">State</label>
          <input
            name="state"
            defaultValue={d?.state}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="CO"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">ZIP</label>
          <input
            name="zip"
            defaultValue={d?.zip}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="80202"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Country</label>
          <input
            name="country"
            defaultValue={d?.country ?? "US"}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="US"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Phone</label>
          <input
            name="phone"
            type="tel"
            defaultValue={d?.phone}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="+1 (555) 000-0000"
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

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Amenities <span className="text-xs font-normal text-[var(--muted)]">(comma-separated)</span>
          </label>
          <input
            name="amenities"
            defaultValue={d?.amenities?.join(", ")}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="e.g. ATM, Parking, Delivery"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Image URLs <span className="text-xs font-normal text-[var(--muted)]">(comma-separated)</span>
          </label>
          <input
            name="images"
            defaultValue={d?.images?.join(", ")}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="https://..., https://..."
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
            Hours <span className="text-xs font-normal text-[var(--muted)]">(e.g. 9:00 AM – 9:00 PM or Closed)</span>
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DAYS.map((day) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-sm text-[var(--muted)] w-20 shrink-0">{day}</span>
                <input
                  name={`hours_${day}`}
                  defaultValue={d?.hours?.[day]}
                  className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                  placeholder="9:00 AM – 9:00 PM"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              name="verified"
              type="checkbox"
              defaultChecked={d?.verified}
              className="h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <span className="text-sm font-medium text-[var(--foreground)]">Verified dispensary</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-[var(--border)]">
        <Link
          href="/admin/dispensaries"
          className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[var(--primary)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-60"
        >
          {isPending ? "Saving…" : d ? "Update Dispensary" : "Create Dispensary"}
        </button>
      </div>
    </form>
  );
}
