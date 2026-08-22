import { createBrowserClient as createClient } from '@supabase/ssr';
import type { Database } from './types';

export function createBrowserClient() {
  return createClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );
}
