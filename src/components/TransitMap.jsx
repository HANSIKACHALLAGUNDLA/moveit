import React, { useState } from 'react';
import { Bus, MapPin, Navigation, Info, Users, Compass } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function TransitMap({ buses = [], stops = [], onSelectBus }) {
  const [activeBus, setActiveBus] = useState(null);
  const [activeStop, setActiveStop] = useState(null);

  return (
    <div className="card" style={{ padding: '1.25rem', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--pastel-blue-bg)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Compass size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Schematic Transit Corridor & Bus Markers
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Corridor Fleet Positioning &amp; Stop Telemetry
            </span>
          </div>
        </div>

        <div style={{
          fontSize: '0.75rem',
          backgroundColor: '#f1f5f9',
          color: 'var(--text-muted)',
          padding: '0.3rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <Info size={13} />
          Click any bus marker to inspect
        </div>
      </div>

      {/* Map Canvas Visualizer */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '360px',
        backgroundColor: '#f8fafc',
        borderRadius: 'var(--radius-md)',
        border: '1.5px dashed #cbd5e1',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
      }}>
        {/* Grid pattern background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          opacity: 0.7
        }} />

        {/* SVG Route Corridor Lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Main Transit Corridor Route 1: Virar to Vasai */}
          <path
            d="M 120 90 Q 250 130 380 180 T 680 230"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          {/* Loop / Branch Route 2: East Corridor */}
          <path
            d="M 280 80 Q 420 120 540 160 T 780 200"
            fill="none"
            stroke="#c4b5fd"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="6 6"
            opacity="0.6"
          />
        </svg>

        {/* Bus Stop Markers */}
        {stops.map(stop => {
          const isSelected = activeStop?.id === stop.id;

          return (
            <div
              key={stop.id}
              onClick={() => {
                setActiveStop(stop);
                setActiveBus(null);
              }}
              style={{
                position: 'absolute',
                left: `${stop.mapCoords?.x ?? 50}%`,
                top: `${stop.mapCoords?.y ?? 50}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: isSelected ? '18px' : '14px',
                height: isSelected ? '18px' : '14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isSelected ? 'var(--primary)' : '#ffffff',
                border: '3px solid #3b82f6',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition)'
              }} />

              <span style={{
                marginTop: '4px',
                fontSize: '0.725rem',
                fontWeight: '700',
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                padding: '1px 6px',
                borderRadius: '4px',
                border: '1px solid #e2e8f0',
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                {stop.name}
              </span>
            </div>
          );
        })}

        {/* Dynamic Bus Markers */}
        {buses.map(bus => {
          const isSelected = activeBus?.id === bus.id;
          const isCrowded = bus.occupancyPercent >= 90;
          const isModerate = bus.occupancyPercent >= 60 && bus.occupancyPercent < 90;

          const markerColor = isCrowded ? '#ef4444' : (isModerate ? '#f97316' : '#10b981');

          return (
            <div
              key={bus.id}
              onClick={() => {
                setActiveBus(bus);
                setActiveStop(null);
                if (onSelectBus) onSelectBus(bus);
              }}
              style={{
                position: 'absolute',
                left: `${bus.mapPosition?.x ?? 40}%`,
                top: `${bus.mapPosition?.y ?? 40}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Bus Pin Marker */}
              <div style={{
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isSelected ? '#1e293b' : '#ffffff',
                color: isSelected ? '#ffffff' : 'var(--text-primary)',
                border: `2px solid ${markerColor}`,
                boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                fontWeight: '800'
              }}>
                <Bus size={13} style={{ color: markerColor }} />
                <span>{bus.busNumber}</span>
                <span style={{ 
                  fontSize: '0.675rem', 
                  backgroundColor: markerColor, 
                  color: '#ffffff', 
                  padding: '1px 4px', 
                  borderRadius: '3px' 
                }}>
                  {bus.occupancyPercent}%
                </span>
              </div>
            </div>
          );
        })}

        {/* Selected Bus / Stop Floating Detail Drawer */}
        {(activeBus || activeStop) && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '0.75rem 1rem',
            boxShadow: 'var(--shadow-modal)',
            zIndex: 30,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {activeBus ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--pastel-blue-bg)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Bus size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {activeBus.busNumber} ({activeBus.route})
                    </strong>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Next: {activeBus.nextStop} • Speed: {activeBus.speedKmH} km/h • ETA: {activeBus.etaMinutes} min
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>
                    {activeBus.availableCapacity} seats free ({activeBus.occupancyPercent}% full)
                  </span>
                  <StatusBadge status={activeBus.status} />
                  <button
                    onClick={() => setActiveBus(null)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--pastel-mint-bg)',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {activeStop.name} Stop
                    </strong>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Zone: {activeStop.area} • Code: {activeStop.locationCode}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}>
                    {activeStop.waitingPassengers} Waiting Passengers
                  </span>
                  <StatusBadge status={activeStop.demandStatus} />
                  <button
                    onClick={() => setActiveStop(null)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div style={{
        marginTop: '0.75rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            Available Bus (&lt;60%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f97316' }} />
            Moderate Bus (60-89%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            Crowded Bus (≥90%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
            Bus Stop Point
          </span>
        </div>

        <span>Corridor Network Active</span>
      </div>
    </div>
  );
}
