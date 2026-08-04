import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="container animate-slide-up" style={{ padding: '40px 24px', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.25rem', marginBottom: '8px' }}>Terms of Service</h1>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Effective Date: August 3, 2026</span>

      <div className="glass-panel" style={{ padding: '32px', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7 }}>
        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>1. Disclaimer of Security Liability</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            JobShield is an educational, heuristics-based scanner to assist job hunters in identifying common recruitment fraud signals. AI classifications, risk percentages, and warning flags are generated based on parsed algorithms and LLM evaluations. They do not constitute official legal advice or formal employment clearances. Always conduct independent verification before sharing personal identity files.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>2. Permissible Usage</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            The program is licensed for personal career checking or cybersecurity research purposes. Do not script massive scan lists that violate OpenRouter service guidelines or overload public domain lookup APIs.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>3. API Provider Costs</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            JobShield is a completely free client interface. Any token expenditures or API queries routed through OpenRouter using your custom keys are governed by your individual contract agreements with OpenRouter. We are not liable for charges incurred on user accounts.
          </p>
        </section>
      </div>
    </div>
  );
};
