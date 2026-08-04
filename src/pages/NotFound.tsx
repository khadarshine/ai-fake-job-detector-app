import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="container flex-center animate-slide-up" style={{ minHeight: '70vh', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
      <div className="flex-center animate-bounce" style={{
        background: 'rgba(239, 68, 68, 0.08)',
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        color: 'var(--color-danger)'
      }}>
        <ShieldAlert size={36} />
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>404 - Route Obscured</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
        The safety scanner could not locate this page route. It may have been deprecated or moved.
      </p>
      <button onClick={() => navigate('/')} className="btn btn-primary" style={{ gap: '8px' }}>
        Back to Safe Zone <ArrowRight size={16} />
      </button>
    </div>
  );
};
