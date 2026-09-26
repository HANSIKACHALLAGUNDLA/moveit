/**
 * Supabase Client Configuration
 * 
 * Safely initializes the Supabase client using frontend environment variables.
 * Fallback-aware: operates in offline/mock mode if credentials are not yet supplied.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid credentials have been configured
export const isSupabaseConfigured = () => {
  return (
    typeof supabaseUrl === 'string' &&
    typeof supabaseAnonKey === 'string' &&
    supabaseUrl.trim() !== '' &&
    supabaseAnonKey.trim() !== '' &&
    supabaseUrl !== 'YOUR_SUPABASE_URL' &&
    supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
    supabaseUrl.startsWith('https://')
  );
};

// Initialize client only when valid URL & Key are available
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

/**
 * Diagnostic Connection Test
 * Queries the 'bus_stops' table and logs status to developer console.
 * Safe: Application continues uninterrupted even if DB is empty or credentials are not yet set.
 */
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured() || !supabase) {
    const msg = '[MOVEIT Supabase] Notice: Credentials not configured yet in .env.local. Operating seamlessly in local fallback mode.';
    if (import.meta.env.DEV) {
      console.info(msg);
    }
    return {
      connected: false,
      status: 'NOT_CONFIGURED',
      message: msg
    };
  }

  try {
    const startTime = performance.now();
    const { data, error, count } = await supabase
      .from('bus_stops')
     .select('id, name', { count: 'exact' })
      .limit(5);

    const elapsed = Math.round(performance.now() - startTime);

    if (error) {
      console.warn(`[MOVEIT Supabase] Query warning (${elapsed}ms):`, error.message);
      return {
        connected: false,
        status: 'QUERY_ERROR',
        error: error.message,
        message: 'Connected to Supabase endpoint, but table query returned an error. Using local fallback.'
      };
    }

    if (import.meta.env.DEV) {
      console.log(`%c[MOVEIT Supabase] Connected successfully! (${elapsed}ms)%c Found ${data?.length || 0} bus_stops in database.`, 'color: #10b981; font-weight: bold;', 'color: inherit;');
    }

    return {
      connected: true,
      status: 'CONNECTED',
      count: count ?? data?.length ?? 0,
      data
    };
  } catch (err) {
    console.warn('[MOVEIT Supabase] Connection attempt failed:', err.message);
    return {
      connected: false,
      status: 'NETWORK_ERROR',
      error: err.message,
      message: 'Network or configuration issue. Operating in local fallback mode.'
    };
  }
}
