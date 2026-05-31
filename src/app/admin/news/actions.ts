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

export async function createArticle(_: unknown, formData: FormData) {
  const supabase = await assertAdmin();
  const title = (formData.get("title") as string).trim();
  const publishedAt = formData.get("published_at") as string;
  const { error } = await supabase.from("articles").insert({
    slug: slugify(title),
    title,
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    author_name: formData.get("author_name"),
    author_avatar: formData.get("author_avatar"),
    image_url: formData.get("image_url"),
    read_time: Number(formData.get("read_time")) || 5,
    published_at: publishedAt || null,
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/news");
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function updateArticle(id: string, _: unknown, formData: FormData) {
  const supabase = await assertAdmin();
  const title = (formData.get("title") as string).trim();
  const publishedAt = formData.get("published_at") as string;
  const { error } = await supabase.from("articles").update({
    title,
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    author_name: formData.get("author_name"),
    author_avatar: formData.get("author_avatar"),
    image_url: formData.get("image_url"),
    read_time: Number(formData.get("read_time")) || 5,
    published_at: publishedAt || null,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/news");
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function deleteArticle(id: string) {
  const supabase = await assertAdmin();
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/news");
  revalidatePath("/news");
}
