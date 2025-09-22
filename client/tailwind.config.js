/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ダークテーマメインカラー
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // アクセントカラー（統一感のある青系）
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // トラック・陸上テーマカラー（ダーク調整済み）
        track: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // グラデーション用
        glow: {
          blue: '#60a5fa',
          purple: '#a855f7',
          pink: '#ec4899',
          orange: '#f97316',
          cyan: '#06b6d4',
          lime: '#84cc16',
          yellow: '#eab308',
        },
        // ネオン効果用カラー
        neon: {
          blue: '#00f3ff',
          purple: '#bf00ff',
          pink: '#ff0099',
          green: '#00ff41',
          orange: '#ff8c00',
        }
      },
      backgroundImage: {
        // ダークテーマ用グラデーション
        'dark-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'dark-glow': 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
        'track-dark': 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(249, 115, 22, 0.2) 50%, rgba(168, 85, 247, 0.2) 100%)',
        'card-dark': 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)',
        'hero-dark': 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.8) 100%)',
        'glow-effect': 'radial-gradient(circle at center, rgba(96, 165, 250, 0.15) 0%, transparent 70%)',
        // 既存のライトテーマ用（必要時用）
        'track-gradient': 'linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(249, 115, 22, 0.6) 50%, rgba(234, 179, 8, 0.4) 100%)',
        'field-gradient': 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(22, 163, 74, 0.5) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'track-move': 'trackMove 20s linear infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'glow-intense': 'glowIntense 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'matrix-rain': 'matrixRain 1s linear infinite',
        'particle-float': 'particleFloat 8s ease-in-out infinite',
        'hologram': 'hologram 4s linear infinite',
        'cyber-glitch': 'cyberGlitch 2s linear infinite',
        'aurora': 'aurora 10s linear infinite',
        'magnetic-pull': 'magneticPull 3s ease-out',
        'quantum-leap': 'quantumLeap 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        trackMove: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-100px)' },
        },
        pulseNeon: {
          '0%, 100%': {
            boxShadow: '0 0 20px #00f3ff, 0 0 40px #00f3ff, 0 0 80px #00f3ff',
            transform: 'scale(1)'
          },
          '50%': {
            boxShadow: '0 0 30px #bf00ff, 0 0 60px #bf00ff, 0 0 120px #bf00ff',
            transform: 'scale(1.05)'
          },
        },
        glowIntense: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.8)) drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))'
          },
          '33%': {
            filter: 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 30px rgba(249, 115, 22, 0.6))'
          },
          '66%': {
            filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 40px rgba(132, 204, 22, 0.6))'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(120deg)' },
          '66%': { transform: 'translateY(-10px) rotate(240deg)' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        particleFloat: {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
            opacity: '0.8'
          },
          '25%': {
            transform: 'translate3d(30px, -40px, 20px) rotate(90deg) scale(1.1)',
            opacity: '1'
          },
          '50%': {
            transform: 'translate3d(-20px, -80px, -10px) rotate(180deg) scale(0.9)',
            opacity: '0.9'
          },
          '75%': {
            transform: 'translate3d(-40px, -40px, 30px) rotate(270deg) scale(1.05)',
            opacity: '1'
          },
        },
        hologram: {
          '0%, 100%': {
            opacity: '0.8',
            transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
          },
          '25%': {
            opacity: '1',
            transform: 'perspective(1000px) rotateY(5deg) rotateX(2deg)'
          },
          '50%': {
            opacity: '0.9',
            transform: 'perspective(1000px) rotateY(0deg) rotateX(5deg)'
          },
          '75%': {
            opacity: '1',
            transform: 'perspective(1000px) rotateY(-5deg) rotateX(-2deg)'
          },
        },
        cyberGlitch: {
          '0%, 90%, 100%': {
            transform: 'translate(0, 0)',
            filter: 'hue-rotate(0deg)'
          },
          '10%': {
            transform: 'translate(2px, 1px)',
            filter: 'hue-rotate(90deg)'
          },
          '20%': {
            transform: 'translate(-1px, 2px)',
            filter: 'hue-rotate(180deg)'
          },
          '30%': {
            transform: 'translate(-3px, -1px)',
            filter: 'hue-rotate(270deg)'
          },
        },
        aurora: {
          '0%, 100%': {
            background: 'linear-gradient(45deg, rgba(0, 243, 255, 0.1), rgba(191, 0, 255, 0.1), rgba(255, 0, 153, 0.1))'
          },
          '33%': {
            background: 'linear-gradient(135deg, rgba(191, 0, 255, 0.1), rgba(255, 0, 153, 0.1), rgba(0, 255, 65, 0.1))'
          },
          '66%': {
            background: 'linear-gradient(225deg, rgba(255, 0, 153, 0.1), rgba(0, 255, 65, 0.1), rgba(255, 140, 0, 0.1))'
          },
        },
        magneticPull: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(5deg)' },
          '100%': { transform: 'scale(1.05) rotate(0deg)' },
        },
        quantumLeap: {
          '0%': {
            transform: 'translateY(0px) scale(1)',
            opacity: '1'
          },
          '30%': {
            transform: 'translateY(-50px) scale(1.2)',
            opacity: '0.7'
          },
          '60%': {
            transform: 'translateY(-100px) scale(0.8)',
            opacity: '0.3'
          },
          '100%': {
            transform: 'translateY(0px) scale(1)',
            opacity: '1'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}