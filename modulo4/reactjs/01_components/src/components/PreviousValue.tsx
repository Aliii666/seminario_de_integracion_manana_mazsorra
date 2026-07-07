// src/components/PreviousValue.tsx
import React, { useState, useRef, useEffect } from 'react'

export default function PreviousValue() {
  const [text, setText] = useState('')
  const previousRef = useRef('')

  useEffect(() => {
    // Stores the current text value to act as 'previous' on the next render cycle
    previousRef.current = text
  }, [text])

  const currentLen = text.length
  const previousLen = previousRef.current.length

  const getComparisonMessage = () => {
    if (!text) return 'Input vacío'
    if (currentLen > previousLen) return '🟢 Creciendo (agregaste caracteres)'
    if (currentLen < previousLen) return '🔴 Reduciéndose (borraste caracteres)'
    return '🟡 Sin cambios de longitud'
  }

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: 340,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 600 }}>
        Valor Anterior (useRef en useEffect)
      </h3>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe algo aquí..."
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#374151' }}>
        <p style={{ margin: 0 }}>
          Actual: <strong style={{ color: '#111827' }}>{text || '—'}</strong>
        </p>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Anterior: <strong style={{ color: '#4b5563' }}>{previousRef.current || '—'}</strong>
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: 12, fontWeight: 600, color: '#4b5563' }}>
          Tendencia: {getComparisonMessage()}
        </p>
      </div>
    </div>
  )
}
