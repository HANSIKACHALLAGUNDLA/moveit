import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  subtitle, 
  trend,
  color = 'blue' 
}) {
  const colorMap = {
    blue: {
      bg: 'var(--pastel-blue-bg)',
      border: 'var(--pastel-blue-border)',
      text: 'var(--pastel-blue-text)',
      iconBg: '#dbeafe'
    },
    mint: {
      bg: 'var(--pastel-mint-bg)',
      border: 'var(--pastel-mint-border)',
      text: 'var(--pastel-mint-text)',
      iconBg: '#a7f3d0'
    },
    peach: {
      bg: 'var(--pastel-peach-bg)',
      border: 'var(--pastel-peach-border)',
      text: 'var(--pastel-peach-text)',
      iconBg: '#fed7aa'
    },
    lavender: {
      bg: 'var(--pastel-lavender-bg)',
      border: 'var(--pastel-lavender-border)',
      text: 'var(--pastel-lavender-text)',
      iconBg: '#ddd6fe'
    },
    rose: {
      bg: 'var(--pastel-rose-bg)',
      border: 'var(--pastel-rose-border)',
      text: 'var(--pastel-rose-text)',
      iconBg: '#fecdd3'
    }
  };

  const currentTheme = colorMap[color] || colorMap.blue;

  return (
    <div className="card" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '0.75rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
          {title}
        </span>
        {Icon && (
          <div style={{ 
            width: '38px', 
            height: '38px', 
            borderRadius: 'var(--radius-md)', 
            backgroundColor: currentTheme.bg,
            color: currentTheme.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          {value}
        </h3>
        {trend && (
          <span style={{ fontSize: '0.8rem', color: currentTheme.text, fontWeight: '600' }}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-0.25rem' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
