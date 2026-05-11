"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Star, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { submitReview, deleteReview, type ReviewState } from "@/app/actions/reviews";
import { Button } from "@/components/ui/button";
import type { EntityType } from "@/lib/types";
import type { ReviewWithAuthor } from "@/lib/db";

interface ReviewSectionProps {
  entityType: EntityType;
  entityId: string;
  pathname: string;
  reviews: ReviewWithAuthor[];
  userReview: { id: string; rating: number; title: string | null; content: string } | null;
  isLoggedIn: boolean;
  totalCount: number;
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="p-0.5"
        >
          <Star
            className={cn(
              "h-6 w-6 transition-colors",
              n <= (hovered || value) ? "fill-amber-400 text-amber-400" : "text-[var(--border)]"
            )}
          />
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn("h-3.5 w-3.5", n <= rating ? "fill-amber-400 text-amber-400" : "text-[var(--border)]")}
        />
      ))}
    </div>
  );
}

function ReviewForm({
  entityType,
  entityId,
  pathname,
  existingReview,
}: {
  entityType: EntityType;
  entityId: string;
  pathname: string;
  existingReview: ReviewSectionProps["userReview"];
}) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [open, setOpen] = useState(false);
  const initial: ReviewState = { error: null, success: false };
  const action = submitReview.bind(null, entityType, entityId, pathname);
  const [state, formAction, pending] = useActionState(action, initial);

  if (state.success && !open) {
    return (
      <p className="text-sm text-green-600 font-medium">Your review has been saved. Thank you!</p>
    );
  }

  return (
    <div>
      {!open && !existingReview && (
        <Button size="sm" onClick={() => setOpen(true)}>Write a Review</Button>
      )}
      {!open && existingReview && (
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>Edit Your Review</Button>
      )}

      {open && (
        <form action={formAction} className="space-y-4 mt-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <h4 className="text-sm font-semibold text-[var(--foreground)]">
            {existingReview ? "Edit Your Review" : "Write a Review"}
          </h4>

          {state.error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <input type="hidden" name="rating" value={rating} />
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1.5">Rating</label>
            <StarPicker value={rating} onChange={setRating} />
          </div>

          <div>
            <label htmlFor="title" className="block text-xs text-[var(--muted)] mb-1.5">Title (optional)</label>
            <input
              id="title"
              name="title"
              defaultValue={existingReview?.title ?? ""}
              placeholder="Summarise your experience"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-xs text-[var(--muted)] mb-1.5">Review</label>
            <textarea
              id="content"
              name="content"
              defaultValue={existingReview?.content ?? ""}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors resize-none"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={pending}>
              {pending ? "Submitting…" : "Submit Review"}
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export function ReviewSection({
  entityType, entityId, pathname, reviews, userReview, isLoggedIn, totalCount,
}: ReviewSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--foreground)]">
          Reviews ({totalCount.toLocaleString()})
        </h3>
        {isLoggedIn ? (
          <ReviewForm
            entityType={entityType}
            entityId={entityId}
            pathname={pathname}
            existingReview={userReview}
          />
        ) : (
          <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
            <Button size="sm" variant="outline">Sign in to review</Button>
          </Link>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-10 text-[var(--muted)]">
          <Star className="h-8 w-8 mx-auto mb-2 opacity-20" />
          <p className="text-sm">No reviews yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((review) => (
            <div key={review.id} className="border-b border-[var(--border)] pb-4 last:border-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-xs font-bold text-[var(--primary)] shrink-0">
                    {(review.profiles?.username ?? "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {review.profiles?.username ?? "Anonymous"}
                    </p>
                    <p className="text-xs text-[var(--muted)]">{formatDate(review.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StarDisplay rating={review.rating} />
                  {userReview?.id === review.id && (
                    <button
                      onClick={async () => {
                        await deleteReview(review.id, pathname);
                        window.location.reload();
                      }}
                      className="text-[var(--muted)] hover:text-red-500 transition-colors"
                      aria-label="Delete review"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
              {review.title && (
                <p className="text-sm font-semibold text-[var(--foreground)] mb-1">{review.title}</p>
              )}
              <p className="text-sm text-[var(--muted)] leading-relaxed">{review.content}</p>
            </div>
          ))}

          {reviews.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1 text-sm text-[var(--primary)] hover:underline"
            >
              {showAll ? (
                <><ChevronUp className="h-4 w-4" /> Show less</>
              ) : (
                <><ChevronDown className="h-4 w-4" /> Show all {reviews.length} reviews</>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
