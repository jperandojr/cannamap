"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ProfileState = { error: string | null; success: boolean };

export async function updateProfile(
  _: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated.", success: false };

  const username = formData.get("username")?.toString().trim() ?? "";
  if (!username || username.length < 2) {
    return { error: "Username must be at least 2 characters.", success: false };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { error: "Username can only contain letters, numbers, and underscores.", success: false };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ username })
    .eq("id", user.id);

  if (error) {
    if (error.code === "23505") return { error: "That username is already taken.", success: false };
    return { error: "Failed to update profile. Please try again.", success: false };
  }

  revalidatePath("/profile");
  return { error: null, success: true };
}
