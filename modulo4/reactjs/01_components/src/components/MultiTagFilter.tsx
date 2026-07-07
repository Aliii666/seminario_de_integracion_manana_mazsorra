// src/components/MultiTagFilter.tsx
import { useState, useMemo } from 'react'

interface Article {
  id:    number
  title: string
  tags:  string[]
  views: number
}

const ARTICLES: Article[] = [
  { id: 1, title: 'Introducción a React Hooks',        tags: ['react', 'hooks', 'tutorial'],    views: 4200 },
  { id: 2, title: 'TypeScript con React: guía práctica',tags: ['typescript', 'react', 'guía'], views: 3100 },
  { id: 3, title: 'useMemo y useCallback explicados',   tags: ['react', 'hooks', 'performance'],views: 2800 },
  { id: 4, title: 'CSS Modules vs Styled Components',   tags: ['css', 'estilos', 'react'],      views: 1900 },
  { id: 5, title: 'TanStack Query desde cero',          tags: ['react', 'fetch', 'tutorial'],   views: 5100 },
  { id: 6, title: 'Testing con Vitest y Testing Library',tags:['testing', 'react', 'tutorial'], views: 2200 },
  { id: 7, title: 'Performance en React: técnicas clave',tags:['react', 'performance', 'hooks'],views: 3600 },
  { id: 8, title: 'TypeScript strict mode explicado',   tags: ['typescript', 'guía'],           views: 1500 },
]

export default function MultiTagFilter() {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [sortByViews, setSortByViews] = useState(false)

  // Accumulate unique tags with counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    ARTICLES.forEach(a => a.tags.forEach(t => { counts[t] = (counts[t] ?? 0) + 1 }))
    return counts
  }, []) // ARTICLES is static

  // Articles with ALL active tags (AND filter)
  const filtered = useMemo(() => {
    if (activeTags.size === 0) return ARTICLES
    return ARTICLES.filter(a => [...activeTags].every(t => a.tags.includes(t)))
  }, [activeTags])

  // Sorted output
  const sorted = useMemo(
    () => sortByViews
      ? [...filtered].sort((a, b) => b.views - a.views)
      : filtered,
    [filtered, sortByViews]
  )

  function toggleTag(tag: string) {
    setActiveTags(prev => {
      const next = new Set(prev)
      next.has(tag) ? next.delete(tag) : next.add(tag)
      return next
    })
  }

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 580,
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Filtro de Tags Múltiples (Filtro AND)
      </h3>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
        Filtros cruzados con intersección (AND) y listado de frecuencia de tags memoizado estáticamente.
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {Object.entries(tagCounts).map(([tag, count]) => {
          const active = activeTags.has(tag)
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                padding:      '6px 12px',
                borderRadius: 20,
                border:       '1px solid',
                borderColor:  active ? '#2563eb' : '#d1d5db',
                background:   active ? '#2563eb' : '#ffffff',
                color:        active ? '#ffffff' : '#374151',
                fontSize:     12,
                cursor:       'pointer',
                fontWeight:   active ? 700 : 500,
                outline: 'none',
                transition: 'all 0.15s',
              }}
            >
              #{tag} <span style={{ opacity: 0.8, marginLeft: 2 }}>({count})</span>
            </button>
          )
        })}
      </div>

      {/* Metadata & Sort control */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #f3f4f6', paddingBottom: 10 }}>
        <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>
          {sorted.length} artículo{sorted.length !== 1 ? 's' : ''}
          {activeTags.size > 0 && ` (filtrado por: ${[...activeTags].join(', ')})`}
        </span>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', fontWeight: 600, color: '#4b5563' }}>
          <input
            type="checkbox"
            checked={sortByViews}
            onChange={e => setSortByViews(e.target.checked)}
            style={{ width: 16, height: 16, cursor: 'pointer' }}
          />
          Ordenar por visitas
        </label>
      </div>

      {/* Articles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sorted.map(a => (
          <div key={a.id} style={{
            padding:      '12px 16px',
            background:   '#ffffff',
            borderRadius: 10,
            border:       '1px solid #e5e7eb',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{a.title}</span>
              <span style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: 12, fontWeight: 500, fontFamily: 'monospace' }}>
                👁️ {a.views.toLocaleString()} vistas
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {a.tags.map(t => (
                <span
                  key={t}
                  onClick={() => toggleTag(t)}
                  style={{
                    padding:      '2px 8px',
                    borderRadius: 6,
                    fontSize:     11,
                    background:   activeTags.has(t) ? '#eff6ff' : '#f3f4f6',
                    color:        activeTags.has(t) ? '#2563eb'   : '#4b5563',
                    border: `1px solid ${activeTags.has(t) ? '#bfdbfe' : '#e5e7eb'}`,
                    cursor:       'pointer',
                    fontWeight:   activeTags.has(t) ? 700 : 500,
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ))}
        {sorted.length === 0 && (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: 24, fontSize: 13, fontStyle: 'italic' }}>
            Sin artículos que contengan todos los tags seleccionados.
          </p>
        )}
      </div>

      {activeTags.size > 0 && (
        <button
          onClick={() => setActiveTags(new Set())}
          style={{
            marginTop:    16,
            padding:      '8px 16px',
            borderRadius: 8,
            border:       '1px solid #d1d5db',
            cursor:       'pointer',
            fontSize:     13,
            background:   '#ffffff',
            color: '#374151',
            fontWeight: 600,
            outline: 'none',
          }}
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}
