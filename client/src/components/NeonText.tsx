import React, { useState, useRef, useEffect } from 'react';

interface NeonTextProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: string;
  glowIntensity?: 'low' | 'medium' | 'high' | 'extreme';
  animation?: 'none' | 'flicker' | 'pulse' | 'wave' | 'typing' | 'glitch';
  speed?: 'slow' | 'medium' | 'fast';
  flickerChance?: number;
}

const NeonText: React.FC<NeonTextProps> = ({
  text,
  className = '',
  size = 'lg',
  color = '#00f3ff',
  glowIntensity = 'medium',
  animation = 'pulse',
  speed = 'medium',
  flickerChance = 0.96,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [glitchText, setGlitchText] = useState(text);
  const textRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-4xl',
    '3xl': 'text-6xl',
  };

  const speedSettings = {
    slow: { typing: 150, glitch: 200, wave: 3000 },
    medium: { typing: 100, glitch: 100, wave: 2000 },
    fast: { typing: 50, glitch: 50, wave: 1000 },
  };

  const glowSettings = {
    low: {
      textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}`,
      filter: `drop-shadow(0 0 5px ${color})`,
    },
    medium: {
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}`,
      filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
    },
    high: {
      textShadow: `0 0 15px ${color}, 0 0 30px ${color}, 0 0 45px ${color}, 0 0 60px ${color}, 0 0 75px ${color}`,
      filter: `drop-shadow(0 0 15px ${color}) drop-shadow(0 0 30px ${color}) drop-shadow(0 0 45px ${color})`,
    },
    extreme: {
      textShadow: `
        0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color}, 0 0 80px ${color}, 0 0 100px ${color},
        0 0 120px ${color}, 0 0 140px ${color}
      `,
      filter: `
        drop-shadow(0 0 20px ${color}) drop-shadow(0 0 40px ${color})
        drop-shadow(0 0 60px ${color}) drop-shadow(0 0 80px ${color})
      `,
    },
  };

  const getRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]|;:,.<>?';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const generateGlitchText = (originalText: string) => {
    return originalText
      .split('')
      .map((char) => {
        if (char === ' ') return char;
        return Math.random() < 0.3 ? getRandomChar() : char;
      })
      .join('');
  };

  // Typing Animation
  useEffect(() => {
    if (animation !== 'typing') {
      setDisplayText(text);
      return;
    }

    setIsTyping(true);
    setDisplayText('');
    let i = 0;

    const typeInterval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;

      if (i >= text.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, speedSettings[speed].typing);

    return () => clearInterval(typeInterval);
  }, [text, animation, speed]);

  // Glitch Animation
  useEffect(() => {
    if (animation !== 'glitch') return;

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchText(generateGlitchText(text));
        setTimeout(() => setGlitchText(text), 100);
      }
    }, speedSettings[speed].glitch);

    return () => clearInterval(glitchInterval);
  }, [text, animation, speed]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'flicker':
        return 'animate-pulse';
      case 'pulse':
        return 'animate-pulse-neon';
      case 'wave':
        return 'animate-glow-intense';
      default:
        return '';
    }
  };

  const getTextContent = () => {
    switch (animation) {
      case 'typing':
        return displayText + (isTyping ? '_' : '');
      case 'glitch':
        return glitchText;
      default:
        return text;
    }
  };

  // Flicker effect
  const [shouldFlicker, setShouldFlicker] = useState(true);
  useEffect(() => {
    if (animation !== 'flicker') return;

    const flickerInterval = setInterval(() => {
      setShouldFlicker(Math.random() > 1 - flickerChance);
    }, 50);

    return () => clearInterval(flickerInterval);
  }, [animation, flickerChance]);

  const getTextStyle = () => {
    const baseStyle = {
      color: color,
      ...glowSettings[glowIntensity],
      fontFamily: '"Orbitron", "JetBrains Mono", monospace',
      fontWeight: 'bold',
      letterSpacing: '0.1em',
      userSelect: 'none' as const,
      WebkitTextStroke: `1px ${color}40`,
    };

    if (animation === 'flicker' && !shouldFlicker) {
      return {
        ...baseStyle,
        opacity: 0.3,
        textShadow: `0 0 2px ${color}`,
        filter: 'none',
      };
    }

    return baseStyle;
  };

  // Wave animation for individual characters
  const renderWaveText = () => {
    if (animation !== 'wave') return getTextContent();

    return getTextContent()
      .split('')
      .map((char, index) => (
        <span
          key={index}
          className="inline-block animate-float"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
  };

  return (
    <div
      ref={textRef}
      className={`
        ${sizeClasses[size]}
        ${getAnimationClass()}
        ${className}
        relative inline-block
      `}
      style={getTextStyle()}
    >
      {animation === 'wave' ? renderWaveText() : getTextContent()}

      {/* Additional glow layers for extreme intensity */}
      {glowIntensity === 'extreme' && (
        <>
          <div
            className="absolute inset-0 blur-sm opacity-50"
            style={{ color: color }}
          >
            {getTextContent()}
          </div>
          <div
            className="absolute inset-0 blur-md opacity-30"
            style={{ color: color }}
          >
            {getTextContent()}
          </div>
        </>
      )}

      {/* Scanline overlay for cyberpunk effect */}
      {(glowIntensity === 'high' || glowIntensity === 'extreme') && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              ${color}10 2px,
              ${color}10 4px
            )`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
};

export default NeonText;