import React from 'react';

// --- TREND LINE CHART ---
interface TrendLineChartProps {
  data: number[]; // Array of scores, e.g. [12, 45, 80, 20, 50]
  width?: number;
  height?: number;
}

export const TrendLineChart: React.FC<TrendLineChartProps> = ({
  data,
  width = 500,
  height = 150
}) => {
  if (data.length === 0) {
    return (
      <div style={{ height: `${height}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        No historical scans.
      </div>
    );
  }

  // Handle single data point
  const points = data.length === 1 ? [data[0], data[0]] : data;

  const maxVal = 100;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Calculate coordinates
  const coordinates = points.map((val, idx) => {
    const x = padding + (idx / (points.length - 1)) * chartWidth;
    // In SVG, Y goes down, so we subtract from height
    const y = padding + chartHeight - (val / maxVal) * chartHeight;
    return { x, y };
  });

  // Construct SVG Path
  let pathD = `M ${coordinates[0].x} ${coordinates[0].y}`;
  for (let i = 1; i < coordinates.length; i++) {
    pathD += ` L ${coordinates[i].x} ${coordinates[i].y}`;
  }

  // Construct Area Path (for gradient fill under the line)
  const areaD = `${pathD} L ${coordinates[coordinates.length - 1].x} ${height - padding} L ${coordinates[0].x} ${height - padding} Z`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid Lines */}
      <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="var(--border-color)" strokeDasharray="4 4" />
      <line x1={padding} y1={padding + chartHeight / 2} x2={width - padding} y2={padding + chartHeight / 2} stroke="var(--border-color)" strokeDasharray="4 4" />
      <line x1={padding} y1={padding + chartHeight} x2={width - padding} y2={padding + chartHeight} stroke="var(--border-color)" />

      {/* Filled Area */}
      <path d={areaD} fill="url(#chartGradient)" />

      {/* Line Path */}
      <path
        d={pathD}
        fill="none"
        stroke="var(--color-primary-light)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Interactive Value Circles */}
      {coordinates.map((pt, idx) => (
        <g key={idx}>
          <circle
            cx={pt.x}
            cy={pt.y}
            r={5}
            fill="var(--bg-app)"
            stroke="var(--color-primary-light)"
            strokeWidth={3}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
          />
          <text
            x={pt.x}
            y={pt.y - 10}
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="10"
            fontWeight="bold"
            fontFamily="var(--font-heading)"
          >
            {points[idx]}%
          </text>
        </g>
      ))}
    </svg>
  );
};


// --- RISK CATEGORY BAR CHART ---
interface CategoryBarChartProps {
  categories: {
    label: string;
    score: number;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
}

export const CategoryBarChart: React.FC<CategoryBarChartProps> = ({ categories }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {categories.map((cat, idx) => {
        let barColor = 'var(--color-success)';
        if (cat.riskLevel === 'high') barColor = 'var(--color-danger)';
        else if (cat.riskLevel === 'medium') barColor = 'var(--color-warning)';

        return (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cat.label}</span>
              <span style={{ fontWeight: 700, color: barColor }}>{cat.score}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--bg-input)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${cat.score}%`,
                height: '100%',
                backgroundColor: barColor,
                borderRadius: 'var(--radius-full)',
                boxShadow: `0 0 8px ${barColor}55`,
                transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};


// --- RISK DISTRIBUTION DONUT ---
interface DonutData {
  label: string;
  value: number;
  color: string;
}

interface RiskDonutChartProps {
  data: DonutData[];
  size?: number;
}

export const RiskDonutChart: React.FC<RiskDonutChartProps> = ({
  data,
  size = 160
}) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  if (total === 0) {
    return (
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: '4px dashed var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        No Data
      </div>
    );
  }

  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  let accumulatedPercent = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {data.map((item, idx) => {
            if (item.value === 0) return null;
            const percent = item.value / total;
            const strokeLength = percent * circumference;
            const rotationOffset = (accumulatedPercent / 100) * circumference;
            accumulatedPercent += percent * 100;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={-rotationOffset}
                strokeLinecap={percent === 1 ? 'butt' : 'round'}
                style={{
                  transition: 'all 0.5s ease',
                  cursor: 'pointer',
                  filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
                }}
              />
            );
          })}
        </svg>

        {/* Center Total Count */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{total}</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Total Scans</span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.map((item, idx) => {
          if (item.value === 0) return null;
          const percent = Math.round((item.value / total) * 100);
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: item.color }} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
              <span style={{ color: 'var(--text-muted)' }}>({item.value} / {percent}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
