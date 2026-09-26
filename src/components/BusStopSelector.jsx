import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Check, ChevronDown, Sparkles, Navigation } from 'lucide-react';
import { useTransport } from '../context/TransportContext';

export default function BusStopSelector({ compact = false }) {
  const { 
    currentStop, 
    stops, 
    setSelectedStopId, 
    userCheckedIn, 
    checkInAtStop 
  } = useTransport();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="card" style={{
      background: 'linear-gradient(180deg, #ffffff 0%, #f9fbff 100%)',
      border: userCheckedIn ? '1.5px solid var(--pastel-mint-border)' : '1px solid var(--border-color)',
      padding: compact ? '1rem 1.25rem' : '1.5rem',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem'
      }}>
        {/* Left: Location selection */}
        <div style={{ flex: '1 1 280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <MapPin size={16} style={{ color: 'var(--primary)' }} />
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              color: 'var(--primary)'
            }}>
              Where are you now?
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                backgroundColor: '#ffffff',
                border: '1.5px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'var(--transition)'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                  Current Bus Stop
                </span>
                <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {currentStop?.name || 'Select Bus Stop'}
                </span>
              </div>
              <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '0.4rem',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-modal)',
                zIndex: 40,
                maxHeight: '260px',
                overflowY: 'auto',
                padding: '0.4rem'
              }}>
                <div style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  Select from available stops:
                </div>
                {stops.map(stop => (
                  <button
                    key={stop.id}
                    onClick={() => {
                      setSelectedStopId(stop.id);
                      setIsDropdownOpen(false);
                    }}
                    type="button"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: stop.id === currentStop?.id ? 'var(--pastel-blue-bg)' : 'transparent',
                      color: stop.id === currentStop?.id ? 'var(--primary)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.9rem',
                      fontWeight: stop.id === currentStop?.id ? '700' : '500'
                    }}
                  >
                    <span>{stop.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {stop.waitingPassengers} waiting
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Live Waiting Passengers Count */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          padding: '0.75rem 1.15rem',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--pastel-blue-bg)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'block' }}>
              Demand at this stop
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
              <strong style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                {currentStop?.waitingPassengers ?? 0}
              </strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                passengers waiting
              </span>
            </div>
          </div>
        </div>

        {/* Right: "I'm at this bus stop" Confirmation Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <button
            onClick={() => checkInAtStop(currentStop?.id)}
            type="button"
            className={userCheckedIn ? "btn btn-success" : "btn btn-primary"}
            style={{ padding: '0.75rem 1.35rem', fontSize: '0.95rem' }}
          >
            {userCheckedIn ? (
              <>
                <Check size={18} />
                I’m at this bus stop (Confirmed)
              </>
            ) : (
              <>
                <Navigation size={18} />
                I’m at this bus stop
              </>
            )}
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.725rem', color: userCheckedIn ? '#059669' : 'var(--text-muted)' }}>
              {userCheckedIn ? '● Transport operators see your demand' : 'Click to signal operator coordination'}
            </span>
            <Link 
              to="/passenger/stops" 
              style={{ fontSize: '0.75rem', fontWeight: '600', marginLeft: '0.5rem' }}
            >
              Browse all stops →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
