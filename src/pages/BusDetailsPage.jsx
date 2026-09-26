import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bus, 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Gauge, 
  CheckCircle2, 
  AlertTriangle,
  Radio,
  ChevronRight
} from 'lucide-react';
import { useTransport } from '../context/TransportContext';
import OccupancyIndicator from '../components/OccupancyIndicator';
import RouteProgress from '../components/RouteProgress';
import StatusBadge from '../components/StatusBadge';

export default function BusDetailsPage() {
  const { busId } = useParams();
  const { getBusById, currentStop } = useTransport();

  const bus = getBusById(busId);

  if (!bus) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Bus Not Found</h2>
        <p style={{ margin: '1rem 0' }}>The requested bus details could not be found.</p>
        <Link to="/passenger/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // Calculate stops sequence for RouteProgress
  const stopSequenceList = [
    {
      title: 'Current Location',
      name: bus.currentLocation,
      status: 'current',
      note: `Moving at ${bus.speedKmH} km/h towards next junction`
    },
    {
      title: 'Next Stop',
      name: bus.nextStop,
      status: 'next',
      note: `Estimated in ${Math.max(1, Math.round(bus.etaMinutes / 2))} mins`
    },
    {
      title: "Passenger's Selected Stop",
      name: currentStop?.name || 'Vasai Station',
      status: 'selected',
      note: `ETA ${bus.etaMinutes} mins • Your boarding stop`
    },
    {
      title: 'Following Stop',
      name: bus.targetStop !== currentStop?.name ? bus.targetStop : 'Vasai East Terminal',
      status: 'upcoming',
      note: 'Next scheduled terminal segment'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Breadcrumb & Back Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <Link
          to="/passenger/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
          <Radio size={13} style={{ color: '#10b981' }} />
          <span>Last telemetry update: {bus.lastUpdated}</span>
        </div>
      </div>

      {/* Main Bus Header Card */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        padding: '1.75rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--pastel-blue-bg)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Bus size={32} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h1 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
                  {bus.busNumber}
                </h1>
                <StatusBadge status={bus.status} />
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Route: <strong style={{ color: 'var(--text-primary)' }}>{bus.route}</strong> ({bus.routeCode})
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Arrival</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'flex-end' }}>
              <Clock size={20} style={{ color: 'var(--primary)' }} />
              <strong style={{ fontSize: '1.65rem', color: 'var(--primary)', fontWeight: '800' }}>
                {bus.etaMinutes} min
              </strong>
            </div>
          </div>
        </div>

        {/* Quick Specs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Current Location</span>
            <strong style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{bus.currentLocation}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Next Scheduled Stop</span>
            <strong style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{bus.nextStop}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Assigned Driver</span>
            <strong style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{bus.driverName}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Approx Speed</span>
            <strong style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{bus.speedKmH} km/h</strong>
          </div>
        </div>
      </div>

      {/* Two-Column Layout: Visual Capacity & Route Progression */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Column 1: Detailed Visual Occupancy & Capacity */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
              Capacity &amp; Occupancy Status
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Live seat load distribution calculated from boarding telemetry
            </p>
          </div>

          {/* Visual Indicator with ASCII / Block segment grid */}
          <OccupancyIndicator
            percentage={bus.occupancyPercent}
            availableSeats={bus.availableCapacity}
            totalSeats={bus.totalCapacity}
            showDetailedBlocks={true}
            size="lg"
          />

          {/* Capacity Breakdown Box */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Available Capacity
              </span>
              <strong style={{ 
                fontSize: '1.35rem', 
                color: bus.availableCapacity <= 3 ? '#be123c' : '#047857' 
              }}>
                {bus.availableCapacity} seats
              </strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Total Bus Capacity
              </span>
              <strong style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>
                {bus.totalCapacity} seats
              </strong>
            </div>
          </div>

          {/* Onboard Amenities */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Onboard Amenities &amp; Safety:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {bus.amenities?.map((amenity, i) => (
                <span key={i} className="badge badge-lavender" style={{ fontSize: '0.75rem' }}>
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Route Progression (Current Location -> Next Stop -> Passenger Selected Stop -> Following Stop) */}
        <div className="card">
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
              Route Progression
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Step-by-step corridor journey toward your stop
            </p>
          </div>

          <RouteProgress
            customStops={stopSequenceList}
          />
        </div>
      </div>
    </div>
  );
}
