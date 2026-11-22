import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

if (!url || !key) {
  console.warn('[supabase] SUPABASE_URL or SUPABASE_SECRET_KEY missing: database calls will fail until .env is filled in.');
}

// Server-side client with the secret key. It bypasses Row Level Security,
// so it must never be sent to the browser.
export const db = createClient(url || 'http://localhost', key || 'missing', {
  auth: { persistSession: false, autoRefreshToken: false },
});
