import React from 'react';
import { CheckCircle2, Navigation, Circle, MapPin } from 'lucide-react';

export default function RouteProgress({ 
  currentLocation = 'Virar Station', 
  nextStop = 'Nalasopara West', 
  selectedStopName = 'Vasai Station', 
  followingStop = 'Vasai East',
  customStops
}) {
  // Built-in 4-step sequence as requested in Page 5 prompt:
  // Current Location -> Next Stop -> Passenger's Selected Stop -> Following Stop
  const defaultSteps = [
    {
      title: 'Current Location',
      name: currentLocation,
      status: 'current',
      note: 'Bus currently moving here'
    },
    {
      title: 'Next Stop',
      name: nextStop,
      status: 'next',
      note: 'Approaching next in sequence'
    },
    {
      title: "Passenger's Selected Stop",
      name: selectedStopName,
      status: 'selected',
      note: 'Your destination or boarding point'
    },
    {
      title: 'Following Stop',
      name: followingStop,
      status: 'upcoming',
      note: 'Subsequent scheduled stop'
    }
  ];

  const steps = customStops || defaultSteps;

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        position: 'relative'
      }}>
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          const isCurrent = step.status === 'current';
          const isSelected = step.status === 'selected';
          const isNext = step.status === 'next';

          return (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                gap: '1.25rem',
                position: 'relative',
                paddingBottom: isLast ? '0' : '1.75rem'
              }}
            >
              {/* Connecting Line */}
              {!isLast && (
                <div style={{
                  position: 'absolute',
                  top: '28px',
                  left: '17px',
                  width: '2px',
                  height: 'calc(100% - 24px)',
                  backgroundColor: isCurrent ? 'var(--primary)' : '#e2e8f0',
                  zIndex: 1
                }} />
              )}

              {/* Node Icon */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isSelected ? '#eff6ff' : (isCurrent ? '#eff6ff' : '#f8fafc'),
                border: isSelected 
                  ? '2px solid var(--primary)' 
                  : (isCurrent ? '2px solid var(--primary)' : '2px solid #cbd5e1'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isSelected || isCurrent ? 'var(--primary)' : 'var(--text-muted)',
                zIndex: 2,
                flexShrink: 0,
                boxShadow: isCurrent ? '0 0 0 4px rgba(37, 99, 235, 0.15)' : 'none'
              }}>
                {isCurrent && <Navigation size={18} />}
                {isNext && <Circle size={14} fill="currentColor" />}
                {isSelected && <MapPin size={18} />}
                {!isCurrent && !isNext && !isSelected && <Circle size={10} />}
              </div>

              {/* Content Box */}
              <div style={{
                flex: 1,
                padding: '0.65rem 1rem',
                backgroundColor: isSelected ? 'var(--pastel-blue-bg)' : (isCurrent ? '#ffffff' : '#f8fafc'),
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '1px solid var(--pastel-blue-border)' : '1px solid var(--border-color)',
                boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '700', 
                    color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {step.title}
                  </span>

                  {isSelected && (
                    <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                      Selected by You
                    </span>
                  )}
                  {isCurrent && (
                    <span className="badge badge-mint" style={{ fontSize: '0.7rem' }}>
                      Active Bus Position
                    </span>
                  )}
                </div>

                <h5 style={{ 
                  fontSize: '1.05rem', 
                  fontWeight: '700', 
                  color: 'var(--text-primary)',
                  margin: '0.2rem 0'
                }}>
                  {step.name}
                </h5>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {step.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
