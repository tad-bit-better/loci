import { packWords, type PackWord } from './packs';

/** A pack word with its keyword mnemonic: everything the drill needs to teach it. */
export type DrillWord = PackWord & { soundsLike: string; image: string };

const hasMnemonic = (w: PackWord): w is DrillWord => Boolean(w.soundsLike && w.image);

/** Small seeded PRNG (mulberry32): the same seed gives the same sequence on every device. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/**
 * `n` distinct words that have a mnemonic, so no word appears without help. With a seed (the Daily
 * Challenge passes the date), devices with the same pack contents get the same words; until
 * `daily_challenges` seeds come from the server, editing the pack changes the daily words.
 */
export function pickWords(n: number, seed?: string): DrillWord[] {
  const rand = seed ? seeded(hash(seed)) : Math.random;
  const pool = packWords().filter(hasMnemonic);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}
