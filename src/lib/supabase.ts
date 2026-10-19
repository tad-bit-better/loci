// Installs a synchronous `localStorage` backed by SQLite on iOS/Android so Supabase can persist sessions.
import 'expo-sqlite/localStorage/install';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/**
 * `null` until you fill in .env — the app still runs fully offline with local SQLite,
 * so you can build UI before setting up a backend.
 */
export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          storage: (globalThis as unknown as { localStorage: Storage }).localStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      })
    : null;

export const hasBackend = supabase !== null;
