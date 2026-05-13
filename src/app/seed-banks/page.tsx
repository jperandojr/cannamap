import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Sprout, CheckCircle, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Pagination } from "@/components/ui/pagination";
import { getSeedBanks, PAGE_SIZE } from "@/lib/db";
import { SeedBankFilters } from "./seed-bank-filters";

export const metadata: Metadata = {
  title: "Seed Banks",
  description: "Discover the world's top cannabis seed banks. Find feminized, autoflowering, and regular seeds.",
};

interface Props {
  searchParams: Promise<{ q?: string; country?: string; sort?: string; verified?: string; page?: string }>;
}

export default async function SeedBanksPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const { data: seedBanks, count } = await getSeedBanks({
    q: params.q,
    country: params.country,
    sort: params.sort,
    verified: params.verified === "1",
    page,
  });
  const totalPages = Math.ceil(count / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Seed Banks</h1>
        <p className="text-[var(--muted)]">
          Discover top cannabis seed banks from around the world. Compare genetics, reviews, and shipping.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <Suspense>
            <SeedBankFilters />
          </Suspense>
        </aside>

        <div className="flex-1">
          <p className="text-sm text-[var(--muted)] mb-6">
            {count} {count === 1 ? "seed bank" : "seed banks"} found
          </p>

          {seedBanks.length === 0 ? (
            <div className="text-center py-20 text-[var(--muted)]">
              <p className="text-lg font-medium mb-2">No seed banks match your filters</p>
              <p className="text-sm">Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <>
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
                                {bank.verified && <CheckCircle className="h-4 w-4 text-[var(--primary)] shrink-0" />}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mt-0.5">
                                <Globe className="h-3 w-3" /> {bank.country}
                              </div>
                            </div>
                          </div>
                          <StarRating rating={bank.rating} />
                        </div>
                        <p className="text-sm text-[var(--muted)] line-clamp-2 mb-4">{bank.description}</p>
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
              <Pagination page={page} totalPages={totalPages} basePath="/seed-banks" searchParams={params} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
