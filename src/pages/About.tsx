import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Users, Eye, Code } from 'lucide-react';

export const About: React.FC = () => {
  const { navigate } = useRouter();

  const values = [
    {
      icon: <Eye size={20} />,
      title: "Data Autonomy",
      desc: "We build on browser caching models. Your reports and inputs stay securely under your lock and key."
    },
    {
      icon: <Users size={20} />,
      title: "Career Advocacy",
      desc: "Fraud targets vulnerable career searchers. We support entry-level applicants with open, automated security checkers."
    },
    {
      icon: <Code size={20} />,
      title: "Open Code Standards",
      desc: "Built on clean React+Vite+TypeScript blueprints. No bloated modules or commercial telemetry integrations."
    }
  ];

  return (
    <div className="container animate-slide-up" style={{ padding: '40px 24px', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Our Mission</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto' }}>
          Defending career seekers from predatory recruitment rings and digital fraud.
        </p>
      </div>

      {/* Main text block */}
      <section className="glass-panel" style={{ padding: '32px', marginBottom: '40px', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Recruitment Fraud is Spreading</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          In the age of automated hiring portals, phishing campaigns targeting job seekers have spiked by over 300%. Modern scammers construct convincing fake job advertisements on mainstream boards, spoofing corporate recruiters and issuing fake checks or harvesting bank details under the guise of starting kit requirements.
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          JobShield was founded by a coalition of cybersecurity analysts to democratize access to advanced security audits. By combining client-side text parsers, heuristics engines, and customizable LLM frameworks, we empower applicants to analyze jobs before engaging in high-risk intakes.
        </p>
        <button onClick={() => navigate('/detector')} className="btn btn-primary">Start Safety Audit</button>
      </section>

      {/* Value Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginBottom: '64px'
      }} className="about-values-grid">
        {values.map((val, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="flex-center" style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(99, 102, 241, 0.08)',
              color: 'var(--color-primary-light)'
            }}>
              {val.icon}
            </div>
            <h3 style={{ fontSize: '1.05rem' }}>{val.title}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{val.desc}</p>
          </div>
        ))}
      </div>

      {/* Developer credit note */}
      <section className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid var(--color-primary-light)' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Cybersecurity & Dev Credits</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Built with React 19, TypeScript, and clean Vanilla CSS variables. The program enforces strict XSS sanitization, Content Security Policy structures, and zero-telemetry client-side processing parameters.
        </p>
      </section>
      
      <style>{`
        @media (max-width: 600px) {
          .about-values-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
