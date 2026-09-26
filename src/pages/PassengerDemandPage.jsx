import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Bus, 
  MapPin, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  Filter,
  BarChart2
} from 'lucide-react';
import { useTransport } from '../context/TransportContext';
import StatusBadge from '../components/StatusBadge';
import DemandChart from '../components/DemandChart';

export default function PassengerDemandPage() {
  const { stops, buses } = useTransport();
  const [filterDemand, setFilterDemand] = useState('all');

  // Match each stop with its upcoming bus details
  const enrichedStops = stops.map(stop => {
    const upcomingBus = buses.find(b => b.id === stop.upcomingBusId) || buses[0];
    return {
      ...stop,
      upcomingBus
    };
  });

  const filteredStops = enrichedStops.filter(stop => {
    if (filterDemand === 'all') return true;
    if (filterDemand === 'high') return stop.waitingPassengers > 35;
    if (filterDemand === 'moderate') return stop.waitingPassengers >= 25 && stop.waitingPassengers <= 35;
    if (filterDemand === 'normal') return stop.waitingPassengers < 25;
    return true;
  });

  // Calculate totals
  const totalWaiting = stops.reduce((acc, s) => acc + s.waitingPassengers, 0);
  const highDemandCount = stops.filter(s => s.demandStatus.toLowerCase().includes('high')).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Title & Context Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
          <span>Transport Authority</span>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Capacity Planning</span>
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
          Passenger Demand Analysis
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Monitor commuter queues at stops to coordinate bus frequency and prevent platform overcrowding.
        </p>
      </div>

      {/* Top Demand Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem'
      }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total Waiting Passengers</span>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0.25rem 0' }}>
            {totalWaiting}
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>Across 8 active stations</span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>High Demand Hotspots</span>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#c2410c', margin: '0.25rem 0' }}>
            {highDemandCount} Stops
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#c2410c', fontWeight: '600' }}>Virar &amp; Vasai East Corridors</span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Average Wait Time</span>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', margin: '0.25rem 0' }}>
            7.4 min
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>-3.1 min with MOVEIT</span>
        </div>
      </div>

      {/* VISUAL CHART SECTION (As explicitly requested in Page 8) */}
      <section>
        <DemandChart stops={stops} />
      </section>

      {/* DETAILED STOP DEMAND LIST / TABLE */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>
              Bus Stop Demand Breakdown
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real-time waiting queue, approaching bus capacity, and demand classification
            </p>
          </div>

          {/* Demand Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Filter Demand:</span>
            <select
              className="select"
              value={filterDemand}
              onChange={(e) => setFilterDemand(e.target.value)}
              style={{ width: 'auto', minWidth: '150px', padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="all">All Demand Levels</option>
              <option value="high">High Demand (&gt;35)</option>
              <option value="moderate">Moderate Demand (25-35)</option>
              <option value="normal">Normal Demand (&lt;25)</option>
            </select>
          </div>
        </div>

        {/* Table representation matching Page 8 specifications */}
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Bus Stop</th>
                <th>Waiting Passengers</th>
                <th>Upcoming Bus</th>
                <th>Bus Occupancy %</th>
                <th>Demand Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStops.map(stop => {
                const bus = stop.upcomingBus;

                return (
                  <tr key={stop.id}>
                    <td>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {stop.name}
                        </strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Zone: {stop.area} • Code: {stop.locationCode}
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Users size={16} style={{ color: 'var(--primary)' }} />
                        <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                          {stop.waitingPassengers}
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>waiting</span>
                      </div>
                    </td>

                    <td>
                      {bus ? (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Bus size={14} style={{ color: 'var(--text-muted)' }} />
                            <strong style={{ fontSize: '0.9rem' }}>{bus.busNumber}</strong>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            ETA {bus.etaMinutes} min ({bus.route})
                          </span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>No bus assigned</span>
                      )}
                    </td>

                    <td>
                      {bus ? (
                        <div style={{ minWidth: '110px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                            <strong style={{
                              color: bus.occupancyPercent > 90 ? '#be123c' : (bus.occupancyPercent > 70 ? '#c2410c' : '#047857')
                            }}>
                              {bus.occupancyPercent}%
                            </strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {bus.availableCapacity} seats free
                            </span>
                          </div>
                          <div className="progress-bar-container" style={{ height: '6px' }}>
                            <div 
                              className="progress-bar-fill" 
                              style={{ 
                                width: `${bus.occupancyPercent}%`,
                                backgroundColor: bus.occupancyPercent > 90 ? '#f43f5e' : (bus.occupancyPercent > 70 ? '#f97316' : '#10b981')
                              }} 
                            />
                          </div>
                        </div>
                      ) : '-'}
                    </td>

                    <td>
                      <StatusBadge status={stop.demandStatus} />
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      {bus && (
                        <Link
                          to={`/passenger/bus/${bus.id}`}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.3rem 0.65rem' }}
                        >
                          View Bus
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
