// src/components/PostCrudWithAxios.tsx
import { useState, useEffect } from 'react'
import { axiosApi }             from '../api/axiosClient'
import type { Post }            from '../types'

export default function PostCrudWithAxios() {
  const [posts,   setPosts]   = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [title,   setTitle]   = useState('')
  const [saving,  setSaving]  = useState(false)

  // Initial load
  useEffect(() => {
    axiosApi.getPosts()
      .then(data => { setPosts(data); setLoading(false) })
      .catch(err => { setError(err instanceof Error ? err.message : 'Error'); setLoading(false) })
  }, [])

  // Create
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    try {
      const newPost = await axiosApi.createPost({ title: title.trim(), body: '', userId: 1 })
      setPosts(prev => [newPost, ...prev])
      setTitle('')
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear')
    } finally {
      setSaving(false)
    }
  }

  // Delete
  async function handleDelete(id: number) {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este post?')) return
    try {
      await axiosApi.deletePost(id)
      setPosts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar')
    }
  }

  if (loading) return <p style={{ color: '#6b7280', fontSize: 14 }}>Cargando posts...</p>

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
      <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: '#111827', fontWeight: 600 }}>
        CRUD de Posts con Axios
      </h3>

      {error && (
        <p style={{ padding: '8px 12px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, color: '#b91c1c', fontSize: 13, fontWeight: 500, margin: '0 0 12px' }}>
          ⚠️ Error: {error}
        </p>
      )}

      {/* Creation form */}
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título del nuevo post..."
          disabled={saving}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: 8,
            fontSize: 14,
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={saving || !title.trim()}
          style={{
            padding: '8px 14px',
            background: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
            outline: 'none',
          }}
        >
          {saving ? '...' : 'Crear'}
        </button>
      </form>

      {/* List with deletion */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {posts.map(post => (
          <div
            key={post.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              backgroundColor: '#f9fafb',
            }}
          >
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#111827', flex: 1 }}>{post.title}</p>
            <button
              onClick={() => handleDelete(post.id)}
              style={{
                marginLeft: 10,
                padding: '4px 8px',
                background: '#fef2f2',
                color: '#b91c1c',
                border: '1px solid #fca5a5',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                outline: 'none',
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
