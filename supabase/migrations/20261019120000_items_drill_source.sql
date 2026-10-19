-- Words from drills become review items too (local `items.source = 'drill'`), so sync can push them.
alter table public.items drop constraint items_source_check;
alter table public.items
  add constraint items_source_check check (source in ('user', 'ai', 'pack', 'drill'));
