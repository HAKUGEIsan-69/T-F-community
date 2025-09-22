import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Calendar, Bell, Trophy, Users, Zap, LogOut } from 'lucide-react';
import './App.css';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Announcements from './components/Announcements';
import Records from './components/Records';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: '/', label: 'ダッシュボード', icon: Users },
    { path: '/schedule', label: '練習スケジュール', icon: Calendar },
    { path: '/announcements', label: 'お知らせ', icon: Bell },
    { path: '/records', label: '記録管理', icon: Trophy },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="relative">
        {/* Header */}
        <header className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700 shadow-lg">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 rounded-full">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">雲雀丘学園陸上部</h1>
              </div>

              {/* User Info and Logout */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-white font-medium">{user?.name || 'ユーザー'}</p>
                  <p className="text-sm text-slate-400">
                    {user?.grade}年 {user?.class_name}組
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ログアウト</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-slate-700/90 backdrop-blur-sm shadow-lg sticky top-0 z-30">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-2">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center px-6 py-4 text-sm font-semibold transition-all duration-200 rounded-lg ${
                      isActive
                        ? 'text-white bg-blue-600 shadow-lg'
                        : 'text-slate-200 hover:text-white hover:bg-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/records" element={<Records />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-800/90 backdrop-blur-sm border-t border-slate-700 text-slate-200 py-12 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">雲雀丘学園陸上部</h2>
            </div>
            <p className="text-slate-300 mb-6">限界を超えて、夢に向かって走り続けよう</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProtectedRoute>
          <AppContent />
        </ProtectedRoute>
      </AuthProvider>
    </Router>
  );
}

export default App;