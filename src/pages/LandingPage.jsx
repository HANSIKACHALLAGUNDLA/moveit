import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bus, 
  Users, 
  Clock, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone,
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';
import { useTransport } from '../context/TransportContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setUserRole } = useTransport();

  const handleSelectRole = (role) => {
    setUserRole(role);
    if (role === 'passenger') {
      navigate('/passenger/dashboard');
    } else {
      navigate('/authority/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        {/* Soft Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--pastel-blue-bg)',
          color: 'var(--primary)',
          border: '1px solid var(--pastel-blue-border)',
          padding: '0.35rem 0.95rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.85rem',
          fontWeight: '700',
          marginBottom: '1.25rem'
        }}>
          <Sparkles size={15} />
          Public Bus Transport Technology Platform
        </div>

        {/* Title */}
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', 
          fontWeight: '800', 
          color: 'var(--text-primary)',
          letterSpacing: '-0.04em',
          lineHeight: 1.15,
          marginBottom: '0.75rem'
        }}>
          MOVEIT
        </h1>

        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          fontWeight: '600',
          color: 'var(--primary)',
          maxWidth: '720px',
          margin: '0 auto 1.25rem auto',
          lineHeight: 1.35
        }}>
          Smart Public Bus Transport Coordination &amp; Capacity Management System
        </p>

        {/* Tagline */}
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: '500',
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
          marginBottom: '1.75rem'
        }}>
          “Better Information. Better Decisions. Better Bus Coordination.”
        </h3>

        {/* Problem Explanation */}
        <p style={{
          maxWidth: '680px',
          margin: '0 auto 2.5rem auto',
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6
        }}>
          Passengers need better information about bus arrival time, occupancy, and available capacity, while transport operators need real-time visibility into passenger demand at every bus stop.
        </p>

        {/* Two Main Role Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => handleSelectRole('passenger')}
            className="btn btn-primary btn-lg"
            style={{ minWidth: '200px' }}
          >
            <Smartphone size={20} />
            Continue as Passenger
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => handleSelectRole('authority')}
            className="btn btn-secondary btn-lg"
            style={{ 
              minWidth: '220px', 
              borderColor: 'var(--pastel-lavender-border)',
              backgroundColor: 'var(--pastel-lavender-bg)',
              color: 'var(--pastel-lavender-text)'
            }}
          >
            <ShieldCheck size={20} />
            Transport Authority
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Visual Representation Section: Passenger Demand -> Bus Information -> Transport Coordination */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            letterSpacing: '0.06em', 
            color: 'var(--text-muted)' 
          }}>
            How MOVEIT Works
          </span>
          <h2 style={{ fontSize: '1.65rem', marginTop: '0.25rem' }}>
            The 3-Step Coordination Loop
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          position: 'relative'
        }}>
          {/* Step 1: Passenger Demand */}
          <div className="card" style={{
            borderTop: '4px solid #3b82f6',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--pastel-blue-bg)',
                color: 'var(--pastel-blue-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Users size={24} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>
                Step 1
              </span>
              <h3 style={{ fontSize: '1.25rem', margin: '0.25rem 0 0.5rem 0' }}>
                Passenger Demand
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Commuters signal their stop presence with a single tap (<em>“I’m at this bus stop”</em>). Real waiting numbers are captured without complex tracking.
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong>Result:</strong> Accurate passenger counts at Virar, Vasai &amp; Nalasopara stops.
            </div>
          </div>

          {/* Step 2: Bus Information */}
          <div className="card" style={{
            borderTop: '4px solid #10b981',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--pastel-mint-bg)',
                color: 'var(--pastel-mint-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Bus size={24} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#059669', textTransform: 'uppercase' }}>
                Step 2
              </span>
              <h3 style={{ fontSize: '1.25rem', margin: '0.25rem 0 0.5rem 0' }}>
                Bus Information
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Passengers see exact ETA, precise occupancy percentage (e.g. 94%, 42%), and exact available capacity before the bus arrives.
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong>Result:</strong> Passengers choose less crowded buses instead of forcing onto full ones.
            </div>
          </div>

          {/* Step 3: Transport Coordination */}
          <div className="card" style={{
            borderTop: '4px solid #8b5cf6',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--pastel-lavender-bg)',
                color: 'var(--pastel-lavender-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <BarChart3 size={24} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#6d28d9', textTransform: 'uppercase' }}>
                Step 3
              </span>
              <h3 style={{ fontSize: '1.25rem', margin: '0.25rem 0 0.5rem 0' }}>
                Transport Coordination
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Authorities monitor crowded corridors, dispatch backup feeder buses, and balance fleet frequency using live passenger demand insights.
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong>Result:</strong> Reduced passenger wait times &amp; balanced bus fleet load.
            </div>
          </div>
        </div>
      </section>

      {/* Key Problems MOVEIT Solves */}
      <section className="card" style={{ padding: '2rem', backgroundColor: '#ffffff' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', textAlign: 'center' }}>
          Solving The 4 Core Commuter Problems
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle2 size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.95rem' }}>1. Exact Arrival Time</strong>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Accurate ETAs for approaching buses so passengers never wait blindly.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle2 size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.95rem' }}>2. Bus Occupancy %</strong>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Precise percentage values (e.g. 42%, 68%, 94%) instead of vague labels.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle2 size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.95rem' }}>3. Available Capacity</strong>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Exact remaining seats displayed so passengers know if they will fit.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle2 size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.95rem' }}>4. Less-Crowded Options</strong>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Instant side-by-side comparison reveals if the next bus is much emptier.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
