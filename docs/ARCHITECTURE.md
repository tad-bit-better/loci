# Loci — architecture

## Overview
```
┌──────────── Mobile app (Expo) ────────────┐      ┌──────────── Supabase ────────────┐
│ Screens (app/)                            │      │ Auth (Apple, Google)             │
│   └─ components (notebook UI kit)         │      │ Postgres + RLS + pgvector        │
│ lib/localDb ── SQLite (source of truth    │ sync │   profiles, palaces, rooms,      │
│                 on device, dirty flags) ◄─┼──────┼─► stops, items, reviews,         │
│ lib/fsrs ───── scheduling, on device      │      │   sessions, leagues, packs,      │
│ lib/packs ── pulls pack_words ◄────────────┼──────┼── pack_words (content, edited   │
│              (offline snapshot bundled)    │      │   in the dashboard)              │
│ lib/purchases ── RevenueCat SDK ──────────┼──┐   │   (cache, daily limit)           │
└───────────────────────────────────────────┘  │   └──────────────▲───────────────────┘
                                               │                  │ webhook → profiles.plan
                                               └──► RevenueCat ◄──┴── App Store / Play
```

## Principles
1. **Offline first.** Every core action (lessons, drills, reviews, palace) works with no network.
   SQLite is the device's source of truth; Supabase is backup + multi-device + social features.
2. **No secrets on device.** Only public keys (`EXPO_PUBLIC_*`). LLM and service-role access live in
   edge functions.
3. **Backend optional in dev.** `supabase` is `null` without `.env`; features degrade gracefully
   (e.g. packs fall back to the bundled snapshot).
4. **No AI, free hosting.** Content is database-driven until paid accounts exist; Supabase free plan.

## Data model
SQL source: `supabase/migrations/20261019000000_init.sql`. Local mirror: `src/lib/localDb.ts`.

| Entity | Notes |
| --- | --- |
| palace → rooms → stops | A stop is a fixed place in a room ("the stove"); position = walking order |
| item | Something to remember, optionally at a stop; `source` = user / ai / pack |
| review | FSRS state per item (`fsrs_card` JSON keeps the full ts-fsrs Card) |
| session | One play of a mode (drill, daily, boss, review) with score and duration |
| technique_progress | XP and rank per technique |
| mnemonic_cache / ai_usage | Server-only; cache by prompt hash, per-user daily counter |

## Sync (to build — PLAN.md "Accounts and sync")
- Local rows carry `dirty = 1` and `updated_at`. On launch/foreground and after writes (debounced):
  push dirty rows (upsert) → clear flags → pull rows with `updated_at > lastPulledAt`.
- Conflict rule: last write wins per row (fine for single-user data). Reviews: keep the card with the
  later `last_review_at`.
- IDs are UUIDs generated on device (`expo-crypto` `randomUUID`) so rows can be created offline.

## Spaced repetition
- `src/lib/fsrs.ts` wraps ts-fsrs (`request_retention` 0.9, fuzz on).
- Drill/recall results map to grades: wrong → Again, slow → Hard, right → Good, instant → Easy.
- `strengthOf(card)` → `strong | due | weak` → highlighter colour in the UI.

## Content packs
`pack_words` (Supabase) is the source of truth for words, meanings and keyword mnemonics; free packs are
readable with the anon key (no sign-in yet). On launch, `initPacks()` seeds SQLite from the bundled
snapshot (first run only), loads the pack into memory, then pulls rows with `updated_at` newer than the
local copy. A trigger bumps `updated_at` on every edit. Deletes don't propagate yet.

## AI mnemonics (parked until paid accounts)
Not deployed or called. The design, for later: `supabase.functions.invoke('generate-mnemonic')`:
verify JWT → cache lookup by sha256(item|location|technique) → free users: `increment_ai_usage` RPC
(atomic, returns remaining or −1) → LLM call → cache upsert → `{ mnemonic, cached, remainingToday }`.
Model via `MNEMONIC_MODEL` secret. Future: embeddings in `mnemonic_cache.embedding` for semantic reuse.

## Payments
RevenueCat offering with `loci_premium_monthly` and `loci_premium_yearly` (7-day trial), entitlement
`premium`. App checks entitlement for gating; server trusts `profiles.plan` set by the RevenueCat webhook.
`react-native-purchases` is lazy-imported so the app runs without it.

## Navigation
Root `Stack` (`app/_layout.tsx`): index redirect → onboarding → `(tabs)`; `drill/*` full-screen with
gestures disabled; `paywall` as modal. Tabs use `expo-router/js-tabs`.

## Builds
EAS profiles in `eas.json`: `development` (dev client, internal), `development-simulator`, `preview`,
`production` (auto-increment). Native folders are generated (CNG) — config lives in `app.json`.
