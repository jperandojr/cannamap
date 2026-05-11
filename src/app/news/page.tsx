import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { articles } from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cannabis News",
  description: "Stay up to date with the latest cannabis industry news, legalization updates, and research.",
};

const categories = ["All", "News", "Science", "Wellness", "Education", "Business", "Law"];

export default function NewsPage() {
  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Cannabis News</h1>
        <p className="text-[var(--muted)]">
          The latest news, research, and updates from the cannabis industry.
        </p>
      </div>

      {/* Featured article */}
      {featured && (
        <Link href={`/news/${featured.slug}`} className="block mb-10">
          <Card hover>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img
                    src={featured.image_url}
                    alt={featured.title}
                    className="w-full h-56 md:h-80 object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                  />
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <Badge variant="success" className="mb-3 self-start">Featured</Badge>
                  <Badge variant="default" className="mb-3 self-start">{featured.category}</Badge>
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3 leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-[var(--muted)] mb-4 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                    <img src={featured.author_avatar} alt={featured.author_name} className="w-6 h-6 rounded-full object-cover" />
                    <span>{featured.author_name}</span>
                    <span>·</span>
                    <span>{formatDate(featured.published_at)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {featured.read_time} min read
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Articles grid */}
        <div className="flex-1">
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                className="shrink-0 px-4 py-1.5 text-sm rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {rest.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`}>
                <Card hover className="h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="default" className="mb-2">{article.category}</Badge>
                    <h3 className="font-semibold text-[var(--foreground)] leading-snug mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                      <img src={article.author_avatar} alt={article.author_name} className="w-5 h-5 rounded-full object-cover" />
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

          <div className="mt-8 text-center">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <Input placeholder="Search articles..." icon={<Search className="h-4 w-4" />} />

          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              {["Legalization", "THC", "CBD", "Medical", "Growing", "Terpenes", "Research", "Dispensaries"].map((topic) => (
                <Badge key={topic} variant="default" className="cursor-pointer hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Recent Articles</h3>
            <div className="space-y-3">
              {articles.slice(0, 3).map((article) => (
                <Link key={article.id} href={`/news/${article.slug}`}>
                  <div className="flex gap-3 hover:opacity-80 transition-opacity">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-16 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--foreground)] line-clamp-2 leading-snug">
                        {article.title}
                      </p>
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
