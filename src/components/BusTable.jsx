import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Bell, Clock, Navigation } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function BusTable({ buses = [], onAlertBus }) {
  if (!buses || buses.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
        No buses found matching your criteria.
      </div>
    );
  }

  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Route</th>
            <th>Current Location</th>
            <th>ETA</th>
            <th>Occupancy</th>
            <th>Available Capacity</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map(bus => {
            const isCrowded = bus.occupancyPercent >= 90;

            return (
              <tr key={bus.id}>
                <td>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {bus.busNumber}
                    </strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Driver: {bus.driverName}
                    </div>
                  </div>
                </td>

                <td style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>
                  {bus.route}
                </td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <Navigation size={13} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span>{bus.currentLocation}</span>
                  </div>
                </td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontWeight: '600' }}>{bus.etaMinutes} min</span>
                  </div>
                </td>

                <td>
                  <div style={{ minWidth: '120px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                      <span style={{ 
                        fontWeight: '700',
                        color: bus.occupancyPercent > 90 ? '#be123c' : (bus.occupancyPercent > 70 ? '#c2410c' : '#047857')
                      }}>
                        {bus.occupancyPercent}%
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {bus.totalCapacity - bus.availableCapacity}/{bus.totalCapacity}
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
                </td>

                <td>
                  <strong style={{ 
                    fontSize: '0.95rem',
                    color: bus.availableCapacity <= 3 ? '#be123c' : (bus.availableCapacity <= 15 ? '#c2410c' : '#047857')
                  }}>
                    {bus.availableCapacity} seats
                  </strong>
                </td>

                <td>
                  <StatusBadge status={bus.status} />
                </td>

                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                    <Link
                      to={`/passenger/bus/${bus.id}`}
                      className="btn btn-secondary btn-sm"
                      title="Inspect Bus Details"
                      style={{ padding: '0.35rem 0.65rem' }}
                    >
                      <Eye size={14} />
                      <span className="hide-on-mobile">Inspect</span>
                    </Link>

                    {isCrowded && (
                      <button
                        onClick={() => onAlertBus && onAlertBus(bus)}
                        className="btn btn-outline btn-sm"
                        style={{ 
                          padding: '0.35rem 0.65rem', 
                          borderColor: 'var(--pastel-peach-border)',
                          color: '#c2410c',
                          backgroundColor: 'var(--pastel-peach-bg)'
                        }}
                        title="Dispatch Overcrowding Alert / Backup"
                      >
                        <Bell size={14} />
                        <span className="hide-on-mobile">Backup</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
