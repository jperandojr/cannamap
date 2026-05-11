import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Search, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { dispensaries } from "@/lib/data/dispensaries";

export const metadata: Metadata = {
  title: "Dispensaries",
  description: "Find cannabis dispensaries near you. Browse verified listings with hours, reviews, and menus.",
};

const states = ["All States", "CA", "CO", "OR", "WA", "NV", "AZ", "MI", "IL", "MA", "NY"];
const amenities = ["Delivery", "Online Ordering", "ATM", "ADA Accessible", "Parking", "Medical"];

export default function DispensariesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Dispensaries</h1>
        <p className="text-[var(--muted)]">
          Find cannabis dispensaries near you. Browse verified listings, menus, and reviews.
        </p>
      </div>

      {/* Location search banner */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 mb-8">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[var(--primary)]" />
          Find Dispensaries Near You
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter city, state, or zip code..."
            icon={<MapPin className="h-4 w-4" />}
            className="flex-1"
          />
          <Button className="shrink-0">Search Nearby</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <Input
                placeholder="Search dispensaries..."
                icon={<Search className="h-4 w-4" />}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">State</h3>
              <select className="w-full text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--primary)]">
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Amenities</h3>
              <div className="space-y-2">
                {amenities.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-[var(--border)] accent-[var(--primary)]" />
                    <span className="text-sm text-[var(--muted)]">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Type</h3>
              <div className="space-y-2">
                {["Recreational", "Medical", "Both"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" className="accent-[var(--primary)]" />
                    <span className="text-sm text-[var(--muted)]">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Listings */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[var(--muted)]">{dispensaries.length} dispensaries found</p>
            <select className="text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--foreground)] outline-none focus:border-[var(--primary)]">
              <option>Sort: Distance</option>
              <option>Sort: Highest Rated</option>
              <option>Sort: Most Reviews</option>
            </select>
          </div>

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
                              <h3 className="font-semibold text-[var(--foreground)]">
                                {dispensary.name}
                              </h3>
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

                        <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">
                          {dispensary.description}
                        </p>

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

          <div className="mt-8 text-center">
            <Button variant="outline">Load More Dispensaries</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
