import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getStrains } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/app/admin/delete-button";
import { deleteStrain } from "./actions";

export const metadata: Metadata = { title: "Strains — Admin" };

export default async function AdminStrainsPage() {
  const strains = await getStrains();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Strains</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{strains.length} total</p>
        </div>
        <Link
          href="/admin/strains/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary)]/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Strain
        </Link>
      </div>

      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden">
        {strains.length === 0 ? (
          <div className="text-center py-16 text-[var(--muted)]">
            <p className="font-medium mb-1">No strains yet</p>
            <p className="text-sm">Add your first strain to get started.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Name</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Type</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">THC</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">CBD</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Rating</th>
                <th className="text-right px-4 py-3 font-medium text-[var(--muted)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {strains.map((s) => (
                <tr key={s.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{s.name}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="capitalize">{s.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {s.thc_min}–{s.thc_max}%
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {s.cbd_min}–{s.cbd_max}%
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {s.rating?.toFixed(1)} ({s.review_count})
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/strains/${s.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <DeleteButton action={deleteStrain.bind(null, s.id)} label="strain" />
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
