-- Loci initial schema. Apply with `supabase db push` (remote) or `supabase db reset` (local).
-- Every user-owned table has RLS: users only see and change their own rows.

create extension if not exists vector with schema extensions;

-- Profiles -------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  goals text[] not null default '{}',          -- exams | work | language | fun
  exam text,                                    -- e.g. 'UPSC', 'NEET', 'SAT'
  locale text,
  plan text not null default 'free',            -- free | premium (synced from RevenueCat webhook)
  created_at timestamptz not null default now()
);

-- Palaces, rooms, stops ------------------------------------------------------
create table public.palaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  theme text not null default 'night',
  level int not null default 1,
  xp int not null default 0,
  created_at timestamptz not null default now()
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  palace_id uuid not null references public.palaces (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  technique text,                               -- technique whose mastery unlocked this room
  position int not null,
  unlocked_at timestamptz
);

create table public.stops (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null,                          -- "the stove"
  position int not null
);

-- Items and spaced repetition -----------------------------------------------
create table public.items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stop_id uuid references public.stops (id) on delete set null,
  prompt text not null,
  answer text not null,
  mnemonic text,
  image_ref text,
  source text not null default 'user' check (source in ('user', 'ai', 'pack')),
  pack_id uuid,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.reviews (
  item_id uuid primary key references public.items (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  due_at timestamptz not null,
  stability double precision not null,
  difficulty double precision not null,
  reps int not null default 0,
  lapses int not null default 0,
  state smallint not null default 0,            -- ts-fsrs State enum
  last_review_at timestamptz,
  fsrs_card jsonb not null                      -- full ts-fsrs Card for lossless round trips
);
create index reviews_due_idx on public.reviews (user_id, due_at);

-- Progress and play ----------------------------------------------------------
create table public.technique_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  technique text not null,                      -- acronym | story | palace | peg | major | names | keyword
  xp int not null default 0,
  rank text not null default 'novice',          -- novice | apprentice | adept | master | grandmaster
  primary key (user_id, technique)
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  mode text not null,                           -- words | numbers | cards | names | daily | boss | review
  score int not null,
  total int not null,
  duration_ms int not null,
  daily_date date,                              -- set for Daily Challenge runs
  played_at timestamptz not null default now()
);
create index sessions_daily_idx on public.sessions (daily_date, score desc) where daily_date is not null;

create table public.daily_challenges (
  date date primary key,
  mode text not null default 'words',
  seed text not null                            -- same seed → same words for everyone
);

create table public.league_memberships (
  user_id uuid not null references auth.users (id) on delete cascade,
  league_id uuid not null,
  week date not null,                           -- Monday of the league week
  goal text,
  xp int not null default 0,
  primary key (user_id, week)
);

-- Content packs (public, read-only to users) ---------------------------------
create table public.packs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,                       -- exam | language | topic
  region text,
  is_premium boolean not null default true,
  created_at timestamptz not null default now()
);

-- AI: cache and daily limits -------------------------------------------------
create table public.mnemonic_cache (
  id uuid primary key default gen_random_uuid(),
  prompt_hash text not null unique,             -- sha256 of normalized (item, location, technique)
  item text not null,
  location text,
  technique text,
  mnemonic text not null,
  embedding extensions.vector(1024),            -- optional: fill once you pick an embeddings model
  upvotes int not null default 0,
  created_at timestamptz not null default now()
);

create table public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default current_date,
  count int not null default 0,
  primary key (user_id, day)
);

-- Row level security -----------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.palaces enable row level security;
alter table public.rooms enable row level security;
alter table public.stops enable row level security;
alter table public.items enable row level security;
alter table public.reviews enable row level security;
alter table public.technique_progress enable row level security;
alter table public.sessions enable row level security;
alter table public.league_memberships enable row level security;
alter table public.daily_challenges enable row level security;
alter table public.packs enable row level security;
alter table public.mnemonic_cache enable row level security;
alter table public.ai_usage enable row level security;

create policy "own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own palaces" on public.palaces for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rooms" on public.rooms for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own stops" on public.stops for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own items" on public.items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own reviews" on public.reviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own progress" on public.technique_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own sessions" on public.sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own leagues" on public.league_memberships for select using (auth.uid() = user_id);
create policy "read usage" on public.ai_usage for select using (auth.uid() = user_id);

-- Public read for shared content
create policy "read daily" on public.daily_challenges for select to authenticated using (true);
create policy "read packs" on public.packs for select to authenticated using (true);
-- mnemonic_cache and ai_usage writes happen only in the edge function with the service role.

-- New user → profile row -------------------------------------------------------
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Atomic daily AI counter used by the edge function ----------------------------
create function public.increment_ai_usage(p_user uuid, p_limit int)
returns int language plpgsql security definer set search_path = '' as $$
declare v int;
begin
  insert into public.ai_usage (user_id, day, count) values (p_user, current_date, 1)
  on conflict (user_id, day) do update set count = public.ai_usage.count + 1
  returning count into v;
  if v > p_limit then
    update public.ai_usage set count = count - 1 where user_id = p_user and day = current_date;
    return -1;
  end if;
  return p_limit - v;
end;
$$;
revoke execute on function public.increment_ai_usage(uuid, int) from public, anon, authenticated;
