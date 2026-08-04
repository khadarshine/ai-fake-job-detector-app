import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Lock, EyeOff, Zap, FileText, Mail, Globe, Link, MessageSquare, CreditCard, ShieldAlert, FileUp, Upload, Cpu, Shield, Activity, FileCheck, UserCheck, Home, Wallet, Laptop, Smartphone, MailWarning, UserX, AlertTriangle, Bitcoin, Search, MailCheck, Layers, Heart, ChevronDown } from 'lucide-react';
import { Detector } from './Detector';

const GithubIcon = ({ size = 24, className, style }: { size?: number, className?: string, style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

export const Landing: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleStartScan = () => {
    const el = document.getElementById('scanner');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDemo = () => {
    const el = document.getElementById('scanner');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      window.dispatchEvent(new Event('trigger-demo-scan'));
    }, 500);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '80px', backgroundColor: 'var(--bg-app)' }}>
      {/* Premium Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)', animation: 'pulse-bg 8s infinite alternate' }} />
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)', animation: 'pulse-bg 10s infinite alternate-reverse' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(100px)' }} />
      </div>

      <section className="container" style={{ minHeight: '90vh', paddingTop: '80px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', gap: '56px' }}>
          
          {/* Top Section: Premium Product Intro */}
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            
            {/* Glowing Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px',
              borderRadius: '999px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
              marginBottom: '32px', boxShadow: '0 0 20px rgba(99,102,241,0.1)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8', boxShadow: '0 0 10px #818cf8', animation: 'pulse-dot 2s infinite' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#818cf8', letterSpacing: '0.5px' }}>100% Free • Open Source • Privacy First</span>
            </div>

            {/* Title with multi-stop animated gradient */}
            <h1 className="hero-title" style={{
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              maxWidth: '1000px'
            }}>
              AI Fake Job Detector
            </h1>
            
            <h2 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.8rem)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '32px',
              maxWidth: '800px',
              lineHeight: 1.4
            }}>
              Detect Fake Job Offers Before They Scam You
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '850px', marginBottom: '48px' }}>
              <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.6, textAlign: 'justify' }}>
                This tool is completely free to use, privacy-first, and designed to help students, professionals, and job seekers stay safe online.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'justify' }}>
                Analyze job advertisements, recruiter emails, company websites, job URLs, PDF documents, and recruitment communications using Artificial Intelligence and cybersecurity analysis.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'justify' }}>
                Detect fake recruiters, phishing attempts, identity theft scams, advance payment fraud, fake interview invitations, check-cashing scams, and other recruitment fraud before sharing your personal information.
              </p>
            </div>

            {/* Premium Trust Indicators */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '48px', maxWidth: '1000px' }}>
              {[
                { icon: ShieldCheck, text: '100% Free Forever', color: '#10b981' },
                { icon: GithubIcon, text: 'Open Source Project', color: '#f8fafc' },
                { icon: Lock, text: 'No Registration Required', color: '#6366f1' },
                { icon: EyeOff, text: 'Privacy First', color: '#a855f7' },
                { icon: Zap, text: 'AI Powered', color: '#f59e0b' }
              ].map((item, i) => (
                <div key={i} className="trust-pill">
                  <item.icon size={16} style={{ color: item.color }} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Premium Action Buttons */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={handleStartScan} className="premium-btn primary">
                <span>Start Free Scan</span>
                <ArrowRight size={20} className="btn-icon" />
              </button>
              <button onClick={handleDemo} className="premium-btn secondary">
                <span>Try Sample Job Post</span>
              </button>
            </div>
          </div>

          {/* Direct Scanner Container */}
          <div id="scanner" className="animate-slide-up" style={{ width: '100%', maxWidth: '1100px', animationDelay: '0.2s', position: 'relative', marginTop: '24px' }}>
            <Detector />
          </div>

          {/* Clean Supports Section */}
          <div className="animate-slide-up" style={{ width: '100%', textAlign: 'center', paddingBottom: '40px', animationDelay: '0.3s' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '2px' }}>
              Supports Analysis For
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', maxWidth: '900px', margin: '0 auto' }}>
              {['Job Descriptions', 'Recruiter Emails', 'Company Websites', 'Job URLs', 'WhatsApp Messages', 'Telegram Messages', 'PDF Documents', 'Screenshots'].map(support => (
                <span key={support} className="support-badge">
                  {support}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Can AI Fake Job Detector Analyze Section */}
      <section style={{ padding: '80px 0', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '20px', color: 'var(--text-primary)' }}>
              What Can AI Fake Job Detector Analyze?
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.6 }}>
              AI Fake Job Detector analyzes multiple parts of a recruitment process using Artificial Intelligence and cybersecurity techniques to identify suspicious patterns before you share your personal information or accept a job offer.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {[
              { title: 'Job Descriptions', desc: 'Detect unrealistic salary promises, fake work-from-home offers, guaranteed hiring claims, suspicious language, and misleading job advertisements.', icon: FileText },
              { title: 'Recruiter Emails', desc: 'Analyze recruiter email addresses, identify free email providers used by fake recruiters, detect suspicious communication patterns, and highlight phishing indicators.', icon: Mail },
              { title: 'Company Websites', desc: 'Review company websites for trust signals, suspicious domains, missing business information, and other warning signs that may indicate fraudulent organizations.', icon: Globe },
              { title: 'Job URLs', desc: 'Scan job posting links for phishing attempts, shortened URLs, suspicious domains, and potentially unsafe destinations.', icon: Link },
              { title: 'Interview Messages', desc: 'Detect recruitment scams shared through WhatsApp, Telegram, SMS, or email, including fake interview invitations and social engineering tactics.', icon: MessageSquare },
              { title: 'Salary & Payment Requests', desc: 'Identify advance payment scams, fake training fees, equipment purchase scams, check-cashing fraud, cryptocurrency payment requests, and other financial red flags.', icon: CreditCard },
              { title: 'Identity Theft Risks', desc: 'Warn users when job offers request Aadhaar, PAN, Passport, bank account details, OTPs, or other sensitive personal information before a legitimate hiring process.', icon: ShieldAlert },
              { title: 'Uploaded Documents', desc: 'Analyze PDF files, screenshots, offer letters, and recruitment documents to identify suspicious content, inconsistencies, and scam indicators.', icon: FileUp }
            ].map((feature, idx) => (
              <div key={idx} className="analysis-card">
                <div className="analysis-icon-wrapper">
                  <feature.icon size={24} style={{ color: 'var(--color-primary-light)' }} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="privacy-highlight-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Lock size={24} style={{ color: 'var(--color-success)' }} />
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Your Privacy Comes First</h3>
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              All analysis is performed with a privacy-first approach. Your uploaded files, pasted content, and API requests are never permanently stored by this application. AI Fake Job Detector is designed to help users safely verify suspicious job opportunities while protecting their personal information.
            </p>
          </div>
        </div>
      </section>

      {/* How AI Fake Job Detector Works Section */}
      <section style={{ padding: '80px 0', position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.01)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '20px', color: 'var(--text-primary)' }}>
              How AI Fake Job Detector Works
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.6 }}>
              AI Fake Job Detector combines Artificial Intelligence with cybersecurity analysis to evaluate job offers, recruiter communications, and employment-related documents. Instead of relying on a single check, the system performs multiple layers of analysis before generating an overall risk assessment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {[
              { step: '01', title: 'Submit Job Information', desc: 'Users can paste a job description, recruiter email, company website, interview message, job URL, or upload PDF documents and screenshots for analysis.', icon: Upload },
              { step: '02', title: 'AI Content Analysis', desc: 'Artificial Intelligence analyzes the language, writing style, promises, salary information, urgency, and recruitment patterns to identify suspicious behaviour commonly found in recruitment scams.', icon: Cpu },
              { step: '03', title: 'Cybersecurity Risk Detection', desc: 'The application checks for phishing indicators, suspicious domains, fake recruiter emails, social engineering techniques, identity theft requests, advance payment scams, and other security risks.', icon: Shield },
              { step: '04', title: 'Risk Evaluation', desc: 'All detected indicators are combined to calculate an overall risk score. Every warning is categorized based on its severity to help users understand the potential threat.', icon: Activity },
              { step: '05', title: 'Detailed Security Report', desc: 'The application generates a comprehensive report explaining every detected warning, why it was flagged, and what users should verify before proceeding.', icon: FileCheck },
              { step: '06', title: 'Stay Safe', desc: 'Users receive practical cybersecurity recommendations to help them avoid fake recruiters, protect their personal information, and make informed decisions before accepting a job offer.', icon: UserCheck }
            ].map((step, idx) => (
              <div key={idx} className="workflow-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div className="workflow-icon">
                    <step.icon size={24} style={{ color: 'var(--color-primary-light)' }} />
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>{step.step}</div>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-primary)' }}>{step.title}</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="ai-cyber-highlight-box">
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '16px' }}>AI + Cybersecurity = Better Protection</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '900px', margin: '0 auto' }}>
              Unlike traditional keyword-based scam detectors, AI Fake Job Detector combines Artificial Intelligence with cybersecurity best practices to identify suspicious recruitment behaviour, social engineering tactics, and fraud indicators. This layered approach provides more accurate and meaningful results while helping users understand why a job offer may be risky.
            </p>
          </div>
        </div>
      </section>

      {/* Common Recruitment Scams Section */}
      <section style={{ padding: '80px 0', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Common Recruitment Scams We Help You Detect
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.6 }}>
              Online recruitment scams continue to target students, fresh graduates, and experienced professionals through job portals, social media, messaging apps, and email. AI Fake Job Detector helps identify common scam patterns before you share personal information, pay money, or accept a fraudulent job offer.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {[
              { title: 'Fake Work From Home Jobs', desc: 'Scammers promise high salaries for simple remote work with little or no experience required. These offers often contain unrealistic earnings and guaranteed employment claims.', icon: Home },
              { title: 'Advance Payment Scams', desc: 'Fraudsters ask candidates to pay registration fees, training fees, background verification charges, visa processing fees, or security deposits before joining a company.', icon: Wallet },
              { title: 'Equipment Purchase Scams', desc: 'Fake employers send counterfeit checks or ask candidates to purchase laptops, office supplies, or software using their own money with promises of reimbursement.', icon: Laptop },
              { title: 'WhatsApp & Telegram Interview Scams', desc: 'Instead of professional interviews, scammers conduct the entire hiring process through WhatsApp or Telegram and immediately issue fake offer letters without proper evaluation.', icon: Smartphone },
              { title: 'Fake Recruiter Emails', desc: 'Scammers impersonate recruiters using Gmail, Yahoo, Outlook, or look-alike company domains to trick candidates into sharing personal information.', icon: MailWarning },
              { title: 'Identity Theft Scams', desc: 'Fraudulent recruiters request Aadhaar cards, PAN cards, passports, bank account details, OTPs, selfies, or other sensitive documents before any legitimate hiring process.', icon: UserX },
              { title: 'Phishing Job Websites', desc: 'Fake career websites are created to steal login credentials, personal information, resumes, and financial details by pretending to represent legitimate companies.', icon: AlertTriangle },
              { title: 'Cryptocurrency & Investment Job Scams', desc: 'Victims are promised high-paying jobs but are asked to make cryptocurrency payments, investments, or wallet deposits before joining.', icon: Bitcoin }
            ].map((scam, idx) => (
              <div key={idx} className="scam-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div className="scam-icon-wrapper">
                    <scam.icon size={22} style={{ color: 'var(--color-danger)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>{scam.title}</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{scam.desc}</p>
              </div>
            ))}
          </div>

          <div className="alert-highlight-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <ShieldAlert size={24} style={{ color: 'var(--color-danger)' }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Stay Alert</h3>
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Legitimate employers do not ask candidates to pay money, purchase equipment, share banking credentials, reveal OTPs, or complete interviews entirely through messaging applications. If a job offer creates urgency or requests sensitive information before verification, always investigate carefully before proceeding.
            </p>
          </div>
        </div>
      </section>

      {/* Why Use AI Fake Job Detector Section */}
      <section style={{ padding: '80px 0', position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.01)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Why Use AI Fake Job Detector?
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.6 }}>
              Finding a genuine job online can be difficult. Fake recruiters and scam job offers are becoming more common across job portals, email, LinkedIn, WhatsApp, and Telegram. AI Fake Job Detector helps you quickly review suspicious job offers so you can make safer decisions before sharing your personal information.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {[
              { title: 'Detect Fake Job Offers', desc: 'Identify suspicious job advertisements that contain common scam patterns and misleading information.', icon: Search },
              { title: 'Check Recruiter Emails', desc: 'Review recruiter email addresses and messages to spot possible fake recruiters and phishing attempts.', icon: MailCheck },
              { title: 'Protect Your Personal Information', desc: 'Avoid sharing important documents such as Aadhaar, PAN, passport, bank details, or OTPs with suspicious recruiters.', icon: Lock },
              { title: 'Analyze Multiple Formats', desc: 'Paste job descriptions, upload PDF documents, screenshots, recruiter emails, or job links for analysis.', icon: Layers },
              { title: 'Free and Easy to Use', desc: 'No registration, no subscriptions, and no hidden charges. Anyone can use the tool for free.', icon: Heart },
              { title: 'Privacy First', desc: 'Your analysis is handled with a privacy-first approach, helping you review job offers safely and confidently.', icon: EyeOff }
            ].map((feature, idx) => (
              <div key={idx} className="benefit-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div className="benefit-icon-wrapper">
                    <feature.icon size={24} style={{ color: 'var(--color-primary-light)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>{feature.title}</h3>
                </div>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="benefit-highlight-box">
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '16px' }}>Stay One Step Ahead of Job Scammers</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '900px', margin: '0 auto' }}>
              Always verify a job offer before accepting it. Spending a few minutes checking a suspicious job could help you avoid financial loss, identity theft, and recruitment scams.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section style={{ padding: '80px 0', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: '0 auto', lineHeight: 1.6 }}>
              Find answers to the most common questions about AI Fake Job Detector, how it works, and how it helps you identify suspicious job offers.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '40px' }}>
            {[
              { q: 'What is AI Fake Job Detector?', a: 'AI Fake Job Detector is a free online tool that helps you identify suspicious job offers, fake recruiters, phishing emails, and recruitment scams using Artificial Intelligence and cybersecurity analysis.' },
              { q: 'Is AI Fake Job Detector free to use?', a: 'Yes. The tool is completely free to use. There are no subscriptions, hidden charges, or registration requirements.' },
              { q: 'What can I scan with this tool?', a: 'You can analyze job descriptions, recruiter emails, company websites, job URLs, interview messages, PDF documents, screenshots, and other recruitment-related content.' },
              { q: 'How accurate are the results?', a: 'The tool uses AI and multiple security checks to identify suspicious patterns. While it provides helpful guidance, you should always verify important job offers through official company channels before making decisions.' },
              { q: 'Does this tool store my personal information?', a: 'No. AI Fake Job Detector is designed with a privacy-first approach. Your uploaded content and analysis are not permanently stored by the application.' },
              { q: 'Can this tool detect every fake job?', a: 'No tool can guarantee the detection of every scam. AI Fake Job Detector helps identify common warning signs and suspicious patterns, but users should always perform additional verification when applying for jobs.' },
              { q: 'What are the most common signs of a fake job offer?', a: 'Some common warning signs include unrealistic salaries, requests for payment, fake interview invitations through messaging apps, personal document requests, poor grammar, and recruiter emails from free email providers.' },
              { q: 'Should I pay money to get a job?', a: 'No. Legitimate employers do not ask candidates to pay registration fees, training fees, security deposits, or equipment charges before hiring.' },
              { q: 'Can I use this tool on my mobile phone?', a: 'Yes. AI Fake Job Detector is fully responsive and works on desktop, tablet, and mobile devices.' },
              { q: 'Is AI Fake Job Detector open source?', a: 'Yes. This project is open source, and the source code is available on GitHub. Developers are welcome to contribute improvements, report issues, and suggest new features.' },
              { q: 'How can I report a bug or suggest a new feature?', a: "You can report issues, request new features, or contribute improvements through the project's GitHub repository." }
            ].map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(idx)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none' }}>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', paddingRight: '20px' }}>{faq.q}</span>
                  <ChevronDown className="faq-icon" size={20} style={{ flexShrink: 0, color: 'var(--text-secondary)' }} />
                </button>
                <div className="faq-answer">
                  <p style={{ margin: 0, paddingBottom: '20px', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1rem', paddingLeft: '20px', paddingRight: '20px' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              <strong>Disclaimer:</strong> AI Fake Job Detector provides AI-assisted risk analysis for educational and awareness purposes. The results should be used as guidance and not as the sole basis for employment or financial decisions. Always verify job offers directly with the official employer before sharing personal information or making payments.
            </p>
          </div>
        </div>
      </section>

      {/* Open Source & Community Driven Section */}
      <section style={{ padding: '80px 0', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px' }}>
          <div className="flex-center" style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '24px' }}>
            <GithubIcon size={32} style={{ color: 'var(--text-primary)' }} />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Open Source & Community Driven</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
            AI Fake Job Detector is a free, open-source AI-powered cybersecurity project designed to help everyone identify fake job offers, phishing recruiters, and employment scams before they become victims.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px' }}>
            Whether you're a student, developer, cybersecurity enthusiast, or job seeker, you can explore the source code, contribute new ideas, report bugs, or help improve the project for the global community.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => window.open('https://github.com/aravindsubhashpuvvada/ai-fake-job-detector', '_blank')} className="premium-btn secondary" style={{ gap: '8px', padding: '12px 28px', fontSize: '1rem' }}>
              ⭐ View on GitHub
            </button>
            <button onClick={() => window.open('https://github.com/aravindsubhashpuvvada/ai-fake-job-detector/blob/main/CONTRIBUTING.md', '_blank')} className="premium-btn secondary" style={{ gap: '8px', padding: '12px 28px', fontSize: '1rem' }}>
              🤝 Contribute
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .hero-title {
          background: var(--gradient-primary);
          background-size: 200% auto;
          color: #fff;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 5s linear infinite;
        }
        
        .trust-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .trust-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .premium-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px 40px;
          font-size: 1.15rem;
          font-weight: 700;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .premium-btn.primary {
          background: var(--gradient-primary);
          color: white;
          border: none;
          box-shadow: 0 10px 30px -5px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .premium-btn.primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 15px 40px -5px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.3);
        }

        .premium-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .premium-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .btn-icon {
          transition: transform 0.3s ease;
        }

        .premium-btn:hover .btn-icon {
          transform: translateX(4px);
        }

        .support-badge {
          padding: 10px 20px;
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .support-badge:hover {
          background: rgba(255,255,255,0.06);
          color: var(--text-primary);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }

        .analysis-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .analysis-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
        }
        
        .analysis-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .privacy-highlight-box {
          background: linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.05));
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 20px;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }

        .privacy-highlight-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent);
        }

        .workflow-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s ease;
          position: relative;
        }

        .workflow-card:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(99,102,241,0.3);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px -10px rgba(99,102,241,0.1);
        }

        .workflow-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-cyber-highlight-box {
          background: linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05));
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 20px;
          padding: 40px;
          position: relative;
          text-align: center;
        }

        .ai-cyber-highlight-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent);
        }

        .scam-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .scam-card:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(239,68,68,0.2);
          border-left: 3px solid var(--color-danger);
          transform: translateY(-2px);
        }

        .scam-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .alert-highlight-box {
          background: linear-gradient(135deg, rgba(239,68,68,0.05), rgba(245,158,11,0.05));
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 20px;
          padding: 32px;
          position: relative;
        }

        .alert-highlight-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(239,68,68,0.5), transparent);
        }

        .benefit-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(99,102,241,0.2);
          transform: translateY(-4px);
        }

        .benefit-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .benefit-highlight-box {
          background: linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05));
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 20px;
          padding: 40px;
          position: relative;
          text-align: center;
          overflow: hidden;
        }

        .benefit-highlight-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent);
        }

        .faq-item {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          background: rgba(255,255,255,0.025);
          border-color: rgba(255,255,255,0.1);
        }

        .faq-item.active {
          background: rgba(255,255,255,0.03);
          border-color: rgba(99,102,241,0.3);
          box-shadow: 0 4px 20px rgba(99,102,241,0.05);
        }

        .faq-icon {
          transition: transform 0.3s ease;
        }

        .faq-item.active .faq-icon {
          transform: rotate(180deg);
          color: var(--color-primary-light) !important;
        }

        .faq-answer {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item.active .faq-answer {
          max-height: 500px;
          opacity: 1;
        }

        @keyframes shine {
          to { background-position: 200% center; }
        }
        
        @keyframes pulse-bg {
          from { transform: scale(1) translate(0, 0); opacity: 0.8; }
          to { transform: scale(1.1) translate(2%, 2%); opacity: 1; }
        }

        @keyframes pulse-dot {
          0% { box-shadow: 0 0 0 0 rgba(129,140,248, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(129,140,248, 0); }
          100% { box-shadow: 0 0 0 0 rgba(129,140,248, 0); }
        }
      `}</style>
    </div>
  );
};
