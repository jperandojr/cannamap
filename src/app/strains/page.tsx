import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { getStrains } from "@/lib/db";
import { StrainFilters } from "./strain-filters";

export const metadata: Metadata = {
  title: "Cannabis Strains",
  description: "Explore thousands of cannabis strains. Filter by type, effects, and THC/CBD levels.",
};

const typeVariant: Record<string, "indica" | "sativa" | "hybrid"> = {
  indica: "indica",
  sativa: "sativa",
  hybrid: "hybrid",
};

interface Props {
  searchParams: Promise<{ type?: string; q?: string; sort?: string; thc?: string; effect?: string }>;
}

export default async function StrainsPage({ searchParams }: Props) {
  const filters = await searchParams;
  const strains = await getStrains(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Cannabis Strains</h1>
        <p className="text-[var(--muted)]">
          Browse our database of cannabis strains. Filter by type, effects, and potency.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <Suspense>
            <StrainFilters />
          </Suspense>
        </aside>

        <div className="flex-1">
          <p className="text-sm text-[var(--muted)] mb-6">
            {strains.length} {strains.length === 1 ? "strain" : "strains"} found
          </p>

          {strains.length === 0 ? (
            <div className="text-center py-20 text-[var(--muted)]">
              <p className="text-lg font-medium mb-2">No strains match your filters</p>
              <p className="text-sm">Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {strains.map((strain) => (
                <Link key={strain.id} href={`/strains/${strain.slug}`}>
                  <Card hover className="h-full">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={strain.image_url}
                        alt={strain.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-[var(--foreground)] leading-tight">
                          {strain.name}
                        </h3>
                        <Badge variant={typeVariant[strain.type]}>{strain.type}</Badge>
                      </div>
                      <StarRating rating={strain.rating} reviewCount={strain.review_count} className="mb-3" />
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {strain.effects.slice(0, 3).map((effect) => (
                          <span
                            key={effect}
                            className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-hover)] text-[var(--muted)]"
                          >
                            {effect}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 text-xs text-[var(--muted)]">
                        <span>THC: {strain.thc_min}–{strain.thc_max}%</span>
                        <span>CBD: {strain.cbd_min}–{strain.cbd_max}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
