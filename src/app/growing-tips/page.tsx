import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Search, Sprout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { growingTips } from "@/lib/data/growing-tips";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cannabis Growing Tips",
  description: "Expert cannabis growing guides for beginners to advanced growers. Learn about lighting, nutrients, training, and more.",
};

const categories = ["All", "Getting Started", "Training Techniques", "Soil & Nutrients", "Climate Control", "Harvest"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const difficultyStyle = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function GrowingTipsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-sm text-[var(--primary)] mb-4">
          <Sprout className="h-3.5 w-3.5" /> Expert Growing Guides
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3">
          Cannabis Growing Tips
        </h1>
        <p className="text-[var(--muted)] max-w-xl mx-auto">
          From your first seed to a bountiful harvest — expert guides for every skill level.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-lg mx-auto mb-10">
        <Input
          placeholder="Search growing guides..."
          icon={<Search className="h-4 w-4" />}
        />
      </div>

      {/* Difficulty filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {difficulties.map((d) => (
          <button
            key={d}
            className="px-4 py-1.5 text-sm rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
          >
            {d}
          </button>
        ))}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className="shrink-0 px-4 py-1.5 text-sm rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors whitespace-nowrap"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {growingTips.map((tip) => (
          <Link key={tip.id} href={`/growing-tips/${tip.slug}`}>
            <Card hover className="h-full">
              <div className="aspect-video overflow-hidden">
                <img
                  src={tip.image_url}
                  alt={tip.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full border",
                      difficultyStyle[tip.difficulty]
                    )}
                  >
                    {tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
                  </span>
                  <Badge variant="default">{tip.category}</Badge>
                </div>
                <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug mb-2">
                  {tip.title}
                </h3>
                <p className="text-xs text-[var(--muted)] line-clamp-2 mb-3">{tip.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <span>{tip.author_name}</span>
                  <span>·</span>
                  <Clock className="h-3 w-3" />
                  <span>{tip.read_time} min</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button variant="outline">Load More Guides</Button>
      </div>
    </div>
  );
}
