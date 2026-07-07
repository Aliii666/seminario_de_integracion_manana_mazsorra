// src/components/AppHeader.tsx
import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth }  from '../contexts/AuthContext'
import ThemeToggle  from './ThemeToggle'
import UserBadge    from './UserBadge'

export default function AppHeader() {
  const { theme } = useTheme()
  const { state: auth } = useAuth()

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderRadius: 12,
    background: theme === 'dark' ? '#1f2937' : '#ffffff',
    color:      theme === 'dark' ? '#ffffff' : '#1f2937',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    fontFamily: 'sans-serif',
    transition: 'background-color 0.3s, color 0.3s',
    gap: 16,
    flexWrap: 'wrap',
  }

  return (
    <header style={headerStyle}>
      <div>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: theme === 'dark' ? '#f9fafb' : '#111827' }}>
          Mi Aplicación
        </h2>
        {auth.user ? (
          <p style={{ margin: '2px 0 0 0', fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
            Panel de {auth.user.role}
          </p>
        ) : (
          <p style={{ margin: '2px 0 0 0', fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }}>
            Sesión inactiva
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <ThemeToggle />
        <UserBadge />
      </div>
    </header>
  )
}
