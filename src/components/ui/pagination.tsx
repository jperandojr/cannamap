import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | string[] | undefined>;
}

function buildHref(basePath: string, searchParams: Record<string, string | string[] | undefined>, page: number) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (k === "page") continue;
    if (Array.isArray(v)) v.forEach((s) => params.append(k, s));
    else if (v) params.set(k, v);
  }
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `${basePath}${qs ? `?${qs}` : ""}`;
}

function pageNumbers(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
  if (page >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, "…", page - 1, page, page + 1, "…", totalPages];
}

export function Pagination({ page, totalPages, basePath, searchParams = {} }: Props) {
  if (totalPages <= 1) return null;

  const pages = pageNumbers(page, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1 mt-10" aria-label="Pagination">
      <Link
        href={buildHref(basePath, searchParams, page - 1)}
        aria-disabled={page === 1}
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          page === 1
            ? "pointer-events-none text-[var(--muted)] opacity-40"
            : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        Prev
      </Link>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-[var(--muted)]">…</span>
        ) : (
          <Link
            key={p}
            href={buildHref(basePath, searchParams, p)}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
              p === page
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
            )}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={buildHref(basePath, searchParams, page + 1)}
        aria-disabled={page === totalPages}
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          page === totalPages
            ? "pointer-events-none text-[var(--muted)] opacity-40"
            : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
        )}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
