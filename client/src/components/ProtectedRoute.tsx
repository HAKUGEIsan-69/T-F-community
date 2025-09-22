import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Login from './Login'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return <>{children}</>
}

export default ProtectedRoute