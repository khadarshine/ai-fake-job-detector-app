import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useApp } from '../context/AppContext';
import { Menu, X, Moon, Sun, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { theme, toggleTheme, apiKey } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Scanner', path: '/detector' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'History', path: '/history' },
    { label: 'FAQ', path: '/faq' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: '16px',
      zIndex: 100,
      margin: '16px 24px 8px 24px',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      padding: '0 24px'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '72px',
        padding: 0
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('/')} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            cursor: 'pointer' 
          }}
        >
          <svg 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(6, 182, 212, 0.25))' }}
          >
            <defs>
              <linearGradient id="logo-icon-gradient-nav" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#logo-icon-gradient-nav)" />
            <circle cx="12" cy="11" r="3" stroke="url(#logo-icon-gradient-nav)" />
            <line x1="14.2" y1="13.2" x2="17" y2="16" stroke="url(#logo-icon-gradient-nav)" />
          </svg>
          <span className="logo-text" style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.25rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 40%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            AI Fake Job Detector
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '24px',
          height: '100%'
        }} className="desktop-only">
          {navItems.map(item => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: isActive ? 'var(--color-primary-light)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* API Key Status Pill */}
          <div 
            onClick={() => handleNav('/settings')}
            className="tooltip-container"
            style={{ cursor: 'pointer' }}
          >
            {apiKey && (
              <span className="badge badge-success" style={{ padding: '6px 12px', gap: '6px' }}>
                <ShieldCheck size={14} />
                <span className="desktop-only" style={{ display: 'inline' }}>Pro Connected</span>
              </span>
            )}
            <span className="tooltip">Configure API settings</span>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="btn-secondary btn-icon-only flex-center"
            style={{ width: '40px', height: '40px', borderRadius: '12px' }}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Settings Shortcut */}
          <button
            onClick={() => handleNav('/settings')}
            className="btn btn-secondary desktop-only"
            style={{ fontSize: '0.85rem', padding: '8px 16px', borderRadius: '12px' }}
          >
            Settings
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-secondary btn-icon-only flex-center mobile-only"
            style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'none' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="animate-fade-in" style={{
          position: 'absolute',
          top: '84px',
          left: 0,
          right: 0,
          background: 'var(--bg-app)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 99
        }}>
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                color: currentPath === item.path ? 'var(--color-primary-light)' : 'var(--text-primary)',
                background: currentPath === item.path ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                width: '100%'
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />
          <button
            onClick={() => handleNav('/settings')}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Configuration
          </button>
        </div>
      )}

      {/* Media Query Injector (to show/hide classes easily) */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-only { display: flex !important; }
        }
        @media (max-width: 768px) {
          .mobile-only { display: flex !important; }
          .desktop-only { display: none !important; }
        }
        @media (max-width: 480px) {
          .logo-text { font-size: 0.95rem !important; }
        }
      `}</style>
    </header>
  );
};
