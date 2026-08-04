import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';
import { parseFileContent } from '../services/parser';
import { sanitizeHTML } from '../utils/security';
import { FileText, Link, Clipboard, ShieldAlert, UploadCloud, FileType, RefreshCw } from 'lucide-react';

export const Detector: React.FC = () => {
  const { startScan, isScanning, scanProgress, scanStepText } = useApp();
  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'text' | 'file' | 'url'>('text');
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [inputType, setInputType] = useState<'text' | 'url' | 'email' | 'file'>('text');
  
  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (tab: 'text' | 'file' | 'url') => {
    setActiveTab(tab);
    // Align inputType values
    if (tab === 'text') setInputType('text');
    if (tab === 'url') setInputType('url');
    if (tab === 'file') setInputType('file');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    setSelectedFile(file);
    setInputType('file');
  };

  const handlePasteDemo = (type: 'safe' | 'scam') => {
    if (type === 'scam') {
      setInputText(`JOB ALERT: Urgent Home Office Data Entry Specialist
Company: Apex Global Careers (Recruiting)
Salary: $95.00/hour training rate. Up to $4500 weekly. No experience required. We train you!
Hours: Flexible, Remote.

We are urgently looking for 10 Remote Data Entry agents to start immediately.
Tasks include typing invoices, filling customer reports, and receiving payment invoices.
We supply all required workspace tools and software. We will mail you a check of $3,500 to buy equipment from our official vendor portal.

Interview Process:
Interviews are conducted entirely via Telegram Chat Messenger.
Add our recruitment manager on Telegram: @ApexGlobalCareersManager and send him your resume.

Apply within 24 hours. Start tomorrow!`);
      setInputType('text');
    } else {
      setInputText(`Position: Junior Frontend Developer (React)
Company: TechStack Innovations
Location: Remote (US & Canada)
Base Salary: $70,000 - $85,000 annually + Benefits
Employment Type: Full-time

About TechStack Innovations:
TechStack is a venture-funded product builder. We design interfaces for productivity tooling.

Responsibilities:
- Support the design and engineering team in crafting responsive React interfaces.
- Write CSS styles, tests, and documentation.
- Maintain consistency across codebases.

Qualifications:
- Solid knowledge of React, JavaScript, and HTML5/CSS3.
- Familiarity with version control workflows (Git).
- Good communication and collaboration skills.

To apply, please submit your cover letter and link to GitHub portfolio at our official careers portal: https://techstackinnovations.com/careers`);
      setInputType('text');
    }
  };

  const handleAnalyze = async () => {
    let scanInputText = '';
    let fileName: string | undefined;

    if (activeTab === 'text') {
      if (!inputText.trim()) {
        alert('Please paste a job description or email content.');
        return;
      }
      scanInputText = inputText;
    } else if (activeTab === 'url') {
      if (!inputUrl.trim()) {
        alert('Please enter a job URL.');
        return;
      }
      scanInputText = `Analyze job posting at URL: ${inputUrl}`;
    } else if (activeTab === 'file') {
      if (!selectedFile) {
        alert('Please select or drag a file to upload.');
        return;
      }
      try {
        scanInputText = await parseFileContent(selectedFile);
        fileName = selectedFile.name;
      } catch (err) {
        alert('Failed to parse file contents. Please paste the text instead.');
        return;
      }
    }

    const sanitized = sanitizeHTML(scanInputText);
    const scanId = await startScan(sanitized, inputType, fileName);
    
    if (scanId) {
      navigate('/report');
    } else {
      alert('Analysis failed. Please verify configurations and try again.');
    }
  };

  // Scanning View
  if (isScanning) {
    return (
      <div className="container flex-center" style={{ minHeight: '80vh', padding: '48px 24px' }}>
        <div className="glass-panel" style={{
          width: '100%',
          maxWidth: '550px',
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div className="flex-center" style={{
            position: 'relative',
            width: '80px',
            height: '80px',
            marginBottom: '16px'
          }}>
            <div className="animate-spin-slow" style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '3px solid var(--border-color)',
              borderTopColor: 'var(--color-primary-light)',
              position: 'absolute'
            }} />
            <ShieldAlert size={36} className="animate-pulse-glow" style={{ color: 'var(--color-primary-light)' }} />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Analyzing Job Safety</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', minHeight: '40px' }}>{scanStepText}</p>

          {/* Progress Bar Container */}
          <div style={{
            width: '100%',
            height: '10px',
            backgroundColor: 'var(--bg-input)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            margin: '8px 0'
          }}>
            <div style={{
              width: `${scanProgress}%`,
              height: '100%',
              background: 'var(--gradient-primary)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{scanProgress}% Completed</span>

          <div className="scan-pipeline" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', textAlign: 'left', marginTop: '16px' }}>
            <div className={`scan-step ${scanProgress >= 20 ? 'completed' : 'active'}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', opacity: scanProgress >= 5 ? 1 : 0.4 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: scanProgress >= 20 ? 'var(--color-success)' : 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.8rem' }}>Parsing job description structures</span>
            </div>
            <div className={`scan-step ${scanProgress >= 45 ? 'completed' : scanProgress >= 20 ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', opacity: scanProgress >= 20 ? 1 : 0.4 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: scanProgress >= 45 ? 'var(--color-success)' : scanProgress >= 20 ? 'var(--color-primary)' : 'transparent' }} />
              <span style={{ fontSize: '0.8rem' }}>Verifying compensation variables & grammar indexes</span>
            </div>
            <div className={`scan-step ${scanProgress >= 70 ? 'completed' : scanProgress >= 45 ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', opacity: scanProgress >= 45 ? 1 : 0.4 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: scanProgress >= 70 ? 'var(--color-success)' : scanProgress >= 45 ? 'var(--color-primary)' : 'transparent' }} />
              <span style={{ fontSize: '0.8rem' }}>Checking email domains and routing channels</span>
            </div>
            <div className={`scan-step ${scanProgress >= 90 ? 'completed' : scanProgress >= 70 ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', opacity: scanProgress >= 70 ? 1 : 0.4 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: scanProgress >= 90 ? 'var(--color-success)' : scanProgress >= 70 ? 'var(--color-primary)' : 'transparent' }} />
              <span style={{ fontSize: '0.8rem' }}>Generating mitigation recommendations and reports</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Input Config View
  return (
    <div className="container animate-slide-up" style={{ padding: '40px 24px', maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Safety Scanner Sandbox</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Evaluate job advertisements, emails, or chat logs for fraudulent patterns. Scan files, URLs, or paste raw text below.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1.2fr',
        gap: '32px'
      }} className="detector-split-grid">
        
        {/* Main Work Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Tab Selector */}
          <div className="glass-panel flex-center" style={{ padding: '6px', borderRadius: '14px', width: 'fit-content' }}>
            <button
              onClick={() => handleTabChange('text')}
              className={`btn btn-sm ${activeTab === 'text' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', borderRadius: '10px' }}
            >
              <Clipboard size={16} /> Paste Text
            </button>
            <button
              onClick={() => handleTabChange('file')}
              className={`btn btn-sm ${activeTab === 'file' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', borderRadius: '10px', marginLeft: '6px' }}
            >
              <FileText size={16} /> File Upload
            </button>
            <button
              onClick={() => handleTabChange('url')}
              className={`btn btn-sm ${activeTab === 'url' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', borderRadius: '10px', marginLeft: '6px' }}
            >
              <Link size={16} /> Scan URL
            </button>
          </div>

          {/* Form Content */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
            {activeTab === 'text' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label">Recruiter Communication / Job Advertisement Text</label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inputText.length} chars</span>
                </div>
                <textarea
                  className="form-input"
                  rows={10}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste the job posting description, recruiter email context, or messenger intake chat details here..."
                  style={{ resize: 'vertical', minHeight: '180px', fontFamily: 'inherit' }}
                />
                
                {/* Input Type categorization dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Message Category:</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {(['text', 'email', 'url'] as const).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setInputType(t)}
                        style={{
                          fontSize: '0.75rem',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          fontWeight: 600,
                          backgroundColor: inputType === t ? 'var(--color-primary-light)22' : 'transparent',
                          borderColor: inputType === t ? 'var(--color-primary-light)' : 'var(--border-color)',
                          color: inputType === t ? 'var(--color-primary-light)' : 'var(--text-secondary)'
                        }}
                      >
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'url' && (
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Job Posting Web Address (URL)</label>
                <input
                  type="url"
                  className="form-input"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://linkedin.com/jobs/view/... or recruiter-site.com/career-job"
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  URL scanning extracts visible job details client-side for safety heuristics parsing.
                </p>
              </div>
            )}

            {activeTab === 'file' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label className="form-label">Upload Job Advertisement File (PDF, TXT, Images)</label>
                
                {/* Drag and Drop Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${dragActive ? 'var(--color-primary)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '48px 24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: dragActive ? 'rgba(99, 102, 241, 0.04)' : 'var(--bg-input)',
                    transition: 'all var(--transition-normal)'
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept=".pdf,.txt,.png,.jpg,.jpeg"
                    style={{ display: 'none' }}
                  />
                  <div className="flex-center" style={{ flexDirection: 'column', gap: '12px' }}>
                    <UploadCloud size={40} style={{ color: selectedFile ? 'var(--color-primary-light)' : 'var(--text-muted)' }} />
                    {selectedFile ? (
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                          <FileType size={16} /> {selectedFile.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {(selectedFile.size / 1024).toFixed(1)} KB - Click to replace file
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Drag and drop file here, or click to browse</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          Supports PDF, TXT, PNG, JPG, JPEG documents (Max 8MB)
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '24px', padding: '14px', borderRadius: '12px', gap: '10px' }}
            >
              <RefreshCw size={18} /> Run Job Security Check
            </button>
          </div>
        </div>

        {/* Info / Quick Demos Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔬 Test Cases
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Load a sample template to test scanning behaviors instantly.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => handlePasteDemo('scam')}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', fontSize: '0.8rem', justifyContent: 'flex-start', borderLeft: '3px solid var(--color-danger)' }}
              >
                ⚠️ Load Fake Check Scam
              </button>
              <button
                onClick={() => handlePasteDemo('safe')}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', fontSize: '0.8rem', justifyContent: 'flex-start', borderLeft: '3px solid var(--color-success)' }}
              >
                ✅ Load Genuine Post
              </button>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', fontSize: '0.8rem', lineHeight: 1.5 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Privacy Notice</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              All parsing, text extraction, and heuristics occur entirely in the sandboxed browser execution layer.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              If a custom OpenRouter key is configured, only the job description is securely queried to the model, and details are never retained on remote logging clusters.
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .detector-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
