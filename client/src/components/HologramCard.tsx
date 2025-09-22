import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface HologramCardProps {
  children: ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'intense' | 'extreme';
  glowColor?: string;
  scanlineSpeed?: number;
  flickerIntensity?: number;
}

const HologramCard: React.FC<HologramCardProps> = ({
  children,
  className = '',
  intensity = 'medium',
  glowColor = '#00f3ff',
  scanlineSpeed = 2000,
  flickerIntensity = 0.1,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);

  const intensitySettings = {
    subtle: {
      tilt: 5,
      glow: 10,
      scanlines: 3,
      parallax: 0.02,
      perspective: 1200,
    },
    medium: {
      tilt: 10,
      glow: 20,
      scanlines: 5,
      parallax: 0.04,
      perspective: 1000,
    },
    intense: {
      tilt: 15,
      glow: 30,
      scanlines: 8,
      parallax: 0.06,
      perspective: 800,
    },
    extreme: {
      tilt: 25,
      glow: 50,
      scanlines: 12,
      parallax: 0.1,
      perspective: 600,
    },
  };

  const settings = intensitySettings[intensity];

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev >= 100 ? 0 : prev + 1));
    }, scanlineSpeed / 100);

    return () => clearInterval(interval);
  }, [scanlineSpeed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const getTransform = () => {
    const { x, y } = mousePosition;
    const rotateY = x * settings.tilt;
    const rotateX = -y * settings.tilt;
    const translateZ = isHovered ? 50 : 0;

    return `perspective(${settings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  };

  const getGlowStyle = () => {
    const glowIntensity = isHovered ? settings.glow * 1.5 : settings.glow;
    return {
      boxShadow: `
        0 0 ${glowIntensity}px ${glowColor}40,
        0 0 ${glowIntensity * 2}px ${glowColor}20,
        0 0 ${glowIntensity * 3}px ${glowColor}10,
        inset 0 0 ${glowIntensity / 2}px ${glowColor}20
      `,
    };
  };

  const getScanlineGradient = () => {
    const opacity = isHovered ? 0.6 : 0.3;
    return {
      background: `
        linear-gradient(
          90deg,
          transparent 0%,
          ${glowColor}${Math.round(opacity * 255).toString(16)} ${scanlinePosition - 2}%,
          ${glowColor}${Math.round(opacity * 128).toString(16)} ${scanlinePosition}%,
          ${glowColor}${Math.round(opacity * 255).toString(16)} ${scanlinePosition + 2}%,
          transparent ${scanlinePosition + 4}%
        ),
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          ${glowColor}${Math.round(flickerIntensity * 255).toString(16)} 2px,
          ${glowColor}${Math.round(flickerIntensity * 255).toString(16)} 4px
        )
      `,
    };
  };

  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu transition-all duration-300 ease-out ${className}`}
      style={{
        transform: getTransform(),
        transformStyle: 'preserve-3d',
        ...getGlowStyle(),
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* Hologram Effects Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70 mix-blend-overlay"
        style={getScanlineGradient()}
      />

      {/* RGB Shift Effect */}
      {intensity === 'extreme' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `
              radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%,
                #ff000020 0%,
                transparent 30%),
              radial-gradient(circle at ${50 - mousePosition.x * 8}% ${50 - mousePosition.y * 8}%,
                #00ff0020 0%,
                transparent 30%),
              radial-gradient(circle at ${50 + mousePosition.x * 6}% ${50 + mousePosition.y * 6}%,
                #0000ff20 0%,
                transparent 30%)
            `,
          }}
        />
      )}

      {/* Border Glow */}
      <div
        className="absolute inset-0 border border-opacity-50 pointer-events-none rounded-lg"
        style={{
          borderColor: glowColor,
          background: `linear-gradient(45deg, ${glowColor}10, transparent 50%, ${glowColor}10)`,
        }}
      />

      {/* Corner Indicators */}
      {(intensity === 'intense' || intensity === 'extreme') && (
        <>
          <div
            className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 opacity-60 animate-pulse"
            style={{ borderColor: glowColor }}
          />
          <div
            className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 opacity-60 animate-pulse"
            style={{ borderColor: glowColor }}
          />
          <div
            className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 opacity-60 animate-pulse"
            style={{ borderColor: glowColor }}
          />
          <div
            className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 opacity-60 animate-pulse"
            style={{ borderColor: glowColor }}
          />
        </>
      )}

      {/* Floating Particles */}
      {intensity === 'extreme' && isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-particle-float"
              style={{
                background: glowColor,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                boxShadow: `0 0 10px ${glowColor}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HologramCard;