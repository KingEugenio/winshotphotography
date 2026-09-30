import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** The tenant this deployment belongs to. Set once per photographer in .env.local. */
export const TENANT_ID = import.meta.env.VITE_TENANT_ID as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey && TENANT_ID);

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.info(
    '[winshot] Running in standalone mode (no Supabase env vars set) — admin ' +
      'data stays in this browser only. Set VITE_SUPABASE_URL, ' +
      'VITE_SUPABASE_ANON_KEY and VITE_TENANT_ID to connect this site to the ' +
      'EKO PIXELS platform as a real tenant.'
  );
}

export const supabase = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder-key');
