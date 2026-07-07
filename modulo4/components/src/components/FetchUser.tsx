// src/components/FetchUser.tsx
import React, { useState, useEffect } from 'react'

interface User {
  id:       number
  name:     string
  email:    string
  username: string
  phone:    string
}

export default function FetchUser() {
  const [userId,  setUserId]  = useState(1)
  const [user,    setUser]    = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchUser() {
      setLoading(true)
      setError(null)
      setUser(null)

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        )
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

        const data: User = await res.json()

        if (!cancelled) {
          setUser(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error desconocido')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchUser()

    return () => {
      cancelled = true
    }
  }, [userId])

  const userIds = [1, 2, 3, 4, 5, 999]

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 380,
        fontFamily: 'sans-serif',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Detalle de Usuario (API Fetch)
      </h3>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {userIds.map((id) => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
              background: userId === id ? '#2563eb' : '#fff',
              color:      userId === id ? '#fff'    : '#374151',
              borderColor: userId === id ? '#2563eb' : '#d1d5db',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {id === 999 ? 'Error 404' : `ID ${id}`}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ padding: 20, textAlign: 'center', color: '#6b7280', fontSize: 14 }}>
          Cargando usuario...
        </div>
      )}
      
      {error && (
        <div style={{ padding: '12px 14px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', fontSize: 13, fontWeight: 500 }}>
          ⚠️ Error: {error}
        </div>
      )}
      
      {user && !loading && (
        <div style={{ padding: 16, border: '1px solid #f3f4f6', backgroundColor: '#f9fafb', borderRadius: 8 }}>
          <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#111827', fontSize: 15 }}>{user.name}</p>
          <p style={{ margin: '0 0 6px', fontSize: 13, color: '#2563eb', fontWeight: 500 }}>
            @{user.username}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid #f3f4f6', paddingTop: 8, marginTop: 4, fontSize: 12, color: '#4b5563' }}>
            <span>✉️ {user.email}</span>
            <span>📞 {user.phone}</span>
          </div>
        </div>
      )}
    </div>
  )
}
