import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function FilterBar({
  selectedRoute,
  onRouteChange,
  routes = [],
  selectedOccupancy,
  onOccupancyChange,
  sortBy,
  onSortChange
}) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      alignItems: 'center'
    }}>
      {/* Route Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          Route:
        </span>
        <select
          className="select"
          value={selectedRoute}
          onChange={(e) => onRouteChange(e.target.value)}
          style={{ width: 'auto', minWidth: '160px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
        >
          <option value="all">All Routes</option>
          {routes.filter(r => r.id !== 'all').map(route => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>
      </div>

      {/* Occupancy Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          Occupancy:
        </span>
        <select
          className="select"
          value={selectedOccupancy}
          onChange={(e) => onOccupancyChange(e.target.value)}
          style={{ width: 'auto', minWidth: '150px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
        >
          <option value="all">All Levels</option>
          <option value="available">Available (&lt; 50%)</option>
          <option value="moderate">Moderate (50 - 80%)</option>
          <option value="crowded">Crowded / Full (&gt; 80%)</option>
        </select>
      </div>

      {/* Sort Option (if provided) */}
      {onSortChange && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            Sort:
          </span>
          <select
            className="select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{ width: 'auto', minWidth: '140px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
          >
            <option value="eta">Fastest ETA</option>
            <option value="capacity">Highest Available Seats</option>
            <option value="occupancyAsc">Lowest Occupancy %</option>
            <option value="busNumber">Bus Number</option>
          </select>
        </div>
      )}
    </div>
  );
}
