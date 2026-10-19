# Loci — gamified mnemonics app

React Native (Expo SDK 57, React Native 0.86, TypeScript) starter for Loci: learn memory techniques,
build a memory palace, and play memory games. Notebook-style UI: ruled paper, highlighters, pencil.

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
| Expo Go *or* a dev build | — | Expo Go is fine for UI work if it supports SDK 57; purchases need a dev build |
| Supabase CLI | latest | `npm i -D supabase` or `brew install supabase/tap/supabase` |
| EAS CLI | latest | `npm i -g eas-cli` — cloud builds and store submission |
| Docker Desktop | optional | Only for running Supabase locally (`supabase start`) |

## 2. First run (about 5 minutes)

```bash
cd loci-app
code .                     # VS Code → "Install recommended extensions" when prompted
npm install
npx expo start             # press a (Android), i (iOS sim), or scan the QR with Expo Go
```

Fresh install opens onboarding → goal → hook → home. To replay onboarding, delete the app data
(or clear the `settings` table in the local DB).

Useful scripts:

```bash
npm run typecheck          # tsc --noEmit
npm run lint               # expo lint (first run sets up ESLint config)
npm run doctor             # expo-doctor: checks dependency versions match the SDK
npx expo install --check   # fix any SDK version drift after adding packages
```

Always add Expo/React Native libraries with `npx expo install <pkg>` so versions match SDK 57.

## 3. Development build (needed for purchases, recommended anyway)

`react-native-purchases` (RevenueCat) contains native code that Expo Go doesn't ship, so build your own
dev client once:

```bash
# Local (needs Android Studio / Xcode):
npx expo run:android
npx expo run:ios

# Or in the cloud (works from Windows for iOS too):
eas login
eas build --profile development --platform android
eas build --profile development-simulator --platform ios   # iOS simulator build
```

Then `npx expo start --dev-client` and open the installed "Loci" dev app.

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
                             purchases (RevenueCat), drillStore, useCountdown
  data/sample.ts             sample rooms, stops and drill words
supabase/
  migrations/                schema + RLS + helper functions
  functions/generate-mnemonic AI mnemonic edge function (Deno)
docs/DESIGN.md               the notebook design language
```

## 7. What works now vs. TODO

Works:
- Onboarding goal picker → hook → home (persisted in SQLite)
- Home with palace sketch, streak tallies, to-do list
- Palace room view: tabs, floor plan with walking order, stop details coloured by memory strength
- Full word drill: memorize 20 words (with AI or offline idea) → timed recall with red-pen grading
- Paywall with plan selection
- Supabase schema with RLS; AI edge function with cache and daily limits

Next up (MVP order):
1. Onboarding steps 2–3: baseline test + story-method lesson + retest (feed real scores to the hook)
2. Persist drill results: `sessions`, XP, FSRS cards (`src/lib/fsrs.ts` is ready)
3. "My Stuff": add your own items to a stop, AI-assisted encoding, review queue
4. Auth (Apple / Google) and the local ↔ Supabase sync queue (`dirty` columns are in place)
5. RevenueCat purchase flow + webhook
6. Daily Challenge seed + leaderboard, analytics events, store listings

## 8. VS Code tips

- Recommended extensions are in `.vscode/extensions.json` (Expo Tools, ESLint, Prettier, Supabase,
  Deno for `supabase/functions`, Pretty TS Errors, Error Lens).
- Format on save + ESLint fixes are on in `.vscode/settings.json`.
- Expo Tools adds IntelliSense for `app.json` and `eas.json`. For runtime debugging, press `j` in the
  `expo start` terminal to open React Native DevTools.
