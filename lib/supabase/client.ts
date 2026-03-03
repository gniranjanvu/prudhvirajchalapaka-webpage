import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // During static prerendering, env vars may not be available.
    // Log a warning so developers know to configure them.
    if (typeof window !== 'undefined') {
      console.warn(
        '[Supabase] NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. ' +
        'Authentication and database operations will not work.'
      );
    }
    // Use placeholders to allow client creation during build/prerender.
    // Real operations will fail with connection errors until env vars are set.
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder_anon_key'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
