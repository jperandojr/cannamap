import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Globe, CheckCircle, Sprout, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { seedBanks } from "@/lib/data/seed-banks";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bank = seedBanks.find((b) => b.slug === slug);
  if (!bank) return {};
  return { title: bank.name, description: bank.description.slice(0, 160) };
}

export function generateStaticParams() {
  return seedBanks.map((b) => ({ slug: b.slug }));
}

export default async function SeedBankDetailPage({ params }: Props) {
  const { slug } = await params;
  const bank = seedBanks.find((b) => b.slug === slug);
  if (!bank) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link
          href="/seed-banks"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Seed Banks
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <Sprout className="h-10 w-10 text-[var(--primary)]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-[var(--foreground)]">{bank.name}</h1>
                {bank.verified && <CheckCircle className="h-6 w-6 text-[var(--primary)]" />}
              </div>
              <div className="flex items-center gap-2 text-[var(--muted)] text-sm mb-2">
                <Globe className="h-4 w-4" />
                {bank.country}
              </div>
              <StarRating rating={bank.rating} reviewCount={bank.review_count} size="md" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Strains", value: `${bank.strain_count}+` },
              { label: "Reviews", value: bank.review_count.toLocaleString() },
              { label: "Ships To", value: `${bank.shipping_countries.length} countries` },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-[var(--primary)]">{stat.value}</div>
                  <div className="text-xs text-[var(--muted)] mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* About */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-[var(--foreground)] mb-3">About {bank.name}</h2>
              <p className="text-[var(--muted)] leading-relaxed">{bank.description}</p>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-[var(--foreground)] mb-4">Shipping Countries</h2>
              <div className="flex flex-wrap gap-2">
                {bank.shipping_countries.map((country) => (
                  <Badge key={country} variant="outline">{country}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-[var(--foreground)]">
                  Reviews ({bank.review_count.toLocaleString()})
                </h2>
                <Button size="sm">Write a Review</Button>
              </div>
              <div className="text-center py-8 text-[var(--muted)]">
                <Star className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Sign in to read and write reviews.</p>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="mt-3">Sign In</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <a
            href={bank.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-full items-center justify-center rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
          >
            Visit Seed Bank
          </a>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Country</span>
                  <span className="text-[var(--foreground)]">{bank.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Verified</span>
                  <span className={bank.verified ? "text-[var(--primary)]" : "text-[var(--muted)]"}>
                    {bank.verified ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Strains</span>
                  <span className="text-[var(--foreground)]">{bank.strain_count}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Rating</span>
                  <StarRating rating={bank.rating} />
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
