import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createArticle } from "../actions";
import { ArticleForm } from "../article-form";

export const metadata: Metadata = { title: "New Article — Admin" };

export default function NewArticlePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/news" className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4">
          <ChevronLeft className="h-4 w-4" /> Back to News
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">New Article</h1>
      </div>
      <Card className="max-w-3xl">
        <CardContent className="p-6">
          <ArticleForm action={createArticle} />
        </CardContent>
      </Card>
    </div>
  );
}
