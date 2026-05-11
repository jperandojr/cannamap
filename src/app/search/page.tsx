import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, Leaf, MapPin, Sprout, Newspaper, BookOpen, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { search } from "@/lib/db";
import { cn } from "@/lib/utils";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `Search: ${q}` : "Search" };
}

const typeVariant: Record<string, "indica" | "sativa" | "hybrid"> = {
  indica: "indica",
  sativa: "sativa",
  hybrid: "hybrid",
};

const difficultyColor: Record<string, string> = {
  beginner: "bg-green-500/20 text-green-700 border border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-700 border border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-700 border border-red-500/30",
};

function StarScore({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      {rating.toFixed(1)}
    </span>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (!query) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Search className="h-12 w-12 text-[var(--muted)] mx-auto mb-4 opacity-40" />
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Search GrowingWeed.com</h1>
        <p className="text-[var(--muted)]">Use the search bar above to find strains, dispensaries, seed banks, and more.</p>
      </div>
    );
  }

  const results = await search(query);
  const total = results.strains.length + results.dispensaries.length + results.seedBanks.length + results.articles.length + results.tips.length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Search results for <span className="text-[var(--primary)]">&ldquo;{query}&rdquo;</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {total === 0 ? "No results found." : `${total} result${total !== 1 ? "s" : ""} across all categories`}
        </p>
      </div>

      {total === 0 && (
        <div className="text-center py-20">
          <Search className="h-10 w-10 text-[var(--muted)] mx-auto mb-3 opacity-30" />
          <p className="text-[var(--muted)]">Try a different search term or browse a category from the navigation.</p>
        </div>
      )}

      <div className="space-y-10">
        {/* Strains */}
        {results.strains.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="font-semibold text-[var(--foreground)]">Strains</h2>
              <span className="text-xs text-[var(--muted)]">({results.strains.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.strains.map((s) => (
                <Link key={s.id} href={`/strains/${s.slug}`}>
                  <Card hover>
                    <CardContent className="p-4 flex gap-3">
                      <Image
                        src={s.image_url}
                        alt={s.name}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-[var(--foreground)] truncate">{s.name}</p>
                        <Badge variant={typeVariant[s.type]} className="mt-1">{s.type}</Badge>
                        <div className="mt-1.5">
                          <StarScore rating={s.rating} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <Link href={`/strains`} className="text-xs text-[var(--primary)] hover:underline mt-2 inline-block">
              Browse all strains →
            </Link>
          </section>
        )}

        {/* Dispensaries */}
        {results.dispensaries.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="font-semibold text-[var(--foreground)]">Dispensaries</h2>
              <span className="text-xs text-[var(--muted)]">({results.dispensaries.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.dispensaries.map((d) => (
                <Link key={d.id} href={`/dispensaries/${d.slug}`}>
                  <Card hover>
                    <CardContent className="p-4">
                      <p className="font-medium text-[var(--foreground)]">{d.name}</p>
                      <p className="text-xs text-[var(--muted)] mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {d.city}, {d.state}
                      </p>
                      <div className="mt-1.5">
                        <StarScore rating={d.rating} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <Link href="/dispensaries" className="text-xs text-[var(--primary)] hover:underline mt-2 inline-block">
              Browse all dispensaries →
            </Link>
          </section>
        )}

        {/* Seed Banks */}
        {results.seedBanks.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="font-semibold text-[var(--foreground)]">Seed Banks</h2>
              <span className="text-xs text-[var(--muted)]">({results.seedBanks.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.seedBanks.map((b) => (
                <Link key={b.id} href={`/seed-banks/${b.slug}`}>
                  <Card hover>
                    <CardContent className="p-4">
                      <p className="font-medium text-[var(--foreground)]">{b.name}</p>
                      <p className="text-xs text-[var(--muted)] mt-1">{b.country}</p>
                      <div className="mt-1.5">
                        <StarScore rating={b.rating} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <Link href="/seed-banks" className="text-xs text-[var(--primary)] hover:underline mt-2 inline-block">
              Browse all seed banks →
            </Link>
          </section>
        )}

        {/* News */}
        {results.articles.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="font-semibold text-[var(--foreground)]">News</h2>
              <span className="text-xs text-[var(--muted)]">({results.articles.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.articles.map((a) => (
                <Link key={a.id} href={`/news/${a.slug}`}>
                  <Card hover>
                    <CardContent className="p-4 flex gap-3">
                      <Image
                        src={a.image_url}
                        alt={a.title}
                        width={80}
                        height={64}
                        className="rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <Badge variant="default" className="mb-1">{a.category}</Badge>
                        <p className="text-sm font-medium text-[var(--foreground)] line-clamp-2 leading-snug">{a.title}</p>
                        <p className="text-xs text-[var(--muted)] mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {a.read_time} min read
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <Link href="/news" className="text-xs text-[var(--primary)] hover:underline mt-2 inline-block">
              Browse all news →
            </Link>
          </section>
        )}

        {/* Growing Tips */}
        {results.tips.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="font-semibold text-[var(--foreground)]">Growing Tips</h2>
              <span className="text-xs text-[var(--muted)]">({results.tips.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.tips.map((t) => (
                <Link key={t.id} href={`/growing-tips/${t.slug}`}>
                  <Card hover>
                    <CardContent className="p-4 flex gap-3">
                      <Image
                        src={t.image_url}
                        alt={t.title}
                        width={80}
                        height={64}
                        className="rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full", difficultyColor[t.difficulty])}>
                          {t.difficulty.charAt(0).toUpperCase() + t.difficulty.slice(1)}
                        </span>
                        <p className="text-sm font-medium text-[var(--foreground)] line-clamp-2 leading-snug mt-1">{t.title}</p>
                        <p className="text-xs text-[var(--muted)] mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {t.read_time} min read
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <Link href="/growing-tips" className="text-xs text-[var(--primary)] hover:underline mt-2 inline-block">
              Browse all growing tips →
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
