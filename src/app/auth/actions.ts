"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthState = { error: string | null };

export async function login(_: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (error) return { error: error.message };
  redirect("/");
}

export async function register(_: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm_password") as string;
  if (password !== confirm) return { error: "Passwords do not match." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password,
    options: {
      data: { username: formData.get("username") as string },
    },
  });
  if (error) return { error: error.message };
  redirect("/?welcome=1");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
