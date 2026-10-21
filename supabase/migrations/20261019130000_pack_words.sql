-- Content is database-driven: pack words, meanings and mnemonics live here, and the app pulls changes
-- into its local SQLite copy. Edit rows in the Supabase table editor; `updated_at` bumps automatically,
-- so devices fetch the edit on their next sync.

alter table public.packs add column slug text unique;
alter table public.packs add column updated_at timestamptz not null default now();

create table public.pack_words (
  pack_slug text not null references public.packs (slug) on delete cascade,
  word text not null,
  pos text not null check (pos in ('noun', 'verb', 'adj')),
  meaning text not null,
  sounds_like text,                             -- keyword-method sound-alike, e.g. 'convoy + loot'
  image text,                                   -- scene joining the sound-alike to the meaning
  position int not null,
  updated_at timestamptz not null default now(),
  primary key (pack_slug, word)
);
create index pack_words_updated_idx on public.pack_words (updated_at);
alter table public.pack_words enable row level security;

-- There is no sign-in yet, so free packs must be readable with the anon key.
-- TODO(PLAN: Money): let premium users read premium pack words.
create policy "anon read free packs" on public.packs for select to anon using (not is_premium);
create policy "read free pack words" on public.pack_words for select to anon, authenticated
  using (exists (select 1 from public.packs p where p.slug = pack_slug and not p.is_premium));

create function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger packs_updated_at before update on public.packs
  for each row execute function public.set_updated_at();
create trigger pack_words_updated_at before update on public.pack_words
  for each row execute function public.set_updated_at();
