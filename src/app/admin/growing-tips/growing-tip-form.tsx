"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { GrowingTip } from "@/lib/types";

interface Props {
  action: (_: unknown, formData: FormData) => Promise<{ error: string } | undefined>;
  initialData?: GrowingTip;
}

const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
const CATEGORIES = ["Basics", "Lighting", "Nutrients", "Training", "Harvesting", "Pests", "Indoor", "Outdoor", "Hydroponics", "Genetics"];

export function GrowingTipForm({ action, initialData }: Props) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const d = initialData;

  const publishedValue = d?.published_at
    ? new Date(d.published_at).toISOString().slice(0, 16)
    : "";

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
            Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            required
            defaultValue={d?.title}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="e.g. How to Top Your Cannabis Plant"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Difficulty</label>
          <select
            name="difficulty"
            defaultValue={d?.difficulty ?? "beginner"}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d} className="capitalize">{d.charAt(0).toUpperCase() + d.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Category</label>
          <select
            name="category"
            defaultValue={d?.category ?? "Basics"}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Read Time <span className="text-xs font-normal text-[var(--muted)]">(minutes)</span>
          </label>
          <input
            name="read_time"
            type="number"
            min={1}
            defaultValue={d?.read_time ?? 5}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Author Name</label>
          <input
            name="author_name"
            defaultValue={d?.author_name}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="Jane Doe"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Excerpt</label>
          <textarea
            name="excerpt"
            rows={2}
            defaultValue={d?.excerpt}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] resize-none"
            placeholder="Short summary shown in listings"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Content</label>
          <textarea
            name="content"
            rows={12}
            defaultValue={d?.content}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] resize-y font-mono"
            placeholder="Full guide content (HTML or plain text)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Cover Image URL</label>
          <input
            name="image_url"
            type="url"
            defaultValue={d?.image_url}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Publish Date <span className="text-xs font-normal text-[var(--muted)]">(leave blank to save as draft)</span>
          </label>
          <input
            name="published_at"
            type="datetime-local"
            defaultValue={publishedValue}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-[var(--border)]">
        <Link
          href="/admin/growing-tips"
          className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[var(--primary)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-60"
        >
          {isPending ? "Saving…" : d ? "Update Tip" : "Create Tip"}
        </button>
      </div>
    </form>
  );
}
