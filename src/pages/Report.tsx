import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';
import { TrustMeter } from '../components/TrustMeter';
import { CategoryBarChart } from '../components/CustomChart';
import { 
  ShieldAlert, Calendar, ArrowLeft, Star, Trash2, 
  Printer, Copy, Check, Info, FileCode, CheckCircle2, AlertTriangle 
} from 'lucide-react';

export const Report: React.FC = () => {
  const { scans, currentScanId, toggleFavoriteScan, deleteScan } = useApp();
  const { navigate } = useRouter();

  const [copied, setCopied] = useState(false);

  // Retrieve current active scan
  const activeScan = scans.find(s => s.id === currentScanId) || scans[0];

  if (!activeScan) {
    return (
      <div className="container flex-center animate-slide-up" style={{ minHeight: '60vh', flexDirection: 'column', gap: '16px' }}>
        <ShieldAlert size={48} style={{ color: 'var(--text-muted)' }} />
        <h2 style={{ color: 'var(--text-primary)' }}>No Reports Generated</h2>
        <p style={{ color: 'var(--text-secondary)' }}>You haven't scanned any job advertisements yet.</p>
        <button onClick={() => navigate('/detector')} className="btn btn-primary">Start First Scan</button>
      </div>
    );
  }

  const { report, title, timestamp, inputType, fullInput } = activeScan;

  // Set colors based on risk status
  let statusColor = 'var(--color-success)';
  let bgGradient = 'rgba(16, 185, 129, 0.03)';
  let borderHighlight = 'rgba(16, 185, 129, 0.15)';
  
  if (report.status === 'scam') {
    statusColor = 'var(--color-danger)';
    bgGradient = 'rgba(239, 68, 68, 0.03)';
    borderHighlight = 'rgba(239, 68, 68, 0.15)';
  } else if (report.status === 'suspicious') {
    statusColor = 'var(--color-warning)';
    bgGradient = 'rgba(245, 158, 11, 0.03)';
    borderHighlight = 'rgba(245, 158, 11, 0.15)';
  }

  // Format category list for custom bar chart
  const barChartCategories = [
    { label: 'Salary Realism', score: report.categories.salaryRealism.score, riskLevel: report.categories.salaryRealism.riskLevel },
    { label: 'Writing Quality & Tone', score: report.categories.grammarProfessionalism.score, riskLevel: report.categories.grammarProfessionalism.riskLevel },
    { label: 'Domain & Contact Authenticity', score: report.categories.domainTrust.score, riskLevel: report.categories.domainTrust.riskLevel },
    { label: 'Urgency & Pressure Tactics', score: report.categories.urgencyPressure.score, riskLevel: report.categories.urgencyPressure.riskLevel },
    { label: 'Personal Information Harvesting', score: report.categories.personalInfoRequests.score, riskLevel: report.categories.personalInfoRequests.riskLevel },
    { label: 'Upfront Financial Demands', score: report.categories.financialDemands.score, riskLevel: report.categories.financialDemands.riskLevel },
    { label: 'Interview Process Standards', score: report.categories.interviewProcess.score, riskLevel: report.categories.interviewProcess.riskLevel },
    { label: 'Organization Verification', score: report.categories.companyVerification.score, riskLevel: report.categories.companyVerification.riskLevel },
  ];

  const handleCopyText = () => {
    const textToCopy = `--- JOBSHIELD SECURITY REPORT ---
Position: ${title}
Scan Date: ${new Date(timestamp).toLocaleDateString()}
Risk Factor: ${report.overallRiskScore}% (${report.status.toUpperCase()})
Confidence Index: ${report.confidence}%
Summary: ${report.summary}

Detected Red Flags:
${report.issues.map(iss => `- ${iss}`).join('\n')}

Recommendations:
${report.recommendations.map(rec => `- ${rec}`).join('\n')}

Generated via JobShield AI (Local First Protection).`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = JSON.stringify(activeScan, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `jobshield-report-${activeScan.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = () => {
    if (confirm('Permanently delete this scan report from your local archive?')) {
      deleteScan(activeScan.id);
      navigate('/history');
    }
  };

  return (
    <div className="container animate-slide-up print-area" style={{ padding: '40px 24px' }}>
      
      {/* Top Navigation Row */}
      <div className="no-print" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <button onClick={() => navigate('/detector')} className="btn btn-secondary flex-center" style={{ gap: '6px' }}>
          <ArrowLeft size={16} /> Back to Scanner
        </button>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => toggleFavoriteScan(activeScan.id)}
            className="btn btn-secondary flex-center btn-icon-only"
            style={{ color: activeScan.isFavorite ? 'var(--color-warning)' : 'var(--text-muted)' }}
            aria-label="Favorite Report"
          >
            <Star size={18} fill={activeScan.isFavorite ? 'var(--color-warning)' : 'none'} />
          </button>
          <button
            onClick={handleCopyText}
            className="btn btn-secondary flex-center"
            style={{ gap: '6px' }}
          >
            {copied ? <Check size={16} style={{ color: 'var(--color-success)' }} /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownloadJson}
            className="btn btn-secondary flex-center"
            style={{ gap: '6px' }}
            title="Download JSON Report"
          >
            <FileCode size={16} /> JSON
          </button>
          <button
            onClick={handlePrint}
            className="btn btn-secondary flex-center"
            style={{ gap: '6px' }}
          >
            <Printer size={16} /> Print Report
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-secondary flex-center"
            style={{ gap: '6px', color: 'var(--color-danger)' }}
            title="Delete from local database"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Main Report Body */}
      <div className="glass-panel" style={{
        padding: '36px',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${borderHighlight}`,
        background: `linear-gradient(180deg, ${bgGradient} 0%, var(--bg-card) 100%)`,
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Document Header */}
        <div style={{
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '24px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '8px' }}>
              {inputType.toUpperCase()} AUDIT
            </span>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800 }}>{title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              <Calendar size={14} />
              <span>Scanned on {new Date(timestamp).toLocaleString()}</span>
              <span>&bull;</span>
              <span>Local Sandbox V1.0</span>
            </div>
          </div>
          
          <div style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: `1px solid ${statusColor}33`,
            backgroundColor: `${statusColor}11`,
            color: statusColor,
            fontWeight: 800,
            fontSize: '1rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Status: {report.status}
          </div>
        </div>

        {/* Dial & Summary Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '40px'
        }} className="report-main-grid">
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TrustMeter score={report.overallRiskScore} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '24px', background: 'rgba(255,255,255,0.01)', borderLeft: `4px solid ${statusColor}` }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={16} /> Executive Verdict Summary
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>{report.summary}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div className="glass-panel" style={{ padding: '12px 20px', flex: 1, minWidth: '140px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>AI Confidence</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>{report.confidence}%</div>
              </div>
              <div className="glass-panel" style={{ padding: '12px 20px', flex: 1, minWidth: '140px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Scam Probability</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: statusColor, marginTop: '4px' }}>{report.scamProbability}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bullet Logs: Issues vs Positives */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '40px'
        }} className="report-bullets-grid">
          
          {/* Issues Card */}
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--color-danger)' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-danger)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} /> Safety Risks & Red Flags ({report.issues.length})
            </h3>
            {report.issues.length > 0 ? (
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {report.issues.map((iss, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--color-danger)', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: 1 }}>&bull;</span>
                    <span>{iss}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No major warning thresholds violated.</div>
            )}
          </div>

          {/* Positives Card */}
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--color-success)' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-success)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} /> Verified Positive Signals ({report.positives.length})
            </h3>
            {report.positives.length > 0 ? (
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {report.positives.map((pos, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--color-success)', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: 1 }}>&bull;</span>
                    <span>{pos}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No positive security signals identified in the source text.</div>
            )}
          </div>
        </div>

        {/* Granular Parameter Scorecard */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 Detailed Threat Parameter Scorecard
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px'
          }} className="scorecard-grid">
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {Object.entries(report.categories).map(([key, cat]) => {
                let badgeClass = 'badge-success';
                if (cat.riskLevel === 'high') badgeClass = 'badge-danger';
                else if (cat.riskLevel === 'medium') badgeClass = 'badge-warning';

                // Human readable key
                const formattedKey = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase());

                return (
                  <div key={key} style={{ padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-input)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{formattedKey}</span>
                      <span className={`badge ${badgeClass}`}>{cat.riskLevel}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{cat.explanation}</p>
                  </div>
                );
              })}
            </div>
            
            <div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Threat Levels Visualization</h3>
              <CategoryBarChart categories={barChartCategories} />
            </div>
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="glass-panel" style={{ padding: '24px', background: 'rgba(99, 102, 241, 0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛡️ Recommended Security Actions
          </h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {report.recommendations.map((rec, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--color-primary-light)', fontWeight: 'bold' }}>{i + 1}.</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Raw Source Text Display */}
        <div style={{ marginTop: '40px' }} className="no-print">
          <details style={{ cursor: 'pointer' }}>
            <summary style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, userSelect: 'none' }}>
              Show Scanned Source Text
            </summary>
            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              whiteSpace: 'pre-wrap',
              maxHeight: '300px',
              overflowY: 'auto',
              fontFamily: 'monospace'
            }}>
              {fullInput}
            </div>
          </details>
        </div>

      </div>

      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-area {
            padding: 0 !important;
            box-shadow: none !important;
            background: none !important;
            border: none !important;
          }
          .glass-panel {
            background: none !important;
            border: 1px solid #ddd !important;
            box-shadow: none !important;
          }
        }
        @media (max-width: 768px) {
          .report-main-grid,
          .report-bullets-grid,
          .scorecard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
