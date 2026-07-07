// src/components/ThemeToggle.tsx
import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 20,
        border: '1px solid #e5e7eb',
        background: theme === 'dark' ? '#1f2937' : theme === 'system' ? '#f3f4f6' : '#ffffff',
        color:      theme === 'dark' ? '#ffffff' : '#1f2937',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 13,
        outline: 'none',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
      }}
    >
      {theme === 'light' && (
        <>
          <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <span>Light Theme</span>
        </>
      )}

      {theme === 'dark' && (
        <>
          <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <span>Dark Theme</span>
        </>
      )}

      {theme === 'system' && (
        <>
          <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>System Theme</span>
        </>
      )}
    </button>
  )
}
