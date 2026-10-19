# Loci — gamified mnemonics app

React Native (Expo SDK 57, React Native 0.86, TypeScript) starter for Loci: learn memory techniques,
build a memory palace, and play memory games. Notebook-style UI: ruled paper, highlighters, pencil.

**Start here:** `PLAN.md` (what to build next) · `CLAUDE.md` (conventions + gotchas) · `docs/` (product, design, architecture, decisions).

The app runs **fully offline out of the box** (local SQLite + sample data). Supabase, the AI edge function
and RevenueCat are wired in but optional until you fill in `.env`.

---

## 1. Prerequisites

| Tool | Version | Why |
| --- | --- | --- |
| Node.js | 22.13+ or 24 LTS (20.19.4+ also works) | Metro, Expo CLI |
| Git | any | |
| VS Code | latest | Open the folder and accept the recommended extensions |
| Android Studio | latest | Android emulator + SDK (Windows, macOS, Linux) |
| Xcode | latest (macOS only) | iOS simulator. On Windows/Linux, test iOS with EAS Build + a real iPhone |
| A development build | — | **Expo Go won't work**: the store version lags behind SDK 57, and this project uses `expo-dev-client` |
| Supabase CLI | latest | `npm i -D supabase` or `brew install supabase/tap/supabase` |
| EAS CLI | latest | `npm i -g eas-cli` — cloud builds and store submission |
| Docker Desktop | optional | Only for running Supabase locally (`supabase start`) |

## 2. First run

```bash
cd loci-app
code .                     # VS Code → "Install recommended extensions" when prompted
npm install
```

**Step 1 — install a development build on your phone (once).** This is your own "Loci" app with the
native code baked in. Scanning the QR code with Expo Go will just close the app.

```bash
npm i -g eas-cli
eas login                                              # free Expo account
eas build --profile development --platform android     # ~10–15 min; open the link on your phone, install the APK
# iPhone: eas device:create, then eas build --profile development --platform ios (paid Apple Developer account)
```

Or build locally with Android Studio / Xcode: `npm run android` / `npm run ios` (phone plugged in or emulator open).

**Step 2 — run the dev server.**

```bash
npx expo start             # scan the QR with your camera; it opens in the Loci dev build
```

Rebuild the development build only when you add or update a package with native code.
For JS/TS changes, the dev server hot-reloads.

Fresh install opens onboarding → goal → hook → home. To replay onboarding, clear the app's data.

Useful scripts:

```bash
npm run typecheck          # tsc --noEmit
npm run lint               # expo lint (first run sets up ESLint config)
npm run doctor             # expo-doctor: checks dependency versions match the SDK
npx expo install --check   # fix any SDK version drift after adding packages
```

Always add Expo/React Native libraries with `npx expo install <pkg>` so versions match SDK 57.

## 3. Troubleshooting builds

- **`resource drawable/splashscreen_logo not found`**: fixed. The splash plugin needs an `image`
  (`assets/images/splash-icon.png`).
