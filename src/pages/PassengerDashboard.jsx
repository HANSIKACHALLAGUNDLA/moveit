import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bus, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  Info,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { useTransport } from '../context/TransportContext';
import BusStopSelector from '../components/BusStopSelector';
import BusCard from '../components/BusCard';
import ComparisonTable from '../components/ComparisonTable';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';

export default function PassengerDashboard() {
  const { 
    currentStop, 
    upcomingBusesForCurrentStop, 
    buses, 
    routes,
    userCheckedIn 
  } = useTransport();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [selectedOccupancy, setSelectedOccupancy] = useState('all');
  const [sortBy, setSortBy] = useState('eta');
  const [viewScope, setViewScope] = useState('stop'); // 'stop' (buses for this stop) | 'all' (entire network)

  // Determine base list
  const baseBuses = viewScope === 'stop' ? upcomingBusesForCurrentStop : buses;

  // Filter & Search logic
  const filteredBuses = useMemo(() => {
    return baseBuses.filter(bus => {
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || (
        bus.busNumber.toLowerCase().includes(q) ||
        bus.route.toLowerCase().includes(q) ||
        bus.currentLocation.toLowerCase().includes(q) ||
        bus.nextStop.toLowerCase().includes(q)
      );

      // Route match
      const matchRoute = selectedRoute === 'all' || bus.route === selectedRoute;

      // Occupancy match
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
  }, [baseBuses, searchQuery, selectedRoute, selectedOccupancy, sortBy]);

  // Find the less crowded alternative for a smart coordination alert
  const recommendedBus = useMemo(() => {
    // If first bus is crowded (>= 80%), find next bus with < 60%
    if (filteredBuses.length > 1 && filteredBuses[0].occupancyPercent >= 80) {
      const alternative = filteredBuses.find(b => b.occupancyPercent < 70 && b.id !== filteredBuses[0].id);
      return alternative || null;
    }
    return null;
  }, [filteredBuses]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Title & Context Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
          <span>Commuter Portal</span>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Live Bus Coordination</span>
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
          Passenger Dashboard
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Real-time arrival ETA, exact passenger occupancy, and available seat capacity for your stop.
        </p>
      </div>

      {/* SECTION 1: WHERE ARE YOU NOW? (Bus Stop Selector Component) */}
      <section>
        <BusStopSelector />
      </section>

      {/* Smart Coordination Advice Banner */}
      {recommendedBus && (
        <div style={{
          backgroundColor: 'var(--pastel-mint-bg)',
          border: '1.5px solid var(--pastel-mint-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#10b981',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <strong style={{ fontSize: '0.95rem', color: '#065f46' }}>
                Smart Travel Recommendation:
              </strong>
              <p style={{ fontSize: '0.85rem', color: '#047857', marginTop: '1px' }}>
                The approaching bus is nearly full ({filteredBuses[0]?.occupancyPercent}%). 
                <strong> {recommendedBus.busNumber}</strong> arrives {recommendedBus.etaMinutes} min later with <strong>{recommendedBus.availableCapacity} available seats</strong> ({recommendedBus.occupancyPercent}% occupied).
              </p>
            </div>
          </div>

          <Link
            to={`/passenger/bus/${recommendedBus.id}`}
            className="btn btn-sm btn-success"
            style={{ fontWeight: '700' }}
          >
            Check {recommendedBus.busNumber} Details →
          </Link>
        </div>
      )}

      {/* SECTION 2: BUS COMPARISON AREA */}
      <section>
        <ComparisonTable buses={filteredBuses.slice(0, 4)} />
      </section>

      {/* SECTION 3: UPCOMING BUSES SECTION */}
      <section id="upcoming" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: '800' }}>
                Upcoming Buses
              </h2>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                backgroundColor: 'var(--pastel-blue-bg)',
                color: 'var(--primary)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)'
              }}>
                {filteredBuses.length} approaching
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Showing buses connecting to <strong style={{ color: 'var(--text-secondary)' }}>{currentStop?.name}</strong>
            </p>
          </div>

          {/* Toggle between "For This Stop" & "All Network Buses" */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '3px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => setViewScope('stop')}
              type="button"
              style={{
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: viewScope === 'stop' ? '#ffffff' : 'transparent',
                color: viewScope === 'stop' ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: viewScope === 'stop' ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              This Stop ({currentStop?.name})
            </button>
            <button
              onClick={() => setViewScope('all')}
              type="button"
              style={{
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: viewScope === 'all' ? '#ffffff' : 'transparent',
                color: viewScope === 'all' ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: viewScope === 'all' ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              All Corridor Buses
            </button>
          </div>
        </div>

        {/* Search & Filters */}
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
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by bus number or route..."
          />

          <FilterBar
            selectedRoute={selectedRoute}
            onRouteChange={setSelectedRoute}
            routes={routes}
            selectedOccupancy={selectedOccupancy}
            onOccupancyChange={setSelectedOccupancy}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Bus Cards Grid */}
        {filteredBuses.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}>
            {filteredBuses.map(bus => (
              <BusCard
                key={bus.id}
                bus={bus}
                isRecommended={bus.id === recommendedBus?.id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Upcoming Buses Found"
            message="No buses match your active filters or route selection. Try clearing filters to see all available services."
            onAction={() => {
              setSearchQuery('');
              setSelectedRoute('all');
              setSelectedOccupancy('all');
              setViewScope('all');
            }}
          />
        )}
      </section>
    </div>
  );
}
