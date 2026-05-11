import type { Metadata } from "next";
import Link from "next/link";
import { Search, Sprout, CheckCircle, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { seedBanks } from "@/lib/data/seed-banks";

export const metadata: Metadata = {
  title: "Seed Banks",
  description: "Discover the world's top cannabis seed banks. Find feminized, autoflowering, and regular seeds.",
};

export default function SeedBanksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Seed Banks</h1>
        <p className="text-[var(--muted)]">
          Discover top cannabis seed banks from around the world. Compare genetics, reviews, and shipping.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <Input
              placeholder="Search seed banks..."
              icon={<Search className="h-4 w-4" />}
            />

            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Country</h3>
              <div className="space-y-2">
                {["Netherlands", "Spain", "United Kingdom", "United States", "Canada"].map((country) => (
                  <label key={country} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-[var(--border)] accent-[var(--primary)]" />
                    <span className="text-sm text-[var(--muted)]">{country}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Seed Type</h3>
              <div className="space-y-2">
                {["Feminized", "Autoflowering", "Regular", "CBD"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-[var(--border)] accent-[var(--primary)]" />
                    <span className="text-sm text-[var(--muted)]">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Ships to</h3>
              <select className="w-full text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--primary)]">
                <option>Any country</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Listings */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[var(--muted)]">{seedBanks.length} seed banks found</p>
            <select className="text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--foreground)] outline-none focus:border-[var(--primary)]">
              <option>Sort: Highest Rated</option>
              <option>Sort: Most Strains</option>
              <option>Sort: Most Reviews</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {seedBanks.map((bank) => (
              <Link key={bank.id} href={`/seed-banks/${bank.slug}`}>
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[var(--surface-hover)] flex items-center justify-center shrink-0">
                          <Sprout className="h-6 w-6 text-[var(--primary)]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-semibold text-[var(--foreground)]">{bank.name}</h3>
                            {bank.verified && (
                              <CheckCircle className="h-4 w-4 text-[var(--primary)] shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mt-0.5">
                            <Globe className="h-3 w-3" />
                            {bank.country}
                          </div>
                        </div>
                      </div>
                      <StarRating rating={bank.rating} />
                    </div>

                    <p className="text-sm text-[var(--muted)] line-clamp-2 mb-4">
                      {bank.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm border-t border-[var(--border)] pt-4">
                      <div className="text-center">
                        <div className="font-semibold text-[var(--foreground)]">{bank.strain_count}+</div>
                        <div className="text-xs text-[var(--muted)]">Strains</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-[var(--foreground)]">{bank.review_count.toLocaleString()}</div>
                        <div className="text-xs text-[var(--muted)]">Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-[var(--foreground)]">{bank.shipping_countries.length}</div>
                        <div className="text-xs text-[var(--muted)]">Countries</div>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="success">Ships Worldwide</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline">Load More Seed Banks</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
