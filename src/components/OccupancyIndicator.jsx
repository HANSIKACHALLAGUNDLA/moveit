import React from 'react';

export default function OccupancyIndicator({ 
  percentage, 
  availableSeats, 
  totalSeats = 50,
  showDetailedBlocks = false,
  size = 'md'
}) {
  // Determine color theme based on occupancy
  let fillColor = '#10b981'; // Mint Green (<=50%)
  let bgColor = '#ecfdf5';
  let textColor = '#047857';

  if (percentage > 90) {
    fillColor = '#f43f5e'; // Soft Rose
    bgColor = '#fff1f2';
    textColor = '#be123c';
  } else if (percentage > 70) {
    fillColor = '#f97316'; // Soft Peach / Orange
    bgColor = '#fff7ed';
    textColor = '#c2410c';
  } else if (percentage > 50) {
    fillColor = '#3b82f6'; // Soft Blue
    bgColor = '#eff6ff';
    textColor = '#1d4ed8';
  }

  // Calculate 20 block visual representation for detailed mode
  // e.g. [██████████████████░░]
  const totalBlocks = 20;
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);

  return (
    <div style={{ width: '100%' }}>
      {/* Top Labels */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '0.4rem',
        fontSize: size === 'sm' ? '0.8rem' : '0.875rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
          <span style={{ fontWeight: '700', color: textColor, fontSize: size === 'lg' ? '1.25rem' : '0.95rem' }}>
            {percentage}%
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>occupied</span>
        </div>

        <span style={{ 
          fontSize: '0.8rem', 
          fontWeight: '600', 
          color: availableSeats <= 5 ? '#be123c' : 'var(--text-secondary)'
        }}>
          {availableSeats !== undefined ? (
            availableSeats === 0 ? 'No seats left' : `${availableSeats} seats left`
          ) : `${totalSeats - Math.round((percentage * totalSeats) / 100)} available`}
        </span>
      </div>

      {/* Modern Progress Bar */}
      <div 
        className="progress-bar-container" 
        style={{ 
          height: size === 'lg' ? '12px' : (size === 'sm' ? '6px' : '9px'),
          backgroundColor: bgColor
        }}
      >
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${Math.min(100, Math.max(0, percentage))}%`,
            backgroundColor: fillColor
          }}
        />
      </div>

      {/* Visual Block Representation (as specifically requested in PAGE 5: 94% Occupied [██████████████████░░]) */}
      {showDetailedBlocks && (
        <div style={{ 
          marginTop: '0.85rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          fontFamily: 'monospace',
          fontSize: '0.9rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Visual Capacity Grid:</span>
            <span style={{ color: textColor, fontWeight: '700' }}>{percentage}% Occupied</span>
          </div>
          <div style={{ 
            letterSpacing: '2px', 
            color: fillColor,
            fontSize: '1.05rem',
            wordBreak: 'break-all'
          }}>
            {'█'.repeat(filledBlocks)}
            <span style={{ color: '#cbd5e1' }}>{'░'.repeat(totalBlocks - filledBlocks)}</span>
          </div>
          <div style={{ 
            marginTop: '0.35rem', 
            fontSize: '0.8rem', 
            color: 'var(--text-muted)',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>Occupied: {totalSeats - (availableSeats ?? 0)}</span>
            <span>Available: {availableSeats ?? 0} seats</span>
            <span>Total: {totalSeats}</span>
          </div>
        </div>
      )}
    </div>
  );
}
