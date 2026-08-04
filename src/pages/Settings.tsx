import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Key, Eye, EyeOff, Save, Download, Upload, Trash2, Moon, Sun, MonitorPlay } from 'lucide-react';
import { MODEL_OPTIONS } from '../services/ai';

export const Settings: React.FC = () => {
  const {
    apiKey,
    saveApiKey,
    selectedModel,
    setSelectedModel,
    theme,
    toggleTheme,
    animationsEnabled,
    toggleAnimations,
    clearHistory,
    exportData,
    importData,
    scans
  } = useApp();

  const [inputKey, setInputKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    saveApiKey(inputKey.trim());
    alert('API Key updated successfully.');
  };

  const handleExport = () => {
    const dataStr = exportData();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `job-shield-backup-${new Date().toISOString().split('T')[0]}.json`;
    
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
          setImportStatus({ type: 'success', msg: 'Data imported successfully!' });
        } else {
          setImportStatus({ type: 'error', msg: 'Invalid backup file format.' });
        }
      };
      fileReader.onerror = () => {
        setImportStatus({ type: 'error', msg: 'Failed to read file.' });
      };
      fileReader.readAsText(files[0]);
    }
  };

  const handleClear = () => {
    clearHistory();
    setShowClearConfirm(false);
    alert('History cleared successfully.');
  };

  return (
    <div className="container animate-slide-up" style={{ padding: '40px 24px', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.25rem', marginBottom: '8px' }}>Application Settings</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Configure your secure AI modules, theme preferences, and import/export offline history.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* OpenRouter API Integration Card */}
        <section className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.08)', color: 'var(--color-primary-light)' }}>
              <Key size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem' }}>AI Scanner Configuration</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Connect user API keys to unlock limitless smart semantic checks.</p>
            </div>
          </div>

          <form onSubmit={handleSaveKey}>
            <div className="form-group" style={{ position: 'relative' }}>
              <label className="form-label">OpenRouter API Key</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type={showKey ? 'text' : 'password'}
                    className="form-input"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    style={{ paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button type="submit" className="btn btn-primary" style={{ gap: '6px' }}>
                  <Save size={16} /> Save
                </button>
              </div>
            </div>
          </form>

          {/* Connected state warning/info */}
          {apiKey && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-success)33',
              background: 'var(--color-success-bg)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <ShieldCheck style={{ color: 'var(--color-success)' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>API Connection Active</div>
                <div style={{ fontSize: '0.75rem' }}>Scanning operates through secure OpenRouter AI models.</div>
              </div>
            </div>
          )}

          <div className="form-group" style={{ marginTop: '20px' }}>
            <label className="form-label">Default LLM Model</label>
            <select
              className="form-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {MODEL_OPTIONS.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              We recommend Gemini 2.5 Flash Free or Llama 3 8B Free for rapid, high-accuracy classification.
            </p>
          </div>
        </section>

        {/* Display Settings Card */}
        <section className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Interface Preferences</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Theme Toggle Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Display Theme</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Toggle between light or dark SaaS configurations.</div>
              </div>
              <button onClick={toggleTheme} className="btn btn-secondary" style={{ gap: '8px' }}>
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>

            <div style={{ height: '1px', background: 'var(--border-color)' }} />

            {/* Animations Toggle Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Transition Animations</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Disable interface animations to save battery or satisfy motion reduction.</div>
              </div>
              <button onClick={toggleAnimations} className="btn btn-secondary" style={{ gap: '8px' }}>
                <MonitorPlay size={16} />
                {animationsEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </section>

        {/* Database Management Card */}
        <section className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Data & Privacy Controls</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Your history contains {scans.length} scan records. Everything is stored locally.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={handleExport} className="btn btn-secondary" style={{ gap: '8px' }}>
              <Download size={16} /> Export Backup
            </button>
            
            <label className="btn btn-secondary" style={{ gap: '8px', cursor: 'pointer', margin: 0 }}>
              <Upload size={16} /> Import Backup
              <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
            </label>

            <button 
              onClick={() => setShowClearConfirm(true)} 
              className="btn btn-danger" 
              style={{ gap: '8px', marginLeft: 'auto' }}
              disabled={scans.length === 0}
            >
              <Trash2 size={16} /> Clear History
            </button>
          </div>

          {importStatus && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: importStatus.type === 'success' ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
              color: importStatus.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              {importStatus.msg}
            </div>
          )}

          {showClearConfirm && (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              border: '1px solid var(--color-danger)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(239, 68, 68, 0.05)'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Are you absolutely sure?</div>
              <p style={{ fontSize: '0.85rem', marginBottom: '16px' }}>This will permanently erase all saved reports and scan archives from LocalStorage. This action is irreversible.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={handleClear} className="btn btn-danger btn-sm">Confirm Deletion</button>
                <button onClick={() => setShowClearConfirm(false)} className="btn btn-secondary btn-sm">Cancel</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
