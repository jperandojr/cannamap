import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, Leaf, MapPin, Sprout, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserFavorites } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "My Favorites" };

const typeVariant: Record<string, "indica" | "sativa" | "hybrid"> = {
  indica: "indica",
  sativa: "sativa",
  hybrid: "hybrid",
};

function StarScore({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      {rating.toFixed(1)}
    </span>
  );
}

export default async function FavoritesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { strains, dispensaries, seedBanks } = await getUserFavorites(user.id);
  const total = strains.length + dispensaries.length + seedBanks.length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-6 w-6 text-red-500 fill-current" />
        <h1 className="text-2xl font-bold text-[var(--foreground)]">My Favorites</h1>
        {total > 0 && (
          <span className="text-sm text-[var(--muted)]">({total} saved)</span>
        )}
      </div>

      {total === 0 && (
        <div className="text-center py-24">
          <Heart className="h-12 w-12 text-[var(--muted)] mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium text-[var(--foreground)] mb-2">No favorites yet</p>
          <p className="text-sm text-[var(--muted)] mb-6">
            Hit the heart icon on any strain, dispensary, or seed bank to save it here.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/strains" className="text-sm text-[var(--primary)] hover:underline">Browse Strains →</Link>
            <Link href="/dispensaries" className="text-sm text-[var(--primary)] hover:underline">Browse Dispensaries →</Link>
            <Link href="/seed-banks" className="text-sm text-[var(--primary)] hover:underline">Browse Seed Banks →</Link>
          </div>
        </div>
      )}

      <div className="space-y-10">
        {strains.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="font-semibold text-[var(--foreground)]">Strains</h2>
              <span className="text-xs text-[var(--muted)]">({strains.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {strains.map((s) => (
                <Link key={s.id} href={`/strains/${s.slug}`}>
                  <Card hover className="h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image fill src={s.image_url} alt={s.name} className="object-cover transition-transform duration-300 hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" />
                    </div>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-[var(--foreground)] leading-tight">{s.name}</p>
                        <Badge variant={typeVariant[s.type]}>{s.type}</Badge>
                      </div>
                      <StarScore rating={s.rating} />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {dispensaries.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="font-semibold text-[var(--foreground)]">Dispensaries</h2>
              <span className="text-xs text-[var(--muted)]">({dispensaries.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dispensaries.map((d) => (
                <Link key={d.id} href={`/dispensaries/${d.slug}`}>
                  <Card hover>
                    <CardContent className="p-4">
                      <p className="font-medium text-[var(--foreground)]">{d.name}</p>
                      <p className="text-xs text-[var(--muted)] mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {d.city}, {d.state}
                      </p>
                      <div className="mt-2">
                        <StarScore rating={d.rating} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {seedBanks.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="font-semibold text-[var(--foreground)]">Seed Banks</h2>
              <span className="text-xs text-[var(--muted)]">({seedBanks.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {seedBanks.map((b) => (
                <Link key={b.id} href={`/seed-banks/${b.slug}`}>
                  <Card hover>
                    <CardContent className="p-4">
                      <p className="font-medium text-[var(--foreground)]">{b.name}</p>
                      <p className="text-xs text-[var(--muted)] mt-1">{b.country}</p>
                      <div className="mt-2">
                        <StarScore rating={b.rating} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
