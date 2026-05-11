import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Phone, Globe, Clock, CheckCircle, Share2, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { getDispensaryBySlug } from "@/lib/db";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dispensary = await getDispensaryBySlug(slug);
  if (!dispensary) return {};
  return { title: dispensary.name, description: dispensary.description.slice(0, 160) };
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default async function DispensaryDetailPage({ params }: Props) {
  const { slug } = await params;
  const dispensary = await getDispensaryBySlug(slug);
  if (!dispensary) notFound();

  const today = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date());

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link
          href="/dispensaries"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Dispensaries
        </Link>
      </div>

      {/* Hero image */}
      <div className="aspect-[21/9] overflow-hidden rounded-2xl mb-8">
        <img
          src={dispensary.images[0]}
          alt={dispensary.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-[var(--foreground)]">{dispensary.name}</h1>
                {dispensary.verified && (
                  <CheckCircle className="h-6 w-6 text-[var(--primary)]" />
                )}
              </div>
              <div className="flex items-center gap-2 text-[var(--muted)]">
                <MapPin className="h-4 w-4" />
                <span>{dispensary.address}, {dispensary.city}, {dispensary.state} {dispensary.zip}</span>
              </div>
              <StarRating rating={dispensary.rating} reviewCount={dispensary.review_count} size="md" className="mt-2" />
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--muted)] hover:text-red-400 transition-colors">
                <Heart className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--muted)] transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* About */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-[var(--foreground)] mb-3">About</h2>
              <p className="text-[var(--muted)] leading-relaxed">{dispensary.description}</p>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-[var(--foreground)] mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {dispensary.amenities.map((amenity) => (
                  <Badge key={amenity} variant="success">{amenity}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hours */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--primary)]" /> Hours
              </h2>
              <div className="space-y-2">
                {days.map((day) => (
                  <div
                    key={day}
                    className={`flex justify-between text-sm py-1.5 px-2 rounded-lg ${
                      day === today ? "bg-[var(--primary)]/10 text-[var(--primary)]" : ""
                    }`}
                  >
                    <span className={day === today ? "font-medium" : "text-[var(--muted)]"}>
                      {day}
                    </span>
                    <span className={day === today ? "font-medium" : "text-[var(--foreground)]"}>
                      {dispensary.hours[day] || "Closed"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-[var(--foreground)]">
                  Reviews ({dispensary.review_count.toLocaleString()})
                </h2>
                <Button size="sm">Write a Review</Button>
              </div>
              <div className="text-center py-8 text-[var(--muted)]">
                <p className="text-sm">Sign in to read and write reviews.</p>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="mt-3">Sign In</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              {dispensary.phone && (
                <a href={`tel:${dispensary.phone}`} className="flex items-center gap-3 text-sm hover:text-[var(--primary)] transition-colors">
                  <Phone className="h-4 w-4 text-[var(--muted)] shrink-0" />
                  <span>{dispensary.phone}</span>
                </a>
              )}
              {dispensary.website && (
                <a href={dispensary.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-[var(--primary)] transition-colors">
                  <Globe className="h-4 w-4 text-[var(--muted)] shrink-0" />
                  <span className="truncate">{dispensary.website.replace("https://", "")}</span>
                </a>
              )}
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-[var(--muted)] shrink-0 mt-0.5" />
                <span className="text-[var(--muted)]">
                  {dispensary.address}<br />
                  {dispensary.city}, {dispensary.state} {dispensary.zip}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg">
            View Menu
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            Get Directions
          </Button>
        </aside>
      </div>
    </div>
  );
}
