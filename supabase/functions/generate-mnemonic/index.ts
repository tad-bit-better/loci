// Supabase Edge Function (Deno): returns a vivid mnemonic image for an item.
// Deploy:  supabase functions deploy generate-mnemonic
// Secrets: supabase secrets set ANTHROPIC_API_KEY=sk-ant-...   (optional: MNEMONIC_MODEL, FREE_DAILY_LIMIT)
//
// Flow: verify user → check cache → enforce daily limit (free users) → call the LLM → cache → return.

import { createClient } from 'npm:@supabase/supabase-js@2';

const MODEL = Deno.env.get('MNEMONIC_MODEL') ?? 'claude-haiku-5-5';
const FREE_DAILY_LIMIT = Number(Deno.env.get('FREE_DAILY_LIMIT') ?? '5');

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type Body = { item: string; location?: string; technique?: string };

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

  try {
    const auth = req.headers.get('Authorization') ?? '';
    const userClient = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: auth } },
    });
    const { data: userData } = await userClient.auth.getUser();
    const user = userData.user;
    if (!user) return json({ error: 'Not signed in' }, 401);

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    const body = (await req.json()) as Body;
    const item = body.item?.trim().slice(0, 200);
    if (!item) return json({ error: 'item is required' }, 400);
    const location = body.location?.trim().slice(0, 120) ?? '';
    const technique = body.technique ?? 'palace';

    // 1. Cache: identical requests reuse an existing mnemonic and cost nothing.
    const hash = await sha256([item.toLowerCase(), location.toLowerCase(), technique].join('|'));
    const { data: cached } = await admin
      .from('mnemonic_cache')
      .select('mnemonic')
      .eq('prompt_hash', hash)
      .maybeSingle();
    if (cached) return json({ mnemonic: cached.mnemonic, cached: true, remainingToday: null });

    // 2. Daily limit for free users.
    const { data: profile } = await admin.from('profiles').select('plan').eq('id', user.id).single();
    let remainingToday: number | null = null;
    if (profile?.plan !== 'premium') {
      const { data: left } = await admin.rpc('increment_ai_usage', {
        p_user: user.id,
        p_limit: FREE_DAILY_LIMIT,
      });
      if (left === -1) return json({ error: 'daily_limit', remainingToday: 0 }, 429);
      remainingToday = left as number;
    }

    // 3. Generate.
    const prompt = [
      `Create a memorable mnemonic using the ${technique} technique.`,
      `Item to remember: "${item}".`,
      location ? `It is placed at: "${location}" in the user's memory palace.` : '',
      'Write ONE vivid, absurd, sensory image in at most 2 short sentences.',
      'Use exaggeration, motion, sound or smell. Keep it friendly for students. No preamble.',
    ]
      .filter(Boolean)
      .join('\n');

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY')!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 150,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) return json({ error: 'llm_error', detail: await res.text() }, 502);
    const out = await res.json();
    const mnemonic: string = (out.content ?? [])
      .filter((b: { type: string }) => b.type === 'text')
      .map((b: { text: string }) => b.text)
      .join('')
      .trim();

    // 4. Cache for everyone.
    await admin
      .from('mnemonic_cache')
      .upsert({ prompt_hash: hash, item, location, technique, mnemonic }, { onConflict: 'prompt_hash' });

    return json({ mnemonic, cached: false, remainingToday });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
