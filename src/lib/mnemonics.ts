import { supabase } from './supabase';

export type MnemonicRequest = {
  /** What to remember, e.g. "umbrella" or "Article 21: Right to life". */
  item: string;
  /** Where it goes, e.g. "the kitchen stove". */
  location?: string;
  technique?: 'palace' | 'story' | 'acronym' | 'keyword' | 'major';
};

export type MnemonicResult = { mnemonic: string; cached: boolean; remainingToday: number | null };

/**
 * Asks the `generate-mnemonic` edge function for a vivid image.
 * Keys and rate limits live on the server, never in the app.
 */
export async function suggestMnemonic(req: MnemonicRequest): Promise<MnemonicResult> {
  if (!supabase) {
    // Offline / no backend yet: a simple local fallback so the UI is usable.
    const where = req.location ?? 'your palace';
    return {
      mnemonic: `Picture a giant, glowing ${req.item} at ${where}. Make it loud, smelly or absurd.`,
      cached: true,
      remainingToday: null,
    };
  }
  const { data, error } = await supabase.functions.invoke<MnemonicResult>('generate-mnemonic', {
    body: req,
  });
  if (error || !data) throw error ?? new Error('No mnemonic returned');
  return data;
}
