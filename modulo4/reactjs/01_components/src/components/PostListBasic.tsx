// src/components/PostListBasic.tsx
import { useState, useEffect } from 'react'
import type { Post } from '../types'

export default function PostListBasic() {
  const [posts,   setPosts]   = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchPosts() {
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=5'
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data: Post[] = await res.json()
        if (!cancelled) setPosts(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error desconocido')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPosts()
    return () => { cancelled = true }
  }, [])

  if (loading) return <p style={{ color: '#6b7280', fontSize: 14 }}>Cargando posts...</p>
  if (error)   return <p style={{ color: '#dc2626', fontSize: 14 }}>Error: {error}</p>

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        maxWidth: 500,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Lista Básica de Posts (fetch directo)
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {posts.map(post => (
          <li
            key={post.id}
            style={{ padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 8, backgroundColor: '#f9fafb' }}
          >
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#111827' }}>{post.title}</p>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#4b5563', lineHeight: 1.4 }}>
              {post.body.slice(0, 60)}...
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
