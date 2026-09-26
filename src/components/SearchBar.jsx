import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = 'Search by bus number, route, or stop...',
  onClear
}) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
      <div style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
        <Search size={18} />
      </div>

      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          paddingLeft: '2.5rem',
          paddingRight: value ? '2.5rem' : '1rem'
        }}
      />

      {value && (
        <button
          onClick={onClear || (() => onChange(''))}
          type="button"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: 'var(--radius-full)'
          }}
          title="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
