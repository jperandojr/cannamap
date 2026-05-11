import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Leaf, Info, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Card, CardContent } from "@/components/ui/card";
import { getStrainBySlug, getStrains, getReviews, getUserReview } from "@/lib/db";
import { isFavorited } from "@/app/actions/favorites";
import { FavoriteButton } from "@/components/favorite-button";
import { ReviewSection } from "@/components/review-section";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const strain = await getStrainBySlug(slug);
  if (!strain) return {};
  return {
    title: strain.name,
    description: strain.description.slice(0, 160),
  };
}

const typeVariant: Record<string, "indica" | "sativa" | "hybrid"> = {
  indica: "indica",
  sativa: "sativa",
  hybrid: "hybrid",
};

export default async function StrainDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [strain, allStrains] = await Promise.all([
    getStrainBySlug(slug),
    getStrains(),
  ]);
  if (!strain) notFound();

  const related = allStrains.filter((s) => s.type === strain.type && s.id !== strain.id).slice(0, 3);
  const pathname = `/strains/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: strain.name,
    description: strain.description,
    image: strain.image_url,
    aggregateRating: strain.review_count > 0 ? {
      "@type": "AggregateRating",
      ratingValue: strain.rating,
      reviewCount: strain.review_count,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
  };

  const [favorited, reviews, userReview] = await Promise.all([
    user ? isFavorited("strain", strain.id) : Promise.resolve(false),
    getReviews("strain", strain.id),
    user ? getUserReview("strain", strain.id) : Promise.resolve(null),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/strains"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Strains
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-6">
            <Image
              fill
              src={strain.image_url}
              alt={strain.name}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </div>

          {/* Title area */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant={typeVariant[strain.type]}>{strain.type}</Badge>
                {strain.thc_max >= 25 && (
                  <Badge variant="default">High THC</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-[var(--foreground)]">{strain.name}</h1>
              <StarRating
                rating={strain.rating}
                reviewCount={strain.review_count}
                size="md"
                className="mt-2"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <FavoriteButton
                entityType="strain"
                entityId={strain.id}
                initialFavorited={favorited}
                isLoggedIn={!!user}
                pathname={pathname}
              />
              <button className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] transition-colors text-[var(--muted)]">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <p className="text-[var(--muted)] leading-relaxed">{strain.description}</p>
            </CardContent>
          </Card>

          {/* Effects + Flavors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                  <Leaf className="h-3.5 w-3.5 text-[var(--primary)]" /> Effects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {strain.effects.map((effect) => (
                    <Badge key={effect} variant="success">{effect}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
                  Flavors & Aromas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {strain.flavors.map((flavor) => (
                    <Badge key={flavor} variant="outline">{flavor}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medical Uses */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                <Info className="h-3.5 w-3.5 text-blue-400" /> Medical Uses
              </h3>
              <div className="flex flex-wrap gap-2">
                {strain.medical_uses.map((use) => (
                  <span
                    key={use}
                    className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <ReviewSection
                entityType="strain"
                entityId={strain.id}
                pathname={pathname}
                reviews={reviews}
                userReview={userReview}
                isLoggedIn={!!user}
                totalCount={strain.review_count}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Strain Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Type</span>
                  <Badge variant={typeVariant[strain.type]}>{strain.type}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">THC</span>
                  <span className="text-[var(--foreground)] font-medium">
                    {strain.thc_min}–{strain.thc_max}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">CBD</span>
                  <span className="text-[var(--foreground)] font-medium">
                    {strain.cbd_min}–{strain.cbd_max}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Rating</span>
                  <StarRating rating={strain.rating} />
                </div>
              </div>

              {/* THC bar */}
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <div className="flex justify-between text-xs text-[var(--muted)] mb-1.5">
                  <span>THC Content</span>
                  <span>{strain.thc_max}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-emerald-400"
                    style={{ width: `${(strain.thc_max / 35) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related strains */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
              Similar Strains
            </h3>
            <div className="space-y-3">
              {related.map((s) => (
                <Link key={s.id} href={`/strains/${s.slug}`}>
                  <Card hover>
                    <CardContent className="p-3 flex gap-3">
                      <Image
                        src={s.image_url}
                        alt={s.name}
                        width={56}
                        height={56}
                        className="rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--foreground)] truncate">
                          {s.name}
                        </p>
                        <StarRating rating={s.rating} className="mt-0.5" />
                        <p className="text-xs text-[var(--muted)] mt-0.5">
                          THC {s.thc_max}%
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
