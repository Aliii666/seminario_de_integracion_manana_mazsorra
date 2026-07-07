// src/components/UserListWithRefetch.tsx
import { useState, useEffect } from 'react'
import { useFetchData } from '../hooks/useFetchData'
import type { User } from '../types'

export default function UserListWithRefetch() {
  const { data: users, loading, error, refetch } = useFetchData<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )
  const [lastLoaded, setLastLoaded] = useState<string | null>(null)

  // Track the timestamp of the last successful data retrieval (Proposed Exercise)
  useEffect(() => {
    if (users) {
      setLastLoaded(new Date().toLocaleTimeString())
    }
  }, [users])

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 440,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: '#4b5563', fontWeight: 600 }}>
          {loading ? 'Cargando...' : `${users?.length ?? 0} usuarios`}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <button
            onClick={refetch}
            disabled={loading}
            style={{
              padding: '6px 14px',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              background: '#ffffff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 13,
              fontWeight: 600,
              outline: 'none',
            }}
          >
            {loading ? 'Cargando...' : '↺ Recargar'}
          </button>
          {lastLoaded && (
            <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>
              Recargado: {lastLoaded}
            </span>
          )}
        </div>
      </div>

      {error && <p style={{ color: '#dc2626', fontSize: 13, fontWeight: 500 }}>⚠️ Error: {error}</p>}

      {users && !loading && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {users.map(user => (
            <li
              key={user.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                backgroundColor: '#f9fafb',
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{user.name}</span>
              <span style={{ fontSize: 13, color: '#4b5563', fontFamily: 'monospace' }}>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
