/**
 * Route Service
 * 
 * Interacts with 'routes' and 'route_stops' tables in Supabase.
 * Includes automatic fallback to local routes if database is offline or empty.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MOCK_ROUTES } from '../data/mockData';

/**
 * Fetch all transit routes
 */
export async function getAllRoutes() {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('routes')
        .select('*')
        .order('id');

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(r => ({
          id: r.id,
          name: r.name || r.route_name,
          code: r.code || r.route_code
        }));
      }
    } catch (err) {
      console.warn('[routeService] Failed to query Supabase routes table:', err.message);
    }
  }

  return Promise.resolve([...MOCK_ROUTES]);
}

/**
 * Fetch stops assigned to a specific route
 */
export async function getStopsForRoute(routeId) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('route_stops')
        .select('*, bus_stops(*)')
        .eq('route_id', routeId)
        .order('stop_sequence', { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(rs => rs.bus_stops);
      }
    } catch (err) {
      console.warn(`[routeService] Failed to fetch stops for route ${routeId}:`, err.message);
    }
  }

  return Promise.resolve([]);
}
