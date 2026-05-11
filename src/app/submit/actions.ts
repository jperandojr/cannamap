"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitState = {
  success?: boolean;
  error?: string;
};

export async function submitListing(
  _: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  const supabase = await createClient();

  const type = formData.get("type") as string;
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const website = (formData.get("website") as string)?.trim();
  const contactEmail = (formData.get("contact_email") as string)?.trim();
  const notes = (formData.get("notes") as string)?.trim();
  const country = (formData.get("country") as string)?.trim();
  const address = (formData.get("address") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();
  const state = (formData.get("state") as string)?.trim();

  if (!type || !name || !description || !contactEmail) {
    return { error: "Please fill in all required fields." };
  }

  if (type === "dispensary" && (!address || !city || !state)) {
    return { error: "Please provide the dispensary address, city, and state." };
  }

  if (type === "seed_bank" && !country) {
    return { error: "Please provide the seed bank's country." };
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("submissions").insert({
    type,
    name,
    description,
    website: website || null,
    contact_email: contactEmail,
    notes: notes || null,
    country: country || null,
    address: address || null,
    city: city || null,
    state: state || null,
    user_id: user?.id ?? null,
  });

  if (error) {
    return { error: "Failed to submit your listing. Please try again." };
  }

  return { success: true };
}
