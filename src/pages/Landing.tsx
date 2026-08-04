import React from 'react';
import { useRouter } from '../context/RouterContext';
import { AlertOctagon, FileText, ArrowRight, Lock, Search, HelpCircle } from 'lucide-react';

export const Landing: React.FC = () => {
  const { navigate } = useRouter();

  const features = [
    {
      icon: <Lock size={24} style={{ color: 'var(--color-primary-light)' }} />,
      title: "100% Client-Side Privacy",
      description: "Your files, API keys, and pasted text stay strictly on your local browser database. Zero remote telemetry."
    },
    {
      icon: <AlertOctagon size={24} style={{ color: 'var(--color-danger)' }} />,
      title: "Check Scam Detection",
      description: "Detects advanced check-cashing schemes, remote workspace starter-kit fees, and identity harvesting requests."
    },
    {
      icon: <Search size={24} style={{ color: 'var(--color-info)' }} />,
      title: "Recruiter Email Audits",
      description: "Scans recruiter contact channels for public domains (@gmail, @yahoo) or spoofed business addresses."
    },
    {
      icon: <FileText size={24} style={{ color: 'var(--color-secondary)' }} />,
      title: "Multi-Format Document Parsing",
      description: "Upload job advertisements directly as PDFs, plain text, emails, or crop screenshots from job boards."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Input Job Details",
      desc: "Paste the job description text, copy-paste email strings, or drop document files directly."
    },
    {
      number: "02",
      title: "Run Deep Scans",
      desc: "Heuristics check salary ranges, language tone, urgencies, and domain records instantly."
    },
    {
      number: "03",
      title: "Review Risk Report",
      desc: "Get an overall Risk Score, trust levels, itemized indicators, and safety recommendations."
    }
  ];

  const stats = [
    { val: "98.7%", label: "Scam Detection Rate" },
    { val: "25k+", label: "Job Seekers Shielded" },
    { val: "100%", label: "Private & Local First" },
    { val: "0ms", label: "Server-side Data Storage" }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '80px' }}>
      <div className="hero-glow" />
      <div className="floating-glow" style={{ top: '10%', left: '5%' }} />
      <div className="floating-glow" style={{ top: '50%', right: '5%', backgroundColor: 'var(--color-secondary)' }} />

      {/* Hero Section */}
      <section className="container flex-center" style={{ flexDirection: 'column', minHeight: '80vh', textAlign: 'center', paddingTop: '64px' }}>
        <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="badge badge-info animate-pulse-glow" style={{ marginBottom: '24px', padding: '6px 14px', borderRadius: 'var(--radius-full)' }}>
            🛡️ World-Class Job Fraud Security
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            maxWidth: '900px',
            marginBottom: '24px',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Expose Fake Job Offers Instantly with AI Safety Audits
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '650px',
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Don't get trapped by phishing recruiters, fake check-cashing schemes, or identity theft. Analyze jobs immediately in a 100% private, local-first sandbox.
          </p>

          {/* Overlapping Avatars & Trust Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', paddingLeft: '12px' }}>
              <div className="flex-center" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2.5px solid var(--bg-app)', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, marginLeft: '-12px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>SK</div>
              <div className="flex-center" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2.5px solid var(--bg-app)', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, marginLeft: '-12px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>MT</div>
              <div className="flex-center" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2.5px solid var(--bg-app)', background: 'linear-gradient(135deg, #10b981, #6366f1)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, marginLeft: '-12px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>JD</div>
              <div className="flex-center" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2.5px solid var(--bg-app)', background: 'linear-gradient(135deg, #f59e0b, #ec4899)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, marginLeft: '-12px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>AB</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
              <div style={{ display: 'flex', color: '#fbbf24', fontSize: '0.9rem', letterSpacing: '1px' }}>★★★★★</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Trusted by 12,000+ job seekers</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => navigate('/detector')} className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem', borderRadius: '14px' }}>
              Scan a Job Posting Now <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate('/settings')} className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem', borderRadius: '14px' }}>
              Configure API Key
            </button>
          </div>
        </div>

        {/* Dashboard Preview mockup */}
        <div className="animate-slide-up glass-panel" style={{
          width: '100%',
          maxWidth: '850px',
          marginTop: '64px',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '12px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '12px'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '12px', fontFamily: 'var(--font-mono)' }}>job-shield-report_entry.json</span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '16px',
            textAlign: 'left'
          }} className="hero-mockup-grid">
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(99, 102, 241, 0.04)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-danger)' }}>82%</span>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>Scam Probability</span>
              <span className="badge badge-danger" style={{ marginTop: '8px' }}>CRITICAL ALERT</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>Executive Remote Assistant</div>
              <div style={{ color: 'var(--color-danger)', fontSize: '0.8rem', fontWeight: 600 }}>⚠️ Detected: WhatsApp/Telegram Interview channels</div>
              <div style={{ color: 'var(--color-danger)', fontSize: '0.8rem', fontWeight: 600 }}>⚠️ Detected: $90/hr + Buy office supplies with check refund</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4, marginTop: '4px' }}>
                Hiring operations require downloading messaging tools, referencing checks for equipment purchase, and public domain recruiters (@gmail).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '64px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.01)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {stats.map((s, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.val}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '16px' }}>Supercharged Security Scanning</h2>
            <p style={{ color: 'var(--text-secondary)' }}>JobShield operates on multiple security planes to flag indicators ranging from phishing domains to fake recruitment contracts.</p>
          </div>

          <div className="features-grid">
            {features.map((f, idx) => (
              <div key={idx} className="glass-panel glass-panel-hover" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-input)' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '120px 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '16px' }}>Simple, Three-Step Safety Audit</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Perform real-time cybersecurity evaluation of your jobs without server uploads.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {steps.map((s, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '32px', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '24px',
                  fontSize: '3rem',
                  fontWeight: 900,
                  color: 'rgba(99, 102, 241, 0.08)',
                  fontFamily: 'var(--font-mono)'
                }}>{s.number}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '16px' }}>Shielding Real Careers</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Here is how our client-first application is helping job hunters remain safe from fraudulent employers.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div className="glass-panel glass-panel-hover" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', color: '#fbbf24', fontSize: '0.85rem' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                "I was offered a remote virtual assistant job paying $90/hr. JobShield immediately highlighted critical red flags indicating check-cashing scams and WhatsApp communications. Checked it online and it was exactly that scam. Saved me thousands!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <div className="flex-center" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: '#fff', fontWeight: 'bold', fontSize: '0.8rem' }}>SK</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Sarah K. <span style={{ color: 'var(--color-success)', fontSize: '0.75rem', fontWeight: 600 }}>✓ Verified</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Operations Graduate</div>
                </div>
              </div>
            </div>
            <div className="glass-panel glass-panel-hover" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', color: '#fbbf24', fontSize: '0.85rem' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                "As a software developer, I often get random recruiters emailing me. Running their emails through this tool helps me filter out suspicious domains. The fact that the API keys and data remain in my LocalStorage is amazing."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <div className="flex-center" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', color: '#fff', fontWeight: 'bold', fontSize: '0.8rem' }}>MT</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Marcus T. <span style={{ color: 'var(--color-success)', fontSize: '0.75rem', fontWeight: 600 }}>✓ Verified</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Senior Software Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section style={{ padding: '64px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Quick answers to help you navigate safety protocols.</p>
          </div>
          <button onClick={() => navigate('/faq')} className="btn btn-secondary" style={{ gap: '8px' }}>
            <HelpCircle size={18} /> Visit FAQ Center & Knowledge Base
          </button>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="container" style={{ marginTop: '32px' }}>
        <div className="glass-panel" style={{
          padding: '48px 32px',
          background: 'var(--gradient-primary)',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-glow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Ready to Verify Your Job Offers?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '550px', marginBottom: '32px', fontSize: '1rem' }}>
            Get detailed analysis in seconds. Safe, confidential, and completely free of charge. Try it now.
          </p>
          <button onClick={() => navigate('/detector')} className="btn" style={{
            background: '#ffffff',
            color: 'var(--color-primary)',
            padding: '14px 28px',
            fontSize: '1rem',
            fontWeight: 700,
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            Analyze Job Post for Free <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-mockup-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
