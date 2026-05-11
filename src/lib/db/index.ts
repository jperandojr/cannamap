import { createClient } from "@/lib/supabase/server";
import type { Strain, Dispensary, SeedBank, Article, GrowingTip, Profile } from "@/lib/types";

// --- Strains ---
export interface StrainFilters {
  type?: string;
  q?: string;
  sort?: string;
  thc?: string;
  effect?: string;
}

const thcRanges: Record<string, [number, number]> = {
  "under10": [0, 10],
  "10-15": [10, 15],
  "15-20": [15, 20],
  "20-25": [20, 25],
  "25plus": [25, 100],
};

export async function getStrains(filters?: StrainFilters): Promise<Strain[]> {
  const supabase = await createClient();
  let query = supabase.from("strains").select("*");

  if (filters?.type && filters.type !== "all") {
    query = query.eq("type", filters.type.toLowerCase());
  }
  if (filters?.q) {
    query = query.ilike("name", `%${filters.q}%`);
  }
  if (filters?.effect) {
    query = query.contains("effects", [filters.effect]);
  }
  if (filters?.thc && thcRanges[filters.thc]) {
    const [min, max] = thcRanges[filters.thc];
    query = query.gte("thc_max", min).lte("thc_max", max);
  }

  if (filters?.sort === "rating") {
    query = query.order("rating", { ascending: false });
  } else if (filters?.sort === "thc") {
    query = query.order("thc_max", { ascending: false });
  } else {
    query = query.order("review_count", { ascending: false });
  }

  const { data } = await query;
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
export interface DispensaryFilters {
  q?: string;
  state?: string;
  sort?: string;
  verified?: boolean;
}

export async function getDispensaries(filters?: DispensaryFilters): Promise<Dispensary[]> {
  const supabase = await createClient();
  let query = supabase.from("dispensaries").select("*");

  if (filters?.q) {
    query = query.ilike("name", `%${filters.q}%`);
  }
  if (filters?.state && filters.state !== "all") {
    query = query.eq("state", filters.state.toUpperCase());
  }
  if (filters?.verified) {
    query = query.eq("verified", true);
  }

  if (filters?.sort === "rating") {
    query = query.order("rating", { ascending: false });
  } else {
    query = query.order("review_count", { ascending: false });
  }

  const { data } = await query;
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

// --- Profile ---
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return (data as Profile) ?? null;
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
