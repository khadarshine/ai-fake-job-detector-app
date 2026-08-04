import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-color)',
      padding: '56px 0 32px 0',
      marginTop: 'auto',
      zIndex: 10
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 2', maxWidth: '350px' }} className="footer-brand-col">
            <div 
              onClick={() => navigate('/')} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                cursor: 'pointer',
                marginBottom: '16px'
              }}
            >
              <svg 
                width="30" 
                height="30" 
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(6, 182, 212, 0.25))' }}
              >
                <defs>
                  <linearGradient id="logo-icon-gradient-foot" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#logo-icon-gradient-foot)" />
                <circle cx="12" cy="11" r="3" stroke="url(#logo-icon-gradient-foot)" />
                <line x1="14.2" y1="13.2" x2="17" y2="16" stroke="url(#logo-icon-gradient-foot)" />
              </svg>
              <span className="logo-text" style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 40%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                AI Fake Job Detector
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Shielding career seekers from recruitment scams. JobShield runs advanced heuristics and LLM semantic scans client-side to verify employment opportunities instantly.
            </p>
          </div>

          {/* Links: Platform */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-primary)' }}>App Features</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><button onClick={() => navigate('/detector')} style={{ cursor: 'pointer' }}>Detector Scanner</button></li>
              <li><button onClick={() => navigate('/analytics')} style={{ cursor: 'pointer' }}>Security Analytics</button></li>
              <li><button onClick={() => navigate('/history')} style={{ cursor: 'pointer' }}>Scan Archive</button></li>
            </ul>
          </div>

          {/* Links: Company */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-primary)' }}>About</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><button onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>Our Mission</button></li>
              <li><button onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Submit Ticket</button></li>
              <li><button onClick={() => navigate('/faq')} style={{ cursor: 'pointer' }}>FAQ Center</button></li>
            </ul>
          </div>

          {/* Links: Compliance */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Compliance</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><button onClick={() => navigate('/privacy')} style={{ cursor: 'pointer' }}>Privacy Policy</button></li>
              <li><button onClick={() => navigate('/terms')} style={{ cursor: 'pointer' }}>Terms of Service</button></li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} JobShield. Built for cybersecurity awareness. All analyses computed locally.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Built with <Heart size={12} style={{ color: 'var(--color-danger)' }} /> for job seekers.
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .footer-brand-col {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 480px) {
          .logo-text { font-size: 0.95rem !important; }
        }
      `}</style>
    </footer>
  );
};
