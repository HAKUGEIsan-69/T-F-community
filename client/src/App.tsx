import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Calendar, Bell, Trophy, Users, Zap } from 'lucide-react';
import './App.css';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Announcements from './components/Announcements';
import Records from './components/Records';
import TrackBackground from './components/TrackBackground';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import HologramCard from './components/HologramCard';
import NeonText from './components/NeonText';
import ParticleField from './components/ParticleField';

function AppContent() {
  const location = useLocation();
  const { scrollY } = useScrollAnimation();

  const navItems = [
    { path: '/', label: 'ダッシュボード', icon: Users, color: 'athletic-blue' },
    { path: '/schedule', label: '練習スケジュール', icon: Calendar, color: 'athletic-orange' },
    { path: '/announcements', label: 'お知らせ', icon: Bell, color: 'athletic-yellow' },
    { path: '/records', label: '記録管理', icon: Trophy, color: 'athletic-red' },
  ];

  return (
    <div className="min-h-screen bg-dark-gradient relative overflow-x-hidden">
      {/* Global Particle Field */}
      <ParticleField
        particleCount={100}
        intensity="medium"
        colors={['#00f3ff', '#bf00ff', '#ff0099', '#00ff41', '#ff8c00', '#60a5fa', '#a855f7', '#06b6d4']}
        interactive={true}
        className="fixed inset-0 z-0"
      />

      {/* Track Background */}
      <TrackBackground scrollY={scrollY} className="z-1" />

      {/* Content Overlay */}
      <div className="relative z-20">
        {/* Header */}
        <HologramCard
          intensity="extreme"
          glowColor="#00f3ff"
          className="border-none rounded-none"
        >
          <header className="bg-hero-dark backdrop-blur-xl border-b border-dark-600/30 shadow-2xl animate-aurora">
            <div className="container mx-auto px-4 py-12">
              <div className="flex items-center justify-center space-x-6">
                <div className="p-4 bg-gradient-to-br from-accent-500/30 to-glow-purple/30 rounded-full backdrop-blur-sm border border-accent-400/50 animate-magnetic-pull">
                  <Zap className="w-12 h-12 text-accent-400 animate-cyber-glitch" />
                </div>
                <NeonText
                  text="雲雀丘学園陸上部"
                  size="3xl"
                  color="#00f3ff"
                  glowIntensity="extreme"
                  animation="glitch"
                  speed="slow"
                />
              </div>
            </div>
          </header>
        </HologramCard>

        {/* Navigation */}
        <HologramCard
          intensity="intense"
          glowColor="#bf00ff"
          className="border-none rounded-none sticky top-0 z-30"
        >
          <nav className="bg-dark-800/95 backdrop-blur-xl shadow-2xl border-b border-dark-600/30 animate-hologram">
            <div className="container mx-auto px-4">
              <div className="flex justify-center space-x-3">
                {navItems.map(({ path, label, icon: Icon }) => {
                  const isActive = location.pathname === path;
                  return (
                    <HologramCard
                      key={path}
                      intensity={isActive ? "extreme" : "subtle"}
                      glowColor={isActive ? "#00f3ff" : "#bf00ff"}
                      className="rounded-lg"
                    >
                      <Link
                        to={path}
                        className={`flex items-center px-8 py-5 text-sm font-bold transition-all duration-700 relative group rounded-lg transform hover:scale-110 ${
                          isActive
                            ? 'text-neon-blue bg-gradient-to-r from-accent-500/30 to-glow-purple/30 shadow-2xl border border-accent-500/50 animate-pulse-neon'
                            : 'text-dark-200 hover:text-neon-purple hover:bg-dark-700/60 hover:shadow-xl'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mr-4 transition-all duration-500 ${
                          isActive
                            ? 'scale-125 text-neon-blue animate-cyber-glitch'
                            : 'group-hover:scale-115 group-hover:text-neon-purple group-hover:animate-magnetic-pull'
                        }`} />
                        <NeonText
                          text={label}
                          size="sm"
                          color={isActive ? "#00f3ff" : "#bf00ff"}
                          glowIntensity={isActive ? "high" : "medium"}
                          animation={isActive ? "flicker" : "none"}
                          flickerChance={0.98}
                        />
                        {isActive && (
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-neon-blue rounded-full animate-quantum-leap shadow-2xl shadow-neon-blue/80"></div>
                        )}
                      </Link>
                    </HologramCard>
                  );
                })}
              </div>
            </div>
          </nav>
        </HologramCard>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 relative z-10 min-h-screen">
          <div
            className="animate-fade-in"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/records" element={<Records />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <HologramCard
          intensity="extreme"
          glowColor="#ff0099"
          className="border-none rounded-none mt-20"
        >
          <footer className="bg-dark-900/95 backdrop-blur-xl border-t border-dark-600/30 text-dark-200 py-16 relative z-10 animate-aurora">
            <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-accent-500/30 to-glow-purple/30 rounded-xl shadow-2xl animate-magnetic-pull">
                  <Zap className="w-8 h-8 text-accent-400 animate-cyber-glitch" />
                </div>
                <NeonText
                  text="雲雀丘学園陸上部"
                  size="xl"
                  color="#ff0099"
                  glowIntensity="extreme"
                  animation="wave"
                  speed="slow"
                />
              </div>
              <NeonText
                text="限界を超えて、夢に向かって走り続けよう"
                size="md"
                color="#00f3ff"
                glowIntensity="high"
                animation="typing"
                speed="medium"
                className="mb-8"
              />
              <div className="w-24 h-2 bg-gradient-to-r from-accent-500 via-glow-purple to-neon-pink rounded-full mx-auto animate-pulse-neon shadow-2xl shadow-accent-500/50"></div>

              {/* Cyberpunk corner elements */}
              <div className="absolute top-6 left-6 w-8 h-8 border-l-3 border-t-3 border-neon-blue opacity-60 animate-pulse"></div>
              <div className="absolute top-6 right-6 w-8 h-8 border-r-3 border-t-3 border-neon-purple opacity-60 animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-8 h-8 border-l-3 border-b-3 border-neon-green opacity-60 animate-pulse"></div>
              <div className="absolute bottom-6 right-6 w-8 h-8 border-r-3 border-b-3 border-neon-orange opacity-60 animate-pulse"></div>
            </div>
          </footer>
        </HologramCard>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;