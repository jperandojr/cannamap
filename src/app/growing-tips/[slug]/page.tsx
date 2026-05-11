import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Clock, Share2, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getGrowingTipBySlug, getGrowingTips } from "@/lib/db";
import { formatDate, cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tip = await getGrowingTipBySlug(slug);
  if (!tip) return {};
  return { title: tip.title, description: tip.excerpt };
}

const difficultyStyle = {
  beginner: "bg-green-500/20 text-green-400 border border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border border-red-500/30",
};

export default async function GrowingTipDetailPage({ params }: Props) {
  const { slug } = await params;
  const [tip, allTips] = await Promise.all([
    getGrowingTipBySlug(slug),
    getGrowingTips(),
  ]);
  if (!tip) notFound();

  const related = allTips.filter((t) => t.id !== tip.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tip.title,
    description: tip.excerpt,
    image: tip.image_url,
    datePublished: tip.published_at,
    author: { "@type": "Person", name: tip.author_name },
    publisher: { "@type": "Organization", name: "GrowingWeed.com" },
    articleSection: tip.category,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-6">
        <Link
          href="/growing-tips"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Growing Tips
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Article */}
        <article className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className={cn("text-xs px-2.5 py-1 rounded-full", difficultyStyle[tip.difficulty])}>
              {tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
            </span>
            <Badge variant="default">{tip.category}</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-4">
            {tip.title}
          </h1>

          <div className="flex items-center justify-between mb-6 pb-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-sm font-bold text-[var(--primary)]">
                {tip.author_name[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{tip.author_name}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <span>{formatDate(tip.published_at)}</span>
                  <span>·</span>
                  <Clock className="h-3 w-3" />
                  <span>{tip.read_time} min read</span>
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

          {/* Hero */}
          <div className="relative aspect-video overflow-hidden rounded-xl mb-8">
            <Image fill src={tip.image_url} alt={tip.title} className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" priority />
          </div>

          {/* Content */}
          <div>
            {tip.content.split("\n\n").map((paragraph, i) => {
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
                        <strong key={j} className="text-[var(--foreground)] font-semibold">{part}</strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              return (
                <p key={i} className="text-[var(--muted)] leading-relaxed mb-4">{paragraph}</p>
              );
            })}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">More Growing Guides</h3>
            <div className="space-y-3">
              {related.map((t) => (
                <Link key={t.id} href={`/growing-tips/${t.slug}`}>
                  <Card hover>
                    <CardContent className="p-3 flex gap-3">
                      <Image
                        src={t.image_url}
                        alt={t.title}
                        width={64}
                        height={56}
                        className="rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[var(--foreground)] line-clamp-2 leading-snug">
                          {t.title}
                        </p>
                        <p className="text-xs text-[var(--muted)] mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {t.read_time} min
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Find Quality Seeds</h3>
            <p className="text-xs text-[var(--muted)] mb-4">
              Ready to grow? Browse our directory of trusted seed banks.
            </p>
            <Link href="/seed-banks">
              <Button variant="outline" size="sm" className="w-full">Browse Seed Banks</Button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
