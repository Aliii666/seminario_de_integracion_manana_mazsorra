// src/components/DebounceSearch.tsx
import React, { useState, useEffect } from 'react'

export default function DebounceSearch() {
  const [input,          setInput]          = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  useEffect(() => {
    console.log('timer creado')

    const timer = setTimeout(() => {
      setDebouncedValue(input)
    }, 500)

    return () => {
      console.log('timer cancelado')
      clearTimeout(timer)
    }
  }, [input])

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
        gap: 10,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Búsqueda con Debounce
      </h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe algo rápido..."
        style={{
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          fontSize: 14,
          outline: 'none',
        }}
      />
      <div style={{ marginTop: 6 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#4b5563' }}>
          Valor debounced (500ms): <strong style={{ color: '#2563eb' }}>{debouncedValue || '—'}</strong>
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: 11, color: '#9ca3af', lineHeight: 1.4 }}>
          *Abre la consola F12 para ver cómo se crean y cancelan los temporizadores mientras escribes.
        </p>
      </div>
    </div>
  )
}
