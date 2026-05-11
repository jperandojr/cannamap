import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MapPin, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { getDispensaries } from "@/lib/db";
import { DispensaryFilters } from "./dispensary-filters";

export const metadata: Metadata = {
  title: "Dispensaries",
  description: "Find cannabis dispensaries near you. Browse verified listings with hours, reviews, and menus.",
};

interface Props {
  searchParams: Promise<{ q?: string; state?: string; sort?: string; verified?: string }>;
}

export default async function DispensariesPage({ searchParams }: Props) {
  const params = await searchParams;
  const dispensaries = await getDispensaries({
    q: params.q,
    state: params.state,
    sort: params.sort,
    verified: params.verified === "1",
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Dispensaries</h1>
        <p className="text-[var(--muted)]">
          Find cannabis dispensaries near you. Browse verified listings, menus, and reviews.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <Suspense>
            <DispensaryFilters />
          </Suspense>
        </aside>

        <div className="flex-1">
          <p className="text-sm text-[var(--muted)] mb-6">
            {dispensaries.length} {dispensaries.length === 1 ? "dispensary" : "dispensaries"} found
          </p>

          {dispensaries.length === 0 ? (
            <div className="text-center py-20 text-[var(--muted)]">
              <p className="text-lg font-medium mb-2">No dispensaries match your filters</p>
              <p className="text-sm">Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dispensaries.map((dispensary) => (
                <Link key={dispensary.id} href={`/dispensaries/${dispensary.slug}`}>
                  <Card hover>
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 shrink-0">
                          <img
                            src={dispensary.images[0]}
                            alt={dispensary.name}
                            className="w-full h-40 sm:h-full object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                          />
                        </div>
                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-[var(--foreground)]">{dispensary.name}</h3>
                                {dispensary.verified && (
                                  <CheckCircle className="h-4 w-4 text-[var(--primary)] shrink-0" />
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
                                <MapPin className="h-3.5 w-3.5" />
                                {dispensary.city}, {dispensary.state}
                              </div>
                            </div>
                            <StarRating rating={dispensary.rating} reviewCount={dispensary.review_count} />
                          </div>
                          <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">{dispensary.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {dispensary.amenities.slice(0, 4).map((amenity) => (
                              <Badge key={amenity} variant="default">{amenity}</Badge>
                            ))}
                            {dispensary.amenities.length > 4 && (
                              <Badge variant="default">+{dispensary.amenities.length - 4}</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                            <Clock className="h-3.5 w-3.5" />
                            {dispensary.hours.Monday}
                          </div>
                        </div>
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
