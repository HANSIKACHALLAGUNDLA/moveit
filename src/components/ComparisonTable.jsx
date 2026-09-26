import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, Users, CheckCircle2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ComparisonTable({ buses = [] }) {
  if (!buses || buses.length === 0) return null;

  // Find the bus with the highest available capacity or lowest occupancy
  const sortedByCapacity = [...buses].sort((a, b) => b.availableCapacity - a.availableCapacity);
  const bestCapacityBusId = sortedByCapacity[0]?.id;

  return (
    <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            Quick Bus Comparison
          </h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Compare upcoming buses to choose the least crowded ride
          </p>
        </div>
        <div style={{
          fontSize: '0.75rem',
          backgroundColor: 'var(--pastel-mint-bg)',
          color: 'var(--pastel-mint-text)',
          border: '1px solid var(--pastel-mint-border)',
          padding: '0.3rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <Sparkles size={12} />
          Smart Coordination Hint: Wait for higher available capacity
        </div>
      </div>

      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Route</th>
              <th>ETA</th>
              <th>Occupancy %</th>
              <th>Available Capacity</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map(bus => {
              const isBest = bus.id === bestCapacityBusId;

              return (
                <tr 
                  key={bus.id}
                  style={{
                    backgroundColor: isBest ? 'rgba(236, 253, 245, 0.45)' : 'inherit'
                  }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                        {bus.busNumber}
                      </strong>
                      {isBest && (
                        <span 
                          title="Less Crowded Alternative"
                          style={{
                            fontSize: '0.7rem',
                            backgroundColor: '#d1fae5',
                            color: '#065f46',
                            padding: '0.1rem 0.4rem',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: '700'
                          }}
                        >
                          Best Choice
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{bus.route}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} style={{ color: 'var(--primary)' }} />
                      <span style={{ fontWeight: '600' }}>{bus.etaMinutes} min</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ 
                        fontWeight: '700',
                        color: bus.occupancyPercent > 90 ? '#be123c' : (bus.occupancyPercent > 70 ? '#c2410c' : '#047857')
                      }}>
                        {bus.occupancyPercent}%
                      </span>
                      <div style={{ width: '60px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${bus.occupancyPercent}%`, 
                          backgroundColor: bus.occupancyPercent > 90 ? '#f43f5e' : (bus.occupancyPercent > 70 ? '#f97316' : '#10b981')
                        }} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontWeight: '600',
                      color: bus.availableCapacity <= 5 ? '#be123c' : '#047857'
                    }}>
                      {bus.availableCapacity} seats
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={bus.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Link
                      to={`/passenger/bus/${bus.id}`}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '0.3rem 0.65rem' }}
                    >
                      View Bus Details
                      <ArrowRight size={13} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
