/**
 * Bus Location Service
 *
 * Reads live bus location telemetry from Supabase
 * and listens for Realtime location updates.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Get the latest location for all buses.
 */
export async function getLatestBusLocations() {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('bus_locations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        return data;
      }

      if (error) {
        console.warn(
          '[busLocationService] Failed to fetch bus locations:',
          error.message
        );
      }
    } catch (err) {
      console.warn(
        '[busLocationService] Supabase bus location error:',
        err.message
      );
    }
  }

  return [];
}

/**
 * Get the latest location for one bus.
 */
export async function getBusLocation(busId) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('bus_locations')
        .select('*')
        .eq('bus_id', busId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return data;
      }

      if (error) {
        console.warn(
          `[busLocationService] Failed to fetch location for bus ${busId}:`,
          error.message
        );
      }
    } catch (err) {
      console.warn(
        `[busLocationService] Bus location error for ${busId}:`,
        err.message
      );
    }
  }

  return null;
}

/**
 * Subscribe to live bus location changes.
 */
export function subscribeToBusLocations(onLocationChange) {
  if (!isSupabaseConfigured() || !supabase) {
    return () => {};
  }

  const channel = supabase
    .channel('bus-locations-live')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'bus_locations'
      },
      payload => {
        if (payload?.new) {
          onLocationChange(payload.new);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}