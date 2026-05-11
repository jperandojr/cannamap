"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { EntityType } from "@/lib/types";

export type ReviewState = { error: string | null; success: boolean };

export async function submitReview(
  entityType: EntityType,
  entityId: string,
  pathname: string,
  _: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in to leave a review.", success: false };

  const rating = parseInt(formData.get("rating")?.toString() ?? "0");
  const title = formData.get("title")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";

  if (!rating || rating < 1 || rating > 5) {
    return { error: "Please select a rating.", success: false };
  }
  if (!content || content.length < 10) {
    return { error: "Review must be at least 10 characters.", success: false };
  }

  const { error } = await supabase.from("reviews").upsert(
    { user_id: user.id, entity_type: entityType, entity_id: entityId, rating, title: title || null, content },
    { onConflict: "user_id,entity_type,entity_id" }
  );

  if (error) return { error: "Failed to submit review. Please try again.", success: false };

  revalidatePath(pathname);
  return { error: null, success: true };
}

export async function deleteReview(
  reviewId: string,
  pathname: string
): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("reviews").delete().eq("id", reviewId).eq("user_id", user.id);
  revalidatePath(pathname);
}
