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

// --- Search ---
export async function search(q: string) {
  const supabase = await createClient();
  const term = `%${q}%`;
  const [strains, dispensaries, seedBanks, articles, tips] = await Promise.all([
    supabase.from("strains").select("id,slug,name,type,image_url,rating,review_count").ilike("name", term).limit(5),
    supabase.from("dispensaries").select("id,slug,name,city,state,image_url,rating,review_count").ilike("name", term).limit(5),
    supabase.from("seed_banks").select("id,slug,name,country,rating,review_count").ilike("name", term).limit(5),
    supabase.from("articles").select("id,slug,title,category,image_url,published_at,read_time").ilike("title", term).not("published_at", "is", null).limit(5),
    supabase.from("growing_tips").select("id,slug,title,difficulty,category,image_url,published_at,read_time").ilike("title", term).not("published_at", "is", null).limit(5),
  ]);
  return {
    strains: (strains.data ?? []) as Pick<Strain, "id" | "slug" | "name" | "type" | "image_url" | "rating" | "review_count">[],
    dispensaries: (dispensaries.data ?? []) as Pick<Dispensary, "id" | "slug" | "name" | "city" | "state" | "rating" | "review_count">[],
    seedBanks: (seedBanks.data ?? []) as Pick<SeedBank, "id" | "slug" | "name" | "country" | "rating" | "review_count">[],
    articles: (articles.data ?? []) as Pick<Article, "id" | "slug" | "title" | "category" | "image_url" | "published_at" | "read_time">[],
    tips: (tips.data ?? []) as Pick<GrowingTip, "id" | "slug" | "title" | "difficulty" | "category" | "image_url" | "published_at" | "read_time">[],
  };
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
