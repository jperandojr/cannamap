"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/db";
import { slugify } from "@/lib/utils";

async function assertAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const profile = await getProfile(user.id);
  if (profile?.role !== "admin") throw new Error("Forbidden");
  return supabase;
}

export async function createGrowingTip(_: unknown, formData: FormData) {
  const supabase = await assertAdmin();
  const title = (formData.get("title") as string).trim();
  const publishedAt = formData.get("published_at") as string;
  const { error } = await supabase.from("growing_tips").insert({
    slug: slugify(title),
    title,
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    difficulty: formData.get("difficulty"),
    category: formData.get("category"),
    author_name: formData.get("author_name"),
    image_url: formData.get("image_url"),
    read_time: Number(formData.get("read_time")) || 5,
    published_at: publishedAt || null,
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/growing-tips");
  revalidatePath("/growing-tips");
  redirect("/admin/growing-tips");
}

export async function updateGrowingTip(id: string, _: unknown, formData: FormData) {
  const supabase = await assertAdmin();
  const title = (formData.get("title") as string).trim();
  const publishedAt = formData.get("published_at") as string;
  const { error } = await supabase.from("growing_tips").update({
    title,
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    difficulty: formData.get("difficulty"),
    category: formData.get("category"),
    author_name: formData.get("author_name"),
    image_url: formData.get("image_url"),
    read_time: Number(formData.get("read_time")) || 5,
    published_at: publishedAt || null,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/growing-tips");
  revalidatePath("/growing-tips");
  redirect("/admin/growing-tips");
}

export async function deleteGrowingTip(id: string) {
  const supabase = await assertAdmin();
  await supabase.from("growing_tips").delete().eq("id", id);
  revalidatePath("/admin/growing-tips");
  revalidatePath("/growing-tips");
}
