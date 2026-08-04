import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Heart, ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleScrollToScanner = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('scanner');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('scanner');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const GITHUB_URL = 'https://github.com/aravindsubhashpuvvada-dot/ai-fake-job-detector-app.git';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/aravind-subhash-puvvada-7b3750328?utm_source=share_via&utm_content=profile&utm_medium=member_android';

  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '80px 0 32px 0',
      marginTop: 'auto',
      zIndex: 10
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: '40px',
          marginBottom: '60px'
        }} className="footer-grid">
          
          {/* Column 1: Project Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.4rem',
                letterSpacing: '-0.02em',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                AI Fake Job Detector
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              AI Fake Job Detector is a free and open-source AI-powered cybersecurity tool that helps students, job seekers, and professionals identify fake job offers, phishing recruiters, and recruitment scams before sharing personal information.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              This project is designed to promote cybersecurity awareness and safer online job searching for everyone.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="social-icon">
                <GithubIcon size={20} />
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="social-icon">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Tool */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '24px', color: 'var(--text-primary)', fontWeight: 600 }}>Tool</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: 0, margin: 0, listStyle: 'none' }}>
              <li><button className="footer-link" onClick={() => navigate('/')}>Home</button></li>
              <li><button className="footer-link" onClick={handleScrollToScanner}>Start Free Scan</button></li>
              <li><button className="footer-link" onClick={() => navigate('/')}>How It Works</button></li>
              <li><button className="footer-link" onClick={() => navigate('/')}>FAQ</button></li>
              <li><button className="footer-link" onClick={() => navigate('/')}>Open Source</button></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '24px', color: 'var(--text-primary)', fontWeight: 600 }}>Resources</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: 0, margin: 0, listStyle: 'none' }}>
              <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub Repository</a></li>
              <li><a href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer" className="footer-link">Report an Issue</a></li>
              <li><a href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer" className="footer-link">Feature Requests</a></li>
              <li><button className="footer-link" style={{ cursor: 'default', opacity: 0.7 }}>Documentation</button></li>
              <li><button className="footer-link" onClick={() => navigate('/privacy')}>Privacy Policy</button></li>
              <li><button className="footer-link" onClick={() => navigate('/terms')}>Terms of Service</button></li>
            </ul>
          </div>

          {/* Column 4: Developer */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '24px', color: 'var(--text-primary)', fontWeight: 600 }}>Developer</h4>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Developed by</p>
              <h5 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>Aravind Subhash Puvvada</h5>
              <ul style={{ padding: 0, margin: '0 0 20px 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                  B.Tech Engineering Student
                </li>
                <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                  Open Source Contributor
                </li>
                <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                  Cybersecurity & AI Enthusiast
                </li>
              </ul>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', borderRadius: '10px', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.1)' }} className="linkedin-btn">
                View LinkedIn Profile <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.9rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; 2026 AI Fake Job Detector. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Built with <Heart size={14} style={{ color: '#ef4444', fill: '#ef4444' }} /> for students, job seekers, and the open-source community.
          </div>
        </div>
      </div>
      <style>{`
        .footer-grid {
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .footer-link {
          background: none;
          border: none;
          padding: 0;
          color: var(--text-secondary);
          font-size: 0.95rem;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: var(--color-primary-light);
        }
        
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          background: rgba(255,255,255,0.1);
          color: var(--text-primary);
          transform: translateY(-2px);
        }
        
        .linkedin-btn:hover {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }
      `}</style>
    </footer>
  );
};
