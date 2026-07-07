// src/components/UserSearchTable.tsx
import { useState, useMemo } from 'react'
import { useFetchData } from '../hooks/useFetchData'
import type { User } from '../types'

export default function UserSearchTable() {
  const { data: users, loading, error } = useFetchData<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )
  const [search, setSearch] = useState('')

  // In-memory filter (Proposed Exercise)
  const filteredUsers = useMemo(() => {
    if (!users) return []
    const q = search.toLowerCase().trim()
    if (!q) return users
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  }, [users, search])

  if (loading) return <p style={{ color: '#6b7280', fontSize: 14 }}>Cargando usuarios...</p>
  if (error)   return <p style={{ color: '#dc2626', fontSize: 14 }}>Error: {error}</p>

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 580,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Búsqueda de Usuarios en Memoria (Ejercicio Propuesto)
      </h3>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 16 }}>
        Carga la lista una sola vez mediante <code>useFetchData</code> y filtra en memoria para evitar peticiones HTTP por tecla.
      </p>

      <input
        type="text"
        placeholder="Filtrar por nombre, usuario o email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          fontSize: 14,
          boxSizing: 'border-box',
          marginBottom: 16,
          outline: 'none',
        }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            {['ID', 'Nombre', 'Usuario', 'Email'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 600, color: '#4b5563' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '10px 12px', color: '#9ca3af', fontFamily: 'monospace' }}>#{u.id}</td>
              <td style={{ padding: '10px 12px', fontWeight: 600, color: '#111827' }}>{u.name}</td>
              <td style={{ padding: '10px 12px', color: '#4b5563' }}>@{u.username}</td>
              <td style={{ padding: '10px 12px', color: '#4b5563', fontFamily: 'monospace' }}>{u.email}</td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: 24, color: '#9ca3af', fontStyle: 'italic' }}>
                No se encontraron usuarios que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
