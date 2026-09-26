import React from 'react';
import { BusFront, RefreshCw } from 'lucide-react';

export default function EmptyState({ 
  title = 'No Buses Found', 
  message = 'There are currently no buses matching your search or filters.',
  actionLabel = 'Reset Filters',
  onAction
}) {
  return (
    <div className="card" style={{
      textAlign: 'center',
      padding: '3rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.85rem'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--pastel-blue-bg)',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.5rem'
      }}>
        <BusFront size={28} />
      </div>

      <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
        {title}
      </h4>

      <p style={{ maxWidth: '400px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        {message}
      </p>

      {onAction && (
        <button 
          onClick={onAction}
          className="btn btn-secondary btn-sm"
          style={{ marginTop: '0.5rem' }}
        >
          <RefreshCw size={14} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
