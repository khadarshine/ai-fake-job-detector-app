import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Send, CheckCircle, Mail, MapPin, Globe } from 'lucide-react';

export const Contact: React.FC = () => {
  const { navigate } = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all required fields.');
      return;
    }
    // Simulate API request
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container flex-center animate-slide-up" style={{ minHeight: '60vh', padding: '48px 24px' }}>
        <div className="glass-panel" style={{
          width: '100%',
          maxWidth: '500px',
          padding: '48px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div className="flex-center animate-pulse-glow" style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)'
          }}>
            <CheckCircle size={36} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Ticket Submitted Successfully</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Thank you for reaching out. A security representative will review your inquiry. Since this app runs locally, mock response threads will populate in your browser simulation if relevant.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '12px' }}>
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-slide-up" style={{ padding: '40px 24px', maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '8px' }}>Get in Touch</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Submit job threat reports, suggest heuristic checks, or ask system questions.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr 1.2fr',
        gap: '32px'
      }} className="contact-grid">
        
        {/* Contact Form */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                className="form-input"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane.doe@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Report a recruitment scam campaign"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Inquiry *</label>
              <textarea
                className="form-input"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Write your security question or paste details here..."
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', gap: '8px', borderRadius: '10px' }}>
              <Send size={16} /> Submit Support Request
            </button>
          </form>
        </div>

        {/* Corporate Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>Support Channels</h3>
            
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
              <Mail size={18} style={{ color: 'var(--color-primary-light)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Email support</div>
                <div style={{ color: 'var(--text-secondary)' }}>safety@jobshield.internal</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
              <MapPin size={18} style={{ color: 'var(--color-primary-light)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Main Office</div>
                <div style={{ color: 'var(--text-secondary)' }}>100 Localhost Ave, Sandbox, CA</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
              <Globe size={18} style={{ color: 'var(--color-primary-light)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>GitHub Repo</div>
                <div style={{ color: 'var(--text-secondary)' }}>github.com/jobshield/ai-detector</div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', fontSize: '0.8rem', lineHeight: 1.5 }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Secure Encryption</h4>
            <p style={{ color: 'var(--text-secondary)' }}>
              Inquiries sent through public networks are processed securely. We encourage applicants to never paste actual passports or banking routing digits into any public contact forms.
            </p>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
