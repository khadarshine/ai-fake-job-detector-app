import React, { useEffect, useState } from 'react';

interface TrustMeterProps {
  score: number; // 0 to 100 (Risk Score)
  size?: number;
  strokeWidth?: number;
}

export const TrustMeter: React.FC<TrustMeterProps> = ({
  score,
  size = 180,
  strokeWidth = 14
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Animate the score counting up on load
  useEffect(() => {
    const duration = 1200; // ms
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out quad
      const easedProgress = progress * (2 - progress);
      setAnimatedScore(Math.round(easedProgress * score));
      
      if (currentStep >= steps) {
        setAnimatedScore(score);
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [score]);

  // SVG Calculations
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Convert risk score to offset (0 score is full gauge safe, 100 score is full gauge warning/danger)
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Decide colors based on risk score
  let strokeColor = 'var(--color-success)';
  let glowColor = 'rgba(16, 185, 129, 0.3)';
  let statusText = 'SAFE';
  let statusColor = 'var(--color-success)';

  if (score > 60) {
    strokeColor = 'var(--color-danger)';
    glowColor = 'rgba(239, 68, 68, 0.4)';
    statusText = 'HIGH RISK';
    statusColor = 'var(--color-danger)';
  } else if (score > 25) {
    strokeColor = 'var(--color-warning)';
    glowColor = 'rgba(245, 158, 11, 0.4)';
    statusText = 'SUSPICIOUS';
    statusColor = 'var(--color-warning)';
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: `${size}px`,
      height: `${size}px`
    }}>
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 10px ${glowColor})` }}
      >
        {/* Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-color)"
          strokeWidth={strokeWidth}
        />
        {/* Risk Level Indicator Stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s ease' }}
        />
      </svg>
      
      {/* Center Values */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
      }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '2.5rem',
          lineHeight: '1',
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em'
        }}>
          {animatedScore}%
        </span>
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginTop: '4px'
        }}>
          Risk Factor
        </span>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          color: statusColor,
          letterSpacing: '0.08em',
          marginTop: '6px',
          background: `${statusColor}22`,
          padding: '2px 8px',
          borderRadius: '4px',
          border: `1px solid ${statusColor}44`
        }}>
          {statusText}
        </span>
      </div>
    </div>
  );
};
