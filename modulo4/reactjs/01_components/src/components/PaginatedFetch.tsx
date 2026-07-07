// src/components/PaginatedFetch.tsx
import { useState, useCallback, useEffect } from 'react'

interface User {
  id:       number
  name:     string
  email:    string
  username: string
}

const PAGE_SIZE = 5

export default function PaginatedFetch() {
  const [page,    setPage]    = useState(1)
  const [users,   setUsers]   = useState<User[]>([])
  const [total,   setTotal]   = useState(0)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  // useCallback: fetchPage is recreated only when `page` changes
  const fetchPage = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const start = (page - 1) * PAGE_SIZE
      const res   = await fetch(
        `https://jsonplaceholder.typicode.com/users?_start=${start}&_limit=${PAGE_SIZE}`
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      
      const totalCount = Number(res.headers.get('x-total-count') ?? 10)
      const data: User[] = await res.json()
      setUsers(data)
      setTotal(totalCount)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => { 
    fetchPage() 
  }, [fetchPage])

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 540,
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Paginación de API (useCallback)
      </h3>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
        <code>useCallback</code> con <code>[page]</code> como dependencia recrea la función de fetch al cambiar de página.
      </p>

      {error && (
        <div style={{
          padding:    12,
          background: '#fef2f2',
          border:     '1px solid #fca5a5',
          borderRadius: 8,
          color:      '#b91c1c',
          marginBottom: 16,
          fontSize:   13,
          fontWeight: 500,
        }}>
          ⚠️ Error: {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: '#6b7280', fontSize: 14, fontWeight: 500 }}>
          Cargando usuarios...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {users.map(u => (
            <div key={u.id} style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              padding:        '10px 14px',
              background:     '#f9fafb',
              borderRadius:   8,
              border:         '1px solid #e5e7eb',
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{u.name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>@{u.username}</div>
              </div>
              <div style={{ fontSize: 13, color: '#4b5563', fontFamily: 'monospace' }}>{u.email}</div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={() => setPage(1)}
          disabled={page === 1 || loading}
          style={navBtnStyle}
        >«</button>
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
          style={navBtnStyle}
        >‹</button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            disabled={loading}
            style={{
              ...navBtnStyle,
              borderColor: p === page ? '#2563eb' : '#d1d5db',
              background:  p === page ? '#2563eb' : '#ffffff',
              color:       p === page ? '#ffffff'  : '#374151',
              fontWeight:  p === page ? 700 : 500,
            }}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
          style={navBtnStyle}
        >›</button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages || loading}
          style={navBtnStyle}
        >»</button>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 12, fontWeight: 500 }}>
        Página {page} de {totalPages} · {total} usuarios en total
      </p>
    </div>
  )
}

const navBtnStyle = {
  padding: '6px 12px',
  borderRadius: 8,
  border: '1px solid #d1d5db',
  background: '#ffffff',
  color: '#374151',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 600,
  outline: 'none',
}
