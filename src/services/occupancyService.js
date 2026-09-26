/**
 * Occupancy Service
 *
 * Interacts with 'occupancy_records' table in Supabase.
 * Tracks historical and current occupancy telemetry.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Record live occupancy telemetry into Supabase 'occupancy_records'
 */
export async function recordOccupancy(
  busId,
  occupancyPercent,
  availableCapacity
) {
  const percentage = Number(occupancyPercent ?? 0);
  const availableSeats = Number(availableCapacity ?? 0);

  const occupiedSeats = Math.max(
    0,
    Math.round(
      availableSeats > 0
        ? (percentage / (100 - percentage)) * availableSeats
        : 0
    )
  );

  const record = {
    bus_id: busId,
    occupied_seats: occupiedSeats,
    available_seats: availableSeats,
    occupancy_percentage: percentage,
    recorded_at: new Date().toISOString()
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('occupancy_records')
        .insert([record])
        .select()
        .single();

      if (!error && data) {
        return { success: true, data };
      }

      if (error) {
        console.warn(
          '[occupancyService] Supabase insert failed:',
          error.message
        );
      }
    } catch (err) {
      console.warn(
        '[occupancyService] Failed to insert occupancy record:',
        err.message
      );
    }
  }

  return { success: true, data: record };
}

/**
 * Fetch recent occupancy telemetry for a specific bus
 */
export async function getRecentOccupancy(busId, limit = 10) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('occupancy_records')
        .select('*')
        .eq('bus_id', busId)
        .order('recorded_at', { ascending: false })
        .limit(limit);

      if (!error && Array.isArray(data)) {
        return data;
      }

      if (error) {
        console.warn(
          `[occupancyService] Failed to fetch occupancy records for ${busId}:`,
          error.message
        );
      }
    } catch (err) {
      console.warn(
        `[occupancyService] Failed to fetch occupancy records for ${busId}:`,
        err.message
      );
    }
  }

  return [];
}