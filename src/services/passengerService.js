/**
 * Passenger Service
 *
 * Interacts with 'passenger_checkins' table in Supabase.
 * Records commuter presence at a bus stop and the expected bus.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getAllAlerts, dismissAlert } from './alertService';

/**
 * Record commuter presence check-in at a bus stop
 */
export async function recordPassengerCheckIn(
  busStopId,
  expectedBusId = null,
  passengerId = null,
  passengerCount = 1
) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const checkIn = {
  bus_stop_id: busStopId,
  passenger_count: passengerCount,
  status: 'waiting',
  created_at: new Date().toISOString()
};

if (expectedBusId !== null && expectedBusId !== undefined && expectedBusId !== '') {
  checkIn.expected_bus_id = Number(expectedBusId);
}

if (passengerId !== null && passengerId !== undefined && passengerId !== '') {
  checkIn.passenger_id = Number(passengerId);
}

      const { data, error } = await supabase
        .from('passenger_checkins')
        .insert([checkIn])
        .select()
        .single();

      if (!error && data) {
        return {
          success: true,
          data,
          stopId: busStopId,
          checkedInAt: data.created_at
        };
      }

      if (error) {
        console.warn(
          '[passengerService] Check-in failed:',
          error.message
        );
      }
    } catch (err) {
      console.warn(
        '[passengerService] Supabase check-in error:',
        err.message
      );
    }
  }

  // Fallback when Supabase is unavailable
  return {
    success: true,
    stopId: busStopId,
    checkedInAt: new Date().toISOString()
  };
}

/**
 * Cancel commuter presence at a bus stop
 */
export async function cancelPassengerCheckIn(busStopId) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('passenger_checkins')
        .update({
  status: 'cancelled'
})
.eq('bus_stop_id', busStopId)
.eq('status', 'waiting')
.select();

      if (error) {
        console.warn(
          '[passengerService] Cancel check-in failed:',
          error.message
        );
      }

      return {
        success: !error,
        stopId: busStopId,
        data
      };
    } catch (err) {
      console.warn(
        '[passengerService] Failed to cancel check-in:',
        err.message
      );
    }
  }

  return {
    success: true,
    stopId: busStopId,
    cancelledAt: new Date().toISOString()
  };
}

/**
 * Get passenger check-ins for a bus stop
 */
export async function getPassengerCheckIns(busStopId) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('passenger_checkins')
        .select('*')
        .eq('bus_stop_id', busStopId)
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        return data;
      }

      if (error) {
        console.warn(
          '[passengerService] Failed to fetch check-ins:',
          error.message
        );
      }
    } catch (err) {
      console.warn(
        '[passengerService] Failed to fetch check-ins:',
        err.message
      );
    }
  }

  return [];
}

/**
 * Fetch coordination alerts and notifications
 */
export async function getNotifications() {
  return getAllAlerts();
}

/**
 * Dismiss a notification
 */
export async function dismissNotification(notificationId) {
  return dismissAlert(notificationId);
}