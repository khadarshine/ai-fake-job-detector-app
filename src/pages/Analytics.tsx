import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';
import { TrendLineChart, RiskDonutChart } from '../components/CustomChart';
import { ShieldCheck, AlertTriangle, Activity, Eye, Sparkles } from 'lucide-react';

export const Analytics: React.FC = () => {
  const { scans, setCurrentScanId } = useApp();
  const { navigate } = useRouter();

  // If no scans, display analytics onboarding/empty state
  if (scans.length === 0) {
    return (
      <div className="container animate-slide-up" style={{ padding: '40px 24px', maxWidth: '800px', textAlign: 'center' }}>
        <div className="flex-center" style={{ margin: '64px 0', flexDirection: 'column', gap: '20px' }}>
          <div className="flex-center" style={{
            background: 'var(--gradient-primary)',
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            color: '#ffffff',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Sparkles size={36} />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800 }}>Welcome to Your Job Shield Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto', lineHeight: 1.6 }}>
            Run your first job posting scan to unlock real-time security analytics. JobShield tracks common threat patterns, confidence averages, and risk trends locally on your device.
          </p>
          <button onClick={() => navigate('/detector')} className="btn btn-primary" style={{ padding: '12px 24px', borderRadius: '12px', marginTop: '12px' }}>
            Start Security Check
          </button>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalScans = scans.length;
  
  const sumRisk = scans.reduce((acc, curr) => acc + curr.report.overallRiskScore, 0);
  const avgRisk = Math.round(sumRisk / totalScans);

  const scamsCount = scans.filter(s => s.report.status === 'scam').length;
  const suspCount = scans.filter(s => s.report.status === 'suspicious').length;
  const safeCount = scans.filter(s => s.report.status === 'genuine').length;

  // Line chart data (last 7 scans in chronological order)
  const lineChartData = scans
    .slice(0, 7)
    .reverse()
    .map(s => s.report.overallRiskScore);

  // Donut chart data structure
  const donutData = [
    { label: 'High Risk (Scams)', value: scamsCount, color: 'var(--color-danger)' },
    { label: 'Suspicious Offers', value: suspCount, color: 'var(--color-warning)' },
    { label: 'Verified Safe', value: safeCount, color: 'var(--color-success)' }
  ];

  // Heuristic counting of high threat categories
  const categoryThreatCounts: Record<string, number> = {
    'Compensation Realism': 0,
    'Syntax & Professionalism': 0,
    'Recruiter Domains': 0,
    'Artificial Urgency': 0,
    'Identity Demands': 0,
    'Financial Requirements': 0,
    'Interview Methods': 0,
    'Company Verification': 0,
  };

  scans.forEach(s => {
    const c = s.report.categories;
    if (c.salaryRealism.riskLevel === 'high') categoryThreatCounts['Compensation Realism']++;
    if (c.grammarProfessionalism.riskLevel === 'high') categoryThreatCounts['Syntax & Professionalism']++;
    if (c.domainTrust.riskLevel === 'high') categoryThreatCounts['Recruiter Domains']++;
    if (c.urgencyPressure.riskLevel === 'high') categoryThreatCounts['Artificial Urgency']++;
    if (c.personalInfoRequests.riskLevel === 'high') categoryThreatCounts['Identity Demands']++;
    if (c.financialDemands.riskLevel === 'high') categoryThreatCounts['Financial Requirements']++;
    if (c.interviewProcess.riskLevel === 'high') categoryThreatCounts['Interview Methods']++;
    if (c.companyVerification.riskLevel === 'high') categoryThreatCounts['Company Verification']++;
  });

  const sortedThreatCategories = Object.entries(categoryThreatCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(entry => entry[1] > 0);

  const handleOpenReport = (id: string) => {
    setCurrentScanId(id);
    navigate('/report');
  };

  return (
    <div className="container animate-slide-up" style={{ padding: '40px 24px' }}>
      <h1 style={{ fontSize: '2.25rem', marginBottom: '8px' }}>Security Analytics</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Insight metrics compiled from your local device database archive.</p>

      {/* KPI Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Audited Listings</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>{totalScans}</div>
          </div>
          <div className="flex-center" style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.08)', color: 'var(--color-primary-light)' }}>
            <Activity size={22} />
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Average Threat Index</span>
            <div style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: avgRisk > 60 ? 'var(--color-danger)' : avgRisk > 25 ? 'var(--color-warning)' : 'var(--color-success)',
              marginTop: '4px'
            }}>{avgRisk}%</div>
          </div>
          <div className="flex-center" style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: avgRisk > 60 ? 'var(--color-danger-bg)' : avgRisk > 25 ? 'var(--color-warning-bg)' : 'var(--color-success-bg)',
            color: avgRisk > 60 ? 'var(--color-danger)' : avgRisk > 25 ? 'var(--color-warning)' : 'var(--color-success)'
          }}>
            <AlertTriangle size={22} />
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Safe Verifications</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>{safeCount}</div>
          </div>
          <div className="flex-center" style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
            <ShieldCheck size={22} />
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr 1.2fr',
        gap: '32px',
        marginBottom: '32px'
      }} className="dashboard-charts-grid">
        
        {/* Trend Area Chart */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '20px' }}>Historical Threat Patterns (Last 7 Scans)</h2>
          <TrendLineChart data={lineChartData} />
        </div>

        {/* Donut Distribution Chart */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '20px' }}>Risk Group Distribution</h2>
          <div className="flex-center" style={{ flex: 1 }}>
            <RiskDonutChart data={donutData} />
          </div>
        </div>
      </div>

      {/* Bottom Insights and Recents */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.8fr',
        gap: '32px'
      }} className="dashboard-recents-grid">
        
        {/* Top scam indicator types */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Top Fraud Channels Detected</h2>
          {sortedThreatCategories.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sortedThreatCategories.slice(0, 4).map(([category, count]) => (
                <div key={category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{category}</span>
                  <span className="badge badge-danger" style={{ textTransform: 'none' }}>
                    {count} high-risk checks
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              No recurring high-threat indicators detected yet. Keep scanning to accumulate stats.
            </p>
          )}
        </div>

        {/* Recent Scans list */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.15rem' }}>Recent Security Audits</h2>
            <button onClick={() => navigate('/history')} style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', fontWeight: 600, cursor: 'pointer' }}>
              View All History &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {scans.slice(0, 3).map(scan => {
              let scoreColor = 'var(--color-success)';
              if (scan.report.overallRiskScore > 60) scoreColor = 'var(--color-danger)';
              else if (scan.report.overallRiskScore > 25) scoreColor = 'var(--color-warning)';

              return (
                <div
                  key={scan.id}
                  onClick={() => handleOpenReport(scan.id)}
                  className="glass-panel-hover"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: `${scoreColor}22`,
                      color: scoreColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.75rem'
                    }}>
                      {scan.report.overallRiskScore}%
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{scan.title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                        <span>{scan.inputType.toUpperCase()}</span>
                        <span>&bull;</span>
                        <span>{new Date(scan.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Eye size={16} style={{ color: 'var(--text-muted)' }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .dashboard-charts-grid,
          .dashboard-recents-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
