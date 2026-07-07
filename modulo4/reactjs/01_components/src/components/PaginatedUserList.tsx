// src/components/PaginatedUserList.tsx
import { useFetchData }  from '../hooks/useFetchData'
import { usePagination } from '../hooks/usePagination'
import type { User } from '../types'

const PAGE_SIZE = 3

export default function PaginatedUserList() {
  const { data: users, loading, error } = useFetchData<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )

  const {
    currentPage, totalPages,
    nextPage, prevPage, goToPage,
    startIndex, endIndex,
    canGoNext, canGoPrev,
  } = usePagination({ totalItems: users?.length ?? 0, pageSize: PAGE_SIZE })

  const pageItems = users?.slice(startIndex, endIndex) ?? []

  if (loading) return <p style={{ color: '#6b7280', fontSize: 14 }}>Cargando usuarios...</p>
  if (error)   return <p style={{ color: '#dc2626', fontSize: 14 }}>Error: {error}</p>

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
      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Lista de Usuarios Paginada
      </h3>
      <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12, fontWeight: 500 }}>
        Mostrando {startIndex + 1}–{endIndex} de {users?.length ?? 0} usuarios
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        {pageItems.map(user => (
          <li
            key={user.id}
            style={{ padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 8, backgroundColor: '#f9fafb' }}
          >
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#111827' }}>{user.name}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#4b5563', fontFamily: 'monospace' }}>{user.email}</p>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
        <button onClick={prevPage} disabled={!canGoPrev} style={pgBtnStyle(!canGoPrev)}>
          ← Ant.
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <button
            key={n}
            onClick={() => goToPage(n)}
            style={{
              ...pgBtnStyle(false),
              background:  n === currentPage ? '#2563eb' : '#ffffff',
              color:       n === currentPage ? '#ffffff' : '#374151',
              borderColor: n === currentPage ? '#2563eb' : '#d1d5db',
              fontWeight:  n === currentPage ? 700 : 500,
            }}
          >
            {n}
          </button>
        ))}

        <button onClick={nextPage} disabled={!canGoNext} style={pgBtnStyle(!canGoNext)}>
          Sig. →
        </button>
      </div>
    </div>
  )
}

function pgBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: '6px 12px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    background: '#ffffff',
    color:   disabled ? '#9ca3af' : '#374151',
    cursor:  disabled ? 'not-allowed' : 'pointer',
    fontSize: 13,
    fontWeight: 600,
    outline: 'none',
  }
}
