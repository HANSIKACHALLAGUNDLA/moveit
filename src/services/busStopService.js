/**
 * Bus Stop Service
 *
 * Interacts with the 'bus_stops' and 'passenger_checkins' tables in Supabase.
 * Calculates live waiting passenger demand from active check-ins.
 * Includes automatic fallback to mock data if the database is offline or empty.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MOCK_BUS_STOPS } from '../data/mockData';

// Local mutable copy for fallback session updates
let fallbackStops = [...MOCK_BUS_STOPS];

/**
 * Normalize a Supabase bus stop row.
 */
function normalizeStopRow(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    locationCode: row.location_code || row.locationCode,
    area: row.area,
    latitude: Number(row.latitude),
longitude: Number(row.longitude),
    waitingPassengers: Number(
      row.waiting_passengers ?? row.waitingPassengers ?? 0
    ),
    upcomingBusId:
      row.upcoming_bus_id || row.upcomingBusId || 'BUS-101',
    demandStatus:
      row.demand_status || row.demandStatus || 'Normal Demand',
    connectedRoutes:
      row.connected_routes || row.connectedRoutes || ['Route 1'],
    mapCoords:
      row.map_coords || row.mapCoords || { x: 50, y: 50 }
  };
}

/**
 * Calculate demand status from waiting passenger count.
 */
function getDemandStatus(waitingCount) {
  if (waitingCount > 40) return 'High Demand';
  if (waitingCount >= 25) return 'Moderate Demand';
  return 'Normal Demand';
}

/**
 * Fetch live waiting passenger counts from passenger_checkins.
 *
 * Only check-ins with status = 'waiting' are counted.
 */
async function getWaitingCountsByStop() {
  if (!isSupabaseConfigured() || !supabase) {
    return {};
  }

  try {
    const { data, error } = await supabase
      .from('passenger_checkins')
      .select('bus_stop_id, passenger_count')
      .eq('status', 'waiting');

    if (error) {
      console.warn(
        '[busStopService] Failed to fetch passenger check-ins:',
        error.message
      );
      return {};
    }

    const counts = {};

    (data || []).forEach(checkIn => {
      const stopId = checkIn.bus_stop_id;
      const passengerCount = Number(checkIn.passenger_count || 0);

      if (stopId !== null && stopId !== undefined) {
        counts[stopId] = (counts[stopId] || 0) + passengerCount;
      }
    });

    return counts;
  } catch (err) {
    console.warn(
      '[busStopService] Failed to calculate waiting passenger counts:',
      err.message
    );

    return {};
  }
}

/**
 * Fetch all network bus stops from Supabase.
 *
 * Waiting passenger count is calculated from passenger_checkins.
 */
export async function getAllBusStops() {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('bus_stops')
        .select('*')
        .order('name');

      if (!error && Array.isArray(data) && data.length > 0) {
        const waitingCounts = await getWaitingCountsByStop();

        return data.map(row => {
          const stop = normalizeStopRow(row);
          const waitingPassengers = Number(
            waitingCounts[stop.id] ?? stop.waitingPassengers ?? 0
          );

          return {
            ...stop,
            waitingPassengers,
            demandStatus: getDemandStatus(waitingPassengers)
          };
        });
      }

      if (error) {
        console.warn(
          '[busStopService] Failed to query bus_stops:',
          error.message
        );
      }
    } catch (err) {
      console.warn(
        '[busStopService] Failed to query Supabase bus_stops table, using fallback:',
        err.message
      );
    }
  }

  return Promise.resolve([...fallbackStops]);
}

/**
 * Fetch a single bus stop by ID.
 */
export async function getBusStopById(stopId) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('bus_stops')
        .select('*')
        .eq('id', stopId)
        .maybeSingle();

      if (!error && data) {
        const stop = normalizeStopRow(data);
        const waitingCounts = await getWaitingCountsByStop();

        const waitingPassengers = Number(
          waitingCounts[stop.id] ?? stop.waitingPassengers ?? 0
        );

        return {
          ...stop,
          waitingPassengers,
          demandStatus: getDemandStatus(waitingPassengers)
        };
      }

      if (error) {
        console.warn(
          `[busStopService] Failed to query stop ${stopId}:`,
          error.message
        );
      }
    } catch (err) {
      console.warn(
        `[busStopService] Failed to query stop ${stopId}:`,
        err.message
      );
    }
  }

  const stop =
    fallbackStops.find(s => s.id === stopId) || fallbackStops[0];

  return Promise.resolve({ ...stop });
}

/**
 * Update waiting passenger demand count at a specific bus stop.
 *
 * The actual live count comes from passenger_checkins.
 * This function remains for compatibility with the existing UI.
 */
export async function updateWaitingPassengers(stopId, delta) {
  // Update local fallback state
  fallbackStops = fallbackStops.map(s => {
    if (s.id === stopId) {
      const newCount = Math.max(
        0,
        Number(s.waitingPassengers || 0) + Number(delta || 0)
      );

      return {
        ...s,
        waitingPassengers: newCount,
        demandStatus: getDemandStatus(newCount)
      };
    }

    return s;
  });

  // Keep the existing Supabase demand_status field updated
  // for compatibility with the current database structure.
  if (isSupabaseConfigured() && supabase) {
    try {
      const target = fallbackStops.find(s => s.id === stopId);

      if (target) {
        await supabase
          .from('bus_stops')
          .update({
            demand_status: target.demandStatus
          })
          .eq('id', stopId);
      }
    } catch (err) {
      console.warn(
        `[busStopService] Failed to update demand status for ${stopId}:`,
        err.message
      );
    }
  }

  const updated = fallbackStops.find(s => s.id === stopId);

  return Promise.resolve(updated ? { ...updated } : null);
}

/**
 * Search bus stops by name, area, or code.
 */
export async function searchBusStops(query) {
  const allStops = await getAllBusStops();

  if (!query) return allStops;

  const q = query.toLowerCase().trim();

  return allStops.filter(
    s =>
      s.name?.toLowerCase().includes(q) ||
      s.area?.toLowerCase().includes(q) ||
      s.locationCode?.toLowerCase().includes(q)
  );
}