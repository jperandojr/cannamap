import { createClient } from "@/lib/supabase/server";
import type { Strain, Dispensary, SeedBank, Article, GrowingTip } from "@/lib/types";

// --- Strains ---
export async function getStrains(): Promise<Strain[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("strains")
    .select("*")
    .order("review_count", { ascending: false });
  return (data as Strain[]) ?? [];
}

export async function getStrainBySlug(slug: string): Promise<Strain | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("strains")
    .select("*")
    .eq("slug", slug)
    .single();
  return (data as Strain) ?? null;
}

// --- Dispensaries ---
export async function getDispensaries(): Promise<Dispensary[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("dispensaries")
    .select("*")
    .order("review_count", { ascending: false });
  return (data as Dispensary[]) ?? [];
}

export async function getDispensaryBySlug(slug: string): Promise<Dispensary | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("dispensaries")
    .select("*")
    .eq("slug", slug)
    .single();
  return (data as Dispensary) ?? null;
}

// --- Seed Banks ---
export async function getSeedBanks(): Promise<SeedBank[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("seed_banks")
    .select("*")
    .order("rating", { ascending: false });
  return (data as SeedBank[]) ?? [];
}

export async function getSeedBankBySlug(slug: string): Promise<SeedBank | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("seed_banks")
    .select("*")
    .eq("slug", slug)
    .single();
  return (data as SeedBank) ?? null;
}

// --- Articles ---
export async function getArticles(): Promise<Article[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });
  return (data as Article[]) ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();
  return (data as Article) ?? null;
}

// --- Growing Tips ---
export async function getGrowingTips(): Promise<GrowingTip[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("growing_tips")
    .select("*")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });
  return (data as GrowingTip[]) ?? [];
}

export async function getGrowingTipBySlug(slug: string): Promise<GrowingTip | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("growing_tips")
    .select("*")
    .eq("slug", slug)
    .single();
  return (data as GrowingTip) ?? null;
}
