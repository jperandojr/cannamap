import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export function StarRating({ rating, reviewCount, size = "sm", className }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {stars.map((star) => (
          <Star
            key={star}
            className={cn(
              size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4",
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-transparent text-[var(--border)]"
            )}
          />
        ))}
      </div>
      <span className={cn("text-[var(--muted)]", size === "sm" ? "text-xs" : "text-sm")}>
        {rating.toFixed(1)}
        {reviewCount !== undefined && ` (${reviewCount.toLocaleString()})`}
      </span>
    </div>
  );
}
