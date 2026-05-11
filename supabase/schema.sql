-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

-- Strains
create table public.strains (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  type text not null check (type in ('indica', 'sativa', 'hybrid')),
  description text not null,
  thc_min numeric(4,1) not null default 0,
  thc_max numeric(4,1) not null default 0,
  cbd_min numeric(4,2) not null default 0,
  cbd_max numeric(4,2) not null default 0,
  effects text[] not null default '{}',
  flavors text[] not null default '{}',
  medical_uses text[] not null default '{}',
  image_url text,
  rating numeric(3,2) default 0,
  review_count integer default 0,
  created_at timestamptz default now()
);
alter table public.strains enable row level security;
create policy "Strains are viewable by everyone" on public.strains for select using (true);
create policy "Only admins can insert/update strains" on public.strains for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Dispensaries
create table public.dispensaries (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text not null,
  address text not null,
  city text not null,
  state text not null,
  zip text,
  country text not null default 'US',
  lat numeric(10,7),
  lng numeric(10,7),
  phone text,
  website text,
  hours jsonb default '{}',
  amenities text[] default '{}',
  images text[] default '{}',
  verified boolean default false,
  rating numeric(3,2) default 0,
  review_count integer default 0,
  created_at timestamptz default now()
);
alter table public.dispensaries enable row level security;
create policy "Dispensaries are viewable by everyone" on public.dispensaries for select using (true);

-- Seed Banks
create table public.seed_banks (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text not null,
  country text not null,
  website text,
  shipping_countries text[] default '{}',
  logo_url text,
  verified boolean default false,
  rating numeric(3,2) default 0,
  review_count integer default 0,
  strain_count integer default 0,
  created_at timestamptz default now()
);
alter table public.seed_banks enable row level security;
create policy "Seed banks are viewable by everyone" on public.seed_banks for select using (true);

-- Articles
create table public.articles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text not null,
  category text not null,
  author_id uuid references public.profiles(id),
  author_name text not null default 'Editorial Team',
  author_avatar text,
  image_url text,
  published_at timestamptz,
  read_time integer default 5,
  created_at timestamptz default now()
);
alter table public.articles enable row level security;
create policy "Published articles are viewable by everyone" on public.articles for select using (published_at is not null and published_at <= now());

-- Growing Tips
create table public.growing_tips (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text not null,
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced')),
  category text not null,
  author_id uuid references public.profiles(id),
  author_name text not null default 'Growing Expert',
  image_url text,
  published_at timestamptz,
  read_time integer default 5,
  created_at timestamptz default now()
);
alter table public.growing_tips enable row level security;
create policy "Published tips are viewable by everyone" on public.growing_tips for select using (published_at is not null and published_at <= now());

-- Reviews
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  entity_type text not null check (entity_type in ('strain', 'dispensary', 'seed_bank')),
  entity_id uuid not null,
  rating integer not null check (rating between 1 and 5),
  title text,
  content text not null,
  helpful_count integer default 0,
  created_at timestamptz default now(),
  unique(user_id, entity_type, entity_id)
);
alter table public.reviews enable row level security;
create policy "Reviews are viewable by everyone" on public.reviews for select using (true);
create policy "Users can insert their own reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Users can update their own reviews" on public.reviews for update using (auth.uid() = user_id);
create policy "Users can delete their own reviews" on public.reviews for delete using (auth.uid() = user_id);

-- Favorites
create table public.favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  entity_type text not null check (entity_type in ('strain', 'dispensary', 'seed_bank')),
  entity_id uuid not null,
  created_at timestamptz default now(),
  unique(user_id, entity_type, entity_id)
);
alter table public.favorites enable row level security;
create policy "Users can view their own favorites" on public.favorites for select using (auth.uid() = user_id);
create policy "Users can manage their own favorites" on public.favorites for all using (auth.uid() = user_id);

-- Auto-create profile on sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
