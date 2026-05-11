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
export interface SeedBankFilters {
  q?: string;
  country?: string;
  sort?: string;
  verified?: boolean;
}

export async function getSeedBanks(filters?: SeedBankFilters): Promise<SeedBank[]> {
  const supabase = await createClient();
  let query = supabase.from("seed_banks").select("*");

  if (filters?.q) query = query.ilike("name", `%${filters.q}%`);
  if (filters?.country && filters.country !== "all") query = query.eq("country", filters.country);
  if (filters?.verified) query = query.eq("verified", true);

  if (filters?.sort === "strains") query = query.order("strain_count", { ascending: false });
  else if (filters?.sort === "reviews") query = query.order("review_count", { ascending: false });
  else query = query.order("rating", { ascending: false });

  const { data } = await query;
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
export interface ArticleFilters {
  q?: string;
  category?: string;
}

export async function getArticles(filters?: ArticleFilters): Promise<Article[]> {
  const supabase = await createClient();
  let query = supabase.from("articles").select("*").not("published_at", "is", null);

  if (filters?.q) query = query.ilike("title", `%${filters.q}%`);
  if (filters?.category && filters.category !== "all") query = query.eq("category", filters.category);

  query = query.order("published_at", { ascending: false });
  const { data } = await query;
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

// --- Favorites ---
export async function getUserFavorites(userId: string) {
  const supabase = await createClient();
  const { data: favs } = await supabase
    .from("favorites")
    .select("id, entity_type, entity_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (!favs || favs.length === 0) return { strains: [], dispensaries: [], seedBanks: [] };

  const strainIds = favs.filter((f) => f.entity_type === "strain").map((f) => f.entity_id);
  const dispensaryIds = favs.filter((f) => f.entity_type === "dispensary").map((f) => f.entity_id);
  const seedBankIds = favs.filter((f) => f.entity_type === "seed_bank").map((f) => f.entity_id);

  const [strains, dispensaries, seedBanks] = await Promise.all([
    strainIds.length
      ? supabase.from("strains").select("id,slug,name,type,image_url,rating,review_count").in("id", strainIds)
      : { data: [] },
    dispensaryIds.length
      ? supabase.from("dispensaries").select("id,slug,name,city,state,rating,review_count,images").in("id", dispensaryIds)
      : { data: [] },
    seedBankIds.length
      ? supabase.from("seed_banks").select("id,slug,name,country,rating,review_count").in("id", seedBankIds)
      : { data: [] },
  ]);

  return {
    strains: (strains.data ?? []) as Pick<Strain, "id" | "slug" | "name" | "type" | "image_url" | "rating" | "review_count">[],
    dispensaries: (dispensaries.data ?? []) as Pick<Dispensary, "id" | "slug" | "name" | "city" | "state" | "rating" | "review_count">[],
    seedBanks: (seedBanks.data ?? []) as Pick<SeedBank, "id" | "slug" | "name" | "country" | "rating" | "review_count">[],
  };
}

// --- Reviews ---
export interface ReviewWithAuthor {
  id: string;
  rating: number;
  title: string | null;
  content: string;
  helpful_count: number;
  created_at: string;
  profiles: { username: string; avatar_url: string | null } | null;
}

export async function getReviews(entityType: string, entityId: string): Promise<ReviewWithAuthor[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("id, rating, title, content, helpful_count, created_at, profiles(username, avatar_url)")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("created_at", { ascending: false });
  return (data as unknown as ReviewWithAuthor[]) ?? [];
}

export async function getUserReview(entityType: string, entityId: string): Promise<{ id: string; rating: number; title: string | null; content: string } | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("reviews")
    .select("id, rating, title, content")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .eq("user_id", user.id)
    .single();
  return data ?? null;
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
export interface GrowingTipFilters {
  q?: string;
  difficulty?: string;
  category?: string;
}

export async function getGrowingTips(filters?: GrowingTipFilters): Promise<GrowingTip[]> {
  const supabase = await createClient();
  let query = supabase.from("growing_tips").select("*").not("published_at", "is", null);

  if (filters?.q) query = query.ilike("title", `%${filters.q}%`);
  if (filters?.difficulty && filters.difficulty !== "all") query = query.eq("difficulty", filters.difficulty.toLowerCase());
  if (filters?.category && filters.category !== "all") query = query.ilike("category", filters.category);

  query = query.order("published_at", { ascending: false });
  const { data } = await query;
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

// --- Admin ---
export interface Submission {
  id: string;
  type: "dispensary" | "seed_bank";
  name: string;
  description: string;
  website: string | null;
  contact_email: string;
  country: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  notes: string | null;
  user_id: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export async function getSubmissions(status?: string): Promise<Submission[]> {
  const supabase = await createClient();
  let query = supabase.from("submissions").select("*").order("created_at", { ascending: false });
  if (status && status !== "all") query = query.eq("status", status);
  const { data } = await query;
  return (data as Submission[]) ?? [];
}

export async function getAdminStats() {
  const supabase = await createClient();
  const [strains, dispensaries, seedBanks, articles, tips, pending, approved, rejected] = await Promise.all([
    supabase.from("strains").select("id", { count: "exact", head: true }),
    supabase.from("dispensaries").select("id", { count: "exact", head: true }),
    supabase.from("seed_banks").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("growing_tips").select("id", { count: "exact", head: true }),
    supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "approved"),
    supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "rejected"),
  ]);
  return {
    strains: strains.count ?? 0,
    dispensaries: dispensaries.count ?? 0,
    seedBanks: seedBanks.count ?? 0,
    articles: articles.count ?? 0,
    tips: tips.count ?? 0,
    submissions: { pending: pending.count ?? 0, approved: approved.count ?? 0, rejected: rejected.count ?? 0 },
  };
}
