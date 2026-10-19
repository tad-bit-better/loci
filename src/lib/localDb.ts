import * as SQLite from 'expo-sqlite';

/**
 * Offline-first local store. Mirrors the Supabase tables the app needs to play without a network.
 * Sync is intentionally left as a TODO: start with local-only, add a sync queue once the core loop works.
 */
export const db = SQLite.openDatabaseSync('loci.db');

export async function migrate() {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS palaces (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      theme TEXT NOT NULL DEFAULT 'night',
      level INTEGER NOT NULL DEFAULT 1,
      xp INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS rooms (
      id TEXT PRIMARY KEY NOT NULL,
      palace_id TEXT NOT NULL REFERENCES palaces(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      position INTEGER NOT NULL,
      unlocked INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS stops (
      id TEXT PRIMARY KEY NOT NULL,
      room_id TEXT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      position INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY NOT NULL,
      stop_id TEXT REFERENCES stops(id) ON DELETE SET NULL,
      prompt TEXT NOT NULL,
      answer TEXT NOT NULL,
      mnemonic TEXT,
      source TEXT NOT NULL DEFAULT 'user',
      fsrs_card TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      dirty INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY NOT NULL,
      mode TEXT NOT NULL,
      score INTEGER NOT NULL,
      total INTEGER NOT NULL,
      duration_ms INTEGER NOT NULL,
      played_at TEXT NOT NULL DEFAULT (datetime('now')),
      dirty INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);
}

export async function getSetting(key: string): Promise<string | null> {
  const row = await db.getFirstAsync<{ value: string }>(
    'SELECT value FROM settings WHERE key = ?',
    key,
  );
  return row?.value ?? null;
}

export async function setSetting(key: string, value: string) {
  await db.runAsync(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
    key,
    value,
  );
}
