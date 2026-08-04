import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { ScanItem } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';
import { Search, Star, Trash2, Eye, Download, Upload, Filter, Calendar, Edit3, Check } from 'lucide-react';

export const History: React.FC = () => {
  const { scans, deleteScan, renameScan, toggleFavoriteScan, exportData, importData, setCurrentScanId } = useApp();
  const { navigate } = useRouter();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'genuine' | 'suspicious' | 'scam'>('all');
  const [sortOption, setSortOption] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  
  // Renaming State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleOpenReport = (id: string) => {
    setCurrentScanId(id);
    navigate('/report');
  };

  const handleStartRename = (e: React.MouseEvent, item: ScanItem) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditingTitle(item.title);
  };

  const handleSaveRename = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (editingTitle.trim()) {
      renameScan(id, editingTitle.trim());
    }
    setEditingId(null);
  };

  // Filter and Sort Logic
  const filteredScans = scans
    .filter(scan => {
      const matchSearch = 
        scan.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        scan.inputSnippet.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchRisk = 
        riskFilter === 'all' || 
        scan.report.status === riskFilter;

      return matchSearch && matchRisk;
    })
    .sort((a, b) => {
      if (sortOption === 'newest') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      if (sortOption === 'oldest') return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      if (sortOption === 'highest') return b.report.overallRiskScore - a.report.overallRiskScore;
      if (sortOption === 'lowest') return a.report.overallRiskScore - b.report.overallRiskScore;
      return 0;
    });

  const handleExport = () => {
    const dataStr = exportData();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `jobshield-archive-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    
    if (files && files.length > 0) {
      fileReader.onload = (event) => {
        const result = event.target?.result as string;
        const success = importData(result);
        if (success) {
          alert('Backup Archive loaded successfully.');
        } else {
          alert('Invalid file structure.');
        }
      };
      fileReader.readAsText(files[0]);
    }
  };

  return (
    <div className="container animate-slide-up" style={{ padding: '40px 24px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '8px' }}>Job Safety Archive</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Browse and manage your locally stored verification scans.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={handleExport} className="btn btn-secondary btn-sm" style={{ gap: '6px' }} disabled={scans.length === 0}>
            <Download size={14} /> Export JSON Archive
          </button>
          <label className="btn btn-secondary btn-sm" style={{ gap: '6px', cursor: 'pointer', margin: 0 }}>
            <Upload size={14} /> Import Backup
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="glass-panel history-controls-grid" style={{
        padding: '16px',
        borderRadius: '12px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '16px',
        marginBottom: '24px'
      }}>
        
        {/* Search */}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            className="form-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scans by job title or keyword snippet..."
            style={{ paddingLeft: '40px', paddingTop: '10px', paddingBottom: '10px' }}
          />
          <Search size={18} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
        </div>

        {/* Risk Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} style={{ color: 'var(--text-muted)' }} />
          <select
            className="form-select"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value as any)}
            style={{ paddingTop: '10px', paddingBottom: '10px' }}
          >
            <option value="all">All Risk Levels</option>
            <option value="genuine">Verified Genuine</option>
            <option value="suspicious">Suspicious Signals</option>
            <option value="scam">High Risk Scams</option>
          </select>
        </div>

        {/* Sort options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            style={{ paddingTop: '10px', paddingBottom: '10px' }}
          >
            <option value="newest">Sort: Newest Audits</option>
            <option value="oldest">Sort: Oldest Audits</option>
            <option value="highest">Sort: Highest Risk</option>
            <option value="lowest">Sort: Lowest Risk</option>
          </select>
        </div>
      </div>

      {/* Archives List */}
      {filteredScans.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredScans.map(item => {
            let scoreColor = 'var(--color-success)';
            let statusText = 'Genuine';
            if (item.report.overallRiskScore > 60) {
              scoreColor = 'var(--color-danger)';
              statusText = 'Scam';
            } else if (item.report.overallRiskScore > 25) {
              scoreColor = 'var(--color-warning)';
              statusText = 'Suspicious';
            }

            return (
              <div
                key={item.id}
                onClick={() => handleOpenReport(item.id)}
                className="glass-panel glass-panel-hover history-list-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  borderLeft: `5px solid ${scoreColor}`
                }}
              >
                {/* Dial index score */}
                <div className="flex-center" style={{
                  minWidth: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: `${scoreColor}11`,
                  border: `1px solid ${scoreColor}33`,
                  color: scoreColor,
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  marginRight: '20px'
                }}>
                  {item.report.overallRiskScore}%
                </div>

                {/* Job Info block */}
                <div style={{ flex: 1, marginRight: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {editingId === item.id ? (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          className="form-input"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          style={{ padding: '4px 8px', fontSize: '0.9rem', width: '220px' }}
                          autoFocus
                        />
                        <button onClick={(e) => handleSaveRename(e, item.id)} className="btn btn-secondary btn-icon-only flex-center" style={{ padding: '4px', borderRadius: '6px' }}>
                          <Check size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</h3>
                        <button
                          onClick={(e) => handleStartRename(e, item)}
                          style={{ cursor: 'pointer', color: 'var(--text-muted)', display: 'inline-flex' }}
                          title="Rename scan title"
                        >
                          <Edit3 size={13} />
                        </button>
                      </>
                    )}
                    <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{item.inputType}</span>
                    <span className={`badge ${
                      item.report.status === 'scam' ? 'badge-danger' : 
                      item.report.status === 'suspicious' ? 'badge-warning' : 'badge-success'
                    }`} style={{ fontSize: '0.65rem' }}>
                      {statusText}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    marginTop: '8px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '550px'
                  }}>
                    {item.inputSnippet}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>

                {/* Actions row */}
                <div style={{ display: 'flex', gap: '10px' }} onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleFavoriteScan(item.id)}
                    className="btn btn-secondary btn-icon-only flex-center"
                    style={{ border: 'none', color: item.isFavorite ? 'var(--color-warning)' : 'var(--text-muted)' }}
                    title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star size={16} fill={item.isFavorite ? 'var(--color-warning)' : 'none'} />
                  </button>
                  <button
                    onClick={() => handleOpenReport(item.id)}
                    className="btn btn-secondary btn-icon-only flex-center"
                    style={{ border: 'none' }}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this report?')) deleteScan(item.id);
                    }}
                    className="btn btn-secondary btn-icon-only flex-center"
                    style={{ border: 'none', color: 'var(--color-danger)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-panel flex-center" style={{ padding: '64px 24px', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
          <Search size={32} style={{ color: 'var(--text-muted)' }} />
          <h3 style={{ color: 'var(--text-primary)' }}>No Archived Audits Found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            No records matched your query. Try adjusting search filters or scan new listings.
          </p>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .history-controls-grid {
            grid-template-columns: 1fr !important;
          }
          .history-list-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .history-list-item .flex-center {
            margin-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
