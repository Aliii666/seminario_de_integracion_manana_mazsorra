// src/components/PostList.tsx
import { useFetch } from '../hooks/useFetch'

interface Post { 
  id:    number
  title: string
  body:  string 
}

export default function PostList() {
  const { data: posts, loading, error } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  )

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 400,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Listado de Posts (useFetch Hook)
      </h3>

      {loading && (
        <div style={{ textAlign: 'center', padding: 24, color: '#6b7280', fontSize: 14, fontWeight: 500 }}>
          Cargando posts...
        </div>
      )}

      {error && (
        <div style={{ padding: '8px 12px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, color: '#b91c1c', fontSize: 13, fontWeight: 500 }}>
          ⚠️ Error: {error}
        </div>
      )}

      {posts && !loading && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, backgroundColor: '#f9fafb' }}>
              <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 14, color: '#111827' }}>{post.title}</p>
              <p style={{ margin: 0, fontSize: 12, color: '#4b5563', lineHeight: 1.4 }}>
                {post.body.slice(0, 80)}...
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
