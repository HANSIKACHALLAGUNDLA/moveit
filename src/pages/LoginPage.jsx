import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bus, Lock, Mail, ArrowLeft, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useTransport } from '../context/TransportContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUserRole, setUserEmail } = useTransport();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('passenger'); // 'passenger' | 'authority'

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserRole(activeTab);
    if (email) setUserEmail(email);

    if (activeTab === 'passenger') {
      navigate('/passenger/dashboard');
    } else {
      navigate('/authority/dashboard');
    }
  };

  const handleQuickPassenger = () => {
    setUserRole('passenger');
    setUserEmail('commuter@moveit.local');
    navigate('/passenger/dashboard');
  };

  const handleQuickAuthority = () => {
    setUserRole('authority');
    setUserEmail('operator@transport.gov.in');
    navigate('/authority/dashboard');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '2.25rem 2rem',
        boxShadow: 'var(--shadow-modal)'
      }}>
        {/* Back Link */}
        <div style={{ marginBottom: '1.25rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.825rem',
              color: 'var(--text-muted)',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--pastel-blue-bg)',
            color: 'var(--primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem'
          }}>
            <Bus size={26} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Welcome to MOVEIT
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Smart Public Bus Transport Coordination System
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: '#f1f5f9',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('passenger')}
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              backgroundColor: activeTab === 'passenger' ? '#ffffff' : 'transparent',
              color: activeTab === 'passenger' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: activeTab === 'passenger' ? 'var(--shadow-sm)' : 'none',
              transition: 'var(--transition)'
            }}
          >
            Passenger
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('authority')}
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              backgroundColor: activeTab === 'authority' ? '#ffffff' : 'transparent',
              color: activeTab === 'authority' ? 'var(--pastel-lavender-text)' : 'var(--text-muted)',
              boxShadow: activeTab === 'authority' ? 'var(--shadow-sm)' : 'none',
              transition: 'var(--transition)'
            }}
          >
            Transport Authority
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={16} />
              </div>
              <input
                type="email"
                className="input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder={activeTab === 'passenger' ? 'passenger@example.com' : 'officer@transport.gov.in'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={16} />
              </div>
              <input
                type="password"
                className="input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
          >
            Login to MOVEIT
          </button>
        </form>

        {/* Direct Portal Access */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', display: 'block' }}>
            Direct Portal Access
          </span>

          <button
            type="button"
            onClick={handleQuickPassenger}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'space-between' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={15} style={{ color: 'var(--primary)' }} />
              Continue as Passenger
            </span>
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            onClick={handleQuickAuthority}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'space-between' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={15} style={{ color: 'var(--pastel-lavender-text)' }} />
              Continue as Transport Authority
            </span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
