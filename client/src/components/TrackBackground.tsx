import React from 'react';

interface TrackBackgroundProps {
  scrollY: number;
  className?: string;
}

const TrackBackground: React.FC<TrackBackgroundProps> = ({ scrollY, className = '' }) => {
  const trackOffset = (scrollY * 0.2) % 200;
  const laneOffset = (scrollY * 0.05) % 20;

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Subtle animated glow effect */}
      <div className="absolute inset-0 bg-glow-effect opacity-30 animate-pulse"></div>

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1400 900"
        className="absolute inset-0 opacity-40"
        style={{
          transform: `translateX(${-trackOffset}px)`,
        }}
      >
        <defs>
          {/* Dark theme track gradient */}
          <linearGradient id="trackGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.1)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.08)" />
          </linearGradient>

          {/* Lane lines with dark theme */}
          <linearGradient id="laneGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(148, 163, 184, 0.3)" />
            <stop offset="100%" stopColor="rgba(148, 163, 184, 0.1)" />
          </linearGradient>

          {/* Subtle track surface pattern */}
          <pattern id="trackPatternDark" patternUnits="userSpaceOnUse" width="120" height="30">
            <rect width="120" height="30" fill="none" />
            <rect width="100" height="1" x="10" y="15" fill="rgba(148, 163, 184, 0.1)" />
          </pattern>

          {/* Glow filter for accent elements */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Partial track curve - more subtle */}
        <path
          d="M100 450 Q100 150 350 150 L1200 150 Q1400 150 1400 450"
          fill="none"
          stroke="url(#trackGradientDark)"
          strokeWidth="120"
          opacity="0.8"
          style={{
            transform: `translateX(${trackOffset * 0.3}px)`,
          }}
        />

        {/* Track lanes - minimalist approach */}
        {[...Array(6)].map((_, i) => (
          <g key={i}>
            <path
              d={`M${150 + i * 20} 450 Q${150 + i * 20} ${200 + i * 8} ${400 + i * 15} ${200 + i * 8} L${1100 - i * 15} ${200 + i * 8} Q${1350 - i * 20} ${200 + i * 8} ${1350 - i * 20} 450`}
              fill="none"
              stroke="url(#laneGradientDark)"
              strokeWidth="0.8"
              opacity={0.5 - i * 0.06}
              style={{
                transform: `translateX(${(trackOffset + laneOffset * i) * 0.2}px)`,
              }}
            />
          </g>
        ))}

        {/* Track surface texture */}
        <path
          d="M100 450 Q100 150 350 150 L1200 150 Q1400 150 1400 450"
          fill="none"
          stroke="url(#trackPatternDark)"
          strokeWidth="100"
          opacity="0.3"
          style={{
            transform: `translateX(${-trackOffset * 0.15}px)`,
          }}
        />

        {/* Subtle start/finish indicators */}
        <g opacity="0.4">
          <rect
            x="500"
            y="150"
            width="3"
            height="300"
            fill="rgba(96, 165, 250, 0.6)"
            filter="url(#glow)"
            style={{
              transform: `translateX(${trackOffset * 0.08}px)`,
            }}
          />
          {/* Dotted line markers */}
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x="500"
              y={160 + i * 35}
              width="3"
              height="8"
              fill={i % 2 === 0 ? "rgba(168, 85, 247, 0.4)" : "rgba(96, 165, 250, 0.4)"}
              style={{
                transform: `translateX(${trackOffset * 0.08}px)`,
              }}
            />
          ))}
        </g>

        {/* Center field - very subtle */}
        <ellipse
          cx="700"
          cy="300"
          rx="200"
          ry="80"
          fill="rgba(168, 85, 247, 0.05)"
          opacity="0.6"
          style={{
            transform: `translate(${trackOffset * 0.03}px, ${Math.sin(scrollY * 0.008) * 3}px)`,
          }}
        />

        {/* Floating accent dots */}
        {[...Array(3)].map((_, i) => (
          <circle
            key={i}
            cx={300 + i * 400}
            cy={250 + Math.sin(i) * 50}
            r="2"
            fill="rgba(96, 165, 250, 0.4)"
            filter="url(#glow)"
            style={{
              transform: `translate(${Math.cos(scrollY * 0.01 + i) * 8}px, ${Math.sin(scrollY * 0.015 + i) * 6}px)`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default TrackBackground;