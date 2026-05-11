import type { Metadata } from "next";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { strains } from "@/lib/data/strains";

export const metadata: Metadata = {
  title: "Cannabis Strains",
  description: "Explore thousands of cannabis strains. Filter by type, effects, and THC/CBD levels.",
};

const strainTypes = ["All", "Indica", "Sativa", "Hybrid"];
const effectsList = ["Relaxed", "Euphoric", "Happy", "Creative", "Energetic", "Sleepy", "Focused", "Uplifted"];

const typeVariant: Record<string, "indica" | "sativa" | "hybrid"> = {
  indica: "indica",
  sativa: "sativa",
  hybrid: "hybrid",
};

export default function StrainsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Cannabis Strains</h1>
        <p className="text-[var(--muted)]">
          Browse our database of {strains.length}+ cannabis strains. Filter by type, effects, and potency.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Search */}
            <div>
              <Input
                placeholder="Search strains..."
                icon={<Search className="h-4 w-4" />}
              />
            </div>

            {/* Strain Type */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                <Filter className="h-3.5 w-3.5" /> Strain Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {strainTypes.map((type) => (
                  <button
                    key={type}
                    className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Effects */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Effects</h3>
              <div className="flex flex-wrap gap-2">
                {effectsList.map((effect) => (
                  <button
                    key={effect}
                    className="px-2.5 py-1 text-xs rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {effect}
                  </button>
                ))}
              </div>
            </div>

            {/* THC Range */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">THC Content</h3>
              <div className="space-y-2">
                {["Under 10%", "10–15%", "15–20%", "20–25%", "25%+"].map((range) => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-[var(--border)] accent-[var(--primary)]"
                    />
                    <span className="text-sm text-[var(--muted)]">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Strain Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[var(--muted)]">{strains.length} strains found</p>
            <select className="text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--foreground)] outline-none focus:border-[var(--primary)]">
              <option>Sort: Most Popular</option>
              <option>Sort: Highest Rated</option>
              <option>Sort: Highest THC</option>
              <option>Sort: Most Reviews</option>
            </select>
          </div>

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
                    <StarRating
                      rating={strain.rating}
                      reviewCount={strain.review_count}
                      className="mb-3"
                    />
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

          {/* Load more */}
          <div className="mt-8 text-center">
            <Button variant="outline">Load More Strains</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
