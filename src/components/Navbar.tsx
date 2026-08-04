import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useApp } from '../context/AppContext';
import { Menu, X, Moon, Sun, ShieldCheck, Settings, Home, Shield, BarChart2, History, HelpCircle } from 'lucide-react';

const GithubIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { theme, toggleTheme, apiKey } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Scanner', path: '/#scanner', icon: Shield },
    { label: 'Analytics', path: '/analytics', icon: BarChart2 },
    { label: 'History', path: '/history', icon: History },
    { label: 'FAQ', path: '/faq', icon: HelpCircle },
  ];

  const handleNav = (path: string) => {
    if (path.startsWith('/#')) {
      const targetId = path.substring(2);
      if (currentPath !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
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
            style={{ filter: 'drop-shadow(0 2px 8px rgba(99, 102, 241, 0.25))' }}
          >
            <defs>
              <linearGradient id="logo-icon-gradient-nav" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
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
            background: 'var(--gradient-primary)',
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
            const Icon = item.icon;
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
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <Icon size={16} />
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

          {/* Github Link */}
          <button
            onClick={() => window.open('https://github.com/aravindsubhashpuvvada-dot/ai-fake-job-detector-app.git', '_blank')}
            className="btn-secondary btn-icon-only flex-center glass-panel-hover"
            style={{ width: '40px', height: '40px', borderRadius: '12px' }}
            title="View Open Source Project"
          >
            <GithubIcon size={18} />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="btn-secondary btn-icon-only flex-center glass-panel-hover"
            style={{ width: '40px', height: '40px', borderRadius: '12px' }}
            aria-label="Toggle Theme"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Settings Shortcut */}
          <button
            onClick={() => handleNav('/settings')}
            className="btn-secondary btn-icon-only flex-center desktop-only glass-panel-hover"
            style={{ width: '40px', height: '40px', borderRadius: '12px' }}
            title="Settings"
          >
            <Settings size={18} />
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
          {navItems.map(item => {
            const Icon = item.icon;
            return (
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
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
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
