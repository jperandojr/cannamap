import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { getDispensaries } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/app/admin/delete-button";
import { deleteDispensary } from "./actions";

export const metadata: Metadata = { title: "Dispensaries — Admin" };

export default async function AdminDispensariesPage() {
  const { data: dispensaries } = await getDispensaries();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Dispensaries</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{dispensaries.length} total</p>
        </div>
        <Link
          href="/admin/dispensaries/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary)]/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Dispensary
        </Link>
      </div>

      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden">
        {dispensaries.length === 0 ? (
          <div className="text-center py-16 text-[var(--muted)]">
            <p className="font-medium mb-1">No dispensaries yet</p>
            <p className="text-sm">Add your first dispensary to get started.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Name</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Location</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Status</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Rating</th>
                <th className="text-right px-4 py-3 font-medium text-[var(--muted)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {dispensaries.map((d) => (
                <tr key={d.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[var(--foreground)]">{d.name}</div>
                    <a
                      href={`/dispensaries/${d.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline mt-0.5"
                    >
                      /dispensaries/{d.slug} <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{d.city}, {d.state}</td>
                  <td className="px-4 py-3">
                    {d.verified ? (
                      <Badge variant="success">Verified</Badge>
                    ) : (
                      <Badge variant="outline">Unverified</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{d.rating?.toFixed(1)} ({d.review_count})</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/dispensaries/${d.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <DeleteButton action={deleteDispensary.bind(null, d.id)} label="dispensary" />
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
