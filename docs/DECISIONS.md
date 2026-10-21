# Decision log

Newest first. One entry per decision: what, why, and what would make us revisit it.

## 2026-10-19 — No AI until paid accounts; database-driven content; free hosting only
No LLM calls (and no LLM bill) until there are registered, paying users to fund them. Words, meanings and mnemonics live in Supabase `pack_words`, edited in the dashboard and pulled to SQLite; the app bundles a snapshot so a fresh install works offline. Hosting stays on free plans: Supabase free (500 MB DB, 50k MAU, pauses after 7 idle days), RevenueCat free under $2.5k monthly revenue, EAS free builds. Store fees (Apple $99/yr, Google $25 once) are unavoidable for publishing. The `generate-mnemonic` function and `mnemonic_cache` / `ai_usage` tables are parked, not removed.
Revisit: when premium launches (AI for users' own items), or if the free DB limits or pausing bite.

## 2026-10-19 — Vocab drills use the keyword method (pulled forward from v1.2)
Abstract words can't be pictured at a stop, so each GRE word gets a chain: a concrete sound-alike ("convoy + loot") and an image joining it to the meaning, set at the stop. The mnemonics are our own writing (`src/data/greMnemonics.ts`), not AI, so they work offline with steady quality and no cost; AI stays for users' own items. Drills only use words that have one, are 10 words long, and recall shows the meaning and asks for the word (the direction GRE fill-in-the-blank questions use), with the sound-alike as the hint. Users can rewrite the image; their version is saved as `items.mnemonic`.
Revisit: once recall data shows which mnemonics fail most often; rewrite those first.

## 2026-10-19 — GRE vocabulary as the first content; meanings from WordNet
Drill words, Daily Challenge and palace samples come from a 143-word GRE starter list (`src/data/greVocab.ts`). The list is ours; meanings are WordNet glosses (sense picked by hand), because Princeton Review / Barron's / Magoosh definitions and mnemonics are copyrighted. WordNet's licence needs its notice shipped with the app and bars Princeton's name from marketing. Sample mnemonics were removed: every image should be the user's own or AI-made. Daily Challenge words are a seeded shuffle of the list by local date. Recall accepts one typo in words of 7+ letters, since the drill tests memory, not spelling. Onboarding keeps concrete nouns: abstract words would hide the story-method lift.
Revisit: WordNet glosses read stiffly; rewrite them in our own words if users find them hard. Move the daily seed to `daily_challenges` before leaderboards so app updates can't change the words.

## 2026-10-19 — Drill words become FSRS review items; XP lives on the palace
Each drill word is an `items` row with `source = 'drill'` (prompt = stop, answer = word), found again by that pair on the next drill. Correct → Good, wrong or not reached → Again (no Hard/Easy until we time each answer). XP is `palaces.xp`; level = 1 + xp / 500 as a placeholder curve. Streak is computed from `sessions` dates (local time), not stored. A migration adds `drill` to the server `items.source` check.
Revisit: when room unlocks get a real XP curve, or if drill items crowd the review queue.

## 2026-10-19 — Onboarding tests use free recall with lenient matching
Baseline and retest are free recall (any order, 60 s): it is the fairest comparison between "no technique" and the story method, and ordered recall would punish the baseline twice. Typed words ignore case, punctuation and a plural s (`src/lib/recall.ts`) so a near-miss never shrinks the felt lift. Two different 10-word lists of similar concrete nouns, so the retest is not a re-read. Scores live in `settings` (`baselineScore`, `retestScore`) for now.
Revisit: if retest lift is low or noisy in analytics, or if we want these as `sessions` rows for sync.

## 2026-10-19 — Development build instead of Expo Go
Store Expo Go lags behind SDK 57, and RevenueCat needs native code. All testing uses the Loci dev build.
Revisit: never for this project.

## 2026-10-19 — Notebook visual language, light mode default
Ruled paper, highlighters, pencil, red pen; Kalam / Caveat / Atkinson Hyperlegible. Feels personal and
student-made rather than generic. Highlighter colours encode memory strength. See `docs/DESIGN.md`.
Revisit: if usability testing shows the handwriting fonts hurt readability (body is already Atkinson).

## 2026-10-19 — Word drill is two explicit steps
"1 Memorize → 2 Recall" shown on both screens; users were confused by recall without seeing memorize.

## 2026-10-19 — Pricing
India ₹99/mo, ₹499/yr. US/EU $7.99/mo, $39.99/yr. Same ~58% yearly saving everywhere; yearly default
with 7-day trial. Revisit: A/B test yearly at ₹599 / $49.99 once there are a few hundred paying users.

## 2026-10-19 — Broad audience, goal chosen in onboarding
One app; goal (exams / work / language / fun) changes what Home leads with and the paywall pitch.
Country from locale, not a question. Revisit: if D7 retention differs a lot by goal, focus the winner.

## 2026-10-19 — Offline first with SQLite; Supabase optional
Core loop must work on a train with no signal. Supabase for accounts, sync, leagues, AI.

## 2026-10-19 — FSRS (ts-fsrs) for spaced repetition
Modern, better than SM-2, maintained TypeScript implementation.

## 2026-10-19 — AI behind an edge function with cache + daily limit
Keeps keys off device, controls cost on the free tier (5/day default).