- **Check locally before spending a cloud build:** `npx expo prebuild --platform android --clean`
  generates the native project the same way EAS does. Delete `android/` afterwards (it's gitignored).
- **Version drift:** `npx expo install --check`, then `npm run doctor`.
- **iOS simulator build** (no Apple account needed): `eas build --profile development-simulator --platform ios`.

## 4. Backend: Supabase

```bash
cp .env.example .env                       # fill EXPO_PUBLIC_SUPABASE_URL + ANON_KEY
npx supabase init                          # creates supabase/config.toml (keep existing folders)
npx supabase login
npx supabase link --project-ref YOUR_REF   # from the Supabase dashboard URL
npx supabase db push                       # applies supabase/migrations/*
npx supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
npx supabase functions deploy generate-mnemonic
```

Local alternative: `npx supabase start` (Docker), then use the local URL/anon key it prints.

In the dashboard: Authentication → Providers → enable **Apple** and **Google** (sign-in UI is a TODO).

The edge function:
- reuses identical requests from `mnemonic_cache` (free),
- limits free users to `FREE_DAILY_LIMIT` (default 5) generations a day via `ai_usage`,
- uses `MNEMONIC_MODEL` (default `claude-haiku-5-5`). Swap the fetch for any provider you prefer.

## 5. Payments: RevenueCat

1. Create products in App Store Connect and Google Play Console:
   - `loci_premium_monthly` — US $7.99, India ₹99
   - `loci_premium_yearly` — US $39.99, India ₹499, 7-day free trial
2. In RevenueCat: add both apps, attach products to an offering, create entitlement **`premium`**.
3. Put the public SDK keys in `.env` (`EXPO_PUBLIC_REVENUECAT_IOS_KEY`, `..._ANDROID_KEY`).
4. Add a RevenueCat webhook → small edge function that sets `profiles.plan = 'premium'` (TODO).

The paywall currently shows static prices; switch to `getOfferings()` so the stores show local currency.

## 6. Project structure

```
app/                         Expo Router screens (file = route)
  _layout.tsx                fonts, splash, DB migration, root stack
  index.tsx                  redirect: onboarding or home
  onboarding/goal.tsx        step 1 — pick goals
  onboarding/baseline.tsx    step 2 — memorize 10 words in 30 s, free recall
  onboarding/lesson.tsx      step 3 — story-method lesson, scene by scene
  onboarding/retest.tsx      step 3 — recall the story words
  onboarding/hook.tsx        step 4 — before/after score, name the palace
  (tabs)/                    Home, Palace, Play, Leagues, Profile
  drill/memorize.tsx         word drill step 1 — place each word at a stop
  drill/recall.tsx           word drill step 2 — walk the palace, type what's there
  paywall.tsx                modal
src/
  theme/                     tokens (colours, fonts, radii), text styles, font assets
  components/                Paper, Highlight, PencilUnderline, SketchButton, IndexCard,
                             StickyNote, Tape, HandCheckbox, Tally, SketchProgress,
                             HandIcon, PalaceSketch, DrillHeader
  lib/                       supabase, localDb (expo-sqlite), fsrs (ts-fsrs), mnemonics,
                             purchases (RevenueCat), drillStore, useCountdown, recall (word matching),
                             progress (XP, levels, streak, saving drill results),
                             vocab (word picking, seeded Daily Challenge)
  data/sample.ts             goals, onboarding words, sample rooms and stops, drill walk
  data/greVocab.ts           GRE starter words with WordNet meanings (licence: docs/THIRD_PARTY.md)
supabase/
  migrations/                schema + RLS + helper functions
  functions/generate-mnemonic AI mnemonic edge function (Deno)
docs/                        PRODUCT, DESIGN, ARCHITECTURE, DECISIONS
.claude/                     Claude Code permissions + slash commands (/next, /screen, /check, /migration)
PLAN.md                      roadmap with checkboxes
CLAUDE.md                    guidance for AI coding assistants
```

## 7. What works now vs. TODO

Works:
- Onboarding: goal picker → baseline test → story-method lesson → retest → hook with real scores → home
- Home with palace sketch, streak tallies, to-do list
- Palace room view: tabs, floor plan with walking order, stop details coloured by memory strength
- Full word drill (GRE vocab, keyword method): memorize 10 words with a sound-alike and image at each stop → timed recall with red-pen grading;
  results saved (session, palace XP, an FSRS card per word) and Home shows real XP, level and streak
- Paywall with plan selection
- Supabase schema with RLS; AI edge function with cache and daily limits

Next up (MVP order):
1. "My Stuff": add your own items to a stop, AI-assisted encoding, review queue
2. Auth (Apple / Google) and the local ↔ Supabase sync queue (`dirty` columns are in place)
3. RevenueCat purchase flow + webhook
4. Daily Challenge seed + leaderboard, analytics events, store listings

## 8. VS Code tips

- Recommended extensions are in `.vscode/extensions.json` (Expo Tools, ESLint, Prettier, Supabase,
  Deno for `supabase/functions`, Pretty TS Errors, Error Lens).
- Format on save + ESLint fixes are on in `.vscode/settings.json`.
- Expo Tools adds IntelliSense for `app.json` and `eas.json`. For runtime debugging, press `j` in the
  `expo start` terminal to open React Native DevTools.
