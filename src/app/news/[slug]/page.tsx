import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Clock, Share2, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getArticleBySlug, getArticles } from "@/lib/db";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
  ]);
  if (!article) notFound();

  const related = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to News
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Article */}
        <article className="lg:col-span-2">
          <Badge variant="default" className="mb-4">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-4">
            {article.title}
          </h1>

          {/* Author + meta */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <img
                src={article.author_avatar}
                alt={article.author_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{article.author_name}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <span>{formatDate(article.published_at)}</span>
                  <span>·</span>
                  <Clock className="h-3 w-3" />
                  <span>{article.read_time} min read</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--muted)] transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--muted)] transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Hero image */}
          <div className="aspect-video overflow-hidden rounded-xl mb-8">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-green max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("**")) {
                const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={i} className="text-[var(--muted)] leading-relaxed mb-4">
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className="text-[var(--foreground)] font-semibold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              return (
                <p key={i} className="text-[var(--muted)] leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Related Articles</h3>
            <div className="space-y-4">
              {related.map((a) => (
                <Link key={a.id} href={`/news/${a.slug}`}>
                  <Card hover>
                    <CardContent className="p-3 flex gap-3">
                      <img
                        src={a.image_url}
                        alt={a.title}
                        className="w-16 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[var(--foreground)] line-clamp-2 leading-snug">
                          {a.title}
                        </p>
                        <p className="text-xs text-[var(--muted)] mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {a.read_time} min
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">
              Growing Enthusiast?
            </h3>
            <p className="text-xs text-[var(--muted)] mb-4">
              Check out our expert growing guides for beginners to advanced growers.
            </p>
            <Link href="/growing-tips">
              <Button size="sm" className="w-full">View Growing Tips</Button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
