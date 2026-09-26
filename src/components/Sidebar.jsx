import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bus, 
  Users, 
  ArrowLeft, 
  AlertCircle,
  BarChart3,
  Layers
} from 'lucide-react';
import { useTransport } from '../context/TransportContext';

export default function Sidebar() {
  const { authoritySummary, setUserRole } = useTransport();

  const navItems = [
    {
      to: '/authority/dashboard',
      label: 'Authority Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/authority/monitoring',
      label: 'Bus Monitoring',
      icon: Bus,
      badge: `${authoritySummary.activeBuses} Live`
    },
    {
      to: '/authority/demand',
      label: 'Passenger Demand',
      icon: Users,
      badge: `${authoritySummary.waitingPassengers} Waiting`
    }
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid var(--border-color)',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 'calc(100vh - 65px)'
    }} className="sidebar-container">
      {/* Top Section */}
      <div>
        <div style={{
          padding: '0.65rem 0.85rem',
          backgroundColor: 'var(--pastel-lavender-bg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--pastel-lavender-border)',
          marginBottom: '1.5rem'
        }}>
          <span style={{ 
            fontSize: '0.725rem', 
            textTransform: 'uppercase', 
            fontWeight: '800', 
            letterSpacing: '0.05em', 
            color: 'var(--pastel-lavender-text)' 
          }}>
            Control Center
          </span>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
            Transport Authority
          </h4>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map(item => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/authority/dashboard'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--pastel-blue-bg)' : 'transparent',
                  border: isActive ? '1px solid var(--pastel-blue-border)' : '1px solid transparent',
                  transition: 'var(--transition)'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#e2e8f0',
                    color: 'var(--text-secondary)',
                    fontWeight: '700'
                  }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {/* Overcrowding Alert Warning pill */}
        <div style={{
          padding: '0.75rem',
          backgroundColor: 'var(--pastel-peach-bg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--pastel-peach-border)',
          fontSize: '0.775rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#c2410c', fontWeight: '700', marginBottom: '2px' }}>
            <AlertCircle size={14} />
            Coordination Status
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
            {authoritySummary.crowdedBuses} buses near full. Capacity dispatch recommended.
          </p>
        </div>

        {/* Switch back to Passenger View */}
        <Link
          to="/passenger/dashboard"
          onClick={() => setUserRole('passenger')}
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <ArrowLeft size={14} />
          Switch to Passenger View
        </Link>
      </div>
    </aside>
  );
}
