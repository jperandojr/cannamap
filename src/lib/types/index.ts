export type StrainType = "indica" | "sativa" | "hybrid";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type EntityType = "strain" | "dispensary" | "seed_bank";

export interface Strain {
  id: string;
  slug: string;
  name: string;
  type: StrainType;
  description: string;
  thc_min: number;
  thc_max: number;
  cbd_min: number;
  cbd_max: number;
  effects: string[];
  flavors: string[];
  medical_uses: string[];
  image_url: string;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface Dispensary {
  id: string;
  slug: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  website: string;
  hours: Record<string, string>;
  amenities: string[];
  images: string[];
  verified: boolean;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface SeedBank {
  id: string;
  slug: string;
  name: string;
  description: string;
  country: string;
  website: string;
  shipping_countries: string[];
  logo_url: string;
  verified: boolean;
  rating: number;
  review_count: number;
  strain_count: number;
  created_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author_name: string;
  author_avatar: string;
  image_url: string;
  published_at: string;
  read_time: number;
}

export interface GrowingTip {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  difficulty: Difficulty;
  category: string;
  author_name: string;
  image_url: string;
  published_at: string;
  read_time: number;
}

export interface Review {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  entity_type: EntityType;
  entity_id: string;
  rating: number;
  title: string;
  content: string;
  helpful_count: number;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  role: "user" | "admin";
  created_at: string;
}
