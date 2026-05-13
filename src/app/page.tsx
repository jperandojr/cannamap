import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Leaf, Newspaper, Sprout, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { getStrains, getArticles, getGrowingTips } from "@/lib/db";
import { formatDate } from "@/lib/utils";

const categories = [
  {
    href: "/strains",
    label: "Strains",
    icon: Leaf,
    description: "Explore thousands of cannabis strains",
    count: "2,400+ strains",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    href: "/dispensaries",
    label: "Dispensaries",
    icon: MapPin,
    description: "Find dispensaries near you",
    count: "8,000+ locations",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    href: "/seed-banks",
    label: "Seed Banks",
    icon: Sprout,
    description: "Discover top seed banks worldwide",
    count: "150+ seed banks",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    href: "/news",
    label: "News",
    icon: Newspaper,
    description: "Latest cannabis industry news",
    count: "Updated daily",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

const strainTypeColor: Record<string, "indica" | "sativa" | "hybrid"> = {
  indica: "indica",
  sativa: "sativa",
  hybrid: "hybrid",
};

export default async function HomePage() {
  const [{ data: strains }, { data: articles }, { data: growingTips }] = await Promise.all([
    getStrains(),
    getArticles(),
    getGrowingTips(),
  ]);
  const featuredStrains = strains.slice(0, 4);
  const latestArticles = articles.slice(0, 3);
  const featuredTip = growingTips[0];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--background)] py-20 md:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(22,163,74,0.08),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-sm text-[var(--primary)] mb-6">
            <TrendingUp className="h-3.5 w-3.5" />
            GrowingWeed.com
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
            Find the Perfect
            <br />
            <span className="text-[var(--primary)]">Cannabis</span> Experience
          </h1>

          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-10">
            Explore thousands of cannabis strains, discover dispensaries near you, connect with
            top seed banks, and learn from expert growing guides.
          </p>

          {/* Search */}
          <form
            action="/search"
            method="get"
            className="w-full max-w-2xl mx-auto mb-10 px-4 sm:px-0"
          >
            <div className="flex items-center rounded-xl border border-[var(--border)] bg-white shadow-sm overflow-hidden focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 transition-all">
              <Search className="ml-4 h-5 w-5 text-[var(--muted)] shrink-0" />
              <input
                name="q"
                type="search"
                placeholder="Search strains, dispensaries, seed banks..."
                autoComplete="off"
                className="flex-1 min-w-0 px-3 py-4 text-base text-[var(--foreground)] placeholder:text-[var(--muted)] bg-transparent outline-none"
              />
              <button
                type="submit"
                className="shrink-0 m-1.5 px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[var(--muted)]">
            <div>
              <span className="text-[var(--foreground)] font-semibold">2,400+</span> Strains
            </div>
            <div>
              <span className="text-[var(--foreground)] font-semibold">8,000+</span> Dispensaries
            </div>
            <div>
              <span className="text-[var(--foreground)] font-semibold">150+</span> Seed Banks
            </div>
            <div>
              <span className="text-[var(--foreground)] font-semibold">50k+</span> Reviews
            </div>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <Card hover className="h-full">
                <CardContent className="p-6">
                  <div className={`w-10 h-10 rounded-lg ${cat.bg} flex items-center justify-center mb-4`}>
                    <cat.icon className={`h-5 w-5 ${cat.color}`} />
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)] mb-1">{cat.label}</h3>
                  <p className="text-sm text-[var(--muted)] mb-3">{cat.description}</p>
                  <span className="text-xs text-[var(--primary)] font-medium">{cat.count}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Strains */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Popular Strains</h2>
            <p className="text-sm text-[var(--muted)] mt-1">Top-rated strains from our community</p>
          </div>
          <Link href="/strains">
            <Button variant="ghost" size="sm">
              View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredStrains.map((strain) => (
            <Link key={strain.id} href={`/strains/${strain.slug}`}>
              <Card hover className="h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    fill
                    src={strain.image_url}
                    alt={strain.name}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-[var(--foreground)] text-sm leading-tight">
                      {strain.name}
                    </h3>
                    <Badge variant={strainTypeColor[strain.type]}>
                      {strain.type}
                    </Badge>
                  </div>
                  <StarRating rating={strain.rating} reviewCount={strain.review_count} />
                  <p className="text-xs text-[var(--muted)] mt-2">
                    THC: {strain.thc_min}–{strain.thc_max}%
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mt-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Latest News</h2>
            <p className="text-sm text-[var(--muted)] mt-1">Stay up to date with the cannabis industry</p>
          </div>
          <Link href="/news">
            <Button variant="ghost" size="sm">
              View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <Link key={article.id} href={`/news/${article.slug}`}>
              <Card hover className="h-full">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    fill
                    src={article.image_url}
                    alt={article.title}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="default" className="mb-2">{article.category}</Badge>
                  <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Image
                      src={article.author_avatar}
                      alt={article.author_name}
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                    <span className="text-xs text-[var(--muted)]">{article.author_name}</span>
                    <span className="text-xs text-[var(--muted)]">·</span>
                    <span className="text-xs text-[var(--muted)]">{formatDate(article.published_at)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Growing Tips Banner */}
      {featuredTip && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mt-4 mb-8">
          <div className="rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <Badge variant="success" className="mb-4">Growing Tips</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">
                {featuredTip.title}
              </h2>
              <p className="text-[var(--muted)] mb-6 leading-relaxed">{featuredTip.excerpt}</p>
              <Link href={`/growing-tips/${featuredTip.slug}`}>
                <Button>
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative w-full md:w-72 shrink-0 h-48 md:h-56">
              <Image
                fill
                src={featuredTip.image_url}
                alt={featuredTip.title}
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 288px"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
