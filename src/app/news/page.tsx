import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getArticles } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { NewsCategoryTabs } from "./news-filters";

export const metadata: Metadata = {
  title: "Cannabis News",
  description: "Stay up to date with the latest cannabis industry news, legalization updates, and research.",
};

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function NewsPage({ searchParams }: Props) {
  const params = await searchParams;
  const articles = await getArticles({ category: params.category, q: params.q });
  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Cannabis News</h1>
        <p className="text-[var(--muted)]">
          The latest news, research, and updates from the cannabis industry.
        </p>
      </div>

      {/* Featured — only show when no filters active */}
      {featured && !params.category && !params.q && (
        <Link href={`/news/${featured.slug}`} className="block mb-10">
          <Card hover>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/2 h-56 md:h-80">
                  <Image fill src={featured.image_url} alt={featured.title}
                    className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <Badge variant="success" className="mb-3 self-start">Featured</Badge>
                  <Badge variant="default" className="mb-3 self-start">{featured.category}</Badge>
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3 leading-snug">{featured.title}</h2>
                  <p className="text-[var(--muted)] mb-4 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                    <Image src={featured.author_avatar} alt={featured.author_name} width={24} height={24} className="rounded-full object-cover" />
                    <span>{featured.author_name}</span>
                    <span>·</span>
                    <span>{formatDate(featured.published_at)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.read_time} min read</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Suspense>
            <NewsCategoryTabs />
          </Suspense>

          {articles.length === 0 ? (
            <div className="text-center py-20 text-[var(--muted)]">
              <p className="text-lg font-medium mb-2">No articles found</p>
              <p className="text-sm">Try a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(params.category || params.q ? articles : rest).map((article) => (
                <Link key={article.id} href={`/news/${article.slug}`}>
                  <Card hover className="h-full">
                    <div className="relative aspect-video overflow-hidden">
                      <Image fill src={article.image_url} alt={article.title}
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="default" className="mb-2">{article.category}</Badge>
                      <h3 className="font-semibold text-[var(--foreground)] leading-snug mb-2">{article.title}</h3>
                      <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">{article.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                        <Image src={article.author_avatar} alt={article.author_name} width={20} height={20} className="rounded-full object-cover" />
                        <span>{article.author_name}</span>
                        <span>·</span>
                        <Clock className="h-3 w-3" />
                        <span>{article.read_time} min</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Recent Articles</h3>
            <div className="space-y-3">
              {articles.slice(0, 4).map((article) => (
                <Link key={article.id} href={`/news/${article.slug}`}>
                  <div className="flex gap-3 hover:opacity-80 transition-opacity">
                    <Image src={article.image_url} alt={article.title} width={64} height={48} className="rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--foreground)] line-clamp-2 leading-snug">{article.title}</p>
                      <p className="text-xs text-[var(--muted)] mt-1">{formatDate(article.published_at)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
