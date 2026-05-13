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

export async function createStrain(_: unknown, formData: FormData) {
  const supabase = await assertAdmin();
  const name = (formData.get("name") as string).trim();
  const { error } = await supabase.from("strains").insert({
    slug: slugify(name),
    name,
    type: formData.get("type"),
    description: formData.get("description"),
    thc_min: Number(formData.get("thc_min")),
    thc_max: Number(formData.get("thc_max")),
    cbd_min: Number(formData.get("cbd_min")),
    cbd_max: Number(formData.get("cbd_max")),
    effects: toArray(formData.get("effects") as string),
    flavors: toArray(formData.get("flavors") as string),
    medical_uses: toArray(formData.get("medical_uses") as string),
    image_url: formData.get("image_url"),
  });
  if (error) return { error: error.message };
  revalidatePath("/admin/strains");
  revalidatePath("/strains");
  redirect("/admin/strains");
}

export async function updateStrain(id: string, _: unknown, formData: FormData) {
  const supabase = await assertAdmin();
  const name = (formData.get("name") as string).trim();
  const { error } = await supabase.from("strains").update({
    name,
    type: formData.get("type"),
    description: formData.get("description"),
    thc_min: Number(formData.get("thc_min")),
    thc_max: Number(formData.get("thc_max")),
    cbd_min: Number(formData.get("cbd_min")),
    cbd_max: Number(formData.get("cbd_max")),
    effects: toArray(formData.get("effects") as string),
    flavors: toArray(formData.get("flavors") as string),
    medical_uses: toArray(formData.get("medical_uses") as string),
    image_url: formData.get("image_url"),
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/strains");
  revalidatePath("/strains");
  redirect("/admin/strains");
}

export async function deleteStrain(id: string) {
  const supabase = await assertAdmin();
  await supabase.from("strains").delete().eq("id", id);
  revalidatePath("/admin/strains");
  revalidatePath("/strains");
}
