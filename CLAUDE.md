# Loci — notes for AI coding assistants

- Expo SDK 57, React Native 0.86, Expo Router (file-based, `app/`), TypeScript strict. Path alias `@/*` → `src/*`.
- Add native-facing packages with `npx expo install`, never plain `npm install`, so versions match the SDK.
- Tabs come from `expo-router/js-tabs`; `Stack`, `router`, `Link`, `Redirect` from `expo-router`.
- All screens render inside `<Paper>`. Use components from `@/components` and tokens from `@/theme`;
  follow `docs/DESIGN.md`. Don't introduce new colours or fonts without updating tokens.
- Offline first: read/write `src/lib/localDb.ts`; Supabase is optional (`supabase` may be `null`).
- Secrets never go in the app. LLM calls only through `supabase/functions/generate-mnemonic`.
- Spaced repetition goes through `src/lib/fsrs.ts` (ts-fsrs).
- Before finishing a change: `npm run typecheck`.
