// src/components/SearchWithEffect.tsx
import React, { useState, useEffect } from 'react'

const MOCK_DB: Record<string, string> = {
  react:      'Biblioteca para construir interfaces de usuario.',
  typescript: 'JavaScript con tipos estáticos.',
  vite:       'Herramienta de desarrollo frontend ultrarrápida.',
  hooks:      'Funciones que permiten usar estado y efectos en componentes funcionales.',
  jsx:        'Extensión de sintaxis de JavaScript para describir UI.',
}

export default function SearchWithEffect() {
  const [query,  setQuery]  = useState('')
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    const normalized = query.toLowerCase().trim()

    if (!normalized) {
      setResult(null)
      return
    }

    const found = MOCK_DB[normalized]
    setResult(found ?? 'Sin resultados para esa búsqueda.')
  }, [query])

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 360,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Búsqueda Sincronizada
      </h3>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busca: react, typescript, vite, jsx, hooks..."
        style={{
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          fontSize: 14,
          outline: 'none',
        }}
      />
      {result && (
        <div
          style={{
            margin: 0,
            fontSize: 14,
            color: '#374151',
            padding: '12px 14px',
            background: '#f9fafb',
            borderRadius: 8,
            border: '1px solid #f3f4f6',
            lineHeight: 1.5,
          }}
        >
          {result}
        </div>
      )}
    </div>
  )
}
