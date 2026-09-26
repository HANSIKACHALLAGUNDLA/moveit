import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, AlertCircle, Users } from 'lucide-react';

export default function StatusBadge({ status, type }) {
  // Normalize string
  const s = (status || '').toLowerCase();

  if (s.includes('available') || s.includes('normal') || s.includes('low')) {
    return (
      <span className="badge badge-mint">
        <CheckCircle2 size={12} />
        {status || 'Available'}
      </span>
    );
  }

  if (s.includes('moderate')) {
    return (
      <span className="badge badge-blue">
        <Clock size={12} />
        {status || 'Moderate'}
      </span>
    );
  }

  if (s.includes('nearly full') || s.includes('high')) {
    return (
      <span className="badge badge-peach">
        <AlertTriangle size={12} />
        {status || 'Nearly Full'}
      </span>
    );
  }

  if (s.includes('crowded') || s.includes('critical') || s.includes('full')) {
    return (
      <span className="badge badge-rose">
        <AlertCircle size={12} />
        {status || 'Crowded'}
      </span>
    );
  }

  return (
    <span className="badge badge-lavender">
      <Users size={12} />
      {status || 'Standard'}
    </span>
  );
}
