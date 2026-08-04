import React, { createContext, useContext, useState, useEffect } from 'react';
import { analyzeJobWithAI, analyzeJobOffline } from '../services/ai';

export interface ScoreCategory {
  score: number;
  explanation: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface ScanReport {
  overallRiskScore: number;
  confidence: number;
  scamProbability: number;
  status: 'genuine' | 'suspicious' | 'scam';
  summary: string;
  categories: {
    salaryRealism: ScoreCategory;
    grammarProfessionalism: ScoreCategory;
    domainTrust: ScoreCategory;
    urgencyPressure: ScoreCategory;
    personalInfoRequests: ScoreCategory;
    financialDemands: ScoreCategory;
    interviewProcess: ScoreCategory;
    companyVerification: ScoreCategory;
  };
  issues: string[];
  positives: string[];
  recommendations: string[];
}

export interface ScanItem {
  id: string;
  title: string;
  timestamp: string;
  inputType: 'text' | 'url' | 'email' | 'file';
  inputSnippet: string;
  fullInput: string;
  fileName?: string;
  isFavorite: boolean;
  report: ScanReport;
}

interface AppContextType {
  apiKey: string;
  selectedModel: string;
  theme: 'dark' | 'light';
  animationsEnabled: boolean;
  language: string;
  scans: ScanItem[];
  currentScanId: string | null;
  isScanning: boolean;
  scanProgress: number;
  scanStepText: string;
  saveApiKey: (key: string) => void;
  setSelectedModel: (model: string) => void;
  toggleTheme: () => void;
  toggleAnimations: () => void;
  setLanguage: (lang: string) => void;
  deleteScan: (id: string) => void;
  renameScan: (id: string, newTitle: string) => void;
  toggleFavoriteScan: (id: string) => void;
  clearHistory: () => void;
  importData: (jsonData: string) => boolean;
  exportData: () => string;
  startScan: (input: string, type: 'text' | 'url' | 'email' | 'file', fileName?: string) => Promise<string | null>;
  setCurrentScanId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Safe localStorage fetch
  const getLocalStorage = <T,>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      const parsed = JSON.parse(item);
      return parsed !== null && parsed !== undefined ? (parsed as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // State initialization
  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem('job_detector_api_key') || '';
    } catch {
      return '';
    }
  });
  const [selectedModel, setSelectedModelLocal] = useState<string>(() => {
    return localStorage.getItem('job_detector_model') || 'google/gemini-2.5-flash:free';
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return getLocalStorage<'dark' | 'light'>('job_detector_theme', 'dark');
  });
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(() => {
    return getLocalStorage<boolean>('job_detector_animations', true);
  });
  const [language, setLanguageLocal] = useState<string>(() => {
    return localStorage.getItem('job_detector_lang') || 'en';
  });
  const [scans, setScans] = useState<ScanItem[]>(() => {
    return getLocalStorage<ScanItem[]>('job_detector_scans', []);
  });

  const [currentScanId, setCurrentScanId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStepText, setScanStepText] = useState<string>('');

  // Sync side effects
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('job_detector_theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    if (!animationsEnabled) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
    localStorage.setItem('job_detector_animations', JSON.stringify(animationsEnabled));
  }, [animationsEnabled]);

  // Actions
  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('job_detector_api_key', key);
  };

  const setSelectedModel = (model: string) => {
    setSelectedModelLocal(model);
    localStorage.setItem('job_detector_model', model);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  const setLanguage = (lang: string) => {
    setLanguageLocal(lang);
    localStorage.setItem('job_detector_lang', lang);
  };

  const deleteScan = (id: string) => {
    const updated = scans.filter(s => s.id !== id);
    setScans(updated);
    localStorage.setItem('job_detector_scans', JSON.stringify(updated));
    if (currentScanId === id) {
      setCurrentScanId(null);
    }
  };

  const renameScan = (id: string, newTitle: string) => {
    const updated = scans.map(s => (s.id === id ? { ...s, title: newTitle } : s));
    setScans(updated);
    localStorage.setItem('job_detector_scans', JSON.stringify(updated));
  };

  const toggleFavoriteScan = (id: string) => {
    const updated = scans.map(s => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s));
    setScans(updated);
    localStorage.setItem('job_detector_scans', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setScans([]);
    localStorage.removeItem('job_detector_scans');
    setCurrentScanId(null);
  };

  const exportData = () => {
    const backup = {
      apiKey,
      selectedModel,
      theme,
      animationsEnabled,
      language,
      scans
    };
    return JSON.stringify(backup, null, 2);
  };

  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.scans && Array.isArray(parsed.scans)) {
        if (parsed.apiKey !== undefined) saveApiKey(parsed.apiKey);
        if (parsed.selectedModel !== undefined) setSelectedModel(parsed.selectedModel);
        if (parsed.theme !== undefined) setTheme(parsed.theme);
        if (parsed.animationsEnabled !== undefined) setAnimationsEnabled(parsed.animationsEnabled);
        if (parsed.language !== undefined) setLanguage(parsed.language);
        
        setScans(parsed.scans);
        localStorage.setItem('job_detector_scans', JSON.stringify(parsed.scans));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Main scanning action
  const startScan = async (
    input: string,
    inputType: 'text' | 'url' | 'email' | 'file',
    fileName?: string
  ): Promise<string | null> => {
    if (!input.trim()) return null;

    setIsScanning(true);
    setScanProgress(5);
    setScanStepText('Initializing cybersecurity scanners...');

    // Progress bar helper
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      // Step 1: Init (5% -> 20%)
      await delay(600);
      setScanProgress(20);
      setScanStepText('Parsing job description semantics and layout...');

      // Step 2: Salary/Grammar (20% -> 45%)
      await delay(800);
      setScanProgress(45);
      setScanStepText('Evaluating compensation structures & writing style...');

      // Step 3: Domain Verification (45% -> 70%)
      await delay(700);
      setScanProgress(70);
      setScanStepText('Verifying company domain registries and security trust...');

      // Step 4: Final Scoring Heuristics (70% -> 90%)
      await delay(800);
      setScanProgress(90);
      setScanStepText('Synthesizing risk assessment report with AI modules...');

      // Run either LLM or local Heuristics
      let report: ScanReport;
      if (apiKey.trim()) {
        try {
          report = await analyzeJobWithAI(input, apiKey, selectedModel);
        } catch (apiErr) {
          console.warn('API error, falling back to heuristics:', apiErr);
          // Fallback if API fails
          report = analyzeJobOffline(input);
        }
      } else {
        // Safe offline heuristics
        report = analyzeJobOffline(input);
      }

      await delay(400);
      setScanProgress(100);
      setScanStepText('Scan report compiled successfully.');

      // Title creation
      let title = 'Scan Result';
      if (inputType === 'file' && fileName) {
        title = `Doc: ${fileName}`;
      } else {
        // Extract 3-5 words from text as Title
        const words = input.trim().replace(/[^\w\s]/g, '').split(/\s+/).slice(0, 4);
        title = words.length > 0 ? words.join(' ') : 'Pasted Job Content';
        if (title.length > 30) title = title.substring(0, 30) + '...';
        if (inputType === 'url') title = `URL: ${title}`;
        if (inputType === 'email') title = `Email: ${title}`;
      }

      const scanItem: ScanItem = {
        id: `scan_${Date.now()}`,
        title: title.charAt(0).toUpperCase() + title.slice(1),
        timestamp: new Date().toISOString(),
        inputType,
        inputSnippet: input.substring(0, 200) + (input.length > 200 ? '...' : ''),
        fullInput: input,
        fileName,
        isFavorite: false,
        report
      };

      setScans(prev => [scanItem, ...prev]);
      localStorage.setItem('job_detector_scans', JSON.stringify([scanItem, ...scans]));
      setCurrentScanId(scanItem.id);
      setIsScanning(false);
      return scanItem.id;
    } catch (error) {
      console.error('Scan system encountered a fatal error:', error);
      setIsScanning(false);
      return null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        apiKey,
        selectedModel,
        theme,
        animationsEnabled,
        language,
        scans,
        currentScanId,
        isScanning,
        scanProgress,
        scanStepText,
        saveApiKey,
        setSelectedModel,
        toggleTheme,
        toggleAnimations,
        setLanguage,
        deleteScan,
        renameScan,
        toggleFavoriteScan,
        clearHistory,
        importData,
        exportData,
        startScan,
        setCurrentScanId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
