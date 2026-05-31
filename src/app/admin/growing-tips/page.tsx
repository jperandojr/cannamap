import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/app/admin/delete-button";
import { formatDate } from "@/lib/utils";
import { deleteGrowingTip } from "./actions";
import type { GrowingTip } from "@/lib/types";

export const metadata: Metadata = { title: "Growing Tips — Admin" };

export default async function AdminGrowingTipsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("growing_tips")
    .select("*")
    .order("created_at", { ascending: false });
  const tips = (data ?? []) as GrowingTip[];

  const difficultyVariant: Record<string, "default" | "outline" | "success"> = {
    beginner: "success",
    intermediate: "default",
    advanced: "outline",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Growing Tips</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{tips.length} total</p>
        </div>
        <Link
          href="/admin/growing-tips/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary)]/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Tip
        </Link>
      </div>

      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden">
        {tips.length === 0 ? (
          <div className="text-center py-16 text-[var(--muted)]">
            <p className="font-medium mb-1">No growing tips yet</p>
            <p className="text-sm">Add your first tip to get started.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Title</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Difficulty</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Category</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Status</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Published</th>
                <th className="text-right px-4 py-3 font-medium text-[var(--muted)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {tips.map((tip) => (
                <tr key={tip.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)] max-w-xs truncate">
                    {tip.title}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={difficultyVariant[tip.difficulty] ?? "default"} className="capitalize">
                      {tip.difficulty}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{tip.category}</td>
                  <td className="px-4 py-3">
                    {tip.published_at && new Date(tip.published_at) <= new Date() ? (
                      <Badge variant="success">Published</Badge>
                    ) : tip.published_at ? (
                      <Badge variant="outline">Scheduled</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {tip.published_at ? formatDate(tip.published_at) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/growing-tips/${tip.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <DeleteButton action={deleteGrowingTip.bind(null, tip.id)} label="growing tip" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
