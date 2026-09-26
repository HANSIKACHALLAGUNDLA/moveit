import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  Users, 
  Check, 
  ArrowRight, 
  Info,
  Navigation,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useTransport } from '../context/TransportContext';
import StatusBadge from '../components/StatusBadge';

export default function BusStopSelectionPage() {
  const navigate = useNavigate();
  const { 
    stops, 
    selectedStopId, 
    setSelectedStopId, 
    userCheckedIn, 
    checkInAtStop 
  } = useTransport();

  const [search, setSearch] = useState('');
  const [selectedTempId, setSelectedTempId] = useState(selectedStopId);
  const [confirmedMessage, setConfirmedMessage] = useState('');

  // Filter stops by search term
  const filteredStops = stops.filter(stop => 
    stop.name.toLowerCase().includes(search.toLowerCase()) ||
    stop.area.toLowerCase().includes(search.toLowerCase()) ||
    stop.locationCode.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirmPresence = (stopId) => {
    setSelectedStopId(stopId);
    checkInAtStop(stopId);
    const target = stops.find(s => s.id === stopId);
    setConfirmedMessage(`You are confirmed at ${target?.name}! Transport operators have received your coordination signal.`);
    setTimeout(() => {
      navigate('/passenger/dashboard');
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
          <span>Commuter Setup</span>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Select Bus Stop</span>
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
          Bus Stop Selection
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Locate your boarding bus stop, check waiting passengers, and confirm your presence to coordinate transport demand.
        </p>
      </div>

      {/* Confirmation Banner if confirmed */}
      {confirmedMessage && (
        <div style={{
          backgroundColor: 'var(--pastel-mint-bg)',
          border: '1.5px solid var(--pastel-mint-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#065f46'
        }}>
          <Check size={20} style={{ color: '#10b981' }} />
          <div>
            <strong style={{ fontSize: '0.95rem' }}>Status Confirmed!</strong>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>{confirmedMessage}</p>
          </div>
        </div>
      )}

      {/* Search Input Card */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }}>
            <Search size={18} />
          </div>
          <input
            type="text"
            className="input"
            style={{ paddingLeft: '2.75rem', fontSize: '1rem', padding: '0.75rem 1rem 0.75rem 2.75rem' }}
            placeholder="Search by stop name (e.g. Virar Station, Vasai East, Nalasopara)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{
          marginTop: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <Info size={14} style={{ color: 'var(--primary)' }} />
          <span>Select your boarding stop from the corridor network to view live passenger demand and approaching bus capacity.</span>
        </div>
      </div>

      {/* Bus Stops Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.25rem'
      }}>
        {filteredStops.map(stop => {
          const isSelected = selectedTempId === stop.id;
          const isCheckedInHere = userCheckedIn && selectedStopId === stop.id;

          return (
            <div
              key={stop.id}
              onClick={() => setSelectedTempId(stop.id)}
              className="card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                backgroundColor: isSelected ? 'var(--pastel-blue-bg)' : '#ffffff',
                boxShadow: isSelected ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
                transition: 'var(--transition)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.35rem'
              }}
            >
              <div>
                {/* Header with location code & badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isSelected ? 'var(--primary)' : '#f1f5f9',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin size={18} />
                  </div>

                  <StatusBadge status={stop.demandStatus} />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {stop.name}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>
                  Zone: {stop.area} • Code: {stop.locationCode}
                </span>

                {/* Waiting Passengers display */}
                <div style={{
                  margin: '1rem 0',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <Users size={16} style={{ color: 'var(--primary)' }} />
                    <span>Waiting Passengers:</span>
                  </div>
                  <strong style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                    {stop.waitingPassengers}
                  </strong>
                </div>

                {/* Connected Routes */}
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Connected Routes: <strong style={{ color: 'var(--text-secondary)' }}>{stop.connectedRoutes.join(', ')}</strong>
                </div>
              </div>

              {/* Action: "I'm at this bus stop" */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleConfirmPresence(stop.id);
                }}
                className={isCheckedInHere ? "btn btn-success" : (isSelected ? "btn btn-primary" : "btn btn-secondary")}
                style={{ width: '100%', fontSize: '0.875rem' }}
              >
                {isCheckedInHere ? (
                  <>
                    <Check size={16} />
                    Confirmed Here (Checked In)
                  </>
                ) : (
                  <>
                    <Navigation size={16} />
                    I’m at this bus stop
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
