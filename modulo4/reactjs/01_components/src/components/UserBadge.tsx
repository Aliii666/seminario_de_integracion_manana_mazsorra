// src/components/UserBadge.tsx
import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function UserBadge() {
  const { state, logout, updateRole } = useAuth()

  if (!state.user) {
    return (
      <div style={{ display: 'inline-flex', padding: '10px 14px', background: '#f3f4f6', borderRadius: 8, border: '1px solid #e5e7eb' }}>
        <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>
          No autenticado (Regístrate o inicia sesión)
        </span>
      </div>
    )
  }

  const initials = state.user.name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 12,
        padding: 16,
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        fontFamily: 'sans-serif',
        maxWidth: 320,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: '#6366f1',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 14,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {initials}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>
            {state.user.name}
          </p>
          <p style={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>
            {state.user.email}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: '#4b5563' }}>Rol de Usuario:</label>
        <select
          value={state.user.role}
          onChange={(e) => updateRole(e.target.value as 'admin' | 'user')}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #d1d5db',
            fontSize: 12,
            backgroundColor: '#fff',
            outline: 'none',
          }}
        >
          <option value="user">User (Usuario Estándar)</option>
          <option value="admin">Admin (Administrador)</option>
        </select>
      </div>

      <button
        onClick={logout}
        style={{
          width: '100%',
          padding: '8px',
          background: '#fee2e2',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 12,
          color: '#991b1b',
          fontWeight: 600,
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  )
}
