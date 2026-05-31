import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types";
import { updateArticle } from "../actions";
import { ArticleForm } from "../article-form";

export const metadata: Metadata = { title: "Edit Article — Admin" };

interface Props { params: Promise<{ id: string }> }

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("articles").select("*").eq("id", id).single();
  if (!data) notFound();

  const article = data as Article;
  const action = updateArticle.bind(null, id);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/news" className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4">
          <ChevronLeft className="h-4 w-4" /> Back to News
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit Article</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{article.title}</p>
      </div>
      <Card className="max-w-3xl">
        <CardContent className="p-6">
          <ArticleForm action={action} initialData={article} />
        </CardContent>
      </Card>
    </div>
  );
}
