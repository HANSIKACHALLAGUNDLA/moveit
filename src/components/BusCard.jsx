import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, MapPin, Clock, ArrowRight, Sparkles, Navigation } from 'lucide-react';
import StatusBadge from './StatusBadge';
import OccupancyIndicator from './OccupancyIndicator';

export default function BusCard({ bus, isRecommended = false }) {
  if (!bus) return null;

  return (
    <div 
      className="card" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        border: isRecommended ? '1.5px solid var(--pastel-mint-border)' : '1px solid var(--border-color)',
        backgroundColor: isRecommended ? '#fafffd' : 'var(--bg-card)',
        padding: '1.4rem'
      }}
    >
      {/* Recommended Pill if less-crowded or optimal */}
      {isRecommended && (
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '20px',
          backgroundColor: '#10b981',
          color: '#ffffff',
          fontSize: '0.725rem',
          fontWeight: '700',
          padding: '0.2rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Sparkles size={11} />
          Recommended: Less Crowded
        </div>
      )}

      {/* Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--pastel-blue-bg)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bus size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {bus.busNumber}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Route: <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{bus.route}</span>
              </p>
            </div>
          </div>

          <StatusBadge status={bus.status} />
        </div>

        {/* Location & ETA Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem',
          padding: '0.85rem',
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          margin: '0.85rem 0 1.15rem 0',
          fontSize: '0.825rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <div>
              <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>ETA to you</span>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{bus.etaMinutes} min</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <MapPin size={16} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Current Location</span>
              <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{bus.currentLocation}</span>
            </div>
          </div>
        </div>

        {/* Next stop */}
        <div style={{ 
          fontSize: '0.825rem', 
          color: 'var(--text-muted)', 
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Navigation size={13} style={{ color: 'var(--primary)' }} />
          <span>Next stop:</span>
          <strong style={{ color: 'var(--text-secondary)' }}>{bus.nextStop}</strong>
        </div>

        {/* Occupancy Indicator */}
        <div style={{ marginBottom: '1.25rem' }}>
          <OccupancyIndicator 
            percentage={bus.occupancyPercent} 
            availableSeats={bus.availableCapacity} 
            totalSeats={bus.totalCapacity}
          />
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingTop: '0.85rem',
        borderTop: '1px solid var(--border-color)',
        gap: '0.5rem'
      }}>
        <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
          Speed: ~{bus.speedKmH} km/h
        </span>

        <Link 
          to={`/passenger/bus/${bus.id}`} 
          className="btn btn-primary btn-sm"
          style={{ textDecoration: 'none' }}
        >
          View Bus Details
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
