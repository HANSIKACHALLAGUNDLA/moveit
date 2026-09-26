import React, { useState, useMemo } from 'react';
import { 
  Bus, 
  Search, 
  Filter, 
  MapPin, 
  LayoutList, 
  LayoutGrid, 
  Compass,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useTransport } from '../context/TransportContext';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import BusTable from '../components/BusTable';
import BusCard from '../components/BusCard';
import TransitMap from '../components/TransitMap';
import EmptyState from '../components/EmptyState';

export default function BusMonitoringPage() {
  const { buses, stops, routes } = useTransport();

  const [search, setSearch] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [selectedOccupancy, setSelectedOccupancy] = useState('all');
  const [sortBy, setSortBy] = useState('eta');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [selectedBusFromMap, setSelectedBusFromMap] = useState(null);

  // Filtered buses
  const filteredBuses = useMemo(() => {
    return buses.filter(bus => {
      const q = search.toLowerCase().trim();
      const matchSearch = !q || (
        bus.busNumber.toLowerCase().includes(q) ||
        bus.route.toLowerCase().includes(q) ||
        bus.currentLocation.toLowerCase().includes(q) ||
        bus.driverName.toLowerCase().includes(q)
      );

      const matchRoute = selectedRoute === 'all' || bus.route === selectedRoute;

      let matchOccupancy = true;
      if (selectedOccupancy === 'available') {
        matchOccupancy = bus.occupancyPercent < 50;
      } else if (selectedOccupancy === 'moderate') {
        matchOccupancy = bus.occupancyPercent >= 50 && bus.occupancyPercent <= 80;
      } else if (selectedOccupancy === 'crowded') {
        matchOccupancy = bus.occupancyPercent > 80;
      }

      return matchSearch && matchRoute && matchOccupancy;
    }).sort((a, b) => {
      if (sortBy === 'eta') return a.etaMinutes - b.etaMinutes;
      if (sortBy === 'capacity') return b.availableCapacity - a.availableCapacity;
      if (sortBy === 'occupancyAsc') return a.occupancyPercent - b.occupancyPercent;
      if (sortBy === 'busNumber') return a.busNumber.localeCompare(b.busNumber);
      return 0;
    });
  }, [buses, search, selectedRoute, selectedOccupancy, sortBy]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Title & Context Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
          <span>Transport Authority</span>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Fleet Tracking</span>
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
          Bus Monitoring
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Detailed fleet visibility: Search, filter by route and occupancy status, and observe schematic transit corridor locations.
        </p>
      </div>

      {/* Map Placeholder Card (As specifically requested in Page 7) */}
      <section>
        <TransitMap
          buses={filteredBuses}
          stops={stops}
          onSelectBus={(bus) => setSelectedBusFromMap(bus)}
        />
      </section>

      {/* Filter and Search Bar */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search bus number, route, driver..."
          />

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <FilterBar
              selectedRoute={selectedRoute}
              onRouteChange={setSelectedRoute}
              routes={routes}
              selectedOccupancy={selectedOccupancy}
              onOccupancyChange={setSelectedOccupancy}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* View Mode Toggle */}
            <div style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              padding: '3px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                style={{
                  border: 'none',
                  padding: '0.35rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'table' ? '#ffffff' : 'transparent',
                  color: viewMode === 'table' ? 'var(--primary)' : 'var(--text-muted)',
                  boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none'
                }}
                title="Table View"
              >
                <LayoutList size={16} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                style={{
                  border: 'none',
                  padding: '0.35rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'cards' ? '#ffffff' : 'transparent',
                  color: viewMode === 'cards' ? 'var(--primary)' : 'var(--text-muted)',
                  boxShadow: viewMode === 'cards' ? 'var(--shadow-sm)' : 'none'
                }}
                title="Grid Cards View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          <span>Showing <strong>{filteredBuses.length}</strong> monitored buses</span>
          <span>Updated via live coordination telemetry</span>
        </div>

        {/* Bus List or Cards */}
        {filteredBuses.length > 0 ? (
          viewMode === 'table' ? (
            <BusTable buses={filteredBuses} />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}>
              {filteredBuses.map(bus => (
                <BusCard key={bus.id} bus={bus} />
              ))}
            </div>
          )
        ) : (
          <EmptyState
            title="No Matching Buses"
            message="No active buses meet your search or filter requirements. Adjust your filters to see more vehicles."
            onAction={() => {
              setSearch('');
              setSelectedRoute('all');
              setSelectedOccupancy('all');
            }}
          />
        )}
      </section>
    </div>
  );
}
