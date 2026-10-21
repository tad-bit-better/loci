import { greMnemonics } from '@/data/greMnemonics';
import { greWords } from '@/data/greVocab';
import { db } from './localDb';
import { supabase } from './supabase';

/**
 * Content packs are database-driven. Supabase `pack_words` is the source of truth (edit it in the
 * dashboard); the device keeps a copy in SQLite and reads only that, so drills work offline.
 * A fresh install starts from the snapshot bundled in src/data, then pulls newer rows when online.
 */
export const GRE_PACK = 'gre-starter';

/** When the bundled snapshot was taken. Must match `updated_at` in the gre_starter_pack migration. */
const SNAPSHOT_AT = '2026-10-19T00:00:00.000Z';

export type PackWord = {
  word: string;
  pos: 'noun' | 'verb' | 'adj';
  meaning: string;
  soundsLike: string | null;
  image: string | null;
};

type Row = {
  word: string;
  pos: PackWord['pos'];
  meaning: string;
  sounds_like: string | null;
  image: string | null;
};

let cache: PackWord[] = [];

/** Words of the loaded pack, in pack order. Empty until `initPacks` has run. */
export const packWords = () => cache;
export const packWord = (word: string) => cache.find((w) => w.word === word);

/** First launch: copy the bundled snapshot into SQLite so packs work before any sync. */
async function seedFromSnapshot() {
  const have = await db.getFirstAsync('SELECT 1 FROM packs WHERE slug = ?', GRE_PACK);
  if (have) return;
  await db.withTransactionAsync(async () => {
    await db.runAsync(
      'INSERT INTO packs (slug, title, is_premium, updated_at) VALUES (?, ?, 0, ?)',
      GRE_PACK,
      'GRE starter words',
      SNAPSHOT_AT,
    );
    for (const [i, v] of greWords.entries()) {
      const m = greMnemonics[v.word];
      await db.runAsync(
        `INSERT INTO pack_words (pack_slug, word, pos, meaning, sounds_like, image, position, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        GRE_PACK,
        v.word,
        v.pos,
        v.meaning,
        m?.soundsLike ?? null,
        m?.image ?? null,
        i,
        SNAPSHOT_AT,
      );
    }
  });
}

async function load(slug = GRE_PACK) {
  const rows = await db.getAllAsync<Row>(
    'SELECT word, pos, meaning, sounds_like, image FROM pack_words WHERE pack_slug = ? ORDER BY position',
    slug,
  );
  cache = rows.map((r) => ({
    word: r.word,
    pos: r.pos,
    meaning: r.meaning,
    soundsLike: r.sounds_like,
    image: r.image,
  }));
}

/**
 * Pull pack words changed on the server since the newest local copy. Returns whether anything changed.
 * No-op without a backend. Deleting a word on the server doesn't remove it locally yet.
 */
async function pull() {
  if (!supabase) return false;
  const latest = await db.getFirstAsync<{ at: string | null }>(
    'SELECT MAX(updated_at) AS at FROM pack_words',
  );
  const [packs, words] = await Promise.all([
    supabase.from('packs').select('slug, title, is_premium, updated_at').not('slug', 'is', null),
    supabase
      .from('pack_words')
      .select('pack_slug, word, pos, meaning, sounds_like, image, position, updated_at')
      .gt('updated_at', latest?.at ?? '1970-01-01T00:00:00Z'),
  ]);
  if (packs.error) throw packs.error;
  if (words.error) throw words.error;
  if (!words.data.length) return false;

  await db.withTransactionAsync(async () => {
    for (const p of packs.data) {
      await db.runAsync(
        `INSERT INTO packs (slug, title, is_premium, updated_at) VALUES (?, ?, ?, ?)
         ON CONFLICT(slug) DO UPDATE SET title = excluded.title, is_premium = excluded.is_premium,
           updated_at = excluded.updated_at`,
        p.slug,
        p.title,
        p.is_premium ? 1 : 0,
        new Date(p.updated_at).toISOString(),
      );
    }
    for (const w of words.data) {
      await db.runAsync(
        `INSERT INTO pack_words (pack_slug, word, pos, meaning, sounds_like, image, position, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(pack_slug, word) DO UPDATE SET pos = excluded.pos, meaning = excluded.meaning,
           sounds_like = excluded.sounds_like, image = excluded.image, position = excluded.position,
           updated_at = excluded.updated_at`,
        w.pack_slug,
        w.word,
        w.pos,
        w.meaning,
        w.sounds_like,
        w.image,
        w.position,
        // Normalise so MAX(updated_at) compares like with like.
        new Date(w.updated_at).toISOString(),
      );
    }
  });
  return true;
}

/** Root layout calls this after `migrate()`. Resolves once words are usable; the server pull runs after. */
export async function initPacks() {
  await seedFromSnapshot();
  await load();
  pull()
    .then((changed) => (changed ? load() : undefined))
    .catch((e) => console.warn('Pack sync failed (using local copy)', e));
}
