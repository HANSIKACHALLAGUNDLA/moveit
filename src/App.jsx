import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PassengerDashboard from './pages/PassengerDashboard';
import BusStopSelectionPage from './pages/BusStopSelectionPage';
import BusDetailsPage from './pages/BusDetailsPage';
import AuthorityDashboard from './pages/AuthorityDashboard';
import BusMonitoringPage from './pages/BusMonitoringPage';
import PassengerDemandPage from './pages/PassengerDemandPage';\nimport LiveMapPage from './pages/LiveMapPage';\nimport FindBusPage from './pages/FindBusPage';\nimport InsideBusPage from './pages/InsideBusPage';\nimport NextStopPage from './pages/NextStopPage';\nimport TripCompletedPage from './pages/TripCompletedPage';\nimport MyTripsPage from './pages/MyTripsPage';

// Authority Layout Wrapper with Sidebar
function AuthorityLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 65px)' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '1.75rem', overflowY: 'auto', maxWidth: '1200px' }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isAuthorityRoute = location.pathname.startsWith('/authority');
  const isPlainAuth = location.pathname === '/login';

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {/* Page 1: Landing Page */}
          <Route path="/" element={<div className="main-content"><LandingPage /></div>} />

          {/* Page 2: Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Page 3: Passenger Dashboard */}
          <Route path="/passenger/dashboard" element={<div className="main-content"><PassengerDashboard /></div>} />

          {/* Page 4: Bus Stop Selection */}
          <Route path="/passenger/stops" element={<div className="main-content"><BusStopSelectionPage /></div>} />

          {/* Page 5: Bus Details Page */}
          <Route path="/passenger/bus/:busId" element={<div className="main-content"><BusDetailsPage /></div>} />

          {/* Premium passenger journey screens */}
          <Route path="/passenger/live-map" element={<LiveMapPage />} />
          <Route path="/passenger/find-bus" element={<FindBusPage />} />
          <Route path="/passenger/inside-bus/:busId" element={<InsideBusPage />} />
          <Route path="/passenger/next-stop/:busId" element={<NextStopPage />} />
          <Route path="/passenger/check-out" element={<TripCompletedPage />} />
          <Route path="/passenger/my-trips" element={<MyTripsPage />} />

          {/* Page 6: Transport Authority Dashboard */}
          <Route path="/authority/dashboard" element={
            <AuthorityLayout>
              <AuthorityDashboard />
            </AuthorityLayout>
          } />

          {/* Page 7: Bus Monitoring Page */}
          <Route path="/authority/monitoring" element={
            <AuthorityLayout>
              <BusMonitoringPage />
            </AuthorityLayout>
          } />

          {/* Page 8: Passenger Demand Page */}
          <Route path="/authority/demand" element={
            <AuthorityLayout>
              <PassengerDemandPage />
            </AuthorityLayout>
          } />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Modern Minimal Footer */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-color)',
        padding: '1.25rem 1.5rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>MOVEIT</strong> — Smart Public Bus Transport Coordination &amp; Capacity Management System
          </div>
          <div>
            Smart Public Transit Fleet Coordination &amp; Real-Time Capacity Platform
          </div>
        </div>
      </footer>
    </div>
  );
}
