# Loci — build plan

Living plan. Tick boxes as work lands; keep "Now" short. Product context: `docs/PRODUCT.md`.
Architecture: `docs/ARCHITECTURE.md`. Decisions: `docs/DECISIONS.md`.

**Goal of the MVP:** prove that users who feel the onboarding "2× recall" jump come back on day 7.

## Status (2026-10-19)

- [x] Expo SDK 57 project, TypeScript strict, Expo Router
- [x] Notebook UI kit (Paper, Highlight, PencilUnderline, SketchButton, IndexCard, StickyNote, Tape,
      HandCheckbox, Tally, SketchProgress, HandIcon, PalaceSketch, DrillHeader)
- [x] Screens: onboarding goal + hook, tabs (Home, Palace, Play, Leagues, Profile), word drill
      (memorize → recall), paywall
- [x] Local SQLite schema + settings store; ts-fsrs wrapper; drill store
- [x] Supabase schema with RLS; `generate-mnemonic` edge function (parked: no AI until paid accounts)
- [x] Database-driven content: `pack_words` on Supabase (free plan), synced to SQLite, bundled snapshot
- [x] Android development build installs and runs on a real device

## Now (next 1–2 weeks)

- [x] **Onboarding steps 2–3**: 30-second baseline test (10 words), 1-minute story-method lesson, retest.
      Save both scores; hook screen reads them. Acceptance: hook shows real before/after numbers.
- [x] **Persist drill results**: write a `sessions` row, award XP (10 per correct), create/update an
      FSRS card per word. Acceptance: Home XP and palace progress change after a drill.
- [ ] **Real palace data**: seed the user's palace (rooms, stops) in SQLite on onboarding; Palace tab reads
      from SQLite instead of `src/data/sample.ts`.

## Phase 1 — MVP (target: 8 weeks part-time)

### Learn and encode
- [ ] Technique lessons: acronym, story, memory palace (3 short interactive lessons each)
- [ ] "My Stuff": add an item to a stop (prompt, answer), write your own mnemonic, edit it, save
- [ ] Review queue: today's due items from FSRS, grade Again/Hard/Good/Easy, streak counts reviews
- [x] Keyword mnemonics for the whole GRE pack (143, `src/data/greMnemonics.ts`)
- [ ] Track which mnemonics fail most in recall; rewrite the weakest first
- [ ] GRE starter pack as review items: place `src/data/greVocab.ts` words at stops (word → meaning),
      pack mnemonic per word, reviewed through the queue. Drill and palace samples already use the pack.

### Play
- [ ] Word drill: difficulty levels (10 / 20 / 30 words), results screen with per-stop breakdown
- [ ] Daily Challenge: same seed for everyone (`daily_challenges`), one scored attempt per day,
      shareable result card ("18/20 in 1:42")
- [ ] XP, levels, palace growth (new room every N XP); streak with tally marks

### Accounts and sync
- [ ] Sign in with Apple and Google (Supabase Auth); stay usable signed-out
- [ ] Sync queue: push `dirty` rows to Supabase, pull on launch; last-write-wins per row
- [ ] Profile: goals, exam, name, sign out, delete account (store requirement)

### Money
- [ ] RevenueCat products + offering; paywall reads localized prices from offerings
- [ ] Purchase, restore, entitlement check (`premium`); gate: palaces > 1, AI > 5/day, packs
- [ ] RevenueCat webhook → edge function → `profiles.plan`
- [ ] Only after paid accounts: AI mnemonics for premium users' own items (un-park `generate-mnemonic`)

### Ship
- [ ] Analytics events (onboarding steps, drill start/finish, paywall view/purchase)
- [ ] Crash reporting
- [ ] Script to refresh the bundled pack snapshot from `pack_words` before each release
- [ ] About / licences screen with the WordNet notice (`docs/THIRD_PARTY.md`), required by its licence
- [ ] App icon/splash final, store screenshots in notebook style, privacy policy, store listings
- [ ] Closed beta (Play internal testing + TestFlight), 20–50 users

## Phase 2 — v1.1 (retention)
- [ ] Peg system, Major System (numbers), Names and faces techniques + drills
- [ ] Weekly leagues by goal (Supabase Realtime)
- [ ] Boss fights to graduate a technique; technique ranks Novice → Grandmaster
- [ ] Streak freezes (earned + premium)

## Phase 3 — v1.2 (growth)
- [ ] Friend duels (same list, higher recall wins)
- [ ] Exam packs (UPSC, NEET, SAT…) and language packs; keyword method
- [ ] Palace themes (cosmetic purchases)
- [ ] Community-voted mnemonics for common topics; Anki deck import

## Metrics to watch
Onboarding completion · retest lift · D1/D7/D30 retention by goal · Daily Challenge share rate ·
trial→paid by region · AI cost per active user per month (must stay well under ₹30 for premium India).

## Open questions
- Exact free AI limit (5/day?) and whether rewarded ads unlock more
- Which analytics + crash tool (PostHog / Sentry / Expo Insights)
- Embeddings model for semantic mnemonic reuse (pgvector column is ready, unused)
