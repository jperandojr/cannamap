"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { EntityType } from "@/lib/types";

export async function toggleFavorite(
  entityType: EntityType,
  entityId: string,
  pathname: string
): Promise<{ favorited: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .single();

  if (existing) {
    await supabase.from("favorites").delete().eq("id", existing.id);
    revalidatePath(pathname);
    return { favorited: false };
  } else {
    await supabase.from("favorites").insert({
      user_id: user.id,
      entity_type: entityType,
      entity_id: entityId,
    });
    revalidatePath(pathname);
    return { favorited: true };
  }
}

export async function isFavorited(
  entityType: EntityType,
  entityId: string
): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .single();

  return !!data;
}
