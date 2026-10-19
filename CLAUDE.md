# CLAUDE.md — Loci

Guidance for Claude Code (and other AI assistants) working in this repo. Read this first, then
`PLAN.md` for what to build next.

## What this is
Loci is a gamified mnemonics app (React Native, freemium). Users learn memory techniques, build a
memory palace that grows as they learn, place things they need to remember in its rooms, and play
memory games. UI is a hand-made student notebook: ruled paper, highlighters, pencil, red pen.
Details: `docs/PRODUCT.md`, `docs/DESIGN.md`, `docs/ARCHITECTURE.md`.

## Stack
- Expo SDK 57, React Native 0.86, React 19.2, TypeScript strict, Expo Router (file-based, `app/`)
- react-native-svg (all hand-drawn shapes), Reanimated 4 + Worklets, Gesture Handler
- expo-sqlite (offline store + `localStorage` polyfill), ts-fsrs (spaced repetition)
- Supabase (Auth, Postgres + RLS, Edge Functions in Deno), RevenueCat (`react-native-purchases`)
- Path alias: `@/*` → `src/*`

## Commands
```bash
npm install
npx expo start                 # dev server; open in the Loci development build (NOT Expo Go)
npx expo start --tunnel        # when phone and laptop can't see each other on Wi-Fi
npm run typecheck              # must pass before any change is done
npm run lint
npx expo install <pkg>         # ALWAYS use this for RN/Expo packages (SDK-matched versions)
npx expo install --check       # fix version drift
npx expo prebuild --platform android --clean   # sanity-check native config; delete android/ after
eas build --profile development --platform android
npx supabase db push           # apply migrations
npx supabase functions deploy generate-mnemonic
```

## Layout
```
app/                    routes. _layout.tsx (fonts, splash, DB migrate, Stack), index.tsx (redirect)
  onboarding/           goal → baseline → lesson → retest → hook (scores saved in settings)
  (tabs)/               index (Home), palace, play, leagues, profile  — Tabs from expo-router/js-tabs
  drill/                memorize.tsx → recall.tsx (word drill)
  paywall.tsx           modal
src/theme/              tokens.ts (colours, fonts, radii, shadows), text.ts (type styles), fonts.ts
src/components/         notebook UI kit — reuse before creating anything new
src/lib/                supabase, localDb, fsrs, mnemonics, purchases, drillStore, useCountdown,
                        recall (word matching), progress (XP, level, streak, drill saving),
                        vocab (pickWords, seeded daily words)
src/data/sample.ts      sample content (to be replaced by SQLite reads)
src/data/greVocab.ts    GRE starter words; meanings from WordNet (keep the licence notice, docs/THIRD_PARTY.md)
supabase/migrations/    SQL schema + RLS + helper functions
supabase/functions/     Deno edge functions (excluded from app tsconfig; Deno extension handles them)
docs/                   PRODUCT, DESIGN, ARCHITECTURE, DECISIONS
```

## Conventions
- Every screen renders inside `<Paper>` (pass `scroll` for long content, `footer` for sticky CTAs).
- Use `@/components` and `@/theme`. No hard-coded colours or font names in screens; add tokens instead.
- Text styles from `type.*`; fonts only via `fonts.*` (Kalam headings, Caveat notes, Atkinson body).
- Highlighter colours mean things: yellow = primary/due, green = solid/correct/location, pink = fading.
  Red pen (`colors.redPen`) is only for grading, scores and running-out timers.
- Hand-drawn look: uneven corner radii (`sketchRadius`), solid offset shadow (`sketchShadow()`),
  slight tilts (≤ 1.5°, one or two per screen). No emoji, gradients or blur.
- Touch targets ≥ 44 px; every Pressable gets `accessibilityRole` (and a label if icon-only).
- Routes: `router.push('/drill/memorize')`; typed routes are on, keep hrefs as literal strings.
- State: local `useState`, or a small `useSyncExternalStore` store like `drillStore`. Ask before adding
  a state library.
- Data: offline first. Read/write `src/lib/localDb.ts`; mark rows `dirty = 1` for future sync.
  `supabase` can be `null` (no `.env`) — code must handle that.
- Spaced repetition only through `src/lib/fsrs.ts`.
- Secrets never in the app. LLM calls only via `supabase/functions/generate-mnemonic`.
  Only `EXPO_PUBLIC_*` env vars reach the client.
- New tables: add a migration in `supabase/migrations/` (timestamped), enable RLS, add policies.
- Comments explain *why*; keep them short. TODOs reference the PLAN.md item.

## Gotchas (learned the hard way)
- **Expo Go doesn't work** for this project (store Expo Go lags behind SDK 57, and `expo-dev-client` is
  installed). Use the development build. Rebuild it only after adding/updating native packages.
- **Phone stuck on "Connecting to the development server"** = network. Use `--tunnel` or USB
  (`adb reverse tcp:8081 tcp:8081` + `npx expo start --localhost`).
- **`UnsatisfiedLinkError … clearAllContentOriginsImpl` on Reload** = a secondary crash after the JS
  bundle failed to load. Force-stop the app and fix the connection; don't chase it as a native bug.
- **`drawable/splashscreen_logo not found`** = the `expo-splash-screen` plugin needs an `image`.
- `react-native-purchases` needs native code: lazy-imported in `purchases.ts` so the app still runs
  without it. Don't import it at module top level elsewhere.
- `Tabs` from `expo-router` is deprecated — import from `expo-router/js-tabs`.
- `boxShadow` string style works (new architecture). Elliptical `a / b` border radii don't exist in RN;
  vary per-corner radii instead.
- If `expo install` can't reach the network, `EXPO_OFFLINE=1 npx expo install <pkg>` uses the SDK's
  bundled version map.

## Definition of done
1. `npm run typecheck` passes (and `npm run lint` if configured).
2. Works on the Android development build (and iOS if touched native/iOS-specific code).
3. Follows `docs/DESIGN.md`; no new colours/fonts outside tokens.
4. Offline path works with no `.env`.
5. PLAN.md box ticked; new decisions appended to `docs/DECISIONS.md`.

## Don't
- Don't add packages with plain `npm install` if they have native code.
- Don't commit `.env`, `android/`, `ios/`.
- Don't put API keys, service-role keys or LLM calls in the app bundle.
- Don't replace the notebook UI with stock components (no default buttons, cards or icon sets).
