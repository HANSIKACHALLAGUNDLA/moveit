import React from 'react';

export default function DemandChart({ stops = [] }) {
  if (!stops || stops.length === 0) return null;

  // Find max waiting passengers to scale bars proportionally
  const maxWaiting = Math.max(...stops.map(s => s.waitingPassengers), 50);

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            Passenger Demand Distribution by Bus Stop
          </h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Real-time waiting queue comparison across major transit corridors
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#10b981' }} />
            <span>Normal (&lt; 25)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#3b82f6' }} />
            <span>Moderate (25 - 40)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#f97316' }} />
            <span>High (&gt; 40)</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {stops.map(stop => {
          const count = stop.waitingPassengers;
          const percentage = Math.round((count / maxWaiting) * 100);

          let barColor = '#10b981'; // Mint
          let barBg = '#ecfdf5';

          if (count > 40) {
            barColor = '#f97316'; // Peach / Orange
            barBg = '#fff7ed';
          } else if (count >= 25) {
            barColor = '#3b82f6'; // Soft Blue
            barBg = '#eff6ff';
          }

          return (
            <div key={stop.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Stop Name Label */}
              <div style={{ 
                width: '140px', 
                flexShrink: 0, 
                fontSize: '0.85rem', 
                fontWeight: '600',
                color: 'var(--text-primary)',
                textAlign: 'left'
              }}>
                {stop.name}
              </div>

              {/* Progress Bar & Value */}
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{
                  height: '24px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${percentage}%`,
                      backgroundColor: barColor,
                      borderRadius: 'var(--radius-sm)',
                      transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    left: percentage > 15 ? '8px' : 'calc(' + percentage + '% + 8px)',
                    color: percentage > 15 ? '#ffffff' : 'var(--text-primary)',
                    fontSize: '0.775rem',
                    fontWeight: '700',
                    textShadow: percentage > 15 ? '0 1px 2px rgba(0,0,0,0.2)' : 'none'
                  }}>
                    {count} waiting
                  </span>
                </div>
              </div>

              {/* Demand Status Tag */}
              <div style={{ width: '110px', flexShrink: 0, textAlign: 'right' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: barColor
                }}>
                  {stop.demandStatus}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
