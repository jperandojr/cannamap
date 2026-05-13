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

function toArray(val: string) {
  return val.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function createSeedBank(_: unknown, formData: FormData) {
  const supabase = await assertAdmin();
  const name = (formData.get("name") as string).trim();
  const { error } = await supabase.from("seed_banks").insert({
    slug: slugify(name),
    name,
    description: formData.get("description"),
    country: formData.get("country"),
    website: formData.get("website"),
    shipping_countries: toArray(formData.get("shipping_countries") as string),
    logo_url: formData.get("logo_url"),
    verified: formData.get("verified") === "on",
    strain_count: Number(formData.get("strain_count")) || 0,
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/seed-banks");
  revalidatePath("/seed-banks");
  redirect("/admin/seed-banks");
}

export async function updateSeedBank(id: string, _: unknown, formData: FormData) {
  const supabase = await assertAdmin();
  const name = (formData.get("name") as string).trim();
  const { error } = await supabase.from("seed_banks").update({
    name,
    description: formData.get("description"),
    country: formData.get("country"),
    website: formData.get("website"),
    shipping_countries: toArray(formData.get("shipping_countries") as string),
    logo_url: formData.get("logo_url"),
    verified: formData.get("verified") === "on",
    strain_count: Number(formData.get("strain_count")) || 0,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/seed-banks");
  revalidatePath("/seed-banks");
  redirect("/admin/seed-banks");
}

export async function deleteSeedBank(id: string) {
  const supabase = await assertAdmin();
  await supabase.from("seed_banks").delete().eq("id", id);
  revalidatePath("/admin/seed-banks");
  revalidatePath("/seed-banks");
}
