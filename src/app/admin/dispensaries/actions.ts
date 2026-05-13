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

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function buildHours(formData: FormData) {
  const hours: Record<string, string> = {};
  for (const day of DAYS) {
    const val = (formData.get(`hours_${day}`) as string)?.trim();
    if (val) hours[day] = val;
  }
  return hours;
}

export async function createDispensary(_: unknown, formData: FormData) {
  const supabase = await assertAdmin();
  const name = (formData.get("name") as string).trim();
  const { error } = await supabase.from("dispensaries").insert({
    slug: slugify(name),
    name,
    description: formData.get("description"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    country: (formData.get("country") as string) || "US",
    phone: formData.get("phone"),
    website: formData.get("website"),
    hours: buildHours(formData),
    amenities: toArray(formData.get("amenities") as string),
    images: toArray(formData.get("images") as string),
    verified: formData.get("verified") === "on",
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/dispensaries");
  revalidatePath("/dispensaries");
  redirect("/admin/dispensaries");
}

export async function updateDispensary(id: string, _: unknown, formData: FormData) {
  const supabase = await assertAdmin();
  const name = (formData.get("name") as string).trim();
  const { error } = await supabase.from("dispensaries").update({
    name,
    description: formData.get("description"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    country: (formData.get("country") as string) || "US",
    phone: formData.get("phone"),
    website: formData.get("website"),
    hours: buildHours(formData),
    amenities: toArray(formData.get("amenities") as string),
    images: toArray(formData.get("images") as string),
    verified: formData.get("verified") === "on",
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/dispensaries");
  revalidatePath("/dispensaries");
  redirect("/admin/dispensaries");
}

export async function deleteDispensary(id: string) {
  const supabase = await assertAdmin();
  await supabase.from("dispensaries").delete().eq("id", id);
  revalidatePath("/admin/dispensaries");
  revalidatePath("/dispensaries");
}
