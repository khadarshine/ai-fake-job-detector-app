import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What exactly is an employment scam / fake job scam?",
      a: "Employment fraud is a type of scam where bad actors create fake job postings (often impersonating real companies or recruiting networks) to steal sensitive identity files (like SSN, Driver's License scans) or harvest financial details. Other common variations include check-cashing scams, where they send you a fake bank check, tell you to deposit it, and command you to send money to their authorized vendors for home-office software."
    },
    {
      q: "How does the safety evaluation algorithm verify jobs?",
      a: "JobShield runs two evaluation sweeps. First, our offline heuristics module scans text strings for pattern anchors (Gmail domains, Telegram handle tags, WhatsApp instructions, check reimbursement phrasing, and salary inflated rates). Second, if you provide an OpenRouter API key, we format the data through a system safety prompt to a large language model (like Gemini or Llama) which returns a segmented JSON breakdown evaluating domain registries, professionalism levels, and security anomalies."
    },
    {
      q: "Is my personal data uploaded or processed on third-party servers?",
      a: "Absolutely not. JobShield operates on a local-first philosophy. All text files, PDF drops, URL targets, and history reports remain in your browser's IndexedDB/LocalStorage. If you configure a custom API key, only the job description is routed directly to OpenRouter servers for processing. No remote database or database administrator has access to your inputs."
    },
    {
      q: "How do I obtain a secure OpenRouter API Key?",
      a: "You can sign up for a free account at https://openrouter.ai. Once logged in, go to the Keys page and generate a standard API token. You can configure spending limits (or use free models like Gemini 2.5 Flash Free or Llama 3 8B Free which cost $0 per query). Copy the token, and paste it into the Settings tab on this application."
    },
    {
      q: "What should I do if a report flags a job as 'High Risk'?",
      a: "If a job has a high threat index, do not submit personal details or deposit checks. We recommend verifying the posting by visiting the company's official corporate portal directly (do not use links provided in the email). Check the recruiter's email domain closely (does it match the corporate address? is it a Gmail account?). Reach out to verified employees at the organization via LinkedIn to double-check their recruiting channels."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container animate-slide-up" style={{ padding: '40px 24px', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '8px' }}>Security Knowledge Base</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Frequently Asked Questions on recruitment safety checks and algorithms.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: isOpen ? '1px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                transition: 'all var(--transition-normal)'
              }}
            >
              {/* Question Click Header */}
              <div
                onClick={() => toggleAccordion(idx)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  backgroundColor: isOpen ? 'rgba(99, 102, 241, 0.02)' : 'transparent',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <HelpCircle size={18} style={{ color: isOpen ? 'var(--color-primary-light)' : 'var(--text-muted)' }} />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {faq.q}
                  </span>
                </div>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>

              {/* Answer Content Panel */}
              {isOpen && (
                <div style={{
                  padding: '0 24px 24px 24px',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  borderTop: '1px dashed var(--border-color)',
                  paddingTop: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.005)'
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
