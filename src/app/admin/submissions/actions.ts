"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/db";

async function assertAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const profile = await getProfile(user.id);
  if (profile?.role !== "admin") throw new Error("Forbidden");
  return supabase;
}

export async function updateSubmissionStatus(id: string, status: "approved" | "rejected") {
  const supabase = await assertAdmin();
  await supabase.from("submissions").update({ status }).eq("id", id);
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}
