import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="container animate-slide-up" style={{ padding: '40px 24px', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.25rem', marginBottom: '8px' }}>Privacy Policy</h1>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Effective Date: August 3, 2026</span>

      <div className="glass-panel" style={{ padding: '32px', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7 }}>
        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>1. Client-Side Data Isolation</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            JobShield is engineered to guarantee complete privacy. Unlike traditional web dashboards, our architecture processes scanning requests, documents, history folders, and settings variables strictly inside your local browser storage context (LocalStorage and IndexedDB). No remote database clusters are connected to our infrastructure.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>2. API Key Routing</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            If you provide an optional OpenRouter API Key to enable advanced LLM scans, the key is securely saved in your browser's private local state. When running scans, the input text is routed directly from your device client to the OpenRouter endpoint. Your key is never shared, proxy-cached, or transmitted to any secondary servers.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>3. Telemetry and Analytics</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            We do not host trackers, conversion scripts, or paid analytical pixels. The application doesn't record tracking cookies. Your cybersecurity safety audits are entirely anonymous.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>4. User Data Controls</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            You maintain absolute control over your scan history. You can purge all archives instantly using the Settings panel, or download a full JSON copy of the local database to migrate your logs to another browser sandboxed instance.
          </p>
        </section>
      </div>
    </div>
  );
};
