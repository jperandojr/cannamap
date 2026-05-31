import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/app/admin/delete-button";
import { formatDate } from "@/lib/utils";
import { deleteArticle } from "./actions";
import type { Article } from "@/lib/types";

export const metadata: Metadata = { title: "News — Admin" };

export default async function AdminNewsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  const articles = (data ?? []) as Article[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">News</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{articles.length} total</p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary)]/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Article
        </Link>
      </div>

      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden">
        {articles.length === 0 ? (
          <div className="text-center py-16 text-[var(--muted)]">
            <p className="font-medium mb-1">No articles yet</p>
            <p className="text-sm">Add your first article to get started.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Title</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Category</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Status</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)]">Published</th>
                <th className="text-right px-4 py-3 font-medium text-[var(--muted)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                  <td className="px-4 py-3 max-w-xs">
                    <div className="font-medium text-[var(--foreground)] truncate">{article.title}</div>
                    <a
                      href={`/news/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline mt-0.5"
                    >
                      /news/{article.slug} <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="default">{article.category}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    {article.published_at && new Date(article.published_at) <= new Date() ? (
                      <Badge variant="success">Published</Badge>
                    ) : article.published_at ? (
                      <Badge variant="outline">Scheduled</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {article.published_at ? formatDate(article.published_at) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/news/${article.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <DeleteButton action={deleteArticle.bind(null, article.id)} label="article" />
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
