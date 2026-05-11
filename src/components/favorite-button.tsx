"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleFavorite } from "@/app/actions/favorites";
import type { EntityType } from "@/lib/types";

interface FavoriteButtonProps {
  entityType: EntityType;
  entityId: string;
  initialFavorited: boolean;
  isLoggedIn: boolean;
  pathname: string;
}

export function FavoriteButton({
  entityType,
  entityId,
  initialFavorited,
  isLoggedIn,
  pathname,
}: FavoriteButtonProps) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    startTransition(async () => {
      try {
        const result = await toggleFavorite(entityType, entityId, pathname);
        setFavorited(result.favorited);
      } catch {
        // silently ignore — user will be redirected if session expired
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "p-2 rounded-lg border transition-colors",
        favorited
          ? "border-red-300 bg-red-50 text-red-500"
          : "border-[var(--border)] hover:bg-[var(--surface)] text-[var(--muted)] hover:text-red-400",
        pending && "opacity-50 cursor-not-allowed"
      )}
    >
      <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
    </button>
  );
}
