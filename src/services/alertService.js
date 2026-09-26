/**
 * Alert Service
 * 
 * Interacts with 'alerts' table in Supabase.
 * Handles operational fleet alerts and passenger coordination notifications.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

let fallbackAlerts = [...MOCK_NOTIFICATIONS];

function normalizeAlertRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title || row.alert_type || 'Fleet Notice',
    message: row.message || '',
    time: row.created_at ? new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (row.time || 'Just now'),
    type: (row.alert_type || row.type || 'info').toLowerCase()
  };
}

/**
 * Fetch active coordination alerts from Supabase 'alerts' table
 */
export async function getAllAlerts() {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(normalizeAlertRow);
      }
    } catch (err) {
      console.warn('[alertService] Failed to query Supabase alerts table:', err.message);
    }
  }

  return Promise.resolve([...fallbackAlerts]);
}

/**
 * Create a new operational or overcrowding alert in Supabase
 */
export async function createAlert({ busId, alertType = 'INFO', message }) {
  const newAlert = {
    bus_id: busId || null,
    alert_type: alertType,
    message,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .insert([newAlert])
        .select()
        .single();

      if (!error && data) {
        return normalizeAlertRow(data);
      }
    } catch (err) {
      console.warn('[alertService] Failed to create alert in Supabase:', err.message);
    }
  }

  const fallbackItem = {
    id: Date.now(),
    title: alertType,
    message,
    time: 'Just now',
    type: alertType.toLowerCase()
  };
  fallbackAlerts = [fallbackItem, ...fallbackAlerts];
  return Promise.resolve(fallbackItem);
}

/**
 * Dismiss an alert
 */
export async function dismissAlert(alertId) {
  fallbackAlerts = fallbackAlerts.filter(a => a.id !== alertId);

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('alerts').delete().eq('id', alertId);
    } catch (err) {
      console.warn(`[alertService] Failed to delete alert ${alertId} from Supabase:`, err.message);
    }
  }

  return Promise.resolve([...fallbackAlerts]);
}
