/**
 * Bus Service
 * 
 * Interacts with the 'buses' table in Supabase.
 * Includes automatic fallback to mock data if the database is offline or empty.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MOCK_BUSES, MOCK_AUTHORITY_SUMMARY } from '../data/mockData';

// Helper to normalize Supabase snake_case rows into standard UI format
function normalizeBusRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    busNumber: row.bus_number || row.registration_number || row.busNumber || row.id,
    route: row.route || row.route_name || 'Route 1',
    routeCode: row.route_code || row.routeCode,
    currentLocation: row.current_location || row.currentLocation,
    nextStop: row.next_stop || row.nextStop,
    targetStop: row.target_stop || row.targetStop,
    etaMinutes: Number(row.eta_minutes ?? row.etaMinutes ?? 10),
    occupancyPercent: Number(row.occupancy_percent ?? row.occupancyPercent ?? 50),
   availableCapacity: Number(row.capacity ?? 50),
    totalCapacity: Number(row.capacity ?? 50),
    status: row.status,
    driverName: row.driver_name || row.driverName,
    speedKmH: Number(row.speed_kmh ?? row.speedKmH ?? 30),
    lastUpdated: row.last_updated || row.lastUpdated || 'Just now',
    stopsSequence: row.stops_sequence || row.stopsSequence || [],
    amenities: row.amenities || ['CCTV Active'],
    mapPosition: row.map_position || row.mapPosition || { x: 50, y: 50 }
  };
}

/**
 * Fetch all active fleet buses from Supabase 'buses' table
 */
export async function getAllBuses() {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('buses')
        .select('*')
        .order('id');

      if (!error && Array.isArray(data) && data.length > 0) {
        const buses = data.map(normalizeBusRow);

        // Fetch the latest occupancy record for each bus
        const busesWithOccupancy = await Promise.all(
          buses.map(async (bus) => {
            const { data: occupancyData, error: occupancyError } = await supabase
              .from('occupancy_records')
              .select('occupied_seats, available_seats, occupancy_percentage, recorded_at')
              .eq('bus_id', bus.id)
              .order('recorded_at', { ascending: false })
              .limit(1)
              .maybeSingle();

            if (!occupancyError && occupancyData) {
              return {
                ...bus,
                occupancyPercent: Number(
                  occupancyData.occupancy_percentage ?? bus.occupancyPercent ?? 50
                ),
                availableCapacity: Number(
                  occupancyData.available_seats ?? bus.availableCapacity ?? bus.totalCapacity
                ),
                occupiedSeats: Number(
                  occupancyData.occupied_seats ?? 0
                ),
                lastUpdated: occupancyData.recorded_at || bus.lastUpdated
              };
            }

            return bus;
          })
        );

        return busesWithOccupancy;
      }
    } catch (err) {
      console.warn(
        '[busService] Failed to query Supabase buses/occupancy, using fallback:',
        err.message
      );
    }
  }

  // Fallback to local data
  return Promise.resolve([...MOCK_BUSES]);
}

/**
 * Fetch a single bus by ID from Supabase
 */
export async function getBusById(busId) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('buses')
        .select('*')
        .eq('id', busId)
        .maybeSingle();

      if (!error && data) {
        return normalizeBusRow(data);
      }
    } catch (err) {
      console.warn(`[busService] Failed to fetch bus ${busId} from Supabase:`, err.message);
    }
  }

  // Fallback
  const bus = MOCK_BUSES.find(b => b.id === busId) || MOCK_BUSES[0];
  return Promise.resolve({ ...bus });
}

/**
 * Filter upcoming buses serving a specific transit stop
 */
export async function getBusesForStop(stopName) {
  const allBuses = await getAllBuses();
  if (!stopName) return allBuses;

  const relevant = allBuses.filter(bus => {
    return (
      bus.route?.toLowerCase().includes(stopName.toLowerCase().split(' ')[0]) ||
      bus.stopsSequence?.some(s => s.name?.toLowerCase() === stopName.toLowerCase()) ||
      bus.nextStop?.toLowerCase().includes(stopName.toLowerCase()) ||
      bus.targetStop?.toLowerCase().includes(stopName.toLowerCase())
    );
  });

  const combined = relevant.length >= 3 ? relevant : allBuses.slice(0, 4);
  return combined.sort((a, b) => a.etaMinutes - b.etaMinutes);
}

/**
 * Fetch fleet operational summary metrics
 */
export async function getFleetSummary() {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data: buses, error } = await supabase
  .from('buses')
  .select('capacity');

if (!error && Array.isArray(buses) && buses.length > 0) {
  const activeBuses = buses.length;
  const crowdedBuses = 0;
  const availableCapacity = buses.reduce(
    (sum, b) => sum + (b.capacity ?? 0),
    0
  );

  return {
    ...MOCK_AUTHORITY_SUMMARY,
    activeBuses,
    crowdedBuses,
    availableCapacity
  };
      }
    } catch (err) {
      console.warn('[busService] Failed to calculate summary from Supabase:', err.message);
    }
  }

  return Promise.resolve({ ...MOCK_AUTHORITY_SUMMARY });
}

/**
 * Dispatch an operational capacity advisory or relief vehicle
 */
export async function dispatchFleetAdvisory(busId, advisoryType = 'RELIEF_BACKUP') {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('alerts').insert({
        bus_id: busId,
        alert_type: advisoryType,
        message: `Relief shuttle requested for bus ${busId}`,
        created_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn('[busService] Failed to record alert in Supabase:', err.message);
    }
  }

  return Promise.resolve({
    success: true,
    busId,
    advisoryType,
    timestamp: new Date().toISOString()
  });
}
