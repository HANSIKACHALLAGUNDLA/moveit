import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bus, 
  Users, 
  AlertCircle, 
  Armchair, 
  ArrowRight, 
  Bell, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { useTransport } from '../context/TransportContext';
import StatCard from '../components/StatCard';
import BusTable from '../components/BusTable';

export default function AuthorityDashboard() {
  const { authoritySummary, buses } = useTransport();
  const [alertNotification, setAlertNotification] = useState('');

  const handleAlertBus = (bus) => {
    setAlertNotification(`Backup advisory sent for ${bus.busNumber} (${bus.route}). Depot notified to stage relief shuttle.`);
    setTimeout(() => {
      setAlertNotification('');
    }, 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Title & Context Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
            <span>Transport Authority</span>
            <span>•</span>
            <span style={{ color: 'var(--pastel-lavender-text)', fontWeight: '600' }}>Operations Center</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
            Fleet Coordination Dashboard
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Real-time fleet monitoring, corridor capacity balance, and passenger demand telemetry.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link to="/authority/monitoring" className="btn btn-secondary btn-sm">
            Full Bus Monitoring →
          </Link>
          <Link to="/authority/demand" className="btn btn-primary btn-sm">
            Passenger Demand Analysis →
          </Link>
        </div>
      </div>

      {/* Temporary Alert Banner */}
      {alertNotification && (
        <div style={{
          backgroundColor: 'var(--pastel-peach-bg)',
          border: '1px solid var(--pastel-peach-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#c2410c',
          fontSize: '0.9rem'
        }}>
          <Bell size={18} />
          <span>{alertNotification}</span>
        </div>
      )}

      {/* Top 4 Summary Cards as explicitly specified in Page 6 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* Active Buses: 42 */}
        <StatCard
          title="Active Buses"
          value={authoritySummary.activeBuses}
          icon={Bus}
          subtitle="Currently on transit routes"
          color="blue"
          trend="● In Service"
        />

        {/* Waiting Passengers: 318 */}
        <StatCard
          title="Waiting Passengers"
          value={authoritySummary.waitingPassengers}
          icon={Users}
          subtitle="Across 8 major stops"
          color="lavender"
          trend="+12% peak surge"
        />

        {/* Crowded Buses: 7 */}
        <StatCard
          title="Crowded Buses"
          value={authoritySummary.crowdedBuses}
          icon={AlertCircle}
          subtitle="Occupancy over 85%"
          color="peach"
          trend="Requires attention"
        />

        {/* Available Capacity: 624 */}
        <StatCard
          title="Available Capacity"
          value={authoritySummary.availableCapacity}
          icon={Armchair}
          subtitle="Total vacant seats network-wide"
          color="mint"
          trend="Healthy buffer"
        />
      </div>

      {/* Corridor Coordination Insight Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--pastel-blue-bg)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <strong style={{ fontSize: '0.95rem' }}>Corridor Coordination Status: High Demand at Virar &amp; Vasai East</strong>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Bus 101 and Bus 108 are operating near 100% capacity. Recommended to stagger Bus 102 and Bus 212 arrivals.
            </p>
          </div>
        </div>

        <Link to="/authority/demand" className="btn btn-outline btn-sm">
          Inspect Demand Hotspots
        </Link>
      </div>

      {/* Bus Monitoring Section (Table of active buses) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>
              Bus Monitoring
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Live telemetry: location, occupancy percentage, and seat availability per vehicle
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{
              fontSize: '0.75rem',
              backgroundColor: 'var(--pastel-blue-bg)',
              color: 'var(--primary)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: '600'
            }}>
              Showing {buses.length} active fleet vehicles
            </span>
          </div>
        </div>

        <BusTable buses={buses} onAlertBus={handleAlertBus} />
      </section>
    </div>
  );
}
