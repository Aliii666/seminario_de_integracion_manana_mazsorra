// src/components/LiveSearch.tsx
import { useState }    from 'react'
import { useDebounce } from '../hooks/useDebounce'

export default function LiveSearch() {
  const [query, setQuery]  = useState('')
  const debouncedQuery     = useDebounce(query, 500)

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 320,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Búsqueda Asíncrona (useDebounce Hook)
      </h3>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Escribe rápidamente..."
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          fontSize: 14,
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: '#4b5563' }}>
        <div>
          Valor en vivo: <strong style={{ color: '#111827' }}>{query || '—'}</strong>
        </div>
        <div style={{ marginTop: 2 }}>
          Valor debounced (500ms): <strong style={{ color: '#2563eb' }}>{debouncedQuery || '—'}</strong>
        </div>
      </div>
    </div>
  )
}
