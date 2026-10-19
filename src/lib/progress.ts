import { randomUUID } from 'expo-crypto';
import { cardFromJson, cardToJson, newCard, Rating, review } from './fsrs';
import { db, getSetting } from './localDb';

export const XP_PER_CORRECT = 10;
/** Flat curve until room unlocks are designed (PLAN.md: "XP, levels, palace growth"). */
export const XP_PER_LEVEL = 500;

export function levelFor(xp: number) {
  return { level: Math.floor(xp / XP_PER_LEVEL) + 1, into: xp % XP_PER_LEVEL, goal: XP_PER_LEVEL };
}

type PalaceRow = { id: string; name: string; xp: number };

/** The user's palace, created on first use (users who onboarded before palaces were saved get one lazily). */
export async function ensurePalace(name?: string): Promise<PalaceRow> {
  const row = await db.getFirstAsync<PalaceRow>(
    'SELECT id, name, xp FROM palaces ORDER BY created_at LIMIT 1',
  );
  if (row) return row;
  const palace = {
    id: randomUUID(),
    name: name ?? (await getSetting('palaceName')) ?? 'My Palace',
    xp: 0,
  };
  await db.runAsync('INSERT INTO palaces (id, name) VALUES (?, ?)', palace.id, palace.name);
  return palace;
}

export type DrillResult = {
  mode: string;
  words: string[];
  stops: string[];
  answers: { correct: boolean }[];
  startedAt: number;
  /** Parallel to `words`: the image the user memorized (their own rewrite, or the pack's). */
  mnemonics?: string[];
};

/** A finished drill: one `sessions` row, palace XP, and an FSRS review per word. Returns XP earned. */
export async function saveDrillResult(r: DrillResult) {
  const now = new Date();
  const score = r.answers.filter((a) => a.correct).length;
  const xp = score * XP_PER_CORRECT;
  const palace = await ensurePalace();

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      'INSERT INTO sessions (id, mode, score, total, duration_ms) VALUES (?, ?, ?, ?, ?)',
      randomUUID(),
      r.mode,
      score,
      r.words.length,
      now.getTime() - r.startedAt,
    );
    await db.runAsync('UPDATE palaces SET xp = xp + ? WHERE id = ?', xp, palace.id);

    for (let k = 0; k < r.words.length; k++) {
      // Not reached before the timer ran out counts as forgotten.
      const grade = r.answers[k]?.correct ? Rating.Good : Rating.Again;
      const existing = await db.getFirstAsync<{ id: string; fsrs_card: string }>(
        "SELECT id, fsrs_card FROM items WHERE source = 'drill' AND prompt = ? AND answer = ?",
        r.stops[k],
        r.words[k],
      );
      const { card } = review(existing ? cardFromJson(existing.fsrs_card) : newCard(now), grade, now);
      if (existing) {
        await db.runAsync(
          "UPDATE items SET fsrs_card = ?, mnemonic = COALESCE(?, mnemonic), updated_at = datetime('now'), dirty = 1 WHERE id = ?",
          cardToJson(card),
          r.mnemonics?.[k] ?? null,
          existing.id,
        );
      } else {
        await db.runAsync(
          "INSERT INTO items (id, prompt, answer, mnemonic, source, fsrs_card) VALUES (?, ?, ?, ?, 'drill', ?)",
          randomUUID(),
          r.stops[k],
          r.words[k],
          r.mnemonics?.[k] ?? null,
          cardToJson(card),
        );
      }
    }
  });
  return xp;
}

/** Local calendar date, YYYY-MM-DD. */
export const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Consecutive days with a session. Counts from yesterday if today has none yet, so it lasts until midnight. */
export async function getStreak(now = new Date()) {
  const rows = await db.getAllAsync<{ day: string }>(
    "SELECT DISTINCT date(played_at, 'localtime') AS day FROM sessions",
  );
  const days = new Set(rows.map((r) => r.day));
  const d = new Date(now);
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(dayKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export async function getProgress() {
  const palace = await db.getFirstAsync<{ name: string; xp: number }>(
    'SELECT name, xp FROM palaces ORDER BY created_at LIMIT 1',
  );
  const xp = palace?.xp ?? 0;
  return {
    palaceName: palace?.name ?? (await getSetting('palaceName')) ?? 'My Palace',
    xp,
    streak: await getStreak(),
    ...levelFor(xp),
  };
}

export type Progress = Awaited<ReturnType<typeof getProgress>>;
