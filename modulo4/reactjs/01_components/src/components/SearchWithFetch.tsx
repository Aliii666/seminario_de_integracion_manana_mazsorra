// src/components/SearchWithFetch.tsx
import { useState, useEffect, useCallback } from 'react'

interface Post {
  id:    number
  title: string
  body:  string
}

export default function SearchWithFetch() {
  const [query,   setQuery]   = useState('')
  const [posts,   setPosts]   = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  // useCallback: fetchPosts is stable while 'query' remains unchanged.
  // Without useCallback, this would recreate on every render cycle,
  // causing an infinite loop when placed in useEffect.
  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const url = query.trim()
        ? `https://jsonplaceholder.typicode.com/posts?_limit=5&title_like=${encodeURIComponent(query)}`
        : 'https://jsonplaceholder.typicode.com/posts?_limit=5'
      const res  = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: Post[] = await res.json()
      setPosts(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [query]) // recreate only when query changes

  // Safe useEffect — fetchPosts is stable, preventing loops
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

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
        Búsqueda Síncrona con API (useCallback)
      </h3>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
        <code>useCallback</code> estabiliza la función fetch dentro de las dependencias de <code>useEffect</code>.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Buscar en títulos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            flex:    1,
            padding: '8px 12px',
            border:  '1px solid #d1d5db',
            borderRadius: 8,
            fontSize: 14,
            outline: 'none',
          }}
        />
        <button
          onClick={fetchPosts}
          style={{
            padding:      '8px 16px',
            borderRadius: 8,
            border:       'none',
            background:   '#2563eb',
            color:        'white',
            cursor:       'pointer',
            fontSize:     13,
            fontWeight: 600,
            outline: 'none',
          }}
        >
          Buscar
        </button>
      </div>

      {error && (
        <div style={{
          padding:      12,
          background:   '#fef2f2',
          border:       '1px solid #fca5a5',
          borderRadius: 8,
          color:        '#b91c1c',
          fontSize:     13,
          fontWeight: 500,
          marginBottom: 16,
        }}>
          ⚠️ Error: {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: '#6b7280', fontSize: 14, fontWeight: 500 }}>
          Cargando posts...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {posts.map(post => (
            <div key={post.id} style={{
              padding:      '12px 16px',
              background:   '#f9fafb',
              borderRadius: 8,
              border:       '1px solid #e5e7eb',
            }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#111827', marginBottom: 4 }}>
                {post.title}
              </div>
              <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.5 }}>
                {post.body.slice(0, 100)}…
              </div>
            </div>
          ))}
          {posts.length === 0 && !loading && (
            <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 14, fontStyle: 'italic' }}>Sin resultados.</p>
          )}
        </div>
      )}
    </div>
  )
}
