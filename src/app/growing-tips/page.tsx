import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Clock, Sprout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { getGrowingTips, PAGE_SIZE } from "@/lib/db";
import { cn } from "@/lib/utils";
import { GrowingTipFilters } from "./growing-tip-filters";

export const metadata: Metadata = {
  title: "Cannabis Growing Tips",
  description: "Expert cannabis growing guides for beginners to advanced growers. Learn about lighting, nutrients, training, and more.",
};

const difficultyStyle: Record<string, string> = {
  beginner: "bg-green-500/20 text-green-700 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-700 border-red-500/30",
};

interface Props {
  searchParams: Promise<{ difficulty?: string; category?: string; page?: string }>;
}

export default async function GrowingTipsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const { data: growingTips, count } = await getGrowingTips({ difficulty: params.difficulty, category: params.category, page });
  const totalPages = Math.ceil(count / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
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

      <Suspense>
        <GrowingTipFilters />
      </Suspense>

      {growingTips.length === 0 ? (
        <div className="text-center py-20 text-[var(--muted)]">
          <p className="text-lg font-medium mb-2">No guides found</p>
          <p className="text-sm">Try a different difficulty or category.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {growingTips.map((tip) => (
              <Link key={tip.id} href={`/growing-tips/${tip.slug}`} className="block h-full">
                <Card hover className="h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      fill
                      src={tip.image_url}
                      alt={tip.title}
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <CardContent className="p-4 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", difficultyStyle[tip.difficulty])}>
                        {tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
                      </span>
                      <Badge variant="default">{tip.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug mb-2">{tip.title}</h3>
                    <p className="text-xs text-[var(--muted)] line-clamp-2 mb-3">{tip.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                      <span>{tip.author_name}</span>
                      <span>·</span>
                      <Clock className="h-3 w-3" />
                      <span>{tip.read_time} min read</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} basePath="/growing-tips" searchParams={params} />
        </>
      )}
    </div>
  );
}
