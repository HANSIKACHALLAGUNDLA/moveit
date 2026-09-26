import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bus, 
  Bell, 
  User, 
  MapPin, 
  ShieldCheck, 
  Menu, 
  X, 
  SlidersHorizontal,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useTransport } from '../context/TransportContext';

export default function Navbar() {
  const { userRole, setUserRole, notifications, currentStop } = useTransport();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const isPassenger = userRole === 'passenger';
  const isAuthority = userRole === 'authority';

  // Quick switch role
  const handleSwitchRole = (newRole) => {
    setUserRole(newRole);
    setMobileMenuOpen(false);
    if (newRole === 'passenger') {
      navigate('/passenger/dashboard');
    } else {
      navigate('/authority/dashboard');
    }
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand Logo & Name */}
        <Link 
          to="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            textDecoration: 'none'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)'
          }}>
            <Bus size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: '800', 
                letterSpacing: '-0.03em', 
                color: 'var(--text-primary)' 
              }}>
                MOVEIT
              </span>
              <span style={{
                fontSize: '0.675rem',
                fontWeight: '700',
                backgroundColor: 'var(--pastel-blue-bg)',
                color: 'var(--primary)',
                padding: '1px 6px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--pastel-blue-border)'
              }}>
                LIVE NETWORK
              </span>
            </div>
            <p style={{ 
              fontSize: '0.7rem', 
              color: 'var(--text-muted)', 
              fontWeight: '500',
              lineHeight: 1,
              marginTop: '1px'
            }}>
              Smart Bus Coordination
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hide-on-mobile">
          {/* Passenger Links */}
          <Link
            to="/"
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: location.pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)',
              backgroundColor: location.pathname === '/' ? 'var(--pastel-blue-bg)' : 'transparent',
              textDecoration: 'none'
            }}
          >
            Home
          </Link>

          <Link
            to="/passenger/dashboard"
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: location.pathname === '/passenger/dashboard' ? 'var(--primary)' : 'var(--text-secondary)',
              backgroundColor: location.pathname === '/passenger/dashboard' ? 'var(--pastel-blue-bg)' : 'transparent',
              textDecoration: 'none'
            }}
          >
            Passenger Dashboard
          </Link>

          <Link
            to="/passenger/stops"
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: location.pathname === '/passenger/stops' ? 'var(--primary)' : 'var(--text-secondary)',
              backgroundColor: location.pathname === '/passenger/stops' ? 'var(--pastel-blue-bg)' : 'transparent',
              textDecoration: 'none'
            }}
          >
            Bus Stops
          </Link>

          <Link
            to="/authority/dashboard"
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: location.pathname.startsWith('/authority') ? 'var(--primary)' : 'var(--text-secondary)',
              backgroundColor: location.pathname.startsWith('/authority') ? 'var(--pastel-lavender-bg)' : 'transparent',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <ShieldCheck size={16} />
            Authority View
          </Link>
        </nav>

        {/* Right Action Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Role Pill Switcher */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '3px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)'
          }} className="hide-on-mobile">
            <button
              onClick={() => handleSwitchRole('passenger')}
              type="button"
              style={{
                border: 'none',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.775rem',
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: isPassenger ? '#ffffff' : 'transparent',
                color: isPassenger ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: isPassenger ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              Passenger
            </button>
            <button
              onClick={() => handleSwitchRole('authority')}
              type="button"
              style={{
                border: 'none',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.775rem',
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: isAuthority ? '#ffffff' : 'transparent',
                color: isAuthority ? 'var(--pastel-lavender-text)' : 'var(--text-muted)',
                boxShadow: isAuthority ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              Authority
            </button>
          </div>

          {/* Notifications Icon & Drawer */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              type="button"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: notificationsOpen ? '#f1f5f9' : '#ffffff',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              title="Notifications"
            >
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#ef4444'
              }} />
            </button>

            {/* Notification Dropdown Panel */}
            {notificationsOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '120%',
                width: '320px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-modal)',
                zIndex: 60,
                padding: '0.75rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '0.85rem' }}>Coordination Alerts</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setNotificationsOpen(false)}>
                    Close
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{
                      padding: '0.5rem',
                      backgroundColor: n.type === 'warning' ? '#fff7ed' : '#eff6ff',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.785rem'
                    }}>
                      <div style={{ fontWeight: '700', color: n.type === 'warning' ? '#c2410c' : 'var(--primary)' }}>
                        {n.title}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {n.message}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {n.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Login / Profile button */}
          <Link
            to="/login"
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <User size={15} />
            <span className="hide-on-mobile">Login / Switch</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="show-on-mobile-flex"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '4px'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--border-color)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              Select Active Role:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleSwitchRole('passenger')}
                className={isPassenger ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
                style={{ flex: 1 }}
              >
                Passenger Mode
              </button>
              <button
                onClick={() => handleSwitchRole('authority')}
                className={isAuthority ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
                style={{ flex: 1 }}
              >
                Authority Mode
              </button>
            </div>
          </div>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.5rem 0', fontWeight: '600', color: 'var(--text-primary)' }}
          >
            Home / Landing Page
          </Link>
          <Link
            to="/passenger/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.5rem 0', fontWeight: '600', color: 'var(--text-primary)' }}
          >
            Passenger Dashboard
          </Link>
          <Link
            to="/passenger/stops"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.5rem 0', fontWeight: '600', color: 'var(--text-primary)' }}
          >
            Select Bus Stop
          </Link>
          <Link
            to="/authority/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.5rem 0', fontWeight: '600', color: 'var(--primary)' }}
          >
            Authority Dashboard
          </Link>
          <Link
            to="/authority/monitoring"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.5rem 0', fontWeight: '600', color: 'var(--primary)' }}
          >
            Bus Monitoring Page
          </Link>
          <Link
            to="/authority/demand"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.5rem 0', fontWeight: '600', color: 'var(--primary)' }}
          >
            Passenger Demand Analysis
          </Link>
        </div>
      )}
    </header>
  );
}
